import html
import json
import re
from html.parser import HTMLParser
from typing import Any
from urllib.parse import urljoin, urlparse

import httpx
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from backend.security import validate_connected_peer, validate_public_http_url

router = APIRouter(prefix="/v1/products", tags=["products"])
MAX_PRODUCT_PAGE_BYTES = 2_000_000
MAX_REDIRECTS = 5

class ProductResolveRequest(BaseModel):
    url: str = Field(min_length=10, max_length=4_000)

class _HTMLParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.json_ld: list[str] = []
        self.canonical: str | None = None
        self.meta: dict[str, str] = {}
        self._json_ld = False
        self._buffer: list[str] = []
    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        data = {k.lower(): v for k, v in attrs if v is not None}
        if tag.lower() == "script" and data.get("type", "").lower() == "application/ld+json":
            self._json_ld = True; self._buffer = []
        if tag.lower() == "link" and data.get("rel", "").lower() == "canonical": self.canonical = data.get("href")
        if tag.lower() == "meta":
            key = data.get("property") or data.get("name")
            if key and data.get("content"): self.meta[key.lower()] = data["content"]
    def handle_data(self, data: str) -> None:
        if self._json_ld: self._buffer.append(data)
    def handle_endtag(self, tag: str) -> None:
        if tag.lower() == "script" and self._json_ld:
            payload = "".join(self._buffer).strip()
            if payload: self.json_ld.append(payload)
            self._json_ld = False; self._buffer = []

def _json_objects(raw: str) -> list[Any]:
    try: value = json.loads(html.unescape(raw))
    except json.JSONDecodeError: return []
    if isinstance(value, list): return value
    if isinstance(value, dict) and isinstance(value.get("@graph"), list): return value["@graph"]
    return [value]

def _product_objects(parser: _HTMLParser) -> list[dict[str, Any]]:
    products: list[dict[str, Any]] = []
    for raw in parser.json_ld:
        for obj in _json_objects(raw):
            if not isinstance(obj, dict): continue
            kind = obj.get("@type"); kinds = kind if isinstance(kind, list) else [kind]
            if any(str(k).lower() in {"product", "productgroup"} for k in kinds): products.append(obj)
    return products

def _first_image(value: Any, base_url: str) -> str | None:
    if isinstance(value, str): return urljoin(base_url, value)
    if isinstance(value, list):
        for item in value:
            result = _first_image(item, base_url)
            if result: return result
    if isinstance(value, dict): return _first_image(value.get("url") or value.get("contentUrl"), base_url)
    return None

def _offer(product: dict[str, Any]) -> dict[str, Any]:
    offers = product.get("offers")
    if isinstance(offers, list): offers = offers[0] if offers else {}
    return offers if isinstance(offers, dict) else {}

def _availability(value: Any) -> str:
    text = str(value or "").lower()
    if "outofstock" in text or "out_of_stock" in text: return "out_of_stock"
    if "limited" in text or "limitedavailability" in text: return "limited"
    if "instock" in text or "in_stock" in text: return "in_stock"
    return "unknown"

def _number(value: Any) -> float | None:
    if value is None: return None
    text = re.sub(r"[^0-9.,-]", "", str(value)).strip()
    if not text: return None
    if "," in text and "." in text:
        text = text.replace(".", "").replace(",", ".")
    elif "," in text:
        parts = text.split(",")
        text = "".join(parts[:-1]) + "." + parts[-1] if len(parts[-1]) in (1, 2) and len(parts) > 1 else "".join(parts)
    elif "." in text:
        parts = text.split(".")
        text = "".join(parts) if len(parts) > 2 or (len(parts) == 2 and len(parts[-1]) == 3) else text
    try:
        result = float(text)
        return result if result >= 0 else None
    except ValueError: return None

def _currency(value: Any) -> str | None:
    if not isinstance(value, str): return None
    currency = value.strip().upper()
    if not re.fullmatch(r"[A-Z]{3}", currency): return None
    return currency

def _string(value: Any) -> str | None:
    if isinstance(value, str) and value.strip(): return value.strip()
    if isinstance(value, dict) and isinstance(value.get("name"), str) and value["name"].strip(): return value["name"] .strip()
    return None

def _extract(parser: _HTMLParser, url: str) -> dict[str, Any] | None:
    products = _product_objects(parser)
    if not products: return None
    product = next((item for item in products if item.get("offers")), products[0])
    offer = _offer(product)
    canonical = urljoin(url, parser.canonical) if parser.canonical else url
    name = _string(product.get("name")) or parser.meta.get("og:title")
    if not name: return None
    image = _first_image(product.get("image"), url) or parser.meta.get("og:image")
    brand = _string(product.get("brand")); color = _string(product.get("color")); material = _string(product.get("material")); category = _string(product.get("category"))
    price_number = _number(offer.get("price")); currency = _currency(offer.get("priceCurrency")); availability = _availability(offer.get("availability"))
    price_huf = price_number if currency == "HUF" else None
    evidence = ["json-ld:Product"]
    if offer: evidence.append("json-ld:Offer")
    if image: evidence.append("image")
    if canonical != url: evidence.append("canonical")
    if brand: evidence.append("brand")
    if color: evidence.append("color")
    if material: evidence.append("material")
    quality = min(1.0, 0.35 + 0.08 * len(evidence) + (0.15 if price_huf is not None else 0))
    return {"id": canonical, "name": str(name).strip(), "brand": brand, "url": canonical, "imageUrl": image, "price": price_number, "priceHuf": price_huf, "currency": currency, "availability": availability, "retailer": urlparse(canonical).hostname, "category": category, "color": color, "material": material, "evidence": evidence, "qualityScore": quality}

async def _fetch_product_page(url: str) -> tuple[str, str, bytes]:
    current = validate_public_http_url(url)
    headers = {"User-Agent": "USEIT/1.0 (+product-discovery)"}
    async with httpx.AsyncClient(timeout=10, follow_redirects=False, headers=headers) as client:
        for _ in range(MAX_REDIRECTS):
            async with client.stream("GET", current) as response:
                validate_connected_peer(response)
                if response.is_redirect or response.is_permanent_redirect:
                    location = response.headers.get("location")
                    if not location: raise HTTPException(502, "Product page returned an invalid redirect.")
                    current = validate_public_http_url(urljoin(current, location))
                    continue
                response.raise_for_status()
                if "text/html" not in response.headers.get("content-type", "").lower():
                    raise HTTPException(422, "URL does not point to an HTML product page.")
                declared = response.headers.get("content-length")
                if declared:
                    try:
                        if int(declared) > MAX_PRODUCT_PAGE_BYTES:
                            raise HTTPException(413, "Product page is too large.")
                    except ValueError:
                        pass
                body = bytearray()
                async for chunk in response.aiter_bytes():
                    body.extend(chunk)
                    if len(body) > MAX_PRODUCT_PAGE_BYTES:
                        raise HTTPException(413, "Product page is too large.")
                return current, response.headers.get("content-type", ""), bytes(body)
    raise HTTPException(508, "Product page redirect chain is too long.")

@router.post("/resolve")
async def resolve_product(request: ProductResolveRequest):
    try:
        url, _, body = await _fetch_product_page(request.url)
    except HTTPException: raise
    except httpx.HTTPStatusError as exc: raise HTTPException(502, "Product page returned an HTTP error.") from exc
    except httpx.HTTPError as exc: raise HTTPException(504, "Product page could not be fetched.") from exc
    parser = _HTMLParser(); parser.feed(body.decode("utf-8", errors="replace"))
    product = _extract(parser, url)
    if not product: raise HTTPException(422, "No valid Product structured data was found.")
    return product
