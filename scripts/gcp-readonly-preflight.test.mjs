import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const script = readFileSync(new URL('./gcp-readonly-preflight.sh', import.meta.url), 'utf8');

describe('USEIT GCP read-only preflight', () => {
  it('keeps the owner-specified label separate from the exact project ID', () => {
    expect(script).toContain('readonly OWNER_PROJECT_LABEL="useit"');
    expect(script).toContain('readonly PROJECT_ID="${USEIT_GCP_PROJECT_ID:-}"');
    expect(script).toContain('USEIT_GCP_PROJECT_ID only after the owner explicitly confirms');
    expect(script).not.toContain('readonly PROJECT_ID="useit"');
    expect(script).not.toContain('useit-platform-2026');
    expect(script).not.toContain('fresh-weft-447913-u6');
  });

  it('fails closed when the exact project ID is absent, before any gcloud invocation', () => {
    const missingIdGuard = script.indexOf('if [[ -z "$PROJECT_ID" ]]');
    const projectIdGuard = script.indexOf('if [[ ! "$PROJECT_ID" =~');
    const gcloudAvailabilityCheck = script.indexOf('command -v gcloud');
    expect(missingIdGuard).toBeGreaterThan(-1);
    expect(missingIdGuard).toBeLessThan(projectIdGuard);
    expect(projectIdGuard).toBeLessThan(gcloudAvailabilityCheck);
    expect(script).toContain('No gcloud command was executed');
  });

  it('validates a supplied project ID against Google Cloud project ID syntax', () => {
    expect(script).toContain('^[a-z][a-z0-9-]{4,28}[a-z0-9]$');
    expect(script).toContain('Google Cloud project IDs must be 6 to 30 lowercase letters');
  });

  it('supports the macOS system Bash 3.2 without Bash-4-only array helpers', () => {
    expect(script).toContain('ACTIVE_ACCOUNTS=()');
    expect(script).toContain('while IFS= read -r account; do');
    expect(script).not.toMatch(/\b(?:mapfile|readarray)\b/);
  });

  it('contains the approved read-only inventory commands without reading secret values', () => {
    for (const command of [
      'gcloud billing projects describe',
      'gcloud services list --enabled',
      'gcloud firestore databases list',
      'gcloud secrets list',
      'gcloud iam workload-identity-pools list',
      'gcloud artifacts repositories list',
      'gcloud logging sinks list',
      'gcloud monitoring channels list',
      'gcloud run services list',
    ]) {
      expect(script).toContain(command);
    }
    expect(script).toContain('Secret Manager secret names only');
    expect(script).not.toContain('gcloud secrets versions access');
  });

  it('contains no provisioning, billing, IAM mutation or deployment command', () => {
    for (const forbidden of [
      'gcloud projects create',
      'gcloud services enable',
      'gcloud firestore databases create',
      'gcloud secrets create',
      'gcloud secrets versions add',
      'gcloud iam service-accounts create',
      'gcloud projects add-iam-policy-binding',
      'gcloud run deploy',
      'gcloud billing budgets create',
      'terraform apply',
      'terraform destroy',
    ]) {
      expect(script).not.toContain(forbidden);
    }
  });

  it('does not invent a region and reports billing eligibility as a manual check', () => {
    expect(script).toContain('USEIT_GCP_REGION');
    expect(script).toContain('Choose and approve a region');
    expect(script).toContain('Current credit balance, expiry, and eligible SKUs are not established');
  });
});
