# Phase 24: Observable Runtime

## Goal

Make production behavior measurable without introducing telemetry that can expose user content, images, prompts, credentials, or response bodies.

## Runtime behavior

The backend now emits one structured `request_completed` event for each request that reaches the observability middleware.

Recorded fields:

- request ID
- HTTP method
- URL path
- response status code
- elapsed duration in milliseconds

The request ID is inherited from the bounded request-control layer, so a timeout and its surrounding request telemetry can be correlated without logging request content.

## Privacy boundary

The observability layer does not log request bodies, query parameters, image URIs, prompts, API keys, response bodies, or model output. Structured logging continues through the existing redaction boundary.

## Acceptance gate

- observability middleware is installed on the FastAPI runtime
- successful requests produce a completion event with request ID, path, status and duration
- request payload secrets are absent from telemetry
- existing request-size, timeout, security-header, authentication and rate-limit controls remain in the runtime chain
- backend tests cover the new behavior

This phase intentionally adds operational evidence rather than another intelligence layer. The next hardening work should validate the canonical `/v1/useit/analyze` path end-to-end under controlled dependencies.
