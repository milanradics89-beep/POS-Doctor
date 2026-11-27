# USEIT GCP read-only preflight

Status: prepared for owner-operated verification. This document and its script do not provision resources, enable APIs, alter IAM, create secrets, change billing, or deploy the service.

## Owner-confirmed project identity

The owner-confirmed Google Cloud project is:

- Display name: `USEIT` (short label: `useit`)
- Exact project ID: `useit-platform-2026`
- Project number: `386862694550`

The display name and project ID are different fields. Use only the exact project ID
above for USEIT; `fresh-weft-447913-u6` is explicitly excluded. Do not infer an ID from
a display name or substitute a historical project.

The preflight remains read-only. It verifies the supplied exact ID before invoking
`gcloud` and does not create resources, enable APIs, alter IAM or billing, read secret
payloads, or deploy. The project ID is owner-confirmed, but live project resources,
billing/SKU eligibility, IAM and deployment readiness remain unverified.

To verify the fail-closed identity guard **without contacting Google Cloud**,
supply a deliberately unapproved value. The script must exit with status 2 before
checking credentials or invoking any `gcloud` command:

```bash
USEIT_GCP_PROJECT_ID=not-the-approved-project bash scripts/gcp-readonly-preflight.sh
```

To perform the actual read-only inventory, use the exact owner-confirmed project ID.
This command contacts Google Cloud through read-only `gcloud` calls and requires an
interactively authenticated account with the necessary read permissions:

```bash
USEIT_GCP_PROJECT_ID=useit-platform-2026 bash scripts/gcp-readonly-preflight.sh
```

A successful inventory is not authorization to provision, change billing/IAM, create
resources or deploy.
## Run the read-only inventory

Requirements: Google Cloud CLI, an interactively authenticated account with read access, and Bash 3.2 or newer (including the macOS system Bash).

<!-- coderabbit-ai-generated:v1 -->

<!-- coderabbit-ai-generated-section:v1:e2a5a30c200e8aaea29ad79568f2562be3ec37198856bd034313a3ec3acda762 -->

    USEIT_GCP_PROJECT_ID=useit-platform-2026 bash scripts/gcp-readonly-preflight.sh

<!-- /coderabbit-ai-generated:v1 -->

If a region has already been selected and approved, set it explicitly:

    USEIT_GCP_PROJECT_ID=useit-platform-2026 USEIT_GCP_REGION=YOUR_APPROVED_REGION bash scripts/gcp-readonly-preflight.sh

The script reads project metadata, billing linkage, enabled APIs, Firestore databases, Secret Manager secret names, Workload Identity Federation pools, Artifact Registry repositories, Logging sinks, Monitoring notification channels, and (only when a region is supplied) Cloud Run services.

It never reads secret versions or secret payloads. It does not call create, enable, deploy, IAM mutation, budget mutation, Terraform apply, or Terraform destroy commands. Failed read-only calls are reported as unverified and produce a non-zero exit status.

## Required owner Console checks

The exact project identity is owner-confirmed as `useit-platform-2026` (project number `386862694550`). The read-only preflight may be run against this exact ID; it does not provision or mutate resources. Complete the billing/SKU, budget, region, IAM/WIF and runtime-secret checks below before proposing any paid resource creation or deployment. Do not infer an ID from the display name or substitute `fresh-weft-447913-u6`.

<!-- coderabbit-ai-generated:v1 -->

<!-- coderabbit-ai-generated-section:v1:65b25564decb9f908b5e0d3ac1ce1818835379620d58ead46ab4a1884d0e375a -->

1. Select the existing `USEIT` project; confirm project ID `useit-platform-2026`, project number `386862694550`, and lifecycle state.

<!-- /coderabbit-ai-generated:v1 -->
2. Open Billing > My projects. Confirm the linked billing account and who is financially responsible.
3. Open Billing > Credits and Billing reports. Verify the current remaining credit, expiry date, and exact eligible SKUs for Cloud Run, Firestore, Secret Manager, Artifact Registry, Logging, Monitoring, and any required network usage. A historical credit screenshot is not current evidence.
4. Agree and record the monthly budget amount, worst-case exposure, notification recipients, and thresholds before enabling billing-sensitive services or creating resources. Budget alerts notify; they do not cap spend.
5. Approve one region and the Firestore database location. Confirm data-residency requirements and whether the locations are compatible.
6. Review the existing IAM policy. Keep deployment identity separate from the Cloud Run runtime identity. Do not grant project Owner or Editor.
7. Review existing Secret Manager secret names and access policies. OpenAI API keys, session secrets, and idempotency secrets must be added only through the approved secret-management path; never commit values or put them in EXPO_PUBLIC variables.
8. Review Workload Identity Federation. The provider must restrict the repository to milanradics89-beep/USEIT and the approved protected branch/environment. Use short-lived OIDC credentials; do not create service-account JSON keys.
9. Review Cloud Run ingress, minimum instances 0, maximum instances, concurrency, timeout, memory, and request-based billing. Production rollout requires a separate explicit approval.

## Current code readiness constraints

The current mainline has the camera-to-API client path and the canonical FastAPI endpoint, but live App Preview acceptance is blocked until a real HTTPS staging URL is deployed and configured as EXPO_PUBLIC_USEIT_API_URL in Codemagic. Do not use localhost or a placeholder.

<!-- coderabbit-ai-generated:v1 -->

<!-- coderabbit-ai-generated-section:v1:0b389532e12a84b98b2890b7efcd94821ba396fa3ce4f706285b3317653b5c0b -->

Cloud Run requires the Firestore mode described in the [release register](RELEASE-REGISTER.md). Local emulator results do not attest to production IAM, TTL, billing or data migration.

<!-- /coderabbit-ai-generated:v1 -->

The existing FastAPI backend, OpenAI adapter, and POST /v1/useit/analyze remain canonical. OpenAI is the only AI provider. Images remain on the phone and are sent only with the current analysis request. No server-side image storage is part of this design.

## Human gate before provisioning

The owner must first verify project/billing/SKU eligibility and approve the region, monthly budget, alert recipients, and initial staging resource list. Only then may a separately reviewed Terraform/CLI deployment plan be applied. Production deployment, data migration, public-ingress changes, and paid resource creation remain separate approval gates.
