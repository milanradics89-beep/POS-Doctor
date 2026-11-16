import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const documents = [
  'docs/25-POINT-RELEASE-BACKLOG.md',
  'docs/RELEASE_RUNBOOK.md',
  'docs/RELEASE_PILOT_ACCEPTANCE.md',
].map((path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8'));

const marker = '## Exact-head reconciliation — 2026-11-16 12:30 CET';
const latestSections = documents.map((document) => {
  const start = document.lastIndexOf(marker);
  return start < 0 ? '' : document.slice(start);
});

const extractParentHeadPair = (section) => ({
  source: section.match(/PR #85 validated parent HEAD is `([0-9a-f]{40})`/)?.[1],
  validated: section.match(/These runs validate parent HEAD `([0-9a-f]{40})` only/)?.[1],
});

const misleadingZeroAuditClaim = /npm audit\b[^.\n]*(?:returned|reported|reports?)\s+(?:\*\*)?0 vulnerabilities\b/i;

describe('release documentation exact-head checkpoint', () => {
  it('compares the source and validated parent SHA labels in every document', () => {
    expect(latestSections.every(Boolean)).toBe(true);
    const pairs = latestSections.map(extractParentHeadPair);
    for (const pair of pairs) {
      expect(pair.source).toMatch(/^[0-9a-f]{40}$/);
      expect(pair.validated).toBe(pair.source);
    }
    expect(new Set(pairs.map((pair) => pair.source)).size).toBe(1);
    expect(new Set(latestSections).size).toBe(1);
  });

  it('detects a split-brain parent SHA pair', () => {
    const mismatched = `PR #85 validated parent HEAD is \`796f3b1b3dfc054850dd7410bce6fa27aa0fd108\`.
These runs validate parent HEAD \`0000000000000000000000000000000000000000\` only.`;
    const pair = extractParentHeadPair(mismatched);
    expect(pair.source).toMatch(/^[0-9a-f]{40}$/);
    expect(pair.validated).not.toBe(pair.source);
  });

  it('keeps exact-head workflow IDs, checklist count and release tally aligned', () => {
    for (const section of latestSections) {
      expect(section).toContain('43850175026');
      expect(section).toContain('43850175048');
      expect(section).toContain('43850174981');
      expect(section).toContain('64 checklist items: 39 checked / 25 open');
      expect(section).toContain('2 Done / 15 In Progress / 8 Blocked');
    }
  });

  it('reports the npm audit findings without misclassifying the threshold', () => {
    for (const section of latestSections) {
      expect(section).toContain('3 moderate / 0 high / 0 critical');
      expect(section).toContain('GHSA-g3hv-75wg-m249');
      expect(section).toContain('does not remove moderate findings');
      expect(section).toContain('Do not describe this command as a zero-vulnerability or clean production-only audit.');
      expect(section).not.toMatch(misleadingZeroAuditClaim);
    }
  });

  it('rejects a false zero-vulnerability claim without rejecting the accurate warning', () => {
    const accurateWarning = 'Do not describe this command as a zero-vulnerability or clean production-only audit.';
    const falseClaim = 'npm audit --omit=dev --audit-level=high returned 0 vulnerabilities.';
    expect(accurateWarning).not.toMatch(misleadingZeroAuditClaim);
    expect(falseClaim).toMatch(misleadingZeroAuditClaim);
  });

  it('keeps automated validation separate from human and production acceptance', () => {
    for (const section of latestSections) {
      expect(section).toContain('RELEASE NOT READY');
      expect(section).toContain('PRODUCTION/PILOT ACCEPTANCE NOT GRANTED');
      expect(section).toContain('No human APPROVED review is recorded');
    }
  });

  it('does not attribute the validated parent runs to this new documentation child', () => {
    for (const section of latestSections) {
      expect(section).toContain('The documentation commit created by this checkpoint is a new child of the validated parent.');
      expect(section).toContain('It must pass its own exact-head Validation, CodeQL and Dependency Review; no child result is inferred or claimed here.');
    }
  });
});
