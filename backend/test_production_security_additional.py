import pytest

from backend.production_security import validate_production_security


def _production(monkeypatch):
    monkeypatch.setenv("USEIT_ENV", "production")
    monkeypatch.setenv("OPENAI_API_KEY", "secret")
    monkeypatch.setenv("USEIT_API_KEY", "secret")


def test_production_requires_explicit_cors(monkeypatch):
    _production(monkeypatch)
    monkeypatch.delenv("USEIT_CORS_ORIGINS", raising=False)
    with pytest.raises(RuntimeError, match="Wildcard CORS"):
        validate_production_security()


def test_production_allows_explicit_cors(monkeypatch):
    _production(monkeypatch)
    monkeypatch.setenv("USEIT_CORS_ORIGINS", "https://useit.example.com")
    monkeypatch.setenv("USEIT_ALLOW_DOCS", "false")
    validate_production_security()


def test_production_rejects_mixed_wildcard_origins(monkeypatch):
    _production(monkeypatch)
    monkeypatch.setenv("USEIT_CORS_ORIGINS", "https://useit.example.com, *")
    with pytest.raises(RuntimeError, match="Wildcard CORS"):
        validate_production_security()
