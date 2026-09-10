from __future__ import annotations

import os

from fastapi import HTTPException


TRUE_VALUES = {"1", "true", "yes", "on"}


def production_mode() -> bool:
    return os.getenv("USEIT_ENV", "development").strip().lower() in {"production", "prod"}


def validate_production_security() -> None:
    if not production_mode():
        return

    required = ("OPENAI_API_KEY", "USEIT_API_KEY")
    missing = [name for name in required if not os.getenv(name)]
    if missing:
        raise RuntimeError("Missing required production secrets: " + ", ".join(missing))

    origins = [x.strip() for x in os.getenv("USEIT_CORS_ORIGINS", "").split(",") if x.strip()]
    if not origins or "*" in origins:
        raise RuntimeError("Wildcard CORS is forbidden in production")

    if os.getenv("USEIT_ALLOW_DOCS", "false").strip().lower() in TRUE_VALUES:
        raise RuntimeError("Interactive API documentation must be explicitly disabled in production")

    rate_mode = os.getenv("USEIT_RATE_LIMIT_MODE", "memory").strip().lower()
    if rate_mode not in {"memory", "redis"}:
        raise RuntimeError("USEIT_RATE_LIMIT_MODE must be memory or redis")
    if rate_mode == "redis" and not os.getenv("USEIT_REDIS_URL", "").strip():
        raise RuntimeError("USEIT_REDIS_URL is required when Redis rate limiting is enabled")


def enforce_production_configuration() -> None:
    try:
        validate_production_security()
    except RuntimeError as exc:
        raise HTTPException(status_code=503, detail="Production security configuration is incomplete") from exc
