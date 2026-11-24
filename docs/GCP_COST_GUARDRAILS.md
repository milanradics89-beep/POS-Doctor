# USEIT Google Cloud cost guardrails

Status: implementation plan only. This document does not create cloud resources, enable APIs, change billing, deploy services, or authorize spending.

## Billing facts to verify before provisioning

The project owner supplied a Google Cloud Console screenshot showing a $300 credit, $0 used, and an expiry date of 2027-02-23 for project `useit-platform-2026`. Re-check the Billing Overview and credit coverage immediately before provisioning. The screenshot showed a full billing account; therefore usage not covered by the credit or Free Tier can be charged to the payment method.

The credit is not a hard spending cap. Budget notifications are alerts, not automatic shutdown controls.

## Guardrail policy

1. Use the existing project `useit-platform-2026`; do not create duplicate projects.
2. Use only services required by the approved architecture: Cloud Run, Firestore, Secret Manager, Artifact Registry, Cloud Logging and Cloud Monitoring.
3. Prefer request-based Cloud Run billing, minimum instances 0, conservative maximum instances, bounded concurrency and request timeout, and no always-on compute.
4. Do not create Cloud SQL, Memorystore, GKE, Compute Engine VMs, GPUs, Cloud Storage buckets, or Marketplace resources for the initial deployment.
5. Do not enable paid APIs or create billable resources until the owner has reviewed the service list, region, configuration, estimated monthly usage and worst-case exposure.
6. Do not assume the $300 credit covers OpenAI API usage, GitHub usage, or excluded third-party/model services.
7. Store application secrets in Secret Manager. Never commit secrets, put provider keys in the mobile app, or create long-lived service-account keys.
8. Keep production deployment, production data migration, IAM changes, public ingress changes, and billing-account changes behind explicit owner approval.

## Budget and alert setup

Create a project-scoped Cloud Billing budget after confirming that the project is linked to the intended billing account. Suggested alert thresholds against the $300 credit are:

- 25%: $75
- 50%: $150
- 75%: $225
- 90%: $270
- 100%: $300

These thresholds notify; they do not stop resources or prevent overage. Configure email notifications to the project owner. If available and understood, configure Pub/Sub budget notifications to a separately reviewed automation, but do not attach an automatic destructive shutdown action.

Review both usage cost and applied credits/savings in the Billing report. Check daily during initial staging, then weekly. Investigate unexpected SKU, region, network egress, log ingestion, or request-volume changes before continuing.

## Provisioning gates

### Gate A: account and credit
- Confirm billing account type and linked project.
- Confirm current remaining credit, exact expiry, eligible services and restrictions.
- Confirm the project region and intended billing account.
- Confirm owner access to billing reports and alert emails.

### Gate B: cost controls
- Create budget and notifications.
- Review Cloud Run max instances, minimum instances, concurrency, timeout and ingress.
- Review Firestore location, database mode, indexes, TTL policies and expected daily reads/writes/deletes.
- Set log retention and avoid verbose request/body logging.
- Set Artifact Registry cleanup/retention policy.

### Gate C: staging
- Deploy only after Gate A and Gate B are verified.
- Use synthetic test data only.
- Keep production secrets and production data out of staging.
- Record deployed revision, image digest, configuration and rollback procedure.
- Measure real request, Firestore operation, logging and egress costs before expanding traffic.

### Gate D: production
Requires separate explicit approval after staging acceptance, security review, backup/restore test, rollback rehearsal, privacy review and real-device validation.

## Cost model to complete before Gate A approval

Estimate monthly costs from measured or explicitly stated assumptions:

- Cloud Run: requests, vCPU-seconds, GiB-seconds, egress and maximum concurrent instances.
- Firestore: document reads/writes/deletes, storage, indexes and egress.
- Secret Manager: active versions and access operations.
- Artifact Registry: stored image size and retention.
- Logging/Monitoring: ingested log volume, retention and metric volume.
- Network: outbound traffic and any cross-region traffic.

Do not present Free Tier quotas as a guaranteed zero-cost bill until the project, region, SKU and current eligibility are confirmed in the billing console.

## Current execution status

- [x] Owner supplied screenshot showing $300 credit, $0 used and expiry 2027-02-23.
- [ ] Confirm exact billing account type and credit eligibility for each required SKU.
- [ ] Confirm billing budget notifications and alert recipients.
- [ ] Approve region and initial staging resource configuration.
- [ ] Provision staging resources.
- [ ] Validate cost and security controls before any production decision.

No cloud resource creation or deployment is authorized by this document.
