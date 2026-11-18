import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const documents = [
  'docs/25-POINT-RELEASE-BACKLOG.md',
  'docs/RELEASE_RUNBOOK.md',
  'docs/RELEASE_PILOT_ACCEPTANCE.md',
].map((path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8'));

const marker = '## Exact-head reconciliation — 2026-11-18 23:22 CET';
const latestSections = documents.map((document) => {
  const start = document.lastIndexOf(marker);
  if (start < 0) return '';
  const end = document.indexOf('\n\n---\n\n', start);
  return document.slice(start, end < 0 ? document.length : end);
});

describe('release documentation exact-head checkpoint', () => {
  it('keeps the latest checkpoint identical across all three release records', () => {
    expect(latestSections.every(Boolean)).toBe(true);
    expect(new Set(latestSections).size).toBe(1);
  });

  it('binds PR #85 evidence to its current exact HEAD and parent', () => {
    for (const section of latestSections) {
      expect(section).toContain('Current PR #85 exact HEAD: `b0ca7a162ec2d1ea8e6b88858975b4a63eb57c69`');
      expect(section).toContain('Exact pre-write parent HEAD: `c1d2cfdfbaffbeb7a7e7586d57b3971a7d1a844a`');
      expect(section).toContain('Validation [44404045347]');
      expect(section).toContain('terminal FAILURE');
      expect(section).toContain('CodeQL [44404045539]');
      expect(section).toContain('Dependency Review [44404045274]');
      expect(section).toContain('294 passed / 5 failed');
      expect(section).toContain('60/61 test files passed');
      expect(section).toContain('Runtime npm audit is **SKIPPED**, not passed or failed.');
      expect(section).not.toMatch(/Runtime npm audit[^\n]*SUCCESS/i);
    }
  });

  it('records PR #41 merged exact-head evidence and review resolution', () => {
    for (const section of latestSections) {
      expect(section).toContain('PR #41 is CLOSED/MERGED on `fix/release-blockers-2026-10`');
      expect(section).toContain('68b380e73ca3c870048035197beef8febbf90ef1');
      expect(section).toContain('26 submissions (25 COMMENTED, 1 human APPROVED), 22/22 inline threads resolved.');
      expect(section).toContain('43098210284');
      expect(section).toContain('43098210473');
      expect(section).toContain('43098210255');
    }
  });

  it('preserves the canonical release register and external blockers', () => {
    for (const section of latestSections) {
      expect(section).toContain('2 Done / 15 In Progress / 8 Blocked');
      expect(section).toContain('64 items / 41 checked / 23 open');
      expect(section).toContain('No checkbox changed.');
      expect(section).toContain('External console setup, physical-device tests, production cloud access, witnessed backup/restore, staged rollout approvals and real-user pilot/business approval remain BLOCKED');
      expect(section).toContain('RELEASE NOT READY. PRODUCTION/PILOT ACCEPTANCE NOT GRANTED.');
    }
  });

  it('does not overstate security or release evidence', () => {
    for (const section of latestSections) {
      expect(section).toContain('WITHDRAWN on 2026-11-18');
      expect(section).toContain('unverified, not empty');
      expect(section).toContain('3 moderate minimatch findings');
      expect(section).toContain('current child');
      expect(section).toContain('0 published GitHub releases');
      expect(section).toContain('Production acceptance remains BLOCKED');
    }
  });
});
