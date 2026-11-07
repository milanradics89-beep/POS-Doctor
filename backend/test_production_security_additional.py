import pytest

from backend.production_security import validate_production_security


def _production(monkeypatch):
    monkeypatch.setenv("USEIT_ENV", "production")
    monkeypatch.setenv("OPENAI_API_KEY", "secret")
    monkeypatch.setenv("USEIT_API_KEY", "u" * 32)
    monkeypatch.setenv("USEIT_RATE_LIMIT_MODE", "redis")
    monkeypatch.setenv("USEIT_REDIS_URL", "redis://localhost:6379/0")


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



@pytest.mark.parametrize(
    "placeholder",
    [
        "replace-with-a-random-32-plus-character-secret",
        "your-session-secret",
        "change-me",
    ],
)
def test_production_rejects_placeholder_session_secret(monkeypatch, placeholder):
    _production(monkeypatch)
    monkeypatch.setenv("USEIT_SESSION_SECRET", placeholder)
    with pytest.raises(RuntimeError, match="USEIT_SESSION_SECRET must not be a placeholder"):
        validate_production_security()


@pytest.mark.parametrize(
    "placeholder",
    [
        "replace-with-a-random-32-plus-character-api-key",
        "your-api-key",
        "change-me",
    ],
)
def test_production_rejects_placeholder_api_key(monkeypatch, placeholder):
    _production(monkeypatch)
    monkeypatch.setenv("USEIT_API_KEY", placeholder)
    with pytest.raises(RuntimeError, match="USEIT_API_KEY must not be a placeholder"):
        validate_production_security()
