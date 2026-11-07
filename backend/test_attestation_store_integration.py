from __future__ import annotations

import asyncio
import os
import secrets
import sys
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



@pytest.mark.asyncio
async def test_real_redis_challenge_is_single_use_across_separate_backend_processes() -> None:
    """Separate worker processes must observe the same atomic Redis challenge state."""
    url = _integration_redis_url()
    parent_client = Redis.from_url(url, decode_responses=False)
    challenge = secrets.token_urlsafe(32)
    store = RedisChallengeStore(parent_client)

    child_code = """
import asyncio
import os
import sys
from redis.asyncio import Redis
from backend.attestation_store import RedisChallengeStore

async def main():
    client = Redis.from_url(os.environ["USEIT_TEST_REDIS_URL"], decode_responses=False)
    try:
        record = await RedisChallengeStore(client).consume(sys.argv[1])
        print("consumed" if record is not None else "missing")
    finally:
        await client.aclose()

asyncio.run(main())
"""

    async def consume_in_worker_process() -> str:
        process = await asyncio.create_subprocess_exec(
            sys.executable,
            "-c",
            child_code,
            challenge,
            cwd=os.getcwd(),
            env=os.environ.copy(),
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
        )
        try:
            stdout, stderr = await asyncio.wait_for(process.communicate(), timeout=15)
        except asyncio.TimeoutError:
            process.kill()
            await process.wait()
            raise AssertionError("Redis worker process did not finish within 15 seconds")
        assert process.returncode == 0, stderr.decode("utf-8", errors="replace")
        return stdout.decode("utf-8").strip()

    try:
        await parent_client.ping()
        await store.put(challenge, AttestationProvider.APP_ATTEST, "com.example.useit", 30)

        outcomes = await asyncio.gather(
            consume_in_worker_process(),
            consume_in_worker_process(),
        )

        assert sorted(outcomes) == ["consumed", "missing"]
        assert await parent_client.exists(store._key(challenge)) == 0
    finally:
        await parent_client.delete(store._key(challenge))
        await parent_client.aclose()
