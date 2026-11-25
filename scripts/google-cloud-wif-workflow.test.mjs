import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const workflow = readFileSync(new URL('../.github/workflows/google-cloud-wif-test.yml', import.meta.url), 'utf8');

function topLevelBlock(key) {
  const lines = workflow.split(/\r?\n/);
  const start = lines.findIndex((line) => line === `${key}:`);
  expect(start, `missing top-level ${key}: block`).toBeGreaterThanOrEqual(0);

  let end = start + 1;
  while (end < lines.length && !/^[A-Za-z_][A-Za-z0-9_-]*:/.test(lines[end])) {
    end += 1;
  }
  return lines.slice(start + 1, end).filter((line) => line.trim().length > 0);
}

describe('Google Cloud WIF workflow security', () => {
  it('checks out the repository before creating workspace credentials with immutable action pins', () => {
    const checkout = workflow.indexOf('uses: actions/checkout@93cb6efe18208431cddfb8368fd83d5badbf9bfd');
    const auth = workflow.indexOf('uses: google-github-actions/auth@c200f3691d83b41bf9bbd8638997a462592937ed');
    const setup = workflow.indexOf('uses: google-github-actions/setup-gcloud@e427ad8a34f8676edf47cf7d7925499adf3eb74f');

    expect(checkout).toBeGreaterThan(-1);
    expect(auth).toBeGreaterThan(checkout);
    expect(setup).toBeGreaterThan(auth);
    expect(workflow).toContain('persist-credentials: false');
    expect(workflow).toContain('create_credentials_file: true');
  });

  it('allows only workflow_dispatch with the exact least-privilege permission map', () => {
    expect(topLevelBlock('on')).toEqual(['  workflow_dispatch:']);
    expect(topLevelBlock('permissions')).toEqual([
      '  contents: read',
      '  id-token: write',
    ]);
    expect(workflow).toContain('vars.WIF_PROVIDER');
    expect(workflow).toContain('vars.WIF_SERVICE_ACCOUNT');
    expect(workflow).not.toContain('secrets.');
  });

  it('allows only the read-only authentication verification shell commands', () => {
    const lines = workflow.split(/\r?\n/);
    const runKeyIndexes = lines.flatMap((line, index) => /^ {8}run:/.test(line) ? [index] : []);

    expect(runKeyIndexes).toHaveLength(1);

    const start = runKeyIndexes[0];
    let end = start + 1;
    while (end < lines.length && (lines[end].trim() === '' || /^ {10}\S/.test(lines[end]))) {
      end += 1;
    }

    const commands = lines
      .slice(start + 1, end)
      .filter((line) => line.trim().length > 0)
      .map((line) => line.slice(10).trim());

    expect(commands).toEqual([
      'set -euo pipefail',
      'test -n "${GOOGLE_APPLICATION_CREDENTIALS:-}"',
      'test -f "$GOOGLE_APPLICATION_CREDENTIALS"',
      "gcloud auth list --filter=status:ACTIVE --format='value(account)' | grep -q .",
      'echo "Workload Identity Federation authentication succeeded."',
    ]);
  });
});
