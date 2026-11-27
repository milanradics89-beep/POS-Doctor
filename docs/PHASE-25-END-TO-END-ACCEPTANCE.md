# Phase 25: End-to-End Acceptance

## Goal

Prove that the canonical USEIT photo-analysis boundary works as one coherent runtime flow without requiring a live vision provider in CI, while keeping product discovery separate from the five consumer intentions.

## Acceptance paths

Photo analysis:

`HTTP request → /v1/useit/analyze → vision boundary → five-mode intent classification → specialist selection → suggestions + optional shoppingNeed → unified response`

Optional product discovery:

`explicit user action → POST /v1/products/discover → bounded search and product resolution → validated retailer candidates`

Product discovery is not an intent and is not part of the photo-analysis request. It receives generic search terms only; it must not receive the image, image URI, prompt, or a second OpenAI vision request.

## Required behavior

1. The consumer intent is one of CREATE, IMPROVE, FIX, COOK or SURPRISE.
2. The image is analyzed exactly once for a user-selected intent.
3. The unified analysis may return an evidence-backed `shoppingNeed`, but does not automatically invoke product search.
4. Product discovery starts only after an explicit user action and uses `shoppingNeed.searchTerms` only.
5. The product-discovery request is single-attempt and does not resend the image or invoke OpenAI vision.
6. Product candidates are validated for safe HTTP(S) URLs, bounded metadata and non-invented currency/price presentation.
7. Product-search failure does not invalidate the completed photo analysis.
8. The request ID remains available on the HTTP response.

## CI gate

The phase is accepted when backend compilation and the complete backend pytest suite pass, including `test_phase25_end_to_end.py` and product-discovery boundary tests.

No live API credentials or external product-search calls are required for this acceptance gate. CI does not prove physical-device, production, business-accuracy or pilot acceptance.
