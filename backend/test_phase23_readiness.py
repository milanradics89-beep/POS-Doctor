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


@pytest.mark.parametrize(
    ("rate_mode", "redis_url"),
    [
        ("memory", "redis://redis.internal:6379/0"),
        ("redis", None),
    ],
)
@pytest.mark.asyncio
async def test_production_readiness_requires_shared_redis_configuration(monkeypatch, rate_mode, redis_url):
    monkeypatch.setenv("USEIT_ENV", "production")
    monkeypatch.setenv("OPENAI_API_KEY", "test-openai-secret")
    monkeypatch.setenv("USEIT_API_KEY", "test-app-secret")
    monkeypatch.setenv("USEIT_ATTESTATION_MODE", "disabled")
    monkeypatch.setenv("USEIT_RATE_LIMIT_MODE", rate_mode)
    if redis_url is None:
        monkeypatch.delenv("USEIT_REDIS_URL", raising=False)
    else:
        monkeypatch.setenv("USEIT_REDIS_URL", redis_url)

    def unexpected_redis_connection(*args, **kwargs):
        pytest.fail("Readiness must reject incomplete Redis configuration before connecting.")

    monkeypatch.setattr(main.redis_asyncio.Redis, "from_url", unexpected_redis_connection)

    with pytest.raises(HTTPException) as exc_info:
        await main.ready()

    assert exc_info.value.status_code == 503
    assert exc_info.value.detail == "Service is not ready."



@pytest.mark.parametrize("attestation_mode", ["disabled", "required"])
@pytest.mark.asyncio
async def test_production_readiness_checks_shared_redis_connectivity(monkeypatch, attestation_mode):
    monkeypatch.setenv("USEIT_ENV", "production")
    monkeypatch.setenv("OPENAI_API_KEY", "test-openai-secret")
    monkeypatch.setenv("USEIT_API_KEY", "test-app-secret")
    monkeypatch.setenv("USEIT_ATTESTATION_MODE", attestation_mode)
    if attestation_mode == "required":
        monkeypatch.setenv("USEIT_ATTESTATION_APP_ID", "TEAM123456.com.useit.app")
    else:
        monkeypatch.delenv("USEIT_ATTESTATION_APP_ID", raising=False)
    monkeypatch.setenv("USEIT_RATE_LIMIT_MODE", "redis")
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


@pytest.mark.parametrize("attestation_mode", ["disabled", "required"])
@pytest.mark.asyncio
async def test_production_readiness_fails_when_shared_redis_is_unavailable(monkeypatch, attestation_mode):
    from redis.exceptions import ConnectionError as RedisConnectionError

    monkeypatch.setenv("USEIT_ENV", "production")
    monkeypatch.setenv("OPENAI_API_KEY", "test-openai-secret")
    monkeypatch.setenv("USEIT_API_KEY", "test-app-secret")
    monkeypatch.setenv("USEIT_ATTESTATION_MODE", attestation_mode)
    if attestation_mode == "required":
        monkeypatch.setenv("USEIT_ATTESTATION_APP_ID", "TEAM123456.com.useit.app")
    else:
        monkeypatch.delenv("USEIT_ATTESTATION_APP_ID", raising=False)
    monkeypatch.setenv("USEIT_RATE_LIMIT_MODE", "redis")
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
