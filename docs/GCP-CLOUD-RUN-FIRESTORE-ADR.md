# USEIT Google Cloud infrastructure ADR

**Status:** Foundation configuration recorded; staging deployment and production readiness not verified  
**Last reconciled:** 2026-11-26  
**Only authorized GCP project ID:** `useit-platform-2026`  
**Project number:** `386862694550`

## Canonical project identity

All USEIT GCP resources and documentation must refer to this exact existing project:

| Field | Canonical value | Status |
|---|---|---|
| Project ID | `useit-platform-2026` | Explicitly agreed by owner on 2026-11-26 |
| Project number | `386862694550` | Recorded and agreed on 2026-11-26 |
| Forbidden historical ID | `fresh-weft-447913-u6` | Do not use |
| Short label `useit` | Not a project ID | Never pass as `--project` or describe as the actual ID |

Do not create or select a replacement project. The project ID and number above are the only canonical identifiers for this work. The owner explicitly excluded `fresh-weft-447913-u6` and confirmed that only `useit-platform-2026` may be used.

## GCP configuration recorded on 2026-11-26

The following values were recorded as configured during the owner's GCP setup session. This table preserves that setup record; it is not a claim that a fresh live Cloud API inventory was performed during this documentation update.

| Resource | Exact identifier / value | Recorded state |
|---|---|---|
| Cloud Run Admin API | `run.googleapis.com` | Enabled; owner confirmed Manage was visible |
| Artifact Registry API | `artifactregistry.googleapis.com` | Enabled; owner confirmed Manage was visible |
| Secret Manager secret | `openai-api-key` | Created; version 1 recorded as Enabled |
| Runtime service account | `useit-cloud-run-runtime@useit-platform-2026.iam.gserviceaccount.com` | Created |
| Runtime secret permission | `roles/secretmanager.secretAccessor` | Granted to runtime service account on the `openai-api-key` secret only |
| GitHub deployer service account ID | `useit-github-deployer` | Created/recorded; full email and effective roles require live verification |
| Billing budget | `USEIT-Pilot-Budget` | Recorded as configured |
| Monthly budget amount | USD 20 | Recorded |
| Budget alert thresholds | 50%, 80%, 100% | Recorded |
| Welcome credit | USD 300 | Historical setup evidence; current remaining balance and SKU eligibility unverified |
| Credit expiry | 2027-02-23 | Historical setup evidence; recheck in Billing before provisioning |

Never read, print, commit, or expose Secret Manager secret payloads or versions. The API key itself is not part of this document.

## Not configured or not yet evidenced

Do not invent identifiers for resources that have not been confirmed. As of this reconciliation, the following exact values are not established by the setup record:

- Cloud Run service name, region, service URL, deployed revision and image digest.
- Artifact Registry repository name, region and image path.
- Workload Identity Federation pool ID, provider ID, provider resource name, attribute conditions, principalSet and successful GitHub OIDC authentication.
- Full deployer service-account email and its effective IAM bindings.
- Redis endpoint/resource, Firestore database name/location or completed Firestore adapter.
- A live HTTPS backend URL, Codemagic environment-group value `EXPO_PUBLIC_USEIT_API_URL`, and successful mobile-to-backend request.
- Production deployment, staging deployment, physical-device acceptance and production data migration.

The current backend still uses Redis for distributed rate limiting and attestation challenge storage, and encrypted SQLite for personal memory. Firestore is a proposed migration target, not an implemented production replacement. Do not claim Cloud Run readiness until shared state and persistent storage have been migrated and validated.

## Architecture decision

Use Google Cloud only for hosting, persistence, secret management and operations. OpenAI remains the only AI and multimodal inference provider. The existing FastAPI backend and versioned `POST /v1/useit/analyze` contract remain canonical.

Target footprint, subject to implementation and approval:

- Cloud Run: stateless FastAPI service, request-based billing, scale-to-zero and minimum instances 0.
- Firestore: proposed persistent personal-memory records, rate-limit state and one-time attestation challenges, only after adapter, concurrency, TTL, privacy and cost validation.
- Secret Manager: server-side OpenAI and USEIT secrets.
- Cloud Logging and Cloud Monitoring: safe request telemetry, health, latency/error metrics and alerts.
- Artifact Registry: container image storage with reviewed retention/cleanup.
- GitHub Actions Workload Identity Federation: short-lived deployment identity; no service-account JSON key in GitHub secrets.

Do not introduce Cloud SQL, Memorystore, Cloud Storage, Kubernetes/GKE, dedicated VMs, GPUs, Marketplace resources, a second AI provider or a second TypeScript API/orchestrator. Images remain on the user's phone and are submitted only for the current analysis request.

## Existing backend constraints

The inspected backend requires shared Redis in production:

- `backend/production_security.py` requires `USEIT_RATE_LIMIT_MODE=redis` and a valid TLS `rediss://USEIT_REDIS_URL`.
- `backend/rate_limit.py` uses Redis Lua for atomic rolling-window admission, Redis server time, sorted-set event storage and expiry.
- `backend/attestation_store.py` uses Redis `SET NX` with TTL and `GETDEL` for single-use challenge consumption.
- Personal memory currently uses encrypted SQLite; no Firestore adapter is present in the inspected implementation.

Production must not fall back to process-local/in-memory state. Firestore is not an automatic drop-in replacement for Redis. Do not describe the Redis Lua or `GETDEL` semantics as migrated until Firestore adapters pass concurrency, contention, expiry, failure-mode, multi-instance and cost tests.

## Security and deployment gates

- Runtime identity and deployer identity remain separate and least-privileged.
- Runtime identity may access only the named secret and the explicitly selected data/logging resources.
- Do not grant project Editor/Owner.
- WIF must bind to the exact repository and protected deployment branch/environment; use short-lived OIDC credentials.
- Never create or store long-lived service-account JSON keys.
- Secret values must never appear in mobile artifacts, GitHub files, logs, build output or errors.
- `/health` is informational; `/ready` is the deployment readiness gate.
- Telemetry must exclude request bodies, image data/URIs, prompts, credentials, memory values and response bodies.
- Production deployment, public-ingress expansion, IAM changes, billing changes, data migration and paid resource creation require explicit owner approval.

## Cost controls

The recorded monthly budget is USD 20 under `USEIT-Pilot-Budget`, with alerts at 50%, 80% and 100%. Budget notifications are alerts, not hard spending caps or automatic shutdown controls. Verify the live budget scope, billing account, alert recipients and notification configuration before relying on them.

The USD 300 welcome credit and 2027-02-23 expiry are historical setup facts, not a current balance or proof that every required SKU is covered. Recheck current remaining credit, expiry and SKU eligibility in the authorized project before provisioning. GCP credits do not imply coverage of OpenAI or GitHub charges.

Start with scale-to-zero, minimum instances 0, conservative maximum instances, no image storage and only approved services. Do not add paid services or increase spend without explicit approval.

## Staged implementation sequence

1. Repository preparation: container build, health/readiness contract, local integration tests, no secrets in image.
2. Read-only verification of the canonical project, billing, enabled APIs, service accounts, secret metadata, IAM and budget. Never read secret payloads.
3. Verify WIF pool/provider and run a non-production identity smoke test.
4. Implement and validate shared-state/persistent-storage migration while preserving Redis and encrypted SQLite semantics until replacement tests pass.
5. Obtain explicit staging spend/configuration approval.
6. Deploy staging only after approval; test health/readiness, authenticated API contract, concurrency, security and cost with synthetic data.
7. Rehearse backup/restore and rollback; production requires separate explicit approval.
8. Physical-device photo-to-AI-to-result acceptance before pilot.

## Acceptance checklist

- [x] Canonical project ID `useit-platform-2026` and project number `386862694550` recorded from the 2026-11-26 owner agreement.
- [x] Cloud Run Admin API and Artifact Registry API recorded as enabled on 2026-11-26.
- [x] Secret `openai-api-key` and runtime service account recorded; secret access scoped to that secret.
- [x] Budget `USEIT-Pilot-Budget`, USD 20, 50/80/100% alerts recorded.
- [ ] Current project metadata, billing linkage, credit balance/SKU eligibility and budget notifications rechecked live.
- [ ] Deployer service-account email, effective IAM and WIF configuration verified.
- [ ] Artifact Registry repository and Cloud Run service/region/URL identified and verified.
- [ ] Shared state and persistent storage migrated and validated.
- [ ] Staging deployed and health/readiness/API/security/cost tests passed.
- [ ] Physical Android and iOS device acceptance completed.
- [ ] Production rollout separately approved with rollback evidence.

## Open items requiring live evidence

- Confirm exact billing account linkage, current credit balance/eligibility, region and service SKUs.
- Confirm full deployer service-account email, IAM roles and WIF identifiers/conditions.
- Decide Firestore data model/location only after transaction, expiry, privacy, concurrency and cost testing.
- Measure Cloud Run CPU/memory/concurrency/timeout/max instances; do not guess.
- Confirm whether any production SQLite data exists and define migration/backup ownership.
- Record the actual Cloud Run service URL only after a successful staging deployment.
