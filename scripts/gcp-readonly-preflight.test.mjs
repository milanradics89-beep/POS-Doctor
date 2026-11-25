import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const script = readFileSync(new URL('./gcp-readonly-preflight.sh', import.meta.url), 'utf8');

describe('USEIT GCP read-only preflight', () => {
  it('pins the owner-designated project and requires an active credential', () => {
    expect(script).toContain('readonly PROJECT_ID="fresh-weft-447913-u6"');
    expect(script).toContain('gcloud auth list --filter=status:ACTIVE');
    expect(script).toContain('No active gcloud credential');
  });

  it('inventories the approved infrastructure without reading secret values', () => {
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

  it('does not invent a region and reports credits and SKU eligibility as manual checks', () => {
    expect(script).toContain('USEIT_GCP_REGION');
    expect(script).toContain('Choose and approve a region');
    expect(script).toContain('Current credit balance, expiry, and eligible SKUs are not established');
  });
});
