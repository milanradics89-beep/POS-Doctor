# POS-Doctor Release Watch — Current Evidence Snapshot

**Captured:** 2026-11-24 09:10 CET  
**Repository:** `milanradics89-beep/POS-Doctor`  
**Candidate branch:** `fix/pr233-live-checkpoint-refresh-20261123-1150`

> Current operational evidence overlay. The three long-form release records now share the 09:10 CET checkpoint and the canonical row-level register is refreshed below. Historical checkpoints remain preserved. This file does not grant production or pilot acceptance.

## Latest live release-watch checkpoint — 2026-11-24 09:10 CET

Evidence refreshed from live PR metadata, independent branch refs, exact-commit Actions runs and jobs, PR conversation/review/thread APIs, issue records, paginated branch inventory, repository metadata, the active main ruleset, Releases API and all three release records. This is repository evidence only; it does not grant production or pilot acceptance.

### PR #41 — merged source baseline and review audit

- PR #41 is CLOSED/MERGED from `fix/release-blockers-2026-10` to `main`. PR metadata and independent branch ref match exact source HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge commit `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. It has 517 commits, 100 changed files, +11,887 / -2,005. Compared with current main `e610dbe4d7103f2e5ece7b4f47021f338d44dec7`, the branch is DIVERGED: 517 ahead / 5 behind.
- Exact-head Validation [#43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [#43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [#43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021): terminal SUCCESS on that exact SHA. All five jobs passed: frontend, backend, iOS, CodeQL Analyze and Dependency Review.
- PR timeline: 109 records = 53 conversation comments, 30 inline review comments and 26 formal review submissions (25 COMMENTED, one APPROVED by `tarlaci1984-sketch` on 2026-11-13). All 22 inline threads are resolved; 0 unresolved and 20 outdated. The approval body is empty and is not production or independent security-owner acceptance.
- PR description still contains superseded historical text describing the old `b46c5b8` HEAD, open/unmerged state, two open threads and zero approvals. Live metadata/ref/review APIs are authoritative; the merged PR description was not edited.
- Historical Validation [#43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), CodeQL [#43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and Dependency Review [#43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255) remain QUEUED with zero jobs on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`. These are historical queues, not failures on the merged HEAD. Repository administrator cancellation is required.

### Main governance and repository inventory

- Main HEAD is `e610dbe4d7103f2e5ece7b4f47021f338d44dec7`; repository visibility is public.
- Active ruleset [#26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) enforces six strict checks (`CodeQL`, `backend`, `frontend`, `ios`, `analyze`, `dependency-review`), one approving review, stale-review dismissal, last-push approval, resolved review threads, deletion/non-fast-forward protection and no bypass actors. Main branch metadata reports protected=true; the legacy protection detail endpoint does not expose the ruleset configuration.
- Complete paginated branch inventory: 230 branches (100 + 100 + 30; next page empty). PR #41 source branch still points to its merged exact HEAD.
- GitHub Releases API returned an empty array: 0 published releases. Code Scanning, Dependabot and Secret Scanning alert inventories remain UNAVAILABLE, UNVERIFIED, NOT EMPTY because their alert endpoints are rejected by the connected integration.

### PR #249 — current release-documentation candidate

- PR #249 is OPEN/DRAFT at exact HEAD `079e58581f3e80ea3d7c332b9d6c2e7a1f270b10` on `fix/pr233-live-checkpoint-refresh-20261123-1150`, based on PR #254 exact HEAD `2c9d9ef7a052a2a55b491925c8c40d9fc3649bd3`. Metadata and independent branch ref match. Current metadata: 36 commits and 5 changed files. The PR description is stale: it still describes the earlier `b3533ca` checkpoint and a single test-only commit.
- Exact-head Validation [#45346864983](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45346864983) is terminal FAILURE after attempt 2. CodeQL [#45346864899](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45346864899) and Dependency Review [#45346864793](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45346864793) are terminal SUCCESS on the same SHA. Jobs: frontend FAILED, backend PASSED, iOS PASSED; CodeQL Analyze and Dependency Review PASSED.
- Frontend TypeScript passed, then 349 tests passed / 5 failed across 72 files (354 total; 71 test files passed and one failed). All five failures are stale assertions in `scripts/release-evidence-checkpoint.test.mjs`, not demonstrated application runtime defects: the expected phrase for 26 formal review submissions differs from the checkpoint wording; two assertions expect superseded PR #249 HEADs (`6cd5acd` and `fb694e7`) instead of `079e585`; one expects a different PR #244 branch/status phrase; and one expects a different Issue #47 closed/comment-count phrase.
- Backend and iOS Release/simulator smoke passed. Android Expo Doctor, export, native Release build, emulator validation and frontend runtime npm audit were skipped after the frontend unit-test failure. The current head therefore has no successful Validation result.
- PR #249 has one Dependency Review bot conversation comment, zero formal reviews, zero inline threads and zero human approvals. The bot says “Scanned Files: None”; its “no vulnerabilities” message is not evidence of dependency-tree coverage. The latest completed SDK 57 runtime audit still reported 3 MODERATE minimatch findings.
- The previous parent `6cd5acd991f1db74d1e79277f8e84884f1b885a5` has separate historical evidence; its CI results are not transferred to `079e585`. The new exact-head CI must be evaluated separately and does not inherit results from `6cd5acd`.

### PR #254 — Expo SDK 57 alignment

- PR #254 is OPEN and non-draft at exact HEAD `2c9d9ef7a052a2a55b491925c8c40d9fc3649bd3`. Manifest/lockfile align `expo-constants ~57.0.25`, `expo-image-picker ~57.0.22`, `expo-router ~57.0.32`, and `@expo/metro-runtime 57.0.19`.
- Validation [#45223358003](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45223358003), CodeQL [#45223357946](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45223357946), Dependency Review [#45223358018](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45223358018): terminal SUCCESS, all five jobs passed; frontend 327/327 across 71 files, Expo Doctor 21/21, Android Release/emulator and iOS Release/simulator smoke passed. It has no formal human review or approval. Its high-only runtime audit reported 3 moderate minimatch findings, not a clean moderate-threshold audit.

### PR #231 and PR #246 — minimatch 11 candidate

- PR #231 is OPEN/DRAFT at exact HEAD `444e312b4bf94237eedfb0af1a24922bf5853942`; Validation [#45031336861](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45031336861), CodeQL [#45031337208](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45031337208), Dependency Review [#45031336869](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45031336869): SUCCESS.
- PR #246 is OPEN/DRAFT at exact HEAD `ad614dd25d0fd11d3d50737718e7dbd88a74c89a`, based on PR #231 at `444e312b4bf94237eedfb0af1a24922bf5853942`. Validation [#45112214845](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45112214845), CodeQL [#45112214955](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45112214955), Dependency Review [#45112214927](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45112214927): SUCCESS. Frontend 335/335; full `npm audit --audit-level=moderate` and runtime high-threshold audit reported 0 vulnerabilities on this separate unmerged candidate.
- PR #246 is not integrated with PR #254. Combined SDK 57 lockfile, fingerprint compatibility and full Android/iOS validation remain required. Do not run `npm audit fix --force`; it suggests downgrading Expo to 52.0.49.

### PR #259 and PR #244 — integration and picomatch

- PR #259 is CLOSED/UNMERGED at exact HEAD `40aafaafed80073575c1e8d37d87626a922d98d3`. Validation [#45304936171](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45304936171), CodeQL [#45304936290](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45304936290), Dependency Review [#45304936011](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45304936011): SUCCESS. Separate test-only integration artifact, not merge or acceptance evidence.
- PR #244 is CLOSED/UNMERGED on `test/picomatch-counterexamples-20261123-run11`, exact HEAD `6a1d531132cd457cdb997e8a677d39ace17d019a`. Validation [#45220119684](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45220119684) failed: 330 tests passed / 4 failed across 72 files. `+(*)`, `*(*)`, `+(a*)`, and `+(*a)` exceeded the 2,500 ms child-process timeout. CodeQL [#45220119625](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45220119625) and Dependency Review [#45220119889](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45220119889) succeeded.
- GHSA-fc5q-39xc-vjpf / CVE-2026-112366 was WITHDRAWN upstream on 2026-11-18 as not a security issue. The measured timing observations do not establish a confirmed vulnerability or exploitability; preserve tests and timeout while checking whether untrusted product input reaches the build-time matcher.

### Issues, mainline SSRF and production acceptance

- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is CLOSED with 11 comments. Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains OPEN with 136 comments; last updated 2026-11-24T05:30:03Z.
- PR #200 is CLOSED/MERGED into main at source HEAD `fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a`; its source-PR Validation [#44735858583](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858583), CodeQL [#44735858347](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858347), and Dependency Review [#44735858455](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858455) succeeded. No push-triggered Dependency Review run was returned; source-PR Dependency Review is not substituted for a main push run.
- PR #99 exact HEAD `f91c70d2636948e538f8e3559afc39cd93eb5139`: Validation [#43772791089](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791089), CodeQL [#43772791064](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791064), Dependency Review [#43772791109](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791109) succeeded. One human APPROVED review by `milanzoltanradics`; both inline threads are resolved. The available metadata does not establish that this reviewer is the authorized independent security owner; `tarlaci1984-sketch` has not approved.
- Production SSRF acceptance remains blocked by independent authorized security-owner approval, complete production NAT64/DNS64 translator-prefix inventory, verified deployed `USEIT_NAT64_PREFIXES`, and captured staging/production egress tests. CI and merged code do not prove production deployment or acceptance.

### Canonical 25-point release register

- Current candidate register: **2 Done / 15 In Progress / 8 Blocked**. Done: #1, #6. In Progress: #3, #7–#15, #17, #19, #20, #23, #24. Blocked: #2, #4, #5, #16, #18, #21, #22, #25.
- Issue #47 governance is closed, but item #2 remains Blocked until the owner's durable repository-visibility and release-plan decision is documented.
- The eight Blocked items remain: #2 durable visibility/release-plan decision; #4 physical iPhone App Attest; #5 Play-installed physical Android Play Integrity; #16 witnessed production backup/restore; #18 product-recognition benchmark and business acceptance; #21 production monitoring with witnessed alert delivery; #22 approved staged rollout and tested rollback; #25 real-user pilot and business sign-off.
- Main's separate historical register remains 3 Done / 15 In Progress / 7 Blocked. The two registers are not silently merged.

Release decision: NOT READY. Production/pilot acceptance: NOT GRANTED.
## Human actions

1. Repository administrator: cancel the three obsolete PR #41 queued runs on `b46c5b8`; they have zero jobs and are not current-head failures.
2. Reviewers: review PR #249 and PR #254; PR #249 remains draft and unapproved, while PR #254 is open and non-draft but has no formal review submission.
3. Engineering: reconcile minimatch 11.0.5 with the SDK 57 dependency tree using a generated lockfile and targeted fingerprint/platform tests. Do not force-downgrade Expo.
4. Security owner: provide explicit production SSRF acceptance and the missing NAT64/DNS64/deployed-config/egress evidence.
5. Keep all eight external release gates blocked until direct evidence exists.
## Previous snapshot — 2026-11-24 01:41 CET (superseded)

# POS-Doctor Release Watch — Current Evidence Snapshot

**Captured:** 2026-11-24 01:41 CET  
**Repository:** `milanradics89-beep/POS-Doctor`  
**Candidate branch:** `fix/pr233-live-checkpoint-refresh-20261123-1150`

> Current operational evidence overlay. The three long-form release records now share the 01:41 CET checkpoint below; their historical sections and the detailed 25-row register are preserved. This file does not grant production or pilot acceptance.

## Latest live audit — 2026-11-24 01:41 CET

All claims below were refreshed against current PR metadata, independent refs, exact-commit Actions runs and jobs, review APIs, issue records, paginated branches, active ruleset and Releases API.

### PR #41 — merged source baseline

- CLOSED/MERGED; branch `fix/release-blockers-2026-10`; exact HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge commit `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`.
- 517 commits, 100 changed files, +11,887 / -2,005; 517 ahead / 4 behind main `3a262358552a9650d865aa5bd3c92905f1e863cb`.
- Exact-head Validation #43492153234, CodeQL #43492153161 and Dependency Review #43492153021 are terminal SUCCESS. All five jobs passed.
- Review inventory: 53 conversation comments, 30 inline comments, 26 formal submissions (25 COMMENTED, 1 APPROVED by `tarlaci1984-sketch` with an empty body); 22/22 inline threads resolved, 20 outdated.
- PR body still contains superseded b46c5b8/open/unmerged claims; live metadata and refs are authoritative.
- Historical runs #43098210284, #43098210473 and #43098210255 remain QUEUED with zero jobs on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`. Administrator cancellation is required.

### Main governance and repository state

- Main HEAD `3a262358552a9650d865aa5bd3c92905f1e863cb`; repository public.
- Ruleset #26370589 is ACTIVE with six strict checks, one approving review, stale-review dismissal, last-push approval, resolved-thread requirement, deletion/non-fast-forward protection and no bypass actors.
- Paginated branch inventory: 212 branches (100 + 100 + 12; next page empty).
- GitHub Releases API: 0 published releases.
- Code Scanning, Dependabot and Secret Scanning inventories: UNAVAILABLE, UNVERIFIED, NOT EMPTY. Alert-list endpoints were rejected by the connected integration.

### PR #249 — current release-documentation candidate

- OPEN/DRAFT, exact HEAD `7a78fbaebb45e232c57513b0bde8c5423dae5e89`, base PR #254 exact HEAD `2c9d9ef7a052a2a55b491925c8c40d9fc3649bd3`; 30 commits, 5 changed files (+3,917 / -17).
- Exact-head Validation #45288974809, CodeQL #45288974993 and Dependency Review #45288974833 are terminal SUCCESS; frontend, backend, iOS, CodeQL Analyze and Dependency Review all passed.
- Frontend 352/352 tests across 72 files; Expo Doctor 21/21; Android Release/emulator smoke and iOS Release/simulator smoke passed. Backend 539 pytest, 27 readiness and 78 security/privacy tests passed; pip-audit reported no known vulnerabilities.
- Runtime `npm audit --omit=dev --audit-level=high` still reports 3 moderate minimatch findings. The Dependency Review bot scanned no files; that result does not clear the runtime findings.
- 1 bot conversation comment, 0 formal reviews, 0 inline threads, 0 human approvals. Draft and unmerged.

### PR #254 — Expo SDK 57 alignment

- OPEN/DRAFT exact HEAD `2c9d9ef7a052a2a55b491925c8c40d9fc3649bd3`; 1 commit, 2 files; manifest and lockfile align expo-constants ~57.0.25, expo-image-picker ~57.0.22, expo-router ~57.0.32 and @expo/metro-runtime 57.0.19.
- Validation #45223358003, CodeQL #45223357946 and Dependency Review #45223358018: 3/3 terminal SUCCESS; all five jobs passed. Frontend 327/327 across 71 files, Expo Doctor 21/21, Android and iOS simulator smoke passed.
- 3 moderate minimatch findings remain in the runtime audit; no human approval.

### PR #231 and PR #246 — minimatch 11 candidate

- PR #231 exact HEAD `444e312b4bf94237eedfb0af1a24922bf5853942`, based on main; 1 commit, 4 files. Adds minimatch 11.0.5 override, lockfile update and targeted @expo/fingerprint compatibility tests. Its Validation #45031336861, CodeQL #45031337208 and Dependency Review #45031336869 passed.
- PR #246 exact HEAD `ad614dd25d0fd11d3d50737718e7dbd88a74c89a`, based on PR #231's branch; 2 commits, 2 files. Its Validation #45112214845, CodeQL #45112214955 and Dependency Review #45112214927 passed. Frontend 335/335 across 72 files; full moderate-threshold and runtime high-threshold npm audits both reported 0 vulnerabilities.
- This candidate is not integrated with PR #254. Reconcile the override against the exact SDK 57 tree with a generated lockfile and complete compatibility/Android/iOS validation. Do not use `npm audit fix --force`; its suggested resolution downgrades Expo to 52.0.49.

### PR #244 — picomatch runtime observations

- OPEN/DRAFT exact HEAD `6a1d531132cd457cdb997e8a677d39ace17d019a`. Validation #45220119684 failed (330 passed / 4 failed); CodeQL #45220119625 and Dependency Review #45220119889 passed.
- Four patterns `+(*)`, `*(*)`, `+(a*)`, `+(*a)` exceeded 2,500 ms. GHSA-fc5q-39xc-vjpf / CVE-2026-112366 was withdrawn upstream on 2026-11-18 as not a security issue. Preserve the tests; timing alone does not establish exploitability.

### Issues and production acceptance

- Issue #47 CLOSED, 11 comments. Issue #64 OPEN, 133 comments, last updated 2026-11-23 21:42:53 UTC.
- PR #200's DNS-pinned transport is in main. Production SSRF acceptance still needs independent security-owner approval, production NAT64/DNS64 inventory, verified deployed `USEIT_NAT64_PREFIXES`, and staging/production egress evidence.

### Canonical 25-point release register

- 25 items: **2 Done / 15 In Progress / 8 Blocked**. Done #1, #6. In Progress #3, #7–#15, #17, #19, #20, #23, #24. Blocked #2, #4, #5, #16, #18, #21, #22, #25.
- Blocked external gates: #2 durable visibility/release-plan decision; #4 physical iPhone App Attest; #5 Play-installed physical Android Play Integrity; #16 witnessed production backup/restore; #18 product-recognition benchmark/business acceptance; #21 production monitoring and witnessed alert delivery; #22 staged rollout approval and tested rollback; #25 real-user pilot/business sign-off.
- Main's separate historical register remains 3 Done / 15 In Progress / 7 Blocked. The two registers are not merged.
- Release decision: NOT READY. Production/pilot acceptance: NOT GRANTED.

## Human actions

1. Repository administrator: cancel the three obsolete PR #41 queued runs.
2. Reviewers: review PR #249 and PR #254; both remain draft and unapproved.
3. Engineering: reconcile PR #246 minimatch 11.0.5 with the SDK 57 dependency tree using a generated lockfile and targeted tests.
4. Security owner: provide explicit production SSRF acceptance and the missing NAT64/DNS64/deployed-config/egress evidence.
5. Keep all eight external release gates blocked until direct evidence exists.
## Previous snapshot — captured 2026-11-23 23:11 CET

## PR #41 — merged source baseline

- [PR #41](https://github.com/milanradics89-beep/POS-Doctor/pull/41) is CLOSED/MERGED from `fix/release-blockers-2026-10`.
- Exact source HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; independent branch ref matches. Merge commit `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`.
- 517 commits, 100 changed files, +11,887 / -2,005. Compared with current main `3a262358552a9650d865aa5bd3c92905f1e863cb`: DIVERGED, 517 ahead / 4 behind.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021): all terminal SUCCESS; frontend, backend, iOS, CodeQL Analyze and Dependency Review jobs all passed.
- Review timeline: 109 records = 53 conversation comments, 30 inline comments, 26 formal reviews (25 COMMENTED, one APPROVED by `tarlaci1984-sketch` on 2026-11-13). Approval body is empty and is not production/security acceptance. All 22/22 inline threads resolved; 20 outdated.
- PR description contains stale historical claims about an unmerged `b46c5b8` head and unresolved threads. Live metadata and APIs are authoritative; merged PR body was not edited.

Three obsolete workflows remain QUEUED with zero jobs on stale SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`: Validation [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), CodeQL [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), Dependency Review [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255). They are not failures on PR #41's merged HEAD. Administrator cancellation is required; the connector has no cancellation action.

## Main protection and issue #47

- Repository is public. Main branch API reports `protected: true`.
- Ruleset `Protect main` / ID `26370589` was fetched successfully and is ACTIVE for `~DEFAULT_BRANCH`: six strict checks (`CodeQL`, `backend`, `frontend`, `ios`, `analyze`, `dependency-review`); one approval; stale-review dismissal; last-push approval; resolved threads; deletion and non-fast-forward protection; no bypass actors; current-user bypass `never`.
- The branch object's embedded legacy/classic protection snapshot says `protection.enabled=false` and empty classic contexts. This is distinct from the separately fetched active ruleset.
- Issue #47 is CLOSED with 11 comments. Its body has a stale paragraph claiming main is unprotected and the ruleset API unavailable; current live branch/ruleset reads supersede it.

## PR #249 — current release-documentation candidate

- [PR #249](https://github.com/milanradics89-beep/POS-Doctor/pull/249) is OPEN/DRAFT, unmerged; 28 commits, 4 changed files.
- Exact HEAD `544d96e759e3d10cedae8665230e006ca3f2bc38`; base is PR #254 branch at `2c9d9ef7a052a2a55b491925c8c40d9fc3649bd3`.
- Exact-head Validation [45266387886](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45266387886), CodeQL [45266387858](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45266387858), Dependency Review [45266387882](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45266387882): all terminal SUCCESS; all five jobs passed.
- Frontend: TypeScript passed, 352/352 tests across 72/72 files, Expo Doctor 21/21, Android emulator smoke passed. Backend and iOS passed.
- Runtime `npm audit --omit=dev --audit-level=high` passed its HIGH threshold but reported **3 MODERATE minimatch findings** via `@expo/fingerprint` / `minimatch` 10.2.6. This is not a zero-finding audit. `npm audit fix --force` would downgrade Expo to 52.0.49; do not run it.
- The Dependency Review bot says no issues in the PR diff and reports no scanned files; this docs-only diff result does not supersede the runtime audit. Review inventory: one bot comment, zero formal reviews, zero inline threads, zero human approvals.

## PR #254 — Expo SDK 57 alignment

- [PR #254](https://github.com/milanradics89-beep/POS-Doctor/pull/254) is OPEN/DRAFT, unmerged; one commit, two changed files. Exact HEAD `2c9d9ef7a052a2a55b491925c8c40d9fc3649bd3`, base main `3a262358552a9650d865aa5bd3c92905f1e863cb`.
- `expo-constants ~57.0.25`, `expo-image-picker ~57.0.22`, `expo-router ~57.0.32` match SDK 57 in manifest and lockfile.
- Exact-head Validation [45223358003](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45223358003), CodeQL [45223357946](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45223357946), Dependency Review [45223358018](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45223358018): all terminal SUCCESS.
- Frontend 327/327 tests across 71/71 files; TypeScript passed; Expo Doctor 21/21; Android emulator smoke passed. Backend and iOS passed. Same three moderate minimatch findings remain. One bot comment; zero formal reviews, zero inline threads, zero human approvals.

## Dependency and security candidates

### PR #246
- Exact HEAD `ad614dd25d0fd11d3d50737718e7dbd88a74c89a`; base `security/minimatch-11-current-main-20261122` at `444e312b4bf94237eedfb0af1a24922bf5853942`.
- Validation [45112214845](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45112214845), CodeQL [45112214955](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45112214955), Dependency Review [45112214927](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45112214927): all terminal SUCCESS.
- Frontend 335/335 tests across 72/72 files, Expo Doctor 21/21, Android emulator smoke passed; full moderate-threshold and runtime high-threshold npm audits both found zero vulnerabilities.
- Its base carries a `minimatch` 11.0.5 override and lockfile; PR #246 adds the full moderate audit step and workflow-contract test. This is not a drop-in merge for PR #254: `@expo/fingerprint` declares `minimatch ^10.2.6`, and Expo SDK 57 subdependency pins differ. Reconcile on the SDK 57 base, regenerate the lockfile with npm, and test full Expo/Android/iOS compatibility before integration.

### PR #244
- Exact HEAD `6a1d531132cd457cdb997e8a677d39ace17d019a`. Validation [45220119684](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45220119684) failed (330 passed / 4 failed); CodeQL [45220119625](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45220119625) and Dependency Review [45220119889](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45220119889) passed.
- `+(*)`, `*(*)`, `+(a*)`, `+(*a)` exceeded the 2,500 ms test timeout. Keep all tests and the timeout; do not suppress or xfail.
- GHSA-fc5q-39xc-vjpf / CVE-2026-112366 was withdrawn on 2026-11-18 because it is not a security issue. The timing measurements remain observations, not proof of exploitability. Determine whether untrusted input can reach the build-time matcher. Advisory: https://github.com/advisories/GHSA-fc5q-39xc-vjpf.

### Current minimatch advisory
- GHSA-g3hv-75wg-m249 affects minimatch `>=7.0.0, <11.0.1`; patched version `11.0.1` is listed by the advisory. Current SDK 57 runtime audit reports three moderate instances. https://github.com/advisories/GHSA-g3hv-75wg-m249.
- PR #246's 11.0.5 override is a candidate only; validate compatibility with Expo's declared range before integrating.

## Issues #47 and #64, releases and security inventories

- Issue #64 remains OPEN with 133 comments; last updated `2026-11-23T21:42:53Z`. Latest acceptance record confirms PR #200 is merged into current main via `3a262358552a9650d865aa5bd3c92905f1e863cb`; source commit `fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a` had its own three workflows successful.
- Production SSRF acceptance remains BLOCKED pending independent security-owner approval, complete production NAT64/DNS64 prefix inventory, verified deployed `USEIT_NAT64_PREFIXES`, and staging plus production egress tests. Merge/CI do not prove production deployment or acceptance.
- GitHub Releases API returned `[]`: **0 published releases**.
- Code Scanning, Dependabot and Secret Scanning alert inventories are **UNAVAILABLE / UNVERIFIED / NOT EMPTY** because the connected integration rejected these alert-list endpoints. No zero-alert claim is made.

## Release records and canonical 25-point register

At PR #249 HEAD `544d96e`, the three long-form records retain their 22:03 CET checkpoint:
- `docs/RELEASE_RUNBOOK.md` blob `2b376d418a2ea25068b779a459fe57e1e3143a1c`.
- `docs/RELEASE_PILOT_ACCEPTANCE.md` blob `1e05f34a207d6bb52d6b59358a4ce847568ce84c`.
- `docs/25-POINT-RELEASE-BACKLOG.md` blob `55096a43ad351edd8f50fbbdaa0d7d406c226bfe`.

The canonical candidate register remains **2 Done / 15 In Progress / 8 Blocked**, all 25 items accounted for:

| Status | Items | Count |
|---|---|---:|
| Done | #1, #6 | 2 |
| In Progress | #3, #7–#15, #17, #19, #20, #23, #24 | 15 |
| Blocked | #2, #4, #5, #16, #18, #21, #22, #25 | 8 |
| **Total** | **#1–#25** | **25** |

Blocked items: #2 durable visibility/release-plan decision; #4 physical iPhone App Attest; #5 Play-installed physical Android Play Integrity; #16 witnessed production backup/restore; #18 product-recognition benchmark and business acceptance; #21 production monitoring with witnessed alert delivery; #22 approved staged rollout and tested rollback; #25 real-user pilot and business sign-off.

Main's separate historical register remains 3 Done / 15 In Progress / 7 Blocked; do not merge the two registers.

## Human actions and release decision

1. Repository administrator: cancel the three obsolete queued PR #41 workflows.
2. Reviewers: review PR #254's SDK 57 alignment and PR #249's release-evidence candidate; neither has human approval.
3. Engineering: reconcile PR #246's minimatch 11.0.5 override with the SDK 57 dependency set, regenerate the lockfile with npm, retain targeted compatibility tests, and run the full moderate audit plus platform validation.
4. Security owner: record picomatch input reachability and provide independent production SSRF acceptance evidence for Issue #64.
5. Release owners: provide physical-device, production cloud, witnessed backup/restore, monitoring, staged rollout/rollback, and real-user pilot/business evidence.

**Release decision: NOT READY. Production/pilot acceptance: NOT GRANTED.**
