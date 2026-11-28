from __future__ import annotations

import os
import uuid
from datetime import datetime, timezone

import pytest
from google.auth.credentials import AnonymousCredentials
from google.cloud.firestore_v1.async_client import AsyncClient

from backend import migrate_idempotency_ttl
from backend.migrate_idempotency_ttl import migrate_legacy_expiry_fields


@pytest.mark.asyncio
async def test_ttl_migration_dry_run_and_apply_only_remove_nonterminal_expiry_fields():
    if not os.environ.get("FIRESTORE_EMULATOR_HOST"):
        pytest.skip("requires local Firestore emulator")
    project = os.environ.get("GOOGLE_CLOUD_PROJECT", "useit-test")
    collection_name = f"test_idempotency_ttl_{uuid.uuid4().hex[:16]}"
    client = AsyncClient(project=project, credentials=AnonymousCredentials())
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

        dry_run = await migrate_legacy_expiry_fields(client, collection_name=collection_name, page_size=2)
        assert dry_run == {"scanned": 5, "candidates": 3, "migrated": 0}
        assert "expires_at" in ((await processing.get()).to_dict() or {})
        assert "expires_at" in ((await unknown.get()).to_dict() or {})
        assert "expires_at" in ((await corrupt.get()).to_dict() or {})
        assert "expires_at" in ((await completed.get()).to_dict() or {})
        assert "expires_at" in ((await health_probe.get()).to_dict() or {})

        applied = await migrate_legacy_expiry_fields(client, collection_name=collection_name, apply=True, page_size=2)
        assert applied == {"scanned": 5, "candidates": 3, "migrated": 3}
        assert "expires_at" not in ((await processing.get()).to_dict() or {})
        assert "expires_at" not in ((await unknown.get()).to_dict() or {})
        assert "expires_at" not in ((await corrupt.get()).to_dict() or {})
        assert "expires_at" in ((await completed.get()).to_dict() or {})
        assert "expires_at" in ((await health_probe.get()).to_dict() or {})

        verification = await migrate_legacy_expiry_fields(client, collection_name=collection_name, page_size=2)
        assert verification == {"scanned": 5, "candidates": 0, "migrated": 0}
    finally:
        await client.recursive_delete(client.collection(collection_name))
        client.close()


@pytest.mark.asyncio
async def test_ttl_migration_rejects_invalid_page_sizes():
    client = AsyncClient(project="useit-test", credentials=AnonymousCredentials())
    try:
        with pytest.raises(ValueError, match="page_size must be a positive integer"):
            await migrate_legacy_expiry_fields(client, page_size=0)
        with pytest.raises(ValueError, match="page_size must be a positive integer"):
            await migrate_legacy_expiry_fields(client, page_size=True)
    finally:
        client.close()


@pytest.mark.parametrize(
    "args",
    [
        [],
        ["--apply", "--ttl-disabled-confirmed", "--old-writers-drained"],
    ],
)
def test_ttl_migration_operator_cli_rejects_emulator_routing(monkeypatch, args):
    monkeypatch.setenv("USEIT_FIRESTORE_PROJECT_ID", "useit")
    monkeypatch.setenv("FIRESTORE_EMULATOR_HOST", "127.0.0.1:8080")

    def unexpected_cloud_run(*_args, **_kwargs):
        pytest.fail("operator migration must not construct a Firestore client when emulator routing is set")

    monkeypatch.setattr(migrate_idempotency_ttl, "_run", unexpected_cloud_run)
    with pytest.raises(SystemExit) as error:
        migrate_idempotency_ttl.main(args)

    assert error.value.code == 2
