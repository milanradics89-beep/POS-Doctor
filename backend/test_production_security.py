import pytest
from fastapi import HTTPException

from backend.production_security import enforce_production_configuration, validate_production_security


def test_development_allows_missing_production_secrets(monkeypatch):
    monkeypatch.setenv("USEIT_ENV", "development")
    monkeypatch.delenv("OPENAI_API_KEY", raising=False)
    monkeypatch.delenv("USEIT_API_KEY", raising=False)
    monkeypatch.delenv("USEIT_SESSION_SECRET", raising=False)
    monkeypatch.delenv("USEIT_CORS_ORIGINS", raising=False)
    validate_production_security()


def test_production_requires_secrets(monkeypatch):
    monkeypatch.setenv("USEIT_ENV", "production")
    monkeypatch.delenv("OPENAI_API_KEY", raising=False)
    monkeypatch.delenv("USEIT_API_KEY", raising=False)
    monkeypatch.delenv("USEIT_SESSION_SECRET", raising=False)
    monkeypatch.setenv("USEIT_CORS_ORIGINS", "https://app.example.com")
    with pytest.raises(RuntimeError, match="Missing required production secrets"):
        validate_production_security()


@pytest.mark.parametrize("openai_api_key", ["", "   ", "\t\n"])
def test_production_rejects_blank_openai_api_key(monkeypatch, openai_api_key):
    monkeypatch.setenv("USEIT_ENV", "production")
    monkeypatch.setenv("OPENAI_API_KEY", openai_api_key)
    monkeypatch.setenv("USEIT_API_KEY", "u" * 32)
    monkeypatch.delenv("USEIT_SESSION_SECRET", raising=False)
    monkeypatch.setenv("USEIT_CORS_ORIGINS", "https://app.example.com")

    with pytest.raises(RuntimeError, match="Missing required production secrets: OPENAI_API_KEY"):
        validate_production_security()


def test_production_accepts_server_issued_session_secret(monkeypatch):
    monkeypatch.setenv("USEIT_ENV", "production")
    monkeypatch.setenv("OPENAI_API_KEY", "secret")
    monkeypatch.delenv("USEIT_API_KEY", raising=False)
    monkeypatch.setenv("USEIT_SESSION_SECRET", "s" * 32)
    monkeypatch.setenv("USEIT_ATTESTATION_MODE", "required")
    monkeypatch.setenv("USEIT_ATTESTATION_APP_ID", "com.useit.app")
    monkeypatch.setenv("USEIT_REDIS_URL", "redis://localhost:6379/0")
    monkeypatch.setenv("USEIT_RATE_LIMIT_MODE", "redis")
    monkeypatch.setenv("USEIT_ATTESTATION_PROVIDER", "google_play_integrity")
    monkeypatch.setenv("USEIT_GOOGLE_PLAY_PACKAGE_NAME", "com.useit.app")
    monkeypatch.setenv("USEIT_GOOGLE_PLAY_CERT_SHA256", "A" * 43)
    monkeypatch.setenv("USEIT_CORS_ORIGINS", "https://app.example.com")
    monkeypatch.setenv("USEIT_ALLOW_DOCS", "false")
    validate_production_security()


def test_production_rejects_google_play_attestation_app_id_mismatch(monkeypatch):
    monkeypatch.setenv("USEIT_ENV", "production")
    monkeypatch.setenv("OPENAI_API_KEY", "secret")
    monkeypatch.delenv("USEIT_API_KEY", raising=False)
    monkeypatch.setenv("USEIT_SESSION_SECRET", "s" * 32)
    monkeypatch.setenv("USEIT_ATTESTATION_MODE", "required")
    monkeypatch.setenv("USEIT_ATTESTATION_APP_ID", "com.useit.wrong")
    monkeypatch.setenv("USEIT_REDIS_URL", "redis://localhost:6379/0")
    monkeypatch.setenv("USEIT_ATTESTATION_PROVIDER", "google_play_integrity")
    monkeypatch.setenv("USEIT_GOOGLE_PLAY_PACKAGE_NAME", "com.useit.app")
    monkeypatch.setenv("USEIT_GOOGLE_PLAY_CERT_SHA256", "A" * 43)
    monkeypatch.setenv("USEIT_CORS_ORIGINS", "https://app.example.com")
    monkeypatch.setenv("USEIT_ALLOW_DOCS", "false")

    with pytest.raises(RuntimeError, match="USEIT_ATTESTATION_APP_ID must match USEIT_GOOGLE_PLAY_PACKAGE_NAME"):
        validate_production_security()


def test_production_rejects_optional_attestation_with_session_secret(monkeypatch):
    monkeypatch.setenv("USEIT_ENV", "production")
    monkeypatch.setenv("OPENAI_API_KEY", "secret")
    monkeypatch.delenv("USEIT_API_KEY", raising=False)
    monkeypatch.setenv("USEIT_SESSION_SECRET", "s" * 32)
    monkeypatch.setenv("USEIT_ATTESTATION_MODE", "optional")
    monkeypatch.setenv("USEIT_CORS_ORIGINS", "https://app.example.com")
    with pytest.raises(RuntimeError, match="USEIT_ATTESTATION_MODE must be required"):
        validate_production_security()


def test_production_rejects_short_session_secret(monkeypatch):
    monkeypatch.setenv("USEIT_ENV", "production")
    monkeypatch.setenv("OPENAI_API_KEY", "secret")
    monkeypatch.delenv("USEIT_API_KEY", raising=False)
    monkeypatch.setenv("USEIT_SESSION_SECRET", "too-short")
    monkeypatch.setenv("USEIT_CORS_ORIGINS", "https://app.example.com")
    with pytest.raises(RuntimeError, match="at least 32 characters"):
        validate_production_security()


def test_production_rejects_short_api_key(monkeypatch):
    monkeypatch.setenv("USEIT_ENV", "production")
    monkeypatch.setenv("OPENAI_API_KEY", "test-openai")
    monkeypatch.setenv("USEIT_API_KEY", "too-short")
    monkeypatch.delenv("USEIT_SESSION_SECRET", raising=False)
    monkeypatch.setenv("USEIT_CORS_ORIGINS", "https://app.example.com")

    with pytest.raises(RuntimeError, match="USEIT_API_KEY must be at least 32 characters"):
        validate_production_security()


def test_production_rejects_wildcard_cors(monkeypatch):
    monkeypatch.setenv("USEIT_ENV", "production")
    monkeypatch.setenv("OPENAI_API_KEY", "secret")
    monkeypatch.setenv("USEIT_API_KEY", "u" * 32)
    monkeypatch.setenv("USEIT_CORS_ORIGINS", "*")
    monkeypatch.setenv("USEIT_RATE_LIMIT_MODE", "redis")
    monkeypatch.setenv("USEIT_REDIS_URL", "redis://localhost:6379/0")
    with pytest.raises(RuntimeError, match="Wildcard CORS"):
        validate_production_security()


def test_production_rejects_enabled_interactive_docs(monkeypatch):
    monkeypatch.setenv("USEIT_ENV", "production")
    monkeypatch.setenv("OPENAI_API_KEY", "secret")
    monkeypatch.setenv("USEIT_API_KEY", "u" * 32)
    monkeypatch.setenv("USEIT_CORS_ORIGINS", "https://app.example.com")
    monkeypatch.setenv("USEIT_ALLOW_DOCS", "true")
    monkeypatch.setenv("USEIT_RATE_LIMIT_MODE", "redis")
    monkeypatch.setenv("USEIT_REDIS_URL", "redis://localhost:6379/0")
    with pytest.raises(RuntimeError, match="documentation"):
        validate_production_security()


def test_valid_production_configuration_passes(monkeypatch):
    monkeypatch.setenv("USEIT_ENV", "production")
    monkeypatch.setenv("OPENAI_API_KEY", "test-openai")
    monkeypatch.setenv("USEIT_API_KEY", "u" * 32)
    monkeypatch.setenv("USEIT_CORS_ORIGINS", "https://app.example.com")
    monkeypatch.setenv("USEIT_ALLOW_DOCS", "false")
    monkeypatch.setenv("USEIT_RATE_LIMIT_MODE", "redis")
    monkeypatch.setenv("USEIT_REDIS_URL", "redis://localhost:6379/0")
    validate_production_security()


def test_runtime_enforcement_returns_generic_503(monkeypatch):
    monkeypatch.setenv("USEIT_ENV", "production")
    monkeypatch.setenv("OPENAI_API_KEY", "test-openai")
    api_key = "u" * 32
    monkeypatch.setenv("USEIT_API_KEY", api_key)
    monkeypatch.setenv("USEIT_CORS_ORIGINS", "*")
    monkeypatch.setenv("USEIT_RATE_LIMIT_MODE", "redis")
    monkeypatch.setenv("USEIT_REDIS_URL", "redis://localhost:6379/0")

    with pytest.raises(HTTPException) as exc_info:
        enforce_production_configuration()

    assert exc_info.value.status_code == 503
    assert exc_info.value.detail == "Production security configuration is incomplete"
    assert api_key not in str(exc_info.value.detail)


def test_production_google_play_integrity_requires_signing_certificate_pin(monkeypatch):
    monkeypatch.setenv("USEIT_ENV", "production")
    monkeypatch.setenv("OPENAI_API_KEY", "secret")
    monkeypatch.delenv("USEIT_API_KEY", raising=False)
    monkeypatch.setenv("USEIT_SESSION_SECRET", "s" * 32)
    monkeypatch.setenv("USEIT_ATTESTATION_MODE", "required")
    monkeypatch.setenv("USEIT_ATTESTATION_APP_ID", "com.useit.app")
    monkeypatch.setenv("USEIT_REDIS_URL", "redis://localhost:6379/0")
    monkeypatch.setenv("USEIT_ATTESTATION_PROVIDER", "google_play_integrity")
    monkeypatch.setenv("USEIT_GOOGLE_PLAY_PACKAGE_NAME", "com.useit.app")
    monkeypatch.delenv("USEIT_GOOGLE_PLAY_CERT_SHA256", raising=False)
    monkeypatch.setenv("USEIT_CORS_ORIGINS", "https://app.example.com")
    monkeypatch.setenv("USEIT_ALLOW_DOCS", "false")
    with pytest.raises(RuntimeError, match="USEIT_GOOGLE_PLAY_CERT_SHA256 is required"):
        validate_production_security()



@pytest.mark.parametrize("certificate_pins", [",,,", " , , ", "\t,\n,"])
def test_production_rejects_google_play_attestation_without_usable_certificate_pins(monkeypatch, certificate_pins):
    monkeypatch.setenv("USEIT_ENV", "production")
    monkeypatch.setenv("OPENAI_API_KEY", "secret")
    monkeypatch.delenv("USEIT_API_KEY", raising=False)
    monkeypatch.setenv("USEIT_SESSION_SECRET", "s" * 32)
    monkeypatch.setenv("USEIT_ATTESTATION_MODE", "required")
    monkeypatch.setenv("USEIT_ATTESTATION_APP_ID", "com.useit.app")
    monkeypatch.setenv("USEIT_REDIS_URL", "redis://localhost:6379/0")
    monkeypatch.setenv("USEIT_RATE_LIMIT_MODE", "redis")
    monkeypatch.setenv("USEIT_ATTESTATION_PROVIDER", "google_play_integrity")
    monkeypatch.setenv("USEIT_GOOGLE_PLAY_PACKAGE_NAME", "com.useit.app")
    monkeypatch.setenv("USEIT_GOOGLE_PLAY_CERT_SHA256", certificate_pins)
    monkeypatch.setenv("USEIT_CORS_ORIGINS", "https://app.example.com")
    monkeypatch.setenv("USEIT_ALLOW_DOCS", "false")

    with pytest.raises(RuntimeError, match="must contain at least one non-empty signing certificate digest"):
        validate_production_security()


def test_production_rejects_process_local_memory_rate_limiting(monkeypatch):
    monkeypatch.setenv("USEIT_ENV", "production")
    monkeypatch.setenv("OPENAI_API_KEY", "test-openai")
    monkeypatch.setenv("USEIT_API_KEY", "u" * 32)
    monkeypatch.setenv("USEIT_CORS_ORIGINS", "https://app.example.com")
    monkeypatch.setenv("USEIT_ALLOW_DOCS", "false")
    monkeypatch.setenv("USEIT_RATE_LIMIT_MODE", "memory")
    monkeypatch.delenv("USEIT_REDIS_URL", raising=False)

    with pytest.raises(RuntimeError, match="USEIT_RATE_LIMIT_MODE must be redis in production"):
        validate_production_security()


def test_production_requires_shared_redis_url_for_rate_limiting(monkeypatch):
    monkeypatch.setenv("USEIT_ENV", "production")
    monkeypatch.setenv("OPENAI_API_KEY", "test-openai")
    monkeypatch.setenv("USEIT_API_KEY", "u" * 32)
    monkeypatch.setenv("USEIT_CORS_ORIGINS", "https://app.example.com")
    monkeypatch.setenv("USEIT_ALLOW_DOCS", "false")
    monkeypatch.setenv("USEIT_RATE_LIMIT_MODE", "redis")
    monkeypatch.delenv("USEIT_REDIS_URL", raising=False)

    with pytest.raises(RuntimeError, match="USEIT_REDIS_URL is required when Redis rate limiting is enabled"):
        validate_production_security()
