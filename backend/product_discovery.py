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
        return {
            "query": request.query,
            "candidates": [],
            "errors": [] if isinstance(search, dict) and isinstance(search.get("results"), list) else [
                {"url": "", "message": "product search returned invalid data"}
            ],
        }

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
        candidates.append({
            **result,
            "searchRank": item["rank"],
            "searchTitle": item["title"],
            "searchSnippet": item["snippet"],
        })

    candidates.sort(key=lambda item: (-_finite_score(item.get("qualityScore")), _rank(item.get("searchRank"), 999)))
    return {"query": request.query, "candidates": candidates, "errors": errors}
