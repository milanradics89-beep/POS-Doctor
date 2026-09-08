import json
from unittest.mock import AsyncMock, Mock, patch

from fastapi.testclient import TestClient

from backend.main import app

client = TestClient(app)


def _vision_payload():
    return {
        "sceneType": "room",
        "summary": "A room with a sofa.",
        "items": [{"name": "sofa", "category": "furniture", "confidence": 0.95, "attributes": ["grey"]}],
        "constraints": [],
        "opportunities": [{"id": "room-1", "title": "Improve layout", "description": "Open the walking path.", "kind": "improve", "effort": "easy", "durationMinutes": 15, "requiredItems": [], "missingItems": [], "visualizable": True}],
        "safetyNotes": [],
    }


def test_analyze_contract_without_external_network_call():
    client_mock = Mock()
    client_mock.chat.completions.create = AsyncMock(return_value=Mock(choices=[Mock(message=Mock(content=json.dumps(_vision_payload()))) ]))
    with patch("backend.main._get_client", return_value=client_mock):
        response = client.post("/v1/analyze", json={"imageUri": "data:image/jpeg;base64," + "a" * 32})
    assert response.status_code == 200
    body = response.json()
    assert body["sceneType"] == "room"
    assert isinstance(body["items"], list)
    assert isinstance(body["opportunities"], list)
    assert isinstance(body["safetyNotes"], list)
