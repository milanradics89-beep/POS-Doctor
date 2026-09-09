from fastapi import FastAPI
from fastapi.testclient import TestClient

from backend.request_controls import MAX_REQUEST_BYTES, install_request_controls


def _client() -> TestClient:
    app = FastAPI()
    install_request_controls(app)

    @app.get("/ping")
    async def ping():
        return {"ok": True}

    return TestClient(app)


def test_request_gets_correlation_id() -> None:
    response = _client().get("/ping")
    assert response.status_code == 200
    assert len(response.headers["X-Request-ID"]) == 32


def test_client_correlation_id_is_preserved() -> None:
    response = _client().get("/ping", headers={"X-Request-ID": "client-trace-123"})
    assert response.status_code == 200
    assert response.headers["X-Request-ID"] == "client-trace-123"


def test_oversized_declared_body_is_rejected_before_handler() -> None:
    response = _client().post(
        "/ping",
        headers={"Content-Length": str(MAX_REQUEST_BYTES + 1)},
    )
    assert response.status_code == 413
    assert response.json()["detail"] == "Request body is too large."


def test_invalid_content_length_is_rejected() -> None:
    response = _client().post("/ping", headers={"Content-Length": "not-a-number"})
    assert response.status_code == 400
    assert response.json()["detail"] == "Invalid Content-Length."
