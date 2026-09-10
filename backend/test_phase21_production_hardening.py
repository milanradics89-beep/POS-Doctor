import pytest
from fastapi import HTTPException

import backend.main as main
import backend.product_discovery as discovery


VALID_SCENE = {
    "responseFormat": "scene_analysis_v1",
    "sceneType": "room",
    "summary": "A valid room scene for degraded shopping validation.",
    "items": [],
    "constraints": [],
    "opportunities": [],
    "safetyNotes": [],
}


@pytest.mark.asyncio
async def test_product_search_http_failure_returns_contract_compatible_degraded_result(monkeypatch):
    async def fail_search(_request):
        raise HTTPException(status_code=503, detail="provider unavailable")

    monkeypatch.setattr(discovery, "product_search", fail_search)

    result = await discovery.discover_products(discovery.ProductDiscoveryRequest(query="room sofa"))

    assert result["query"] == "room sofa"
    assert result["candidates"] == []
    assert len(result["errors"]) == 1
    assert result["errors"][0]["url"] == ""
    assert "product search unavailable (503)" == result["errors"][0]["message"]


@pytest.mark.asyncio
async def test_product_resolution_unexpected_exception_isolated_per_candidate(monkeypatch):
    async def search(_request):
        return {
            "results": [
                {"url": "https://shop.example/a", "rank": 1, "title": "A"},
                {"url": "https://shop.example/b", "rank": 2, "title": "B"},
            ]
        }

    async def resolve(item):
        if item.url.endswith("/a"):
            raise RuntimeError("unexpected parser failure")
        return {
            "id": "b",
            "name": "B",
            "url": item.url,
            "qualityScore": 0.9,
        }

    monkeypatch.setattr(discovery, "product_search", search)
    monkeypatch.setattr(discovery, "resolve_product", resolve)

    result = await discovery.discover_products(discovery.ProductDiscoveryRequest(query="room sofa", max_resolve=2))

    assert len(result["candidates"]) == 1
    assert result["candidates"][0]["id"] == "b"
    assert len(result["errors"]) == 1
    assert result["errors"][0]["url"] == "https://shop.example/a"
    assert result["errors"][0]["message"] == "product resolution unavailable (RuntimeError)"


@pytest.mark.asyncio
async def test_unified_consumer_flow_survives_unexpected_discovery_failure(monkeypatch):
    async def fake_analyze(_request):
        return dict(VALID_SCENE)

    async def fail_discovery(_request):
        raise RuntimeError("search backend crashed")

    monkeypatch.setattr(main, "_analyze", fake_analyze)
    monkeypatch.setattr(main, "discover_products", fail_discovery)

    request = main.UseItAnalyzeRequest(
        imageUri="https://example.com/image.jpg",
        userIntent="buy",
        discoverProducts=True,
    )

    result = await main.useit_analyze(request)

    assert result["contractVersion"] == "useit_analyze_v1"
    assert result["scene"]["sceneType"] == "room"
    assert result["intent"]["name"] == "shop"
    assert result["shopping"] == {
        "query": "room",
        "candidates": [],
        "errors": [{"url": "", "message": "product discovery unavailable"}],
    }
    assert result["pipeline"][-1] == "shop"
