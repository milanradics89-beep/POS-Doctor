# USEIT Architecture Status

## Canonical runtime path

The production path is currently:

`Expo UI → src/core/intelligence/apiClient.ts → POST /v1/analyze → backend/main.py → scene_quality → structured scene analysis → presentation`

The mobile client must not contain provider secrets. The FastAPI backend is the USEIT backend foundation.

## Phase status

- Phase 1: foundation and provider separation are implemented.
- Phase 2: consumer image-analysis flow is implemented, but the documented exit gate is not yet proven because CI/build checks and representative real-image endpoint exercises have not been recorded in the repository.
- Phase 3+: room redesign, shopping, product ranking, compatibility and visualization concepts have been prototyped in TypeScript, but they are **not part of the production request path yet**.

## Important architectural rule

There must be one authoritative runtime path. Do not introduce a second orchestration layer that duplicates `intelligencePipeline.ts`/`apiClient.ts` unless it is explicitly promoted to the canonical pipeline and wired end-to-end.

Product-search providers that require credentials belong server-side. A mobile-bundled provider must never receive a secret API key.

## Next implementation gate

Before adding more features:

1. Run and fix backend tests.
2. Add/verify frontend TypeScript build validation.
3. Exercise `/v1/analyze` with representative room, table, refrigerator/food and generic-object images.
4. Record the results and close Phase 2.
5. Then promote the Phase 3 room → design → shop → visualize flow into the backend behind typed contracts.
