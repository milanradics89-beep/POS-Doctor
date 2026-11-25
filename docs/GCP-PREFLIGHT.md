# USEIT GCP read-only preflight

Status: prepared for owner-operated verification. This document and its script do not provision resources, enable APIs, alter IAM, create secrets, change billing, or deploy the service.

## Fixed target

Use only the owner-designated project: fresh-weft-447913-u6. Do not create a replacement project.

## Run the read-only inventory

Requirements: Google Cloud CLI, an interactively authenticated account with read access, and Bash 3.2 or newer (including the macOS system Bash).

    bash scripts/gcp-readonly-preflight.sh

If a region has already been selected and approved, set it explicitly:

    USEIT_GCP_REGION=YOUR_APPROVED_REGION bash scripts/gcp-readonly-preflight.sh

The script reads project metadata, billing linkage, enabled APIs, Firestore databases, Secret Manager secret names, Workload Identity Federation pools, Artifact Registry repositories, Logging sinks, Monitoring notification channels, and (only when a region is supplied) Cloud Run services.

It never reads secret versions or secret payloads. It does not call create, enable, deploy, IAM mutation, budget mutation, Terraform apply, or Terraform destroy commands. Failed read-only calls are reported as unverified and produce a non-zero exit status.

## Required owner Console checks

1. Select project fresh-weft-447913-u6 in Google Cloud Console. Confirm the project ID, project number, lifecycle state, and owner access.
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

The current mainline backend still uses Redis for production rate-limit and attestation challenge state and does not yet have the Firestore idempotency adapter wired into the canonical analysis route. Do not deploy this configuration as production-ready. Firestore transactional idempotency, rate-limit and attestation adapters must pass emulator-backed multi-client concurrency, expiry/TTL, failure-mode and multi-instance tests first. Production must have no in-memory fallback.

The existing FastAPI backend, OpenAI adapter, and POST /v1/useit/analyze remain canonical. OpenAI is the only AI provider. Images remain on the phone and are sent only with the current analysis request. No server-side image storage is part of this design.

## Human gate before provisioning

The owner must first verify project/billing/SKU eligibility and approve the region, monthly budget, alert recipients, and initial staging resource list. Only then may a separately reviewed Terraform/CLI deployment plan be applied. Production deployment, data migration, public-ingress changes, and paid resource creation remain separate approval gates.
