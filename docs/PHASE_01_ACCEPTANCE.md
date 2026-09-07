# Phase 01 — Intelligence Core

## Acceptance criteria
- [x] Intelligence types are isolated from UI code.
- [x] Provider interface is isolated from provider implementation.
- [x] A development mock provider exists for deterministic UI development.
- [x] The mobile app can depend on the intelligence layer without knowing the provider.
- [x] No API secrets are stored in the mobile client.
- [x] Legacy POS-Doctor web/backend/mobile code is removed from the active USEIT tree.

## Architecture
UI → Intelligence service → Provider adapter → server-side multimodal AI

The provider adapter is deliberately replaceable so the production model can be changed without rewriting the product layer.
