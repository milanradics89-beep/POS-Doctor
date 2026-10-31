from __future__ import annotations

import asyncio
import os
import uuid
from collections import deque

import pytest
import redis.asyncio as redis_asyncio
from fastapi import FastAPI
from fastapi.testclient import TestClient
from redis.asyncio import Redis
from starlette.requests import Request

from backend.rate_limit import (
    MAX_MEMORY_RATE_LIMIT_BUCKETS,
    _prune_expired_buckets,
    _redis_allowed,
    install_rate_limit,
)


def test_rate_limit_returns_429_after_configured_limit(monkeypatch):
    monkeypatch.setenv("USEIT_RATE_LIMIT_PER_MINUTE", "2")
    app = FastAPI()

    @app.get("/v1/test")
    async def test_endpoint():
        return {"ok": True}

    install_rate_limit(app)
    client = TestClient(app)

    assert client.get("/v1/test").status_code == 200
    assert client.get("/v1/test").status_code == 200
    response = client.get("/v1/test")
    assert response.status_code == 429
    assert response.headers["Retry-After"] == "60"


def test_session_endpoint_uses_dedicated_lower_limit(monkeypatch):
    monkeypatch.setenv("USEIT_RATE_LIMIT_PER_MINUTE", "60")
    monkeypatch.setenv("USEIT_SESSION_RATE_LIMIT_PER_MINUTE", "2")
    app = FastAPI()

    @app.post("/v1/session")
    async def session():
        return {"ok": True}

    install_rate_limit(app)
    client = TestClient(app)

    assert client.post("/v1/session").status_code == 200
    assert client.post("/v1/session").status_code == 200
    response = client.post("/v1/session")
    assert response.status_code == 429
    assert response.headers["Retry-After"] == "60"


def test_general_rate_limit_does_not_consume_session_bucket(monkeypatch):
    monkeypatch.setenv("USEIT_RATE_LIMIT_PER_MINUTE", "1")
    monkeypatch.setenv("USEIT_SESSION_RATE_LIMIT_PER_MINUTE", "1")
    app = FastAPI()

    @app.get("/v1/test")
    async def test_endpoint():
        return {"ok": True}

    @app.post("/v1/session")
    async def session():
        return {"ok": True}

    install_rate_limit(app)
    client = TestClient(app)

    assert client.get("/v1/test").status_code == 200
    assert client.post("/v1/session").status_code == 200
    assert client.get("/v1/test").status_code == 429
    assert client.post("/v1/session").status_code == 429


def test_rate_limit_does_not_block_options_or_public_paths(monkeypatch):
    monkeypatch.setenv("USEIT_RATE_LIMIT_PER_MINUTE", "1")
    app = FastAPI()

    @app.options("/v1/test")
    async def options_endpoint():
        return {"ok": True}

    @app.get("/health")
    async def health():
        return {"status": "ok"}

    @app.get("/ready")
    async def ready():
        return {"status": "ready"}

    install_rate_limit(app)
    client = TestClient(app)

    assert client.options("/v1/test").status_code == 200
    assert client.get("/health").status_code == 200
    assert client.get("/ready").status_code == 200


def test_memory_rate_limit_prunes_expired_buckets_without_dropping_active_clients():
    buckets = {
        ("rate", "expired"): deque([1.0, 2.0]),
        ("rate", "active"): deque([95.0, 99.0]),
        ("session-rate", "empty"): deque(),
    }

    _prune_expired_buckets(buckets, cutoff=90.0)

    assert ("rate", "expired") not in buckets
    assert ("session-rate", "empty") not in buckets
    assert list(buckets[("rate", "active")]) == [95.0, 99.0]


def test_memory_rate_limit_bucket_capacity_is_bounded():
    assert MAX_MEMORY_RATE_LIMIT_BUCKETS == 10_000



def test_session_challenge_uses_dedicated_lower_rate_limit(monkeypatch):
    monkeypatch.setenv("USEIT_RATE_LIMIT_PER_MINUTE", "60")
    monkeypatch.setenv("USEIT_SESSION_RATE_LIMIT_PER_MINUTE", "2")
    app = FastAPI()

    @app.post("/v1/session/challenge")
    async def challenge():
        return {"challenge": "ok"}

    install_rate_limit(app)
    client = TestClient(app)

    assert client.post("/v1/session/challenge").status_code == 200
    assert client.post("/v1/session/challenge").status_code == 200
    response = client.post("/v1/session/challenge")
    assert response.status_code == 429
    assert response.headers["Retry-After"] == "60"



def _redis_test_request(host: str = "203.0.113.42") -> Request:
    return Request(
        {
            "type": "http",
            "asgi": {"version": "3.0"},
            "http_version": "1.1",
            "method": "GET",
            "scheme": "http",
            "path": "/v1/test",
            "raw_path": b"/v1/test",
            "query_string": b"",
            "headers": [],
            "client": (host, 12345),
            "server": ("testserver", 80),
        }
    )


def _redis_integration_url() -> str:
    url = os.environ.get("USEIT_TEST_REDIS_URL", "").strip()
    if not url:
        pytest.skip("USEIT_TEST_REDIS_URL is not configured; real Redis integration test skipped.")
    return url


@pytest.mark.asyncio
async def test_redis_rate_limit_uses_atomic_sliding_window_and_bounded_timeouts(monkeypatch):
    captured = {}

    class FakeRedis:
        async def eval(self, script, numkeys, events_key, sequence_key, window_ms, limit):
            captured.update({
                "script": script, "numkeys": numkeys, "events_key": events_key,
                "sequence_key": sequence_key, "window_ms": window_ms, "limit": limit,
            })
            return [1, 0]

        async def aclose(self):
            captured["closed"] = True

    def fake_from_url(cls, url, **kwargs):
        captured["url"] = url
        captured["kwargs"] = kwargs
        return FakeRedis()

    monkeypatch.setattr(redis_asyncio.Redis, "from_url", classmethod(fake_from_url))
    monkeypatch.setenv("USEIT_REDIS_URL", "redis://redis.example.test:6379/0")
    allowed, retry_after = await _redis_allowed(_redis_test_request(), limit=5, namespace="unit-test")

    assert allowed is True
    assert retry_after == 0
    assert captured["url"] == "redis://redis.example.test:6379/0"
    assert captured["kwargs"] == {"decode_responses": True, "socket_connect_timeout": 2.0, "socket_timeout": 5.0}
    assert captured["numkeys"] == 2
    assert captured["events_key"] == "useit:unit-test:203.0.113.42:events"
    assert captured["sequence_key"] == captured["events_key"] + ":sequence"
    assert captured["window_ms"] == 60_000
    assert captured["limit"] == 5
    for command in ("TIME", "ZREMRANGEBYSCORE", "ZCARD", "ZRANGE", "INCR", "ZADD", "PEXPIRE"):
        assert f"redis.call('{command}'" in captured["script"]
    assert captured["closed"] is True


@pytest.mark.asyncio
async def test_redis_rate_limit_enforces_sliding_window_across_minute_boundary(monkeypatch):
    url = _redis_integration_url()
    namespace = f"test-rate-window-{uuid.uuid4().hex}"
    host = "203.0.113.42"
    request = _redis_test_request(host)
    monkeypatch.setenv("USEIT_REDIS_URL", url)
    client = Redis.from_url(url, decode_responses=True, socket_connect_timeout=2.0, socket_timeout=5.0)
    events_key = f"useit:{namespace}:{host}:events"
    sequence_key = f"{events_key}:sequence"

    try:
        await client.ping()
        seconds, microseconds = await client.time()
        now_ms = seconds * 1000 + microseconds // 1000
        await client.zadd(events_key, {
            "request-before-boundary-1": now_ms - 59_000,
            "request-before-boundary-2": now_ms - 58_000,
        })
        await client.pexpire(events_key, 60_000)

        allowed, retry_after = await _redis_allowed(request, limit=2, namespace=namespace)
        assert allowed is False
        assert 1 <= retry_after <= 2

        await client.zadd(events_key, {"request-before-boundary-1": now_ms - 60_001})
        allowed, retry_after = await _redis_allowed(request, limit=2, namespace=namespace)

        assert allowed is True
        assert retry_after == 0
        assert await client.zcard(events_key) == 2
        assert 1 <= await client.pttl(events_key) <= 60_000
        assert 1 <= await client.pttl(sequence_key) <= 60_000
    finally:
        await client.delete(events_key, sequence_key)
        await client.aclose()


@pytest.mark.asyncio
async def test_redis_rate_limit_is_atomic_across_independent_clients(monkeypatch):
    url = _redis_integration_url()
    namespace = f"test-rate-limit-{uuid.uuid4().hex}"
    host = "203.0.113.42"
    request = _redis_test_request(host)
    monkeypatch.setenv("USEIT_REDIS_URL", url)
    client = Redis.from_url(url, decode_responses=True, socket_connect_timeout=2.0, socket_timeout=5.0)
    events_key = f"useit:{namespace}:{host}:events"
    sequence_key = f"{events_key}:sequence"

    try:
        await client.ping()
        outcomes = await asyncio.gather(
            *(_redis_allowed(request, limit=7, namespace=namespace) for _ in range(32))
        )
        assert sum(allowed for allowed, _ in outcomes) == 7
        assert await client.zcard(events_key) == 7
        assert await client.get(sequence_key) == "7"
        assert 1 <= await client.pttl(events_key) <= 60_000
        assert 1 <= await client.pttl(sequence_key) <= 60_000
    finally:
        await client.delete(events_key, sequence_key)
        await client.aclose()
