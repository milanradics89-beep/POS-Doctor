from __future__ import annotations

import asyncio
import os
import secrets
import uuid

import pytest
from redis.asyncio import Redis

from .attestation import (
    AttestationEvidence,
    AttestationProvider,
    AttestationResult,
    issue_challenge_async,
    validate_challenge_binding_async,
)
from .attestation_store import RedisChallengeStore


def _integration_redis_url() -> str:
    url = os.environ.get("USEIT_TEST_REDIS_URL", "").strip()
    if not url:
        pytest.skip("USEIT_TEST_REDIS_URL is not configured; real Redis integration test skipped.")
    return url


@pytest.mark.asyncio
async def test_real_redis_consumes_challenge_once_across_independent_clients() -> None:
    url = _integration_redis_url()
    client_a = Redis.from_url(url, decode_responses=False)
    client_b = Redis.from_url(url, decode_responses=False)
    prefix = f"useit:test:attestation:{uuid.uuid4().hex}:"
    challenge = secrets.token_urlsafe(32)
    store_a = RedisChallengeStore(client_a, prefix=prefix)
    store_b = RedisChallengeStore(client_b, prefix=prefix)
    key = store_a._key(challenge)

    try:
        await client_a.ping()
        await store_a.put(challenge, AttestationProvider.APP_ATTEST, "com.example.useit", 30)

        ttl = await client_a.ttl(key)
        assert 1 <= ttl <= 30
        assert challenge not in key

        first, second = await asyncio.gather(
            store_a.consume(challenge),
            store_b.consume(challenge),
        )

        records = [record for record in (first, second) if record is not None]
        assert len(records) == 1
        assert records[0].provider is AttestationProvider.APP_ATTEST
        assert records[0].app_id == "com.example.useit"
        assert await client_a.exists(key) == 0
    finally:
        await client_a.delete(key)
        await client_a.aclose()
        await client_b.aclose()


@pytest.mark.asyncio
async def test_real_redis_enforces_challenge_expiry_server_side() -> None:
    url = _integration_redis_url()
    client = Redis.from_url(url, decode_responses=False)
    prefix = f"useit:test:attestation:{uuid.uuid4().hex}:"
    challenge = secrets.token_urlsafe(32)
    store = RedisChallengeStore(client, prefix=prefix)
    key = store._key(challenge)

    try:
        await client.ping()
        await store.put(challenge, AttestationProvider.PLAY_INTEGRITY, "com.example.useit", 1)
        await asyncio.sleep(1.2)

        assert await store.consume(challenge) is None
        assert await client.exists(key) == 0
    finally:
        await client.delete(key)
        await client.aclose()


@pytest.mark.asyncio
async def test_challenge_lifecycle_uses_configured_shared_redis_and_rejects_replay(monkeypatch) -> None:
    url = _integration_redis_url()
    app_id = "com.example.useit"
    monkeypatch.setenv("USEIT_REDIS_URL", url)
    monkeypatch.setenv("USEIT_ATTESTATION_PROVIDER", AttestationProvider.APP_ATTEST.value)
    monkeypatch.setenv("USEIT_ATTESTATION_APP_ID", app_id)

    challenge = await issue_challenge_async(ttl_seconds=30)
    evidence = AttestationEvidence(
        provider=challenge.provider,
        challenge=challenge.challenge,
        assertion="integration-test-assertion",
        app_id=challenge.app_id,
    )

    first = await validate_challenge_binding_async(evidence)
    replay = await validate_challenge_binding_async(evidence)

    assert first == AttestationResult(True, "challenge_bound")
    assert replay == AttestationResult(False, "challenge_invalid_or_replayed")
