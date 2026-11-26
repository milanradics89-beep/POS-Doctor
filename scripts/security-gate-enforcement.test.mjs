import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const security = readFileSync(new URL('../.github/workflows/code-quality-security.yml', import.meta.url), 'utf8');
const validation = readFileSync(new URL('../.github/workflows/validate.yml', import.meta.url), 'utf8');
const recovery = readFileSync(new URL('../.github/workflows/ci-auto-recovery.yml', import.meta.url), 'utf8');
const verdictScript = fileURLToPath(new URL('./assert-fallow-audit-verdict.mjs', import.meta.url));

function jobBlock(source, name) {
  const lines = source.split(/\r?\n/);
  const start = lines.findIndex((line) => line === '  ' + name + ':');
  if (start < 0) return '';
  const nextJob = lines.findIndex(
    (line, index) => index > start && /^  [A-Za-z0-9_-]+:$/.test(line),
  );
  const end = nextJob < 0 ? lines.length : nextJob;
  return lines.slice(start + 1, end).join('\n');
}

function assertActiveSemgrepGate(source) {
  const frontend = jobBlock(source, 'frontend');
  const requiredCommand = 'semgrep scan --config p/ci --error --metrics=off /src';
  if (!frontend.includes(requiredCommand)) {
    throw new Error('Required Semgrep command is missing from the active frontend job.');
  }
}
describe('security workflow enforcement', () => {
  it('wires the actual Fallow audit verdict to a fail-closed gate', () => {
    const frontend = jobBlock(validation, 'frontend');
    expect(frontend).toContain('id: fallow-audit');
    expect(frontend).toContain('command: audit');
    expect(frontend).toContain('fail-on-issues: true');
    expect(frontend).toContain('FALLOW_AUDIT_VERDICT: ${{ steps.fallow-audit.outputs.verdict }}');
    expect(frontend).toContain('node scripts/assert-fallow-audit-verdict.mjs');
    expect(jobBlock(security, 'fallow')).toBe('');
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
    expect(() => assertActiveSemgrepGate(validation)).not.toThrow();
    expect(jobBlock(security, 'semgrep')).toBe('');
  });

  it('does not accept the Semgrep command when it appears only in a later job', () => {
    const requiredCommand = 'semgrep scan --config p/ci --error --metrics=off /src';
    const withoutActiveCommand = validation.replace(requiredCommand, 'echo active Semgrep command missing');
    const laterOnly = `${withoutActiveCommand}
  semgrep_fallback:
    name: Disabled fallback Semgrep job
    steps:
      - name: Scan
        run: ${requiredCommand}
`;

    expect(() => assertActiveSemgrepGate(laterOnly)).toThrow(
      'Required Semgrep command is missing from the active frontend job.',
    );
    expect(jobBlock(laterOnly, 'frontend')).not.toContain(requiredCommand);
    expect(jobBlock(laterOnly, 'semgrep_fallback')).toContain(requiredCommand);
  });

  it('preserves queued recovery reports in the active concurrency policy', () => {
    const concurrency = recovery.match(/^concurrency:\n([\s\S]*?)(?=^jobs:\n)/m)?.[1] ?? '';
    expect(concurrency).toMatch(/^\s+cancel-in-progress:\s*false\s*$/m);
    expect(concurrency).toMatch(/^\s+queue:\s*max\s*$/m);
  });
});
