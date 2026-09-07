# USEIT Phase 2 Acceptance Criteria

## Scope
Phase 2 is complete only when the production foundation and core consumer UX are coherent, the two image input paths work, and the intelligence pipeline has one authoritative contract from image input through presentation.

## Acceptance checklist

- [x] Camera capture is supported.
- [x] Existing gallery photos are supported through the same analysis path.
- [x] Empty/missing image input is rejected before analysis.
- [x] Camera and gallery permission denial has a user-facing recovery message.
- [x] Vision requests use a versioned `scene_analysis_v1` contract.
- [x] Scene analysis has explicit scene-aware prompting.
- [x] Analysis is validated and normalized before consumer presentation.
- [x] Scene context is normalized for downstream decision layers.
- [x] Suggestions are ranked using scene type, intent, visible items, missing items, effort and visualizability.
- [x] Consumer presentation promotes one primary recommendation and limits alternatives.
- [x] Vision prompt policy is centralized and passed through the API pipeline.
- [x] API credentials remain server-side; the mobile client only uses the backend URL.

## Exit gate

Phase 2 is **not** considered complete until the repository's CI/build checks pass and the real `/v1/analyze` endpoint has been exercised against representative images from the target scenarios: room, cluttered table, refrigerator/food, and generic objects.

After the exit gate passes, Phase 3 starts with real multimodal evaluation and scene-understanding quality work. No superficial UI work should be used to mask a failing intelligence path.
