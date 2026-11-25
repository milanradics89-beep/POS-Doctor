import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const security = readFileSync(new URL('../.github/workflows/code-quality-security.yml', import.meta.url), 'utf8');
const recovery = readFileSync(new URL('../.github/workflows/ci-auto-recovery.yml', import.meta.url), 'utf8');
const verdictScript = fileURLToPath(new URL('./assert-fallow-audit-verdict.mjs', import.meta.url));

function jobBlock(source, name) {
  const start = source.match(new RegExp(`^  ${name}:\\n`, 'm'));
  if (!start) return '';
  const contentStart = start.index + start[0].length;
  const remainder = source.slice(contentStart);
  const nextJob = remainder.search(/^  [A-Za-z0-9_-]+:\\n/m);
  return nextJob < 0 ? remainder : remainder.slice(0, nextJob);
}

describe('security workflow enforcement', () => {
  it('wires the actual Fallow audit verdict to a fail-closed gate', () => {
    const fallow = jobBlock(security, 'fallow');
    expect(fallow).toContain('id: fallow-audit');
    expect(fallow).toContain('command: audit');
    expect(fallow).toContain('fail-on-issues: true');
    expect(fallow).toContain('FALLOW_AUDIT_VERDICT: ${{ steps.fallow-audit.outputs.verdict }}');
    expect(fallow).toContain('node scripts/assert-fallow-audit-verdict.mjs');
  });

  it.each([
    ['pass', 0],
    ['warn', 1],
    ['fail', 1],
    ['', 1],
  ])('accepts only the pass verdict (%s)', (verdict, expectedStatus) => {
    const result = spawnSync(process.execPath, [verdictScript], {
      encoding: 'utf8',
      env: { ...process.env, FALLOW_AUDIT_VERDICT: verdict },
    });
    expect(result.status).toBe(expectedStatus);
  });

  it('fails closed when Fallow does not publish a verdict', () => {
    const env = { ...process.env };
    delete env.FALLOW_AUDIT_VERDICT;
    const result = spawnSync(process.execPath, [verdictScript], { encoding: 'utf8', env });
    expect(result.status).toBe(1);
    expect(result.stderr).toContain('missing');
  });

  it('runs Semgrep with the error exit policy in the active job', () => {
    const semgrep = jobBlock(security, 'semgrep');
    expect(semgrep).toContain('semgrep scan --config p/ci --error --metrics=off /src');
  });

  it('preserves queued recovery reports in the active concurrency policy', () => {
    const concurrency = recovery.match(/^concurrency:\\n([\\s\\S]*?)(?=^jobs:\\n)/m)?.[1] ?? '';
    expect(concurrency).toMatch(/^\\s+cancel-in-progress:\\s*false\\s*$/m);
    expect(concurrency).toMatch(/^\\s+queue:\\s*max\\s*$/m);
  });
});
