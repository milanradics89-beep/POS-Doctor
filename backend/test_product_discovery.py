import math

import pytest
from fastapi import HTTPException

from backend import product_discovery as discovery


def test_discovery_request_normalizes_query_locale_and_region():
    request = discovery.ProductDiscoveryRequest(
        query="  modern   desk  ",
        locale=" hu-HU ",
        region="hu",
    )
    assert request.query == "modern desk"
    assert request.locale == "hu-HU"
    assert request.region == "HU"


def test_discovery_request_rejects_whitespace_only_query():
    with pytest.raises(ValueError):
        discovery.ProductDiscoveryRequest(query="   ")


@pytest.mark.asyncio
async def test_discovery_ranks_candidates_and_preserves_search_metadata(monkeypatch):
    async def fake_search(request):
        assert request.query == "desk"
        assert request.region == "HU"
        return {
            "results": [
                {"url": "https://shop.example/a", "title": "A", "snippet": "first", "rank": 1},
                {"url": "https://shop.example/b", "title": "B", "snippet": "second", "rank": 2},
            ]
        }

    async def fake_resolve(request):
        return {
            "url": request.url,
            "name": request.url.rsplit("/", 1)[-1],
            "qualityScore": 0.5 if request.url.endswith("/a") else 0.9,
        }

    monkeypatch.setattr(discovery, "product_search", fake_search)
    monkeypatch.setattr(discovery, "resolve_product", fake_resolve)

    result = await discovery.discover_products(discovery.ProductDiscoveryRequest(query="desk"))

    assert [item["name"] for item in result["candidates"]] == ["b", "a"]
    assert result["candidates"][0]["searchRank"] == 2
    assert result["candidates"][0]["searchTitle"] == "B"
    assert result["candidates"][0]["searchSnippet"] == "second"
    assert result["errors"] == []


@pytest.mark.asyncio
async def test_discovery_returns_partial_results_when_one_product_fails(monkeypatch):
    async def fake_search(request):
        return {"results": [
            {"url": "https://shop.example/good", "title": "Good", "rank": 1},
            {"url": "https://shop.example/bad", "title": "Bad", "rank": 2},
        ]}

    async def fake_resolve(request):
        if request.url.endswith("/bad"):
            raise HTTPException(status_code=422, detail="provider detail must not leak")
        return {"name": "Good product", "qualityScore": 0.8}

    monkeypatch.setattr(discovery, "product_search", fake_search)
    monkeypatch.setattr(discovery, "resolve_product", fake_resolve)

    result = await discovery.discover_products(discovery.ProductDiscoveryRequest(query="desk"))

    assert len(result["candidates"]) == 1
    assert result["candidates"][0]["name"] == "Good product"
    assert result["errors"] == [{
        "url": "https://shop.example/bad",
        "message": "product resolution unavailable (422)",
    }]
    assert "provider detail must not leak" not in str(result)


@pytest.mark.asyncio
async def test_discovery_skips_malformed_search_entries_and_bounds_resolutions(monkeypatch):
    resolved_urls = []

    async def fake_search(request):
        return {"results": [
            {"url": "https://shop.example/one", "title": "One", "rank": 1},
            {"title": "Missing URL", "rank": 2},
            None,
            {"url": "https://shop.example/two", "title": "Two", "rank": 3},
        ]}

    async def fake_resolve(request):
        resolved_urls.append(request.url)
        return {"name": request.url.rsplit("/", 1)[-1], "qualityScore": float("nan")}

    monkeypatch.setattr(discovery, "product_search", fake_search)
    monkeypatch.setattr(discovery, "resolve_product", fake_resolve)

    result = await discovery.discover_products(
        discovery.ProductDiscoveryRequest(query="desk", max_resolve=1)
    )

    assert resolved_urls == ["https://shop.example/one"]
    assert len(result["candidates"]) == 1
    assert result["candidates"][0]["name"] == "one"
    assert math.isnan(result["candidates"][0]["qualityScore"])
    assert result["errors"] == []


@pytest.mark.asyncio
async def test_discovery_handles_invalid_search_payload(monkeypatch):
    async def fake_search(request):
        return {"unexpected": "shape"}

    monkeypatch.setattr(discovery, "product_search", fake_search)

    result = await discovery.discover_products(discovery.ProductDiscoveryRequest(query="desk"))

    assert result["candidates"] == []
    assert result["errors"] == [{"url": "", "message": "product search returned invalid data"}]


@pytest.mark.asyncio
async def test_discovery_sanitizes_search_provider_errors(monkeypatch):
    async def fake_search(request):
        raise RuntimeError("secret token=super-secret")

    monkeypatch.setattr(discovery, "product_search", fake_search)

    result = await discovery.discover_products(discovery.ProductDiscoveryRequest(query="desk"))

    assert result["candidates"] == []
    assert result["errors"] == [{"url": "", "message": "product search unavailable (RuntimeError)"}]
    assert "super-secret" not in str(result)
