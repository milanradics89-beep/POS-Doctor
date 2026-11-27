# Phase 27 — Runtime failure semantics

## Goal

Make failure behavior at the canonical USEIT consumer boundary explicit and regression-tested, so upstream vision failures, separate product-discovery failures, and readiness failures remain predictable and non-disclosive.

## Changes

- Vision-layer `HTTPException` failures remain HTTP failures rather than being converted into misleading successful responses.
- Product discovery runs through the separate `/v1/products/discover` endpoint. Provider failure produces a bounded empty product response while leaving the photo-analysis request and result untouched.
- Product-discovery requests contain generic search terms only; no image or second vision request is sent.
- Provider exception details are not returned to the client.
- Readiness failure remains a generic `503` response without dependency or secret-state disclosure.

## Acceptance gate

- Full backend test suite succeeds.
- Canonical `/v1/useit/analyze` preserves explicit upstream failure status.
- Product-discovery failure is isolated to `/v1/products/discover` and does not trigger another analysis request.
- Internal provider exception text is not exposed in the response.
- `/ready` failure remains generic and non-disclosive.

## Operational contract

Failure semantics are part of the public runtime boundary. Product discovery is a separate optional capability, not a consumer intent or a second intelligence path. The `useit_analyze_v1` photo-analysis contract remains stable.
