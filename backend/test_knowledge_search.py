from unittest.mock import AsyncMock, patch

import httpx
import pytest

from backend.knowledge_search import KnowledgeSearchRequest, search_knowledge


@pytest.mark.asyncio
async def test_search_requires_provider_configuration(monkeypatch):
    monkeypatch.delenv("GOOGLE_WEB_SEARCH_API_KEY", raising=False)
    monkeypatch.delenv("GOOGLE_WEB_SEARCH_CLIENT_ID", raising=False)
    with pytest.raises(Exception) as exc:
        await search_knowledge(KnowledgeSearchRequest(query="safe furniture cleaning"))
    assert getattr(exc.value, "status_code", None) == 503


@pytest.mark.asyncio
async def test_search_filters_invalid_urls_and_deduplicates(monkeypatch):
    monkeypatch.setenv("GOOGLE_WEB_SEARCH_API_KEY", "key")
    monkeypatch.setenv("GOOGLE_WEB_SEARCH_CLIENT_ID", "client")

    response = httpx.Response(
        200,
        json={
            "results": [
                {"title": "Useful guide", "url": "https://example.com/guide#section", "snippet": "Evidence"},
                {"title": "Duplicate", "url": "https://example.com/guide#other", "snippet": "Same source"},
                {"title": "Bad", "url": "javascript:alert(1)", "snippet": "No"},
                {"title": "Second", "link": "https://example.org/page", "snippet": "More evidence"},
            ]
        },
        request=httpx.Request("GET", "https://websearchservice.googleapis.com/v1:search"),
    )
    client = AsyncMock()
    client.__aenter__.return_value.get.return_value = response

    with patch("backend.knowledge_search.httpx.AsyncClient", return_value=client):
        results = await search_knowledge(KnowledgeSearchRequest(query="safe furniture cleaning", limit=5))

    assert [result.url for result in results] == ["https://example.com/guide", "https://example.org/page"]
    assert results[0].source == "example.com"
    assert results[0].rank == 1


@pytest.mark.asyncio
async def test_search_provider_timeout_becomes_504(monkeypatch):
    monkeypatch.setenv("GOOGLE_WEB_SEARCH_API_KEY", "key")
    monkeypatch.setenv("GOOGLE_WEB_SEARCH_CLIENT_ID", "client")
    client = AsyncMock()
    client.__aenter__.return_value.get.side_effect = httpx.ReadTimeout("timeout")

    with patch("backend.knowledge_search.httpx.AsyncClient", return_value=client):
        with pytest.raises(Exception) as exc:
            await search_knowledge(KnowledgeSearchRequest(query="repair appliance safely"))
    assert getattr(exc.value, "status_code", None) == 504
