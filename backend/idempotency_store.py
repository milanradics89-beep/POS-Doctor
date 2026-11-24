from __future__ import annotations

import hashlib
import hmac
import re
import secrets
from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from enum import StrEnum
from typing import Callable

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
    Firestore TTL is cleanup only; every claim checks expires_at in the transaction.
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
        expires_at = now + timedelta(seconds=self._ttl_seconds)
        document_id = self._digest(b"useit:idempotency-key:v1", key_bytes)
        request_hash = self._digest(b"useit:request-fingerprint:v1", request_payload)
        lease_token = secrets.token_urlsafe(32)
        reference = self._client.collection(self._collection).document(document_id)

        @async_transactional
        async def claim_in_transaction(transaction):
            snapshot = await reference.get(transaction=transaction)
            if snapshot.exists:
                existing = snapshot.to_dict() or {}
                existing_expiry = existing.get("expires_at")
                if not isinstance(existing_expiry, datetime):
                    # Unknown/corrupt records fail closed rather than permitting
                    # a second billable request.
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
                    "expires_at": expires_at,
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
                },
            )
            return True

        return await finish_in_transaction(self._client.transaction(max_attempts=5))

    async def check_connection(self) -> bool:
        # Read a reserved, non-user document. Readiness never creates a document
        # or mutates a live idempotency record.
        await self._client.collection(self._collection).document("__health__").get()
        return True
