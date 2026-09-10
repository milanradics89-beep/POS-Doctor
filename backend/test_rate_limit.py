from __future__ import annotations

from fastapi import FastAPI
from fastapi.testclient import TestClient

from backend.rate_limit import install_rate_limit


def test_rate_limit_returns_429_after_configured_limit(monkeypatch):
    monkeypatch.setenv("USEIT_RATE_LIMIT_PER_MINUTE", "2")
    app = FastAPI()

    @app.get("/v1/test")
    async def test_endpoint():
        return {"ok": True}

    install_rate_limit(app)
    client = TestClient(app)

    assert client.get("/v1/test").status_code == 200
    assert client.get("/v1/test").status_code == 200
    response = client.get("/v1/test")
    assert response.status_code == 429
    assert response.headers["Retry-After"] == "60"


def test_rate_limit_does_not_block_options_or_public_paths(monkeypatch):
    monkeypatch.setenv("USEIT_RATE_LIMIT_PER_MINUTE", "1")
    app = FastAPI()

    @app.options("/v1/test")
    async def options_endpoint():
        return {"ok": True}

    @app.get("/health")
    async def health():
        return {"status": "ok"}

    @app.get("/ready")
    async def ready():
        return {"status": "ready"}

    install_rate_limit(app)
    client = TestClient(app)

    assert client.options("/v1/test").status_code == 200
    assert client.get("/health").status_code == 200
    assert client.get("/ready").status_code == 200
