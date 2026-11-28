# USEIT GCP read-only preflight

**Status: BLOCKED.** No GCP API or `gcloud` operation is authorized in the current project-identity state.

## Current project identity

- Owner-specified product/project label: `USEIT` (`useit`).
- Exact existing Google Cloud project ID: unresolved.
- Google Cloud project number: unresolved.

The literal `useit` is five characters. Google Cloud project IDs must be 6–30 characters, so `useit` is not a valid project ID. The current controlling instruction does not authorize another project or provide a valid existing project ID. Do not infer one from the display name, discover projects by name, or substitute any historical or similarly named project.

## Fail-closed preflight behavior

`scripts/gcp-readonly-preflight.sh` intentionally exits with status 2 before checking credentials or invoking `gcloud` when given the literal `useit`. It also rejects every alternate value because no alternate project ID is authorized.

The focused shell tests use a fake `gcloud` executable and assert that the call log remains empty for the owner-specified label, missing input, and syntactically valid but unauthorized project IDs.

**Do not run a live read-only inventory yet.** A future controlling instruction must supply the exact valid ID of an existing project and separately authorize the read-only verification. That instruction must not be inferred from old PR text, display names, project numbers, screenshots, or historical comments.

## Verification required after explicit authorization

Only after the exact existing project ID is supplied and read-only verification is authorized:

1. Verify the exact project ID, project number and lifecycle state.
2. Verify billing-account linkage, current credit balance, expiry and eligible SKUs. Historical credit screenshots are not current evidence.
3. Agree the monthly budget, worst-case exposure, notification recipients and alert thresholds. Budget alerts notify; they do not cap spend.
4. Approve a region and Firestore database location, including data-residency requirements.
5. Review existing IAM. Keep deployment identity separate from the Cloud Run runtime identity; do not grant project Owner or Editor.
6. Review Secret Manager secret names and access policies only. Never read or print secret payloads.
7. Review Workload Identity Federation restrictions for `milanradics89-beep/USEIT`, the protected branch and approved environment. Use short-lived OIDC credentials, not service-account JSON keys.
8. Review Cloud Run ingress, minimum instances 0, maximum instances, concurrency, timeout, memory and request-based billing.

Read-only verification is not authorization to provision resources, enable APIs, change billing or IAM, create or mutate secrets, change TTL policies, or deploy. Each such operation requires separate approval.

## Current code readiness constraints

The current mainline has the camera-to-API client path and canonical FastAPI endpoint, but live App Preview acceptance remains blocked until an approved real HTTPS staging URL exists and is configured as `EXPO_PUBLIC_USEIT_API_URL` in Codemagic. Do not use localhost or a placeholder.

Cloud Run requires the Firestore mode described in [the release register](RELEASE-REGISTER.md). Local emulator results do not attest to production IAM, TTL, billing or data migration.

The existing FastAPI backend, OpenAI adapter, and `POST /v1/useit/analyze` remain canonical. OpenAI is the only AI provider. Images remain on the user's phone and are sent only with the current analysis request. No server-side image storage is part of this design.

## Human gate before provisioning

The owner must first provide a valid exact ID for an existing project in a new controlling instruction and explicitly authorize the required verification. Billing/SKU eligibility, approved region, monthly budget, alert recipients, IAM/WIF and the initial staging resource list must then be reviewed. Only a separately reviewed and approved deployment plan may provision resources. Production deployment, data migration, public-ingress changes and paid resource creation remain separate approval gates.
