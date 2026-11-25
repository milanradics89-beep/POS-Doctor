import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const security = readFileSync(new URL('../.github/workflows/code-quality-security.yml', import.meta.url), 'utf8');
const recovery = readFileSync(new URL('../.github/workflows/ci-auto-recovery.yml', import.meta.url), 'utf8');

describe('security workflow enforcement', () => {
  it('fails Fallow audit on findings', () => {
    expect(security).toContain('command: audit');
    expect(security).toContain('fail-on-issues: true');
  });
  it('makes Semgrep findings fail the job', () => {
    expect(security).toContain('semgrep scan --config p/ci --error --metrics=off');
  });
  it('preserves queued recovery reports', () => {
    expect(recovery).toContain('queue: max');
    expect(recovery).toContain('cancel-in-progress: false');
  });
});
