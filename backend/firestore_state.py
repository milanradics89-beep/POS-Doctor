"""Instance-independent security state for new Firestore deployments."""
import asyncio
import hashlib
import hmac
import math
from datetime import datetime, timedelta, timezone

from google.api_core.exceptions import AlreadyExists, FailedPrecondition, NotFound
from google.cloud.firestore_v1.async_transaction import async_transactional

from backend.idempotency_store import FirestoreIdempotencyStore
from backend.attestation import AttestationProvider
from backend.attestation_store import ChallengeRecord


class FirestoreState:
    def __init__(self, client, secret: str):
        self._probe = FirestoreIdempotencyStore(client, secret, collection="useit_state_v1")
        self.client = client
        self.secret = secret.encode()
        if len(self.secret) < 32:
            raise ValueError("Firestore state requires a stable secret of at least 32 bytes.")

    async def check_connection(self):
        return await self._probe.check_connection()

    def reference(self, kind, key):
        digest = hmac.new(self.secret, f"{kind}\0{key}".encode(), hashlib.sha256).hexdigest()
        return self.client.collection("useit_state_v1").document(digest)

    async def put(self, challenge, provider, app_id, ttl_seconds):
        await self.reference("challenge", challenge).create({
            "provider": provider.value, "app_id": app_id,
            "expires_at": datetime.now(timezone.utc) + timedelta(seconds=ttl_seconds),
        })

    async def consume(self, challenge):
        ref = self.reference("challenge", challenge)

        # A read transaction followed by a delete holds a lock while competing
        # consumers try to upgrade the same challenge. Use Firestore's update-time
        # precondition instead: exactly one consumer can delete the version it read.
        for attempt in range(5):
            snap = await ref.get()
            if not snap.exists:
                return None
            row = snap.to_dict()
            expired = row["expires_at"] <= snap.read_time
            try:
                await ref.delete(
                    option=self.client.write_option(last_update_time=snap.update_time),
                    retry=None,
                )
            except (FailedPrecondition, NotFound):
                # Another consumer changed/deleted the challenge after our read.
                # Retry a definite conflict; never turn an ambiguous write into a grant.
                if attempt == 4:
                    raise
                await asyncio.sleep(0.01 * 2**attempt)
                continue

            if expired:
                return None
            return ChallengeRecord(AttestationProvider(row["provider"]), row["app_id"])

        return None

    async def allow(self, namespace, host, limit):
        ref = self.reference("quota:" + namespace, host)

        # Compare-and-swap avoids two readers holding transactions open while
        # both try to upgrade to a write lock on the same hot bucket.
        for attempt in range(5):
            snap = await ref.get()
            now = snap.read_time
            cutoff = now - timedelta(seconds=60)
            recent = [t for t in (snap.to_dict() or {}).get("events", []) if t > cutoff]
            if len(recent) >= limit:
                return False, max(1, math.ceil((recent[0] - cutoff).total_seconds()))
            bucket = {"events": [*recent, now], "expires_at": now + timedelta(seconds=60)}
            try:
                if snap.exists:
                    version = self.client.write_option(last_update_time=snap.update_time)
                    await ref.update(bucket, option=version, retry=None)
                else:
                    await ref.create(bucket, retry=None)
            except (AlreadyExists, FailedPrecondition, NotFound):
                # Another writer won or TTL removed the old version. Only
                # retry definite conflicts, never an ambiguous write failure.
                if attempt == 4:
                    raise
                await asyncio.sleep(0.01 * 2**attempt)
            else:
                return True, 0

    async def reserve_daily(self, limit: int, units: int) -> bool:
        if units <= 0 or limit < 0:
            raise ValueError("Invalid budget.")
        # One counter shared by every instance. Use Firestore's read time for
        # the UTC day; local clock skew cannot open a second budget window.
        ref = self.client.collection("useit_state_v1").document("ai_daily_units")

        @async_transactional
        async def reserve(tx):
            snap = await ref.get(transaction=tx)
            day = snap.read_time.astimezone(timezone.utc).date().isoformat()
            row = snap.to_dict() or {}
            used = row["used"] if row.get("day") == day else 0
            if type(used) is not int or used < 0 or used + units > limit:
                return False
            tx.set(ref, {"day": day, "used": used + units})
            return True

        return await reserve(self.client.transaction())

    async def create(self, key_id, public_key_der, app_id):
        try:
            await self.reference("apple-key", key_id).create({
                "public_key": public_key_der, "app_id": app_id, "counter": 0,
            })
        except AlreadyExists:
            return False
        return True

    async def get(self, key_id):
        snap = await self.reference("apple-key", key_id).get()
        if not snap.exists:
            return None
        row = snap.to_dict()
        return row["public_key"], row["counter"], row["app_id"]

    async def advance(self, key_id, counter):
        ref = self.reference("apple-key", key_id)

        @async_transactional
        async def compare_and_set(tx):
            snap = await ref.get(transaction=tx)
            if not snap.exists or counter <= snap.get("counter"):
                return False
            tx.update(ref, {"counter": counter})
            return True

        return await compare_and_set(self.client.transaction())
