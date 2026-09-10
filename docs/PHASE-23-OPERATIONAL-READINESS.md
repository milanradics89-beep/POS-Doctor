# Phase 23: Operational Readiness

## Goal

Add a deployment-safe readiness signal without exposing secret state or replacing the existing health endpoint.

## Implemented

- Added `GET /ready` as a public readiness probe.
- Readiness requires the vision service configuration to be present.
- In production, readiness additionally requires the application API key configuration.
- Unready state returns HTTP `503` with a generic message.
- Ready state returns only `{ "status": "ready" }`.
- `/ready` is explicitly exempted from API-key middleware so load balancers and orchestrators can probe it.
- Regression tests cover development-unready, development-ready, production-unready and production-ready states.

## Boundary

`/health` remains an informational endpoint. `/ready` is the operational gate used to decide whether the service should receive traffic.

No secret value, secret name, model credential, or configuration detail is included in the readiness response.

## Acceptance gate

1. Backend compiles.
2. Backend test suite passes.
3. `/ready` returns 503 when required runtime configuration is absent.
4. `/ready` returns 200 with only a safe readiness status when configuration is complete.
5. Production readiness requires both vision and application authentication configuration.
