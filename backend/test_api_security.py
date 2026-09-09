import pytest
from fastapi.testclient import TestClient

from backend.main import app


@pytest.fixture(autouse=True)
def clear_security_env(monkeypatch):
    monkeypatch.delenv("USEIT_API_KEY", raising=False)
    monkeypatch.setenv("USEIT_RATE_LIMIT_PER_MINUTE", "60")


def test_api_key_guard_protects_analysis(monkeypatch):
    monkeypatch.setenv("USEIT_API_KEY", "test-secret")

    with TestClient(app) as client:
        response = client.post("/v1/analyze", json={"imageUri": "https://example.com/image.jpg"})

    assert response.status_code == 401
    assert response.json()["detail"] == "Invalid or missing API key."


def test_api_key_guard_allows_valid_key_until_handler(monkeypatch):
    monkeypatch.setenv("USEIT_API_KEY", "test-secret")
    monkeypatch.delenv("OPENAI_API_KEY", raising=False)

    with TestClient(app) as client:
        response = client.post(
            "/v1/analyze",
            headers={"X-API-Key": "test-secret"},
            json={"imageUri": "https://example.com/image.jpg"},
        )

    assert response.status_code == 503
    assert response.json()["detail"] == "Vision service is not configured."


def test_rate_limit_returns_retry_after(monkeypatch):
    monkeypatch.setenv("USEIT_RATE_LIMIT_PER_MINUTE", "1")
    monkeypatch.delenv("USEIT_API_KEY", raising=False)
    monkeypatch.delenv("OPENAI_API_KEY", raising=False)

    with TestClient(app) as client:
        first = client.post("/v1/analyze", json={"imageUri": "https://example.com/image.jpg"})
        second = client.post("/v1/analyze", json={"imageUri": "https://example.com/image.jpg"})

    assert first.status_code == 503
    assert second.status_code == 429
    assert second.headers["Retry-After"] == "60"


def test_public_health_endpoint_remains_available(monkeypatch):
    monkeypatch.setenv("USEIT_API_KEY", "test-secret")

    with TestClient(app) as client:
        response = client.get("/health")

    assert response.status_code == 200
    assert response.json()["apiKeyRequired"] is True
