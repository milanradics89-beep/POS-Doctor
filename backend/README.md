# USEIT Intelligence Backend

Phase 2 foundation: a server-side multimodal vision boundary for USEIT.

The backend owns provider credentials and exposes a stable analysis contract to the mobile client. Provider-specific implementation is intentionally isolated so the app is not coupled to a single model vendor.

## Contract

`POST /v1/analyze` accepts an image and optional intent. It returns a structured scene analysis containing scene type, detected objects, context, opportunities, and cautions.

## Next

Wire the provider implementation to the production AI API, add schema validation, observability, rate limiting, and integration tests before enabling it in the mobile app.
