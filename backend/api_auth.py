from __future__ import annotations

import base64
import hashlib
import hmac
import json
import os
import secrets
import time
from collections.abc import Awaitable, Callable

from fastapi import Request, Response
from fastapi.responses import JSONResponse


PUBLIC_PATHS = frozenset({"/health", "/ready", "/docs", "/openapi.json", "/redoc", "/v1/session"})
DEFAULT_SESSION_TTL_SECONDS = 900
MAX_SESSION_TTL_SECONDS = 3600


def configured_api_key() -> str | None:
    value = os.environ.get("USEIT_API_KEY")
    return value.strip() if value and value.strip() else None


def configured_session_secret() -> str | None:
    value = os.environ.get("USEIT_SESSION_SECRET")
    return value.strip() if value and value.strip() else None


def session_ttl_seconds() -> int:
    raw = os.environ.get("USEIT_SESSION_TTL_SECONDS", str(DEFAULT_SESSION_TTL_SECONDS))
    try:
        value = int(raw)
    except ValueError:
        return DEFAULT_SESSION_TTL_SECONDS
    return max(60, min(value, MAX_SESSION_TTL_SECONDS))


def _b64url(value: bytes) -> str:
    return base64.urlsafe_b64encode(value).rstrip(b"=").decode("ascii")


def _unb64url(value: str) -> bytes:
    return base64.urlsafe_b64decode(value + "=" * (-len(value) % 4))


def issue_session_token(now: int | None = None) -> tuple[str, int]:
    secret = configured_session_secret()
    if not secret:
        raise RuntimeError("USEIT_SESSION_SECRET is not configured")
    issued_at = int(time.time() if now is None else now)
    expires_at = issued_at + session_ttl_seconds()
    header = _b64url(json.dumps({"alg": "HS256", "typ": "USEIT"}, separators=(",", ":")).encode())
    payload = _b64url(json.dumps({"v": 1, "iat": issued_at, "exp": expires_at}, separators=(",", ":")).encode())
    signing_input = f"{header}.{payload}".encode("ascii")
    signature = hmac.new(secret.encode("utf-8"), signing_input, hashlib.sha256).digest()
    return f"{header}.{payload}.{_b64url(signature)}", expires_at


def verify_session_token(token: str, now: int | None = None) -> bool:
    secret = configured_session_secret()
    if not secret:
        return False
    parts = token.strip().split(".")
    if len(parts) != 3:
        return False
    header, payload, supplied_signature = parts
    try:
        decoded_header = json.loads(_unb64url(header))
        decoded_payload = json.loads(_unb64url(payload))
        if decoded_header != {"alg": "HS256", "typ": "USEIT"}:
            return False
        issued_at = int(decoded_payload["iat"])
        expires_at = int(decoded_payload["exp"])
        if int(decoded_payload["v"]) != 1:
            return False
    except (ValueError, TypeError, KeyError, json.JSONDecodeError, UnicodeDecodeError):
        return False

    current = int(time.time() if now is None else now)
    if issued_at > current + 30 or expires_at <= current or expires_at - issued_at > MAX_SESSION_TTL_SECONDS:
        return False

    expected = hmac.new(secret.encode("utf-8"), f"{header}.{payload}".encode("ascii"), hashlib.sha256).digest()
    try:
        return hmac.compare_digest(_unb64url(supplied_signature), expected)
    except (ValueError, TypeError):
        return False


def extract_bearer_token(request: Request) -> str | None:
    value = request.headers.get("Authorization", "")
    scheme, _, token = value.partition(" ")
    if scheme.lower() != "bearer" or not token.strip():
        return None
    return token.strip()


def install_api_key_guard(app) -> None:
    @app.middleware("http")
    async def api_key_guard(request: Request, call_next: Callable[[Request], Awaitable[Response]]):
        if request.method == "OPTIONS" or request.url.path in PUBLIC_PATHS:
            return await call_next(request)

        api_key = configured_api_key()
        supplied_api_key = request.headers.get("X-API-Key", "")
        if api_key and secrets.compare_digest(supplied_api_key, api_key):
            return await call_next(request)

        session_token = extract_bearer_token(request)
        if session_token and verify_session_token(session_token):
            return await call_next(request)

        if api_key or configured_session_secret():
            return JSONResponse(status_code=401, content={"detail": "Missing or invalid API credentials."})

        return JSONResponse(status_code=503, content={"detail": "API authentication is not configured."})
