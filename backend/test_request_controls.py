from fastapi import FastAPI
from fastapi.testclient import TestClient

from backend.request_controls import (
    MAX_REQUEST_BYTES,
    MAX_REQUEST_TIMEOUT_SECONDS,
    MIN_REQUEST_TIMEOUT_SECONDS,
    DEFAULT_REQUEST_TIMEOUT_SECONDS,
    configured_request_timeout,
    install_request_controls,
)


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


def test_invalid_timeout_configuration_falls_back_safely(monkeypatch) -> None:
    for value in ("not-a-number", "nan", "inf", "-inf"):
        monkeypatch.setenv("USEIT_REQUEST_TIMEOUT_SECONDS", value)
        assert configured_request_timeout() == DEFAULT_REQUEST_TIMEOUT_SECONDS


def test_timeout_configuration_is_bounded(monkeypatch) -> None:
    monkeypatch.setenv("USEIT_REQUEST_TIMEOUT_SECONDS", "0.01")
    assert configured_request_timeout() == MIN_REQUEST_TIMEOUT_SECONDS
    monkeypatch.setenv("USEIT_REQUEST_TIMEOUT_SECONDS", "9999")
    assert configured_request_timeout() == MAX_REQUEST_TIMEOUT_SECONDS


def test_unexpected_failure_returns_generic_error_with_correlation_id() -> None:
    app = FastAPI()
    install_request_controls(app)

    @app.get("/boom")
    async def boom():
        raise RuntimeError("secret internal implementation detail")

    with TestClient(app) as client:
        response = client.get("/boom", headers={"X-Request-ID": "phase27-error"})

    assert response.status_code == 500
    assert response.headers["X-Request-ID"] == "phase27-error"
    assert response.json() == {
        "detail": "Internal server error.",
        "requestId": "phase27-error",
    }
    assert "secret internal implementation detail" not in response.text
