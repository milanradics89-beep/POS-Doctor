from __future__ import annotations

from fastapi import HTTPException
from fastapi.testclient import TestClient

import backend.main as main


SCENE = {
    "responseFormat": "scene_analysis_v1",
    "sceneType": "room",
    "summary": "A valid room scene for runtime failure semantics.",
    "items": [],
    "constraints": [],
    "opportunities": [],
    "safetyNotes": [],
}


def test_vision_failure_is_translated_to_safe_502(monkeypatch):
    async def fail(_request):
        raise HTTPException(status_code=502, detail="Vision analysis failed.")

    monkeypatch.setattr(main, "_analyze", fail)

    with TestClient(main.app) as client:
        response = client.post(
            "/v1/useit/analyze",
            json={"imageUri": "https://example.com/image.jpg", "discoverProducts": False},
        )

    assert response.status_code == 502
    assert response.json() == {"detail": "Vision analysis failed."}


def test_product_discovery_failure_degrades_without_failing_analysis(monkeypatch):
    async def fake_analyze(_request):
        return dict(SCENE)

    async def fail_discovery(_request):
        raise RuntimeError("provider outage")

    monkeypatch.setattr(main, "_analyze", fake_analyze)
    monkeypatch.setattr(main, "discover_products", fail_discovery)

    with TestClient(main.app) as client:
        response = client.post(
            "/v1/useit/analyze",
            json={
                "imageUri": "https://example.com/image.jpg",
                "userIntent": "shop",
                "discoverProducts": True,
            },
        )

    assert response.status_code == 200
    payload = response.json()
    assert payload["contractVersion"] == "useit_analyze_v1"
    assert payload["shopping"] == {
        "query": "room",
        "candidates": [],
        "errors": [{"url": "", "message": "product discovery unavailable"}],
    }
    assert "provider outage" not in response.text


def test_readiness_failure_does_not_disclose_dependency_details(monkeypatch):
    monkeypatch.delenv("OPENAI_API_KEY", raising=False)
    monkeypatch.delenv("USEIT_API_KEY", raising=False)

    with TestClient(main.app) as client:
        response = client.get("/ready")

    assert response.status_code == 503
    assert response.json() == {"detail": "Service is not ready."}
