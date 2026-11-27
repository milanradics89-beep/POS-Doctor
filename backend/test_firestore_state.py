import asyncio
import os
import uuid
from datetime import datetime, timedelta, timezone

import pytest
from google.cloud.firestore_v1.async_client import AsyncClient
from google.cloud.firestore_v1.async_document import AsyncDocumentReference

from backend.attestation import AttestationProvider
from backend.firestore_state import FirestoreState


@pytest.mark.asyncio
async def test_security_state_is_atomic_across_instances():
    if not os.getenv("FIRESTORE_EMULATOR_HOST"):
        pytest.skip("requires local Firestore emulator")
    clients = [AsyncClient(project="useit-test") for _ in range(2)]
    a, b = [FirestoreState(c, "test-secret-" * 4) for c in clients]
    key = uuid.uuid4().hex
    try:
        assert await a.check_connection()
        await a.put(key, AttestationProvider.APP_ATTEST, "ios.app", 30)
        records = await asyncio.gather(a.consume(key), b.consume(key))
        assert [r.app_id for r in records if r] == ["ios.app"]
        await a.put(key, AttestationProvider.APP_ATTEST, "ios.app", 30)
        await a.reference("challenge", key).update({"expires_at": datetime.now(timezone.utc) - timedelta(seconds=1)})
        assert await b.consume(key) is None
        grants = await asyncio.gather(a.allow("rate", key, 1), b.allow("rate", key, 1))
        assert sum(ok for ok, _delay in grants) == 1
        assert 1 <= max(delay for _ok, delay in grants) <= 60
        assert await a.create(key, b"synthetic-public-key", "ios.app")
        assert not await b.create(key, b"replacement", "other.app")
        assert sorted(await asyncio.gather(a.advance(key, 2), b.advance(key, 2))) == [False, True]
        assert not await a.advance(key, 1)
        assert await b.get(key) == (b"synthetic-public-key", 2, "ios.app")
    finally:
        for kind in ("challenge", "quota:rate", "apple-key"):
            await a.reference(kind, key).delete()
        for client in clients:
            client.close()


@pytest.mark.asyncio
async def test_shared_budget_reserves_before_dispatch_and_resets_by_utc_day():
    if not os.getenv("FIRESTORE_EMULATOR_HOST"):
        pytest.skip("requires local Firestore emulator")
    project = "budget-" + uuid.uuid4().hex[:12]
    clients = [AsyncClient(project=project) for _ in range(2)]
    a, b = [FirestoreState(c, "test-secret-" * 4) for c in clients]
    ref = clients[0].collection("useit_state_v1").document("ai_daily_units")
    try:
        assert not await a.reserve_daily(0, 1)
        assert sorted(await asyncio.gather(a.reserve_daily(5, 5), b.reserve_daily(5, 5))) == [False, True]
        assert not await b.reserve_daily(5, 1)
        await ref.update({"day": "2000-01-01"})
        assert await b.reserve_daily(5, 1)
        assert (await ref.get()).get("used") == 1
    finally:
        await ref.delete()
        for client in clients:
            client.close()


@pytest.mark.asyncio
@pytest.mark.parametrize("existing", [False, True])
async def test_quota_bucket_keeps_both_racing_admissions(monkeypatch, existing):
    if not os.getenv("FIRESTORE_EMULATOR_HOST"):
        pytest.skip("requires local Firestore emulator")
    clients = [AsyncClient(project="useit-test") for _ in range(2)]
    a, b = [FirestoreState(c, "test-secret-" * 4) for c in clients]
    key = uuid.uuid4().hex
    ref = a.reference("quota:rate", key)
    try:
        # Include an expired event to exercise pruning on the update path.
        if existing:
            await ref.create({"events": [datetime.now(timezone.utc) - timedelta(minutes=2)]})
        # Force both clients to see the same initial snapshot before either
        # may write. All reads and conditional writes still use the emulator.
        barrier = asyncio.Barrier(2)
        get = AsyncDocumentReference.get
        first_reads = 0

        async def synchronized_get(doc, *args, **kwargs):
            nonlocal first_reads
            snapshot = await get(doc, *args, **kwargs)
            if doc.path == ref.path and first_reads < 2:
                first_reads += 1
                await asyncio.wait_for(barrier.wait(), timeout=5)
            return snapshot

        monkeypatch.setattr(AsyncDocumentReference, "get", synchronized_get)
        assert await asyncio.gather(a.allow("rate", key, 2), b.allow("rate", key, 2)) == [
            (True, 0), (True, 0),
        ]
        assert len((await ref.get()).get("events")) == 2
        allowed, retry_after = await b.allow("rate", key, 2)
        assert not allowed and 1 <= retry_after <= 60
    finally:
        await ref.delete()
        for client in clients:
            client.close()
