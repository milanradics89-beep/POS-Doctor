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
    validate_challenge_binding,
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
        AttestationEvidence(AttestationProvider.APP_ATTEST, "challenge", "assertion", "com.useit.app"),
        AttestationResult(False, "wrong_app"),
        AttestationMode.REQUIRED,
    )
    assert result == AttestationResult(False, "wrong_app")


def test_required_mode_accepts_verified_evidence():
    result = evaluate_attestation(
        AttestationEvidence(AttestationProvider.APP_ATTEST, "challenge", "assertion", "com.useit.app"),
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


def test_challenge_binding_rejects_wrong_provider(monkeypatch):
    monkeypatch.setenv("USEIT_ATTESTATION_PROVIDER", "apple_app_attest")
    challenge = issue_challenge(ttl_seconds=60)
    result = validate_challenge_binding(
        AttestationEvidence(AttestationProvider.PLAY_INTEGRITY, challenge.challenge, "assertion", challenge.app_id)
    )
    assert result == AttestationResult(False, "wrong_provider")


def test_challenge_binding_rejects_wrong_app(monkeypatch):
    monkeypatch.setenv("USEIT_ATTESTATION_PROVIDER", "apple_app_attest")
    monkeypatch.setenv("USEIT_ATTESTATION_APP_ID", "com.useit.app")
    challenge = issue_challenge(ttl_seconds=60)
    result = validate_challenge_binding(
        AttestationEvidence(AttestationProvider.APP_ATTEST, challenge.challenge, "assertion", "com.attacker.app")
    )
    assert result == AttestationResult(False, "wrong_app")


def test_challenge_binding_rejects_missing_assertion():
    challenge = issue_challenge(ttl_seconds=60)
    result = validate_challenge_binding(
        AttestationEvidence(challenge.provider, challenge.challenge, "", challenge.app_id)
    )
    assert result == AttestationResult(False, "assertion_missing")


def test_challenge_binding_is_single_use():
    challenge = issue_challenge(ttl_seconds=60)
    evidence = AttestationEvidence(challenge.provider, challenge.challenge, "assertion", challenge.app_id)
    assert validate_challenge_binding(evidence).verified
    assert validate_challenge_binding(evidence) == AttestationResult(False, "challenge_invalid_or_replayed")
