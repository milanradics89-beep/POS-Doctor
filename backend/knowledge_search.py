from __future__ import annotations

import os
from dataclasses import dataclass
from typing import Any
from urllib.parse import urlparse

import httpx
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

router = APIRouter(prefix="/v1/knowledge", tags=["knowledge"])
GOOGLE_SEARCH_URL = "https://websearchservice.googleapis.com/v1:search"


@dataclass(frozen=True)
class KnowledgeResult:
    title: str
    url: str
    source: str
    snippet: str
    rank: int
    evidenceType: str = "web"

    def as_dict(self) -> dict[str, Any]:
        return {
            "title": self.title,
            "url": self.url,
            "source": self.source,
            "snippet": self.snippet,
            "rank": self.rank,
            "evidenceType": self.evidenceType,
        }


class KnowledgeSearchRequest(BaseModel):
    query: str = Field(min_length=2, max_length=500)
    limit: int = Field(default=6, ge=1, le=10)
    locale: str = Field(default="hu-HU", max_length=20)
    region: str = Field(default="HU", min_length=2, max_length=2)


def _source(url: str) -> str:
    return urlparse(url).netloc.lower().removeprefix("www.")


def _trusted_http_url(url: str) -> bool:
    parsed = urlparse(url)
    return parsed.scheme in {"http", "https"} and bool(parsed.netloc)


async def search_knowledge(request: KnowledgeSearchRequest) -> list[KnowledgeResult]:
    api_key = os.environ.get("GOOGLE_WEB_SEARCH_API_KEY")
    client_id = os.environ.get("GOOGLE_WEB_SEARCH_CLIENT_ID")
    if not api_key or not client_id:
        raise HTTPException(503, "Knowledge search is not configured.")

    params = {
        "searchQuery.query": request.query,
        "searchQuery.languageCode": request.locale.split("-", 1)[0],
        "userContext.ipAddress": "0.0.0.0",
        "clientContext.clientId": client_id,
        "pageSize": request.limit,
    }
    headers = {"X-Goog-Api-Key": api_key}
    try:
        async with httpx.AsyncClient(timeout=10) as client:
            response = await client.get(GOOGLE_SEARCH_URL, params=params, headers=headers)
            response.raise_for_status()
            payload: dict[str, Any] = response.json()
    except httpx.HTTPStatusError as exc:
        raise HTTPException(502, "Knowledge search provider failed.") from exc
    except httpx.HTTPError as exc:
        raise HTTPException(504, "Knowledge search timed out.") from exc

    results: list[KnowledgeResult] = []
    seen: set[str] = set()
    for raw in payload.get("results", []):
        url = raw.get("url") or raw.get("link")
        title = raw.get("title")
        if not isinstance(url, str) or not isinstance(title, str) or not _trusted_http_url(url):
            continue
        canonical = url.split("#", 1)[0]
        if canonical in seen:
            continue
        seen.add(canonical)
        results.append(
            KnowledgeResult(
                title=title[:300],
                url=canonical,
                source=_source(canonical),
                snippet=str(raw.get("snippet", ""))[:1200],
                rank=len(results) + 1,
            )
        )
        if len(results) >= request.limit:
            break
    return results


@router.post("/search")
async def knowledge_search(request: KnowledgeSearchRequest):
    results = await search_knowledge(request)
    return {
        "query": request.query,
        "results": [result.as_dict() for result in results],
        "evidencePolicy": "Search results are evidence candidates, not verified facts. USEIT must preserve source URLs and avoid inventing unsupported claims.",
    }
