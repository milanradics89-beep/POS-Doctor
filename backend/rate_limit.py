from __future__ import annotations

import math
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
RATE_LIMIT_WINDOW_SECONDS = 60
RATE_LIMIT_WINDOW_MS = RATE_LIMIT_WINDOW_SECONDS * 1000
MAX_MEMORY_RATE_LIMIT_BUCKETS = 10_000

# Redis and memory modes share a rolling 60-second policy. Redis TIME avoids
# worker clock skew; pruning, counting, admission and expiry are one Lua operation.
_REDIS_RATE_LIMIT_SLIDING_WINDOW_SCRIPT = """
local server_time = redis.call('TIME')
local now_ms = tonumber(server_time[1]) * 1000 + math.floor(tonumber(server_time[2]) / 1000)
local window_ms = tonumber(ARGV[1])
local limit = tonumber(ARGV[2])
local cutoff = now_ms - window_ms

redis.call('ZREMRANGEBYSCORE', KEYS[1], '-inf', cutoff)
local count = redis.call('ZCARD', KEYS[1])
if count >= limit then
  local oldest = redis.call('ZRANGE', KEYS[1], 0, 0, 'WITHSCORES')
  local retry_ms = window_ms - (now_ms - tonumber(oldest[2]))
  return {0, math.max(1, math.ceil(retry_ms / 1000))}
end

local sequence = redis.call('INCR', KEYS[2])
redis.call('PEXPIRE', KEYS[2], window_ms)
local member = tostring(now_ms) .. ':' .. tostring(sequence)
redis.call('ZADD', KEYS[1], now_ms, member)
redis.call('PEXPIRE', KEYS[1], window_ms)
return {1, 0}
"""

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


def _limited_response(retry_after_seconds: int = RATE_LIMIT_WINDOW_SECONDS) -> JSONResponse:
    return JSONResponse(
        status_code=429,
        content={"detail": "Rate limit exceeded."},
        headers={"Retry-After": str(max(1, int(retry_after_seconds)))},
    )

async def _redis_allowed(request: Request, limit: int, namespace: str = "rate") -> tuple[bool, int]:
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
    events_key = f"useit:{namespace}:{_client_key(request)}:events"
    sequence_key = f"{events_key}:sequence"
    try:
        result = await client.eval(
            _REDIS_RATE_LIMIT_SLIDING_WINDOW_SCRIPT,
            2,
            events_key,
            sequence_key,
            RATE_LIMIT_WINDOW_MS,
            limit,
        )
        allowed = int(result[0]) == 1
        retry_after = int(result[1])
        return allowed, 0 if allowed else max(1, retry_after)
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
                allowed, retry_after = await _redis_allowed(request, limit, namespace)
            except Exception:
                return JSONResponse(status_code=503, content={"detail": "Rate limiting is temporarily unavailable."})
            if not allowed:
                return _limited_response(retry_after)
        else:
            now = time.monotonic()
            key = (namespace, _client_key(request))
            cutoff = now - RATE_LIMIT_WINDOW_SECONDS
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
                retry_after = math.ceil(bucket[0] + RATE_LIMIT_WINDOW_SECONDS - now)
                return _limited_response(retry_after)
            bucket.append(now)

        return await call_next(request)
