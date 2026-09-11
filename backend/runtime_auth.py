from __future__ import annotations

import secrets
from collections.abc import Awaitable, Callable

from fastapi import Request, Response
from fastapi.responses import JSONResponse

from backend.api_auth import configured_api_key, configured_session_secret, extract_bearer_token, verify_session_token


PUBLIC_PATHS = frozenset({"/health", "/ready", "/docs", "/openapi.json", "/redoc", "/v1/session", "/v1/session/challenge"})


def install_runtime_auth_guard(app) -> None:
    @app.middleware("http")
    async def runtime_auth_guard(request: Request, call_next: Callable[[Request], Awaitable[Response]]):
        if request.method == "OPTIONS" or request.url.path in PUBLIC_PATHS:
            return await call_next(request)

        api_key = configured_api_key()
        session_secret = configured_session_secret()
        if not api_key and not session_secret:
            return await call_next(request)

        supplied_api_key = request.headers.get("X-API-Key", "")
        if api_key and secrets.compare_digest(supplied_api_key, api_key):
            return await call_next(request)

        session_token = extract_bearer_token(request)
        if session_token and verify_session_token(session_token):
            return await call_next(request)

        return JSONResponse(status_code=401, content={"detail": "Invalid or missing API key."})
