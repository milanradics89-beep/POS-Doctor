from __future__ import annotations

import time
from collections.abc import Awaitable, Callable

from fastapi import Request, Response

from backend.privacy_logging import log_event


def install_observability(app, logger) -> None:
    @app.middleware("http")
    async def request_observability(request: Request, call_next: Callable[[Request], Awaitable[Response]]):
        started = time.monotonic()
        try:
            response = await call_next(request)
        except Exception:
            duration_ms = round((time.monotonic() - started) * 1000, 2)
            log_event(
                logger,
                "request_completed",
                requestId=getattr(request.state, "request_id", ""),
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
            requestId=getattr(request.state, "request_id", ""),
            method=request.method,
            path=request.url.path,
            statusCode=response.status_code,
            durationMs=duration_ms,
        )
        return response
