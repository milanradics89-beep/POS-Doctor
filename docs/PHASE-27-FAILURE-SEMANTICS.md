# Phase 27 — Failure semantics and request correlation

## Goal

Make unexpected runtime failures operationally safe and diagnosable without leaking implementation details or losing request correlation.

## Changes

- The request-control boundary now converts unexpected downstream exceptions into a generic HTTP 500 response.
- The response preserves the sanitized `X-Request-ID` correlation identifier.
- Internal exception details remain server-side only through structured exception logging.
- Existing timeout handling remains a distinct 504 response.
- Timeout configuration remains defensively parsed and bounded to 1–300 seconds.

## Acceptance gate

- Backend compilation succeeds.
- Full backend pytest suite succeeds.
- Unexpected handler failures return HTTP 500 rather than leaking an exception or stack detail through the API boundary.
- A valid client request ID is preserved on the generic error response.
- The generic response contains no internal exception text, user payload, image URI, prompt or credential.
- Existing timeout, request-size, authentication, rate-limit and readiness behavior remains green.

## Operational contract

This phase does not introduce another intelligence path. It hardens the existing canonical runtime boundary and keeps failure responses deliberately minimal.
