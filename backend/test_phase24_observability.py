import logging

from fastapi import FastAPI
from fastapi.testclient import TestClient

from backend.observability import install_observability
from backend.request_controls import install_request_controls


def test_request_observability_logs_safe_completion(caplog):
    app = FastAPI()
    install_request_controls(app)
    install_observability(app, logging.getLogger("phase24-test"))

    @app.get("/probe")
    async def probe():
        return {"status": "ok"}

    with caplog.at_level(logging.INFO, logger="phase24-test"):
        response = TestClient(app).get(
            "/probe",
            headers={"X-Request-ID": "phase24-test-request"},
        )

    assert response.status_code == 200
    assert response.headers["X-Request-ID"] == "phase24-test-request"
    assert "request_completed" in caplog.text
    assert '"requestId": "phase24-test-request"' in caplog.text
    assert '"method": "GET"' in caplog.text
    assert '"path": "/probe"' in caplog.text
    assert '"statusCode": 200' in caplog.text
    assert '"durationMs":' in caplog.text


def test_request_observability_does_not_log_request_payload(caplog):
    app = FastAPI()
    install_request_controls(app)
    install_observability(app, logging.getLogger("phase24-payload-test"))

    @app.post("/payload")
    async def payload():
        return {"status": "accepted"}

    with TestClient(app) as client:
        with caplog.at_level(logging.INFO, logger="phase24-payload-test"):
            response = client.post(
                "/payload",
                json={"imageUri": "data:image/png;base64,SECRET_IMAGE", "prompt": "SECRET_PROMPT"},
                headers={"X-Request-ID": "phase24-safe-payload"},
            )

    assert response.status_code == 200
    assert "SECRET_IMAGE" not in caplog.text
    assert "SECRET_PROMPT" not in caplog.text
