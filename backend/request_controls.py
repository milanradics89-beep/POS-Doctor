from __future__ import annotations

import asyncio
import logging
import math
import os
import re
import secrets
from collections.abc import Awaitable, Callable

from fastapi import Request, Response
from fastapi.responses import JSONResponse

logger = logging.getLogger("useit.request_controls")

MAX_REQUEST_BYTES = 10_500_000
MAX_REQUEST_ID_LENGTH = 128
DEFAULT_REQUEST_TIMEOUT_SECONDS = 45.0
MIN_REQUEST_TIMEOUT_SECONDS = 1.0
MAX_REQUEST_TIMEOUT_SECONDS = 300.0
# Backward-compatible module-level override retained for existing tests and integrations.
REQUEST_TIMEOUT_SECONDS = DEFAULT_REQUEST_TIMEOUT_SECONDS
_REQUEST_ID_RE = re.compile(r"^[A-Za-z0-9._:-]+$")


def _bounded_timeout(value: float) -> float:
    if not math.isfinite(value):
        return DEFAULT_REQUEST_TIMEOUT_SECONDS
    return min(MAX_REQUEST_TIMEOUT_SECONDS, max(MIN_REQUEST_TIMEOUT_SECONDS, value))


def configured_request_timeout() -> float:
    # Preserve the legacy test/integration override when it is explicitly changed.
    if REQUEST_TIMEOUT_SECONDS != DEFAULT_REQUEST_TIMEOUT_SECONDS:
        return float(REQUEST_TIMEOUT_SECONDS)
    configured = os.environ.get("USEIT_REQUEST_TIMEOUT_SECONDS")
    if configured is None:
        return DEFAULT_REQUEST_TIMEOUT_SECONDS
    try:
        value = float(configured)
    except (TypeError, ValueError):
        return DEFAULT_REQUEST_TIMEOUT_SECONDS
    return _bounded_timeout(value)


def _safe_request_id(value: str | None) -> str:
    if value and len(value) <= MAX_REQUEST_ID_LENGTH and _REQUEST_ID_RE.fullmatch(value):
        return value
    return secrets.token_hex(16)


def install_request_controls(app) -> None:
    @app.middleware("http")
    async def request_controls(request: Request, call_next: Callable[[Request], Awaitable[Response]]):
        content_length = request.headers.get("content-length")
        if content_length:
            try:
                declared_length = int(content_length)
            except ValueError:
                return JSONResponse(status_code=400, content={"detail": "Invalid Content-Length."})
            if declared_length < 0 or declared_length > MAX_REQUEST_BYTES:
                return JSONResponse(status_code=413, content={"detail": "Request body is too large."})

        request_id = _safe_request_id(request.headers.get("X-Request-ID"))
        request.state.request_id = request_id

        if request.method in {"POST", "PUT", "PATCH"}:
            body = await request.body()
            if len(body) > MAX_REQUEST_BYTES:
                return JSONResponse(status_code=413, content={"detail": "Request body is too large."})

        try:
            response = await asyncio.wait_for(call_next(request), timeout=configured_request_timeout())
        except asyncio.TimeoutError:
            return JSONResponse(
                status_code=504,
                content={"detail": "Request timed out.", "requestId": request_id},
                headers={"X-Request-ID": request_id},
            )
        except Exception:
            # Keep unexpected failures generic while preserving the operational correlation ID.
            logger.exception("Unhandled request failure")
            return JSONResponse(
                status_code=500,
                content={"detail": "Internal server error.", "requestId": request_id},
                headers={"X-Request-ID": request_id},
            )
        response.headers["X-Request-ID"] = request_id
        return response
