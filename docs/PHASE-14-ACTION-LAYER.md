# Phase 14: Action Layer

## Goal
Turn USEIT's recommendations into a single, deterministic and safe action boundary. The action layer may plan and execute only explicitly allowlisted actions; it must never interpret arbitrary model output as an executable command.

## Acceptance criteria

- [ ] One canonical backend action boundary exists for planning and execution.
- [ ] Action types are an explicit allowlist with typed payloads; arbitrary commands, URLs and tool names are rejected.
- [ ] Action plans are deterministic for the same request and include a stable plan identifier.
- [ ] Irreversible or external actions require explicit confirmation at execution time.
- [ ] Every execution requires a caller-supplied idempotency key and repeated execution does not duplicate the action.
- [ ] Execution is adapter-based; unconfigured external side effects fail closed rather than pretending success.
- [ ] The action result exposes a stable lifecycle state and does not leak adapter internals.
- [ ] Candidate IDs and contextual metadata are bounded and validated.
- [ ] Automated tests cover allowlisting, deterministic planning, confirmation, idempotency and fail-closed execution.

## Boundary

`POST /v1/actions/plan` creates a deterministic action plan.
`POST /v1/actions/{plan_id}/execute` executes an existing plan with an explicit idempotency key and confirmation when required.

The action layer is deliberately narrower than the model. Models can suggest; only this boundary decides what is executable. External integrations are added as explicit adapters later, after the trust/privacy/security phase establishes their permission and audit guarantees.
