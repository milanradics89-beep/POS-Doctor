import { chmodSync, existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { delimiter, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const script = readFileSync(new URL('./gcp-readonly-preflight.sh', import.meta.url), 'utf8');
const scriptPath = fileURLToPath(new URL('./gcp-readonly-preflight.sh', import.meta.url));

function runWithFakeGcloud(projectId) {
  const temp = mkdtempSync(join(tmpdir(), 'useit-gcp-preflight-'));
  try {
    const callLog = join(temp, 'gcloud-calls.log');
    const fakeGcloud = join(temp, 'gcloud');
    writeFileSync(fakeGcloud, String.raw`#!/bin/sh
printf '%s\n' "$*" >> "$FAKE_GCLOUD_CALL_LOG"
if [ "$1" = "auth" ] && [ "$2" = "list" ]; then
  printf 'ci@example.test\n'
fi
exit 0
`);
    chmodSync(fakeGcloud, 0o755);
    const result = spawnSync('/bin/bash', [scriptPath], {
      encoding: 'utf8',
      env: {
        ...process.env,
        PATH: `${temp}${delimiter}${process.env.PATH ?? ''}`,
        USEIT_GCP_PROJECT_ID: projectId,
        FAKE_GCLOUD_CALL_LOG: callLog,
        USEIT_GCP_REGION: '',
      },
    });
    const calls = existsSync(callLog)
      ? readFileSync(callLog, 'utf8').split(/\r?\n/).filter(Boolean)
      : [];
    return { status: result.status, stdout: result.stdout, stderr: result.stderr, calls, error: result.error };
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }
}

describe('USEIT GCP read-only preflight', () => {
  it('pins the only permitted project ID to the owner-confirmed canonical ID', () => {
    expect(script).toContain('readonly OWNER_PROJECT_ID="useit-platform-2026"');
    expect(script).toContain('readonly PROJECT_ID="${USEIT_GCP_PROJECT_ID:-}"');
    expect(script).not.toContain('OWNER_PROJECT_NAME');
    expect(script).not.toContain('fresh-weft-447913-u6');
  });

  it('rejects every project ID other than the exact owner-confirmed ID before gcloud', () => {
    const ownerGuard = script.indexOf('if [[ "$PROJECT_ID" != "$OWNER_PROJECT_ID" ]]');
    const syntaxGuard = script.indexOf('if [[ ! "$PROJECT_ID" =~');
    const gcloudAvailabilityCheck = script.indexOf('command -v gcloud');
    expect(ownerGuard).toBeGreaterThan(-1);
    expect(ownerGuard).toBeLessThan(syntaxGuard);
    expect(syntaxGuard).toBeLessThan(gcloudAvailabilityCheck);
    expect(script).toContain("Only the owner-specified project ID 'useit-platform-2026' is permitted.");
    expect(script).toContain('No gcloud command was executed.');
  });

  it.each(['not-the-approved-project', 'useit'])(
    'rejects unapproved ID "%s" before executing any gcloud command',
    (projectId) => {
      const result = runWithFakeGcloud(projectId);
      expect(result.status).toBe(2);
      expect(result.error).toBeUndefined();
      expect(result.calls).toEqual([]);
      expect(result.stderr).toContain('No gcloud command was executed.');
    },
  );

  it('runs the read-only inventory after the exact approved ID passes the guard', () => {
    const result = runWithFakeGcloud('useit-platform-2026');
    expect(result.status).toBe(0);
    expect(result.error).toBeUndefined();
    expect(result.calls).toContain('projects describe useit-platform-2026 --format=yaml(projectId,projectNumber,name,lifecycleState)');
    expect(result.calls.some((call) => call.startsWith('auth list '))).toBe(true);
    expect(result.stdout).toContain('PREFLIGHT COMPLETE');
    expect(result.calls.some((call) => /\b(?:create|deploy|delete|enable|add-iam-policy-binding)\b/.test(call))).toBe(false);
  });

  it('validates the canonical project ID against Google Cloud syntax before gcloud', () => {
    const syntax = /^([a-z][a-z0-9-]{4,28}[a-z0-9])$/;
    expect(syntax.test('useit-platform-2026')).toBe(true);
    expect(syntax.test('useit')).toBe(false);
    expect(script).toContain('Google Cloud project ID syntax: IDs must be 6 to 30 lowercase letters');
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
