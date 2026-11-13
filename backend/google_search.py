import os
from typing import Any
from urllib.parse import urlparse

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


def _safe_result_url(value: Any) -> tuple[str, str] | None:
    if not isinstance(value, str) or not value.strip():
        return None
    try:
        parsed = urlparse(value.strip())
        scheme = parsed.scheme.lower()
        if scheme not in {"http", "https"} or not parsed.hostname:
            return None
        if parsed.username is not None or parsed.password is not None:
            return None
        if parsed.port is not None and parsed.port != (443 if scheme == "https" else 80):
            return None
    except ValueError:
        return None
    return value.strip(), parsed.hostname.rstrip(".").lower()


def _extract_domain(url: str) -> str:
    parsed = urlparse(url)
    return (parsed.hostname or "").rstrip(".").lower()


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
            try:
                payload: Any = response.json()
            except ValueError as exc:
                raise HTTPException(502, "Google Web Search returned invalid JSON.") from exc
    except HTTPException:
        raise
    except httpx.HTTPStatusError as exc:
        raise HTTPException(502, "Google Web Search request failed.") from exc
    except httpx.HTTPError as exc:
        raise HTTPException(504, "Google Web Search timed out.") from exc

    if not isinstance(payload, dict) or not isinstance(payload.get("results", []), list):
        raise HTTPException(502, "Google Web Search returned an invalid response.")

    items = []
    for index, result in enumerate(payload.get("results", [])):
        if not isinstance(result, dict):
            continue
        safe_url = _safe_result_url(result.get("url") or result.get("link"))
        title = result.get("title")
        if not safe_url or not isinstance(title, str) or not title.strip():
            continue
        url, domain = safe_url
        snippet = result.get("snippet", "")
        items.append({
            "id": f"google-{index + 1}",
            "title": title.strip(),
            "url": url,
            "source": domain,
            "snippet": snippet.strip() if isinstance(snippet, str) else "",
            "rank": index + 1,
        })

    return {"query": request.query, "results": items}
