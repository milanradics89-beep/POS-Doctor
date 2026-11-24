# USEIT Google Cloud infrastructure ADR

**Status:** Proposed, implementation not yet deployed  
**Date:** 2026-11-24  
**Owner-designated GCP project:** `fresh-weft-447913-u6`

Use the existing owner-designated `fresh-weft-447913-u6` project. Do not create a replacement project. Before provisioning, verify the intended billing account, project number, region and eligible SKUs in that project. No GCP resources have been created by this ADR.

## Decision

Use Google Cloud only as the hosting, persistence, secret-management and operations platform. OpenAI remains the only AI and multimodal inference provider. The existing FastAPI backend and versioned `POST /v1/useit/analyze` contract remain canonical.

The target footprint is deliberately small:

- Cloud Run: stateless FastAPI service, request-based billing, scale-to-zero and minimum instances 0.
- Firestore: proposed persistent personal-memory records, rate-limit state and one-time attestation challenges, only after adapter, concurrency, TTL, privacy and cost validation.
- Secret Manager: OpenAI API key and USEIT server-side authentication/encryption secrets.
- Cloud Logging and Cloud Monitoring: safe request telemetry, service health, latency/error metrics and alerts.
- Artifact Registry: container image storage, with a reviewed retention/cleanup policy.
- GitHub Actions Workload Identity Federation (WIF): short-lived deployment identity; no service-account JSON key in GitHub secrets.

Do not introduce Cloud SQL, Memorystore, Cloud Storage, Kubernetes/GKE, a dedicated VM/server, GPU, Marketplace resource, a second AI provider, or a second TypeScript API/orchestrator. Images remain on the user's phone and are submitted only for the current analysis request; no server-side image store is introduced.

## Existing application boundary

The repository has a FastAPI backend, an OpenAI `AsyncOpenAI` client, the canonical `/v1/useit/analyze` endpoint, encrypted SQLite personal memory, Redis-backed distributed rate limiting and Redis-backed attestation challenge storage. Production security is fail-closed and the OpenAI client disables implicit retries for billable POST requests.

The currently inspected production code requires shared Redis in production:

- `backend/production_security.py` rejects production startup unless `USEIT_RATE_LIMIT_MODE=redis` and a valid TLS `rediss://USEIT_REDIS_URL` are configured.
- `backend/rate_limit.py` uses a Redis Lua script for atomic rolling-window admission, Redis server time, sorted-set event storage and expiry. The current identity derivation and trusted-proxy behavior require a separate privacy hardening review.
- `backend/attestation_store.py` uses Redis `SET NX` with TTL and `GETDEL` for single-use challenge consumption.
- Personal memory currently uses encrypted SQLite; no Firestore adapter is present in the inspected implementation.

Redis may remain in existing compatibility tests, but it must not become a new Memorystore dependency. Production must not fall back to process-local/in-memory state.

The migration must preserve:

- the versioned unified API contract and current OpenAI-only provider boundary;
- server-only credentials, never embedded in Expo/mobile artifacts;
- encrypted personal-memory values and keyed identity hashing;
- atomic, single-use attestation challenge consumption;
- distributed rate limiting across all Cloud Run instances;
- generic external errors and payload-free structured telemetry.

## Target service design

### Cloud Run

Deploy the existing FastAPI application as one containerized service. The service must be stateless: no SQLite file, local filesystem persistence, process-local rate-limit state or process-local challenge store may be relied on in production.

Use a dedicated runtime service account with only the permissions needed to read the named Secret Manager versions, access the selected Firestore database, and emit logs/metrics. Keep deployment identity separate from runtime identity. Do not grant project Editor/Owner.

Do not claim collection-level Firestore IAM. Grant data-plane IAM at the resource scope actually supported by the selected Firestore API, and verify the effective policy before deployment. Enforce per-user, per-record and tenant authorization in the FastAPI application layer. Server-side Firestore Admin/server SDK calls are not constrained by Firestore Security Rules in the same way as untrusted client SDK calls; Security Rules are not a substitute for backend authorization.

Configure request concurrency, CPU/memory, timeout, max instances and ingress only after load and cost tests. Start with scale-to-zero and minimum instances 0. Any non-zero minimum, public ingress expansion or higher capacity requires a separate cost/security decision.

### Firestore data model (proposed, not approved for production)

Use a dedicated Firestore database only if data-residency and cost review supports it; otherwise use the default database. Use versioned collection/document schemas.

Suggested collections:

- `memory_v1/{identityHash}/entries/{memoryKeyHash}`: encrypted value, category, schema version, created/updated timestamps. Do not store raw identity or plaintext memory values.
- `rate_limit_v1/{bucketHash}/windows/{windowId}`: bounded counter/window metadata and expiry timestamp. Keys must be HMAC-derived; never store raw IP, account ID, email or access token.
- `attestation_challenges_v1/{challengeHash}`: provider, app ID, expiry and schema version. Store only a hash of the challenge, consume exactly once in a Firestore transaction, and check expiry in application code.

Firestore TTL is cleanup, not an authorization control. Every read/consume path must validate expiry itself. Challenge consumption must be transactional so two instances cannot both accept the same challenge. Rate-limit admission must use atomic transactions and a documented fixed/sliding-window algorithm with bounded document growth, contention tests and fail-closed behavior. Verify consistency across multiple Cloud Run instances.

**Important:** Firestore is not an automatic drop-in replacement for Redis. The current Redis Lua sliding-window algorithm and `GETDEL` semantics must not be described as migrated until Firestore adapters pass concurrency, contention, expiry, failure-mode, multi-instance and cost tests. If Firestore cannot meet the security and latency requirements at an acceptable cost, keep production fail-closed and return to an explicitly reviewed architecture decision; do not silently add Memorystore or an in-memory fallback.

### Personal-memory migration

1. Confirm whether production SQLite data exists and identify its exact source, owner, retention and backup status. Do not assume local development SQLite contains production user data.
2. Create a versioned, restartable, idempotent migration utility. Preserve HMAC identity derivation and AES-GCM encryption semantics; use a Secret Manager-managed encryption secret with an explicit key-version/rotation plan.
3. Validate row counts, schema versions, authenticated decryption, identity isolation and duplicate handling without logging or exporting plaintext values.
4. Run a dry-run and staging migration against synthetic or explicitly approved data. Record counts and checksums, never memory contents.
5. Define rollback and dual-read/temporary compatibility behavior before production cutover. Do not delete source SQLite data until witnessed restore and reconciliation pass.
6. Production migration requires a separately approved maintenance window and backup/restore evidence.

### OpenAI and cost controls

OpenAI remains the sole AI provider. The server reads `OPENAI_API_KEY` from Secret Manager at runtime. No key is exposed to the mobile client, GitHub repository, build output, logs or user-visible error.

Retain the bounded request timeout and disabled automatic retries for inference POSTs. Add/verify:

- per-user and per-IP request limits;
- maximum image/request payload and token/output budgets;
- request correlation IDs without prompts, images, URIs, credentials or response bodies in logs;
- OpenAI usage monitoring and budget/threshold alerts in the OpenAI account;
- GCP budget alerts and service-level cost metrics.

GCP billing alerts are notifications, not hard spending caps. Any enforceable OpenAI spend limit must be implemented using available account/project controls and application-side quotas; do not claim a hard cap unless tested. GCP credits do not imply coverage of OpenAI or GitHub charges.

### GitHub Actions deployment identity

Use Workload Identity Federation with GitHub OIDC. Bind the federated principal to the exact repository and protected deployment branch/environment. Grant only the minimum deploy permissions required for Cloud Run revisions and the selected runtime service account. Do not create or store long-lived service-account JSON keys.

Before enabling deployment:

- verify the target project number and exact project ID;
- verify the workload identity pool/provider and repository/branch/environment attribute conditions;
- verify separate build/deploy and runtime identities;
- run a non-production identity smoke test;
- confirm secrets are not printed or persisted in artifacts;
- require protected environment approval for production deployment.

### Observability, reliability and backup

- `/health` remains informational; `/ready` is the deployment readiness gate.
- Readiness must verify required runtime configuration and the selected shared-state store capability without exposing secret values.
- Emit only request ID, method, route, status and duration. Never log request body, image URI/data, prompts, OpenAI key, memory values or response body.
- Alert on 5xx rate, latency, readiness failures, OpenAI quota/budget thresholds, Firestore errors/contention and Cloud Run instance saturation.
- Define named on-call ownership, alert delivery acknowledgement, incident runbook and rollback revision before pilot.
- Evaluate Firestore's native managed backup and point-in-time recovery (PITR) capabilities, retention, region support and pricing. Do not use Firestore export to Cloud Storage or create a Cloud Storage bucket. A configured backup/PITR policy is not a witnessed restore; record measured RPO/RTO only after a separately witnessed restore exercise. Backup features and retention require cost review and explicit approval.

## Cost guardrails

A previously shared Cloud Console screenshot for `fresh-weft-447913-u6` showed a USD 300 welcome credit, USD 0.00 used at that time and an expiry date of 2027-02-23. This is historical evidence only, not a current balance or proof that every required SKU is covered. Re-check the remaining credit, billing linkage, expiry and eligible SKUs in Cloud Console before provisioning.

Set a project-scoped budget only after the owner approves a budget amount based on a measured service/usage model. Suggested notification thresholds are 25/50/75/90/100 percent of that approved budget; notifications do not stop resources or prevent overage.

Start with scale-to-zero, minimum instances 0, conservative max instances, no image storage and only the named services above. Track OpenAI usage separately. No paid subscription, resource expansion, billing change or production rollout without explicit user approval.

## Staged implementation sequence

1. **Repository preparation:** container build, health/readiness contract, local integration tests, no secrets in image.
2. **Identity and secrets design:** least-privilege runtime/deploy identities, Secret Manager references, WIF conditions. Do not create identities or secrets until the owner approves the exact project and scope.
3. **Firestore adapter feasibility:** implement/test memory, rate-limit and challenge-store interfaces only after proving transaction, expiry, concurrency, privacy and cost properties. Keep current SQLite/Redis adapters until replacements are validated.
4. **Staging approval gate:** verify project ID, project number, billing account, credit eligibility, region, approved budget, alerts, SKU list, estimated monthly cost and worst-case exposure; obtain explicit approval before provisioning.
5. **Staging:** deploy Cloud Run staging revision only after approval; run API contract, security, concurrency, cost and failure-mode tests using synthetic data.
6. **Data migration rehearsal:** synthetic/approved data, dry-run, reconciliation, native backup/PITR configuration and witnessed restore/rollback exercise.
7. **Production gate:** separate explicit approval, budget check, physical-device attestation evidence, monitoring/on-call, staged rollout and rollback owner.
8. **Pilot:** only after all external acceptance requirements are evidenced; CI green alone is insufficient.

## Acceptance checklist

- [ ] Target project `fresh-weft-447913-u6`, project number, access and billing account verified in Cloud Console.
- [ ] Cloud Run container is stateless and deploys with a dedicated least-privilege runtime identity.
- [ ] OpenAI key and all server secrets are read only from Secret Manager.
- [ ] GitHub deployment uses OIDC/WIF; no service-account JSON key exists in GitHub secrets.
- [ ] Firestore memory values remain encrypted and identity hashes remain keyed.
- [ ] Challenge consumption is atomic and one-time across concurrent instances.
- [ ] Rate limiting is atomic, bounded and consistent across concurrent instances.
- [ ] TTL is treated only as cleanup; expiry is enforced in application logic.
- [ ] No production path depends on SQLite, local disk, in-memory counters or in-memory challenges after approved migration.
- [ ] Images are not persisted in Cloud Storage or another server-side image store.
- [ ] OpenAI usage and GCP spend alerts are configured and verified.
- [ ] Safe telemetry excludes prompts, image data/URIs, credentials, memory values and response bodies.
- [ ] Native backup/PITR, staging load/security/cost tests and witnessed restore are complete.
- [ ] Production rollout and real-user pilot have separate approval and rollback evidence.

## Open questions that require measured or external evidence

- Verify that the owner-designated project ID `fresh-weft-447913-u6` exists, is accessible and is linked to the intended billing account; confirm its project number, region and eligible SKUs before provisioning.
- Firestore database location and retention must follow the actual data residency/privacy assessment.
- Firestore transaction contention and cost must be load-tested using realistic per-user/IP traffic.
- The exact Cloud Run CPU/memory/concurrency/max-instance configuration must be selected from measured latency and cost, not guessed.
- OpenAI model choice and per-request budgets must be validated against the representative image benchmark.
- Production source-data migration scope is unknown until the existence and ownership of any SQLite data are confirmed.
