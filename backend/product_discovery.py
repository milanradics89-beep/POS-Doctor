from __future__ import annotations

import asyncio
import math
from typing import Any

import httpx
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field, field_validator

from backend.google_search import ProductSearchRequest, product_search
from backend.product_extractor import ProductResolveRequest, resolve_product

router = APIRouter(prefix="/v1/products", tags=["products"])


class ProductDiscoveryRequest(BaseModel):
    query: str = Field(min_length=2, max_length=500)
    limit: int = Field(default=10, ge=1, le=20)
    locale: str = Field(default="hu-HU", min_length=2, max_length=20)
    region: str = Field(default="HU", min_length=2, max_length=2)
    max_resolve: int = Field(default=8, ge=1, le=12)

    @field_validator("query")
    @classmethod
    def normalize_query(cls, value: str) -> str:
        normalized = " ".join(value.split())
        if len(normalized) < 2:
            raise ValueError("query must contain at least two non-whitespace characters")
        return normalized

    @field_validator("locale")
    @classmethod
    def normalize_locale(cls, value: str) -> str:
        return value.strip()

    @field_validator("region")
    @classmethod
    def normalize_region(cls, value: str) -> str:
        return value.strip().upper()


def _error_message(stage: str, exc: BaseException) -> str:
    if isinstance(exc, HTTPException):
        return f"{stage} unavailable ({exc.status_code})"
    if isinstance(exc, httpx.TimeoutException):
        return f"{stage} timed out"
    if isinstance(exc, httpx.HTTPError):
        return f"{stage} network error"
    if isinstance(exc, ValueError):
        return f"{stage} returned invalid data"
    return f"{stage} unavailable ({type(exc).__name__})"


def _finite_score(value: Any) -> float:
    try:
        score = float(value)
    except (TypeError, ValueError, OverflowError):
        return 0.0
    return score if math.isfinite(score) else 0.0


def _rank(value: Any, fallback: int) -> int:
    try:
        rank = int(value)
    except (TypeError, ValueError, OverflowError):
        return fallback
    return rank if rank >= 0 else fallback


def _normalize_candidate(value: Any) -> dict[str, Any] | None:
    """Normalize untrusted resolver output to a stable, client-safe product shape."""
    if not isinstance(value, dict):
        return None
    name = value.get("name")
    url = value.get("url") or value.get("id")
    if not isinstance(name, str) or not name.strip() or not isinstance(url, str):
        return None
    url = url.strip()
    try:
        from urllib.parse import urlparse
        parsed = urlparse(url)
        if parsed.scheme.lower() not in {"http", "https"} or not parsed.hostname:
            return None
        if parsed.username is not None or parsed.password is not None:
            return None
        if parsed.port is not None and parsed.port != (443 if parsed.scheme.lower() == "https" else 80):
            return None
    except ValueError:
        return None

    candidate = dict(value)
    candidate["name"] = name.strip()
    candidate["url"] = url
    candidate["id"] = url
    retailer = value.get("retailer")
    candidate["retailer"] = retailer.strip().lower() if isinstance(retailer, str) and retailer.strip() else parsed.hostname.lower()
    score = _finite_score(value.get("qualityScore", 0))
    candidate["qualityScore"] = min(1.0, max(0.0, score))
    price = _finite_score(value.get("price")) if value.get("price") is not None else None
    candidate["price"] = price if price is not None and price >= 0 else None
    currency = value.get("currency")
    currency = currency.strip().upper() if isinstance(currency, str) else ""
    candidate["currency"] = currency if len(currency) == 3 and currency.isalpha() and currency.isascii() else None
    raw_huf = value.get("priceHuf")
    price_huf = _finite_score(raw_huf) if raw_huf is not None else (candidate["price"] if candidate["currency"] == "HUF" else None)
    candidate["priceHuf"] = price_huf if price_huf is not None and price_huf >= 0 else None
    availability = value.get("availability")
    if not isinstance(availability, str) or availability.strip().lower() not in {"in_stock", "out_of_stock", "limited", "unknown"}:
        availability = "unknown"
    candidate["availability"] = availability.strip().lower()
    image = value.get("imageUrl")
    if isinstance(image, str) and image.strip():
        try:
            image_parsed = urlparse(image.strip())
            if (image_parsed.scheme.lower() in {"http", "https"} and image_parsed.hostname
                    and image_parsed.username is None and image_parsed.password is None
                    and (image_parsed.port is None or image_parsed.port == (443 if image_parsed.scheme.lower() == "https" else 80))):
                candidate["imageUrl"] = image.strip()
            else:
                candidate["imageUrl"] = None
        except ValueError:
            candidate["imageUrl"] = None
    else:
        candidate["imageUrl"] = None
    return candidate


def _candidate_identity(candidate: dict[str, Any]) -> str:
    from urllib.parse import urlparse, urlunparse
    parsed = urlparse(candidate["url"])
    normalized_url = urlunparse((parsed.scheme.lower(), parsed.netloc.lower(), parsed.path.rstrip("/"), "", parsed.query, ""))
    return normalized_url or f"{candidate.get('retailer', '')}:{candidate['name'].casefold()}"


def _search_items(search: Any) -> list[dict[str, Any]]:
    if not isinstance(search, dict):
        return []
    raw_results = search.get("results")
    if not isinstance(raw_results, list):
        return []
    items: list[dict[str, Any]] = []
    for index, raw in enumerate(raw_results, start=1):
        if not isinstance(raw, dict):
            continue
        url = raw.get("url")
        if not isinstance(url, str) or not url.strip():
            continue
        title = raw.get("title")
        snippet = raw.get("snippet")
        items.append({
            "url": url.strip(),
            "title": title.strip() if isinstance(title, str) else "",
            "snippet": snippet.strip() if isinstance(snippet, str) else "",
            "rank": _rank(raw.get("rank"), index),
        })
    return items


@router.post("/discover")
async def discover_products(request: ProductDiscoveryRequest):
    try:
        search = await product_search(ProductSearchRequest(
            query=request.query,
            limit=request.limit,
            locale=request.locale,
            region=request.region,
        ))
    except Exception as exc:
        # Do not leak provider responses, credentials, or exception messages to clients.
        return {
            "query": request.query,
            "candidates": [],
            "errors": [{"url": "", "message": _error_message("product search", exc)}],
        }

    items = _search_items(search)
    if not items:
        raw_results = search.get("results") if isinstance(search, dict) else None
        if isinstance(raw_results, list) and not raw_results:
            errors = []
        elif isinstance(raw_results, list):
            errors = [{"url": "", "message": "product search returned no usable results"}]
        else:
            errors = [{"url": "", "message": "product search returned invalid data"}]
        return {"query": request.query, "candidates": [], "errors": errors}

    candidates: list[dict[str, Any]] = []
    errors: list[dict[str, str]] = []
    items_to_resolve = items[:request.max_resolve]

    async def resolve(item: dict[str, Any]) -> dict[str, Any]:
        try:
            result = await resolve_product(ProductResolveRequest(url=item["url"]))
            if not isinstance(result, dict):
                return {"_error": "product resolution returned invalid data", "url": item["url"]}
            return result
        except Exception as exc:
            return {"_error": _error_message("product resolution", exc), "url": item["url"]}

    # Keep the amount of outbound work bounded by max_resolve, rather than
    # allowing provider result counts to determine concurrency.
    results = await asyncio.gather(*(resolve(item) for item in items_to_resolve))
    for item, result in zip(items_to_resolve, results):
        if result.get("_error"):
            errors.append({"url": item["url"], "message": str(result["_error"])})
            continue
        normalized_result = _normalize_candidate(result)
        if normalized_result is None:
            errors.append({"url": item["url"], "message": "product resolution returned incomplete product data"})
            continue
        if normalized_result["qualityScore"] < 0.25:
            errors.append({"url": item["url"], "message": "product quality below minimum threshold"})
            continue
        normalized_result.update({
            "searchRank": item["rank"],
            "searchTitle": item["title"],
            "searchSnippet": item["snippet"],
        })
        candidates.append(normalized_result)

    unique: dict[str, dict[str, Any]] = {}
    for candidate in candidates:
        identity = _candidate_identity(candidate)
        existing = unique.get(identity)
        if existing is None or candidate["qualityScore"] > existing["qualityScore"]:
            unique[identity] = candidate
    candidates = list(unique.values())
    candidates.sort(key=lambda item: (-item["qualityScore"], _rank(item.get("searchRank"), 999)))
    return {"query": request.query, "candidates": candidates, "errors": errors}
