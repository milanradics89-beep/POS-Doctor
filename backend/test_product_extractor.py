import pytest
from fastapi import HTTPException

from backend.product_extractor import _HTMLParser, _extract, _validate_public_url


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
    assert product['currency'] == 'HUF'
    assert product['availability'] == 'in_stock'
    assert product['url'] == 'https://shop.example/p/1'
    assert 'json-ld:Product' in product['evidence']
    assert 'json-ld:Offer' in product['evidence']


def test_rejects_non_http_urls():
    with pytest.raises(HTTPException) as exc:
        _validate_public_url('file:///etc/passwd')
    assert exc.value.status_code == 400


def test_rejects_localhost():
    with pytest.raises(HTTPException) as exc:
        _validate_public_url('http://localhost:8000/product')
    assert exc.value.status_code == 400


def test_rejects_private_ip():
    with pytest.raises(HTTPException) as exc:
        _validate_public_url('http://127.0.0.1/product')
    assert exc.value.status_code == 400


def test_unknown_availability_is_not_promoted_to_in_stock():
    parser = parse('''<script type="application/ld+json">{"@type":"Product","name":"Unknown","offers":{"price":"100","priceCurrency":"HUF"}}</script>''')
    product = _extract(parser, 'https://shop.example/p')
    assert product is not None
    assert product['availability'] == 'unknown'
