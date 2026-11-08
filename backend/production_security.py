from __future__ import annotations

import os
from urllib.parse import urlsplit

from fastapi import HTTPException

from backend.attestation import (
    AttestationMode,
    AttestationProvider,
    configured_attestation_app_id,
    configured_attestation_mode,
    configured_attestation_provider,
    configured_redis_url,
)

TRUE_VALUES = {"1", "true", "yes", "on"}
MIN_SESSION_SECRET_LENGTH = 32
MIN_API_KEY_LENGTH = 32
PLACEHOLDER_SECRET_VALUES = frozenset({"change-me", "changeme", "example", "placeholder", "test"})
PLACEHOLDER_SECRET_PREFIXES = ("replace-with-", "your-")


def _is_placeholder_secret(value: str) -> bool:
    normalized = value.strip().lower()
    return normalized in PLACEHOLDER_SECRET_VALUES or normalized.startswith(PLACEHOLDER_SECRET_PREFIXES)


def production_mode() -> bool:
    return os.getenv("USEIT_ENV", "development").strip().lower() in {"production", "prod"}


def validate_production_redis_transport() -> None:
    """Require TLS for the shared Redis service used by production workers."""
    redis_url = configured_redis_url()
    if not redis_url:
        raise RuntimeError("USEIT_REDIS_URL is required for production Redis")

    try:
        parsed = urlsplit(redis_url)
        hostname = parsed.hostname
        port = parsed.port
    except ValueError as exc:
        raise RuntimeError("USEIT_REDIS_URL must be a valid rediss:// URL in production") from exc

    if parsed.scheme.lower() != "rediss" or not hostname:
        raise RuntimeError("USEIT_REDIS_URL must use rediss:// with a valid host in production")
    if port is not None and not 1 <= port <= 65535:
        raise RuntimeError("USEIT_REDIS_URL port must be between 1 and 65535 in production")


def validate_production_session_auth_configuration() -> None:
    """Enforce the same session/attestation contract at startup and readiness."""
    mode = configured_attestation_mode()
    session_secret = os.getenv("USEIT_SESSION_SECRET", "").strip()

    if mode is AttestationMode.DISABLED:
        if session_secret:
            raise RuntimeError(
                "USEIT_ATTESTATION_MODE must be required when USEIT_SESSION_SECRET is configured in production"
            )
        return

    if not session_secret:
        raise RuntimeError(
            "USEIT_SESSION_SECRET is required when USEIT_ATTESTATION_MODE is enabled in production"
        )
    if mode is not AttestationMode.REQUIRED:
        raise RuntimeError(
            "USEIT_ATTESTATION_MODE must be required when USEIT_SESSION_SECRET is configured in production"
        )
    if not configured_attestation_app_id():
        raise RuntimeError("USEIT_ATTESTATION_APP_ID is required for production session authentication")
    if not configured_redis_url():
        raise RuntimeError("USEIT_REDIS_URL is required for production attestation challenge storage")


def validate_production_security() -> None:
    if not production_mode():
        return

    missing = []
    openai_api_key = os.getenv("OPENAI_API_KEY", "").strip()
    if not openai_api_key:
        missing.append("OPENAI_API_KEY")
    elif _is_placeholder_secret(openai_api_key):
        raise RuntimeError("OPENAI_API_KEY must not be a placeholder value")
    api_key = os.getenv("USEIT_API_KEY", "").strip()
    session_secret = os.getenv("USEIT_SESSION_SECRET", "").strip()
    if not api_key and not session_secret:
        missing.append("USEIT_API_KEY or USEIT_SESSION_SECRET")
    if missing:
        raise RuntimeError("Missing required production secrets: " + ", ".join(missing))
    if api_key and _is_placeholder_secret(api_key):
        raise RuntimeError("USEIT_API_KEY must not be a placeholder value")
    if session_secret and _is_placeholder_secret(session_secret):
        raise RuntimeError("USEIT_SESSION_SECRET must not be a placeholder value")
    if api_key and len(api_key) < MIN_API_KEY_LENGTH:
        raise RuntimeError("USEIT_API_KEY must be at least 32 characters when configured")
    if session_secret and len(session_secret) < MIN_SESSION_SECRET_LENGTH:
        raise RuntimeError("USEIT_SESSION_SECRET must be at least 32 characters")

    validate_production_session_auth_configuration()

    if session_secret:
        provider = configured_attestation_provider()
        if provider is AttestationProvider.PLAY_INTEGRITY:
            play_package_name = os.getenv("USEIT_GOOGLE_PLAY_PACKAGE_NAME", "").strip()
            if not play_package_name:
                raise RuntimeError("USEIT_GOOGLE_PLAY_PACKAGE_NAME is required for Google Play Integrity")
            if configured_attestation_app_id() != play_package_name:
                raise RuntimeError(
                    "USEIT_ATTESTATION_APP_ID must match USEIT_GOOGLE_PLAY_PACKAGE_NAME for Google Play Integrity"
                )
            raw_certificate_pins = os.getenv("USEIT_GOOGLE_PLAY_CERT_SHA256", "").strip()
            if not raw_certificate_pins:
                raise RuntimeError("USEIT_GOOGLE_PLAY_CERT_SHA256 is required for production Google Play Integrity verification")
            # Validate the parsed list used by the verifier, not only the raw string:
            # values such as ",,," are non-empty but produce no certificate pins.
            from backend.google_play_integrity import configured_certificates

            if not configured_certificates():
                raise RuntimeError(
                    "USEIT_GOOGLE_PLAY_CERT_SHA256 must contain at least one non-empty signing certificate digest"
                )

    origins = [x.strip() for x in os.getenv("USEIT_CORS_ORIGINS", "").split(",") if x.strip()]
    if not origins or "*" in origins:
        raise RuntimeError("Wildcard CORS is forbidden in production")

    if os.getenv("USEIT_ALLOW_DOCS", "false").strip().lower() in TRUE_VALUES:
        raise RuntimeError("Interactive API documentation must be explicitly disabled in production")

    rate_mode = os.getenv("USEIT_RATE_LIMIT_MODE", "memory").strip().lower()
    if rate_mode not in {"memory", "redis"}:
        raise RuntimeError("USEIT_RATE_LIMIT_MODE must be memory or redis")
    if rate_mode != "redis":
        raise RuntimeError("USEIT_RATE_LIMIT_MODE must be redis in production to enforce shared rate limits across workers")
    if not os.getenv("USEIT_REDIS_URL", "").strip():
        raise RuntimeError("USEIT_REDIS_URL is required when Redis rate limiting is enabled")
    validate_production_redis_transport()


def enforce_production_configuration() -> None:
    try:
        validate_production_security()
    except RuntimeError as exc:
        raise HTTPException(status_code=503, detail="Production security configuration is incomplete") from exc
