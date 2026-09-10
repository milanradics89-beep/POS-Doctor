# Phase 19: Canonical Runtime Wiring

## Goal

Make the versioned `/v1/useit/analyze` boundary the preferred runtime path for the USEIT intelligence pipeline, while keeping legacy providers source-compatible during migration.

## Implemented

- Added an optional unified intelligence capability to `IntelligenceProvider`.
- `runUseitPipeline` now uses the unified boundary when available, avoiding the previous duplicate vision round-trip.
- Unified results are still validated at the scene boundary before application code consumes them.
- Legacy providers retain the existing two-call behavior until they expose `analyzeUseit`.
- Added regression tests for unified routing, legacy compatibility and fail-closed scene validation.

## Architectural rule

The unified endpoint is the orchestration boundary. `/v1/analyze` remains the authoritative vision implementation behind it. The mobile intelligence pipeline must not recreate a second vision/domain implementation.

## Acceptance gate

- TypeScript typecheck passes.
- Frontend tests pass.
- Backend compilation and tests pass.
- A provider exposing `analyzeUseit` performs one unified request instead of two vision requests.
- Invalid unified scene data is rejected before application consumption.
- Legacy providers remain source-compatible during migration.
