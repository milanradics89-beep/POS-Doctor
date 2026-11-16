import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const documents = [
  'docs/25-POINT-RELEASE-BACKLOG.md',
  'docs/RELEASE_RUNBOOK.md',
  'docs/RELEASE_PILOT_ACCEPTANCE.md',
].map((path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8'));

const marker = '## Exact-head reconciliation — 2026-11-16 19:30 CET';
const latestSections = documents.map((document) => {
  const start = document.lastIndexOf(marker);
  return start < 0 ? '' : document.slice(start);
});

const extractValidatedParentPair = (section) => ({
  parent: section.match(/PR #85 pre-write(?: parent)? HEAD is `([0-9a-f]{40})`/)?.[1],
  validated: section.match(/These exact-head runs (?:belong to|validate) PR #85 pre-write(?: parent)? HEAD `([0-9a-f]{40})` only/)?.[1],
});

const misleadingZeroAuditClaim = /npm audit\b[^.\n]*(?:returned|reported|reports?)\s+(?:\*\*)?0 vulnerabilities\b/i;

describe('release documentation exact-head checkpoint', () => {
  it('labels the verified pre-write parent and never misrepresents it as the new child', () => {
    expect(latestSections.every(Boolean)).toBe(true);
    const pairs = latestSections.map(extractValidatedParentPair);
    for (const pair of pairs) {
      expect(pair.parent).toMatch(/^[0-9a-f]{40}$/);
      expect(pair.validated).toBe(pair.parent);
    }
    expect(new Set(pairs.map((pair) => pair.parent)).size).toBe(1);
    expect(new Set(latestSections).size).toBe(1);
    const childGate = 'The resulting documentation child must pass its own exact-head Validation, CodeQL, and Dependency Review; the pre-write runs do not validate the child.';
    for (const section of latestSections) expect(section).toContain(childGate);
  });

  it('detects a split-brain pre-write parent evidence pair', () => {
    const mismatched = 'PR #85 pre-write parent HEAD is `796f3b1b3dfc054850dd7410bce6fa27aa0fd108`.\nThese exact-head runs validate PR #85 pre-write parent HEAD `0000000000000000000000000000000000000000` only.';
    const pair = extractValidatedParentPair(mismatched);
    expect(pair.parent).toMatch(/^[0-9a-f]{40}$/);
    expect(pair.validated).not.toBe(pair.parent);
  });

  it('keeps exact-head workflow IDs, checklist count, live inventory and release tally aligned', () => {
    for (const section of latestSections) {
      expect(section).toContain('43917494857');
      expect(section).toContain('43917494516');
      expect(section).toContain('43917494739');
      expect(section).toMatch(/Validation \[43917494857\](?:\([^)]+\))?: FAILURE/);
      expect(section).toMatch(/CodeQL \[43917494516\](?:\([^)]+\))?: SUCCESS/);
      expect(section).toMatch(/Dependency Review \[43917494739\](?:\([^)]+\))?: SUCCESS/);
      expect(section).toContain('Issue #74 persisted checklist: 64 items, 39 checked / 25 open');
      expect(section).toMatch(/84 branches, 43 open PRs(?:,| and) 6 open non-PR issues/);
      expect(section).toContain('2 Done / 15 In Progress / 8 Blocked');
    }
  });

  it('reports npm audit findings without misclassifying the configured threshold', () => {
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
      expect(section).toContain('0 human APPROVED reviews');
    }
  });
});
