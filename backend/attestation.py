from __future__ import annotations

import hashlib
import os
import secrets
import time
from dataclasses import dataclass
from enum import StrEnum
from typing import Protocol


class AttestationMode(StrEnum):
    DISABLED = "disabled"
    OPTIONAL = "optional"
    REQUIRED = "required"


class AttestationProvider(StrEnum):
    APP_ATTEST = "apple_app_attest"
    PLAY_INTEGRITY = "google_play_integrity"


@dataclass(frozen=True)
class AttestationEvidence:
    provider: AttestationProvider
    challenge: str
    assertion: str
    app_id: str


@dataclass(frozen=True)
class AttestationResult:
    verified: bool
    reason: str


class AttestationVerifier(Protocol):
    async def verify(self, evidence: AttestationEvidence) -> AttestationResult:
        """Verify platform-backed attestation server-side."""


@dataclass(frozen=True)
class AttestationChallenge:
    challenge: str
    provider: AttestationProvider
    app_id: str
    expires_at: int


class ChallengeStore:
    """Single-use challenge store. Production deployments should use shared storage."""

    def __init__(self) -> None:
        self._issued: dict[str, tuple[int, AttestationProvider, str]] = {}

    def issue(self, provider: AttestationProvider, app_id: str, ttl_seconds: int = 300) -> str:
        now = int(time.time())
        nonce = secrets.token_urlsafe(32)
        self._issued[hashlib.sha256(nonce.encode()).hexdigest()] = (now + ttl_seconds, provider, app_id)
        self._prune(now)
        return nonce

    def consume(self, challenge: str, now: int | None = None) -> tuple[bool, AttestationProvider | None, str | None]:
        current = int(time.time() if now is None else now)
        key = hashlib.sha256(challenge.encode()).hexdigest()
        entry = self._issued.pop(key, None)
        self._prune(current)
        if entry is None:
            return False, None, None
        expires_at, provider, app_id = entry
        return expires_at > current, provider, app_id

    def _prune(self, now: int) -> None:
        self._issued = {key: entry for key, entry in self._issued.items() if entry[0] > now}


_CHALLENGE_STORE = ChallengeStore()
DEFAULT_CHALLENGE_TTL_SECONDS = 300
MAX_CHALLENGE_TTL_SECONDS = 600


def configured_attestation_mode() -> AttestationMode:
    value = os.environ.get("USEIT_ATTESTATION_MODE", AttestationMode.DISABLED.value).strip().lower()
    try:
        return AttestationMode(value)
    except ValueError:
        raise RuntimeError("USEIT_ATTESTATION_MODE must be one of: disabled, optional, required.")


def attestation_required(mode: AttestationMode | None = None) -> bool:
    return (mode or configured_attestation_mode()) is AttestationMode.REQUIRED


def attestation_challenge_ttl_seconds() -> int:
    raw = os.environ.get("USEIT_ATTESTATION_CHALLENGE_TTL_SECONDS", str(DEFAULT_CHALLENGE_TTL_SECONDS))
    try:
        value = int(raw)
    except ValueError:
        return DEFAULT_CHALLENGE_TTL_SECONDS
    return max(30, min(value, MAX_CHALLENGE_TTL_SECONDS))


def configured_attestation_provider() -> AttestationProvider:
    value = os.environ.get("USEIT_ATTESTATION_PROVIDER", AttestationProvider.APP_ATTEST.value).strip().lower()
    try:
        return AttestationProvider(value)
    except ValueError as exc:
        raise RuntimeError("USEIT_ATTESTATION_PROVIDER must be apple_app_attest or google_play_integrity.") from exc


def configured_attestation_app_id() -> str:
    return os.environ.get("USEIT_ATTESTATION_APP_ID", "").strip()


def issue_challenge(ttl_seconds: int | None = None) -> AttestationChallenge:
    ttl = ttl_seconds if ttl_seconds is not None else attestation_challenge_ttl_seconds()
    ttl = max(30, min(ttl, MAX_CHALLENGE_TTL_SECONDS))
    provider = configured_attestation_provider()
    app_id = configured_attestation_app_id()
    now = int(time.time())
    challenge = _CHALLENGE_STORE.issue(provider, app_id, ttl)
    return AttestationChallenge(challenge=challenge, provider=provider, app_id=app_id, expires_at=now + ttl)


def consume_challenge(challenge: str) -> bool:
    valid, _, _ = _CHALLENGE_STORE.consume(challenge)
    return valid


def validate_challenge_binding(evidence: AttestationEvidence) -> AttestationResult:
    valid, provider, app_id = _CHALLENGE_STORE.consume(evidence.challenge)
    if not valid:
        return AttestationResult(False, "challenge_invalid_or_replayed")
    if provider is not evidence.provider:
        return AttestationResult(False, "wrong_provider")
    if app_id and app_id != evidence.app_id:
        return AttestationResult(False, "wrong_app")
    if not evidence.assertion.strip():
        return AttestationResult(False, "assertion_missing")
    return AttestationResult(True, "challenge_bound")


def evaluate_attestation(
    evidence: AttestationEvidence | None,
    result: AttestationResult | None,
    mode: AttestationMode | None = None,
) -> AttestationResult:
    selected_mode = mode or configured_attestation_mode()

    if selected_mode is AttestationMode.DISABLED:
        return AttestationResult(verified=True, reason="attestation_disabled")

    if evidence is None or result is None:
        if selected_mode is AttestationMode.OPTIONAL:
            return AttestationResult(verified=True, reason="attestation_not_provided")
        return AttestationResult(verified=False, reason="attestation_required")

    if not result.verified:
        return AttestationResult(verified=False, reason=result.reason or "attestation_invalid")

    return AttestationResult(verified=True, reason="attestation_verified")
