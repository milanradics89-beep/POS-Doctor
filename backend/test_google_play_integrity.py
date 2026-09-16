from __future__ import annotations

import hashlib
import time

import httpx
import pytest

from backend.attestation import AttestationEvidence, AttestationProvider, AttestationResult
from backend.google_play_integrity import GooglePlayIntegrityVerifier


class FakeCredentials:
    token = "test-access-token"

    def refresh(self, request):
        self.token = "test-access-token"


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
        verifier = GooglePlayIntegrityVerifier(client=client, credentials_factory=FakeCredentials)
        result = await verifier.verify(
            AttestationEvidence(AttestationProvider.PLAY_INTEGRITY, "challenge", "integrity-token", "com.useit.app")
        )
    assert result == AttestationResult(True, "provider_verified")


@pytest.mark.asyncio
async def test_google_verifier_rejects_wrong_request_hash(monkeypatch):
    monkeypatch.setenv("USEIT_GOOGLE_PLAY_PACKAGE_NAME", "com.useit.app")
    transport = httpx.MockTransport(lambda request: httpx.Response(200, json=make_payload("different-challenge")))
    async with httpx.AsyncClient(transport=transport) as client:
        verifier = GooglePlayIntegrityVerifier(client=client, credentials_factory=FakeCredentials)
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
        verifier = GooglePlayIntegrityVerifier(client=client, credentials_factory=FakeCredentials)
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
        verifier = GooglePlayIntegrityVerifier(client=client, credentials_factory=FakeCredentials)
        result = await verifier.verify(
            AttestationEvidence(AttestationProvider.PLAY_INTEGRITY, "challenge", "integrity-token", "com.useit.app")
        )
    assert result == AttestationResult(False, "token_stale")


@pytest.mark.asyncio
async def test_google_verifier_maps_provider_failure(monkeypatch):
    monkeypatch.setenv("USEIT_GOOGLE_PLAY_PACKAGE_NAME", "com.useit.app")
    transport = httpx.MockTransport(lambda request: httpx.Response(503, json={"error": "unavailable"}))
    async with httpx.AsyncClient(transport=transport) as client:
        verifier = GooglePlayIntegrityVerifier(client=client, credentials_factory=FakeCredentials)
        result = await verifier.verify(
            AttestationEvidence(AttestationProvider.PLAY_INTEGRITY, "challenge", "integrity-token", "com.useit.app")
        )
    assert result == AttestationResult(False, "provider_unavailable")
