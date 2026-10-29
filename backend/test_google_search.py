from __future__ import annotations

import httpx
import pytest
from fastapi import HTTPException

from backend import google_search


def mock_provider(monkeypatch, *, payload=None, content=None, status_code=200):
    def handler(request):
        if content is not None:
            return httpx.Response(status_code, content=content, headers={"content-type": "application/json"})
        return httpx.Response(status_code, json=payload)
    transport = httpx.MockTransport(handler)
    monkeypatch.setattr(
        google_search.httpx,
        "AsyncClient",
        lambda **kwargs: httpx.AsyncClient(transport=transport, **kwargs),
    )


@pytest.mark.asyncio
async def test_search_filters_malformed_and_unsafe_provider_results(monkeypatch):
    monkeypatch.setenv("GOOGLE_WEB_SEARCH_API_KEY", "test-key")
    monkeypatch.setenv("GOOGLE_WEB_SEARCH_CLIENT_ID", "test-client")
    mock_provider(monkeypatch, payload={"results": [
        {"url": "https://shop.example/item", "title": "Valid item", "snippet": "Good"},
        {"url": "javascript:alert(1)", "title": "Unsafe"},
        {"url": "https://user:secret@shop.example/item", "title": "Credentials"},
        {"url": "https://shop.example:8443/item", "title": "Unexpected port"},
        None,
        {"url": "https://shop.example/no-title"},
    ]})
    result = await google_search.product_search(google_search.ProductSearchRequest(query="chair"))
    assert len(result["results"]) == 1
    assert result["results"][0]["url"] == "https://shop.example/item"
    assert result["results"][0]["source"] == "shop.example"
    assert result["results"][0]["title"] == "Valid item"


@pytest.mark.asyncio
async def test_search_rejects_invalid_json_from_provider(monkeypatch):
    monkeypatch.setenv("GOOGLE_WEB_SEARCH_API_KEY", "test-key")
    monkeypatch.setenv("GOOGLE_WEB_SEARCH_CLIENT_ID", "test-client")
    mock_provider(monkeypatch, content=b"not-json")
    with pytest.raises(HTTPException) as exc:
        await google_search.product_search(google_search.ProductSearchRequest(query="chair"))
    assert exc.value.status_code == 502
    assert exc.value.detail == "Google Web Search returned invalid JSON."


@pytest.mark.asyncio
async def test_search_rejects_invalid_provider_response_shape(monkeypatch):
    monkeypatch.setenv("GOOGLE_WEB_SEARCH_API_KEY", "test-key")
    monkeypatch.setenv("GOOGLE_WEB_SEARCH_CLIENT_ID", "test-client")
    mock_provider(monkeypatch, payload={"results": {"not": "a list"}})
    with pytest.raises(HTTPException) as exc:
        await google_search.product_search(google_search.ProductSearchRequest(query="chair"))
    assert exc.value.status_code == 502
    assert exc.value.detail == "Google Web Search returned an invalid response."
