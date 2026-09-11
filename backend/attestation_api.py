from __future__ import annotations

from dataclasses import dataclass

from backend.attestation import (
    AttestationEvidence,
    AttestationProvider,
    AttestationResult,
    consume_challenge,
    configured_attestation_mode,
    issue_challenge,
)


@dataclass(frozen=True)
class AttestationSubmission:
    provider: AttestationProvider
    challenge: str
    assertion: str
    app_id: str


def issue_attestation_challenge() -> dict[str, object]:
    challenge = issue_challenge()
    return {
        "challenge": challenge.challenge,
        "provider": challenge.provider.value,
        "appId": challenge.app_id,
        "expiresAt": challenge.expires_at,
        "expiresIn": max(0, challenge.expires_at - __import__("time").time().__int__()),
        "mode": configured_attestation_mode().value,
    }


def consume_submission(submission: AttestationSubmission) -> AttestationEvidence | AttestationResult:
    if not consume_challenge(submission.challenge):
        return AttestationResult(False, "challenge_invalid_or_replayed")
    return AttestationEvidence(
        provider=submission.provider,
        challenge=submission.challenge,
        assertion=submission.assertion,
        app_id=submission.app_id,
    )
