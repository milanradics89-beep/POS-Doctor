# USEIT Google Cloud infrastructure ADR

**Status:** Proposed, implementation not yet deployed  
**Date:** 2026-11-24  
**GCP project:** **Not yet confirmed.** The cost-guardrails document currently names `useit-platform-2026`, while an earlier ADR draft named `fresh-weft-447913-u6`. These identifiers conflict. Do not provision resources or change billing until the owner verifies the intended project ID in Cloud Console and the documents are reconciled.

## Decision

Use Google Cloud only as the hosting, persistence, secret-management and operations platform. OpenAI remains the only AI and multimodal inference provider. The existing FastAPI backend and versioned `POST /v1/useit/analyze` contract remain canonical.

The target pilot footprint is deliberately small:

- Cloud Run: stateless FastAPI service, scale-to-zero, minimum instances 0 unless measured cold-start/availability requirements justify otherwise.
- Firestore: proposed persistent personal-memory records, rate-limit windows/counters, and one-time attestation challenges, subject to the adapter and concurrency validation below.
- Secret Manager: OpenAI API key and USEIT server-side authentication/encryption secrets.
- Cloud Logging and Cloud Monitoring: safe request telemetry, service health, latency/error metrics, budget/alert signals.
- Artifact Registry: container image storage, with a reviewed retention/cleanup policy.
- GitHub Actions Workload Identity Federation (WIF): short-lived deployment identity; no service-account JSON key in GitHub secrets.

No Cloud SQL, Memorystore, Cloud Storage, Kubernetes/GKE, dedicated VM/server, GPU, Marketplace resource, or second AI provider is part of this decision. Images remain on the user's phone and are submitted only for the current analysis request; no image bucket or persistent server-side image store is introduced.

## Existing application boundary

The repository already has a FastAPI backend, an OpenAI `AsyncOpenAI` client, a canonical `/v1/useit/analyze` endpoint, encrypted SQLite personal memory, Redis-backed distributed rate limiting and Redis-backed attestation challenge storage. Production security is fail-closed and the OpenAI client disables implicit retries for billable POST requests.

The currently inspected production code requires shared Redis in production:
- `backend/production_security.py` rejects production startup unless `USEIT_RATE_LIMIT_MODE=redis` and a valid TLS `rediss://` `USEIT_REDIS_URL` are configured.
- `backend/rate_limit.py` uses a Redis Lua script for atomic rolling-window admission, Redis server time, sorted-set event storage and expiry. It currently derives keys from the request client host; a future privacy hardening review should evaluate HMAC-derived client identities and trusted-proxy handling.
- `backend/attestation_store.py` uses Redis `SET NX` with TTL and `GETDEL` for single-use challenge consumption.
- Personal memory currently uses encrypted SQLite; no Firestore adapter is present in the inspected implementation.

The migration must preserve:
- the versioned unified API contract and current OpenAI model/provider boundary;
- server-only credentials, never embedded in Expo/mobile artifacts;
- encrypted personal-memory values and keyed identity hashing;
- atomic, single-use attestation challenge consumption;
- distributed rate limiting across all Cloud Run instances;
- generic external errors and payload-free structured telemetry.

## Target service design

### Cloud Run

Deploy the existing FastAPI application as one containerized service. The service must be stateless: no SQLite file, local filesystem persistence, process-local rate-limit state, or process-local challenge store may be relied on in production.

Use a dedicated runtime service account with only:
- read access to the named Secret Manager versions required by the service;
- Firestore access limited to the application database/collections;
- permission to emit logs and metrics.

Do not grant project Editor/Owner to the runtime identity. Keep deployment identity separate from runtime identity. Configure request concurrency, CPU/memory, request timeout, max instances and ingress only after load and cost tests; start with scale-to-zero and conservative maximum instances. Do not set a non-zero minimum instance without an explicit cost/availability decision.

### Firestore data model (proposed, not approved for production)

Use a dedicated Firestore database (default database unless a measured requirement justifies another) and versioned collection/document schemas.

Suggested collections:
- `memory_v1/{identityHash}/entries/{memoryKeyHash}`: encrypted value, category, schema version, created/updated timestamps. Do not store raw identity or plaintext memory values.
- `rate_limit_v1/{bucketHash}/windows/{windowId}`: bounded counter/window metadata and expiry timestamp. Keys must be HMAC-derived; never store raw IP, account ID, email, or access token.
- `attestation_challenges_v1/{challengeHash}`: provider, app ID, expiry, and schema version. Store only a hash of the challenge, consume exactly once in a Firestore transaction, and check expiry in application code.

Firestore TTL is cleanup, not an authorization control. Every read/consume path must validate expiry itself. Challenge consumption must be transactional so two instances cannot both accept the same challenge. Rate-limit increments/admission must use atomic transactions and a documented fixed/sliding-window algorithm with bounded document growth and contention tests.

**Important:** Firestore is not an automatic drop-in replacement for Redis. The current Redis Lua sliding-window algorithm and `GETDEL` semantics must not be described as migrated until Firestore adapters pass concurrency, contention, expiry, failure-mode and cost tests. If Firestore cannot meet the security and latency requirements at an acceptable cost, retain a separately reviewed shared-state design; do not silently add Memorystore, because it is explicitly excluded from the current target architecture. Production must remain fail-closed until a validated shared-state implementation is selected.

### Personal-memory migration

1. Confirm whether production SQLite data exists and identify its exact source, owner, retention and backup status. Do not assume local development SQLite contains production user data.
2. Create a versioned, restartable, idempotent migration utility. Preserve HMAC identity derivation and AES-GCM encryption semantics; use a Secret Manager-managed encryption secret with an explicit key-version/rotation plan.
3. Validate row counts, schema versions, authenticated decryption, identity isolation and duplicate handling without logging or exporting plaintext values.
4. Run a dry-run and staging migration against synthetic or explicitly approved data. Record counts and checksums, never memory contents.
5. Define rollback and dual-read/temporary compatibility behavior before production cutover. Do not delete the source SQLite data until witnessed restore and reconciliation pass.
6. Production migration requires a separately approved maintenance window and backup/restore evidence.

### OpenAI and cost controls

OpenAI remains the sole AI provider. The server reads `OPENAI_API_KEY` from Secret Manager at runtime. No key is exposed to the mobile client, GitHub repository, build output, logs, or user-visible error.

Retain the existing bounded request timeout and disabled automatic retries for inference POSTs. Add/verify:
- per-user and per-IP request limits;
- maximum image/request payload and token/output budgets;
- request correlation IDs without prompts, images, URIs, credentials, or response bodies in logs;
- OpenAI usage monitoring and budget/threshold alerts in the OpenAI account;
- GCP budget alerts and service-level cost metrics.

GCP billing alerts are notifications, not hard spending caps. Any enforceable OpenAI spend limit must be implemented using available account/project controls and application-side quotas; do not claim a hard cap unless tested. GCP credits do not imply coverage of OpenAI or GitHub charges.

### GitHub Actions deployment identity

Use Workload Identity Federation with GitHub OIDC. Bind the federated principal to the exact repository and protected deployment branch/environment. Grant only the minimum deploy permissions required for Cloud Run revisions and the selected runtime service account. Do not create or store long-lived service-account JSON keys.

Before enabling deployment:
- verify the Google Cloud project number, workload identity pool/provider, repository and branch/environment attribute conditions;
- verify separate build/deploy and runtime identities;
- run a non-production identity smoke test;
- confirm secrets are not printed or persisted in artifacts;
- require protected environment approval for production deployment.

### Observability, reliability and backup

- `/health` remains informational; `/ready` is the deployment readiness gate.
- Readiness must verify required runtime configuration and the selected shared-state store capability without exposing secret values.
- Emit only request ID, method, route, status and duration. Never log request body, image URI/data, prompts, OpenAI key, memory values, or response body.
- Alert on 5xx rate, latency, readiness failures, OpenAI quota/budget thresholds, Firestore errors/contention, and Cloud Run instance saturation.
- Define named on-call ownership, alert delivery acknowledgement, incident runbook and rollback revision before pilot.
- Configure Firestore backup/export and retention only after the actual data classification, recovery objective and billing are reviewed. A configured backup is not a witnessed restore; record measured RPO/RTO after a restore exercise.

## Cost guardrails

The previously recorded Google Cloud welcome credit was USD 300 through 2027-02-23, with USD 0.00 spend at the time of that earlier check. These are historical figures, not a live balance. Recheck billing and eligible SKUs before provisioning. Budget alerts at 25/50/75/90/100 percent are notifications, not a spending cap. Follow `docs/GCP_COST_GUARDRAILS.md` after reconciling the project ID.

Start with scale-to-zero, minimum instances 0, conservative max instances, no image storage, and only the named services above. Set GCP budget alerts before creating billable resources. Track OpenAI usage separately. No paid subscription, resource expansion, or production rollout without explicit user approval.

## Staged implementation sequence

1. **Repository preparation:** container build, health/readiness contract, local integration tests, no secrets in image.
2. **Identity and secrets design:** least-privilege runtime/deploy identities, Secret Manager references, WIF conditions. Do not create identities or secrets until the owner approves the exact project and scope.
3. **Firestore adapter feasibility:** implement/test memory, rate-limit and challenge-store interfaces only after proving transaction, expiry, concurrency, privacy and cost properties. Keep current SQLite/Redis adapters until replacements are validated.
4. **Staging approval gate:** confirm project ID, billing account, credit eligibility, region, budget alerts, SKU list, estimated monthly cost and worst-case exposure; obtain explicit approval before provisioning.
5. **Staging:** deploy Cloud Run staging revision only after approval; run API contract, security, concurrency, cost and failure-mode tests using synthetic data.
6. **Data migration rehearsal:** synthetic/approved data, dry-run, reconciliation, backup/restore and rollback exercise.
7. **Production gate:** separate explicit approval, budget check, physical-device attestation evidence, monitoring/on-call, staged rollout and rollback owner.
8. **Pilot:** only after all external acceptance requirements are evidenced; CI green alone is insufficient.

## Acceptance checklist

- [ ] GCP project ID and billing account are verified and consistent across all architecture/cost documents.
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
- [ ] Staging load/security/cost tests and witnessed backup/restore are complete.
- [ ] Production rollout and real-user pilot have separate approval and rollback evidence.

## Open questions that require measured evidence

- The intended GCP project ID is unresolved between two identifiers in existing project documentation; verify in Cloud Console before provisioning.
- Firestore database location and retention must follow the actual data residency/privacy assessment.
- Firestore transaction contention and cost must be load-tested using realistic per-user/IP traffic.
- The exact Cloud Run CPU/memory/concurrency/max-instance configuration must be selected from measured latency and cost, not guessed.
- OpenAI model choice and per-request budgets must be validated against the representative image benchmark.
- Production source-data migration scope is unknown until the existence and ownership of any SQLite data are confirmed.
