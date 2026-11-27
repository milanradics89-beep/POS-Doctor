# USEIT UX Contract

## Scope

This contract defines observable mobile UX behavior for the core photo-to-action journey. Business vision and product requirements remain in `docs/PRODUCT-VISION.md`; domain and security invariants remain in their authoritative backend/API contracts. This document must not redefine billing, privacy, retention, authorization, or AI-provider policy.

## Canonical journey

`Home → Capture / Gallery → Photo Preview → Intent Selection → Analysis → Result → Refine / New Photo`

The selected photo and current analysis context must be preserved when navigating backward or changing an intent where the product flow permits it. Starting a new photo explicitly starts a new context.

## Canonical UI owners

| Capability | Current owner(s) | Rule |
|---|---|---|
| Brand and visual tokens | `src/ui/theme.ts`, `src/ui/components.tsx` | Extend shared owners; no parallel token palettes |
| Home and capture entry | `app/index.tsx` | One dominant capture action; gallery is secondary |
| Locale catalog | `src/i18n/hu.ts` (`hu`, `HU_LOCALE`) | Draft PR #360 owns Hungarian static UI copy and exact `hu-HU` request locale; pending stack integration |
| Intent chooser labels and descriptions | `src/i18n/hu.ts` via `src/ui/resultModel.ts` (`modeCopy`) | One catalog owner for titles, descriptions, chips and result section labels; `app/index.tsx` consumes the facade |
| Result intent labels and mapping | `src/ui/resultModel.ts`, consumer intent domain | **Target after PR #355 integration:** exactly five canonical intents (CREATE, IMPROVE, FIX, COOK, SURPRISE). Current main still exposes legacy SHOP chooser/API support; it is transitional runtime behavior, not the accepted target |
| Result presentation | `src/ui/PhotoResult.tsx` (`PhotoResult`) | Owns result hierarchy and result-screen interaction copy |
| Original/concept comparison | `src/ui/PhotoResult.tsx` (`PhotoComparison`) | Owns comparison state and labels; delegates image rendering to shared `PhotoFrame` on the PR #360 stack |
| Selected-photo preview | `app/index.tsx` (`SelectedPhoto`) | Owns preview flow; delegates image rendering to shared `PhotoFrame` on the PR #360 stack |
| Shared photo frame | `src/ui/components.tsx` (`PhotoFrame`) | Single rendering owner for original and generated imagery; always uses `contain`, accessible image labels and no silent crop/stretch |
| Image preparation | `src/core/intelligence/imageNormalization.ts` | Normalize transport dimensions without silently changing the visible composition |
| Shared status and recovery | `src/ui/components.tsx` | Use shared `StatePanel` patterns; actionable recovery where possible |

At main HEAD `2c0230c`, `SelectedPhoto` and `PhotoComparison` are separate image-display owners. Draft PR #360 introduces a shared `PhotoFrame` in `src/ui/components.tsx` and migrates both consumers to it. This is the intended single image-rendering owner, but remains pending until the PR #360 stack is integrated and exact-head tests plus device-level fidelity checks pass. The component uses `contain`; neither consumer may silently crop or stretch the source image.

The target product contract after PR #355 integration is exactly five consumer intents (CREATE, IMPROVE, FIX, COOK, SURPRISE). This is **pending runtime integration**, not a claim about current main: at base HEAD `2c0230cd005aadbf9edbc6174f8f1638a0b0d38e`, `app/index.tsx` still exposes a legacy SHOP chooser entry and `src/core/intelligence/apiClient.ts` still includes `shop` in `ConsumerIntent`. Treat that SHOP path as transitional legacy behavior only; do not expand it or accept it as a sixth intent. The five-intent contract becomes current runtime behavior only after PR #355 is integrated with exact-head required checks and review. Product discovery is a separate optional result action, driven only by evidence-backed `shoppingNeed`, and must never become a sixth intent.

## Interaction contract

### Home
- Make the photo action immediately understandable and dominant.
- Gallery selection is an equally discoverable alternative but visually secondary.
- Explain in plain language that analysis starts only after the user initiates it.
- Before analysis, clearly disclose that the selected photo is sent through USEIT to OpenAI for processing. Before visual-concept generation or refinement, disclose that the original photo is sent again. The disclosure must be visible, localized and accurate to the current request path.
- For optional product discovery, explain that only photo-derived text search terms are sent to the product-search service; the photo is not resent.
- Keep the home screen focused; examples should demonstrate the breadth of USEIT without becoming a feature catalogue.

### Photo capture and preview
- Preserve the original image and show a stable preview before analysis.
- Provide explicit replace, cancel/back, and continue actions.
- Do not silently crop, stretch, or lower image fidelity.
- Permission denial and picker/camera failures must explain the next available action.
- Native camera and photo-library permission prompts must use Hungarian purpose strings. Request only permissions used by the feature; no microphone permission is needed for still-photo capture and selection.

### Intent selection
- **Target after PR #355 integration:** show exactly five canonical intents with distinct, localized descriptions: CREATE, IMPROVE, FIX, COOK and SURPRISE. Until that PR is integrated, the existing SHOP chooser/API path is legacy transitional behavior, not accepted product scope. Product discovery is a separate optional result action, not a chooser tile or consumer intent.
- Selection must have a visible state and accessible selected semantics.
- Do not conflate product discovery with the five canonical consumer intents.
- Intent changes must not accidentally create duplicate paid requests.

### Analysis
- Show the selected photo and communicate the real stage of work.
- Distinguish preparation, request submission, analysis, and completion only when those stages are known.
- Cancellation and retry must preserve the backend's idempotency and request-safety guarantees.
- A timeout or uncertain provider outcome must never be presented as a confirmed failure if the operation may have completed.

### Results
- Lead with the most useful image-grounded outcome for the selected intent.
- Keep facts, AI suggestions, generated concepts, and external product listings clearly distinguished.
- Reveal secondary details progressively; avoid a wall of unstructured text.
- Show the original photo alongside any generated concept when comparison is relevant.
- Provide clear actions for refinement, alternative exploration, opening a product, and starting over where supported.

### Refinement and navigation
- Preserve the existing result when the refinement editor is opened or cancelled.
- Clearly state when an action sends the photo and a new instruction for analysis.
- Prevent duplicate submissions and stale responses from replacing newer results.

## Shared states

Every asynchronous screen must have intentional loading, success, empty, error, offline, permission-denied, and cancellation behavior where applicable. Recovery actions must be specific and safe. No indefinite spinner, fake progress, silent failure, or destructive navigation without warning when user work would be lost.

## Accessibility and localization

- Target WCAG 2.2 AA principles where applicable to native mobile UI.
- Use semantic roles, accessible names/hints, visible state, and logical focus order.
- Support system reduced motion.
- Maintain readable type and contrast; never communicate state through color alone. Essential recovery, permission and primary-action text must be at least 12sp; touch targets must be at least 44 × 44 points and must remain usable with dynamic text.
- Hungarian (`hu-HU`) is the primary launch locale and a blocking launch gate. Main still contains English strings and sends `en-HU`. Draft PR #360 introduces the central catalog and `HU_LOCALE`, but it is stacked on PR #355 and remains unaccepted. User-facing strings, errors, AI-generated content, product states and accessibility labels must all be verified before launch; no mixed-language fallback is accepted.
- Respect safe areas, dynamic text where supported, and virtual keyboard behavior.

## Verification evidence

For every substantial UI change, attach or link:
- Changed screens and shared owners.
- iOS and Android build/test results where available.
- Screenshot evidence for Home, preview, intent, analysis, result, and relevant failure states.
- Narrow and large viewport/device checks.
- Accessibility and reduced-motion checks.
- Visual regression results when Percy or equivalent is available.
- Maestro end-to-end results for the changed journey when configured. If Maestro is unavailable or unconfigured, require a recorded manual walkthrough of every changed action and recovery path, including the exact device/build used and observed outcome.
- Representative photo-and-intent fixtures for each of the five canonical intents. For each fixture, record the visible evidence in the source photo, why the result is relevant to that evidence, and how the result differs from the other intents. Generic output that could be produced without the photo or selected intent fails acceptance. Verify product discovery separately with an evidence-backed shoppingNeed fixture: its POST receives only bounded search terms, never the image, image URI or prompt; it makes one attempt without retry or a second vision request, and a search failure preserves the completed photo analysis.

A green build alone is not UI acceptance. A screenshot alone is not interaction acceptance.
