# Phase 21: Production Hardening

## Goal

Make the unified USEIT runtime resilient to partial dependency failure and production conditions without adding a second intelligence architecture.

## Scope

1. Make optional product discovery fail soft: a shopping dependency failure must not discard an otherwise valid scene, intent, specialist context, or suggestions.
2. Preserve the versioned `useit_analyze_v1` contract when discovery is unavailable by returning an empty candidate list plus a structured discovery error.
3. Add backend regression coverage for discovery HTTP failures and unexpected dependency exceptions.
4. Add unified endpoint integration coverage proving the core analysis still succeeds when shopping is degraded.
5. Keep `/v1/analyze` authoritative for raw vision and `/v1/useit/analyze` authoritative for consumer orchestration.
6. Do not move credentials into Expo and do not introduce a duplicate intelligence implementation.

## Acceptance gate

- Frontend typecheck passes.
- Frontend tests pass.
- Backend compile passes.
- Backend tests pass.
- A product-discovery failure does not turn a valid unified analysis into HTTP 5xx.
- The unified response remains contract-compatible and explicitly reports the degraded shopping state.
- Existing security, privacy, rate-limit, and request-control tests remain green.
- No new client-side credentialed provider path is introduced.
