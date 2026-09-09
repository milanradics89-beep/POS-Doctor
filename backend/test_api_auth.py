import os
from unittest.mock import AsyncMock, Mock, patch

from fastapi.testclient import TestClient

from backend.main import app

client = TestClient(app)


def test_health_remains_public_when_api_key_is_configured():
    with patch.dict(os.environ, {"USEIT_API_KEY": "secret"}, clear=False):
        response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["apiKeyRequired"] is True


def test_protected_endpoint_requires_api_key():
    with patch.dict(os.environ, {"USEIT_API_KEY": "secret"}, clear=False):
        response = client.post("/v1/analyze", json={"imageUri": "data:image/jpeg;base64," + "a" * 32})
    assert response.status_code == 401


def test_protected_endpoint_accepts_valid_api_key():
    mock_client = Mock()
    mock_client.chat.completions.create = AsyncMock(return_value=Mock(choices=[Mock(message=Mock(content='{"sceneType":"room","summary":"test","items":[],"constraints":[],"opportunities":[],"safetyNotes":[]}'))]))
    with patch.dict(os.environ, {"USEIT_API_KEY": "secret", "OPENAI_API_KEY": "test-key"}, clear=False), patch("backend.main._get_client", return_value=mock_client):
        response = client.post(
            "/v1/analyze",
            headers={"X-API-Key": "secret"},
            json={"imageUri": "data:image/jpeg;base64," + "a" * 32},
        )
    assert response.status_code == 200


def test_invalid_api_key_is_rejected():
    with patch.dict(os.environ, {"USEIT_API_KEY": "secret"}, clear=False):
        response = client.post(
            "/v1/analyze",
            headers={"X-API-Key": "wrong"},
            json={"imageUri": "data:image/jpeg;base64," + "a" * 32},
        )
    assert response.status_code == 401


def test_cors_preflight_remains_public_when_api_key_is_configured():
    with patch.dict(os.environ, {"USEIT_API_KEY": "secret"}, clear=False):
        response = client.options(
            "/v1/analyze",
            headers={
                "Origin": "http://localhost:3000",
                "Access-Control-Request-Method": "POST",
                "Access-Control-Request-Headers": "X-API-Key, Content-Type",
            },
        )
    assert response.status_code == 200
    assert response.headers.get("access-control-allow-origin") == "*"
