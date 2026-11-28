from unittest.mock import AsyncMock

from fastapi.testclient import TestClient

import backend.main as main


SCENE = {
    "responseFormat": "scene_analysis_v1",
    "sceneType": "room",
    "summary": "A room scene with visible furniture for acceptance testing.",
    "items": [
        {
            "name": "desk",
            "category": "furniture",
            "confidence": 0.96,
            "attributes": ["wooden"],
        }
    ],
    "relations": [],
    "constraints": [],
    "opportunities": [],
    "safetyNotes": [],
}


async def _scene(_: object):
    return dict(SCENE)


def test_unified_endpoint_keeps_product_discovery_out_of_intent_classification(monkeypatch):
    analyze = AsyncMock(side_effect=_scene)
    discover = AsyncMock(
        return_value={
            "query": "room furniture modern blue under 50000 HUF",
            "candidates": [
                {
                    "id": "chair-1",
                    "name": "Verified chair",
                    "url": "https://example.com/chair",
                    "qualityScore": 0.91,
                    "searchRank": 1,
                }
            ],
            "errors": [],
        }
    )
    monkeypatch.setattr(main, "_analyze", analyze)
    monkeypatch.setattr(main, "discover_products", discover)

    with TestClient(main.app) as client:
        response = client.post(
            "/v1/useit/analyze",
            headers={"X-Request-ID": "phase25-e2e"},
            json={
                "imageUri": "data:image/png;base64,dGVzdC1pbWFnZQ==",
                "userIntent": "improve",
                "preferredStyles": ["modern"],
                "preferredColors": ["blue"],
                "budgetHuf": 50000,
                "discoverProducts": False,
                "productLimit": 1,
            },
        )

    assert response.status_code == 200
    body = response.json()
    assert body["contractVersion"] == "useit_analyze_v1"
    assert body["scene"]["sceneType"] == "room"
    assert body["intent"]["name"] == "improve"
    assert body["specialist"]["name"] == "home_design"
    assert body["shopping"] is None
    assert body["pipeline"][-1] == "plan"
    assert response.headers["X-Request-ID"] == "phase25-e2e"
    analyze.assert_awaited_once()
    discover.assert_not_awaited()


def test_unified_endpoint_skips_shopping_for_non_shopping_intent(monkeypatch):
    analyze = AsyncMock(side_effect=_scene)
    discover = AsyncMock()
    monkeypatch.setattr(main, "_analyze", analyze)
    monkeypatch.setattr(main, "discover_products", discover)

    with TestClient(main.app) as client:
        response = client.post(
            "/v1/useit/analyze",
            json={
                "imageUri": "data:image/png;base64,dGVzdC1pbWFnZQ==",
                "userIntent": "javítani szeretném",
                "discoverProducts": True,
            },
        )

    assert response.status_code == 200
    body = response.json()
    assert body["intent"]["name"] == "improve"
    assert body["shopping"] is None
    assert body["pipeline"][-1] == "plan"
    analyze.assert_awaited_once()
    discover.assert_not_awaited()
