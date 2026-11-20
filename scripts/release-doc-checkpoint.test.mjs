import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const documents = [
  'docs/25-POINT-RELEASE-BACKLOG.md',
  'docs/RELEASE_RUNBOOK.md',
  'docs/RELEASE_PILOT_ACCEPTANCE.md',
].map((path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8'));

const marker = '## Exact-head reconciliation — 2026-11-19 23:31 CET';
const latestSections = documents.map((document) => {
  const start = document.lastIndexOf(marker);
  if (start < 0) return '';
  const end = document.indexOf('\n\n---\n\n', start);
  return document.slice(start, end < 0 ? document.length : end);
});

const extractPreWritePair = (section) => {
  const parent = section.match(/The exact pre-write parent HEAD is (\x60([0-9a-f]{40})\x60|([0-9a-f]{40}))(?:[.\s]|$)/);
  const evidenced = section.match(/These exact-head runs belong to PR #85 pre-write parent HEAD (\x60([0-9a-f]{40})\x60|([0-9a-f]{40})) only/);
  return {
    parent: parent?.[2] ?? parent?.[3],
    evidenced: evidenced?.[2] ?? evidenced?.[3],
  };
};

describe('release documentation exact-head checkpoint', () => {
  it('parses plain and code-formatted SHA labels and rejects malformed backticks', () => {
    const sha = '4d530754caf327dd21d44b2838fd0bb9bb1400a4';
    const tick = String.fromCharCode(96);
    const plain = [
      'The exact pre-write parent HEAD is ' + sha + '.',
      'These exact-head runs belong to PR #85 pre-write parent HEAD ' + sha + ' only.',
    ].join('\n');
    const code = [
      'The exact pre-write parent HEAD is ' + tick + sha + tick + '.',
      'These exact-head runs belong to PR #85 pre-write parent HEAD ' + tick + sha + tick + ' only.',
    ].join('\n');
    const malformed = 'The exact pre-write parent HEAD is ' + tick + sha + '.\n'
      + 'These exact-head runs belong to PR #85 pre-write parent HEAD ' + sha + ' only.';

    expect(extractPreWritePair(plain)).toEqual({ parent: sha, evidenced: sha });
    expect(extractPreWritePair(code)).toEqual({ parent: sha, evidenced: sha });
    expect(extractPreWritePair(malformed)).toEqual({ parent: undefined, evidenced: sha });
  });

  it('keeps the latest checkpoint identical across all three release records', () => {
    expect(latestSections.every(Boolean)).toBe(true);
    expect(new Set(latestSections).size).toBe(1);
  });

  it('binds PR #85, PR #177 and PR #187 evidence to their own exact heads', () => {
    const pairs = latestSections.map(extractPreWritePair);
    expect(pairs.every((pair) => pair.parent === 'b3ac5f20994997c3ebc6dbd771013ed3f20be0b5')).toBe(true);
    expect(pairs.every((pair) => pair.evidenced === pair.parent)).toBe(true);

    for (const section of latestSections) {
      expect(section).toContain('Validation [44515665309](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44515665309) is terminal FAILURE: frontend failed at 299/300 tests; backend and iOS jobs succeeded.');
      expect(section).toContain('CodeQL [44515665215](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44515665215) and Dependency Review [44515665613](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44515665613) are terminal SUCCESS');
      expect(section).toContain('PR #177 is OPEN/DRAFT on `fix/release-doc-checkpoint-case-assertion-20261119-run11`, based on PR #85 exact HEAD `b3ac5f20994997c3ebc6dbd771013ed3f20be0b5`, current exact HEAD `d46b6c1e0e3f945a93fc8afb0050ca653e5f17c1`.');
      expect(section).toContain('Validation [44613423701](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44613423701) is terminal FAILURE: frontend job FAILURE, backend job SUCCESS and iOS job SUCCESS.');
      expect(section).toContain('CodeQL [44613423896](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44613423896) and Dependency Review [44613423653](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44613423653) are terminal SUCCESS');
      expect(section).toContain('No runtime npm audit ran on this exact HEAD');
      expect(section).toContain('PR #177 review inventory: 3 conversation comments, 0 inline review threads and 0 formal review submissions.');
      expect(section).toContain('PR #187 is OPEN/DRAFT on `fix/release-doc-stacked-pr-wording-20261119-run12`, based on PR #177 exact HEAD `d46b6c1e0e3f945a93fc8afb0050ca653e5f17c1`.');
      expect(section).toContain('Validation [44624246061](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44624246061) is terminal SUCCESS; frontend, backend and iOS jobs all succeeded.');
      expect(section).toContain('CodeQL [44624246079](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44624246079) is terminal SUCCESS');
      expect(section).toContain('Dependency Review [44624246293](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44624246293) is terminal SUCCESS');
      expect(section).toContain('300 tests passed across 61 files');
      expect(section).toContain('450 tests passed with 1 warning');
      expect(section).toContain('3 moderate minimatch findings');
      expect(section).toContain('PR #187 review inventory: 1 conversation comment (Dependency Review bot), 0 inline review threads and 0 formal review submissions.');
      expect(section).toContain('PR #187\'s exact-head runs validate PR #187 only; they do not make PR #177 or PR #85 green.');
    }
  });

  it('records PR #41 merged exact-head CI, branch ref, reviews and obsolete queue state', () => {
    for (const section of latestSections) {
      expect(section).toContain('PR #41 is CLOSED/MERGED on');
      expect(section).toContain('68b380e73ca3c870048035197beef8febbf90ef1');
      expect(section).toContain('517 commits, 100 changed files');
      expect(section).toContain('Validation [43492153234]');
      expect(section).toContain('CodeQL [43492153161]');
      expect(section).toContain('Dependency Review [43492153021]');
      expect(section).toContain('additional temporary Expo SDK 57 lockfile refresh [43492142700]');
      expect(section).toContain('53 top-level conversation comments, 30 inline review comments, 26 formal review submissions (25 COMMENTED, 1 human APPROVED), and 22/22 inline review threads resolved (20 outdated).');
      expect(section).toContain('43098210284');
      expect(section).toContain('43098210473');
      expect(section).toContain('43098210255');
      expect(section).toContain('zero jobs');
    }
  });

  it('records PR #171 and PR #172 as sibling commits with identical trees and a stale base snapshot', () => {
    for (const section of latestSections) {
      expect(section).toContain('PR #171 is OPEN/DRAFT on `fix/release-doc-parser-test-declaration-20261118`');
      expect(section).toContain('cd3cd0e01f8dab9c1ac8e47c923a05134857d47d');
      expect(section).toContain('PR #172 is OPEN/DRAFT on `fix/release-doc-parser-assertion-case-20261118`');
      expect(section).toContain('5e0f0c000a3a3707e5565c32804e4d221a886caa');
      expect(section).toContain('PR #172 targets PR #171 branch');
      expect(section).toContain('c5faf4ca3ec9228dcde2b17ef5704d6199856792');
      expect(section).toContain('cf955182d98cae2e19f10c0e08f8e12621cb5242');
      expect(section).toContain('ahead_by=1, behind_by=0');
      expect(section).toContain('ahead_by=1, behind_by=1');
      expect(section).toContain('sibling commits with identical tree');
      expect(section).toContain('44358862088');
      expect(section).toContain('44358862249');
      expect(section).toContain('44358862085');
      expect(section).toContain('44350568289');
      expect(section).toContain('44350568525');
      expect(section).toContain('44350568368');
    }
  });

  it('preserves PR #85 review inventory and the human-approval gate', () => {
    for (const section of latestSections) {
      expect(section).toContain('66 conversation comments, 16 inline review comments, 16 formal submissions (all COMMENTED), 9/9 inline threads resolved, 0 human APPROVED.');
      expect(section).toContain('tarlaci1984-sketch');
      expect(section.toLowerCase()).toContain('human approval is still required.');
    }
  });

  it('keeps Issues #47 and #64 evidence separate from production acceptance', () => {
    for (const section of latestSections) {
      expect(section).toContain('Issue #47 is CLOSED with 11 comments.');
      expect(section).toContain('Protect main ruleset 26370589');
      expect(section).toContain('six strict checks');
      expect(section).toContain('Issue #64 remains OPEN with 67 comments.');
      expect(section).toContain('f91c70d2636948e538f8e3559afc39cd93eb5139');
      expect(section).toContain('4 COMMENTED submissions, 2/2 inline threads resolved, 0 human APPROVED.');
      expect(section).toContain('production DNS64/NAT64 prefix inventory');
      expect(section).toContain('verification of deployed `USEIT_NAT64_PREFIXES`');
      expect(section).toMatch(/production acceptance remains BLOCKED/i);
    }
  });

  it('does not overstate dependency security or unavailable alert inventories', () => {
    for (const section of latestSections) {
      expect(section).toContain('Issue #155 remains OPEN with 59 comments.');
      expect(section).toContain('GHSA-fc5q-39xc-vjpf');
      expect(section).toContain('WITHDRAWN on 2026-11-18');
      expect(section).toContain('3 moderate minimatch findings');
      expect(section).toContain('npm audit fix --force');
      expect(section).toContain('unverified, not empty');
      expect(section).toContain('0 published GitHub releases');
    }
  });

  it('preserves the canonical 25-point register, checklist and external blockers', () => {
    for (const section of latestSections) {
      expect(section).toContain('144 branches (100 + 44 + 0; pagination exhausted), 70 open PRs, 7 open non-PR issues');
      expect(section).toContain('64 items / 41 checked / 23 open');
      expect(section).toContain('Issue #74 has 245 comments.');
      expect(section).toContain('No checkbox changed');
      expect(section).toContain('2 Done / 15 In Progress / 8 Blocked');
      expect(section).toContain('Done (2): #1, #6.');
      expect(section).toContain('In Progress (15): #3, #7, #8, #9, #10, #11, #12, #13, #14, #15, #17, #19, #20, #23, #24.');
      expect(section).toContain('Blocked (8): #2');
      expect(section).toContain('#4 (production Apple App Attest entitlement and physical iPhone)');
      expect(section).toContain('#5 (Play Integrity on Play-installed physical Android)');
      expect(section).toContain('#16 (witnessed production backup/restore)');
      expect(section).toContain('#18 (representative product-recognition benchmark and business acceptance)');
      expect(section).toContain('#21 (production monitoring and alert delivery)');
      expect(section).toContain('#22 (approved staged rollout and tested rollback)');
      expect(section).toContain('#25 (real-user pilot and business sign-off)');
      expect(section).toContain('remain BLOCKED until direct evidence exists.');
      expect(section).toContain('RELEASE NOT READY. PRODUCTION/PILOT ACCEPTANCE NOT GRANTED.');
    }
  });
});