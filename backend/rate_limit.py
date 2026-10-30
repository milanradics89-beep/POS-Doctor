from __future__ import annotations

import os
import time
from collections import deque
from collections.abc import Awaitable, Callable

from fastapi import Request, Response
from fastapi.responses import JSONResponse


PUBLIC_PATHS = frozenset({"/health", "/ready", "/docs", "/openapi.json", "/redoc"})
SESSION_PATH = "/v1/session"
SESSION_CHALLENGE_PATH = "/v1/session/challenge"
DEFAULT_SESSION_RATE_LIMIT = 10
MAX_MEMORY_RATE_LIMIT_BUCKETS = 10_000

# INCR and EXPIRE must be atomic. Otherwise a worker crash between the two
# commands can leave a per-minute bucket without a TTL.
_REDIS_RATE_LIMIT_INCREMENT_SCRIPT = """
local current = redis.call('INCR', KEYS[1])
local ttl = redis.call('TTL', KEYS[1])
if current == 1 or ttl < 0 then
  redis.call('EXPIRE', KEYS[1], ARGV[1])
end
return current
"""


def _rate_limit_bucket() -> int:
    return int(time.time() // 60)


def configured_rate_limit() -> int:
    try:
        return max(1, int(os.environ.get("USEIT_RATE_LIMIT_PER_MINUTE", "60")))
    except ValueError:
        return 60


def configured_session_rate_limit() -> int:
    try:
        return max(1, int(os.environ.get("USEIT_SESSION_RATE_LIMIT_PER_MINUTE", str(DEFAULT_SESSION_RATE_LIMIT))))
    except ValueError:
        return DEFAULT_SESSION_RATE_LIMIT


def rate_limit_mode() -> str:
    return os.environ.get("USEIT_RATE_LIMIT_MODE", "memory").strip().lower()


def _client_key(request: Request) -> str:
    return request.client.host if request.client else "unknown"


def _limited_response() -> JSONResponse:
    return JSONResponse(
        status_code=429,
        content={"detail": "Rate limit exceeded."},
        headers={"Retry-After": "60"},
    )


async def _redis_allowed(request: Request, limit: int, namespace: str = "rate") -> bool:
    try:
        from redis.asyncio import Redis
    except ImportError as exc:
        raise RuntimeError("Redis rate limiting is configured but the redis package is unavailable.") from exc

    url = os.environ.get("USEIT_REDIS_URL", "").strip()
    if not url:
        raise RuntimeError("Redis rate limiting requires USEIT_REDIS_URL.")

    client = Redis.from_url(
        url,
        decode_responses=True,
        socket_connect_timeout=2.0,
        socket_timeout=5.0,
    )
    key = f"useit:{namespace}:{_client_key(request)}:{_rate_limit_bucket()}"
    try:
        count = await client.eval(_REDIS_RATE_LIMIT_INCREMENT_SCRIPT, 1, key, 61)
        return int(count) <= limit
    finally:
        await client.aclose()


def _prune_expired_buckets(
    buckets: dict[tuple[str, str], deque[float]], cutoff: float
) -> None:
    """Drop inactive clients so memory-mode rate limiting stays bounded."""
    for key, bucket in list(buckets.items()):
        while bucket and bucket[0] <= cutoff:
            bucket.popleft()
        if not bucket:
            buckets.pop(key, None)


def install_rate_limit(app) -> None:
    buckets: dict[tuple[str, str], deque[float]] = {}

    @app.middleware("http")
    async def rate_limit(request: Request, call_next: Callable[[Request], Awaitable[Response]]):
        if request.method == "OPTIONS" or request.url.path in PUBLIC_PATHS:
            return await call_next(request)

        is_session = request.url.path == SESSION_PATH and request.method == "POST"
        is_challenge = request.url.path == SESSION_CHALLENGE_PATH and request.method == "POST"
        limit = configured_session_rate_limit() if is_session or is_challenge else configured_rate_limit()
        namespace = "session-rate" if is_session else "challenge-rate" if is_challenge else "rate"

        if rate_limit_mode() == "redis":
            try:
                allowed = await _redis_allowed(request, limit, namespace)
            except Exception:
                return JSONResponse(status_code=503, content={"detail": "Rate limiting is temporarily unavailable."})
            if not allowed:
                return _limited_response()
        else:
            now = time.monotonic()
            key = (namespace, _client_key(request))
            cutoff = now - 60.0
            bucket = buckets.get(key)
            if bucket is None:
                if len(buckets) >= MAX_MEMORY_RATE_LIMIT_BUCKETS:
                    _prune_expired_buckets(buckets, cutoff)
                if len(buckets) >= MAX_MEMORY_RATE_LIMIT_BUCKETS:
                    # Fail closed rather than growing memory without bound or
                    # evicting active clients and silently resetting their limits.
                    return JSONResponse(
                        status_code=503,
                        content={"detail": "Rate limiting capacity is temporarily exhausted."},
                    )
                bucket = deque()
                buckets[key] = bucket
            while bucket and bucket[0] <= cutoff:
                bucket.popleft()
            if len(bucket) >= limit:
                return _limited_response()
            bucket.append(now)

        return await call_next(request)
