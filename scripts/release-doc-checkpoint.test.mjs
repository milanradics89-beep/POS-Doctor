import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const documents = [
  'docs/25-POINT-RELEASE-BACKLOG.md',
  'docs/RELEASE_RUNBOOK.md',
  'docs/RELEASE_PILOT_ACCEPTANCE.md',
].map((path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8'));

const marker = '## Exact-head reconciliation — 2026-11-16 04:44 CET';
const latestSections = documents.map((document) => {
  const start = document.lastIndexOf(marker);
  return start < 0 ? '' : document.slice(start);
});

describe('release documentation exact-head checkpoint', () => {
  it('keeps the latest parent SHA and all three workflow run IDs aligned', () => {
    expect(latestSections.every(Boolean)).toBe(true);
    for (const section of latestSections) {
      expect(section).toContain('796f3b1b3dfc054850dd7410bce6fa27aa0fd108');
      expect(section).toContain('43798173113');
      expect(section).toContain('43798173142');
      expect(section).toContain('43798173099');
      expect(section).toContain('2 Done / 15 In Progress / 8 Blocked');
    }
  });

  it('keeps automated validation separate from human and production acceptance', () => {
    for (const section of latestSections) {
      expect(section).toContain('RELEASE NOT READY');
      expect(section).toContain('PRODUCTION/PILOT ACCEPTANCE NOT GRANTED');
      expect(section).toContain('human');
    }
  });
});
