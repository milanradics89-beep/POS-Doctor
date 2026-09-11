import pytest
from fastapi import HTTPException

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
