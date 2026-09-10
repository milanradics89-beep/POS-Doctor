import pytest
from fastapi import HTTPException

import backend.main as main


@pytest.mark.asyncio
async def test_readiness_requires_vision_configuration(monkeypatch):
    monkeypatch.delenv("OPENAI_API_KEY", raising=False)
    monkeypatch.delenv("USEIT_ENV", raising=False)
    monkeypatch.delenv("USEIT_API_KEY", raising=False)

    with pytest.raises(HTTPException) as exc_info:
        await main.ready()

    assert exc_info.value.status_code == 503
    assert exc_info.value.detail == "Service is not ready."


@pytest.mark.asyncio
async def test_readiness_returns_only_safe_ready_status(monkeypatch):
    monkeypatch.setenv("OPENAI_API_KEY", "test-openai-secret")
    monkeypatch.delenv("USEIT_ENV", raising=False)
    monkeypatch.delenv("USEIT_API_KEY", raising=False)

    assert await main.ready() == {"status": "ready"}


@pytest.mark.asyncio
async def test_production_readiness_requires_application_api_key(monkeypatch):
    monkeypatch.setenv("USEIT_ENV", "production")
    monkeypatch.setenv("OPENAI_API_KEY", "test-openai-secret")
    monkeypatch.delenv("USEIT_API_KEY", raising=False)

    with pytest.raises(HTTPException) as exc_info:
        await main.ready()

    assert exc_info.value.status_code == 503
    assert exc_info.value.detail == "Service is not ready."


@pytest.mark.asyncio
async def test_production_readiness_is_ready_with_required_secrets(monkeypatch):
    monkeypatch.setenv("USEIT_ENV", "production")
    monkeypatch.setenv("OPENAI_API_KEY", "test-openai-secret")
    monkeypatch.setenv("USEIT_API_KEY", "test-app-secret")

    assert await main.ready() == {"status": "ready"}
