# USEIT UX Contract

## Scope

This contract defines observable mobile UX behavior for the core photo-to-action journey. Business vision and product requirements remain in `docs/PRODUCT-VISION.md`; domain and security invariants remain in their authoritative backend/API contracts. This document must not redefine billing, privacy, retention, authorization, or AI-provider policy.

## Canonical journey

`Home → Capture / Gallery → Photo Preview → Intent Selection → Analysis → Result → Refine / New Photo`

The selected photo and current analysis context must be preserved when navigating backward or changing an intent where the product flow permits it. Starting a new photo explicitly starts a new context.

## Canonical UI owners

| Capability | Owner | Rule |
|---|---|---|
| Brand and visual tokens | `src/ui/theme.ts`, `src/ui/components.tsx` | Extend shared owners; no parallel token palettes |
| Home and capture entry | `app/index.tsx` | One dominant capture action; gallery is secondary |
| Intent copy and mapping | `src/ui/resultModel.ts` and consumer intent domain | Six intents remain distinct: CREATE, IMPROVE, FIX, COOK, SHOP, SURPRISE |
| Result presentation | `src/ui/PhotoResult.tsx` | Result layout follows selected intent; shared result primitives |
| Image normalization and display | `src/core/intelligence/imageNormalization.ts` and shared image UI | Preserve orientation/aspect ratio and visual metadata; never silently crop |
| Shared status and recovery | `src/ui/components.tsx` | Use shared StatePanel patterns; actionable recovery where possible |

If the current implementation conflicts with this map, inspect behavior and tests before moving ownership. Do not add an equivalent screen-local owner.

## Interaction contract

### Home
- Make the photo action immediately understandable and dominant.
- Gallery selection is an equally discoverable alternative but visually secondary.
- Explain in plain language that analysis starts only after the user initiates it.
- Keep the home screen focused; examples should demonstrate the breadth of USEIT without becoming a feature catalogue.

### Photo capture and preview
- Preserve the original image and show a stable preview before analysis.
- Provide explicit replace, cancel/back, and continue actions.
- Do not silently crop, stretch, or lower image fidelity.
- Permission denial and picker/camera failures must explain the next available action.

### Intent selection
- Show the six canonical intents with distinct, localized descriptions.
- Selection must have a visible state and accessible selected semantics.
- Do not conflate product discovery with the five other consumer intents.
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
- Maintain readable type and contrast; never communicate state through color alone.
- Hungarian is the primary launch locale. User-facing strings, error copy, and accessibility labels must be localized consistently. No accidental English copy in a Hungarian flow.
- Respect safe areas, dynamic text where supported, and virtual keyboard behavior.

## Verification evidence

For every substantial UI change, attach or link:
- Changed screens and shared owners.
- iOS and Android build/test results where available.
- Screenshot evidence for Home, preview, intent, analysis, result, and relevant failure states.
- Narrow and large viewport/device checks.
- Accessibility and reduced-motion checks.
- Visual regression results when Percy or equivalent is available.
- Maestro end-to-end results for the changed journey when configured.

A green build alone is not UI acceptance. A screenshot alone is not interaction acceptance.
