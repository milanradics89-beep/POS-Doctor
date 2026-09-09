from __future__ import annotations

import re
import secrets
from collections.abc import Awaitable, Callable

from fastapi import Request, Response
from fastapi.responses import JSONResponse

MAX_REQUEST_BYTES = 10_500_000
MAX_REQUEST_ID_LENGTH = 128
_REQUEST_ID_RE = re.compile(r"^[A-Za-z0-9._:-]+$")


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

        response = await call_next(request)
        response.headers["X-Request-ID"] = request_id
        return response
