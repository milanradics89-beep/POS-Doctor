import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient

from backend.api_auth import install_api_key_guard
from backend.main import app
from backend.rate_limit import install_rate_limit


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
    isolated = FastAPI()
    install_rate_limit(isolated)
    isolated.add_api_route("/protected", lambda: {"ok": True})

    with TestClient(isolated) as client:
        first = client.get("/protected")
        second = client.get("/protected")

    assert first.status_code == 200
    assert second.status_code == 429
    assert second.headers["Retry-After"] == "60"


def test_public_health_endpoint_remains_available(monkeypatch):
    monkeypatch.setenv("USEIT_API_KEY", "test-secret")

    with TestClient(app) as client:
        response = client.get("/health")

    assert response.status_code == 200
    assert response.json()["apiKeyRequired"] is True
