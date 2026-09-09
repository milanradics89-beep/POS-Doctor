import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient

from backend.api_auth import install_api_key_guard


def _app(monkeypatch):
    monkeypatch.setenv("USEIT_API_KEY", "test-secret")
    app = FastAPI()

    @app.get("/health")
    async def health():
        return {"status": "ok"}

    @app.get("/protected")
    async def protected():
        return {"ok": True}

    install_api_key_guard(app)
    return app


def test_public_health_does_not_require_api_key(monkeypatch):
    client = TestClient(_app(monkeypatch))
    response = client.get("/health")
    assert response.status_code == 200


def test_protected_endpoint_rejects_missing_key(monkeypatch):
    client = TestClient(_app(monkeypatch))
    response = client.get("/protected")
    assert response.status_code == 401
    assert response.json() == {"detail": "Invalid or missing API key."}


def test_protected_endpoint_rejects_wrong_key(monkeypatch):
    client = TestClient(_app(monkeypatch))
    response = client.get("/protected", headers={"X-API-Key": "wrong"})
    assert response.status_code == 401


def test_protected_endpoint_accepts_correct_key(monkeypatch):
    client = TestClient(_app(monkeypatch))
    response = client.get("/protected", headers={"X-API-Key": "test-secret"})
    assert response.status_code == 200
    assert response.json() == {"ok": True}


def test_options_is_allowed_for_preflight(monkeypatch):
    client = TestClient(_app(monkeypatch))
    response = client.options("/protected")
    assert response.status_code != 401
