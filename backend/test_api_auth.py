import os
from unittest.mock import AsyncMock, Mock, patch

from fastapi.testclient import TestClient

from backend.api_auth import issue_session_token, verify_session_token
from backend.attestation import issue_challenge
from backend.main import app

client = TestClient(app)


def test_health_remains_public_when_api_key_is_configured():
    with patch.dict(os.environ, {"USEIT_API_KEY": "secret"}, clear=False):
        response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["apiKeyConfigured"] is True


def test_session_endpoint_is_public_and_issues_short_lived_token():
    with patch.dict(os.environ, {"USEIT_SESSION_SECRET": "s" * 32, "USEIT_ATTESTATION_MODE": "disabled"}, clear=False):
        response = client.post("/v1/session")
        assert response.status_code == 200
        payload = response.json()
        assert payload["tokenType"] == "Bearer"
        assert payload["expiresIn"] <= 3600
        assert verify_session_token(payload["accessToken"]) is True


def test_required_attestation_rejects_missing_evidence():
    with patch.dict(os.environ, {"USEIT_SESSION_SECRET": "s" * 32, "USEIT_ATTESTATION_MODE": "required"}, clear=False):
        response = client.post("/v1/session")
    assert response.status_code == 401
    assert response.json()["detail"] == "attestation_required"


def test_optional_attestation_fails_closed_until_provider_verifier_exists():
    with patch.dict(os.environ, {"USEIT_SESSION_SECRET": "s" * 32, "USEIT_ATTESTATION_MODE": "optional", "USEIT_ATTESTATION_PROVIDER": "apple_app_attest"}, clear=False):
        challenge = issue_challenge(ttl_seconds=60)
        response = client.post(
            "/v1/session",
            json={
                "provider": challenge.provider.value,
                "challenge": challenge.challenge,
                "assertion": "test-assertion",
                "appId": challenge.app_id,
            },
        )
    assert response.status_code == 503
    assert response.json()["detail"] == "provider_unavailable"


def test_required_attestation_rejects_replayed_challenge():
    with patch.dict(os.environ, {"USEIT_SESSION_SECRET": "s" * 32, "USEIT_ATTESTATION_MODE": "required", "USEIT_ATTESTATION_PROVIDER": "apple_app_attest"}, clear=False):
        challenge = issue_challenge(ttl_seconds=60)
        payload = {
            "provider": challenge.provider.value,
            "challenge": challenge.challenge,
            "assertion": "test-assertion",
            "appId": challenge.app_id,
        }
        first = client.post("/v1/session", json=payload)
        second = client.post("/v1/session", json=payload)
    assert first.status_code == 503
    assert second.status_code == 401
    assert second.json()["detail"] == "challenge_invalid_or_replayed"


def test_required_attestation_rejects_wrong_app():
    with patch.dict(os.environ, {"USEIT_SESSION_SECRET": "s" * 32, "USEIT_ATTESTATION_MODE": "required", "USEIT_ATTESTATION_PROVIDER": "apple_app_attest", "USEIT_ATTESTATION_APP_ID": "com.useit.app"}, clear=False):
        challenge = issue_challenge(ttl_seconds=60)
        response = client.post(
            "/v1/session",
            json={
                "provider": challenge.provider.value,
                "challenge": challenge.challenge,
                "assertion": "test-assertion",
                "appId": "com.attacker.app",
            },
        )
    assert response.status_code == 401
    assert response.json()["detail"] == "wrong_app"


def test_session_token_rejects_tampering():
    with patch.dict(os.environ, {"USEIT_SESSION_SECRET": "s" * 32}, clear=False):
        token, _ = issue_session_token(now=1_000)
        assert verify_session_token(token, now=1_100) is True
        parts = token.split(".")
        parts[1] = parts[1][:-1] + ("A" if parts[1][-1] != "A" else "B")
        assert verify_session_token(".".join(parts), now=1_100) is False


def test_protected_endpoint_requires_api_key_or_session():
    with patch.dict(os.environ, {"USEIT_API_KEY": "secret", "USEIT_SESSION_SECRET": "s" * 32}, clear=False):
        response = client.post("/v1/analyze", json={"imageUri": "data:image/jpeg;base64," + "a" * 32})
    assert response.status_code == 401


def test_protected_endpoint_accepts_valid_api_key():
    mock_client = Mock()
    mock_client.chat.completions.create = AsyncMock(return_value=Mock(choices=[Mock(message=Mock(content='{"sceneType":"room","summary":"test","items":[],"constraints":[],"opportunities":[],"safetyNotes":[]}'))]))
    with patch.dict(os.environ, {"USEIT_API_KEY": "secret", "OPENAI_API_KEY": "test-key"}, clear=False), patch("backend.main._get_client", return_value=mock_client):
        response = client.post(
            "/v1/analyze",
            headers={"X-API-Key": "secret"},
            json={"imageUri": "data:image/jpeg;base64," + "a" * 32},
        )
    assert response.status_code == 200


def test_protected_endpoint_accepts_valid_session_token():
    mock_client = Mock()
    mock_client.chat.completions.create = AsyncMock(return_value=Mock(choices=[Mock(message=Mock(content='{"sceneType":"room","summary":"test","items":[],"constraints":[],"opportunities":[],"safetyNotes":[]}'))]))
    with patch.dict(os.environ, {"USEIT_SESSION_SECRET": "s" * 32, "USEIT_ATTESTATION_MODE": "disabled", "OPENAI_API_KEY": "test-key"}, clear=False), patch("backend.main._get_client", return_value=mock_client):
        token, _ = issue_session_token()
        response = client.post(
            "/v1/analyze",
            headers={"Authorization": f"Bearer {token}"},
            json={"imageUri": "data:image/jpeg;base64," + "a" * 32},
        )
    assert response.status_code == 200


def test_invalid_api_key_is_rejected():
    with patch.dict(os.environ, {"USEIT_API_KEY": "secret"}, clear=False):
        response = client.post(
            "/v1/analyze",
            headers={"X-API-Key": "wrong"},
            json={"imageUri": "data:image/jpeg;base64," + "a" * 32},
        )
    assert response.status_code == 401


def test_cors_preflight_remains_public_when_api_key_is_configured():
    configured_origin = next(
        (origin.strip() for origin in os.environ.get("USEIT_CORS_ORIGINS", "*").split(",") if origin.strip() and origin.strip() != "*"),
        "http://localhost:3000",
    )
    with patch.dict(os.environ, {"USEIT_API_KEY": "secret"}, clear=False):
        response = client.options(
            "/v1/analyze",
            headers={
                "Origin": configured_origin,
                "Access-Control-Request-Method": "POST",
                "Access-Control-Request-Headers": "Authorization, Content-Type",
            },
        )
    assert response.status_code == 200
    allow_origin = response.headers.get("access-control-allow-origin")
    assert allow_origin in {configured_origin, "*"}


def test_cors_preflight_rejects_unknown_origin():
    configured_origins = {
        origin.strip()
        for origin in os.environ.get("USEIT_CORS_ORIGINS", "*").split(",")
        if origin.strip() and origin.strip() != "*"
    }
    if not configured_origins:
        return

    unknown_origin = "https://not-allowed.useit.invalid"
    assert unknown_origin not in configured_origins
    with patch.dict(os.environ, {"USEIT_API_KEY": "secret"}, clear=False):
        response = client.options(
            "/v1/analyze",
            headers={
                "Origin": unknown_origin,
                "Access-Control-Request-Method": "POST",
                "Access-Control-Request-Headers": "Authorization, Content-Type",
            },
        )
    assert response.status_code == 400
    assert "access-control-allow-origin" not in response.headers
