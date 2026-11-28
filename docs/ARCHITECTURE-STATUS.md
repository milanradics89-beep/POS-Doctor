# USEIT Architecture Status

## Repository decision

<!-- coderabbit-ai-generated:v1 -->

<!-- coderabbit-ai-generated-section:v1:00f312fc3b4091783513d185d90796856b40c16513610ea999df3973f3c55599 -->

The repository and current application are named USEIT. The original POS Doctor conversion is historical; the live entry points and release evidence are listed in the [release register](RELEASE-REGISTER.md).

<!-- /coderabbit-ai-generated:v1 -->

## Canonical runtime paths today

Photo analysis:

`Expo UI → src/core/intelligence/apiClient.ts → POST /v1/useit/analyze → backend/main.py → Vision + scene understanding + five-mode intent + specialist + suggestions + optional shoppingNeed → validated unified response → presentation`

Optional product discovery:

`Result UI → POST /v1/products/discover → backend product-search boundary → validated retailer candidates → presentation`

The product-discovery request contains generic search terms only. It never sends the photo again or starts a second OpenAI vision analysis.

`/v1/analyze` remains the authoritative low-level vision endpoint. The consumer runtime now prefers the versioned `/v1/useit/analyze` boundary, so the mobile client does not perform a second vision request or duplicate product discovery when the provider supports the unified capability.

The FastAPI service is the USEIT vision/intelligence backend. It is not a preserved POS Doctor backend.

## Canonical intelligence core

The existing `src/core/intelligence` TypeScript implementation remains the canonical client-side intelligence type/adapter layer. Backend orchestration owns the credentialed runtime calls and returns the versioned unified contract. The richer TypeScript orchestration remains available for legacy provider compatibility and focused domain tests, but it is not a second production request path on the unified runtime.

The unified backend flow is:

`scene → scene facts/reasoning → intent → opportunity ranking → specialist context → suggestions → optional product discovery`

The TypeScript core retains the deeper planning modules for migration/compatibility:

`scene → domain needs → task → clarification → shopping decision → product candidates → ranking → solution optimization → visual compatibility → redesign plan`.

## Security boundary

Product discovery is invoked separately through the backend `/v1/products/discover` endpoint after an explicit user action. The Expo client sends only generic search terms derived from the photo-grounded `shoppingNeed`; it never forwards the image to a retailer provider. Third-party product-provider credentials must never be shipped to Expo.

## Operational boundary

`/health` is informational. `GET /ready` is the deployment readiness gate. Readiness returns only a generic ready status and never discloses secret state. In production it requires the vision and application authentication configuration to be present before traffic should be accepted.

The runtime also emits safe structured request-completion telemetry containing only request ID, method, path, status code and elapsed duration. Request bodies, image URIs, prompts, credentials and response bodies are outside the telemetry boundary.

The resilience layer defensively parses the request timeout configuration, bounds it to 1–300 seconds, and keeps `/ready` outside application rate limiting so deployment infrastructure can continue probing readiness during traffic throttling.

Canonical failure semantics are explicit: vision-layer HTTP failures remain non-success responses, optional product discovery degrades to structured empty shopping results, internal provider exception text is not exposed, readiness failures remain generic `503` responses, and unexpected request failures return a generic `500` with the safe request correlation ID.

Production configuration is fail-closed: production requires vision and application authentication secrets, non-wildcard CORS origins, and disabled interactive API documentation. Runtime enforcement returns only a generic `503` when this configuration is incomplete.

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
- Phase 25: end-to-end acceptance covers the canonical `/v1/useit/analyze` photo-analysis boundary and keeps optional product discovery on the separate, user-initiated `/v1/products/discover` endpoint.
- Phase 26: runtime resilience hardening is implemented for malformed timeout configuration and readiness availability during rate limiting.
- Phase 27: canonical runtime failure semantics are regression-tested for vision failures, optional shopping degradation, provider-error redaction, readiness failure disclosure, and unexpected request failures with safe correlation IDs.
- Phase 28: production security configuration is regression-tested for fail-closed secrets, CORS, documentation exposure, valid configuration, and generic runtime enforcement.
- Phase 29: production hardening is implemented and CI-validated, including outbound URL/SSRF controls, bounded product-page streaming, safe client authentication boundaries, no POST inference retries, runtime/test dependency separation, production dependency audits, Dependabot coverage, Redis-backed distributed rate limiting, and Expo SDK 57 dependency alignment.
- Phase 30: mobile release validation is promoted into CI with Expo project-health diagnostics and an Android bundle export gate, so JavaScript/backend green status can no longer masquerade as complete mobile validation.

## Current implementation gate

1. Keep `/v1/analyze` authoritative for raw multimodal scene analysis.
2. Keep `/v1/useit/analyze` as the canonical consumer intelligence boundary.
3. Keep the TypeScript unified contract fail-closed and versioned.
4. Keep credentialed product discovery behind FastAPI.
5. Preserve legacy provider compatibility without allowing it to become the production consumer path.
6. Use `/ready` as the deployment readiness gate and keep it free of sensitive configuration disclosure.
7. Keep runtime telemetry limited to safe operational metadata and never log user content or credentials.
8. Keep production configuration fail-closed and regression-tested.
9. Maintain end-to-end acceptance evidence around the canonical runtime, including explicit failure semantics and resilience behavior, before adding further intelligence layers.
10. Keep frontend and backend production dependency audits green; upgrade Expo SDKs as a coherent dependency set rather than merging isolated major-version Dependabot bumps.
11. Treat `expo-doctor` and Android export validation as mandatory CI gates before considering a frontend change release-ready.
