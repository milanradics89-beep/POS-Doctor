# USEIT Google Cloud cost guardrails

**Status:** implementation plan only. This document does not create cloud resources, enable APIs, change billing, deploy services, or authorize spending.

## Target project and billing facts

The owner specified `useit` as the GCP project identifier. The literal has five characters, but Google Cloud project IDs must be 6–30 lowercase letters, digits or hyphens, begin with a letter, and not end with a hyphen ([official project ID requirements](https://docs.cloud.google.com/resource-manager/reference/rest/v1/projects)). Therefore `useit` is not a valid Google Cloud project ID. The exact existing project ID, project number, access, billing-account linkage, remaining credit balance, credit eligibility and SKU coverage are unverified. Do not substitute another project, create a replacement project, or provision resources until the owner supplies the exact valid ID and verifies these facts in Cloud Console.

Previously discussed credit evidence for the agreed USEIT project showed a USD 300 welcome credit and 2027-02-23 expiry; this is historical, not a current balance. Re-check Billing Overview, remaining credit, expiry and covered SKUs before provisioning.

A credit is not a hard spending cap. Budget notifications are alerts, not automatic shutdown controls. Usage not covered by an applicable credit or Free Tier may be charged to the linked payment method.

## Guardrail policy

1. Use only the jointly agreed existing project `useit-platform-2026`; do not substitute another ID or create a replacement. Verify current project and billing details before provisioning.
2. Use only services required by the approved architecture: Cloud Run, Firestore, Secret Manager, Artifact Registry, Cloud Logging and Cloud Monitoring, plus GitHub Actions WIF.
3. Prefer request-based Cloud Run billing, minimum instances 0, conservative maximum instances, bounded concurrency and request timeout, and no always-on compute.
4. Do not create Cloud SQL, Memorystore, GKE/Kubernetes, Compute Engine VMs, GPUs, Cloud Storage buckets, or Marketplace resources for the initial deployment.
5. Do not enable paid APIs or create billable resources until the owner has reviewed the service list, region, configuration, estimated monthly usage and worst-case exposure and has explicitly approved the spend.
6. Do not assume any GCP credit covers OpenAI API usage, GitHub usage or excluded third-party/model services.
7. Store application secrets in Secret Manager. Never commit secrets, put provider keys in the mobile app, or create long-lived service-account keys.
8. Keep production deployment, production data migration, IAM changes, public ingress changes, billing-account changes and paid resource creation behind explicit owner approval.
9. Keep images on the user's phone; do not introduce server-side image storage.
10. Use native Firestore managed backup/PITR only if selected after capability, retention and cost review. Do not use Firestore export to Cloud Storage or create Cloud Storage resources.

## Budget and alert setup

Create a project-scoped Cloud Billing budget only after the billing account is verified and the owner approves a budget amount derived from a measured or explicitly stated usage model. Do not derive the budget from the historical USD 300 screenshot.

Suggested notification thresholds are 25%, 50%, 75%, 90% and 100% of the owner-approved monthly budget. These thresholds notify; they do not stop resources or prevent overage. Configure notifications to an owner-confirmed recipient. If Pub/Sub budget notifications are considered, review that integration separately and do not attach an automatic destructive shutdown action.

Review usage cost and applied credits/savings in the Billing report. Check daily during initial staging and monthly after steady state, with an additional review before any material change. Investigate unexpected SKU, region, network egress, log ingestion or request-volume changes before continuing.

## Provisioning gates

### Gate A: account and project

- Confirm the agreed project ID `useit-platform-2026`, previously recorded project number `386862694550`, and current owner access.
- Confirm billing-account linkage, billing-account type and payment responsibility.
- Confirm current remaining credit, exact expiry, eligible services and restrictions for this exact project.
- Confirm the project region and data-residency requirements.
- Confirm owner access to billing reports and alert notifications.

### Gate B: cost controls

- Obtain explicit approval for the monthly budget amount and worst-case exposure.
- Create budget notifications and verify alert recipients.
- Review Cloud Run max instances, minimum instances, concurrency, timeout and ingress.
- Review Firestore location, database mode, indexes, TTL policies and expected daily reads/writes/deletes.
- Review native backup/PITR availability, retention and pricing; no Cloud Storage export.
- Set log retention and avoid verbose request/body logging.
- Set Artifact Registry cleanup/retention policy.

### Gate C: staging

- Deploy only after Gate A and Gate B are verified and staging spend is explicitly approved.
- Use synthetic test data only.
- Keep production secrets and production data out of staging.
- Record deployed revision, image digest, configuration and rollback procedure.
- Measure real request, Firestore operation, logging and egress costs before expanding traffic.

### Gate D: production

Requires separate explicit approval after staging acceptance, security review, witnessed backup/restore test, rollback rehearsal, privacy review and real-device validation.

## Cost model to complete before Gate A approval

Estimate monthly costs from measured or explicitly stated assumptions:

- Cloud Run: requests, vCPU-seconds, GiB-seconds, egress and maximum concurrent instances.
- Firestore: document reads/writes/deletes, storage, indexes, backup/PITR and egress.
- Secret Manager: active versions and access operations.
- Artifact Registry: stored image size and retention.
- Logging/Monitoring: ingested log volume, retention and metric volume.
- Network: outbound traffic and any cross-region traffic.

Do not present Free Tier quotas as a guaranteed zero-cost bill until the project, region, SKU and current eligibility are confirmed in the billing console. Do not invent an estimated monthly total before request volume, image/token budgets and configuration are measured.

## Current execution status

- [x] Jointly agreed project ID `useit-platform-2026` and previously recorded project number `386862694550` recorded; current access and billing re-verification remains open.
- [ ] Confirm exact project number, billing account and current credit eligibility for each required SKU.
- [ ] Approve monthly budget amount, cost exposure and alert recipients.
- [ ] Approve region and initial staging resource configuration.
- [ ] Provision staging resources only after explicit approval.
- [ ] Validate cost and security controls before any production decision.

No cloud resource creation or deployment is authorized by this document.
