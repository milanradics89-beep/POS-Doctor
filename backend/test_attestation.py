from __future__ import annotations

import pytest

from backend.attestation import (
    AttestationEvidence,
    AttestationMode,
    AttestationProvider,
    AttestationResult,
    attestation_required,
    configured_attestation_mode,
    consume_challenge,
    evaluate_attestation,
    issue_challenge,
)


def evidence() -> AttestationEvidence:
    return AttestationEvidence(
        provider=AttestationProvider.APP_ATTEST,
        challenge="server-challenge",
        assertion="platform-assertion",
        app_id="com.useit.app",
    )


def test_attestation_defaults_to_disabled(monkeypatch):
    monkeypatch.delenv("USEIT_ATTESTATION_MODE", raising=False)
    assert configured_attestation_mode() is AttestationMode.DISABLED
    assert not attestation_required()


def test_invalid_attestation_mode_fails_closed(monkeypatch):
    monkeypatch.setenv("USEIT_ATTESTATION_MODE", "sometimes")
    with pytest.raises(RuntimeError):
        configured_attestation_mode()


def test_disabled_mode_accepts_without_attestation():
    result = evaluate_attestation(None, None, AttestationMode.DISABLED)
    assert result == AttestationResult(True, "attestation_disabled")


def test_optional_mode_allows_missing_attestation():
    result = evaluate_attestation(None, None, AttestationMode.OPTIONAL)
    assert result == AttestationResult(True, "attestation_not_provided")


def test_required_mode_rejects_missing_attestation():
    result = evaluate_attestation(None, None, AttestationMode.REQUIRED)
    assert result == AttestationResult(False, "attestation_required")


def test_required_mode_rejects_invalid_provider_result():
    result = evaluate_attestation(
        evidence(),
        AttestationResult(False, "wrong_app"),
        AttestationMode.REQUIRED,
    )
    assert result == AttestationResult(False, "wrong_app")


def test_required_mode_accepts_verified_evidence():
    result = evaluate_attestation(
        evidence(),
        AttestationResult(True, "provider_verified"),
        AttestationMode.REQUIRED,
    )
    assert result == AttestationResult(True, "attestation_verified")


def test_challenge_is_single_use():
    challenge = issue_challenge(ttl_seconds=60)
    assert consume_challenge(challenge.challenge)
    assert not consume_challenge(challenge.challenge)


def test_expired_challenge_is_rejected(monkeypatch):
    challenge = issue_challenge(ttl_seconds=30)
    monkeypatch.setattr("backend.attestation.time.time", lambda: challenge.expires_at + 1)
    assert not consume_challenge(challenge.challenge)


def test_challenge_uses_configured_provider_and_app_id(monkeypatch):
    monkeypatch.setenv("USEIT_ATTESTATION_PROVIDER", "google_play_integrity")
    monkeypatch.setenv("USEIT_ATTESTATION_APP_ID", "com.useit.app")
    challenge = issue_challenge(ttl_seconds=60)
    assert challenge.provider is AttestationProvider.PLAY_INTEGRITY
    assert challenge.app_id == "com.useit.app"
