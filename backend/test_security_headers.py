import logging
import uuid

from fastapi.testclient import TestClient

import backend.main as main
from backend.main import app

client = TestClient(app)


def test_security_headers_are_present_on_api_response():
    response = client.get("/health")

    assert response.status_code == 200
    assert response.headers["X-Content-Type-Options"] == "nosniff"
    assert response.headers["X-Frame-Options"] == "DENY"
    assert response.headers["Referrer-Policy"] == "no-referrer"
    assert response.headers["Permissions-Policy"] == "camera=(), microphone=(), geolocation=()"



def _assert_intercepted_response(response, request_id: str, origin: str):
    assert response.headers["X-Content-Type-Options"] == "nosniff"
    assert response.headers["X-Frame-Options"] == "DENY"
    assert response.headers["Content-Security-Policy"] == "default-src 'none'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'"
    assert response.headers["Referrer-Policy"] == "no-referrer"
    assert response.headers["Permissions-Policy"] == "camera=(), microphone=(), geolocation=()"
    assert response.headers["X-Request-ID"] == request_id
    if "*" in main.origins:
        assert response.headers["Access-Control-Allow-Origin"] == "*"
    elif origin in main.origins:
        assert response.headers["Access-Control-Allow-Origin"] == origin


def test_rate_limited_response_keeps_cors_security_headers_and_request_logging(monkeypatch, caplog):
    monkeypatch.delenv("USEIT_API_KEY", raising=False)
    monkeypatch.delenv("USEIT_SESSION_SECRET", raising=False)
    monkeypatch.setenv("USEIT_RATE_LIMIT_MODE", "memory")
    monkeypatch.setenv("USEIT_RATE_LIMIT_PER_MINUTE", "1")
    origin = next((value for value in main.origins if value != "*"), "https://useit.example")
    request_id = "rate-limit-429-regression"

    with caplog.at_level(logging.INFO, logger="useit"):
        with TestClient(app, client=(f"198.51.100.{uuid.uuid4().int % 250 + 1}", 12345)) as limited_client:
            first = limited_client.post(
                "/v1/analyze",
                headers={"Origin": origin, "X-Request-ID": request_id},
                json={},
            )
            limited = limited_client.post(
                "/v1/analyze",
                headers={"Origin": origin, "X-Request-ID": request_id},
                json={},
            )

    assert first.status_code == 422
    assert limited.status_code == 429
    assert limited.headers["Retry-After"] == "60"
    _assert_intercepted_response(limited, request_id, origin)
    assert "request_completed" in caplog.text
    assert '"statusCode": 429' in caplog.text
    assert f'"requestId": "{request_id}"' in caplog.text


def test_redis_rate_limit_unavailable_response_keeps_cors_security_headers_and_logging(monkeypatch, caplog):
    monkeypatch.delenv("USEIT_API_KEY", raising=False)
    monkeypatch.delenv("USEIT_SESSION_SECRET", raising=False)
    monkeypatch.delenv("USEIT_REDIS_URL", raising=False)
    monkeypatch.setenv("USEIT_RATE_LIMIT_MODE", "redis")
    origin = next((value for value in main.origins if value != "*"), "https://useit.example")
    request_id = "rate-limit-503-regression"

    with caplog.at_level(logging.INFO, logger="useit"):
        with TestClient(app, client=(f"198.51.100.{uuid.uuid4().int % 250 + 1}", 12345)) as limited_client:
            response = limited_client.post(
                "/v1/analyze",
                headers={"Origin": origin, "X-Request-ID": request_id},
                json={},
            )

    assert response.status_code == 503
    _assert_intercepted_response(response, request_id, origin)
    assert "request_completed" in caplog.text
    assert '"statusCode": 503' in caplog.text
    assert f'"requestId": "{request_id}"' in caplog.text
