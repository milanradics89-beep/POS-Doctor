<!-- coderabbit-ai-generated:v1 -->

# USEIT release register

**Status: staging and public pilot are not approved.** The current candidate introduces the controls below. The [runbook](RELEASE_RUNBOOK.md) contains the rollout procedure; dated PR narratives in it are historical. Record the actual release SHA, native build IDs, container digest, test evidence and sign-off here when known. Never link real images, tokens or private account identifiers.

| Area | Implemented | Acceptance still needed |
| --- | --- | --- |
| Consumer | Source currency and missing/zero prices; cancellable analysis and redesign; image processing notice | Signed phones, screen reader, Hungarian retail prices and source links |
| Platform identity | Legacy default provider; a second provider bound to its own app ID, nonce and verifier | Signed physical iPhone and Play-installed Android on the same staging URL |
| Cross-instance state | Firestore transactional quota, one-time challenges, Apple counters and keyed analysis deduplication; Redis remains supported for existing deployments | Two staging instances, TTL policies, IAM, restart, provider cost and rollback |
| Personal data and actions | Cloud Run omits SQLite-backed memory/actions. Other hosts retain their existing capability API. An uncertain action dispatch blocks replay of the same key. | Authenticated ownership, migration, retention, rotation, operator reconciliation and export/delete before enabling these features for hosted users |
| Delivery | Full frontend test discovery, hashed Python locks, web export and stable image/security check names | Exact candidate SHA passes GitHub Actions, administrator requires Security gate and Build backend image (no push), Codemagic evidence and rollback drill |

## Configuration and compatibility

Start at [local setup](../backend/README.md). Development mode is explicit in containers. `K_SERVICE` deployments require production settings. Keep secrets out of Expo variables; both platforms use the same HTTPS API. For two platforms set `USEIT_ATTESTATION_PROVIDER` and `USEIT_ATTESTATION_APP_ID` for the primary and `USEIT_SECONDARY_ATTESTATION_APP_ID` for the other. Configure Play package and certificate pins whenever enabling Android. Omitting the new platform header selects the primary as before. A provider selection is never proof of platform identity.

For a **new** Firestore deployment, set `USEIT_RATE_LIMIT_MODE=firestore`, `USEIT_IDEMPOTENCY_MODE=firestore`, the approved `USEIT_FIRESTORE_PROJECT_ID`, a stable server-only `USEIT_IDEMPOTENCY_SECRET` (at least 32 bytes), and unset `USEIT_REDIS_URL`. Do not set an emulator address in production. Configure TTL on `expires_at` for **both** `analysis_idempotency_v1` and `useit_state_v1`. Apple enrollment documents have no TTL. Turning on TTL or creating databases is a separate, authorized cloud operation. <!-- coderabbit-ai-generated:v1 -->

<!-- coderabbit-ai-generated-section:v1:2fc81498bc0af23093d7ec6f1ab090c2a49921949d2eadb288f89d06566ba3da -->

Set the approved `USEIT_AI_DAILY_UNITS` before starting Cloud Run: 0 pauses paid work. The shared UTC-day cap counts one unit per vision request and five per image edit. A reservation is consumed before dispatch even if the provider fails. Units are a request allowance, not a currency guarantee. Also bound instance count, concurrency, failure budgets and provider spend before rollout.

<!-- /coderabbit-ai-generated:v1 --> Infrastructure logging must redact memory capability paths on any host that exposes them.

Do not switch an existing installation between Redis and Firestore, or rotate the state secret, as a rolling configuration change. Their keys, enrollment state and in-flight requests are distinct. A coordinated cutover requires a tested enrollment/data migration or re-enrollment plan, draining old traffic, the maximum outstanding lease/session window, rollback and an owner. The Redis quota-key change starts a new one-minute window; do not run mixed versions when relying on a strict shared cap.

A mobile retry of the same analysis carries the same `Idempotency-Key`. The server stores HMACs, status, timestamps and a claim token, not image or analysis content. Duplicate and mismatched keyed requests return 409 within the TTL. After a lost successful response, the UI reports that it cannot recover the result. After expiry, or for an explicit new operation, a new charge is possible. Processing claims deliberately omit the TTL field until a terminal provider outcome is recorded, so Firestore TTL cannot remove in-flight work. A worker crash can therefore leave a key blocked; reconcile it explicitly rather than deleting it by age. Unkeyed and low-level legacy clients retain their old API contract and do not gain replay protection. Aborting a client request does not reverse work already accepted by a provider.

## Verification and release evidence

- Run `npm ci --ignore-scripts --no-audit --no-fund`, `npm run guard:useit`, `npm run typecheck` and `npm test`. Export web and Android with `npx expo export --platform <platform>`.
- Install `backend/requirements-dev.lock` with pip `--require-hashes`. Run `python -m pytest -q backend` and `bash scripts/production-readiness.sh`. Provide the CI Redis test database and a disposable local Firestore emulator as in `.github/workflows/validate.yml`. Neither integration suite should be skipped at the release gate.
- Dependency upgrades start in `backend/requirements*.txt`. With Python 3.12, regenerate runtime then dev via `uv pip compile --python 3.12 --universal --generate-hashes --no-header --no-annotate -o backend/requirements-runtime.lock backend/requirements.txt` and the equivalent command for `requirements-dev.txt` with `-c backend/requirements-runtime.lock -o backend/requirements-dev.lock`. Audit both dependency sets.
- Before cloud access, complete [the read-only preflight](GCP-PREFLIGHT.md). The manual WIF check on main verifies a token can be minted, without printing it or deploying. No specific GCP project, spend, credential, or cloud access is approved by this file.
- For each mobile build record API host, app identity, attested session, camera/gallery analysis, cancellation and recovery, actual price/currency and accessible name. For staging record quota/race tests, image digest, alert delivery, rollback and actual spend. For the pilot record representative scene quality and product accuracy, p95 latency, cost per analysis and the named go/no-go owner.
