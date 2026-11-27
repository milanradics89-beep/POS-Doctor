# Phase 21: Production Hardening

## Goal

Keep photo analysis and optional product discovery as separate, bounded backend capabilities. A product-search outage must not trigger another vision request or invalidate a completed photo analysis.

## Scope

1. Keep `/v1/useit/analyze` authoritative for the single photo-analysis request and its versioned `useit_analyze_v1` response.
2. Keep product search behind the separate `POST /v1/products/discover` backend boundary.
3. Send only generic, photo-grounded search terms to product discovery; never forward the image, image URI or vision prompt.
4. Return bounded product-search errors without exposing provider exception text, credentials or query parameters.
5. Preserve safe product URL, currency, price and candidate validation.
6. Keep credentials out of Expo and do not introduce a second AI/multimodal provider.

## Acceptance gate

- Frontend typecheck and tests pass.
- Backend compile and tests pass.
- Product-search HTTP failures and unexpected exceptions return a bounded degraded product response.
- A product-search failure does not trigger a second vision analysis or alter the already completed photo-analysis result.
- Existing security, privacy, rate-limit and request-control tests remain green.
