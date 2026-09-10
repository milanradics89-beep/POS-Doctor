# Phase 22: Bounded Request Execution

## Goal

Prevent a slow or stalled dependency from consuming an unbounded amount of server capacity while preserving the existing USEIT request and correlation controls.

## Scope

1. Add a configurable global request execution deadline via `USEIT_REQUEST_TIMEOUT_SECONDS`.
2. Default the deadline to 45 seconds, covering the complete FastAPI request lifecycle rather than only one provider call.
3. Return HTTP 504 on deadline expiry with the same `X-Request-ID` and a structured `requestId` field.
4. Preserve the existing request-size limits and safe request-ID validation.
5. Add regression coverage for timeout behavior and invalid request-ID replacement.
6. Keep the unified shopping fail-soft behavior from Phase 21. A dependency-specific degradation remains preferable to consuming the global request deadline.

## Operational contract

- The deadline is server-side and does not expose credentials or internal exception details.
- The timeout is configurable per deployment without changing application code.
- The request ID remains the correlation handle for client-visible timeout responses and server logs.
- Existing security, privacy, rate-limit, and contract validation behavior remains unchanged.

## Acceptance gate

- Frontend typecheck passes.
- Frontend tests pass.
- Backend compile passes.
- Backend tests pass.
- A request exceeding the configured deadline returns HTTP 504.
- The timeout response preserves the request correlation ID.
- Invalid client-supplied request IDs are replaced with safe generated IDs.
- No secret, image payload, or provider credential is included in the timeout response.
