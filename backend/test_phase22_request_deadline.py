import asyncio

from fastapi import FastAPI
from fastapi.testclient import TestClient

import backend.request_controls as request_controls


def _app() -> FastAPI:
    app = FastAPI()
    request_controls.install_request_controls(app)

    @app.get("/slow")
    async def slow():
        await asyncio.sleep(0.05)
        return {"ok": True}

    return app


def test_request_deadline_returns_504_and_preserves_request_id(monkeypatch):
    monkeypatch.setattr(request_controls, "REQUEST_TIMEOUT_SECONDS", 0.01)

    with TestClient(_app()) as client:
        response = client.get("/slow", headers={"X-Request-ID": "phase22-test"})

    assert response.status_code == 504
    assert response.headers["X-Request-ID"] == "phase22-test"
    assert response.json() == {"detail": "Request timed out.", "requestId": "phase22-test"}


def test_invalid_request_id_is_replaced_before_timeout(monkeypatch):
    monkeypatch.setattr(request_controls, "REQUEST_TIMEOUT_SECONDS", 0.01)

    with TestClient(_app()) as client:
        response = client.get("/slow", headers={"X-Request-ID": "bad id"})

    assert response.status_code == 504
    request_id = response.headers["X-Request-ID"]
    assert request_id == response.json()["requestId"]
    assert request_id != "bad id"
    assert len(request_id) == 32
