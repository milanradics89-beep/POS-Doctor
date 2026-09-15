from __future__ import annotations

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
    redis.set.assert_awaited_once()
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
