from __future__ import annotations

import os
import secrets
from collections.abc import Awaitable, Callable

from fastapi import Request, Response
from fastapi.responses import JSONResponse


PUBLIC_PATHS = frozenset({"/health", "/docs", "/openapi.json", "/redoc"})


def configured_api_key() -> str | None:
    value = os.environ.get("USEIT_API_KEY")
    return value.strip() if value and value.strip() else None


def install_api_key_guard(app) -> None:
    @app.middleware("http")
    async def api_key_guard(request: Request, call_next: Callable[[Request], Awaitable[Response]]):
        expected = configured_api_key()
        if expected and request.url.path not in PUBLIC_PATHS:
            supplied = request.headers.get("X-API-Key", "")
            if not secrets.compare_digest(supplied, expected):
                return JSONResponse(status_code=401, content={"detail": "Invalid or missing API key."})
        return await call_next(request)
