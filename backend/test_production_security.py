import os

import pytest

from backend.production_security import validate_production_security


def test_development_allows_missing_production_secrets(monkeypatch):
    monkeypatch.setenv("USEIT_ENV", "development")
    monkeypatch.delenv("OPENAI_API_KEY", raising=False)
    monkeypatch.delenv("USEIT_API_KEY", raising=False)
    monkeypatch.delenv("USEIT_CORS_ORIGINS", raising=False)
    validate_production_security()


def test_production_requires_secrets(monkeypatch):
    monkeypatch.setenv("USEIT_ENV", "production")
    monkeypatch.delenv("OPENAI_API_KEY", raising=False)
    monkeypatch.delenv("USEIT_API_KEY", raising=False)
    monkeypatch.setenv("USEIT_CORS_ORIGINS", "https://app.example.com")
    with pytest.raises(RuntimeError, match="Missing required production secrets"):
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
