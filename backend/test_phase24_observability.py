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


def test_request_observability_redacts_memory_capability_on_success_and_error(caplog):
    app = FastAPI()
    install_request_controls(app)
    install_observability(app, logging.getLogger("phase24-memory-path-test"))

    @app.get("/v1/memory/{memory_id}")
    async def read_memory(memory_id: str):
        return {"status": "ok"}

    @app.delete("/v1/memory/{memory_id}")
    async def delete_memory(memory_id: str):
        raise RuntimeError("simulated memory failure")

    memory_id = "MEMORY_CAPABILITY_SENTINEL_0123456789"
    client = TestClient(app, raise_server_exceptions=False)

    with caplog.at_level(logging.INFO, logger="phase24-memory-path-test"):
        success = client.get(f"/v1/memory/{memory_id}")
        failure = client.delete(f"/v1/memory/{memory_id}")

    assert success.status_code == 200
    assert failure.status_code == 500
    assert memory_id not in caplog.text
    assert caplog.text.count("/v1/memory/[REDACTED]") == 2
