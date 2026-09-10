# Phase 18: Versioned Intelligence Contract

## Goal

Turn the Phase 17 unified analysis boundary into a versioned, fail-closed runtime contract that can evolve without silently breaking the mobile client.

## Implemented

- Added the `useit_analyze_v1` contract version to `/v1/useit/analyze`.
- Added runtime validation for intent confidence, suggestion scores/ranks and durations.
- Added typed validation for resolved shopping candidates and discovery errors.
- Exported the unified contract from the canonical `src/core/intelligence` entry point.
- Added regression coverage for version mismatches, invalid confidence and malformed product candidates.

## Compatibility rule

A mobile client must reject an unknown contract version rather than guessing the response shape. Backward-compatible changes require a new optional field; breaking changes require a new contract version.

## Architectural rule

`/v1/analyze` remains the authoritative vision endpoint. `/v1/useit/analyze` is the typed orchestration boundary. Product-provider credentials and network access remain server-side.

## Acceptance gate

- TypeScript typecheck passes.
- Frontend tests pass.
- Backend compilation and tests pass.
- The client rejects unknown contract versions.
- Shopping candidates are validated before application code consumes them.
