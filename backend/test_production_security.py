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


def test_production_accepts_server_issued_session_secret(monkeypatch):
    monkeypatch.setenv("USEIT_ENV", "production")
    monkeypatch.setenv("OPENAI_API_KEY", "secret")
    monkeypatch.delenv("USEIT_API_KEY", raising=False)
    monkeypatch.setenv("USEIT_SESSION_SECRET", "s" * 32)
    monkeypatch.setenv("USEIT_CORS_ORIGINS", "https://app.example.com")
    monkeypatch.setenv("USEIT_ALLOW_DOCS", "false")
    validate_production_security()


def test_production_rejects_short_session_secret(monkeypatch):
    monkeypatch.setenv("USEIT_ENV", "production")
    monkeypatch.setenv("OPENAI_API_KEY", "secret")
    monkeypatch.delenv("USEIT_API_KEY", raising=False)
    monkeypatch.setenv("USEIT_SESSION_SECRET", "too-short")
    monkeypatch.setenv("USEIT_CORS_ORIGINS", "https://app.example.com")
    with pytest.raises(RuntimeError, match="at least 32 characters"):
        validate_production_security()


def test_production_rejects_wildcard_cors(monkeypatch):
    monkeypatch.setenv("USEIT_ENV", "production")
    monkeypatch.setenv("OPENAI_API_KEY", "secret")
    monkeypatch.setenv("USEIT_API_KEY", "secret")
    monkeypatch.setenv("USEIT_CORS_ORIGINS", "*")
    with pytest.raises(RuntimeError, match="Wildcard CORS"):
        validate_production_security()


def test_production_rejects_enabled_interactive_docs(monkeypatch):
    monkeypatch.setenv("USEIT_ENV", "production")
    monkeypatch.setenv("OPENAI_API_KEY", "secret")
    monkeypatch.setenv("USEIT_API_KEY", "secret")
    monkeypatch.setenv("USEIT_CORS_ORIGINS", "https://app.example.com")
    monkeypatch.setenv("USEIT_ALLOW_DOCS", "true")
    with pytest.raises(RuntimeError, match="documentation"):
        validate_production_security()


def test_valid_production_configuration_passes(monkeypatch):
    monkeypatch.setenv("USEIT_ENV", "production")
    monkeypatch.setenv("OPENAI_API_KEY", "test-openai")
    monkeypatch.setenv("USEIT_API_KEY", "test-useit")
    monkeypatch.setenv("USEIT_CORS_ORIGINS", "https://app.example.com")
    monkeypatch.setenv("USEIT_ALLOW_DOCS", "false")
    validate_production_security()


def test_runtime_enforcement_returns_generic_503(monkeypatch):
    monkeypatch.setenv("USEIT_ENV", "production")
    monkeypatch.setenv("OPENAI_API_KEY", "test-openai")
    monkeypatch.setenv("USEIT_API_KEY", "test-useit")
    monkeypatch.setenv("USEIT_CORS_ORIGINS", "*")

    with pytest.raises(HTTPException) as exc_info:
        enforce_production_configuration()

    assert exc_info.value.status_code == 503
    assert exc_info.value.detail == "Production security configuration is incomplete"
    assert "test-useit" not in str(exc_info.value.detail)
