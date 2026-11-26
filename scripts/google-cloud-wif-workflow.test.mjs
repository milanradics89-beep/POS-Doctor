import { readFileSync } from 'node:fs';
import { parse } from 'yaml';
import { describe, expect, it } from 'vitest';

const workflowText = readFileSync(new URL('../.github/workflows/google-cloud-wif-test.yml', import.meta.url), 'utf8');
const workflow = parse(workflowText);

const expectedActionPins = [
  'actions/checkout@93cb6efe18208431cddfb8368fd83d5badbf9bfd',
  'google-github-actions/auth@c200f3691d83b41bf9bbd8638997a462592937ed',
  'google-github-actions/setup-gcloud@e427ad8a34f8676edf47cf7d7925499adf3eb74f',
];

describe('Google Cloud WIF workflow security', () => {
  it('allows only the manual trigger, exact permissions, job and pinned steps', () => {
    expect(workflow.on).toEqual({ workflow_dispatch: null });
    expect(workflow.permissions).toEqual({
      contents: 'read',
      'id-token': 'write',
    });
    expect(Object.keys(workflow.jobs)).toEqual(['authenticate']);

    const job = workflow.jobs.authenticate;
    expect(Object.keys(job).sort()).toEqual([
      'name',
      'runs-on',
      'steps',
      'timeout-minutes',
    ].sort());
    expect(job.uses).toBeUndefined();
    expect(job.steps).toHaveLength(4);
    expect(job.steps.map((step) => step.name)).toEqual([
      'Checkout',
      'Authenticate with Workload Identity Federation',
      'Set up Google Cloud CLI',
      'Verify authenticated identity',
    ]);
    expect(job.steps.map((step) => step.uses ?? null)).toEqual([
      expectedActionPins[0],
      expectedActionPins[1],
      expectedActionPins[2],
      null,
    ]);
    expect(job.steps.map((step) => Object.keys(step).sort())).toEqual([
      ['name', 'uses', 'with'].sort(),
      ['name', 'uses', 'with'].sort(),
      ['name', 'uses'].sort(),
      ['name', 'run', 'shell'].sort(),
    ]);
    expect(job.steps[0].with).toEqual({ 'persist-credentials': false });
    expect(job.steps[1].with).toEqual({
      workload_identity_provider: '${{ vars.WIF_PROVIDER }}',
      service_account: '${{ vars.WIF_SERVICE_ACCOUNT }}',
      create_credentials_file: true,
    });
    expect(job.steps[3].shell).toBe('bash');
    expect(workflowText).not.toContain('secrets.');
  });

  it('allows only the read-only authentication verification commands', () => {
    const verifyStep = workflow.jobs.authenticate.steps.find(
      (step) => step.name === 'Verify authenticated identity',
    );
    expect(verifyStep).toBeDefined();

    const commands = verifyStep.run
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);

    expect(commands).toEqual([
      'set -euo pipefail',
      'test -n "${GOOGLE_APPLICATION_CREDENTIALS:-}"',
      'test -f "$GOOGLE_APPLICATION_CREDENTIALS"',
      "gcloud auth list --filter=status:ACTIVE --format='value(account)' | grep -q .",
      'echo "Workload Identity Federation authentication succeeded."',
    ]);
  });
});
