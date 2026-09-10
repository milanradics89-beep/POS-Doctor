# Phase 17: Unified Intelligence Boundary

## Goal

Make the existing `/v1/useit/analyze` orchestration consumable through one typed, runtime-validated mobile boundary while preserving `/v1/analyze` as the authoritative vision endpoint.

## Implemented

- Added a runtime validator for the complete unified analysis response.
- Reuse the canonical `scene_analysis_v1` validation for the scene portion.
- Validate intent, specialist context, suggestions, shopping state and pipeline stages at the client boundary.
- Added `UseitApiProvider.analyzeUseit()` so the mobile client can consume the backend orchestration without trusting an untyped JSON cast.
- Added regression tests for valid responses, invalid scenes, malformed suggestions and absent shopping results.

## Architectural rule

The unified endpoint is an orchestration boundary, not a second vision implementation. Product-provider credentials remain behind the backend, and the existing TypeScript intelligence modules remain reusable domain components.

## Acceptance gate

- TypeScript typecheck passes.
- Frontend tests pass.
- Backend validation remains green.
- Invalid unified responses fail closed at the client boundary.
