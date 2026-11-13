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
    hostname = urlparse(url).hostname or ""
    return hostname.rstrip(".").lower().removeprefix("www.")


def _trusted_http_url(url: Any) -> bool:
    if not isinstance(url, str) or not url or url != url.strip():
        return False
    if any(ord(character) <= 0x20 or ord(character) == 0x7F for character in url) or "\\" in url:
        return False
    try:
        parsed = urlparse(url)
        scheme = parsed.scheme.lower()
        if scheme not in {"http", "https"} or not parsed.hostname:
            return False
        if parsed.username is not None or parsed.password is not None:
            return False
        if parsed.port is not None and parsed.port != (443 if scheme == "https" else 80):
            return False
    except ValueError:
        return False
    return True


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
            payload: Any = response.json()
    except httpx.HTTPStatusError as exc:
        raise HTTPException(502, "Knowledge search provider failed.") from exc
    except httpx.HTTPError as exc:
        raise HTTPException(504, "Knowledge search timed out.") from exc
    except ValueError as exc:
        raise HTTPException(502, "Knowledge search provider returned invalid JSON.") from exc

    if not isinstance(payload, dict) or not isinstance(payload.get("results", []), list):
        raise HTTPException(502, "Knowledge search provider returned an invalid response.")

    results: list[KnowledgeResult] = []
    seen: set[str] = set()
    for raw in payload.get("results", []):
        if not isinstance(raw, dict):
            continue
        url = raw.get("url") or raw.get("link")
        title = raw.get("title")
        if not isinstance(title, str) or not title.strip() or not _trusted_http_url(url):
            continue
        canonical = url.split("#", 1)[0]
        if canonical in seen:
            continue
        seen.add(canonical)
        snippet = raw.get("snippet", "")
        results.append(
            KnowledgeResult(
                title=title.strip()[:300],
                url=canonical,
                source=_source(canonical),
                snippet=snippet[:1200] if isinstance(snippet, str) else "",
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
