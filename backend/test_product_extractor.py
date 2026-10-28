import pytest
from fastapi import HTTPException

from backend import product_extractor as extractor
from backend.product_extractor import _HTMLParser, _extract, _number, _currency
from backend.security import validate_public_http_url


def parse(html: str):
    parser = _HTMLParser()
    parser.feed(html)
    return parser


def test_extracts_product_offer_and_evidence():
    parser = parse('''
    <link rel="canonical" href="https://shop.example/p/1">
    <meta property="og:image" content="/images/chair.jpg">
    <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"Product","name":"Design Chair","brand":{"@type":"Brand","name":"Acme"},"color":"Grey","material":"Oak","image":"/chair.jpg","offers":{"@type":"Offer","price":"129990","priceCurrency":"HUF","availability":"https://schema.org/InStock"}}
    </script>
    ''')
    product = _extract(parser, 'https://shop.example/original')
    assert product is not None
    assert product['name'] == 'Design Chair'
    assert product['price'] == 129990
    assert product['priceHuf'] == 129990
    assert product['currency'] == 'HUF'
    assert product['availability'] == 'in_stock'
    assert product['url'] == 'https://shop.example/p/1'
    assert 'json-ld:Product' in product['evidence']
    assert 'json-ld:Offer' in product['evidence']


def test_non_huf_price_is_never_exposed_as_price_huf():
    parser = parse('''<script type="application/ld+json">{"@type":"Product","name":"Imported Chair","offers":{"price":"299.99","priceCurrency":"EUR"}}</script>''')
    product = _extract(parser, 'https://shop.example/p')
    assert product is not None
    assert product['price'] == 299.99
    assert product['currency'] == 'EUR'
    assert product['priceHuf'] is None


def test_usd_price_is_never_exposed_as_price_huf():
    parser = parse('''<script type="application/ld+json">{"@type":"Product","name":"US Chair","offers":{"price":"1,299.99","priceCurrency":"USD"}}</script>''')
    product = _extract(parser, 'https://shop.example/p')
    assert product is not None
    assert product['price'] == 1299.99
    assert product['currency'] == 'USD'
    assert product['priceHuf'] is None


def test_malformed_price_or_currency_never_creates_huf_price():
    parser = parse('''
    <script type="application/ld+json">
    {"@type":"Product","name":"Broken Chair","offers":{"price":"not-a-price","priceCurrency":"HUF"}}
    </script>
    ''')
    product = _extract(parser, 'https://shop.example/p')
    assert product is not None
    assert product['price'] is None
    assert product['currency'] == 'HUF'
    assert product['priceHuf'] is None

    parser = parse('''
    <script type="application/ld+json">
    {"@type":"Product","name":"Broken Currency","offers":{"price":"129990","priceCurrency":"HUF1"}}
    </script>
    ''')
    product = _extract(parser, 'https://shop.example/p')
    assert product is not None
    assert product['price'] == 129990
    assert product['currency'] is None
    assert product['priceHuf'] is None


def test_currency_is_normalized_to_iso_style_code():
    assert _currency(' huf ') == 'HUF'
    assert _currency('eur') == 'EUR'
    assert _currency('EURO') is None
    assert _currency('HUF1') is None
    assert _currency(840) is None


def test_number_handles_common_european_formats():
    assert _number('1.234') == 1234
    assert _number('1.234.567') == 1234567
    assert _number('1.234.567,89') == 1234567.89
    assert _number('1234,56') == 1234.56
    assert _number('1234.56') == 1234.56
    assert _number('1,234') == 1234
    assert _number('-1') is None
    assert _number('NaN') is None
    assert _number('Infinity') is None


def test_number_handles_us_mixed_separator_format():
    assert _number('1,299.99') == 1299.99
    assert _number('1,234,567.89') == 1234567.89


def test_rejects_non_http_urls():
    with pytest.raises(HTTPException) as exc:
        validate_public_http_url('file:///etc/passwd')
    assert exc.value.status_code == 400


def test_rejects_localhost():
    with pytest.raises(HTTPException) as exc:
        validate_public_http_url('http://localhost:8000/product')
    assert exc.value.status_code == 400


def test_rejects_private_ip():
    with pytest.raises(HTTPException) as exc:
        validate_public_http_url('http://127.0.0.1/product')
    assert exc.value.status_code == 400


def test_unknown_availability_is_not_promoted_to_in_stock():
    parser = parse('''<script type="application/ld+json">{"@type":"Product","name":"Unknown","offers":{"price":"100","priceCurrency":"HUF"}}</script>''')
    product = _extract(parser, 'https://shop.example/p')
    assert product is not None
    assert product['availability'] == 'unknown'



def test_untrusted_product_metadata_cannot_inject_executable_urls():
    parser = parse('''
    <link rel="canonical" href="javascript:alert(1)">
    <script type="application/ld+json">
    {"@type":"Product","name":"Unsafe metadata","image":"data:text/html,evil","offers":{"price":"100","priceCurrency":"HUF"}}
    </script>
    ''')
    product = _extract(parser, "https://shop.example/product")
    assert product is not None
    assert product["url"] == "https://shop.example/product"
    assert product["id"] == "https://shop.example/product"
    assert product["imageUrl"] is None


def test_product_canonical_cannot_redirect_identity_to_another_host():
    parser = parse('''
    <link rel="canonical" href="https://attacker.example/fake-product">
    <script type="application/ld+json">
    {"@type":"Product","name":"Misleading canonical","offers":{"price":"100","priceCurrency":"HUF"}}
    </script>
    ''')
    product = _extract(parser, "https://shop.example/product")
    assert product is not None
    assert product["url"] == "https://shop.example/product"
    assert product["retailer"] == "shop.example"



@pytest.mark.parametrize(
    ("candidate", "expected"),
    [
        ("https://shop.example/image.jpg", "https://shop.example/image.jpg"),
        ("http://shop.example/image.jpg", "http://shop.example/image.jpg"),
        ("https://shop.example:80/image.jpg", None),
        ("http://shop.example:443/image.jpg", None),
        ("https://shop.example:8443/image.jpg", None),
        ("https://user:pass@shop.example/image.jpg", None),
    ],
)
def test_product_links_only_allow_standard_scheme_ports(candidate, expected):
    assert extractor._safe_product_link(candidate, "https://shop.example/product") == expected


class _FakeStreamResponse:
    def __init__(self, status_code=200, headers=None, body=b"<html></html>"):
        self.status_code = status_code
        self.headers = headers or {"content-type": "text/html; charset=utf-8"}
        self.body = body
        self.is_redirect = status_code in {301, 302, 303, 307, 308}
        self.is_permanent_redirect = status_code in {301, 308}
        self.extensions = {}

    async def __aenter__(self):
        return self

    async def __aexit__(self, exc_type, exc, tb):
        return False

    def raise_for_status(self):
        if self.status_code >= 400:
            import httpx
            request = httpx.Request("GET", "https://shop.example/product")
            response = httpx.Response(self.status_code, request=request)
            raise httpx.HTTPStatusError("upstream error", request=request, response=response)

    async def aiter_bytes(self):
        yield self.body


class _FakeAsyncClient:
    def __init__(self, responses, **kwargs):
        self.responses = responses
        self.requested_urls = []

    async def __aenter__(self):
        return self

    async def __aexit__(self, exc_type, exc, tb):
        return False

    def stream(self, method, url):
        self.requested_urls.append(url)
        return self.responses.pop(0)


@pytest.mark.asyncio
async def test_fetch_product_page_allows_configured_maximum_redirects(monkeypatch):
    responses = [
        _FakeStreamResponse(302, {"location": f"/redirect/{index}"})
        for index in range(extractor.MAX_REDIRECTS)
    ]
    responses.append(_FakeStreamResponse(200, {"content-type": "text/html"}, b"<html>ok</html>"))
    client = _FakeAsyncClient(responses)
    monkeypatch.setattr(extractor.httpx, "AsyncClient", lambda **kwargs: client)
    monkeypatch.setattr(extractor, "validate_public_http_url", lambda url: url)
    monkeypatch.setattr(extractor, "validate_connected_peer", lambda response: None)

    final_url, content_type, body = await extractor._fetch_product_page("https://shop.example/product")

    assert final_url == f"https://shop.example/redirect/{extractor.MAX_REDIRECTS - 1}"
    assert content_type == "text/html"
    assert body == b"<html>ok</html>"
    assert len(client.requested_urls) == extractor.MAX_REDIRECTS + 1


@pytest.mark.asyncio
async def test_fetch_product_page_rejects_redirect_chain_over_limit(monkeypatch):
    responses = [
        _FakeStreamResponse(302, {"location": f"/redirect/{index}"})
        for index in range(extractor.MAX_REDIRECTS + 1)
    ]
    client = _FakeAsyncClient(responses)
    monkeypatch.setattr(extractor.httpx, "AsyncClient", lambda **kwargs: client)
    monkeypatch.setattr(extractor, "validate_public_http_url", lambda url: url)
    monkeypatch.setattr(extractor, "validate_connected_peer", lambda response: None)

    with pytest.raises(HTTPException) as exc:
        await extractor._fetch_product_page("https://shop.example/product")

    assert exc.value.status_code == 508
    assert len(client.requested_urls) == extractor.MAX_REDIRECTS + 1
