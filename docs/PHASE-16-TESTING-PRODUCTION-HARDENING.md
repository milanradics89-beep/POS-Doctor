# Phase 16: Testing and Production Hardening

## Goal

Turn the accumulated security and runtime boundaries into a repeatable production-readiness gate without adding superficial product features.

## Acceptance criteria

- CI runs backend unit and integration tests on every relevant change.
- Security-critical tests are explicitly discoverable and fail the build on regression.
- Startup configuration validation is exercised in CI for production mode.
- HTTP boundary tests cover authentication, request-size limits, request IDs, CORS, and safe error behavior.
- Privacy tests prove secrets and image payloads are absent from logs.
- The production readiness suite has a deterministic local command and documented environment requirements.
- No phase is marked complete solely from helper-level tests when the behavior is expected at the runtime boundary.

## Priority

P0: establish the production-readiness test gate and eliminate gaps between isolated helpers and the running application.
