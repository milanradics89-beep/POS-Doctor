import importlib

import pytest


def test_production_main_fails_closed_without_required_configuration(monkeypatch):
    monkeypatch.setenv("USEIT_ENV", "production")
    monkeypatch.delenv("OPENAI_API_KEY", raising=False)
    monkeypatch.delenv("USEIT_API_KEY", raising=False)
    monkeypatch.setenv("USEIT_CORS_ORIGINS", "https://useit.example.com")

    import backend.main as main

    with pytest.raises(RuntimeError, match="Missing required production secrets"):
        importlib.reload(main)
