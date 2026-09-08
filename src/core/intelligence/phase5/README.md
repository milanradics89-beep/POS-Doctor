# USEIT Phase 5: Action Execution Layer

Phase 5 is the **DO** layer of USEIT. It consumes the already-established Phase 1–4 intelligence output and turns an approved `Action` into an explicit, testable execution request.

## Scope

1. Action dispatch boundary
2. Explicit confirmation enforcement for actions that require it
3. Deterministic handler lookup
4. Structured success / failure results
5. No direct coupling to UI, retailer APIs, or external side effects

## Architecture

```text
Phase 1–4 intelligence
        |
        v
     Action
        |
        v
  ActionDispatcher
        |
   +----+----+
   |         |
 handler A  handler B ...
        |
        v
 ExecutionResult
```

## Explicit non-goals

- Do not modify Phase 1–4 intelligence.
- Do not execute retailer purchases or payments.
- Do not invent external integrations.
- Do not bypass confirmation requirements.
- Do not move ranking, candidate selection, or need detection into Phase 5.

## First acceptance criteria

- An action without a registered handler fails deterministically.
- A confirmation-required action cannot execute without explicit confirmation.
- A registered action with confirmation succeeds when confirmed.
- Handler errors are converted to structured failures.
- Existing Phase 1–4 modules remain untouched.
