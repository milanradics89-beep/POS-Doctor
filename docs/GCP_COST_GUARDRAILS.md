# USEIT Google Cloud cost guardrails

**Status:** Owner-approved setup values recorded; live billing and staging verification remain open  
**Last reconciled:** 2026-11-26  
**Only authorized project:** `useit-platform-2026` (`386862694550`)

## Canonical project identity

| Field | Canonical value |
|---|---|
| GCP project ID | `useit-platform-2026` |
| GCP project number | `386862694550` |
| Excluded historical project ID | `fresh-weft-447913-u6` |
| Short label `useit` | Not a valid project ID; do not use as `--project` |

The owner explicitly confirmed on 2026-11-26 that only `useit-platform-2026` may be used. Do not create a replacement project or substitute any other ID.

## Recorded billing and budget configuration

| Item | Exact value | Evidence/status |
|---|---|---|
| Budget name | `USEIT-Pilot-Budget` | Recorded as configured on 2026-11-26 |
| Budget period | Monthly | Recorded |
| Budget amount | USD 20 | Recorded |
| Alert thresholds | 50%, 80%, 100% | Recorded |
| Welcome credit | USD 300 | Historical setup evidence; current balance not verified |
| Credit expiry | 2027-02-23 | Historical setup evidence; recheck in Billing |
| Project number | `386862694550` | Owner-agreed identifier |

Budget notifications do not stop resources or prevent overage. The recorded credit is not a hard spending cap and does not establish that every required SKU is covered. GCP credits do not imply coverage of OpenAI API usage or GitHub charges.

## Recorded service configuration

The following setup values were recorded during the 2026-11-26 owner session. They should be rechecked through read-only Cloud APIs/Console before deployment, but their identifiers must remain consistent in repository configuration:

- Cloud Run Admin API: `run.googleapis.com` (enabled).
- Artifact Registry API: `artifactregistry.googleapis.com` (enabled).
- Secret Manager secret: `openai-api-key` (created; version 1 recorded Enabled).
- Runtime service account: `useit-cloud-run-runtime@useit-platform-2026.iam.gserviceaccount.com`.
- Runtime permission: `roles/secretmanager.secretAccessor` on the `openai-api-key` secret only.
- GitHub deployer service account ID: `useit-github-deployer`; full email and effective roles not recorded here and require verification.

Do not read or expose secret payloads. Do not place secrets in repository files, mobile bundles, build output or logs.

## Unresolved resource identifiers

No exact identifier is currently established for:

- Cloud Run service, region, URL or deployed revision.
- Artifact Registry repository and image path.
- Workload Identity Federation pool/provider, principalSet and attribute conditions.
- Deployer service-account full email and effective IAM.
- Firestore database/location or Redis managed endpoint.
- Codemagic `EXPO_PUBLIC_USEIT_API_URL` value and successful end-to-end backend connection.

Do not invent names, URLs, regions or endpoints. No Cloud Run staging or production deployment is claimed.

## Guardrail policy

1. Use only project `useit-platform-2026`.
2. Use only services required by the approved architecture: Cloud Run, Firestore (after migration validation), Secret Manager, Artifact Registry, Cloud Logging and Cloud Monitoring, plus GitHub Actions WIF.
3. Prefer request-based Cloud Run billing, minimum instances 0, conservative maximum instances, bounded concurrency and request timeout.
4. Do not create Cloud SQL, Memorystore, GKE/Kubernetes, Compute Engine VMs, GPUs, Cloud Storage buckets or Marketplace resources for the initial deployment.
5. Do not enable paid APIs or create billable resources beyond the recorded approved setup without explicit owner approval.
6. Do not assume any GCP credit covers OpenAI API usage, GitHub usage or excluded third-party/model services.
7. Store application secrets in Secret Manager. Never commit secrets or put provider keys in the mobile app.
8. Keep production deployment, production data migration, IAM changes, public ingress changes, billing-account changes and paid resource expansion behind explicit owner approval.
9. Keep images on the user's phone; do not introduce server-side image storage.
10. Use native Firestore backup/PITR only if selected after capability, retention and cost review. Do not use Firestore export to Cloud Storage.

## Billing verification gates

### Gate A: project and billing

- [x] Owner-confirmed project ID `useit-platform-2026` and project number `386862694550` recorded.
- [ ] Recheck project lifecycle/access and billing-account linkage.
- [ ] Recheck current credit balance, expiry, eligible services/SKUs and restrictions.
- [ ] Confirm approved region and data-residency requirements.
- [ ] Recheck budget `USEIT-Pilot-Budget`, USD 20/month, thresholds 50/80/100%, and alert recipients.

### Gate B: resource cost

- [ ] Verify Cloud Run region, min/max instances, concurrency, timeout, CPU/memory and ingress.
- [ ] Verify Artifact Registry repository location, image retention and cleanup policy.
- [ ] Verify Secret Manager active version count and access operations.
- [ ] If Firestore is approved after migration testing, estimate reads/writes/deletes, storage, indexes, TTL and backup/PITR costs.
- [ ] Verify logging/monitoring ingestion and retention.
- [ ] Estimate egress and any cross-region traffic.
- [ ] Review worst-case monthly exposure before increasing capacity or adding a paid service.

### Gate C: staging

- [ ] Staging spend/configuration explicitly approved.
- [ ] Use synthetic test data only.
- [ ] Keep production secrets and production data out of staging.
- [ ] Record deployed revision, image digest, configuration and rollback procedure.
- [ ] Measure real request, persistence, logging and egress costs before expanding traffic.

### Gate D: production

Requires separate explicit approval after staging acceptance, security review, witnessed backup/restore test, rollback rehearsal, privacy review and real-device validation.

## Cost model

Estimate monthly costs from measured or explicitly stated assumptions:

- Cloud Run: requests, vCPU-seconds, GiB-seconds, egress and maximum concurrent instances.
- Firestore: document reads/writes/deletes, storage, indexes, backup/PITR and egress.
- Secret Manager: active versions and access operations.
- Artifact Registry: stored image size and retention.
- Logging/Monitoring: ingested log volume, retention and metric volume.
- Network: outbound traffic and cross-region traffic.

Do not present Free Tier quotas as a guaranteed zero-cost bill until project, region, SKU and current eligibility are confirmed. Do not invent a monthly total before request volume, image/token budgets and configuration are measured.

## Current execution status

- [x] Canonical project ID and project number recorded.
- [x] Budget name, amount and alert thresholds recorded.
- [x] API, secret and service-account setup identifiers recorded.
- [ ] Read-only live verification of current project, billing, budget, IAM and API state.
- [ ] WIF identity and GitHub OIDC authentication verified.
- [ ] Artifact Registry repository and Cloud Run service identified.
- [ ] Staging deployment and end-to-end API validation complete.

No production deployment or unapproved paid resource expansion is authorized by this document.
