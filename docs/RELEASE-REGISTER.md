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

For a **new** Firestore deployment, set `USEIT_RATE_LIMIT_MODE=firestore`, `USEIT_IDEMPOTENCY_MODE=firestore`, the approved `USEIT_FIRESTORE_PROJECT_ID`, a stable server-only `USEIT_IDEMPOTENCY_SECRET` (at least 32 bytes), and unset `USEIT_REDIS_URL`. Do not set an emulator address in production. Configure TTL on `expires_at` for `useit_state_v1`. Configure TTL on `analysis_idempotency_v1` only after the migration gate below passes: Firestore TTL is field-based and deletes any document carrying `expires_at`, regardless of its status. Apple enrollment documents have no TTL. Turning on TTL or creating databases is a separate, authorized cloud operation. <!-- coderabbit-ai-generated:v1 -->

<!-- coderabbit-ai-generated-section:v1:2fc81498bc0af23093d7ec6f1ab090c2a49921949d2eadb288f89d06566ba3da -->

Set the approved `USEIT_AI_DAILY_UNITS` before starting Cloud Run: 0 pauses paid work. The shared UTC-day cap counts one unit per vision request and five per image edit. A reservation is consumed before dispatch even if the provider fails. Units are a request allowance, not a currency guarantee. Also bound instance count, concurrency, failure budgets and provider spend before rollout.

<!-- /coderabbit-ai-generated:v1 --> Infrastructure logging must redact memory capability paths on any host that exposes them.

Do not switch an existing installation between Redis and Firestore, or rotate the state secret, as a rolling configuration change. Their keys, enrollment state and in-flight requests are distinct. A coordinated cutover requires a tested enrollment/data migration or re-enrollment plan, draining old traffic, the maximum outstanding lease/session window, rollback and an owner. The Redis quota-key change starts a new one-minute window; do not run mixed versions when relying on a strict shared cap.

A mobile retry of the same analysis carries the same `Idempotency-Key`. The server stores HMACs, status, timestamps and a claim token, not image or analysis content. Duplicate and mismatched keyed requests return 409 while the claim is retained. Only `completed` records receive `expires_at` and may be reused after the configured TTL. `processing` and `outcome_unknown` never expire: an uncertain provider outcome may already have incurred a charge, so the same key remains blocked until explicit, evidence-backed reconciliation. After a completed record expires, or for an explicit new operation with a new key, a new charge is possible. A worker crash can leave a processing key blocked; reconcile it explicitly rather than deleting it by age. Before provider dispatch, release a keyed claim after a confirmed preflight failure or an explicit HTTP 429 budget denial only. A Firestore timeout, transport error, HTTP 503 or request cancellation may leave the daily budget reservation committed; retain the processing claim and require evidence-backed reconciliation instead of releasing it and risking a second reservation. Unkeyed and low-level legacy clients retain their old API contract and do not gain replay protection. Aborting a client request does not reverse work already accepted by a provider.

## Existing Firestore idempotency collection: TTL migration gate

Firestore TTL is field-based; it cannot filter by document status. An existing `analysis_idempotency_v1` TTL policy can delete legacy `processing`, `outcome_unknown` or unknown/corrupt claim records before the new code migrates them. Do not retain or enable that policy during the migration.

This gate applies to new deployments as well as existing collections. For a newly
created collection, record direct evidence that it is new and empty, that no TTL
policy was ever enabled, and that no legacy writer could have created or deleted
claims. Run the dry-run and retain the zero-candidate verification before enabling
TTL. A zero-candidate scan alone cannot prove that TTL never deleted historical
claims. If any historical data, policy history, or legacy writer may exist, complete
all ten steps below, including per-request reconciliation where applicable.

1. Confirm the exact, approved Google Cloud project ID and record its project number. Do not infer an ID from a display name or substitute a historical project.
2. Record whether the `analysis_idempotency_v1` TTL policy has ever been enabled and its active interval. If it is currently enabled, disable it before any writer drain or deployment; verify that deletion is disabled before continuing. If it was never enabled, retain independent evidence of that fact.
3. Stop routing new requests to old-version writers, drain their in-flight requests, and verify that no old writer can create claims. Keep the new version at zero traffic throughout migration and reconciliation.
4. Deploy the new application version with **zero traffic** while the `analysis_idempotency_v1` TTL policy remains disabled. This is a non-serving deployment only; it is not permission to route requests to the new writer.
5. Run the migration in dry-run mode using the verified project ID: `USEIT_FIRESTORE_PROJECT_ID=<verified-project-id> python -m backend.migrate_idempotency_ttl`. Review the counts; the script reads only status/expiry metadata and never prints document IDs, keys, image data or prompts.
6. After an operator has confirmed TTL is disabled and all old writers are drained, apply the migration: `USEIT_FIRESTORE_PROJECT_ID=<verified-project-id> python -m backend.migrate_idempotency_ttl --apply --ttl-disabled-confirmed --old-writers-drained`. It removes `expires_at` from every record whose status is not `completed` or the short-lived `health_probe` state, including unknown/corrupt states, rechecking status transactionally.
7. Run the dry-run again and require `candidates=0`. Verify that `completed` and `health_probe` records retain `expires_at`, while `processing`, `outcome_unknown` and unknown/corrupt states do not.
8. Reconcile any interval in which TTL may have deleted legacy claims using independent, per-request provider-dispatch and terminal-outcome evidence plus retained operational records. A zero-candidate scan cannot reveal claims already deleted by TTL. If per-request evidence cannot establish every affected claim outcome, keep traffic at zero, keep TTL disabled, and keep this release gate blocked. Do not infer safety from aggregate provider usage or an empty scan.
9. Only after steps 1-8 pass, re-enable TTL on `expires_at` for `analysis_idempotency_v1`. The policy may clean `completed` records and bounded health probes; it must never see `expires_at` on a processing, outcome-unknown or unknown/corrupt claim. The `useit_state_v1` TTL policy is separate.
10. Route traffic to the new version only after steps 1-9 pass. Record the exact project ID, policy change, dry-run/apply counts, application SHA, operator, reviewer and rollback decision. If rollback to an old writer is required, disable this collection's TTL before any old writer is restarted.

The migration command is dry-run by default. `--apply` requires both explicit acknowledgement flags and a syntactically valid 6-30 character Google Cloud project ID in `USEIT_FIRESTORE_PROJECT_ID`. It does not create resources, change TTL policies, or deploy code. Never run it from CI or without approved credentials and an operator-reviewed change.

## Verification and release evidence

- Run `npm ci --ignore-scripts --no-audit --no-fund`, `npm run guard:useit`, `npm run typecheck` and `npm test`. Export web and Android with `npx expo export --platform <platform>`.
- Install `backend/requirements-dev.lock` with pip `--require-hashes`. Run `python -m pytest -q backend` and `bash scripts/production-readiness.sh`. Provide the CI Redis test database and a disposable local Firestore emulator as in `.github/workflows/validate.yml`. Neither integration suite should be skipped at the release gate.
- Dependency upgrades start in `backend/requirements*.txt`. With Python 3.12, regenerate runtime then dev via `uv pip compile --python 3.12 --universal --generate-hashes --no-header --no-annotate -o backend/requirements-runtime.lock backend/requirements.txt` and the equivalent command for `requirements-dev.txt` with `-c backend/requirements-runtime.lock -o backend/requirements-dev.lock`. Audit both dependency sets.
- Before cloud access, complete [the read-only preflight](GCP-PREFLIGHT.md). The manual WIF check on main verifies a token can be minted, without printing it or deploying. No specific GCP project, spend, credential, or cloud access is approved by this file.
- For each mobile build record API host, app identity, attested session, camera/gallery analysis, cancellation and recovery, actual price/currency and accessible name. For staging record quota/race tests, image digest, alert delivery, rollback and actual spend. For the pilot record representative scene quality and product accuracy, p95 latency, cost per analysis and the named go/no-go owner.
