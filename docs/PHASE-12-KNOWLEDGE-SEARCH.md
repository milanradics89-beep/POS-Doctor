# Phase 12: Knowledge & Search

## Goal
Give USEIT a bounded evidence-retrieval capability without turning search output into unverified facts.

## Acceptance criteria

- [x] Search is exposed behind the backend boundary; provider credentials never reach the mobile app.
- [x] Requests have bounded query length, locale and result count.
- [x] Only HTTP(S) results are accepted.
- [x] Duplicate URLs and fragment-only variants are removed.
- [x] Results retain title, canonical URL, source domain, snippet and rank.
- [x] Search-provider failures are mapped to explicit 502/504 errors.
- [x] Missing provider configuration is explicit and does not silently fabricate results.
- [x] The API response states that search results are evidence candidates, not verified facts.
- [x] Automated tests cover configuration failure, URL filtering/deduplication and timeout handling.

## Boundary

`POST /v1/knowledge/search` is the canonical knowledge-search boundary. Search results are evidence candidates. Any future answer-generation layer must preserve provenance and must not present snippets as independently verified facts.
