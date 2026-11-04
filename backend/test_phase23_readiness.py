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



@pytest.mark.parametrize("attestation_mode", ["disabled", "optional", "required"])
@pytest.mark.asyncio
async def test_production_readiness_checks_shared_redis_connectivity(monkeypatch, attestation_mode):
    monkeypatch.setenv("USEIT_ENV", "production")
    monkeypatch.setenv("OPENAI_API_KEY", "test-openai-secret")
    monkeypatch.setenv("USEIT_API_KEY", "test-app-secret")
    monkeypatch.setenv("USEIT_ATTESTATION_MODE", attestation_mode)
    if attestation_mode != "disabled":
        monkeypatch.setenv("USEIT_ATTESTATION_APP_ID", "TEAM123456.com.useit.app")
    else:
        monkeypatch.delenv("USEIT_ATTESTATION_APP_ID", raising=False)
    monkeypatch.setenv("USEIT_RATE_LIMIT_MODE", "redis")
    monkeypatch.setenv("USEIT_REDIS_URL", "redis://redis.internal:6379/0")

    created_clients = []
    connection_options = {}

    class FakeRedis:
        closed = False

        def __init__(self):
            self.eval_calls = 0
            self.set_calls = 0
            self.getdel_calls = 0
            self.challenge_key = None
            self.challenge_value = None

        async def ping(self):
            return True

        async def eval(self, *args):
            self.eval_calls += 1
            return [1, 0] if self.eval_calls == 1 else [0, 60]

        async def set(self, key, value, ex, nx):
            self.set_calls += 1
            self.challenge_key = key
            self.challenge_value = value
            return True

        async def getdel(self, key):
            self.getdel_calls += 1
            if key != self.challenge_key or self.challenge_value is None:
                return None
            value = self.challenge_value.encode("utf-8")
            self.challenge_value = None
            return value

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
    assert created_clients[0].eval_calls == 2
    expected_attestation_probes = 0 if attestation_mode == "disabled" else 1
    assert created_clients[0].set_calls == expected_attestation_probes
    assert created_clients[0].getdel_calls == expected_attestation_probes
    assert created_clients[0].closed


@pytest.mark.asyncio
async def test_production_readiness_fails_when_redis_rate_limit_script_is_unavailable(monkeypatch):
    from redis.exceptions import ResponseError

    monkeypatch.setenv("USEIT_ENV", "production")
    monkeypatch.setenv("OPENAI_API_KEY", "test-openai-secret")
    monkeypatch.setenv("USEIT_API_KEY", "test-app-secret")
    monkeypatch.setenv("USEIT_ATTESTATION_MODE", "disabled")
    monkeypatch.setenv("USEIT_RATE_LIMIT_MODE", "redis")
    monkeypatch.setenv("USEIT_REDIS_URL", "redis://redis.internal:6379/0")

    created_clients = []

    class EvalDeniedRedis:
        closed = False

        async def ping(self):
            return True

        async def eval(self, *args):
            raise ResponseError("NOPERM EVAL is not permitted")

        async def aclose(self):
            self.closed = True

    def fake_from_url(*args, **kwargs):
        client = EvalDeniedRedis()
        created_clients.append(client)
        return client

    monkeypatch.setattr(main.redis_asyncio.Redis, "from_url", fake_from_url)

    with pytest.raises(HTTPException) as exc_info:
        await main.ready()

    assert exc_info.value.status_code == 503
    assert exc_info.value.detail == "Service is not ready."
    assert len(created_clients) == 1
    assert created_clients[0].closed


@pytest.mark.asyncio
async def test_production_readiness_fails_when_attestation_getdel_is_unavailable(monkeypatch):
    from redis.exceptions import ResponseError

    monkeypatch.setenv("USEIT_ENV", "production")
    monkeypatch.setenv("OPENAI_API_KEY", "test-openai-secret")
    monkeypatch.setenv("USEIT_API_KEY", "test-app-secret")
    monkeypatch.setenv("USEIT_ATTESTATION_MODE", "required")
    monkeypatch.setenv("USEIT_ATTESTATION_APP_ID", "TEAM123456.com.useit.app")
    monkeypatch.setenv("USEIT_RATE_LIMIT_MODE", "redis")
    monkeypatch.setenv("USEIT_REDIS_URL", "redis://redis.internal:6379/0")

    created_clients = []

    class GetdelDeniedRedis:
        closed = False

        def __init__(self):
            self.eval_calls = 0
            self.challenge_key = None
            self.challenge_value = None

        async def ping(self):
            return True

        async def eval(self, *args):
            self.eval_calls += 1
            return [1, 0] if self.eval_calls == 1 else [0, 60]

        async def set(self, key, value, ex, nx):
            self.challenge_key = key
            self.challenge_value = value
            return True

        async def getdel(self, key):
            raise ResponseError("ERR unknown command 'GETDEL'")

        async def aclose(self):
            self.closed = True

    def fake_from_url(*args, **kwargs):
        client = GetdelDeniedRedis()
        created_clients.append(client)
        return client

    monkeypatch.setattr(main.redis_asyncio.Redis, "from_url", fake_from_url)

    with pytest.raises(HTTPException) as exc_info:
        await main.ready()

    assert exc_info.value.status_code == 503
    assert exc_info.value.detail == "Service is not ready."
    assert len(created_clients) == 1
    assert created_clients[0].eval_calls == 2
    assert created_clients[0].challenge_key.startswith("useit:attestation:challenge:")
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
