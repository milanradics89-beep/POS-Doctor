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

const extractParentHeadPair = (section) => ({
  source: section.match(/PR #85 source HEAD immediately before this documentation-only child is `([0-9a-f]{40})`/)?.[1],
  validated: section.match(/These three runs validate parent HEAD `([0-9a-f]{40})` only/)?.[1],
});

describe('release documentation exact-head checkpoint', () => {
  it('compares the source and validated parent SHA labels in every document', () => {
    expect(latestSections.every(Boolean)).toBe(true);
    const pairs = latestSections.map(extractParentHeadPair);
    for (const pair of pairs) {
      expect(pair.source).toMatch(/^[0-9a-f]{40}$/);
      expect(pair.validated).toBe(pair.source);
    }
    expect(new Set(pairs.map((pair) => pair.source)).size).toBe(1);
  });

  it('detects a split-brain parent SHA pair', () => {
    const mismatched = `PR #85 source HEAD immediately before this documentation-only child is \`796f3b1b3dfc054850dd7410bce6fa27aa0fd108\`.
These three runs validate parent HEAD \`0000000000000000000000000000000000000000\` only.`;
    const pair = extractParentHeadPair(mismatched);
    expect(pair.source).toMatch(/^[0-9a-f]{40}$/);
    expect(pair.validated).not.toBe(pair.source);
  });

  it('keeps all three workflow run IDs and the release tally aligned', () => {
    for (const section of latestSections) {
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
