from __future__ import annotations

import argparse
import asyncio
import os
import re
from typing import Any

from google.cloud.firestore_v1 import DELETE_FIELD
from google.cloud.firestore_v1.async_client import AsyncClient
from google.cloud.firestore_v1.async_transaction import async_transactional
from google.cloud.firestore_v1.base_query import FieldFilter

DEFAULT_COLLECTION = "analysis_idempotency_v1"
LEGACY_NON_EXPIRING_STATUSES = ("processing", "outcome_unknown")
_PROJECT_ID_RE = re.compile(r"^[a-z][a-z0-9-]{4,28}[a-z0-9]$")


async def _remove_legacy_expiry_transactionally(client: AsyncClient, reference: Any) -> bool:
    @async_transactional
    async def remove(transaction):
        snapshot = await reference.get(transaction=transaction)
        if not snapshot.exists:
            return False
        data = snapshot.to_dict() or {}
        if data.get("status") not in LEGACY_NON_EXPIRING_STATUSES or "expires_at" not in data:
            return False
        transaction.update(reference, {"expires_at": DELETE_FIELD})
        return True

    return await remove(client.transaction(max_attempts=5))


async def migrate_legacy_expiry_fields(
    client: AsyncClient,
    *,
    collection_name: str = DEFAULT_COLLECTION,
    apply: bool = False,
) -> dict[str, int]:
    """Count or remove expiry fields from legacy non-expiring claim states.

    The caller must disable the collection TTL policy and drain old writers before
    applying this migration. Each write rechecks the document status transactionally
    so a concurrently completed claim keeps its expiry field.
    """
    query = (
        client.collection(collection_name)
        .where(filter=FieldFilter("status", "in", list(LEGACY_NON_EXPIRING_STATUSES)))
        .select(["status", "expires_at"])
    )
    scanned = 0
    candidates = 0
    migrated = 0
    async for snapshot in query.stream():
        scanned += 1
        data = snapshot.to_dict() or {}
        if data.get("status") not in LEGACY_NON_EXPIRING_STATUSES or "expires_at" not in data:
            continue
        candidates += 1
        if apply and await _remove_legacy_expiry_transactionally(client, snapshot.reference):
            migrated += 1
    return {"scanned": scanned, "candidates": candidates, "migrated": migrated}


async def _run(project_id: str, *, apply: bool) -> dict[str, int]:
    client = AsyncClient(project=project_id)
    try:
        return await migrate_legacy_expiry_fields(client, apply=apply)
    finally:
        client.close()


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description="Dry-run or safely migrate legacy USEIT idempotency TTL fields."
    )
    parser.add_argument("--apply", action="store_true", help="Remove expires_at from processing/outcome_unknown records.")
    parser.add_argument("--ttl-disabled-confirmed", action="store_true", help="Confirm the analysis_idempotency_v1 TTL policy is disabled.")
    parser.add_argument("--old-writers-drained", action="store_true", help="Confirm all old application writers are drained.")
    args = parser.parse_args(argv)

    project_id = os.environ.get("USEIT_FIRESTORE_PROJECT_ID", "").strip()
    if not _PROJECT_ID_RE.fullmatch(project_id):
        parser.error("USEIT_FIRESTORE_PROJECT_ID must be the verified 6-30 character Google Cloud project ID.")
    if args.apply and not args.ttl_disabled_confirmed:
        parser.error("--apply requires --ttl-disabled-confirmed.")
    if args.apply and not args.old_writers_drained:
        parser.error("--apply requires --old-writers-drained.")

    summary = asyncio.run(_run(project_id, apply=args.apply))
    mode = "apply" if args.apply else "dry-run"
    print(
        f"mode={mode} scanned={summary['scanned']} "
        f"candidates={summary['candidates']} migrated={summary['migrated']}"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
