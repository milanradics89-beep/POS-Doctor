from __future__ import annotations

import asyncio
import hashlib
import os
import time
from collections.abc import Callable
from typing import Any, Protocol

import httpx

from backend.attestation import AttestationEvidence, AttestationResult, AttestationVerifier

GOOGLE_PLAY_INTEGRITY_SCOPE = "https://www.googleapis.com/auth/playintegrity"
GOOGLE_PLAY_INTEGRITY_BASE_URL = "https://playintegrity.googleapis.com/v1"
DEFAULT_MAX_TOKEN_AGE_SECONDS = 300


class CredentialsLike(Protocol):
    token: str | None

    def refresh(self, request: Any) -> None: ...


class GooglePlayIntegrityVerifier(AttestationVerifier):
    """Server-side verifier using Google's managed Play Integrity decryption."""

    def __init__(
        self,
        client: httpx.AsyncClient | None = None,
        credentials_factory: Callable[[], CredentialsLike] | None = None,
        now: Callable[[], float] | None = None,
    ) -> None:
        self._client = client
        self._credentials_factory = credentials_factory or _default_credentials
        self._now = now or time.time

    async def verify(self, evidence: AttestationEvidence) -> AttestationResult:
        package_name = configured_package_name()
        if not package_name:
            return AttestationResult(False, "provider_not_configured")
        if evidence.app_id != package_name:
            return AttestationResult(False, "wrong_app")
        if not evidence.assertion.strip():
            return AttestationResult(False, "assertion_missing")

        try:
            credentials = await asyncio.to_thread(self._credentials_factory)
            await asyncio.to_thread(_refresh_credentials, credentials)
            access_token = credentials.token
            if not access_token:
                return AttestationResult(False, "provider_unavailable")

            owns_client = self._client is None
            client = self._client or httpx.AsyncClient(timeout=10.0)
            try:
                url = f"{GOOGLE_PLAY_INTEGRITY_BASE_URL}/{package_name}:decodeIntegrityToken"
                response = await client.post(
                    url,
                    headers={"Authorization": f"Bearer {access_token}"},
                    json={"integrity_token": evidence.assertion},
                )
            finally:
                if owns_client:
                    await client.aclose()
        except Exception:
            return AttestationResult(False, "provider_unavailable")

        if response.status_code >= 500:
            return AttestationResult(False, "provider_unavailable")
        if response.status_code != 200:
            return AttestationResult(False, "attestation_invalid")

        try:
            payload = response.json().get("tokenPayloadExternal") or response.json().get("token_payload_external")
        except ValueError:
            return AttestationResult(False, "attestation_invalid")
        if not isinstance(payload, dict):
            return AttestationResult(False, "attestation_invalid")

        return self._validate_payload(payload, evidence)

    def _validate_payload(self, payload: dict[str, Any], evidence: AttestationEvidence) -> AttestationResult:
        request_details = payload.get("requestDetails") or payload.get("request_details") or {}
        request_hash = request_details.get("requestHash") or request_details.get("request_hash")
        expected_hash = hashlib.sha256(evidence.challenge.encode("utf-8")).hexdigest()
        if request_hash != expected_hash:
            return AttestationResult(False, "request_hash_mismatch")

        timestamp_raw = request_details.get("timestampMillis") or request_details.get("timestamp_millis")
        try:
            age_seconds = self._now() - (int(timestamp_raw) / 1000)
        except (TypeError, ValueError):
            return AttestationResult(False, "timestamp_invalid")
        if age_seconds < -30 or age_seconds > max_token_age_seconds():
            return AttestationResult(False, "token_stale")

        app_integrity = payload.get("appIntegrity") or payload.get("app_integrity") or {}
        if app_integrity.get("packageName") != evidence.app_id and app_integrity.get("package_name") != evidence.app_id:
            return AttestationResult(False, "wrong_app")
        if app_integrity.get("appRecognitionVerdict") != "PLAY_RECOGNIZED":
            return AttestationResult(False, "app_not_recognized")

        required_certificates = configured_certificates()
        if required_certificates:
            actual_certificates = set(app_integrity.get("certificateSha256Digest") or app_integrity.get("certificate_sha256_digest") or [])
            if not set(required_certificates).issubset(actual_certificates):
                return AttestationResult(False, "certificate_mismatch")

        account_details = payload.get("accountDetails") or payload.get("account_details") or {}
        if account_details.get("appLicensingVerdict") != "LICENSED":
            return AttestationResult(False, "app_not_licensed")

        device_integrity = payload.get("deviceIntegrity") or payload.get("device_integrity") or {}
        actual_device_verdicts = set(device_integrity.get("deviceRecognitionVerdict") or device_integrity.get("device_recognition_verdict") or [])
        if not actual_device_verdicts.intersection(configured_device_verdicts()):
            return AttestationResult(False, "device_integrity_insufficient")

        return AttestationResult(True, "provider_verified")


def configured_package_name() -> str:
    return os.environ.get("USEIT_GOOGLE_PLAY_PACKAGE_NAME", "").strip()


def configured_certificates() -> list[str]:
    raw = os.environ.get("USEIT_GOOGLE_PLAY_CERT_SHA256", "")
    return [item.strip() for item in raw.split(",") if item.strip()]


def configured_device_verdicts() -> set[str]:
    raw = os.environ.get("USEIT_GOOGLE_PLAY_DEVICE_INTEGRITY", "MEETS_DEVICE_INTEGRITY")
    return {item.strip() for item in raw.split(",") if item.strip()}


def max_token_age_seconds() -> int:
    raw = os.environ.get("USEIT_GOOGLE_PLAY_MAX_TOKEN_AGE_SECONDS", str(DEFAULT_MAX_TOKEN_AGE_SECONDS))
    try:
        value = int(raw)
    except ValueError:
        return DEFAULT_MAX_TOKEN_AGE_SECONDS
    return max(30, min(value, 900))


def _default_credentials() -> CredentialsLike:
    import google.auth

    credentials, _ = google.auth.default(scopes=[GOOGLE_PLAY_INTEGRITY_SCOPE])
    return credentials


def _refresh_credentials(credentials: CredentialsLike) -> None:
    from google.auth.transport.requests import Request

    credentials.refresh(Request())
