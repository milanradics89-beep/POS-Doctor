"""Instance-independent security state for new Firestore deployments."""
import asyncio
import hashlib
import hmac
import math
from datetime import datetime, timedelta, timezone

from google.api_core.exceptions import AlreadyExists, FailedPrecondition, NotFound

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
        for attempt in range(5):
            snap = await ref.get()
            if not snap.exists:
                return None

            row = snap.to_dict() or {}
            expires_at = row.get("expires_at")
            valid = isinstance(expires_at, datetime) and expires_at > snap.read_time
            try:
                await ref.delete(
                    option=self.client.write_option(last_update_time=snap.update_time),
                    retry=None,
                )
            except NotFound:
                return None
            except FailedPrecondition:
                if attempt == 4:
                    raise
                await asyncio.sleep(0.01 * 2**attempt)
                continue

            if not valid:
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
        if type(units) is not int or type(limit) is not int or units <= 0 or limit < 0:
            raise ValueError("Invalid budget.")
        # A document-version precondition makes the shared UTC-day budget atomic
        # across independent instances without holding a transaction lock.
        ref = self.client.collection("useit_state_v1").document("ai_daily_units")
        for attempt in range(5):
            snap = await ref.get()
            day = snap.read_time.astimezone(timezone.utc).date().isoformat()
            row = snap.to_dict() or {}
            if row.get("day") == day:
                used = row.get("used")
                if type(used) is not int or used < 0:
                    return False
            else:
                used = 0
            if used + units > limit:
                return False

            bucket = {"day": day, "used": used + units}
            try:
                if snap.exists:
                    await ref.update(
                        bucket,
                        option=self.client.write_option(last_update_time=snap.update_time),
                        retry=None,
                    )
                else:
                    await ref.create(bucket, retry=None)
            except (AlreadyExists, FailedPrecondition, NotFound):
                if attempt == 4:
                    raise
                await asyncio.sleep(0.01 * 2**attempt)
            else:
                return True
        return False

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

        # A document-version precondition is an atomic compare-and-set. It avoids
        # holding a transaction lock while independent instances advance the same
        # App Attest counter, while preserving strictly monotonic updates.
        for attempt in range(5):
            snap = await ref.get()
            if not snap.exists:
                return False
            current_counter = snap.get("counter")
            if type(counter) is not int or type(current_counter) is not int or counter <= current_counter:
                return False

            version = self.client.write_option(last_update_time=snap.update_time)
            try:
                await ref.update({"counter": counter}, option=version, retry=None)
            except NotFound:
                # The enrolled key was removed after the read; never recreate it.
                return False
            except FailedPrecondition:
                # A competing instance changed the document. Re-read and either
                # reject a stale counter or retry against the new version.
                if attempt == 4:
                    raise
                await asyncio.sleep(0.01 * 2**attempt)
            else:
                return True

        return False
