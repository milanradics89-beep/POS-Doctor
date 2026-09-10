# Phase 25: End-to-End Acceptance

## Goal

Prove that the canonical USEIT consumer endpoint works as one coherent runtime boundary without requiring a live vision provider in CI.

## Acceptance path

`HTTP request → /v1/useit/analyze → vision boundary → intent classification → specialist selection → suggestions → optional product discovery → unified response`

The acceptance tests replace only the external vision and product-discovery calls with deterministic async test doubles. The HTTP boundary, request validation, orchestration, intent routing, specialist routing, response assembly, request ID propagation and shopping decision remain real.

## Required behavior

1. A shopping request produces the versioned `useit_analyze_v1` response.
2. The request is analyzed exactly once.
3. Shopping discovery is invoked only when the classified intent is `shop` and discovery is enabled.
4. The selected specialist is consistent with the scene and intent.
5. Product candidates returned by the discovery boundary are preserved in the unified response.
6. The final pipeline records `shop` when shopping was executed and `plan` otherwise.
7. The request ID remains available on the HTTP response.
8. A non-shopping request must not invoke product discovery even when discovery is enabled.

## CI gate

The phase is accepted when backend compilation and the complete backend pytest suite pass, including `test_phase25_end_to_end.py`.

No live API credentials or external product-search calls are required for this acceptance gate.
