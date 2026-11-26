# USEIT Architecture Status

## Repository decision

The only current repository is `milanradics89-beep/USEIT`, and its repository name is **USEIT**. The product is a camera-first consumer AI application. POS-Doctor is a historical predecessor product only, not a current product, runtime, repository, branch, or development target. Do not access or use the former POS-Doctor repository path, branches, or pull requests as current development sources, and do not reintroduce POS-terminal, diagnostic, or ADB functionality. The conversion to the USEIT foundation is recorded in commit `3b039d4442128d3c7d4aebfbd96e36f222e18ef7` (`Replace POS-Doctor with USEIT foundation`).

## Canonical runtime path today

`Expo UI → src/core/intelligence/apiClient.ts → POST /v1/useit/analyze → backend/main.py → Vision + scene understanding + intent + specialist + suggestions + optional shopping → validated unified response → presentation`

`/v1/analyze` remains the authoritative low-level vision endpoint. The consumer runtime now prefers the versioned `/v1/useit/analyze` boundary, so the mobile client does not perform a second vision request or duplicate product discovery when the provider supports the unified capability.

The FastAPI service is the USEIT vision/intelligence backend. It is not a preserved POS Doctor backend.

