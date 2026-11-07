import pytest
from fastapi import HTTPException
from fastapi.testclient import TestClient

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
            self.pexpire_calls = []
            self.operation_order = []
            self.set_calls = 0
            self.getdel_calls = 0
            self.challenge_key = None
            self.challenge_value = None

        async def ping(self):
            return True

        async def pexpire(self, key, milliseconds):
            self.pexpire_calls.append((key, milliseconds))
            self.operation_order.append("pexpire")
            return False  # The unique readiness keys do not exist yet.

        async def eval(self, *args):
            self.operation_order.append("eval")
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
    assert created_clients[0].operation_order[:4] == [
        "pexpire", "pexpire", "eval", "eval"
    ]
    assert [key.rsplit(":", 1)[-1] for key, _ in created_clients[0].pexpire_calls] == [
        "events", "sequence"
    ]
    assert all(milliseconds > 0 for _, milliseconds in created_clients[0].pexpire_calls)
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

        async def pexpire(self, key, milliseconds):
            return False

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


@pytest.mark.parametrize("denied_key", ["events", "sequence"])
@pytest.mark.asyncio
async def test_production_readiness_preflights_redis_pexpire_before_rate_limit_script(
    monkeypatch, denied_key
):
    from redis.exceptions import ResponseError

    monkeypatch.setenv("USEIT_ENV", "production")
    monkeypatch.setenv("OPENAI_API_KEY", "test-openai-secret")
    monkeypatch.setenv("USEIT_API_KEY", "test-app-secret")
    monkeypatch.setenv("USEIT_ATTESTATION_MODE", "disabled")
    monkeypatch.setenv("USEIT_RATE_LIMIT_MODE", "redis")
    monkeypatch.setenv("USEIT_REDIS_URL", "redis://redis.internal:6379/0")

    created_clients = []

    class PexpireDeniedRedis:
        closed = False

        def __init__(self):
            self.pexpire_calls = []
            self.eval_calls = 0

        async def ping(self):
            return True

        async def pexpire(self, key, milliseconds):
            self.pexpire_calls.append((key, milliseconds))
            if key.endswith(f":{denied_key}"):
                raise ResponseError("NOPERM PEXPIRE is not permitted")
            return False

        async def eval(self, *args):
            self.eval_calls += 1
            pytest.fail("Readiness must reject denied PEXPIRE before running the mutating Lua script.")

        async def aclose(self):
            self.closed = True

    def fake_from_url(*args, **kwargs):
        client = PexpireDeniedRedis()
        created_clients.append(client)
        return client

    monkeypatch.setattr(main.redis_asyncio.Redis, "from_url", fake_from_url)

    with pytest.raises(HTTPException) as exc_info:
        await main.ready()

    assert exc_info.value.status_code == 503
    assert exc_info.value.detail == "Service is not ready."
    assert len(created_clients) == 1
    expected_suffixes = ["events"] if denied_key == "events" else ["events", "sequence"]
    assert [key.rsplit(":", 1)[-1] for key, _ in created_clients[0].pexpire_calls] == expected_suffixes
    assert created_clients[0].eval_calls == 0
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

        async def pexpire(self, key, milliseconds):
            return False

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



@pytest.mark.asyncio
async def test_production_readiness_reuses_application_redis_pool_without_closing_it(monkeypatch):
    monkeypatch.setenv("USEIT_ENV", "production")
    monkeypatch.setenv("OPENAI_API_KEY", "test-openai-secret")
    monkeypatch.setenv("USEIT_API_KEY", "test-app-secret")
    monkeypatch.setenv("USEIT_ATTESTATION_MODE", "disabled")
    monkeypatch.setenv("USEIT_RATE_LIMIT_MODE", "redis")
    monkeypatch.setenv("USEIT_REDIS_URL", "redis://redis.internal:6379/0")

    class SharedRedis:
        closed = False

        def __init__(self):
            self.eval_calls = 0

        async def ping(self):
            return True

        async def pexpire(self, key, milliseconds):
            return False

        async def eval(self, *args):
            self.eval_calls += 1
            return [1, 0] if self.eval_calls == 1 else [0, 60]

        async def aclose(self):
            self.closed = True

    shared_client = SharedRedis()
    main.app.state.redis_client = shared_client

    def unexpected_from_url(*args, **kwargs):
        pytest.fail("Readiness must reuse the application-scoped Redis pool.")

    monkeypatch.setattr(main.redis_asyncio.Redis, "from_url", unexpected_from_url)
    try:
        assert await main.ready() == {"status": "ready"}
    finally:
        main.app.state.redis_client = None

    assert shared_client.eval_calls == 2
    assert shared_client.closed is False


def test_application_lifespan_creates_and_closes_one_shared_redis_pool(monkeypatch):
    monkeypatch.setenv("USEIT_REDIS_URL", "redis://redis.internal:6379/0")
    created = []
    options = {}

    class SharedRedis:
        closed = False

        async def aclose(self):
            self.closed = True

    def fake_from_url(cls, url, **kwargs):
        options.update(url=url, **kwargs)
        client = SharedRedis()
        created.append(client)
        return client

    monkeypatch.setattr(main.redis_asyncio.Redis, "from_url", classmethod(fake_from_url))

    with TestClient(main.app):
        assert len(created) == 1
        assert main.app.state.redis_client is created[0]

    assert options == {
        "url": "redis://redis.internal:6379/0",
        "decode_responses": False,
        "socket_connect_timeout": 2.0,
        "socket_timeout": 5.0,
    }
    assert created[0].closed is True
    assert main.app.state.redis_client is None
