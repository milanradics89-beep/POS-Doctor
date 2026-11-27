"""Reserve capacity just before a billable provider operation, after validation."""
import os

from fastapi import HTTPException


def daily_budget() -> int | None:
    raw = os.getenv("USEIT_AI_DAILY_UNITS")
    if raw is None and not os.getenv("K_SERVICE"):
        return None
    try:
        limit = int(raw or "")
    except ValueError as exc:
        raise RuntimeError("Set USEIT_AI_DAILY_UNITS to an approved nonnegative daily limit.") from exc
    if not 0 <= limit <= 1_000_000:
        raise RuntimeError("USEIT_AI_DAILY_UNITS must be between 0 and 1000000.")
    return limit


async def reserve_units(application, units):
    limit = daily_budget()
    if limit is None:
        return
    store = getattr(application.state, "firestore_state", None)
    if store is None:
        raise HTTPException(503, "AI budget protection is unavailable.")
    try:
        allowed = await store.reserve_daily(limit, units)
    except Exception as exc:
        raise HTTPException(503, "AI budget protection is unavailable.") from exc
    if not allowed:
        raise HTTPException(429, "Daily AI request budget exhausted.")
