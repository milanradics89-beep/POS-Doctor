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



def mock_knowledge_provider(monkeypatch, *, payload=None, content=None, status_code=200):
    real_async_client = httpx.AsyncClient

    def handler(request):
        if content is not None:
            return httpx.Response(
                status_code,
                content=content,
                headers={"content-type": "application/json"},
                request=request,
            )
        return httpx.Response(status_code, json=payload, request=request)

    transport = httpx.MockTransport(handler)
    monkeypatch.setattr(
        "backend.knowledge_search.httpx.AsyncClient",
        lambda **kwargs: real_async_client(transport=transport, **kwargs),
    )


@pytest.mark.asyncio
async def test_search_rejects_invalid_json_from_provider(monkeypatch):
    monkeypatch.setenv("GOOGLE_WEB_SEARCH_API_KEY", "key")
    monkeypatch.setenv("GOOGLE_WEB_SEARCH_CLIENT_ID", "client")
    mock_knowledge_provider(monkeypatch, content=b"not-json")

    with pytest.raises(Exception) as exc:
        await search_knowledge(KnowledgeSearchRequest(query="repair appliance safely"))

    assert getattr(exc.value, "status_code", None) == 502
    assert getattr(exc.value, "detail", None) == "Knowledge search provider returned invalid JSON."


@pytest.mark.parametrize("payload", [
    [],
    {"results": {}},
    {"results": None},
])
@pytest.mark.asyncio
async def test_search_rejects_invalid_provider_response_shape(monkeypatch, payload):
    monkeypatch.setenv("GOOGLE_WEB_SEARCH_API_KEY", "key")
    monkeypatch.setenv("GOOGLE_WEB_SEARCH_CLIENT_ID", "client")
    mock_knowledge_provider(monkeypatch, payload=payload)

    with pytest.raises(Exception) as exc:
        await search_knowledge(KnowledgeSearchRequest(query="repair appliance safely"))

    assert getattr(exc.value, "status_code", None) == 502
    assert getattr(exc.value, "detail", None) == "Knowledge search provider returned an invalid response."


@pytest.mark.asyncio
async def test_search_skips_non_object_results_and_unsafe_urls(monkeypatch):
    monkeypatch.setenv("GOOGLE_WEB_SEARCH_API_KEY", "key")
    monkeypatch.setenv("GOOGLE_WEB_SEARCH_CLIENT_ID", "client")
    mock_knowledge_provider(monkeypatch, payload={
        "results": [
            None,
            {"title": "Credentials", "url": "https://user:secret@example.com/private"},
            {"title": "Unexpected port", "url": "https://example.com:8443/private"},
            {"title": "Invalid port", "url": "https://example.com:not-a-port/private"},
            {"title": "Backslash", "url": "https://example.com\\\\@attacker.example/private"},
            {"url": "https://example.com/private"},
            {"title": "Valid", "url": "https://www.example.com/guide#section", "snippet": ["not", "text"]},
        ]
    })

    results = await search_knowledge(KnowledgeSearchRequest(query="repair appliance safely"))

    assert len(results) == 1
    assert results[0].title == "Valid"
    assert results[0].url == "https://www.example.com/guide"
    assert results[0].source == "example.com"
    assert results[0].snippet == ""
