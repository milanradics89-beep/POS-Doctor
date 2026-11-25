#!/usr/bin/env bash
set -euo pipefail

readonly PROJECT_ID="fresh-weft-447913-u6"
READ_FAILURES=0

fail() {
  printf 'BLOCKED: %s\n' "$1" >&2
  exit "${2:-2}"
}

run_inventory() {
  local label="$1"
  shift
  printf '\n===== %s =====\n' "$label"
  if "$@"; then
    return 0
  else
    local status=$?
    printf 'UNVERIFIED: %s failed with exit code %s; check IAM/API access.\n' "$label" "$status" >&2
    READ_FAILURES=$((READ_FAILURES + 1))
  fi
}

command -v gcloud >/dev/null 2>&1 || fail "Google Cloud CLI (gcloud) is not installed."
mapfile -t ACTIVE_ACCOUNTS < <(gcloud auth list --filter=status:ACTIVE --format='value(account)' 2>/dev/null || true)
[[ ${#ACTIVE_ACCOUNTS[@]} -gt 0 && -n "${ACTIVE_ACCOUNTS[0]}" ]] || fail "No active gcloud credential. Authenticate interactively, then rerun this read-only preflight."

printf 'USEIT GCP READ-ONLY PREFLIGHT\n'
printf 'Target project: %s\n' "$PROJECT_ID"
printf 'Active account: %s\n' "${ACTIVE_ACCOUNTS[0]}"
printf 'Configured gcloud project: '
gcloud config get-value project 2>/dev/null || true
printf '\nNo project, API, IAM, billing, secret, database, service or deployment settings will be changed.\n'

run_inventory "Project identity" \
  gcloud projects describe "$PROJECT_ID" \
  --format='yaml(projectId,projectNumber,name,lifecycleState)'

run_inventory "Billing account linkage (not credit or SKU eligibility)" \
  gcloud billing projects describe "$PROJECT_ID" \
  --format='yaml(projectId,billingAccountName,billingEnabled)'

run_inventory "Enabled APIs" \
  gcloud services list --enabled --project="$PROJECT_ID" --format='value(config.name)'

run_inventory "Firestore databases" \
  gcloud firestore databases list --project="$PROJECT_ID" --format='table(name,locationId,type)'

run_inventory "Secret Manager secret names only" \
  gcloud secrets list --project="$PROJECT_ID" --format='value(name)'

run_inventory "Workload Identity Federation pools" \
  gcloud iam workload-identity-pools list --project="$PROJECT_ID" --location=global --format='table(name,state)'

run_inventory "Artifact Registry repositories" \
  gcloud artifacts repositories list --project="$PROJECT_ID" --location=all --format='table(name,format,location)'

run_inventory "Cloud Logging sinks" \
  gcloud logging sinks list --project="$PROJECT_ID" --format='table(name,destination,disabled)'

run_inventory "Cloud Monitoring notification channels" \
  gcloud monitoring channels list --project="$PROJECT_ID" --format='table(name,displayName,type,enabled)'

if [[ -n "${USEIT_GCP_REGION:-}" ]]; then
  run_inventory "Cloud Run services in explicitly selected region ${USEIT_GCP_REGION}" \
    gcloud run services list --project="$PROJECT_ID" --region="$USEIT_GCP_REGION" --format='table(metadata.name,status.url)'
else
  printf '\n===== Cloud Run services =====\n'
  printf 'SKIPPED: USEIT_GCP_REGION is not set. Choose and approve a region before regional inventory or deployment.\n'
fi

printf '\n===== Manual billing verification still required =====\n'
printf 'Current credit balance, expiry, and eligible SKUs are not established by this script.\n'
printf 'Verify them in Cloud Console > Billing for project %s before approving any spend.\n' "$PROJECT_ID"
printf 'This script did not create resources, enable APIs, read secret versions, alter IAM, or deploy anything.\n'

if [[ "$READ_FAILURES" -gt 0 ]]; then
  printf '\nPREFLIGHT INCOMPLETE: %s read-only inventory command(s) were not verifiable.\n' "$READ_FAILURES" >&2
  exit 3
fi

printf '\nPREFLIGHT COMPLETE: read-only inventory only; no provisioning or billing change performed.\n'
