# USEIT Architecture Status

## Repository decision

The repository is intentionally still named `POS-Doctor`, but the application has been repurposed as USEIT. The historical POS Doctor product is not a separate runtime in this repository. The original conversion is recorded in commit `3b039d4442128d3c7d4aebfbd96e36f222e18ef7` (`Replace POS-Doctor with USEIT foundation`).

## Canonical runtime path today

`Expo UI → src/core/intelligence/apiClient.ts → POST /v1/analyze → backend/main.py → Vision + scene_quality → validated scene analysis → presentation`

The current mobile flow uses `UseitApiProvider` and calls `/v1/analyze`. fileciteturn256file0L2-L2

The FastAPI service is the USEIT vision backend. It is not a preserved POS Doctor backend.

## Canonical intelligence core

The existing `src/core/intelligence` TypeScript implementation is the canonical USEIT domain/intelligence core. It already contains the cross-domain pipeline for intent, need inference, candidate search, ranking and action generation. `intelligencePipeline.ts` is the simpler tested pipeline; `intelligenceOrchestrator.ts` is the richer room-shopping/redesign orchestration. These are prototypes/core modules and are not both independent production request paths.

The richer orchestration already covers:

`scene → domain needs → task → clarification → shopping decision → product candidates → ranking → solution optimization → visual compatibility → redesign plan`.

That flow exists in `intelligenceOrchestrator.ts`. fileciteturn249file0L2-L2

The simpler `intelligencePipeline.ts` remains because it has focused cross-domain tests and provides the stable core contract for intent → need → candidates → ranking → action. fileciteturn248file0L2-L2

## Removed duplicate work

Do not recreate a second Python domain/strategy layer under `backend/useit`. Any such layer duplicates the TypeScript intelligence core and creates competing sources of truth. The temporary duplicate `backend/useit` files were removed during the architecture cleanup.

Do not put product-provider credentials in Expo. Product-provider integrations requiring secrets belong behind the backend boundary.

## Phase status

- Phase 1: USEIT foundation and basic architecture are established.
- Phase 2: real image input → FastAPI vision → validated scene analysis → presentation is implemented. Automated tests exist, but a real-device/real-image acceptance run still needs to be recorded before calling the phase closed.
- Phase 3: domain intelligence, shopping, ranking, solution optimization, visual compatibility and redesign are implemented as the USEIT intelligence core, but the end-to-end production wiring is not complete.

## Next implementation gate

1. Keep `/v1/analyze` as the authoritative vision endpoint.
2. Keep `src/core/intelligence` as the authoritative domain/intelligence core.
3. Define one typed boundary between the FastAPI scene analysis and the TypeScript intelligence core.
4. Move credentialed product-provider calls behind the backend boundary.
5. Wire the room flow first: existing-vs-new furniture → budget → product search → ranking → redesign.
6. Reuse the same domain architecture for wardrobe, fridge/food, table and object scenarios instead of creating separate ad-hoc systems.
