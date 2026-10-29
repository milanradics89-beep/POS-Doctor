from __future__ import annotations

import hashlib
import time

import httpx
import pytest

from backend.attestation import AttestationEvidence, AttestationProvider, AttestationResult
from backend.google_play_integrity import GooglePlayIntegrityVerifier


def make_payload(challenge: str, *, now_ms: int | None = None) -> dict:
    return {
        "tokenPayloadExternal": {
            "requestDetails": {
                "requestPackageName": "com.useit.app",
                "requestHash": hashlib.sha256(challenge.encode()).hexdigest(),
                "timestampMillis": now_ms if now_ms is not None else int(time.time() * 1000),
            },
            "appIntegrity": {
                "appRecognitionVerdict": "PLAY_RECOGNIZED",
                "packageName": "com.useit.app",
                "certificateSha256Digest": ["CERTIFICATE"],
            },
            "accountDetails": {"appLicensingVerdict": "LICENSED"},
            "deviceIntegrity": {"deviceRecognitionVerdict": ["MEETS_DEVICE_INTEGRITY"]},
        }
    }


@pytest.mark.asyncio
async def test_google_verifier_accepts_valid_provider_response(monkeypatch):
    monkeypatch.setenv("USEIT_GOOGLE_PLAY_PACKAGE_NAME", "com.useit.app")
    transport = httpx.MockTransport(lambda request: httpx.Response(200, json=make_payload("challenge")))
    async with httpx.AsyncClient(transport=transport) as client:
        verifier = GooglePlayIntegrityVerifier(client=client, credentials_factory=lambda: "test-access-token")
        result = await verifier.verify(
            AttestationEvidence(AttestationProvider.PLAY_INTEGRITY, "challenge", "integrity-token", "com.useit.app")
        )
    assert result == AttestationResult(True, "provider_verified")


@pytest.mark.asyncio
async def test_google_verifier_rejects_wrong_request_hash(monkeypatch):
    monkeypatch.setenv("USEIT_GOOGLE_PLAY_PACKAGE_NAME", "com.useit.app")
    transport = httpx.MockTransport(lambda request: httpx.Response(200, json=make_payload("different-challenge")))
    async with httpx.AsyncClient(transport=transport) as client:
        verifier = GooglePlayIntegrityVerifier(client=client, credentials_factory=lambda: "test-access-token")
        result = await verifier.verify(
            AttestationEvidence(AttestationProvider.PLAY_INTEGRITY, "challenge", "integrity-token", "com.useit.app")
        )
    assert result == AttestationResult(False, "request_hash_mismatch")


@pytest.mark.asyncio
async def test_google_verifier_rejects_unlicensed_app(monkeypatch):
    monkeypatch.setenv("USEIT_GOOGLE_PLAY_PACKAGE_NAME", "com.useit.app")
    payload = make_payload("challenge")
    payload["tokenPayloadExternal"]["accountDetails"]["appLicensingVerdict"] = "UNLICENSED"
    transport = httpx.MockTransport(lambda request: httpx.Response(200, json=payload))
    async with httpx.AsyncClient(transport=transport) as client:
        verifier = GooglePlayIntegrityVerifier(client=client, credentials_factory=lambda: "test-access-token")
        result = await verifier.verify(
            AttestationEvidence(AttestationProvider.PLAY_INTEGRITY, "challenge", "integrity-token", "com.useit.app")
        )
    assert result == AttestationResult(False, "app_not_licensed")


@pytest.mark.asyncio
async def test_google_verifier_rejects_stale_token(monkeypatch):
    monkeypatch.setenv("USEIT_GOOGLE_PLAY_PACKAGE_NAME", "com.useit.app")
    stale_ms = int((time.time() - 301) * 1000)
    transport = httpx.MockTransport(lambda request: httpx.Response(200, json=make_payload("challenge", now_ms=stale_ms)))
    async with httpx.AsyncClient(transport=transport) as client:
        verifier = GooglePlayIntegrityVerifier(client=client, credentials_factory=lambda: "test-access-token")
        result = await verifier.verify(
            AttestationEvidence(AttestationProvider.PLAY_INTEGRITY, "challenge", "integrity-token", "com.useit.app")
        )
    assert result == AttestationResult(False, "token_stale")


@pytest.mark.asyncio
async def test_google_verifier_maps_provider_failure(monkeypatch):
    monkeypatch.setenv("USEIT_GOOGLE_PLAY_PACKAGE_NAME", "com.useit.app")
    transport = httpx.MockTransport(lambda request: httpx.Response(503, json={"error": "unavailable"}))
    async with httpx.AsyncClient(transport=transport) as client:
        verifier = GooglePlayIntegrityVerifier(client=client, credentials_factory=lambda: "test-access-token")
        result = await verifier.verify(
            AttestationEvidence(AttestationProvider.PLAY_INTEGRITY, "challenge", "integrity-token", "com.useit.app")
        )
    assert result == AttestationResult(False, "provider_unavailable")


@pytest.mark.parametrize(
    ("camel_case_package", "snake_case_package"),
    [
        ("com.attacker.app", "com.useit.app"),
        ("com.useit.app", "com.attacker.app"),
    ],
)
@pytest.mark.asyncio
async def test_google_verifier_rejects_conflicting_app_package_aliases(
    monkeypatch, camel_case_package, snake_case_package
):
    monkeypatch.setenv("USEIT_GOOGLE_PLAY_PACKAGE_NAME", "com.useit.app")
    payload = make_payload("challenge")
    integrity = payload["tokenPayloadExternal"]["appIntegrity"]
    integrity["packageName"] = camel_case_package
    integrity["package_name"] = snake_case_package
    transport = httpx.MockTransport(lambda request: httpx.Response(200, json=payload))
    async with httpx.AsyncClient(transport=transport) as client:
        verifier = GooglePlayIntegrityVerifier(client=client, credentials_factory=lambda: "test-access-token")
        result = await verifier.verify(
            AttestationEvidence(AttestationProvider.PLAY_INTEGRITY, "challenge", "integrity-token", "com.useit.app")
        )
    assert result == AttestationResult(False, "wrong_app")



@pytest.mark.parametrize(
    ("field", "malformed_value"),
    [
        ("requestDetails", "not-an-object"),
        ("appIntegrity", ["not-an-object"]),
        ("accountDetails", "not-an-object"),
        ("deviceIntegrity", ["not-an-object"]),
    ],
)
@pytest.mark.asyncio
async def test_google_verifier_rejects_malformed_nested_payload_objects(
    monkeypatch, field, malformed_value
):
    monkeypatch.setenv("USEIT_GOOGLE_PLAY_PACKAGE_NAME", "com.useit.app")
    payload = make_payload("challenge")
    payload["tokenPayloadExternal"][field] = malformed_value
    transport = httpx.MockTransport(lambda request: httpx.Response(200, json=payload))
    async with httpx.AsyncClient(transport=transport) as client:
        verifier = GooglePlayIntegrityVerifier(client=client, credentials_factory=lambda: "test-access-token")
        result = await verifier.verify(
            AttestationEvidence(AttestationProvider.PLAY_INTEGRITY, "challenge", "integrity-token", "com.useit.app")
        )
    assert result == AttestationResult(False, "attestation_invalid")


@pytest.mark.asyncio
async def test_google_verifier_rejects_malformed_certificate_digest_list(monkeypatch):
    monkeypatch.setenv("USEIT_GOOGLE_PLAY_PACKAGE_NAME", "com.useit.app")
    monkeypatch.setenv("USEIT_GOOGLE_PLAY_CERT_SHA256", "CERTIFICATE")
    payload = make_payload("challenge")
    payload["tokenPayloadExternal"]["appIntegrity"]["certificateSha256Digest"] = "CERTIFICATE"
    transport = httpx.MockTransport(lambda request: httpx.Response(200, json=payload))
    async with httpx.AsyncClient(transport=transport) as client:
        verifier = GooglePlayIntegrityVerifier(client=client, credentials_factory=lambda: "test-access-token")
        result = await verifier.verify(
            AttestationEvidence(AttestationProvider.PLAY_INTEGRITY, "challenge", "integrity-token", "com.useit.app")
        )
    assert result == AttestationResult(False, "attestation_invalid")


@pytest.mark.asyncio
async def test_google_verifier_rejects_malformed_device_verdict_list(monkeypatch):
    monkeypatch.setenv("USEIT_GOOGLE_PLAY_PACKAGE_NAME", "com.useit.app")
    payload = make_payload("challenge")
    payload["tokenPayloadExternal"]["deviceIntegrity"]["deviceRecognitionVerdict"] = "MEETS_DEVICE_INTEGRITY"
    transport = httpx.MockTransport(lambda request: httpx.Response(200, json=payload))
    async with httpx.AsyncClient(transport=transport) as client:
        verifier = GooglePlayIntegrityVerifier(client=client, credentials_factory=lambda: "test-access-token")
        result = await verifier.verify(
            AttestationEvidence(AttestationProvider.PLAY_INTEGRITY, "challenge", "integrity-token", "com.useit.app")
        )
    assert result == AttestationResult(False, "attestation_invalid")


@pytest.mark.asyncio
async def test_google_verifier_rejects_out_of_range_timestamp(monkeypatch):
    monkeypatch.setenv("USEIT_GOOGLE_PLAY_PACKAGE_NAME", "com.useit.app")
    # A very large JSON integer is representable in JSON, but cannot be safely
    # converted to the float seconds used for age calculation.
    payload = make_payload("challenge", now_ms=10**400)
    transport = httpx.MockTransport(lambda request: httpx.Response(200, json=payload))
    async with httpx.AsyncClient(transport=transport) as client:
        verifier = GooglePlayIntegrityVerifier(client=client, credentials_factory=lambda: "test-access-token")
        result = await verifier.verify(
            AttestationEvidence(AttestationProvider.PLAY_INTEGRITY, "challenge", "integrity-token", "com.useit.app")
        )
    assert result == AttestationResult(False, "timestamp_invalid")

@pytest.mark.parametrize(
    ("section", "primary", "alternate", "primary_value", "alternate_value", "expected_reason"),
    [
        ("requestDetails", "requestHash", "request_hash", hashlib.sha256(b"challenge").hexdigest(), "conflicting-hash", "attestation_invalid"),
        ("requestDetails", "requestPackageName", "request_package_name", "com.useit.app", "com.attacker.app", "wrong_app"),
        ("requestDetails", "timestampMillis", "timestamp_millis", 1_798_000_000_000, 0, "timestamp_invalid"),
        ("appIntegrity", "packageName", "package_name", "com.useit.app", "com.attacker.app", "wrong_app"),
        ("appIntegrity", "certificateSha256Digest", "certificate_sha256_digest", ["CERTIFICATE"], ["ATTACKER"], "attestation_invalid"),
        ("deviceIntegrity", "deviceRecognitionVerdict", "device_recognition_verdict", ["MEETS_DEVICE_INTEGRITY"], ["MEETS_BASIC_INTEGRITY"], "attestation_invalid"),
    ],
)
@pytest.mark.asyncio
async def test_google_verifier_rejects_conflicting_supported_field_aliases(
    monkeypatch, section, primary, alternate, primary_value, alternate_value, expected_reason
):
    monkeypatch.setenv("USEIT_GOOGLE_PLAY_PACKAGE_NAME", "com.useit.app")
    payload = make_payload("challenge")
    payload_section = payload["tokenPayloadExternal"][section]
    payload_section[primary] = primary_value
    payload_section[alternate] = alternate_value
    transport = httpx.MockTransport(lambda request: httpx.Response(200, json=payload))
    async with httpx.AsyncClient(transport=transport) as client:
        verifier = GooglePlayIntegrityVerifier(client=client, credentials_factory=lambda: "test-access-token")
        result = await verifier.verify(
            AttestationEvidence(AttestationProvider.PLAY_INTEGRITY, "challenge", "integrity-token", "com.useit.app")
        )
    assert result == AttestationResult(False, expected_reason)


@pytest.mark.asyncio
async def test_google_verifier_rejects_conflicting_nested_object_aliases(monkeypatch):
    monkeypatch.setenv("USEIT_GOOGLE_PLAY_PACKAGE_NAME", "com.useit.app")
    payload = make_payload("challenge")
    payload["tokenPayloadExternal"]["request_details"] = {
        "requestHash": "conflicting-hash",
        "requestPackageName": "com.useit.app",
        "timestampMillis": int(time.time() * 1000),
    }
    transport = httpx.MockTransport(lambda request: httpx.Response(200, json=payload))
    async with httpx.AsyncClient(transport=transport) as client:
        verifier = GooglePlayIntegrityVerifier(client=client, credentials_factory=lambda: "test-access-token")
        result = await verifier.verify(
            AttestationEvidence(AttestationProvider.PLAY_INTEGRITY, "challenge", "integrity-token", "com.useit.app")
        )
    assert result == AttestationResult(False, "attestation_invalid")


@pytest.mark.asyncio
async def test_google_verifier_rejects_conflicting_top_level_payload_aliases(monkeypatch):
    monkeypatch.setenv("USEIT_GOOGLE_PLAY_PACKAGE_NAME", "com.useit.app")
    payload = make_payload("challenge")
    body = payload.copy()
    body["token_payload_external"] = {"requestDetails": {"requestHash": "conflicting-payload"}}
    transport = httpx.MockTransport(lambda request: httpx.Response(200, json=body))
    async with httpx.AsyncClient(transport=transport) as client:
        verifier = GooglePlayIntegrityVerifier(client=client, credentials_factory=lambda: "test-access-token")
        result = await verifier.verify(
            AttestationEvidence(AttestationProvider.PLAY_INTEGRITY, "challenge", "integrity-token", "com.useit.app")
        )
    assert result == AttestationResult(False, "attestation_invalid")

