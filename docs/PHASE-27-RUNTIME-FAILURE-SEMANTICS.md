# Phase 27 — Runtime failure semantics

## Goal

Make failure behavior at the canonical USEIT consumer boundary explicit and regression-tested, so upstream vision failures, optional shopping failures, and readiness failures remain predictable and non-disclosive.

## Changes

- Vision-layer `HTTPException` failures remain HTTP failures rather than being converted into misleading successful responses.
- Product discovery remains an optional degradation path: provider failure produces structured empty shopping results while the core analysis response remains successful.
- Provider exception details are not returned to the client.
- Readiness failure remains a generic `503` response without dependency or secret-state disclosure.

## Acceptance gate

- Full backend test suite succeeds.
- Canonical `/v1/useit/analyze` preserves explicit upstream failure status.
- Optional product discovery failure does not fail the core analysis response.
- Internal provider exception text is not exposed in the response.
- `/ready` failure remains generic and non-disclosive.

## Operational contract

Failure semantics are part of the public runtime boundary. This phase does not add another intelligence path and does not change the `useit_analyze_v1` response contract for successful requests.
