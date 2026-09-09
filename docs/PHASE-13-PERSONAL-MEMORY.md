# Phase 13: Personal Memory

## Goal
Give USEIT a deliberately narrow, user-controlled memory layer for explicit preferences and facts, without silently turning observations into permanent personal data.

## Acceptance criteria

- [ ] Memory is backend-owned; no personal-memory database or secret is shipped to the mobile app.
- [ ] Memory writes require explicit user consent on each write request.
- [ ] Only bounded, structured memory entries are accepted; raw images and arbitrary JSON blobs are not stored.
- [ ] Memory identity is opaque and is not stored in plaintext; a server-side secret scopes the identity hash.
- [ ] Read, upsert and delete-all operations are available through one canonical API boundary.
- [ ] Per-user memory is bounded to a finite number of entries.
- [ ] Keys, values and categories have explicit size/shape limits.
- [ ] The API never invents memories and distinguishes explicit user memories from derived scene facts.
- [ ] Missing memory configuration fails closed with an explicit error.
- [ ] Automated tests cover consent, validation, persistence/upsert, isolation and deletion.

## Boundary

`POST /v1/memory/{memory_id}` is the canonical write/upsert boundary.
`GET /v1/memory/{memory_id}` reads the bounded memory set.
`DELETE /v1/memory/{memory_id}` deletes the complete memory set for that identity.

Phase 13 stores only explicit user-provided memory. Automatic extraction from conversations, images or behavior is intentionally deferred until the trust/privacy phase defines consent, provenance, retention and deletion guarantees.
