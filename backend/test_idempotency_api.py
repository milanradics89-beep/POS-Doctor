from __future__ import annotations

from unittest.mock import AsyncMock

import pytest
from fastapi import HTTPException
from starlette.requests import Request

from backend import main
from backend.idempotency_store import (
    IdempotencyClaim,
    IdempotencyClaimResult,
    IdempotencyDecision,
)


SCENE = {
    "sceneType": "objects",
    "summary": "A synthetic scene for idempotency API tests.",
    "items": [],
    "constraints": [],
    "opportunities": [],
    "safetyNotes": [],
}


class FakeIdempotencyStore:
    def __init__(self, decision: IdempotencyDecision = IdempotencyDecision.CLAIMED):
        self.decision = decision
        self.claim_calls = []
        self.completed = []
        self.outcome_unknown = []
        self.claim = IdempotencyClaim(document_id="a" * 64, lease_token="test-lease-token")

    async def claim(self, key: str, payload: bytes) -> IdempotencyClaimResult:
        self.claim_calls.append((key, payload))
        claim = self.claim if self.decision is IdempotencyDecision.CLAIMED else None
        return IdempotencyClaimResult(decision=self.decision, claim=claim)

    async def mark_completed(self, claim: IdempotencyClaim) -> bool:
        self.completed.append(claim)
        return True

    async def mark_outcome_unknown(self, claim: IdempotencyClaim) -> bool:
        self.outcome_unknown.append(claim)
        return True


def _http_request(key: str | None = "analysis-test-key-123456") -> Request:
    headers = []
    if key is not None:
        headers.append((b"idempotency-key", key.encode("ascii")))
    scope = {
        "type": "http",
        "asgi": {"version": "3.0", "spec_version": "2.3"},
        "http_version": "1.1",
        "method": "POST",
        "scheme": "http",
        "path": "/v1/useit/analyze",
        "raw_path": b"/v1/useit/analyze",
        "query_string": b"",
        "headers": headers,
        "client": ("127.0.0.1", 12345),
        "server": ("testserver", 80),
    }
    request = Request(scope)
    request._body = b'{"imageUri":"data:image/png;base64,dGVzdA==","userIntent":"improve"}'
    return request


def _analysis_request() -> main.UseItAnalyzeRequest:
    return main.UseItAnalyzeRequest(
        imageUri="data:image/png;base64,dGVzdA==",
        userIntent="improve",
        discoverProducts=False,
    )


def _configure_route(monkeypatch, store: FakeIdempotencyStore) -> AsyncMock:
    monkeypatch.setattr(main, "configured_idempotency_mode", lambda: "firestore")
    monkeypatch.setattr(main.app.state, "idempotency_store", store, raising=False)
    analyze = AsyncMock(return_value=dict(SCENE))
    monkeypatch.setattr(main, "_analyze", analyze)
    monkeypatch.setattr(main, "classify_intent", lambda *_: {"name": "improve", "confidence": 0.9})
    monkeypatch.setattr(main, "rank_opportunities", lambda *_args, **_kwargs: [])
    monkeypatch.setattr(main, "derive_scene_facts", lambda _scene: [])
    monkeypatch.setattr(main, "derive_scene_reasoning", lambda _scene: [])
    monkeypatch.setattr(main, "build_specialist_context", lambda _scene, _intent: {"name": "home_design"})
    return analyze


@pytest.mark.asyncio
async def test_unified_analysis_claims_and_completes_using_exact_request_body(monkeypatch):
    store = FakeIdempotencyStore()
    analyze = _configure_route(monkeypatch, store)
    http_request = _http_request()

    result = await main.useit_analyze(_analysis_request(), http_request)

    assert result["contractVersion"] == "useit_analyze_v1"
    assert store.claim_calls == [("analysis-test-key-123456", http_request._body)]
    assert store.completed == [store.claim]
    assert store.outcome_unknown == []
    analyze.assert_awaited_once()


@pytest.mark.asyncio
async def test_duplicate_idempotency_key_is_rejected_before_vision_provider_call(monkeypatch):
    store = FakeIdempotencyStore(IdempotencyDecision.DUPLICATE)
    analyze = _configure_route(monkeypatch, store)

    with pytest.raises(HTTPException) as exc:
        await main.useit_analyze(_analysis_request(), _http_request())

    assert exc.value.status_code == 409
    analyze.assert_not_awaited()
    assert store.completed == []


@pytest.mark.asyncio
async def test_same_key_with_different_payload_is_rejected_before_provider_call(monkeypatch):
    store = FakeIdempotencyStore(IdempotencyDecision.PAYLOAD_MISMATCH)
    analyze = _configure_route(monkeypatch, store)

    with pytest.raises(HTTPException) as exc:
        await main.useit_analyze(_analysis_request(), _http_request())

    assert exc.value.status_code == 409
    analyze.assert_not_awaited()


@pytest.mark.asyncio
async def test_missing_idempotency_key_is_rejected_when_firestore_mode_is_enabled(monkeypatch):
    store = FakeIdempotencyStore()
    analyze = _configure_route(monkeypatch, store)

    with pytest.raises(HTTPException) as exc:
        await main.useit_analyze(_analysis_request(), _http_request(None))

    assert exc.value.status_code == 400
    assert store.claim_calls == []
    analyze.assert_not_awaited()


@pytest.mark.asyncio
async def test_uncertain_provider_failure_retains_the_claim_until_expiry(monkeypatch):
    store = FakeIdempotencyStore()
    analyze = _configure_route(monkeypatch, store)
    analyze.side_effect = HTTPException(502, "Vision analysis failed.")

    with pytest.raises(HTTPException) as exc:
        await main.useit_analyze(_analysis_request(), _http_request())

    assert exc.value.status_code == 502
    assert store.outcome_unknown == [store.claim]
    assert store.completed == []


@pytest.mark.asyncio
async def test_firestore_claim_failure_fails_closed_without_calling_provider(monkeypatch):
    store = FakeIdempotencyStore()
    store.claim = AsyncMock(side_effect=TimeoutError("private storage detail"))
    analyze = _configure_route(monkeypatch, store)

    with pytest.raises(HTTPException) as exc:
        await main.useit_analyze(_analysis_request(), _http_request())

    assert exc.value.status_code == 503
    analyze.assert_not_awaited()


def test_production_configuration_requires_firestore_idempotency(monkeypatch):
    monkeypatch.setattr(main, "production_mode", lambda: True)
    monkeypatch.setenv("USEIT_IDEMPOTENCY_MODE", "disabled")

    with pytest.raises(RuntimeError, match="Production requires Firestore"):
        main.validate_idempotency_configuration()


def test_firestore_idempotency_configuration_rejects_missing_or_short_secret(monkeypatch):
    monkeypatch.setattr(main, "production_mode", lambda: False)
    monkeypatch.setenv("USEIT_IDEMPOTENCY_MODE", "firestore")
    monkeypatch.setenv("USEIT_FIRESTORE_PROJECT_ID", "fresh-weft-447913-u6")
    monkeypatch.setenv("USEIT_IDEMPOTENCY_SECRET", "short")

    with pytest.raises(RuntimeError, match="at least 32 UTF-8 bytes"):
        main.validate_idempotency_configuration()


def test_firestore_idempotency_configuration_accepts_secret_manager_injected_value(monkeypatch):
    monkeypatch.setattr(main, "production_mode", lambda: True)
    monkeypatch.setenv("USEIT_IDEMPOTENCY_MODE", "firestore")
    monkeypatch.setenv("USEIT_FIRESTORE_PROJECT_ID", "fresh-weft-447913-u6")
    monkeypatch.setenv("USEIT_IDEMPOTENCY_SECRET", "s" * 48)
    monkeypatch.setenv("USEIT_IDEMPOTENCY_TTL_SECONDS", "600")

    assert main.validate_idempotency_configuration() == "firestore"


def test_firestore_idempotency_configuration_rejects_out_of_range_ttl(monkeypatch):
    monkeypatch.setattr(main, "production_mode", lambda: False)
    monkeypatch.setenv("USEIT_IDEMPOTENCY_MODE", "firestore")
    monkeypatch.setenv("USEIT_FIRESTORE_PROJECT_ID", "fresh-weft-447913-u6")
    monkeypatch.setenv("USEIT_IDEMPOTENCY_SECRET", "s" * 48)
    monkeypatch.setenv("USEIT_IDEMPOTENCY_TTL_SECONDS", "30")

    with pytest.raises(RuntimeError, match="between 60 and 3600"):
        main.validate_idempotency_configuration()
