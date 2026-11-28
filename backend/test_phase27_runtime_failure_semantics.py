from __future__ import annotations

from fastapi import HTTPException
from fastapi.testclient import TestClient

import backend.main as main
import backend.product_discovery as discovery


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


def test_product_discovery_failure_degrades_on_its_separate_endpoint(monkeypatch, caplog):
    async def fail_search(_request):
        raise RuntimeError("provider outage")

    monkeypatch.setattr(discovery, "product_search", fail_search)

    with caplog.at_level("ERROR", logger="useit"):
        with TestClient(main.app) as client:
            response = client.post("/v1/products/discover", json={"query": "desk lamp"})

    assert "provider outage" not in caplog.text
    assert response.status_code == 200
    payload = response.json()
    assert payload["query"] == "desk lamp"
    assert payload["candidates"] == []
    assert payload["errors"] == [{"url": "", "message": "product search unavailable (RuntimeError)"}]
    assert "provider outage" not in response.text


def test_readiness_failure_does_not_disclose_dependency_details(monkeypatch):
    monkeypatch.delenv("OPENAI_API_KEY", raising=False)
    monkeypatch.delenv("USEIT_API_KEY", raising=False)

    with TestClient(main.app) as client:
        response = client.get("/ready")

    assert response.status_code == 503
    assert response.json() == {"detail": "Service is not ready."}



def test_vision_provider_exception_message_is_not_logged(monkeypatch, caplog):
    from unittest.mock import AsyncMock, Mock

    mock_client = Mock()
    mock_client.chat.completions.create = AsyncMock(
        side_effect=RuntimeError("PRIVATE_VISION_PROVIDER_RESPONSE")
    )
    monkeypatch.setattr(main, "_get_client", lambda: mock_client)

    with caplog.at_level("ERROR", logger="useit"):
        with TestClient(main.app) as client:
            response = client.post(
                "/v1/analyze",
                json={"imageUri": "https://example.com/image.jpg"},
            )

    assert response.status_code == 502
    assert "PRIVATE_VISION_PROVIDER_RESPONSE" not in caplog.text
