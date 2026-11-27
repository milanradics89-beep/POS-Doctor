import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const script = readFileSync(new URL('./gcp-readonly-preflight.sh', import.meta.url), 'utf8');

describe('USEIT GCP read-only preflight', () => {
  it('pins the only permitted project ID to the owner-specified literal', () => {
    expect(script).toContain('readonly OWNER_PROJECT_ID="useit-platform-2026"');
    expect(script).toContain('readonly PROJECT_ID="${USEIT_GCP_PROJECT_ID:-}"');
    expect(script).not.toContain('OWNER_PROJECT_NAME');
    expect(script).not.toContain('fresh-weft-447913-u6');
    expect(script).not.toContain('fresh-weft-447913-u6');
  });

  it('rejects every project ID other than the exact owner-specified literal before gcloud', () => {
    const ownerGuard = script.indexOf('if [[ "$PROJECT_ID" != "$OWNER_PROJECT_ID" ]]');
    const syntaxGuard = script.indexOf('if [[ ! "$PROJECT_ID" =~');
    const gcloudAvailabilityCheck = script.indexOf('command -v gcloud');
    expect(ownerGuard).toBeGreaterThan(-1);
    expect(ownerGuard).toBeLessThan(syntaxGuard);
    expect(syntaxGuard).toBeLessThan(gcloudAvailabilityCheck);
    expect(script).toContain("Only the owner-specified project ID 'useit-platform-2026' is permitted.");
    expect(script).toContain('No gcloud command was executed.');
  });

  it('validates the canonical project ID against Google Cloud syntax before gcloud', () => {
    const syntax = /^([a-z][a-z0-9-]{4,28}[a-z0-9])$/;
    expect(syntax.test('useit-platform-2026')).toBe(true);
    expect(syntax.test('useit')).toBe(false);
    expect(script).toContain('Google Cloud project IDs must be 6 to 30 lowercase letters');
    const syntaxGuard = script.indexOf('if [[ ! "$PROJECT_ID" =~');
    expect(syntaxGuard).toBeLessThan(script.indexOf('command -v gcloud'));
  });

  it('does not discover projects by display name or substitute another project', () => {
    expect(script).not.toContain('gcloud projects list');
    expect(script).not.toContain('OWNER_PROJECT_NAME');
    expect(script).not.toContain('PROJECT_NAME=');
    expect(script).not.toContain('gcloud projects describe "$PROJECT_ID" --format=\'value(name)\'');
  });

  it('supports the macOS system Bash 3.2 without Bash-4-only array helpers', () => {
    expect(script).toContain('ACTIVE_ACCOUNTS=()');
    expect(script).toContain('while IFS= read -r account; do');
    expect(script).not.toContain('mapfile');
    expect(script).not.toContain('readarray');
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
