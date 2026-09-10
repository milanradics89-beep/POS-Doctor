# Phase 29 - Production Hardening Gate

## Scope

Phase 29 closes the highest-priority production risks identified by the full repository audit.

### 1. Outbound URL security
- Product URLs are limited to HTTP(S), standard ports, and publicly routable addresses.
- Every redirect is revalidated.
- The established network peer is verified after connection establishment to reduce DNS-rebinding risk.

### 2. Product response resource limits
- Product pages are streamed instead of buffered without a bound.
- The maximum product-page body is 2,000,000 bytes.
- Declared and actual response size are both enforced.
- Redirect chains remain bounded.

### 3. Client authentication boundary
- `UseitApiProvider` supports an explicit API-key injection point.
- The client never contains a hard-coded credential.
- Production mobile deployments must use a trusted backend/BFF or another secure credential-delivery mechanism. A server API key must not be embedded into a distributable mobile binary.
- Intelligence POSTs do not automatically retry, preventing accidental duplicate inference/cost from transient 5xx responses.

### 4. Dependency security
- Runtime Python dependencies are separated from test-only dependencies.
- CI runs `npm audit --omit=dev --audit-level=high` for production JavaScript dependencies.
- CI runs `pip-audit` against `backend/requirements.txt`, excluding test-only packages from the production dependency gate.
- Dependabot tracks npm, Python and GitHub Actions dependencies weekly.

### 5. Production acceptance
- Production configuration is fail-closed for required secrets, CORS and documentation exposure.
- Redis-backed rate limiting is available for multi-instance deployments.
- Production environment examples explicitly document the distributed rate-limit configuration.

### 6. Distributed rate limiting
- `USEIT_RATE_LIMIT_MODE=memory` is suitable for a single process.
- `USEIT_RATE_LIMIT_MODE=redis` uses atomic Redis counters and is intended for multiple replicas.
- Redis unavailability fails closed with HTTP 503 rather than silently disabling rate limiting.

## Acceptance criteria

- Full frontend typecheck and tests are green.
- Full backend test suite is green.
- Dependency audit jobs are green.
- No product resolver path can bypass URL validation through redirects.
- Product response memory use is bounded.
- No production deployment embeds `USEIT_API_KEY` into the mobile client.
- Multi-instance production uses Redis-backed rate limiting.
