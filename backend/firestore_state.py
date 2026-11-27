"""Instance-independent security state for new Firestore deployments."""
import hashlib
import hmac
import math
from datetime import datetime, timedelta, timezone

from google.api_core.exceptions import AlreadyExists
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

        @async_transactional
        async def take(tx):
            snap = await ref.get(transaction=tx)
            if not snap.exists:
                return None
            row = snap.to_dict()
            tx.delete(ref)
            if row["expires_at"] <= snap.read_time:
                return None
            return ChallengeRecord(AttestationProvider(row["provider"]), row["app_id"])

        return await take(self.client.transaction())

    async def allow(self, namespace, host, limit):
        ref = self.reference("quota:" + namespace, host)

        @async_transactional
        async def admit(tx):
            snap = await ref.get(transaction=tx)
            now = snap.read_time
            cutoff = now - timedelta(seconds=60)
            recent = [t for t in (snap.to_dict() or {}).get("events", []) if t > cutoff]
            if len(recent) >= limit:
                return False, max(1, math.ceil((recent[0] - cutoff).total_seconds()))
            tx.set(ref, {"events": [*recent, now], "expires_at": now + timedelta(seconds=60)})
            return True, 0

        return await admit(self.client.transaction())

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
