import os
from typing import Any
from urllib.parse import urlencode

import httpx
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

router = APIRouter(prefix="/v1/products", tags=["products"])
GOOGLE_SEARCH_URL = "https://websearchservice.googleapis.com/v1:search"


class ProductSearchRequest(BaseModel):
    query: str = Field(min_length=2, max_length=500)
    limit: int = Field(default=10, ge=1, le=20)
    locale: str = Field(default="hu-HU", max_length=20)
    region: str = Field(default="HU", min_length=2, max_length=2)


def _extract_domain(url: str) -> str:
    return url.split("//", 1)[-1].split("/", 1)[0].lower()


@router.post("/search")
async def product_search(request: ProductSearchRequest):
    api_key = os.environ.get("GOOGLE_WEB_SEARCH_API_KEY")
    client_id = os.environ.get("GOOGLE_WEB_SEARCH_CLIENT_ID")
    if not api_key or not client_id:
        raise HTTPException(503, "Google Web Search is not configured.")

    params = {
        "searchQuery.query": request.query,
        "searchQuery.languageCode": request.locale.split("-", 1)[0],
        "userContext.ipAddress": "0.0.0.0",
        "clientContext.clientId": client_id,
        "pageSize": request.limit,
    }
    headers = {"X-Goog-Api-Key": api_key}
    try:
        async with httpx.AsyncClient(timeout=12) as client:
            response = await client.get(GOOGLE_SEARCH_URL, params=params, headers=headers)
            response.raise_for_status()
            payload: dict[str, Any] = response.json()
    except httpx.HTTPStatusError as exc:
        raise HTTPException(502, "Google Web Search request failed.") from exc
    except httpx.HTTPError as exc:
        raise HTTPException(504, "Google Web Search timed out.") from exc

    items = []
    for index, result in enumerate(payload.get("results", [])):
        url = result.get("url") or result.get("link")
        title = result.get("title")
        if not url or not title:
            continue
        items.append({
            "id": f"google-{index + 1}",
            "title": title,
            "url": url,
            "source": _extract_domain(url),
            "snippet": result.get("snippet", ""),
            "rank": index + 1,
        })

    return {"query": request.query, "results": items}
