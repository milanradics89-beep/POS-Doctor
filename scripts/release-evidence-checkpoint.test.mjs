import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const documents = [
  'docs/25-POINT-RELEASE-BACKLOG.md',
  'docs/RELEASE_RUNBOOK.md',
  'docs/RELEASE_PILOT_ACCEPTANCE.md',
].map((path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8'));

const marker = '## Latest live release-watch checkpoint — 2026-11-24 16:20 CET';
const latestSections = documents.map((document) => {
  if (!document.startsWith(marker)) return '';
  const nextHeading = document.indexOf('\n## ', marker.length);
  return document.slice(0, nextHeading < 0 ? document.length : nextHeading).trimEnd();
});

describe('current-main release evidence checkpoint', () => {
  it('selects the top checkpoint rather than a historical section', () => {
    expect(documents.every((document) => document.startsWith(marker))).toBe(true);
  });

  it('keeps the same current checkpoint in all three release records', () => {
    expect(latestSections.every(Boolean)).toBe(true);
    expect(new Set(latestSections).size).toBe(1);
  });

  it('binds PR #41 evidence to its merged exact head and exact-head workflows', () => {
    for (const section of latestSections) {
      expect(section).toContain('PR #41 is CLOSED/MERGED');
      expect(section).toContain('68b380e73ca3c870048035197beef8febbf90ef1');
      expect(section).toContain('43492153234');
      expect(section).toContain('43492153161');
      expect(section).toContain('43492153021');
      expect(section).toContain('53 conversation comments');
      expect(section).toContain('30 inline review comments');
      expect(section).toContain('26 formal review submissions');
      expect(section).toContain('All 22 inline threads are resolved; 0 unresolved and 20 outdated');
      expect(section).toContain('tarlaci1984-sketch');
    }
  });

  it('preserves the historical PR #249 checkpoint-test failure separately from the earlier Expo Doctor finding', () => {
    for (const document of documents) {
      expect(document).toContain('PR #249 is OPEN/DRAFT on `fix/pr233-live-checkpoint-refresh-20261123-1150`');
      expect(document).toContain('Parent exact HEAD before this checkpoint update was `d4a11d82c62c98a0e2ee9c0f669a54c6ac4f8a9d`');
      expect(document).toContain('Validation [#45231276486](');
      expect(document).toContain('CodeQL [#45231276504](');
      expect(document).toContain('Dependency Review [#45231276317](');
      expect(document).toContain('338/349 unit tests passed and 11 failed');
      expect(document).toContain('scripts/release-evidence-checkpoint.test.mjs');
      expect(document).toContain('11:50 marker');
      expect(document).toContain('Expo Doctor, Android export, native Android Release build, Android emulator smoke and frontend runtime audit were skipped');
      expect(document).toContain('Earlier exact HEAD `e8e80b1931667020ebeac561bd9a0adf905a32b7`');
      expect(document).toContain('expo-constants');
      expect(document).toContain('expo-image-picker');
      expect(document).toContain('expo-router');
    }
  });

  it('records the current PR #249 exact-head failure without borrowing parent CI', () => {
    for (const section of latestSections) {
      expect(section).toContain('PR #249 is OPEN/DRAFT at exact HEAD `af555314e0fc4e9a6f563917278281f746cf0d72`');
      expect(section).toContain('Validation [#45412748046](');
      expect(section).toContain('CodeQL [#45412748040](');
      expect(section).toContain('Dependency Review [#45412747973](');
      expect(section).toContain('352 tests passed / 4 failed across 72 files');
      expect(section).toContain('The four failures are checkpoint assertions because the 13:18 checkpoint omitted the PR #244 historical test-count line, the PR #99 exact-head line, the PR #271 minimatch override line, and the previous PR #249 failure-history note');
      expect(section).toContain('Jobs: frontend FAILED, backend PASSED, iOS PASSED');
      expect(section).toContain('Android Expo Doctor, export, native Release build, emulator validation and frontend runtime dependency audit were skipped after the frontend unit-test failure');
      expect(section).toContain("The next corrective documentation commit's own exact-head Validation, CodeQL and Dependency Review must be evaluated separately and does not inherit results from `af555314` or any parent commit");
    }
  });

  it('records the merged SSRF remediation without transferring source CI to the merge commit', () => {
    for (const document of documents) {
      expect(document).toContain('PR #200 is CLOSED/MERGED');
      expect(document).toContain('fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a');
      expect(document).toContain('3a262358552a9650d865aa5bd3c92905f1');
      expect(document).toContain('44735858583');
      expect(document).toContain('44735858347');
      expect(document).toContain('44735858455');
      expect(document).toContain('No push-triggered Dependency Review run was returned; source-PR Dependency Review is not substituted for a main push run.');
    }
  });

  it('records PR #204 exact-head failure and the separately validated PR #229 test correction', () => {
    for (const document of documents) {
      expect(document).toContain('### PR #204 and PR #229 — historical documentation candidates');
      expect(document).toContain('00d2dff332888e5eb2fa731d32e2e5b3e1cc4f9f');
      expect(document).toContain('Validation [45017190851](');
      expect(document).toContain('terminal FAILURE');
      expect(document).toContain('CodeQL [45017190867](');
      expect(document).toContain('Dependency Review [45017190810](');
      expect(document).toContain('332 passed / 2 failed across 72 test files');
      expect(document).toContain('450 pytest tests');
      expect(document).toContain('27 production-readiness checks');
      expect(document).toContain('78 security/privacy checks');
      expect(document).toContain('native Release build and simulator install/launch smoke');
      expect(document).toContain('PR #229');
      expect(document).toContain('26aafc7a2f5b3a735bc04926568ef5cbcc99f1d6');
      expect(document).toContain('45031397060');
      expect(document).toContain('45031397027');
      expect(document).toContain('45031397143');
      expect(document).toContain('all passed');
    }
  });

  it('records PR #233 pre-correction exact-head failure without transferring parent results', () => {
    for (const document of documents) {
      expect(document).toContain('PR #233 is OPEN/DRAFT');
      expect(document).toContain('6cf6f262697fbf0682d0c48c66ced56fcb46c000');
      expect(document).toContain('6 commits and 4 changed files');
      expect(document).toContain('Validation [#45067156099](');
      expect(document).toContain('terminal FAILURE');
      expect(document).toContain('CodeQL [#45067156045](');
      expect(document).toContain('Dependency Review [#45067156113](');
      expect(document).toContain('333 passed / 4 failed across 72 test files');
      expect(document).toContain('PR #236 is CLOSED/MERGED into the PR #233 branch');
      expect(document).toContain('fast-forwarded with expected-SHA');
      expect(document).toContain('1a35bf4aa51b5d0f623728c4645e42b5df0fe54c');
      expect(document).toContain('336 passed / 1 failed across 72 test files');
      expect(document).toContain('539 pytest tests');
      expect(document).toContain('runtime npm audit was skipped');
      expect(document).toContain('2 conversation comments');
      expect(document).toContain('0 formal review submissions');
      expect(document).toContain('0 inline review threads');
      expect(document).toContain('0 human approvals');
      expect(document).toContain('The PR #229 test correction is carried forward by content in PR #233');
      expect(document).not.toContain('on the PR #204 candidate branch');
    }
  });

  it('records PR #233 current exact-head failure and isolates the two checkpoint assertion mismatches', () => {
    for (const document of documents) {
      expect(document).toContain('PR #233 is OPEN/DRAFT at exact HEAD 6805604d5781ff62284a94beb5d77f39b816ccf9');
      expect(document).toContain('7 commits and 4 changed files');
      expect(document).toContain('Validation [45073803426](');
      expect(document).toContain('CodeQL [45073803442](');
      expect(document).toContain('Dependency Review [45073803419](');
      expect(document).toContain('335 passed / 2 failed across 72 test files');
      expect(document).toContain('expected 450 tests while the PR #204 evidence correctly says 450 pytest tests');
      expect(document).toContain('expected fast-forward with expected-SHA while the PR #236 provenance correctly says fast-forwarded with expected-SHA');
      expect(document).toContain('Backend job [137372346371](');
      expect(document).toContain('539 pytest tests, 27 production-readiness checks, and 78 security/privacy checks');
      expect(document).toContain('iOS job [137372296410](');
      expect(document).toContain('native Release build and simulator smoke');
      expect(document).toContain('runtime npm audit were skipped');
      expect(document).toContain('PR #233 review inventory: 2 conversation comments, 0 formal review submissions, 0 inline review threads, and 0 human approvals');
      expect(document).toContain('PR #236 is CLOSED/MERGED into the PR #233 branch only');
    }
  });

  it('records the latest PR #233 exact head and keeps PR #237 base evidence separate', () => {
    for (const document of documents) {
      expect(document).toContain('Current PR #233 exact HEAD is `dd732252a3a8eea5211ca0a5324c61eca044a8c4`');
      expect(document).toContain('8 commits and 4 changed files');
      expect(document).toContain('Validation [#45077680540](');
      expect(document).toContain('CodeQL [#45077680551](');
      expect(document).toContain('Dependency Review [#45077680544](');
      expect(document).toContain('337 passed / 1 failed across 72 test files');
      expect(document).toContain('runtime npm audit was skipped, not failed');
      expect(document).toContain('PR #237 is a separate child at exact HEAD `fe6178ce5d342dc7a9dbf9eb4594e51167622503`');
      expect(document).toContain('base SHA is still `6805604d5781ff62284a94beb5d77f39b816ccf9`');
      expect(document).toContain('3 moderate minimatch findings');
      expect(document).toContain('PR #85 current exact HEAD `e3cc12a5ecb36877bdee5984ddd09d5e4f8f7bc9`');
      expect(document).toContain('9/9 resolved inline threads');
      expect(document).toContain('three commits behind current main');
      expect(document).toContain('PR #171 exact HEAD `cd3cd0e01f8dab9c1ac8e47c923a05134857d47d`');
      expect(document).toContain('PR #172 exact HEAD `5e0f0c000a3a3707e5565c32804e4d221a886caa`');
      expect(document).toContain('3 moderate minimatch findings and no picomatch finding');
      expect(document).toContain('64 items / 41 checked / 23 open');
      expect(document).toContain('2 Done / 15 In Progress / 8 Blocked');
    }
  });

  it('records PR #238 child exact-head failure separately from PR #233', () => {
    for (const document of documents) {
      expect(document).toContain('PR #238 is OPEN/DRAFT at exact HEAD `46c594e57404934d8be8c8f2dc300886fc02caf0`');
      expect(document).toContain('1 commit and 4 changed files');
      expect(document).toContain('based on PR #233 branch');
      expect(document).toContain('Validation [#45081443668](');
      expect(document).toContain('CodeQL [#45081443620](');
      expect(document).toContain('Dependency Review [#45081443715](');
      expect(document).toContain('337 passed / 2 failed across 72 test files');
      expect(document).toContain('two PR #238 frontend failures are test/evidence-contract mismatches');
      expect(document).toContain('Backend job [137394341947](');
      expect(document).toContain('539 pytest tests, 27 production-readiness checks, and 78 security/privacy checks');
      expect(document).toContain('iOS job [137394342328](');
      expect(document).toContain('native Release build and simulator smoke');
      expect(document).toContain('PR #238 review inventory: 2 conversation comments, 0 formal review submissions, 0 inline review threads, and 0 human approvals');
      expect(document).toContain('PR #233 current review inventory: 3 conversation comments, 0 formal review submissions, 0 inline review threads, and 0 human approvals');
    }
  });


  it('records the previous PR #233 exact-head green workflows as historical evidence', () => {
    for (const document of documents) {
      expect(document).toContain('Previous validated PR #233 exact HEAD is `4a9685b361223a32c4ff49ea91fd467327bee3be`');
      expect(document).toContain('11 commits and 4 changed files');
      expect(document).toContain('Validation [45093002583](');
      expect(document).toContain('CodeQL [45093002548](');
      expect(document).toContain('Dependency Review [45093002611](');
      expect(document).toContain('terminal SUCCESS on the same exact SHA');
      expect(document).toContain('Frontend, backend, iOS, CodeQL Analyze, and Dependency Review jobs all passed (5/5)');
      expect(document).toContain('340 passed across 72 test files');
      expect(document).toContain('3 MODERATE severity vulnerabilities (minimatch)');
      expect(document).toContain('539 pytest tests');
      expect(document).toContain('27 production-readiness checks');
      expect(document).toContain('78 security/privacy checks');
      expect(document).toContain('No known vulnerabilities found');
      expect(document).toContain('Android emulator smoke');
      expect(document).toContain('iOS simulator smoke');
    }
  });

  it('records the previous PR #233 exact-head failure as historical evidence', () => {
    for (const document of documents) {
      expect(document).toContain('PR #233 is OPEN/DRAFT on docs/release-evidence-main-sync-20261122-run13, current exact HEAD `8acad8c5e80206a5095e97d06e79f906fce58818`');
      expect(document).toContain('12 commits and 4 changed files');
      expect(document).toContain('Validation [45097970332](');
      expect(document).toContain('CodeQL [45097970383](');
      expect(document).toContain('Dependency Review [45097970305](');
      expect(document).toContain('terminal FAILURE');
      expect(document).toContain('343 passed / 1 failed across 72 test files');
      expect(document).toContain('historical 340 passed assertion is incorrectly scoped to latestSections');
      expect(document).toContain('Backend job [137449658202](');
      expect(document).toContain('539 pytest tests, 27 production-readiness checks, and 78 security/privacy checks');
      expect(document).toContain('iOS job [137449657218](');
      expect(document).toContain('native Release build and simulator smoke');
      expect(document).toContain('runtime npm audit was skipped, not failed');
      expect(document).toContain('CodeQL Analyze job [137441955103](');
      expect(document).toContain('Dependency Review job [137441954598](');
      expect(document).toContain('PR #233 review inventory: 3 conversation comments, 0 formal review submissions, 0 inline review threads, and 0 human approvals');
    }
  });

  it('records the current PR #233 exact-head failure and its precise checkpoint assertion', () => {
    for (const document of documents) {
      expect(document).toContain('PR #233 is OPEN/DRAFT on docs/release-evidence-main-sync-20261122-run13, current exact HEAD `cc4c3f7b00d4ac7b7c1e3cc1c382b548a1362537`');
      expect(document).toContain('13 commits and 4 changed files');
      expect(document).toContain('Validation [45102371195](');
      expect(document).toContain('CodeQL [45102371200](');
      expect(document).toContain('Dependency Review [45102371250](');
      expect(document).toContain('terminal FAILURE');
      expect(document).toContain('343 passed / 1 failed across 72 test files');
      expect(document).toContain('the current checkpoint omits the required safety instruction');
      expect(document).toContain('Do not run npm audit fix --force');
      expect(document).toContain('Frontend job [137463168713](');
      expect(document).toContain('Backend job [137463171003](');
      expect(document).toContain('539 pytest tests, 27 production-readiness checks, and 78 security/privacy checks');
      expect(document).toContain('iOS job [137463201544](');
      expect(document).toContain('native Release build and simulator smoke');
      expect(document).toContain('CodeQL Analyze job [137455905257](');
      expect(document).toContain('Dependency Review job [137455905249](');
      expect(document).toContain('runtime npm audit was skipped, not failed');
      expect(document).toContain('PR #233 review inventory: 3 conversation comments, 0 formal review submissions, 0 inline review threads, and 0 human approvals');
    }
  });
  it('records PR #233 current exact-head Validation failure without transferring parent results', () => {
    for (const document of documents) {
      expect(document).toContain('PR #233 is OPEN/DRAFT at exact HEAD `1f21b900c44194739ae6c85f171c3dd657c9fc84`');
      expect(document).toContain('18 commits and 4 changed files (+3,052 / -17)');
      expect(document).toContain('Validation [45153637592](');
      expect(document).toContain('CodeQL [45153637645](');
      expect(document).toContain('Dependency Review [45153637640](');
      expect(document).toContain('terminal FAILURE');
      expect(document).toContain('Frontend job [137638389920](');
      expect(document).toContain('329 passed / 4 failed across 72 test files');
      expect(document).toContain('All four failures are stale checkpoint-string expectations');
      expect(document).toContain('not demonstrated application runtime failures');
      expect(document).toContain('Backend job [137638392077](');
      expect(document).toContain('iOS job [137638393316](');
      expect(document).toContain('native Release build and simulator smoke');
      expect(document).toContain('CodeQL Analyze job [137620986726](');
      expect(document).toContain('Dependency Review job [137621000006](');
      expect(document).toContain('Expo Doctor, Android export, native Android Release build, emulator smoke, and frontend runtime `npm audit` were skipped');
      expect(document).toContain('PR #233 review inventory: 5 conversation comments, 0 formal review submissions, 0 inline review threads, and 0 human approvals');
      expect(document).toContain('PR #243 is CLOSED/MERGED into the PR #233 branch only');
      expect(document).toContain('fast-forwarded with expected-SHA');
      expect(document).toContain('force=false');
      expect(document).toContain('did not merge anything into main');
      expect(document).toContain('PR #245 is OPEN/DRAFT at exact HEAD `6ef6801fc43178b967f71ad241f160f3dc80651f`');
      expect(document).toContain('1 ahead / 4 behind');
      expect(document).toContain('removing historical `8acad8` regression assertions');
    }
  });

  it('records the full minimatch dependency audit on PR #246 exact head', () => {
    for (const document of documents) {
      expect(document).toContain('PR #246 is OPEN/DRAFT at exact HEAD `ad614dd25d0fd11d3d50737718e7dbd88a74c89a`');
      expect(document).toContain('npm audit --audit-level=moderate');
      expect(document).toContain('found 0 vulnerabilities');
      expect(document).toContain('Validation [45112214845](');
      expect(document).toContain('CodeQL [45112214955](');
      expect(document).toContain('Dependency Review [45112214927](');
    }
  });

  it('records current PR #244 runtime evidence and the withdrawn upstream advisory accurately', () => {
    for (const section of latestSections) {
      expect(section).toContain('PR #244 is CLOSED/UNMERGED on `test/picomatch-counterexamples-20261123-run11`, exact HEAD `6a1d531132cd457cdb997e8a677d39ace17d019a`');
      expect(section).toContain('Validation [#45220119684](');
      expect(section).toContain('330 tests passed / 4 failed across 72 files');
      expect(section).toContain('CodeQL [#45220119625](');
      expect(section).toContain('Dependency Review [#45220119889](');
      expect(section).toContain('+(*)');
      expect(section).toContain('*(*)');
      expect(section).toContain('+(a*)');
      expect(section).toContain('+(*a)');
      expect(section).toContain('2,500 ms child-process timeout');
      expect(section).toContain('GHSA-fc5q-39xc-vjpf');
      expect(section).toContain('WITHDRAWN upstream on 2026-11-18 as not a security issue');
      expect(section).toContain('not a security issue');
      expect(section).toContain('do not establish a confirmed vulnerability or exploitability');
    }
  });
  it('records PR #238 integration in the current checkpoint and preserves historical review counts', () => {
    for (const document of documents) {
      expect(document).toContain('PR #238 is CLOSED/MERGED into the PR #233 branch only');
      expect(document).toContain('4a9685b361223a32c4ff49ea91fd467327bee3be');
      expect(document).toContain('3 commits and 4 changed files');
      expect(document).toContain('expected previous SHA and force=false');
      expect(document).toContain('did not merge anything into main');
    }
    for (const document of documents) {
      expect(document).toContain('PR #233 review inventory: 3 conversation comments, 0 formal review submissions, 0 inline review threads, and 0 human approvals');
      expect(document).toContain('PR #238 review inventory: 2 conversation comments, 0 formal review submissions, 0 inline review threads, and 0 human approvals');
    }
  });

  it('records mainline push CI separately from PR #200 source-head CI', () => {
    for (const document of documents) {
      expect(document).toContain('Main merge-commit push-triggered Validation [45030954025](');
      expect(document).toContain('CodeQL [45030954087](');
      expect(document).toContain('No push-triggered Dependency Review run was returned');
    }
  });

  it('records the moderate runtime dependency findings without treating the high-only gate as clean', () => {
    for (const document of documents) {
      expect(document).toContain('3 MODERATE severity vulnerabilities (minimatch)');
      expect(document).toContain('not a clean zero-vulnerability audit');
      expect(document).toContain('Do not run `npm audit fix --force`');
      expect(document).toContain('PR #231 is OPEN/DRAFT at exact HEAD `444e312b4bf94237eedfb0af1a24922bf5853942`');
    }
  });

  it('records the current-main Redis acceptance candidate on its own exact head', () => {
    for (const document of documents) {
      expect(document).toContain('PR #232 is OPEN/DRAFT');
      expect(document).toContain('696ac10f2bbb4a502a507a07d562fb92136b0fb2');
      expect(document).toContain('Validation [45040014939](');
      expect(document).toContain('CodeQL [45040015166](');
      expect(document).toContain('Dependency Review [45040014952](');
      expect(document).toContain('3/3 terminal SUCCESS');
    }
  });

  it('keeps current-main minimatch evidence bound to PR #231 exact HEAD', () => {
    for (const document of documents) {
      expect(document).toContain('PR #231 is OPEN/DRAFT');
      expect(document).toContain('444e312b4bf94237eedfb0af1a24922bf5853942');
      expect(document).toContain('45031336861');
      expect(document).toContain('45031337208');
      expect(document).toContain('45031336869');
      expect(document).toContain('found 0 vulnerabilities');
      expect(document).toContain('0 formal reviews and 0 inline threads');
    }
  });

  it('keeps the row-level 25-point register at 3 Done / 14 In Progress / 8 Blocked', () => {
    const backlog = readFileSync(new URL('../docs/25-POINT-RELEASE-BACKLOG.md', import.meta.url), 'utf8');
    const registerMarker = '## Current canonical 25-point release register — 2026-11-24 16:20 CET';
    const registerStart = backlog.indexOf(registerMarker);
    expect(registerStart).toBeGreaterThanOrEqual(0);
    const nextHeading = backlog.indexOf('\n## ', registerStart + registerMarker.length);
    const register = backlog.slice(registerStart, nextHeading < 0 ? backlog.length : nextHeading);
    const rows = register.split('\n').filter((line) => /^\|\s*\d+\s*\|/.test(line));
    expect(rows).toHaveLength(25);
    const counts = { Done: 0, 'In Progress': 0, Blocked: 0 };
    for (const row of rows) {
      const status = row.match(/\*\*(Done|In Progress|Blocked)\*\*/)?.[1];
      expect(status).toBeTruthy();
      counts[status]++;
    }
    expect(counts).toEqual({ Done: 3, 'In Progress': 14, Blocked: 8 });
  });

  it('does not promote external acceptance or unavailable security inventories', () => {
    for (const section of latestSections) {
      expect(section).toContain('UNAVAILABLE, UNVERIFIED, NOT EMPTY');
      expect(section).toContain('0 published releases');
      expect(section).toContain('Issue [#47](');
      expect(section).toContain('is CLOSED with 11 comments');
      expect(section).toContain('Issue [#64](');
      expect(section).toMatch(/remains OPEN with \d+ comments/);
      expect(section).toContain('Release decision: NOT READY');
      expect(section).toContain('Production/pilot acceptance: NOT GRANTED');
      for (const item of ['#2', '#4', '#5', '#16', '#18', '#21', '#22', '#25']) {
        expect(section).toContain(item);
      }
    }
  });
  it('keeps SDK 57 Expo manifest ranges aligned with lockfile resolutions', () => {
    const manifest = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
    const lockfile = JSON.parse(readFileSync(new URL('../package-lock.json', import.meta.url), 'utf8'));
    const packages = ['expo-constants', 'expo-image-picker', 'expo-router'];

    // Exact patch selection is owned by the stacked SDK-alignment PR #254.
    // This test runs on this PR's own head, so it checks the SDK 57 range and
    // manifest/lockfile agreement without assuming the base-only patch update
    // has already been merged into this branch.
    for (const name of packages) {
      const range = manifest.dependencies[name];
      const resolved = lockfile.packages[`node_modules/${name}`]?.version;

      expect(range).toMatch(/^~57\.0\.\d+$/);
      expect(resolved).toMatch(/^57\.0\.\d+$/);
      expect(resolved).toBe(range.slice(1));
    }
  });


  it('records current PR #249 and exact-head SDK57/dependency candidates without transferring parent CI', () => {
    for (const section of latestSections) {
      expect(section).toContain('PR #249 is OPEN/DRAFT at exact HEAD `af555314e0fc4e9a6f563917278281f746cf0d72`');
      expect(section).toContain('Validation [#45412748046](');
      expect(section).toContain('CodeQL [#45412748040](');
      expect(section).toContain('Dependency Review [#45412747973](');
      expect(section).toContain('352 tests passed / 4 failed across 72 files');
      expect(section).toContain('PR #254 is OPEN and non-draft at exact HEAD `2c9d9ef7a052a2a55b491925c8c40d9fc3649bd3`');
      expect(section).toContain('Validation [#45223358003](');
      expect(section).toContain('CodeQL [#45223357946](');
      expect(section).toContain('Dependency Review [#45223358018](');
      expect(section).toContain('3 MODERATE minimatch findings');
      expect(section).toContain('PR #246 is OPEN/DRAFT at exact HEAD `ad614dd25d0fd11d3d50737718e7dbd88a74c89a`');
      expect(section).toContain('npm audit --audit-level=moderate');
      expect(section).toContain('PR #259 is CLOSED/UNMERGED at exact HEAD `40aafaafed80073575c1e8d37d87626a922d98d3`');
      expect(section).toContain('Validation [#45304936171](');
      expect(section).toContain('PR #99 exact HEAD `f91c70d2636948e538f8e3559afc39cd93eb5139`');
      expect(section).toContain('Validation [#43772791089](');
      expect(section).toContain('Issue [#64](');
      expect(section).toContain('138 comments');
      expect(section).toContain('248 branches');
      expect(section).toContain('0 published releases');
      expect(section).toContain('UNAVAILABLE, UNVERIFIED, NOT EMPTY');
      expect(section).toContain('3 Done / 14 In Progress / 8 Blocked');
    }
  });


  it('records the merged PR #271 minimatch remediation on current main', () => {
    for (const section of latestSections) {
      expect(section).toContain('PR #271 is CLOSED/MERGED');
      expect(section).toContain('exact source HEAD `2fcf27736d58ff9b165ffd72c252f3c2f4a1ecfc`');
      expect(section).toContain('merge commit `f04587771b8ad85b1d705fd6de7c0e8ee91a164f`; current main `5389190fe230122f19c3406bfcb125c98ced5966`');
      expect(section).toContain('Validation [#45348594071](');
      expect(section).toContain('CodeQL [#45348594121](');
      expect(section).toContain('Dependency Review [#45348594035](');
      expect(section).toContain('found 0 vulnerabilities');
      expect(section).toContain('minimatch override `11.0.5`');
    }
  });

  it('records exact-main merge-commit checks and the active protection ruleset', () => {
    for (const section of latestSections) {
      expect(section).toContain('Current main exact HEAD `5389190fe230122f19c3406bfcb125c98ced5966`');
      expect(section).toContain('Validation [#45394960761](');
      expect(section).toContain('CodeQL [#45394960734](');
      expect(section).toContain('Dynamic prebuild [#45394959647](');
      expect(section).toContain('No exact-main push-triggered Dependency Review run was returned');
      expect(section).toContain('Ruleset #26370589 is ACTIVE');
      expect(section).toContain('main branch API reports `protected: true`');
      expect(section).toContain('PR #283 source HEAD `c51577a4002b1516a4b3a3fbc747387145959843`');
    }
  });
  it('keeps the SDK57/minimatch integration candidate separate from current main', () => {
    for (const section of latestSections) {
      expect(section).toContain('PR #260 is OPEN/DRAFT at exact HEAD `ae74da6d8f6a8f35ceb2a5b3696578218a92bffd`');
      expect(section).toContain('Validation [#45317003618](');
      expect(section).toContain('CodeQL [#45317003576](');
      expect(section).toContain('Dependency Review [#45317003567](');
      expect(section).toContain('based on an integration branch rather than main');
    }
  });

  it('keeps the current canonical 25-row register at 3 Done / 14 In Progress / 8 Blocked', () => {
    const backlog = readFileSync(new URL('../docs/25-POINT-RELEASE-BACKLOG.md', import.meta.url), 'utf8');
    const registerMarker = '## Current canonical 25-point release register — 2026-11-24 16:20 CET';
    const start = backlog.indexOf(registerMarker);
    expect(start).toBeGreaterThanOrEqual(0);
    const end = backlog.indexOf('\n## ', start + registerMarker.length);
    const section = backlog.slice(start, end < 0 ? backlog.length : end);
    const rows = section.split('\n').filter((line) => /^\|\s*\d+\s*\|/.test(line));
    expect(rows).toHaveLength(25);
    expect(rows.filter((line) => line.includes('**Done**'))).toHaveLength(3);
    expect(rows.filter((line) => line.includes('**In Progress**'))).toHaveLength(14);
    expect(rows.filter((line) => line.includes('**Blocked**'))).toHaveLength(8);
    expect(rows.find((line) => line.startsWith('| 2 |'))).toContain('**Blocked**');
    expect(rows.find((line) => line.startsWith('| 3 |'))).toContain('**Done**');
  });

});
