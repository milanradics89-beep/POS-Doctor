import logging

from fastapi.testclient import TestClient


def _load_client(monkeypatch):
    monkeypatch.setenv("USEIT_ENV", "development")
    monkeypatch.setenv("USEIT_API_KEY", "test-key")
    import backend.main as main
    return TestClient(main.app)


def test_health_is_public(monkeypatch):
    client = _load_client(monkeypatch)
    response = client.get("/health")
    assert response.status_code == 200


def test_protected_route_requires_api_key(monkeypatch):
    client = _load_client(monkeypatch)
    response = client.post("/v1/analyze", json={"imageUri": "https://example.com/image.png"})
    assert response.status_code == 401


def test_sensitive_payload_is_not_logged(monkeypatch, caplog):
    client = _load_client(monkeypatch)
    secret_image = "data:image/png;base64,PRIVATE_PAYLOAD"
    with caplog.at_level(logging.INFO):
        response = client.post("/v1/analyze", headers={"X-API-Key": "test-key"}, json={"imageUri": secret_image})
    assert response.status_code in {502, 503}
    assert "PRIVATE_PAYLOAD" not in caplog.text


def test_security_headers_present(monkeypatch):
    client = _load_client(monkeypatch)
    response = client.get("/health")
    assert response.headers.get("X-Content-Type-Options") == "nosniff"
    assert "frame-ancestors" in response.headers.get("Content-Security-Policy", "")
