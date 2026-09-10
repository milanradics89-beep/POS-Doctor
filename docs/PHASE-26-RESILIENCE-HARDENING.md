# Phase 26 — Runtime resilience hardening

## Goal

Harden operational behavior around the canonical USEIT request path so malformed deployment configuration cannot crash the service or disable the readiness probe.

## Changes

- `USEIT_REQUEST_TIMEOUT_SECONDS` is parsed defensively at request time.
- Non-numeric, NaN and infinite timeout values fall back to the 45-second default.
- Timeout values are bounded to 1–300 seconds to prevent accidental zero/negative or unreasonably long request lifetimes.
- `GET /ready` is excluded from application rate limiting so an external orchestrator can continue probing service readiness even when application traffic is throttled.
- Regression tests cover invalid and out-of-range timeout configuration and readiness availability under rate limiting.

## Acceptance gate

- Backend compilation succeeds.
- Full backend test suite succeeds.
- Invalid timeout configuration does not prevent request handling.
- Timeout configuration is deterministically bounded.
- Readiness remains reachable independently of application rate limiting.
- No user payload, image URI, prompt or credential is introduced into resilience telemetry or error responses.

## Operational contract

The resilience layer is deliberately configuration-focused. It does not add another intelligence path and does not alter the canonical `POST /v1/useit/analyze` contract.
