from __future__ import annotations

import os
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


def configured_attestation_mode() -> AttestationMode:
    value = os.environ.get("USEIT_ATTESTATION_MODE", AttestationMode.DISABLED.value).strip().lower()
    try:
        return AttestationMode(value)
    except ValueError:
        raise RuntimeError(
            "USEIT_ATTESTATION_MODE must be one of: disabled, optional, required."
        )


def attestation_required(mode: AttestationMode | None = None) -> bool:
    return (mode or configured_attestation_mode()) is AttestationMode.REQUIRED


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
