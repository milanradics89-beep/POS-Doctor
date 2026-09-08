from __future__ import annotations

import asyncio
from typing import Any

import httpx
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from google_search import ProductSearchRequest, product_search
from product_extractor import resolve_product

router = APIRouter(prefix="/v1/products", tags=["products"])


class ProductDiscoveryRequest(BaseModel):
    query: str = Field(min_length=2, max_length=500)
    limit: int = Field(default=10, ge=1, le=20)
    locale: str = Field(default="hu-HU", max_length=20)
    region: str = Field(default="HU", min_length=2, max_length=2)
    max_resolve: int = Field(default=8, ge=1, le=12)


@router.post("/discover")
async def discover_products(request: ProductDiscoveryRequest):
    search = await product_search(ProductSearchRequest(
        query=request.query,
        limit=request.limit,
        locale=request.locale,
        region=request.region,
    ))
    candidates: list[dict[str, Any]] = []
    errors: list[dict[str, str]] = []

    async def resolve(item: dict[str, Any]):
        try:
            return await resolve_product(type("Resolve", (), {"url": item["url"]})())
        except HTTPException as exc:
            return {"_error": f"{exc.status_code}: {exc.detail}", "url": item.get("url", "")}
        except (httpx.HTTPError, ValueError) as exc:
            return {"_error": str(exc), "url": item.get("url", "")}

    results = await asyncio.gather(*(resolve(item) for item in search["results"][:request.max_resolve]))
    for item, result in zip(search["results"], results):
        if result.get("_error"):
            errors.append({"url": result.get("url", item["url"]), "message": result["_error"]})
            continue
        candidates.append({
            **result,
            "searchRank": item["rank"],
            "searchTitle": item["title"],
            "searchSnippet": item.get("snippet", ""),
        })

    candidates.sort(key=lambda item: (-float(item.get("qualityScore", 0)), int(item.get("searchRank", 999))))
    return {"query": request.query, "candidates": candidates, "errors": errors}
