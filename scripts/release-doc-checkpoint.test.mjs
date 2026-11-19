import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const documents = [
  'docs/25-POINT-RELEASE-BACKLOG.md',
  'docs/RELEASE_RUNBOOK.md',
  'docs/RELEASE_PILOT_ACCEPTANCE.md',
].map((path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8'));

const marker = '## Exact-head reconciliation — 2026-11-19 22:40 CET';
const latestSections = documents.map((document) => {
  const start = document.lastIndexOf(marker);
  if (start < 0) return '';
  const end = document.indexOf('\n\n---\n\n', start);
  return document.slice(start, end < 0 ? document.length : end);
});

const extractPreWritePair = (section) => {
  const tick = String.fromCharCode(96);
  const parent = section.match(new RegExp('The exact pre-write parent HEAD is (' + tick + '([0-9a-f]{40})' + tick + '|([0-9a-f]{40}))(?:[.\\s]|$)'));
  const evidenced = section.match(new RegExp('These exact-head runs belong to PR #85 pre-write parent HEAD (' + tick + '([0-9a-f]{40})' + tick + '|([0-9a-f]{40})) only'));
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

  it('binds PR #85 and PRs #177-#185 to their own exact-head evidence', () => {
    const pairs = latestSections.map(extractPreWritePair);
    expect(pairs.every((pair) => pair.parent === 'b3ac5f20994997c3ebc6dbd771013ed3f20be0b5')).toBe(true);
    expect(pairs.every((pair) => pair.evidenced === pair.parent)).toBe(true);

    for (const section of latestSections) {
      expect(section).toContain('The exact pre-write parent HEAD is b3ac5f20994997c3ebc6dbd771013ed3f20be0b5.');
      expect(section).toContain('These exact-head runs belong to PR #85 pre-write parent HEAD b3ac5f20994997c3ebc6dbd771013ed3f20be0b5 only.');
      expect(section).toContain('Validation 44515665309: terminal FAILURE; frontend Unit tests failed at 299/300, backend SUCCESS and iOS SUCCESS.');
      expect(section).toContain('CodeQL 44515665215: terminal SUCCESS; analyze job SUCCESS.');
      expect(section).toContain('Dependency Review 44515665613: terminal SUCCESS; dependency-review job SUCCESS.');
      expect(section).toContain('PR #177 current HEAD is d46b6c1e0e3f945a93fc8afb0050ca653e5f17c1.');
      expect(section).toContain('Validation 44613423701: terminal FAILURE; frontend Unit tests 299/300, backend SUCCESS and iOS SUCCESS.');
      expect(section).toContain('CodeQL 44613423896: terminal SUCCESS.');
      expect(section).toContain('Dependency Review 44613423653: terminal SUCCESS.');
      expect(section).toContain('PR #183 is OPEN/DRAFT at HEAD ab65ea23171e84b7f7cb07967b5b34a0cc28b8bc');
      expect(section).toContain('Validation 44611108095: terminal FAILURE; frontend 296/300 with 4 checkpoint assertions failing, backend SUCCESS and iOS SUCCESS.');
      expect(section).toContain('CodeQL 44611108110: terminal SUCCESS.');
      expect(section).toContain('Dependency Review 44611108264: terminal SUCCESS.');
      expect(section).toContain('PR #184 is OPEN/DRAFT at HEAD 050f8aa068018c1f91236c7199bfd2478e605b59');
      expect(section).toContain('Validation 44611797615: terminal FAILURE; frontend 297/300 with 3 checkpoint assertions failing, backend SUCCESS and iOS SUCCESS.');
      expect(section).toContain('CodeQL 44611797570: terminal SUCCESS.');
      expect(section).toContain('Dependency Review 44611797505: terminal SUCCESS.');
      expect(section).toContain('PR #185 is OPEN/DRAFT at HEAD 0ad3bdc82c9e654c84f25dc08884ac8bc3f6d0d2');
      expect(section).toContain('Validation 44612165463: terminal FAILURE; frontend 299/300 with one stale checkpoint assertion, backend SUCCESS and iOS SUCCESS.');
      expect(section).toContain('CodeQL 44612165430: terminal SUCCESS.');
      expect(section).toContain('Dependency Review 44612165558: terminal SUCCESS.');
      expect(section).toContain('old PR #177 CodeQL run 44605504714');
      expect(section).toContain('Runtime npm audit did not run on those failed exact heads because Unit tests failed first.');
    }
  });

  it('records PR #41 merged exact-head CI, branch comparison and review resolution', () => {
    for (const section of latestSections) {
      expect(section).toContain('PR #41 is CLOSED/MERGED');
      expect(section).toContain('68b380e73ca3c870048035197beef8febbf90ef1');
      expect(section).toContain('f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1');
      expect(section).toContain('Validation 43492153234');
      expect(section).toContain('CodeQL 43492153161');
      expect(section).toContain('Dependency Review 43492153021');
      expect(section).toContain('26 formal submissions (25 COMMENTED, 1 APPROVED), 22/22 inline threads resolved.');
      expect(section).toContain('43098210284');
      expect(section).toContain('43098210473');
      expect(section).toContain('43098210255');
      expect(section).toContain('Each has zero jobs.');
    }
  });

  it('records PR #171 and PR #172 branch relationship separately from their Git parent graph', () => {
    for (const section of latestSections) {
      expect(section).toContain('PR #171 is OPEN/DRAFT at HEAD cd3cd0e01f8dab9c1ac8e47c923a05134857d47d');
      expect(section).toContain('PR #172 is OPEN/DRAFT at HEAD 5e0f0c000a3a3707e5565c32804e4d221a886caa');
      expect(section).toContain('PR #172 targets the PR #171 branch');
      expect(section).toContain('Both current head commits have that same parent and identical tree cf955182d98cae2e19f10c0e08f8e12621cb5242');
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
      expect(section).toContain('16 COMMENTED submissions, 9/9 inline threads resolved, 0 human APPROVED.');
      expect(section).toContain('tarlaci1984-sketch remains requested.');
    }
  });

  it('keeps Issue #64 SSRF implementation evidence separate from production acceptance', () => {
    for (const section of latestSections) {
      expect(section).toContain('Issue #64 remains OPEN with 67 comments.');
      expect(section).toContain('PR #99 is OPEN/DRAFT at HEAD f91c70d2636948e538f8e3559afc39cd93eb5139.');
      expect(section).toContain('Validation 43772791089, CodeQL 43772791064 and Dependency Review 43772791109 all succeeded.');
      expect(section).toContain('4 COMMENTED submissions, 2/2 inline threads resolved, 0 human APPROVED.');
      expect(section).toMatch(/Production acceptance remains BLOCKED/i);
      expect(section).toContain('production DNS64/NAT64 prefix inventory');
      expect(section).toContain('verified deployed USEIT_NAT64_PREFIXES');
      expect(section).toContain('staging/production egress evidence');
    }
  });

  it('does not overstate picomatch advisory or dependency remediation', () => {
    for (const section of latestSections) {
      expect(section).toContain('GHSA-fc5q-39xc-vjpf');
      expect(section).toContain('WITHDRAWN on 2026-11-18');
      expect(section).toContain('Snyk marks its JavaScript advisory revoked');
      expect(section).toContain('OSV page still shows HIGH and Modified 2026-11-17T16:00:03Z');
      expect(section).toContain('picomatch 4.0.7 as latest');
      expect(section).toContain('There is no 4.0.8 and no patched npm release.');
      expect(section).toContain('3 moderate minimatch findings');
      expect(section).toContain('Do not use npm audit fix --force');
      expect(section).toContain('unverified, not empty');
      expect(section).toContain('Exact six-pattern matrix (no spaces inside any pattern): +(*), *(*), +(a*), +(*a), *(a*|b), +(ab|abab).');
    }
  });

  it('preserves the canonical 25-point register and all external blockers', () => {
    for (const section of latestSections) {
      expect(section).toContain('143 branches, 82 open PRs, 7 open non-PR issues and 0 published GitHub releases.');
      expect(section).toContain('64 items / 41 checked / 23 open.');
      expect(section).toContain('No checkbox changed.');
      expect(section).toContain('2 Done / 15 In Progress / 8 Blocked.');
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