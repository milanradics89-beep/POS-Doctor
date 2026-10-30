from __future__ import annotations

import asyncio
from unittest.mock import AsyncMock

import pytest

from .attestation import AttestationProvider
from .attestation_store import RedisChallengeStore


@pytest.mark.asyncio
async def test_redis_store_hashes_challenge_and_consumes_once() -> None:
    redis = AsyncMock()
    redis.getdel.return_value = b"apple_app_attest\ncom.example.useit"
    store = RedisChallengeStore(redis)

    await store.put("secret-challenge", AttestationProvider.APP_ATTEST, "com.example.useit", 300)
    record = await store.consume("secret-challenge")

    assert record is not None
    assert record.provider is AttestationProvider.APP_ATTEST
    assert record.app_id == "com.example.useit"
    redis.set.assert_awaited_once_with(redis.set.await_args.args[0], b"apple_app_attest\ncom.example.useit", ex=300, nx=True)
    key = redis.set.await_args.args[0]
    assert "secret-challenge" not in key
    redis.getdel.assert_awaited_once_with(key)


@pytest.mark.asyncio
async def test_redis_store_rejects_unknown_provider_record() -> None:
    redis = AsyncMock()
    redis.getdel.return_value = b"unknown_provider\ncom.example.useit"
    store = RedisChallengeStore(redis)

    assert await store.consume("challenge") is None


@pytest.mark.asyncio
async def test_redis_store_returns_none_when_challenge_missing() -> None:
    redis = AsyncMock()
    redis.getdel.return_value = None
    store = RedisChallengeStore(redis)

    assert await store.consume("missing") is None

class AtomicFakeRedis:
    def __init__(self) -> None:
        self.values: dict[str, bytes] = {}
        self.expiries: dict[str, int] = {}

    async def set(self, key: str, value: bytes, *, ex: int, nx: bool) -> str | None:
        if nx and key in self.values:
            return None
        self.values[key] = value
        self.expiries[key] = ex
        return "OK"

    async def getdel(self, key: str) -> bytes | None:
        return self.values.pop(key, None)


@pytest.mark.asyncio
async def test_redis_store_consumes_challenge_once_across_store_instances() -> None:
    redis = AtomicFakeRedis()
    first_store = RedisChallengeStore(redis)  # type: ignore[arg-type]
    second_store = RedisChallengeStore(redis)  # type: ignore[arg-type]

    await first_store.put("shared-challenge", AttestationProvider.APP_ATTEST, "com.example.useit", 45)
    first, second = await asyncio.gather(
        first_store.consume("shared-challenge"),
        second_store.consume("shared-challenge"),
    )

    assert sum(record is not None for record in (first, second)) == 1
    key = first_store._key("shared-challenge")
    assert key not in redis.values
    assert redis.expiries[key] == 45


@pytest.mark.asyncio
async def test_redis_store_fails_if_set_nx_does_not_create_the_challenge() -> None:
    redis = AtomicFakeRedis()
    store = RedisChallengeStore(redis)  # type: ignore[arg-type]
    key = store._key("collision")
    redis.values[key] = b"apple_app_attest\nexisting-app"

    with pytest.raises(RuntimeError, match="unique attestation challenge"):
        await store.put("collision", AttestationProvider.APP_ATTEST, "com.example.useit", 300)

    assert redis.values[key] == b"apple_app_attest\nexisting-app"

