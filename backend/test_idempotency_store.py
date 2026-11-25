from __future__ import annotations

import asyncio
import os
import uuid
from datetime import datetime, timedelta, timezone

import pytest
from google.cloud.firestore_v1.async_client import AsyncClient

from backend.idempotency_store import (
    FirestoreIdempotencyStore,
    IdempotencyDecision,
)

SECRET = "test-only-idempotency-secret-32-bytes-minimum"


async def _new_pair(*, ttl_seconds: int = 60, clock=None):
    if not os.environ.get("FIRESTORE_EMULATOR_HOST"):
        raise RuntimeError("FIRESTORE_EMULATOR_HOST is required for Firestore idempotency integration tests.")
    project = os.environ.get("GOOGLE_CLOUD_PROJECT", "useit-test")
    collection = f"test_idempotency_{uuid.uuid4().hex[:16]}"
    first_client = AsyncClient(project=project)
    second_client = AsyncClient(project=project)
    options = {"ttl_seconds": ttl_seconds, "collection": collection}
    if clock is not None:
        options["clock"] = clock
    first = FirestoreIdempotencyStore(first_client, SECRET, **options)
    second = FirestoreIdempotencyStore(second_client, SECRET, **options)
    return collection, first_client, second_client, first, second


async def _close_pair(collection, first_client, second_client):
    try:
        await first_client.recursive_delete(first_client.collection(collection))
    finally:
        first_client.close()
        second_client.close()


@pytest.mark.asyncio
async def test_concurrent_claims_from_independent_clients_allow_exactly_one_winner():
    collection, first_client, second_client, first, second = await _new_pair()
    key = f"analysis-{uuid.uuid4().hex}"
    payload = b'{"scene":"synthetic","imageFingerprint":"not-an-image"}'
    try:
        results = await asyncio.gather(first.claim(key, payload), second.claim(key, payload))
        assert sorted(result.decision.value for result in results) == ["claimed", "duplicate"]
        winner = next(result for result in results if result.decision is IdempotencyDecision.CLAIMED)
        assert winner.claim is not None
        assert await first.mark_completed(winner.claim) is True
        duplicate = await second.claim(key, payload)
        assert duplicate.decision is IdempotencyDecision.DUPLICATE
    finally:
        await _close_pair(collection, first_client, second_client)


@pytest.mark.asyncio
async def test_same_key_with_different_payload_is_rejected_without_overwrite():
    collection, first_client, second_client, first, second = await _new_pair()
    key = f"analysis-{uuid.uuid4().hex}"
    try:
        claimed = await first.claim(key, b"payload-one")
        assert claimed.claim is not None
        mismatch = await second.claim(key, b"payload-two")
        assert mismatch.decision is IdempotencyDecision.PAYLOAD_MISMATCH
        assert await first.mark_completed(claimed.claim) is True
    finally:
        await _close_pair(collection, first_client, second_client)


@pytest.mark.asyncio
async def test_provider_outcome_unknown_remains_blocked_until_expiry():
    collection, first_client, second_client, first, second = await _new_pair()
    key = f"analysis-{uuid.uuid4().hex}"
    payload = b"provider-may-have-processed"
    try:
        claimed = await first.claim(key, payload)
        assert claimed.claim is not None
        assert await first.mark_outcome_unknown(claimed.claim) is True
        assert (await second.claim(key, payload)).decision is IdempotencyDecision.DUPLICATE
    finally:
        await _close_pair(collection, first_client, second_client)


@pytest.mark.asyncio
async def test_pre_provider_failure_can_release_claim_for_a_safe_retry():
    collection, first_client, second_client, first, second = await _new_pair()
    key = f"analysis-{uuid.uuid4().hex}"
    payload = b"provider-not-started"
    try:
        claimed = await first.claim(key, payload)
        assert claimed.claim is not None
        assert await first.release_before_provider_start(claimed.claim) is True
        retried = await second.claim(key, payload)
        assert retried.decision is IdempotencyDecision.CLAIMED
    finally:
        await _close_pair(collection, first_client, second_client)


@pytest.mark.asyncio
async def test_expired_record_can_be_reclaimed_without_waiting_for_ttl_cleanup():
    initial_time = datetime(2026, 11, 24, 12, 0, tzinfo=timezone.utc)
    collection, first_client, second_client, first, second = await _new_pair(
        ttl_seconds=60,
        clock=lambda: initial_time,
    )
    second = FirestoreIdempotencyStore(
        second_client,
        SECRET,
        ttl_seconds=60,
        collection=collection,
        clock=lambda: initial_time + timedelta(seconds=61),
    )
    key = f"analysis-{uuid.uuid4().hex}"
    payload = b"expired-record"
    try:
        first_claim = await first.claim(key, payload)
        assert first_claim.decision is IdempotencyDecision.CLAIMED
        second_claim = await second.claim(key, payload)
        assert second_claim.decision is IdempotencyDecision.CLAIMED
    finally:
        await _close_pair(collection, first_client, second_client)


@pytest.mark.asyncio
async def test_firestore_document_contains_only_hmacs_and_lifecycle_metadata():
    collection, first_client, second_client, first, second = await _new_pair()
    key = f"analysis-{uuid.uuid4().hex}"
    payload = b'{"imageUri":"data:image/jpeg;base64,PRIVATE_IMAGE_SENTINEL"}'
    try:
        result = await first.claim(key, payload)
        assert result.claim is not None
        snapshot = await first_client.collection(collection).document(first.document_id_for_key(key)).get()
        stored = snapshot.to_dict() or {}
        serialized = repr(stored)
        assert key not in serialized
        assert "PRIVATE_IMAGE_SENTINEL" not in serialized
        assert "data:image/jpeg" not in serialized
        assert set(stored) == {
            "schema_version",
            "request_hash",
            "status",
            "lease_token",
            "created_at",
            "updated_at",
            "expires_at",
        }
        assert stored["status"] == "processing"
    finally:
        await _close_pair(collection, first_client, second_client)


@pytest.mark.asyncio
async def test_invalid_keys_and_ttl_are_rejected_before_firestore_access():
    collection, first_client, second_client, first, second = await _new_pair()
    try:
        with pytest.raises(ValueError, match="Idempotency-Key"):
            await first.claim("short", b"payload")
        with pytest.raises(ValueError, match="request fingerprint"):
            await first.claim(f"analysis-{uuid.uuid4().hex}", b"")
        with pytest.raises(ValueError, match="TTL"):
            FirestoreIdempotencyStore(first_client, SECRET, ttl_seconds=30, collection=collection)
    finally:
        await _close_pair(collection, first_client, second_client)
