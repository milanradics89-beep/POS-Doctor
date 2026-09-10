# Phase 20: Consumer Runtime Wiring

## Goal

Move the consumer-facing analysis flow onto the versioned unified intelligence boundary so the mobile app does not perform a second vision request or duplicate credentialed product discovery.

## Implemented

- `analyzeForConsumer` prefers `IntelligenceProvider.analyzeUseit` when available.
- The unified response is runtime-validated and mapped into the existing consumer presentation model.
- Unified shopping candidates are exposed to the consumer UI model without a second client-side product search.
- Legacy providers remain supported as a migration fallback.
- Regression coverage proves the unified consumer path performs one API request.

## Acceptance gate

- TypeScript typecheck passes.
- Frontend tests pass.
- Backend compilation and tests pass.
- Unified-capable providers use `/v1/useit/analyze` from the consumer runtime.
- No client-side product-provider network call is made on the unified path.
- Legacy providers remain compatible.
