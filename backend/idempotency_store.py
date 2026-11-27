from __future__ import annotations

import asyncio
import hashlib
import hmac
import re
import secrets
from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from enum import StrEnum
from typing import Callable

from google.cloud.firestore_v1 import DELETE_FIELD
from google.cloud.firestore_v1.async_client import AsyncClient
from google.cloud.firestore_v1.async_transaction import async_transactional

DEFAULT_IDEMPOTENCY_TTL_SECONDS = 600
MIN_IDEMPOTENCY_TTL_SECONDS = 60
MAX_IDEMPOTENCY_TTL_SECONDS = 3_600
DEFAULT_IDEMPOTENCY_COLLECTION = "analysis_idempotency_v1"
_IDEMPOTENCY_KEY_RE = re.compile(r"^[A-Za-z0-9._:-]{16,128}$")
_COLLECTION_RE = re.compile(r"^[a-z][a-z0-9_]{0,62}$")


class IdempotencyDecision(StrEnum):
    CLAIMED = "claimed"
    DUPLICATE = "duplicate"
    PAYLOAD_MISMATCH = "payload_mismatch"


@dataclass(frozen=True)
class IdempotencyClaim:
    document_id: str
    lease_token: str


@dataclass(frozen=True)
class IdempotencyClaimResult:
    decision: IdempotencyDecision
    claim: IdempotencyClaim | None = None


def _utc_now() -> datetime:
    return datetime.now(timezone.utc)


class FirestoreIdempotencyStore:
    """Atomic, cross-client request claims backed by Firestore transactions.

    Only HMAC digests and lifecycle metadata are persisted. Raw idempotency keys,
    request bodies, image data, prompts and model responses are never stored.
    Processing claims deliberately have no TTL field; only terminal records expire.
    Firestore TTL is cleanup only, and terminal claims check expires_at transactionally.
    """

    def __init__(
        self,
        client: AsyncClient,
        secret: str,
        *,
        ttl_seconds: int = DEFAULT_IDEMPOTENCY_TTL_SECONDS,
        collection: str = DEFAULT_IDEMPOTENCY_COLLECTION,
        clock: Callable[[], datetime] = _utc_now,
    ) -> None:
        secret_bytes = secret.encode("utf-8") if isinstance(secret, str) else b""
        if len(secret_bytes) < 32:
            raise ValueError("Idempotency secret must contain at least 32 UTF-8 bytes.")
        if type(ttl_seconds) is not int or not MIN_IDEMPOTENCY_TTL_SECONDS <= ttl_seconds <= MAX_IDEMPOTENCY_TTL_SECONDS:
            raise ValueError("Idempotency TTL must be between 60 and 3600 seconds.")
        if not _COLLECTION_RE.fullmatch(collection):
            raise ValueError("Idempotency collection name is invalid.")
        self._client = client
        self._secret = secret_bytes
        self._ttl_seconds = ttl_seconds
        self._collection = collection
        self._clock = clock
        # One private probe document per store instance avoids cross-instance
        # collisions while keeping failed cleanup bounded to one non-user record.
        self._health_probe_document_id = f"__health__{secrets.token_hex(16)}"
        self._health_probe_lock = asyncio.Lock()
        self._write_capability_verified = False

    def _digest(self, purpose: bytes, value: bytes) -> str:
        return hmac.new(self._secret, purpose + b"\0" + value, hashlib.sha256).hexdigest()

    @staticmethod
    def _validate_key(key: str) -> bytes:
        if not isinstance(key, str) or not _IDEMPOTENCY_KEY_RE.fullmatch(key):
            raise ValueError("Idempotency-Key must contain 16-128 safe ASCII characters.")
        return key.encode("ascii")

    def document_id_for_key(self, key: str) -> str:
        """Return the non-reversible document ID; useful for diagnostics and tests."""
        return self._digest(b"useit:idempotency-key:v1", self._validate_key(key))

    def _now(self) -> datetime:
        value = self._clock()
        if not isinstance(value, datetime) or value.tzinfo is None:
            raise ValueError("Idempotency clock must return a timezone-aware datetime.")
        return value.astimezone(timezone.utc)

    async def claim(self, key: str, request_payload: bytes) -> IdempotencyClaimResult:
        key_bytes = self._validate_key(key)
        if not isinstance(request_payload, bytes) or not request_payload:
            raise ValueError("Idempotency request fingerprint must be non-empty bytes.")

        now = self._now()
        document_id = self._digest(b"useit:idempotency-key:v1", key_bytes)
        request_hash = self._digest(b"useit:request-fingerprint:v1", request_payload)
        lease_token = secrets.token_urlsafe(32)
        reference = self._client.collection(self._collection).document(document_id)

        @async_transactional
        async def claim_in_transaction(transaction):
            snapshot = await reference.get(transaction=transaction)
            if snapshot.exists:
                existing = snapshot.to_dict() or {}
                status = existing.get("status")
                if status == "processing":
                    # Migrate legacy processing records away from TTL cleanup.
                    # An in-flight provider call must never lose its claim by age.
                    if "expires_at" in existing:
                        transaction.update(reference, {"expires_at": DELETE_FIELD})
                    stored_hash = existing.get("request_hash")
                    if not isinstance(stored_hash, str):
                        return IdempotencyDecision.DUPLICATE
                    if not hmac.compare_digest(stored_hash, request_hash):
                        return IdempotencyDecision.PAYLOAD_MISMATCH
                    return IdempotencyDecision.DUPLICATE

                if status not in {"completed", "outcome_unknown"}:
                    return IdempotencyDecision.DUPLICATE

                existing_expiry = existing.get("expires_at")
                if not isinstance(existing_expiry, datetime):
                    # Unknown/corrupt terminal records fail closed.
                    return IdempotencyDecision.DUPLICATE
                if existing_expiry.tzinfo is None:
                    existing_expiry = existing_expiry.replace(tzinfo=timezone.utc)
                if existing_expiry.astimezone(timezone.utc) > now:
                    stored_hash = existing.get("request_hash")
                    if not isinstance(stored_hash, str) or not hmac.compare_digest(stored_hash, request_hash):
                        return IdempotencyDecision.PAYLOAD_MISMATCH
                    return IdempotencyDecision.DUPLICATE

            transaction.set(
                reference,
                {
                    "schema_version": 1,
                    "request_hash": request_hash,
                    "status": "processing",
                    "lease_token": lease_token,
                    "created_at": now,
                    "updated_at": now,
                },
            )
            return IdempotencyDecision.CLAIMED

        decision = await claim_in_transaction(self._client.transaction(max_attempts=5))
        if decision is not IdempotencyDecision.CLAIMED:
            return IdempotencyClaimResult(decision=decision)
        return IdempotencyClaimResult(
            decision=IdempotencyDecision.CLAIMED,
            claim=IdempotencyClaim(document_id=document_id, lease_token=lease_token),
        )

    async def mark_completed(self, claim: IdempotencyClaim) -> bool:
        return await self._finish(claim, "completed")

    async def mark_outcome_unknown(self, claim: IdempotencyClaim) -> bool:
        """Retain the claim when a provider call started but its outcome is uncertain."""
        return await self._finish(claim, "outcome_unknown")

    async def release_before_provider_start(self, claim: IdempotencyClaim) -> bool:
        reference = self._client.collection(self._collection).document(claim.document_id)

        @async_transactional
        async def release_in_transaction(transaction):
            snapshot = await reference.get(transaction=transaction)
            if not snapshot.exists:
                return False
            existing = snapshot.to_dict() or {}
            lease = existing.get("lease_token")
            if (
                existing.get("status") != "processing"
                or not isinstance(lease, str)
                or not hmac.compare_digest(lease, claim.lease_token)
            ):
                return False
            transaction.delete(reference)
            return True

        return await release_in_transaction(self._client.transaction(max_attempts=5))

    async def _finish(self, claim: IdempotencyClaim, status: str) -> bool:
        if status not in {"completed", "outcome_unknown"}:
            raise ValueError("Invalid idempotency terminal status.")
        reference = self._client.collection(self._collection).document(claim.document_id)
        now = self._now()

        @async_transactional
        async def finish_in_transaction(transaction):
            snapshot = await reference.get(transaction=transaction)
            if not snapshot.exists:
                return False
            existing = snapshot.to_dict() or {}
            lease = existing.get("lease_token")
            if (
                existing.get("status") != "processing"
                or not isinstance(lease, str)
                or not hmac.compare_digest(lease, claim.lease_token)
            ):
                return False
            transaction.update(
                reference,
                {
                    "status": status,
                    "lease_token": None,
                    "updated_at": now,
                    "expires_at": now + timedelta(seconds=self._ttl_seconds),
                },
            )
            return True

        return await finish_in_transaction(self._client.transaction(max_attempts=5))

    async def check_connection(self) -> bool:
        """Verify transaction read/create/update/delete capability without touching claims.

        The first readiness probe performs a bounded write lifecycle against a
        random, per-instance health document. The document contains no user data
        and is deleted before readiness succeeds. Later probes perform a cheap
        read-only connectivity check after the write capability has been proven.
        """
        reference = self._client.collection(self._collection).document(self._health_probe_document_id)
        async with self._health_probe_lock:
            if self._write_capability_verified:
                snapshot = await asyncio.wait_for(reference.get(), timeout=5.0)
                if snapshot.exists:
                    raise RuntimeError("Firestore readiness probe document was not cleaned up.")
                return True

            probe_token = secrets.token_urlsafe(32)
            now = self._now()
            expires_at = now + timedelta(minutes=5)

            async def run_probe_transaction(operation):
                return await asyncio.wait_for(
                    operation(self._client.transaction(max_attempts=5)),
                    timeout=5.0,
                )

            @async_transactional
            async def remove_stale_probe(transaction):
                snapshot = await reference.get(transaction=transaction)
                if snapshot.exists:
                    transaction.delete(reference)

            # Recover a bounded probe left behind by an interrupted startup.
            # If delete permission is absent, readiness remains failed closed.
            await run_probe_transaction(remove_stale_probe)

            @async_transactional
            async def create_probe(transaction):
                snapshot = await reference.get(transaction=transaction)
                if snapshot.exists:
                    raise RuntimeError("Firestore readiness probe document already exists.")
                transaction.set(
                    reference,
                    {
                        "schema_version": 1,
                        "status": "health_probe",
                        "probe_token": probe_token,
                        "created_at": now,
                        "updated_at": now,
                        "expires_at": expires_at,
                    },
                )

            @async_transactional
            async def update_probe(transaction):
                snapshot = await reference.get(transaction=transaction)
                existing = snapshot.to_dict() or {}
                stored_token = existing.get("probe_token")
                if not snapshot.exists or not isinstance(stored_token, str) or not hmac.compare_digest(stored_token, probe_token):
                    raise RuntimeError("Firestore readiness probe could not verify its write.")
                transaction.update(reference, {"updated_at": self._now()})

            @async_transactional
            async def delete_probe(transaction):
                snapshot = await reference.get(transaction=transaction)
                if not snapshot.exists:
                    return
                existing = snapshot.to_dict() or {}
                stored_token = existing.get("probe_token")
                if not isinstance(stored_token, str) or not hmac.compare_digest(stored_token, probe_token):
                    raise RuntimeError("Firestore readiness probe ownership changed before cleanup.")
                transaction.delete(reference)

            # Always attempt cleanup after the create attempt, including when a
            # transaction times out or the update capability check is denied.
            # A probe that was never committed is a no-op; unexpected ownership
            # changes fail closed rather than deleting another record.
            try:
                await run_probe_transaction(create_probe)
                await run_probe_transaction(update_probe)
            finally:
                await run_probe_transaction(delete_probe)

            self._write_capability_verified = True
            return True
