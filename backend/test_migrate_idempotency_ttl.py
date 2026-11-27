from __future__ import annotations

import os
import uuid
from datetime import datetime, timezone

import pytest
from google.cloud.firestore_v1.async_client import AsyncClient

from backend.migrate_idempotency_ttl import migrate_legacy_expiry_fields


@pytest.mark.asyncio
async def test_ttl_migration_dry_run_and_apply_only_remove_nonterminal_expiry_fields():
    if not os.environ.get("FIRESTORE_EMULATOR_HOST"):
        pytest.skip("requires local Firestore emulator")
    project = os.environ.get("GOOGLE_CLOUD_PROJECT", "useit-test")
    collection_name = f"test_idempotency_ttl_{uuid.uuid4().hex[:16]}"
    client = AsyncClient(project=project)
    now = datetime(2026, 11, 27, 6, 0, tzinfo=timezone.utc)
    collection = client.collection(collection_name)
    processing = collection.document("processing")
    unknown = collection.document("unknown")
    corrupt = collection.document("corrupt")
    completed = collection.document("completed")
    health_probe = collection.document("health-probe")
    try:
        await processing.set({"status": "processing", "expires_at": now})
        await unknown.set({"status": "outcome_unknown", "expires_at": now})
        await corrupt.set({"status": "corrupt_state", "expires_at": now})
        await completed.set({"status": "completed", "expires_at": now})
        await health_probe.set({"status": "health_probe", "expires_at": now})

        dry_run = await migrate_legacy_expiry_fields(client, collection_name=collection_name)
        assert dry_run == {"scanned": 5, "candidates": 3, "migrated": 0}
        assert "expires_at" in ((await processing.get()).to_dict() or {})
        assert "expires_at" in ((await unknown.get()).to_dict() or {})
        assert "expires_at" in ((await corrupt.get()).to_dict() or {})
        assert "expires_at" in ((await completed.get()).to_dict() or {})
        assert "expires_at" in ((await health_probe.get()).to_dict() or {})

        applied = await migrate_legacy_expiry_fields(client, collection_name=collection_name, apply=True)
        assert applied == {"scanned": 5, "candidates": 3, "migrated": 3}
        assert "expires_at" not in ((await processing.get()).to_dict() or {})
        assert "expires_at" not in ((await unknown.get()).to_dict() or {})
        assert "expires_at" not in ((await corrupt.get()).to_dict() or {})
        assert "expires_at" in ((await completed.get()).to_dict() or {})
        assert "expires_at" in ((await health_probe.get()).to_dict() or {})

        verification = await migrate_legacy_expiry_fields(client, collection_name=collection_name)
        assert verification == {"scanned": 5, "candidates": 0, "migrated": 0}
    finally:
        await client.recursive_delete(client.collection(collection_name))
        client.close()
