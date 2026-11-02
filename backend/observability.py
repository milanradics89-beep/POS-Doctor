from __future__ import annotations

import time
from collections.abc import Awaitable, Callable

from fastapi import Request, Response

from backend.privacy_logging import log_event
from backend.request_controls import _safe_request_id


def install_observability(app, logger) -> None:
    @app.middleware("http")
    async def request_observability(request: Request, call_next: Callable[[Request], Awaitable[Response]]):
        request_id = _safe_request_id(request.headers.get("X-Request-ID"))
        request.state.request_id = request_id
        started = time.monotonic()
        try:
            response = await call_next(request)
        except Exception:
            duration_ms = round((time.monotonic() - started) * 1000, 2)
            log_event(
                logger,
                "request_completed",
                requestId=request_id,
                method=request.method,
                path=request.url.path,
                statusCode=500,
                durationMs=duration_ms,
            )
            raise

        duration_ms = round((time.monotonic() - started) * 1000, 2)
        log_event(
            logger,
            "request_completed",
            requestId=request_id,
            method=request.method,
            path=request.url.path,
            statusCode=response.status_code,
            durationMs=duration_ms,
        )
        response.headers.setdefault("X-Request-ID", request_id)
        return response
