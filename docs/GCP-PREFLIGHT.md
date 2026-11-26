# USEIT GCP read-only preflight

**Canonical project:** `useit-platform-2026`  
**Project number:** `386862694550`  
**Last reconciled:** 2026-11-26

This runbook is read-only. It does not provision resources, enable APIs, alter IAM, create secrets, change billing or deploy services.

## Project identity

- Use only project ID `useit-platform-2026`.
- Expected project number: `386862694550`.
- Do not use `fresh-weft-447913-u6`.
- The short label `useit` is not the project ID and must not be passed to gcloud as `--project`.
- Never create a replacement project.

## Recorded configuration to verify

| Resource | Identifier | Recorded setup |
|---|---|---|
| Cloud Run Admin API | `run.googleapis.com` | Enabled |
| Artifact Registry API | `artifactregistry.googleapis.com` | Enabled |
| Secret Manager secret | `openai-api-key` | Created; version 1 Enabled |
| Runtime service account | `useit-cloud-run-runtime@useit-platform-2026.iam.gserviceaccount.com` | Created |
| Secret permission | `roles/secretmanager.secretAccessor` | Runtime identity on `openai-api-key` only |
| Deployer service account ID | `useit-github-deployer` | Recorded; verify full email and effective IAM |
| Budget | `USEIT-Pilot-Budget` | USD 20/month; alerts 50/80/100% |
| Welcome credit | USD 300 | Historical; recheck current balance |
| Credit expiry | 2027-02-23 | Historical; recheck in Billing |

Do not read Secret Manager secret payloads or versions. Only inspect metadata and IAM bindings.

## Read-only verification commands

Run from an authenticated shell with read permissions, after confirming the active account:

```bash
gcloud config get-value account
gcloud projects describe useit-platform-2026   --format='yaml(projectId,projectNumber,lifecycleState)'
gcloud billing projects describe useit-platform-2026
gcloud services list --enabled --project=useit-platform-2026   --filter='config.name:(run.googleapis.com OR artifactregistry.googleapis.com)'
gcloud iam service-accounts list --project=useit-platform-2026
gcloud secrets describe openai-api-key --project=useit-platform-2026
gcloud secrets get-iam-policy openai-api-key --project=useit-platform-2026
gcloud billing budgets list --billing-account=BILLING_ACCOUNT_ID
```

Replace `BILLING_ACCOUNT_ID` only with the billing account actually linked to the canonical project. Do not guess it. Do not run commands that create, enable, deploy, mutate IAM/billing or reveal secret payloads.

## Identifiers not yet established

The following must be read from live configuration rather than invented:

- Cloud Run service name, region, URL, revision and image digest.
- Artifact Registry repository name, region and image path.
- WIF pool/provider IDs, provider resource name, attribute conditions and principalSet.
- Full deployer service-account email and effective IAM roles.
- Firestore database/location or Redis endpoint.
- Codemagic `EXPO_PUBLIC_USEIT_API_URL` and a successful authenticated photo-analysis request.

## Human approval gates

No staging deployment, production deployment, paid resource creation/expansion, billing change, IAM mutation or production data migration without explicit owner approval. Cloud Run deployment remains blocked until shared Redis state and encrypted SQLite persistence have a validated production design or a tested replacement.
