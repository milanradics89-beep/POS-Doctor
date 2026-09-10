# Phase 28 — Production security configuration gate

## Goal

Turn the production security assumptions into an explicit, regression-tested configuration gate so deployment cannot accidentally run with missing credentials, wildcard CORS, or interactive API documentation enabled.

## Configuration contract

Production requires:

- `OPENAI_API_KEY`
- `USEIT_API_KEY`
- a non-empty, non-wildcard `USEIT_CORS_ORIGINS`
- `USEIT_ALLOW_DOCS` disabled

Development and test environments retain their existing flexibility.

## Runtime behavior

Startup validation fails closed for invalid production configuration. The runtime enforcement helper converts configuration failures into a generic `503` without exposing secret values or detailed dependency state.

## Acceptance evidence

Regression coverage verifies development behavior, missing production secrets, wildcard CORS rejection, interactive documentation rejection, valid production configuration, and generic runtime enforcement.

## Boundary

Phase 28 hardens deployment configuration only. It does not add an intelligence path, alter the `useit_analyze_v1` contract, or reintroduce historical POS Doctor runtime behavior.
