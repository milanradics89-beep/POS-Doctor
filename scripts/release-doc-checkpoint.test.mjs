import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const documents = [
  'docs/25-POINT-RELEASE-BACKLOG.md',
  'docs/RELEASE_RUNBOOK.md',
  'docs/RELEASE_PILOT_ACCEPTANCE.md',
].map((path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8'));

const marker = '## Exact-head reconciliation — 2026-11-19 11:49 CET';
const latestSections = documents.map((document) => {
  const start = document.lastIndexOf(marker);
  if (start < 0) return '';
  const end = document.indexOf('\n\n---\n\n', start);
  return document.slice(start, end < 0 ? document.length : end);
});

const extractPreWritePair = (section) => {
  const parent = section.match(/The exact pre-write parent HEAD is (`([0-9a-f]{40})`|([0-9a-f]{40}))(?:[.\s]|$)/);
  const evidenced = section.match(/These exact-head runs belong to PR #85 pre-write parent HEAD (`([0-9a-f]{40})`|([0-9a-f]{40})) only/);
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

  it('binds PR #85 workflow evidence to the exact pre-write parent, not the new child', () => {
    const pairs = latestSections.map(extractPreWritePair);
    expect(pairs.every((pair) => pair.parent === 'cc9095d5bfa8edd71d1adc1575c8e265e778c1a3')).toBe(true);
    expect(pairs.every((pair) => pair.evidenced === pair.parent)).toBe(true);
    for (const section of latestSections) {
      expect(section).toContain('Validation [44500678293](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44500678293): terminal SUCCESS; frontend, backend and iOS jobs SUCCESS.');
      expect(section).toContain('CodeQL [44500678319](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44500678319): terminal SUCCESS; analyze job SUCCESS.');
      expect(section).toContain('Dependency Review [44500678286](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44500678286): terminal SUCCESS; dependency-review job SUCCESS.');
      expect(section).toContain('The parent runs above do not validate that child.');
      expect(section).toContain('its own exact-head Validation, CodeQL and Dependency Review must each reach terminal SUCCESS before another write or merge.');
      expect(section).toContain('300 passed across 61 test files (300 total);');
      expect(section).toContain('3 moderate minimatch findings');
      expect(section).toContain('native Android Release build and Android emulator smoke all passed.');
      expect(section).toContain('iOS native Release build and simulator smoke passed.');
      expect(section).toContain('Runtime `npm audit --omit=dev --audit-level=high` completed with 3 moderate minimatch findings');
    }
  });

  it('records PR #41 merged exact-head CI, branch comparison and review resolution', () => {
    for (const section of latestSections) {
      expect(section).toContain('PR #41 is CLOSED/MERGED on');
      expect(section).toContain('68b380e73ca3c870048035197beef8febbf90ef1');
      expect(section).toContain('517 commits and 100 changed files');
      expect(section).toContain('Validation [43492153234]');
      expect(section).toContain('CodeQL [43492153161]');
      expect(section).toContain('Dependency Review [43492153021]');
      expect(section).toContain('53 conversation comments, 30 inline review comments, 26 formal submissions (25 COMMENTED, 1 human APPROVED), 22/22 inline threads resolved.');
      expect(section).toContain('43098210284');
      expect(section).toContain('43098210473');
      expect(section).toContain('43098210255');
      expect(section).toContain('each with zero jobs');
    }
  });

  it('records PR #171 and PR #172 as sibling commits with identical trees', () => {
    for (const section of latestSections) {
      expect(section).toContain('PR #171 is OPEN/DRAFT');
      expect(section).toContain('cd3cd0e01f8dab9c1ac8e47c923a05134857d47d');
      expect(section).toContain('PR #172 is OPEN/DRAFT');
      expect(section).toContain('5e0f0c000a3a3707e5565c32804e4d221a886caa');
      expect(section).toContain('Both #171 and #172 have parent `c5faf4ca3ec9228dcde2b17ef5704d6199856792` and identical Git tree `cf955182d98cae2e19f10c0e08f8e12621cb5242`; they are sibling commits, not a parent/child pair.');
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
      expect(section).toContain('Protect main ruleset [26370589]');
      expect(section).toContain('six strict checks');
      expect(section).toContain('Issue #64 remains OPEN with 63 comments.');
      expect(section).toContain('f91c70d2636948e538f8e3559afc39cd93eb5139');
      expect(section).toContain('4 COMMENTED submissions, 2/2 inline threads resolved, 0 human APPROVED.');
      expect(section).toContain('production DNS64/NAT64 prefix inventory');
      expect(section).toContain('verified deployed');
      expect(section).toMatch(/production acceptance remains BLOCKED/i);
    }
  });

  it('does not overstate dependency security or unavailable alert inventories', () => {
    for (const section of latestSections) {
      expect(section).toContain('GHSA-fc5q-39xc-vjpf');
      expect(section).toContain('WITHDRAWN on 2026-11-18');
      expect(section).toContain('3 moderate minimatch findings');
      expect(section).toContain('npm audit fix --force');
      expect(section).toContain('unverified, not empty');
      expect(section).toContain('0 published GitHub releases');
    }
  });

  it('preserves the canonical 25-point register and all external blockers', () => {
    for (const section of latestSections) {
      expect(section).toContain('133 branches (100 + 33), 73 open PRs, 7 open non-PR issues');
      expect(section).toContain('64 items / 41 checked / 23 open');
      expect(section).toContain('Issue #74 has 226 comments');
      expect(section).toContain('No checkbox changed.');
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


describe('2026-11-20 exact-head release checkpoint', () => {
  it('keeps the current exact-head evidence identical across all three release records', () => {
    const marker = '## Exact-head reconciliation — 2026-11-20 03:27 CET';
    const sections = documents.map((document) => {
      const start = document.indexOf(marker);
      if (start < 0) return '';
      const end = document.indexOf('\n## ', start + marker.length);
      return document.slice(start, end < 0 ? undefined : end).trim();
    });

    expect(sections.every(Boolean)).toBe(true);
    expect(new Set(sections).size).toBe(1);

    const section = sections[0];
    [
      'PR #41 is CLOSED/MERGED on fix/release-blockers-2026-10.',
      '68b380e73ca3c870048035197beef8febbf90ef1',
      'Validation [43492153234]',
      'PR #85 remains OPEN/non-draft',
      'ea1bf815d90d91026b24c46ec1869b8218211d80',
      'Validation [44645305669]',
      'PR #187 remains OPEN/DRAFT',
      '706534dce3cbb24db48c4d3aa1ecafab39549c6a',
      'Validation [44648592979]',
      'PR #188 remains OPEN/DRAFT',
      '3c804340d53de54f7acc351db8431d1cd3b6af21',
      'Validation [44646927059]',
      'Issue #64 remains OPEN with 70 comments.',
      'Protect main ruleset 26370589',
      'Code Scanning, Dependabot and Secret Scanning alert inventories',
      'unverified, not empty',
      '0 published releases',
      '64 items / 41 checked / 23 open',
      '2 Done / 15 In Progress / 8 Blocked',
      'RELEASE NOT READY. PRODUCTION/PILOT ACCEPTANCE NOT GRANTED.',
    ].forEach((evidence) => expect(section).toContain(evidence));
  });
});


describe('2026-11-20 04:18 exact-head verification', () => {
  it('keeps the terminal PR #188 evidence identical across all three release records', () => {
    const marker = '## Exact-head verification — 2026-11-20 04:18 CET';
    const sections = documents.map((document) => {
      const start = document.indexOf(marker);
      if (start < 0) return '';
      const end = document.indexOf('\n\n---\n\n', start);
      return document.slice(start, end < 0 ? undefined : end).trim();
    });

    expect(sections.every(Boolean)).toBe(true);
    expect(new Set(sections).size).toBe(1);

    const section = sections[0];
    expect(section).toMatch(/(?:0 published GitHub releases|Published GitHub releases:\s*\*{0,2}0\*{0,2})/i);
    expect(section).toMatch(/(?:84 open PRs|Open PRs:\s*\*{0,2}84\*{0,2})/i);
    [
      'PR #188 remains OPEN/DRAFT',
      'd3ab60420c1296b7feada52b1cb04f37ff3a2e33',
      'Validation [44661575287]',
      'CodeQL [44661575351]',
      'Dependency Review [44661576412]',
      '301/301 tests across 61/61 test files',
      'Expo Doctor: 21/21 checks passed',
      'Android emulator smoke test passed for com.useit.app',
      '3 moderate minimatch findings',
      'cryptography 50.0.2',
      'pytest 450 passed with 1 warning',
      '27 passed with 1 warning',
      '78 passed',
      'No known vulnerabilities found',
      'PR #85 remains OPEN/non-draft',
      'Validation [44645305669]',
      '299 passed / 1 failed',
      'Runtime npm audit was SKIPPED',
      '16 formal submissions, all COMMENTED',
      '9/9 inline threads resolved',
      'PRs #163–#170 each currently have 0 formal review submissions and 0 inline threads.',
      '44255156916',
      '44273476324',
      'PR #171 exact HEAD',
      'PR #172 exact HEAD',
      'PR #41 is CLOSED/MERGED',
      'PR #65 remains CLOSED/unmerged',
      'cryptography 46.0.7',
      '18 findings (1 low, 8 moderate, 8 high, 1 critical)',
      'PR #99 exact HEAD',
      'PR #116 exact HEAD',
      'GHSA-fc5q-39xc-vjpf / CVE-2026-112366 is WITHDRAWN',
      'five picomatch 4.0.7 resolutions and one 2.3.2 resolution',

      '145 (100 on page 1, 45 on page 2)',

      '64 checklist items / 41 checked / 23 open',
      '2 Done / 15 In Progress / 8 Blocked',
      'RELEASE NOT READY. PRODUCTION/PILOT ACCEPTANCE NOT GRANTED.',
    ].forEach((evidence) => expect(section).toContain(evidence));
  });
});


describe('2026-11-20 06:28 exact-head verification', () => {
  it('keeps the current PR #188 failure evidence identical across all three release records', () => {
    const marker = '## Exact-head verification — 2026-11-20 06:28 CET';
    const sections = documents.map((document) => {
      const start = document.indexOf(marker);
      if (start < 0) return '';
      const end = document.indexOf('\n\n---\n\n', start);
      return document.slice(start, end < 0 ? undefined : end).trim();
    });

    expect(sections.every(Boolean)).toBe(true);
    expect(new Set(sections).size).toBe(1);

    const section = sections[0];
    expect(section).toMatch(/Runtime npm audit was \*{0,2}SKIPPED\*{0,2}/);
    expect(section).toMatch(/CodeQL \[44673865112\](?:\(https:\/\/github\.com\/milanradics89-beep\/POS-Doctor\/actions\/runs\/44673865112\))?: \*\*SUCCESS\*\*/);
    expect(section).toMatch(/Dependency Review \[44673865087\](?:\(https:\/\/github\.com\/milanradics89-beep\/POS-Doctor\/actions\/runs\/44673865087\))?: \*\*SUCCESS\*\*/);
    expect(section).toMatch(/Backend job \[136089285669\](?:\(https:\/\/github\.com\/milanradics89-beep\/POS-Doctor\/actions\/runs\/44673865186\/job\/136089285669\))?: \*\*SUCCESS\*\*/);
    expect(section).toMatch(/iOS job \[136089329848\](?:\(https:\/\/github\.com\/milanradics89-beep\/POS-Doctor\/actions\/runs\/44673865186\/job\/136089329848\))?: \*\*SUCCESS\*\*/);
    [
      'PR #188 remains OPEN/DRAFT',
      '518800e9689e6ec4eff5b2ebb0051cf5bee6351b',
      'Validation [44673865186](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44673865186): **FAILURE**, latest attempt 2',
      'Frontend job [136089283885]',
      '301 passed / 1 failed',
      'PRs #163–#170 each currently have 0 formal review submissions and 0 inline threads.',





      'PR #41 is CLOSED/MERGED',
      '53 conversation comments, 30 inline comments, 26 formal reviews',
      '22/22 inline threads resolved',
      'Issue #47 is CLOSED with 11 comments',
      'Issue #64 remains OPEN with 71 comments',
      'Code Scanning, Dependabot and Secret Scanning alert inventories are **unverified, not empty**',
      'Branches: **145** (100 on page 1, 45 on page 2)',
      'Open PRs: **84**',
      'Open non-PR issues: **7**',
      'Published GitHub releases: **0**',
      '2 Done / 15 In Progress / 8 Blocked',
      'RELEASE NOT READY. PRODUCTION/PILOT ACCEPTANCE NOT GRANTED.',
    ].forEach((evidence) => expect(section).toContain(evidence));
  });
});


describe('2026-11-20 07:40 exact-head verification', () => {
  it('keeps the current exact-head evidence identical across all three release records', () => {
    const marker = '## Exact-head verification — 2026-11-20 07:40 CET';
    const sections = documents.map((document) => {
      const start = document.indexOf(marker);
      if (start < 0) return '';
      const end = document.indexOf('\n\n---\n\n', start);
      return document.slice(start, end < 0 ? undefined : end).trim();
    });

    expect(sections.every(Boolean)).toBe(true);
    expect(new Set(sections).size).toBe(1);

    const section = sections[0];
    [
      'PR #188 remains OPEN/DRAFT',
      'ba1eda56b860e81c95c0ee3dcf04515bd1989813',
      'Validation [44681632150](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44681632150): FAILURE',
      'Frontend job [136117227091]',
      '301 passed / 2 failed across 61 test files (303 tests total)',
      'literal-backslash separator instead of an actual newline separator',
      'CodeQL [44681632160](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44681632160): SUCCESS',
      'Dependency Review [44681632200](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44681632200): SUCCESS',
      'Backend job [136117228018]',
      'Pytest 450 passed with 1 warning',
      'production-readiness 27 passed with 1 warning',
      'production-security 78 passed',
      'No known vulnerabilities found',
      'iOS job [136117228433]',
      'Native iOS Release build and simulator smoke test passed',
      'runtime npm audit were SKIPPED',
      'PR #85 remains OPEN/non-draft',
      'Validation [44645305669]',
      'PR #41 is CLOSED/MERGED',
      '53 conversation comments, 30 inline review comments, 26 formal submissions',
      '22/22 inline threads resolved',
      'Issue #47 is CLOSED with 11 comments',
      'Issue #64 remains OPEN with 71 comments',
      '4 COMMENTED submissions, 2/2 inline threads resolved and 0 human APPROVED',
      'alert inventories are unverified, not empty',
      'Branches: 145 (100 on page 1, 45 on page 2)',
      'Open PRs: 84',
      'Open non-PR issues: 7',
      'Published GitHub releases: 0',
      '2 Done / 15 In Progress / 8 Blocked',
      'RELEASE NOT READY. PRODUCTION/PILOT ACCEPTANCE NOT GRANTED.',
    ].forEach((evidence) => expect(section).toContain(evidence));
  });
});


describe('2026-11-20 10:55 exact-head verification', () => {
  it('keeps PR #193 exact-head evidence identical across all three release records', () => {
    const marker = '## Exact-head verification — 2026-11-20 10:55 CET';
    const sections = documents.map((document) => {
      const start = document.indexOf(marker);
      if (start < 0) return '';
      const end = document.indexOf('\n\n---\n\n', start);
      return document.slice(start, end < 0 ? undefined : end).trim();
    });

    expect(sections.every(Boolean)).toBe(true);
    expect(new Set(sections).size).toBe(1);

    const section = sections[0];
    [
      'PR #193 remains OPEN/DRAFT',
      '58c3b0c48e396abb924b33e6396ddae59305f85f',
      'Validation [44710467673]',
      'CodeQL [44710467975]',
      'Dependency Review [44710467812]',
      '304 tests across 61 test files passed',
      'Expo Doctor 1.20.5 passed',
      'Android emulator smoke passed for com.useit.app',
      'iOS native Release build and simulator smoke test passed',
      '3 moderate minimatch findings',
      'GHSA-g3hv-75wg-m249',
      'No known vulnerabilities found',
      'PR #41 is CLOSED/MERGED',
      '68b380e73ca3c870048035197beef8febbf90ef1',
      '53 conversation comments, 30 inline review comments, 26 formal submissions (25 COMMENTED, 1 human APPROVED)',
      '22/22 inline threads resolved',
      'Issue #47 is CLOSED with 11 comments',
      'Issue #64 remains OPEN with 72 comments',
      'f91c70d2636948e538f8e3559afc39cd93eb5139',
      '151 branches (100 on page 1, 51 on page 2)',
      '90 open pull requests',
      '7 open non-PR issues',
      '0 published releases',
      'unverified, not empty',
      '2 Done / 15 In Progress / 8 Blocked',
      'RELEASE NOT READY. PRODUCTION/PILOT ACCEPTANCE NOT GRANTED.',
    ].forEach((evidence) => expect(section).toContain(evidence));
  });
});
