# USEIT Architecture Status

## Repository decision

The repository is intentionally still named `POS-Doctor`, but the application has been repurposed as USEIT. The historical POS Doctor product is not a separate runtime in this repository. The original conversion is recorded in commit `3b039d4442128d3c7d4aebfbd96e36f222e18ef7` (`Replace POS-Doctor with USEIT foundation`).

## Canonical runtime path today

`Expo UI → src/core/intelligence/apiClient.ts → POST /v1/useit/analyze → backend/main.py → Vision + scene understanding + intent + specialist + suggestions + optional shopping → validated unified response → presentation`

`/v1/analyze` remains the authoritative low-level vision endpoint. The consumer runtime now prefers the versioned `/v1/useit/analyze` boundary, so the mobile client does not perform a second vision request or duplicate product discovery when the provider supports the unified capability.

The FastAPI service is the USEIT vision/intelligence backend. It is not a preserved POS Doctor backend.

## Canonical intelligence core

The existing `src/core/intelligence` TypeScript implementation remains the canonical client-side intelligence type/adapter layer. Backend orchestration owns the credentialed runtime calls and returns the versioned unified contract. The richer TypeScript orchestration remains available for legacy provider compatibility and focused domain tests, but it is not a second production request path on the unified runtime.

The unified backend flow is:

`scene → scene facts/reasoning → intent → opportunity ranking → specialist context → suggestions → optional product discovery`

The TypeScript core retains the deeper planning modules for migration/compatibility:

`scene → domain needs → task → clarification → shopping decision → product candidates → ranking → solution optimization → visual compatibility → redesign plan`.

## Security boundary

Product discovery is invoked by the backend unified endpoint. The Expo-side product provider is retained only for legacy-provider compatibility and is not used on the unified consumer path. Product-provider credentials must never be shipped to Expo.

## Operational boundary

`/health` is informational. `GET /ready` is the deployment readiness gate. Readiness returns only a generic ready status and never discloses secret state. In production it requires the vision and application authentication configuration to be present before traffic should be accepted.

The runtime also emits safe structured request-completion telemetry containing only request ID, method, path, status code and elapsed duration. Request bodies, image URIs, prompts, credentials and response bodies are outside the telemetry boundary.

The resilience layer defensively parses the request timeout configuration, bounds it to 1–300 seconds, and keeps `/ready` outside application rate limiting so deployment infrastructure can continue probing readiness during traffic throttling.

Canonical failure semantics are explicit: vision-layer HTTP failures remain non-success responses, optional product discovery degrades to structured empty shopping results, internal provider exception text is not exposed, and readiness failures remain generic `503` responses.

## Phase status

- Phase 1: USEIT foundation and basic architecture are established.
- Phase 2: real image input → FastAPI multimodal vision → validated scene analysis → presentation is implemented.
- Phase 3: intent/suggestion intelligence, scene understanding, specialist context, shopping discovery, ranking and visual generation foundations are implemented.
- Phase 4–11: knowledge/search, personal memory, action layer, trust/privacy/security and production hardening capabilities have been implemented incrementally and hardened through automated validation.
- Phase 17: unified intelligence boundary is implemented and runtime validated.
- Phase 18: versioned fail-closed intelligence contract is implemented with regression coverage.
- Phase 19: canonical unified runtime wiring is implemented; unified-capable providers use one `/v1/useit/analyze` request and validate the complete response.
- Phase 20: consumer runtime wiring is implemented; the actual mobile consumer flow now consumes the unified response and does not invoke client-side product discovery on that path.
- Phase 21: product-discovery degradation and per-candidate failure isolation are hardened.
- Phase 22: bounded request deadlines and timeout behavior are hardened.
- Phase 23: operational readiness probing is implemented with safe production gating.
- Phase 24: safe request observability is implemented, with structured completion telemetry and regression coverage that excludes request payloads.
- Phase 25: end-to-end acceptance coverage is implemented for the canonical `/v1/useit/analyze` consumer boundary, including single-pass vision orchestration and conditional shopping execution.
- Phase 26: runtime resilience hardening is implemented for malformed timeout configuration and readiness availability during rate limiting.
- Phase 27: canonical runtime failure semantics are regression-tested for vision failures, optional shopping degradation, provider-error redaction, and readiness failure disclosure.

## Current implementation gate

1. Keep `/v1/analyze` authoritative for raw multimodal scene analysis.
2. Keep `/v1/useit/analyze` as the canonical consumer intelligence boundary.
3. Keep the TypeScript unified contract fail-closed and versioned.
4. Keep credentialed product discovery behind FastAPI.
5. Preserve legacy provider compatibility without allowing it to become the production consumer path.
6. Use `/ready` as the deployment readiness gate and keep it free of sensitive configuration disclosure.
7. Keep runtime telemetry limited to safe operational metadata and never log user content or credentials.
8. Maintain end-to-end acceptance evidence around the canonical runtime, including explicit failure semantics and resilience behavior, before adding further intelligence layers.
