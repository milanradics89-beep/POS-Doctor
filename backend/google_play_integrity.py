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
_MISSING = object()


def _aliased_value(mapping: dict[str, Any], primary: str, alternate: str) -> tuple[Any, bool]:
    """Read supported camelCase/snake_case aliases without hiding conflicts."""
    has_primary = primary in mapping
    has_alternate = alternate in mapping
    if has_primary and has_alternate and mapping[primary] != mapping[alternate]:
        return _MISSING, True
    if has_primary:
        return mapping[primary], False
    if has_alternate:
        return mapping[alternate], False
    return _MISSING, False


class CredentialsLike(Protocol):
    token: str | None

    def refresh(self, request: Any) -> None: ...


class GooglePlayIntegrityVerifier(AttestationVerifier):
    """Server-side verifier using Google's managed Play Integrity decryption."""

    def __init__(
        self,
        client: httpx.AsyncClient | None = None,
        credentials_factory: Callable[[], CredentialsLike | str] | None = None,
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
            credential_source = await asyncio.to_thread(self._credentials_factory)
            if isinstance(credential_source, str):
                access_token = credential_source
            else:
                await asyncio.to_thread(_refresh_credentials, credential_source)
                access_token = credential_source.token
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

        # Authentication, throttling, timeout, and server failures from Google's
        # decode API are provider-side failures, not evidence that the client token
        # is invalid. Keep them retryable and surface them as HTTP 503 upstream.
        if response.status_code in {401, 403, 408, 429} or response.status_code >= 500:
            return AttestationResult(False, "provider_unavailable")
        if response.status_code != 200:
            return AttestationResult(False, "attestation_invalid")

        try:
            body = response.json()
        except ValueError:
            return AttestationResult(False, "attestation_invalid")
        if not isinstance(body, dict):
            return AttestationResult(False, "attestation_invalid")
        payload, conflict = _aliased_value(body, "tokenPayloadExternal", "token_payload_external")
        if conflict or not isinstance(payload, dict):
            return AttestationResult(False, "attestation_invalid")

        return self._validate_payload(payload, evidence)

    def _validate_payload(self, payload: dict[str, Any], evidence: AttestationEvidence) -> AttestationResult:
        request_details, conflict = _aliased_value(payload, "requestDetails", "request_details")
        if conflict or not isinstance(request_details, dict):
            return AttestationResult(False, "attestation_invalid")
        request_hash, conflict = _aliased_value(request_details, "requestHash", "request_hash")
        expected_hash = hashlib.sha256(evidence.challenge.encode("utf-8")).hexdigest()
        if conflict:
            return AttestationResult(False, "attestation_invalid")
        if request_hash != expected_hash:
            return AttestationResult(False, "request_hash_mismatch")
        request_package, conflict = _aliased_value(request_details, "requestPackageName", "request_package_name")
        if conflict:
            return AttestationResult(False, "wrong_app")
        if request_package != evidence.app_id:
            return AttestationResult(False, "wrong_app")

        timestamp_raw, conflict = _aliased_value(request_details, "timestampMillis", "timestamp_millis")
        if conflict or isinstance(timestamp_raw, bool):
            return AttestationResult(False, "timestamp_invalid")
        try:
            age_seconds = self._now() - (int(timestamp_raw) / 1000)
        except (TypeError, ValueError, OverflowError):
            return AttestationResult(False, "timestamp_invalid")
        if age_seconds < -30 or age_seconds > max_token_age_seconds():
            return AttestationResult(False, "token_stale")

        app_integrity, conflict = _aliased_value(payload, "appIntegrity", "app_integrity")
        if conflict or not isinstance(app_integrity, dict):
            return AttestationResult(False, "attestation_invalid")
        actual_app_package, conflict = _aliased_value(app_integrity, "packageName", "package_name")
        if conflict:
            return AttestationResult(False, "wrong_app")
        if actual_app_package != evidence.app_id:
            return AttestationResult(False, "wrong_app")
        if app_integrity.get("appRecognitionVerdict") != "PLAY_RECOGNIZED":
            return AttestationResult(False, "app_not_recognized")

        actual_certificates_raw, conflict = _aliased_value(
            app_integrity, "certificateSha256Digest", "certificate_sha256_digest"
        )
        if conflict:
            return AttestationResult(False, "attestation_invalid")
        if actual_certificates_raw is _MISSING:
            actual_certificates_raw = []
        if not isinstance(actual_certificates_raw, list) or not all(
            isinstance(certificate, str) for certificate in actual_certificates_raw
        ):
            return AttestationResult(False, "attestation_invalid")
        required_certificates = configured_certificates()
        if required_certificates and not set(required_certificates).issubset(set(actual_certificates_raw)):
            return AttestationResult(False, "certificate_mismatch")

        account_details, conflict = _aliased_value(payload, "accountDetails", "account_details")
        if conflict or not isinstance(account_details, dict):
            return AttestationResult(False, "attestation_invalid")
        if account_details.get("appLicensingVerdict") != "LICENSED":
            return AttestationResult(False, "app_not_licensed")

        device_integrity, conflict = _aliased_value(payload, "deviceIntegrity", "device_integrity")
        if conflict or not isinstance(device_integrity, dict):
            return AttestationResult(False, "attestation_invalid")
        actual_device_verdicts_raw, conflict = _aliased_value(
            device_integrity, "deviceRecognitionVerdict", "device_recognition_verdict"
        )
        if conflict:
            return AttestationResult(False, "attestation_invalid")
        if actual_device_verdicts_raw is _MISSING:
            actual_device_verdicts_raw = []
        if not isinstance(actual_device_verdicts_raw, list) or not all(
            isinstance(verdict, str) for verdict in actual_device_verdicts_raw
        ):
            return AttestationResult(False, "attestation_invalid")
        if not set(actual_device_verdicts_raw).intersection(configured_device_verdicts()):
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
