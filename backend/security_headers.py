from __future__ import annotations

from collections.abc import Awaitable, Callable

from fastapi import Request, Response


def install_security_headers(app) -> None:
    @app.middleware("http")
    async def security_headers(request: Request, call_next: Callable[[Request], Awaitable[Response]]):
        response = await call_next(request)
        response.headers.setdefault("X-Content-Type-Options", "nosniff")
        response.headers.setdefault("X-Frame-Options", "DENY")
        response.headers.setdefault("Referrer-Policy", "no-referrer")
        response.headers.setdefault("Permissions-Policy", "camera=(), microphone=(), geolocation=()")
        return response
