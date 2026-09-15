from __future__ import annotations

import hashlib
from dataclasses import dataclass
from typing import Protocol

from redis.asyncio import Redis

from .attestation import AttestationProvider


@dataclass(frozen=True)
class ChallengeRecord:
    provider: AttestationProvider
    app_id: str


class ChallengeStoreBackend(Protocol):
    async def put(self, challenge: str, provider: AttestationProvider, app_id: str, ttl_seconds: int) -> None:
        """Store a challenge until its expiry."""

    async def consume(self, challenge: str) -> ChallengeRecord | None:
        """Atomically consume a challenge once."""


class RedisChallengeStore:
    """Redis-backed challenge store with atomic single-use consumption."""

    def __init__(self, redis: Redis, prefix: str = "useit:attestation:challenge:") -> None:
        self._redis = redis
        self._prefix = prefix

    def _key(self, challenge: str) -> str:
        digest = hashlib.sha256(challenge.encode()).hexdigest()
        return f"{self._prefix}{digest}"

    async def put(self, challenge: str, provider: AttestationProvider, app_id: str, ttl_seconds: int) -> None:
        key = self._key(challenge)
        value = f"{provider.value}\n{app_id}"
        await self._redis.set(key, value, ex=ttl_seconds, nx=True)

    async def consume(self, challenge: str) -> ChallengeRecord | None:
        key = self._key(challenge)
        value = await self._redis.getdel(key)
        if not value:
            return None
        if isinstance(value, bytes):
            value = value.decode("utf-8")
        provider_raw, _, app_id = value.partition("\n")
        try:
            provider = AttestationProvider(provider_raw)
        except ValueError:
            return None
        return ChallengeRecord(provider=provider, app_id=app_id)
