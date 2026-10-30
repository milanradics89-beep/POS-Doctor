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



@pytest.mark.asyncio
async def test_production_readiness_checks_required_redis_connectivity(monkeypatch):
    monkeypatch.setenv("USEIT_ENV", "production")
    monkeypatch.setenv("OPENAI_API_KEY", "test-openai-secret")
    monkeypatch.setenv("USEIT_API_KEY", "test-app-secret")
    monkeypatch.setenv("USEIT_ATTESTATION_MODE", "required")
    monkeypatch.setenv("USEIT_ATTESTATION_APP_ID", "TEAM123456.com.useit.app")
    monkeypatch.setenv("USEIT_REDIS_URL", "redis://redis.internal:6379/0")

    created_clients = []
    connection_options = {}

    class FakeRedis:
        closed = False

        async def ping(self):
            return True

        async def aclose(self):
            self.closed = True

    def fake_from_url(url, **kwargs):
        connection_options.update(url=url, **kwargs)
        client = FakeRedis()
        created_clients.append(client)
        return client

    monkeypatch.setattr(main.redis_asyncio.Redis, "from_url", fake_from_url)

    assert await main.ready() == {"status": "ready"}
    assert connection_options == {
        "url": "redis://redis.internal:6379/0",
        "socket_connect_timeout": 2,
        "socket_timeout": 2,
    }
    assert len(created_clients) == 1
    assert created_clients[0].closed


@pytest.mark.asyncio
async def test_production_readiness_fails_when_required_redis_is_unavailable(monkeypatch):
    from redis.exceptions import ConnectionError as RedisConnectionError

    monkeypatch.setenv("USEIT_ENV", "production")
    monkeypatch.setenv("OPENAI_API_KEY", "test-openai-secret")
    monkeypatch.setenv("USEIT_API_KEY", "test-app-secret")
    monkeypatch.setenv("USEIT_ATTESTATION_MODE", "required")
    monkeypatch.setenv("USEIT_ATTESTATION_APP_ID", "TEAM123456.com.useit.app")
    monkeypatch.setenv("USEIT_REDIS_URL", "redis://redis.internal:6379/0")

    created_clients = []

    class UnavailableRedis:
        closed = False

        async def ping(self):
            raise RedisConnectionError("connection refused")

        async def aclose(self):
            self.closed = True

    def fake_from_url(*args, **kwargs):
        client = UnavailableRedis()
        created_clients.append(client)
        return client

    monkeypatch.setattr(main.redis_asyncio.Redis, "from_url", fake_from_url)

    with pytest.raises(HTTPException) as exc_info:
        await main.ready()

    assert exc_info.value.status_code == 503
    assert exc_info.value.detail == "Service is not ready."
    assert len(created_clients) == 1
    assert created_clients[0].closed
