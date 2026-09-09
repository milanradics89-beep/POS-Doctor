from unittest.mock import AsyncMock, patch

from fastapi.testclient import TestClient

from backend.main import app

client = TestClient(app)


def test_useit_analyze_exposes_primary_specialist_contract():
    scene = {
        "sceneType": "room",
        "items": [{"category": "furniture", "name": "sofa"}],
        "opportunities": [],
    }
    with patch("backend.main._analyze", new=AsyncMock(return_value=scene)), patch(
        "backend.main.rank_opportunities", return_value=[]
    ):
        response = client.post(
            "/v1/useit/analyze",
            json={"imageUri": "data:image/png;base64,c21hbGw=", "userIntent": "improve", "discoverProducts": False},
        )

    assert response.status_code == 200
    body = response.json()
    assert body["specialist"]["name"] == "home_design"
    assert body["specialist"]["focus"]
    assert "specialist" in body["pipeline"]
