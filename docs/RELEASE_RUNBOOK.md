## Latest live release-watch checkpoint — 2026-11-24 10:44 CET

Evidence refreshed from live PR metadata, independent branch refs, exact-commit Actions runs and jobs, PR conversation/review/thread APIs, issue records, paginated branch inventory, repository metadata, the active main ruleset, Releases API and all three release records. This is repository evidence only; it does not grant production or pilot acceptance.

### PR #41 — merged source baseline and review audit

- PR #41 is CLOSED/MERGED from `fix/release-blockers-2026-10` to `main`. PR metadata and independent branch ref match exact source HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge commit `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. It has 517 commits, 100 changed files, +11,887 / -2,005. Compared with current main `f04587771b8ad85b1d705fd6de7c0e8ee91a164f`, the branch is DIVERGED: 517 ahead / 12 behind.
- Exact-head Validation [#43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [#43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [#43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021): terminal SUCCESS on that exact SHA. All five jobs passed: frontend, backend, iOS, CodeQL Analyze and Dependency Review.
- PR timeline: 109 records = 53 conversation comments, 30 inline review comments and 26 formal review submissions (25 COMMENTED, one APPROVED by `tarlaci1984-sketch` on 2026-11-13). All 22 inline threads are resolved; 0 unresolved and 20 outdated. The approval body is empty and is not production or independent security-owner acceptance.
- PR description still contains superseded historical text describing the old `b46c5b8` HEAD, open/unmerged state, two open threads and zero approvals. Live metadata/ref/review APIs are authoritative; the merged PR description was not edited.
- Historical Validation [#43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), CodeQL [#43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and Dependency Review [#43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255) remain QUEUED with zero jobs on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`. These are historical queues, not failures on the merged HEAD. Repository administrator cancellation is required.

### Main governance and repository inventory

- Main HEAD is `f04587771b8ad85b1d705fd6de7c0e8ee91a164f`; repository visibility is public and the main branch reports protected=true.
- Active ruleset [#26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) enforces six strict checks (`CodeQL`, `backend`, `frontend`, `ios`, `analyze`, `dependency-review`), one approving review, stale-review dismissal, last-push approval, resolved review threads, deletion/non-fast-forward protection and no bypass actors. Main branch metadata reports protected=true; the legacy protection detail endpoint does not expose the ruleset configuration.
- Complete paginated branch inventory: 235 branches (100 + 100 + 35; next page empty). PR #41 source branch still points to its merged exact HEAD.
- GitHub Releases API returned an empty array: 0 published releases. Code Scanning, Dependabot and Secret Scanning alert inventories remain UNAVAILABLE, UNVERIFIED, NOT EMPTY because their alert endpoints are rejected by the connected integration.

### PR #271 — merged mainline minimatch remediation

- PR #271 is CLOSED/MERGED from `fix/minimatch11-audit-clean-main-20261124`; exact source HEAD `2fcf27736d58ff9b165ffd72c252f3c2f4a1ecfc`, merge commit/current main `f04587771b8ad85b1d705fd6de7c0e8ee91a164f`. It contains 6 commits and 6 changed files, with 2 APPROVED review submissions and 0 inline threads.
- Exact-source-head Validation [#45348594071](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45348594071), CodeQL [#45348594121](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45348594121), and Dependency Review [#45348594035](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45348594035): terminal SUCCESS on the same source SHA. Frontend, backend, iOS, CodeQL Analyze and Dependency Review jobs all passed.
- Frontend completed 73/73 test files; Android Release/emulator smoke and iOS Release/simulator smoke passed. Both `npm audit --audit-level=moderate` and the runtime high-threshold audit reported `found 0 vulnerabilities`; backend pip-audit reported `No known vulnerabilities found`.
- Current main `package.json` blob `bc2d839122d4136c7e261363d0b36c77561bd328` and `package-lock.json` blob `a2fc099d5601ec82df1e4292cbf19d3a13041e2d` are byte-identical to the PR #271 source-head files. Main now has Expo `~57.0.33`, expo-constants `~57.0.25`, expo-image-picker `~57.0.22`, expo-router `~57.0.32`, minimatch override `11.0.5` and lockfile resolution `11.0.5`. This resolves the mainline moderate minimatch audit finding; it does not make unavailable security-alert inventories empty.

### PR #249 — current release-documentation candidate

- PR #249 is OPEN/DRAFT at exact HEAD `7fc68d5ee8523f8b7e16aedc90ac7f3c0dce63ea` on `fix/pr233-live-checkpoint-refresh-20261123-1150`, based on PR #254 exact HEAD `2c9d9ef7a052a2a55b491925c8c40d9fc3649bd3`. PR metadata and the independent branch ref match. Current metadata: 38 commits and 5 changed files; the PR description remains stale and still describes an earlier checkpoint.
- Exact-head Validation [#45366908183](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45366908183) is terminal FAILURE. CodeQL [#45366908242](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45366908242) and Dependency Review [#45366908212](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45366908212) are terminal SUCCESS on the same exact SHA. Jobs: frontend FAILED, backend PASSED, iOS PASSED; CodeQL Analyze and Dependency Review PASSED.
- Frontend TypeScript passed, then 355 tests passed / 1 failed across 72 files (356 total; 71 test files passed and one failed). The single failure is `scripts/release-evidence-checkpoint.test.mjs:384`: the row-level test starts at the first matching workstream table in the backlog, which is a historical 2 Done / 15 In Progress / 8 Blocked summary, rather than the current canonical register at 3 Done / 14 In Progress / 8 Blocked. This is a test-scoping defect, not a demonstrated application runtime failure. Correct the test by anchoring its row parser to the current canonical register marker in the backlog; preserve the historical table and all 25 row assertions.
- Backend passed; iOS Release build and simulator smoke passed. Android Expo Doctor, export, native Release build and emulator validation were skipped after the frontend unit-test failure; the frontend runtime dependency audit was also skipped.
- PR #249 review inventory: 1 conversation comment from the GitHub Dependency Review bot, 0 formal reviews, 0 inline threads and 0 human approvals. The bot says `Scanned Files: None`; its successful Dependency Review workflow does not establish dependency-tree coverage.
- Previous parent `3c32029cd9e10f34fe7ec16fd2904e6aa25304c8` has separate historical exact-head evidence: Validation [#45354938290](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45354938290) failed, while CodeQL [#45354938573](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45354938573) and Dependency Review [#45354938357](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45354938357) passed. Those parent results are not transferred to current HEAD `7fc68d5`; its new exact-head CI must be evaluated separately and does not inherit results from `3c32029`.
### PR #254 — Expo SDK 57 alignment branch

- PR #254 is OPEN and non-draft at exact HEAD `2c9d9ef7a052a2a55b491925c8c40d9fc3649bd3`, based on the older main SHA `3a262358552a9650d865aa5bd3c92905f1e863cb`. Compared with current main `f04587771b8ad85b1d705fd6de7c0e8ee91a164f`, its branch is DIVERGED: 1 ahead / 8 behind. It has 5 APPROVED review submissions and 0 inline threads.
- Its exact-head Validation [#45223358003](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45223358003), CodeQL [#45223357946](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45223357946), and Dependency Review [#45223358018](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45223358018) are terminal SUCCESS; frontend 327/327 across 71 files, Expo Doctor 21/21, Android Release/emulator and iOS Release/simulator smoke passed. These are source-head results, not a post-rebase merge-ref check.
- This old branch's lockfile still resolves minimatch `10.2.6` and its runtime audit reported 3 MODERATE minimatch findings. Current main instead contains the SDK 57 patch versions and minimatch `11.0.5` through merged PR #271. Do not treat PR #254's stale branch audit as the current main audit.

### PR #260 — SDK 57/minimatch integration candidate

- PR #260 is OPEN/DRAFT at exact HEAD `ae74da6d8f6a8f35ceb2a5b3696578218a92bffd`, based on integration branch `integration/pr249-over-pr254-test-base-20261124-run11` at `af9c3ebd258c0aac0dcc9a293e68d6cd5e4810a3`. It has 2 commits, 7 changed files, 2 APPROVED review submissions and 0 inline threads.
- Exact-head Validation [#45317003618](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45317003618), CodeQL [#45317003576](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45317003576), and Dependency Review [#45317003567](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45317003567): terminal SUCCESS. All five jobs passed; frontend 73/73 test files, Android Release/emulator smoke, iOS Release/simulator smoke, full moderate-threshold npm audit and runtime high-threshold audit passed, with both audits reporting zero vulnerabilities.
- Its `package.json` and `package-lock.json` blobs match current main, but PR #260 remains draft and is based on an integration branch rather than main. Reconcile the base against current main and rerun exact-head CI before treating it as a merge/release candidate.

### PR #231 and PR #246 — minimatch 11 candidate

- PR #231 is OPEN/DRAFT at exact HEAD `444e312b4bf94237eedfb0af1a24922bf5853942`; Validation [#45031336861](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45031336861), CodeQL [#45031337208](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45031337208), Dependency Review [#45031336869](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45031336869): SUCCESS.
- PR #246 is OPEN/DRAFT at exact HEAD `ad614dd25d0fd11d3d50737718e7dbd88a74c89a`, based on PR #231 at `444e312b4bf94237eedfb0af1a24922bf5853942`. Validation [#45112214845](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45112214845), CodeQL [#45112214955](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45112214955), Dependency Review [#45112214927](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45112214927): SUCCESS. Frontend 335/335; full `npm audit --audit-level=moderate` and runtime high-threshold audit reported 0 vulnerabilities on this separate unmerged candidate.
- PR #246 is not integrated with PR #254. Combined SDK 57 lockfile, fingerprint compatibility and full Android/iOS validation remain required. Do not run `npm audit fix --force`; it suggests downgrading Expo to 52.0.49.


- The mainline minimatch remediation is now delivered by merged PR #271; PR #246 remains separate unmerged evidence and is not the source of the current mainline clean audit.

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

- Current candidate register: **3 Done / 14 In Progress / 8 Blocked**. Done: #1, #3, #6. In Progress: #7–#15, #17, #19, #20, #23, #24. Blocked: #2, #4, #5, #16, #18, #21, #22, #25.
- Item #3 is Done because PR #271's minimatch 11.0.5 remediation is merged into current main and the exact source-head full moderate-threshold audit returned zero vulnerabilities. This does not imply that Code Scanning, Dependabot or Secret Scanning alert inventories are empty; those remain unavailable and unverified.
- Issue #47 governance is closed, but item #2 remains Blocked until the owner's durable repository-visibility and release-plan decision is documented.
- The eight Blocked items remain: #2 durable visibility/release-plan decision; #4 physical iPhone App Attest; #5 Play-installed physical Android Play Integrity; #16 witnessed production backup/restore; #18 product-recognition benchmark and business acceptance; #21 production monitoring with witnessed alert delivery; #22 approved staged rollout and tested rollback; #25 real-user pilot and business sign-off.
- Main's separate historical register remains 3 Done / 15 In Progress / 7 Blocked. The two registers are not silently merged.

Release decision: NOT READY. Production/pilot acceptance: NOT GRANTED.

## Previous live checkpoint — 2026-11-24 10:20 CET (superseded)

Evidence refreshed from live PR metadata, independent branch refs, exact-commit Actions runs and jobs, PR conversation/review/thread APIs, issue records, paginated branch inventory, repository metadata, the active main ruleset, Releases API and all three release records. This is repository evidence only; it does not grant production or pilot acceptance.

### PR #41 — merged source baseline and review audit

- PR #41 is CLOSED/MERGED from `fix/release-blockers-2026-10` to `main`. PR metadata and independent branch ref match exact source HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge commit `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. It has 517 commits, 100 changed files, +11,887 / -2,005. Compared with current main `f04587771b8ad85b1d705fd6de7c0e8ee91a164f`, the branch is DIVERGED: 517 ahead / 12 behind.
- Exact-head Validation [#43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [#43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [#43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021): terminal SUCCESS on that exact SHA. All five jobs passed: frontend, backend, iOS, CodeQL Analyze and Dependency Review.
- PR timeline: 109 records = 53 conversation comments, 30 inline review comments and 26 formal review submissions (25 COMMENTED, one APPROVED by `tarlaci1984-sketch` on 2026-11-13). All 22 inline threads are resolved; 0 unresolved and 20 outdated. The approval body is empty and is not production or independent security-owner acceptance.
- PR description still contains superseded historical text describing the old `b46c5b8` HEAD, open/unmerged state, two open threads and zero approvals. Live metadata/ref/review APIs are authoritative; the merged PR description was not edited.
- Historical Validation [#43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), CodeQL [#43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and Dependency Review [#43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255) remain QUEUED with zero jobs on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`. These are historical queues, not failures on the merged HEAD. Repository administrator cancellation is required.

### Main governance and repository inventory

- Main HEAD is `f04587771b8ad85b1d705fd6de7c0e8ee91a164f`; repository visibility is public and the main branch reports protected=true.
- Active ruleset [#26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) enforces six strict checks (`CodeQL`, `backend`, `frontend`, `ios`, `analyze`, `dependency-review`), one approving review, stale-review dismissal, last-push approval, resolved review threads, deletion/non-fast-forward protection and no bypass actors. Main branch metadata reports protected=true; the legacy protection detail endpoint does not expose the ruleset configuration.
- Complete paginated branch inventory: 234 branches (100 + 100 + 34; next page empty). PR #41 source branch still points to its merged exact HEAD.
- GitHub Releases API returned an empty array: 0 published releases. Code Scanning, Dependabot and Secret Scanning alert inventories remain UNAVAILABLE, UNVERIFIED, NOT EMPTY because their alert endpoints are rejected by the connected integration.

### PR #271 — merged mainline minimatch remediation

- PR #271 is CLOSED/MERGED from `fix/minimatch11-audit-clean-main-20261124`; exact source HEAD `2fcf27736d58ff9b165ffd72c252f3c2f4a1ecfc`, merge commit/current main `f04587771b8ad85b1d705fd6de7c0e8ee91a164f`. It contains 6 commits and 6 changed files, with 2 APPROVED review submissions and 0 inline threads.
- Exact-source-head Validation [#45348594071](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45348594071), CodeQL [#45348594121](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45348594121), and Dependency Review [#45348594035](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45348594035): terminal SUCCESS on the same source SHA. Frontend, backend, iOS, CodeQL Analyze and Dependency Review jobs all passed.
- Frontend completed 73/73 test files; Android Release/emulator smoke and iOS Release/simulator smoke passed. Both `npm audit --audit-level=moderate` and the runtime high-threshold audit reported `found 0 vulnerabilities`; backend pip-audit reported `No known vulnerabilities found`.
- Current main `package.json` blob `bc2d839122d4136c7e261363d0b36c77561bd328` and `package-lock.json` blob `a2fc099d5601ec82df1e4292cbf19d3a13041e2d` are byte-identical to the PR #271 source-head files. Main now has Expo `~57.0.33`, expo-constants `~57.0.25`, expo-image-picker `~57.0.22`, expo-router `~57.0.32`, minimatch override `11.0.5` and lockfile resolution `11.0.5`. This resolves the mainline moderate minimatch audit finding; it does not make unavailable security-alert inventories empty.

### PR #249 — current release-documentation candidate

- PR #249 is OPEN/DRAFT at exact HEAD `3c32029cd9e10f34fe7ec16fd2904e6aa25304c8` on `fix/pr233-live-checkpoint-refresh-20261123-1150`, based on PR #254 exact HEAD `2c9d9ef7a052a2a55b491925c8c40d9fc3649bd3`. PR metadata and independent branch inventory match. Current metadata: 37 commits and 5 changed files. The PR description is stale and still describes an earlier checkpoint.
- Exact-head Validation [#45354938290](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45354938290) is terminal FAILURE. CodeQL [#45354938573](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45354938573) and Dependency Review [#45354938357](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45354938357) are terminal SUCCESS on the same exact SHA. Jobs: frontend FAILED, backend PASSED, iOS PASSED; CodeQL Analyze and Dependency Review PASSED.
- Frontend TypeScript passed, then 353 tests passed / 1 failed across 72 files (354 total; 71 test files passed and one failed). The single failure is `scripts/release-evidence-checkpoint.test.mjs:67`: the assertion expects lowercase `frontend failed, backend passed and iOS passed`, while the checkpoint records `Jobs: frontend FAILED, backend PASSED, iOS PASSED`. This is a documentation-regression assertion mismatch, not a demonstrated application runtime failure.
- Backend passed; iOS Release build and simulator smoke passed. Android Expo Doctor, export, native Release build and emulator validation were skipped after the frontend unit-test failure; frontend runtime dependency audit was also skipped. The current exact-head Validation is not successful.
- PR #249 review inventory: 1 conversation comment from the GitHub Dependency Review bot, 0 formal reviews, 0 inline threads and 0 human approvals. The bot says `Scanned Files: None`; its successful Dependency Review workflow does not establish dependency-tree coverage.
- Previous parent `079e58581f3e80ea3d7c332b9d6c2e7a1f270b10` has separate historical evidence: Validation [#45346864983](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45346864983) failed with 349 tests passed / 5 failed, while CodeQL [#45346864899](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45346864899) and Dependency Review [#45346864793](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45346864793) passed. Those parent results are not transferred to current HEAD `3c32029`; its new exact-head CI must be evaluated separately and does not inherit results from `079e585`.

### PR #254 — Expo SDK 57 alignment branch

- PR #254 is OPEN and non-draft at exact HEAD `2c9d9ef7a052a2a55b491925c8c40d9fc3649bd3`, based on the older main SHA `3a262358552a9650d865aa5bd3c92905f1e863cb`. Compared with current main `f04587771b8ad85b1d705fd6de7c0e8ee91a164f`, its branch is DIVERGED: 1 ahead / 8 behind. It has 5 APPROVED review submissions and 0 inline threads.
- Its exact-head Validation [#45223358003](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45223358003), CodeQL [#45223357946](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45223357946), and Dependency Review [#45223358018](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45223358018) are terminal SUCCESS; frontend 327/327 across 71 files, Expo Doctor 21/21, Android Release/emulator and iOS Release/simulator smoke passed. These are source-head results, not a post-rebase merge-ref check.
- This old branch's lockfile still resolves minimatch `10.2.6` and its runtime audit reported 3 MODERATE minimatch findings. Current main instead contains the SDK 57 patch versions and minimatch `11.0.5` through merged PR #271. Do not treat PR #254's stale branch audit as the current main audit.

### PR #260 — SDK 57/minimatch integration candidate

- PR #260 is OPEN/DRAFT at exact HEAD `ae74da6d8f6a8f35ceb2a5b3696578218a92bffd`, based on integration branch `integration/pr249-over-pr254-test-base-20261124-run11` at `af9c3ebd258c0aac0dcc9a293e68d6cd5e4810a3`. It has 2 commits, 7 changed files, 2 APPROVED review submissions and 0 inline threads.
- Exact-head Validation [#45317003618](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45317003618), CodeQL [#45317003576](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45317003576), and Dependency Review [#45317003567](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45317003567): terminal SUCCESS. All five jobs passed; frontend 73/73 test files, Android Release/emulator smoke, iOS Release/simulator smoke, full moderate-threshold npm audit and runtime high-threshold audit passed, with both audits reporting zero vulnerabilities.
- Its `package.json` and `package-lock.json` blobs match current main, but PR #260 remains draft and is based on an integration branch rather than main. Reconcile the base against current main and rerun exact-head CI before treating it as a merge/release candidate.

### PR #231 and PR #246 — minimatch 11 candidate

- PR #231 is OPEN/DRAFT at exact HEAD `444e312b4bf94237eedfb0af1a24922bf5853942`; Validation [#45031336861](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45031336861), CodeQL [#45031337208](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45031337208), Dependency Review [#45031336869](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45031336869): SUCCESS.
- PR #246 is OPEN/DRAFT at exact HEAD `ad614dd25d0fd11d3d50737718e7dbd88a74c89a`, based on PR #231 at `444e312b4bf94237eedfb0af1a24922bf5853942`. Validation [#45112214845](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45112214845), CodeQL [#45112214955](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45112214955), Dependency Review [#45112214927](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45112214927): SUCCESS. Frontend 335/335; full `npm audit --audit-level=moderate` and runtime high-threshold audit reported 0 vulnerabilities on this separate unmerged candidate.
- PR #246 is not integrated with PR #254. Combined SDK 57 lockfile, fingerprint compatibility and full Android/iOS validation remain required. Do not run `npm audit fix --force`; it suggests downgrading Expo to 52.0.49.


- The mainline minimatch remediation is now delivered by merged PR #271; PR #246 remains separate unmerged evidence and is not the source of the current mainline clean audit.

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

- Current candidate register: **3 Done / 14 In Progress / 8 Blocked**. Done: #1, #3, #6. In Progress: #7–#15, #17, #19, #20, #23, #24. Blocked: #2, #4, #5, #16, #18, #21, #22, #25.
- Item #3 is Done because PR #271's minimatch 11.0.5 remediation is merged into current main and the exact source-head full moderate-threshold audit returned zero vulnerabilities. This does not imply that Code Scanning, Dependabot or Secret Scanning alert inventories are empty; those remain unavailable and unverified.
- Issue #47 governance is closed, but item #2 remains Blocked until the owner's durable repository-visibility and release-plan decision is documented.
- The eight Blocked items remain: #2 durable visibility/release-plan decision; #4 physical iPhone App Attest; #5 Play-installed physical Android Play Integrity; #16 witnessed production backup/restore; #18 product-recognition benchmark and business acceptance; #21 production monitoring with witnessed alert delivery; #22 approved staged rollout and tested rollback; #25 real-user pilot and business sign-off.
- Main's separate historical register remains 3 Done / 15 In Progress / 7 Blocked. The two registers are not silently merged.

Release decision: NOT READY. Production/pilot acceptance: NOT GRANTED.
## Previous live checkpoint — 2026-11-23 22:03 CET (superseded)

Evidence refreshed from live GitHub PR metadata, exact branch refs, exact-commit Actions runs and jobs, review timelines/submissions/threads, issues, repository metadata, active ruleset, Releases API and the three release records. This checkpoint records repository and automated evidence only; it does not grant production or pilot acceptance.

### PR #41 — merged source baseline and complete review audit

- PR #41 is CLOSED/MERGED from `fix/release-blockers-2026-10` to `main`. Live PR metadata and the independent branch ref both report exact source HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge commit `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. The PR records 517 commits, 100 changed files, +11,887 additions and -2,005 deletions. Comparison with current main `3a262358552a9650d865aa5bd3c92905f1e863cb` is DIVERGED, 517 ahead / 4 behind.
- Exact-head Validation [#43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [#43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [#43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS on that exact SHA. All five jobs passed: frontend, backend, iOS, CodeQL Analyze and Dependency Review. Frontend steps including typecheck, unit tests, Expo Doctor, Android export/release/emulator smoke and runtime audit passed.
- Refreshed PR timeline: 109 records = 53 conversation comments, 30 inline review comments and 26 formal review submissions (25 COMMENTED, one human APPROVED by `tarlaci1984-sketch` on 2026-11-13). The approval body is empty and is not a production acceptance statement. All 22 inline threads are resolved; 0 unresolved and 20 outdated.
- PR #41's description body still contains superseded historical text claiming HEAD `b46c5b8`, an open/unmerged state, 2 open threads and 0 human approvals. Those statements are stale; live PR metadata, branch ref, review APIs and exact-head runs are authoritative. The merged PR was not modified.
- Historical runs [#43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), [#43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and [#43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255) remain QUEUED on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`; all three jobs endpoints return zero jobs. They are stale historical queues, not current PR #41 failures. Repository administrator cancellation is required.

### PR #249 — current release-documentation candidate

- PR #249 is OPEN/DRAFT at exact HEAD `6a7e26e8aec39e1cbd9d860e54fd35614c3cd521` on `fix/pr233-live-checkpoint-refresh-20261123-1150`, based on PR #254 exact HEAD `2c9d9ef7a052a2a55b491925c8c40d9fc3649bd3`. It has 27 commits and 4 changed files. The PR branch ref independently matches its metadata.
- Exact-head Validation [#45251454548](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45251454548), CodeQL [#45251454522](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45251454522), and Dependency Review [#45251454529](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45251454529) are terminal SUCCESS on the same SHA. All five jobs passed. Frontend: 351/351 tests across 72 files; Expo Doctor 21/21; Android native Release/emulator smoke and iOS native Release/simulator smoke passed; backend, CodeQL Analyze and Dependency Review jobs passed.
- PR #249 review inventory: 1 Dependency Review bot conversation comment, 0 formal reviews, 0 inline review threads and 0 human approvals. It remains draft and unmerged.
- Its runtime audit command `npm audit --omit=dev --audit-level=high` reports 3 MODERATE minimatch findings. The configured HIGH threshold passes, but this is not a zero-finding moderate-threshold audit. Dependency Review's clean reviewed-diff result is a different scope and does not erase the runtime audit findings.

### PR #254 — Expo SDK 57 package alignment

- PR #254 is OPEN/DRAFT at exact HEAD `2c9d9ef7a052a2a55b491925c8c40d9fc3649bd3`, based on main `3a262358552a9650d865aa5bd3c92905f1e863cb`; 1 commit and 2 changed files. Its package manifest and lockfile align `expo-constants ~57.0.25`, `expo-image-picker ~57.0.22`, `expo-router ~57.0.32`, and `@expo/metro-runtime 57.0.19`, preserving npm registry integrity metadata.
- Exact-head Validation [#45223358003](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45223358003), CodeQL [#45223357946](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45223357946), and Dependency Review [#45223358018](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45223358018) are terminal SUCCESS. All five jobs passed; Expo Doctor 21/21, frontend 327/327 across 71 files, Android Release/emulator and iOS Release/simulator smoke passed.
- PR #254 has 0 formal reviews, 0 inline review threads and 0 human approvals. It remains draft and unmerged. Its runtime high-threshold audit still reports 3 moderate minimatch findings; it is not a clean full moderate-threshold audit.

### Other release and dependency candidates

- PR #246 remains OPEN/DRAFT at exact HEAD `ad614dd25d0fd11d3d50737718e7dbd88a74c89a`, based on the separate `security/minimatch-11-current-main` candidate branch. Its Validation [#45112214845](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45112214845), CodeQL [#45112214955](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45112214955), and Dependency Review [#45112214927](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45112214927) passed. The recorded full dependency-tree moderate-threshold audit and runtime audit both reported zero vulnerabilities. This evidence is branch-specific; #246 is not integrated with #254 and requires dependency/base reconciliation before any integration.
- PR #244 remains OPEN/DRAFT at exact HEAD `6a1d531132cd457cdb997e8a677d39ace17d019a`. Validation [#45220119684](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45220119684) failed (330 passed / 4 failed); CodeQL [#45220119625](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45220119625) and Dependency Review [#45220119889](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45220119889) passed. Four picomatch patterns `+(*)`, `*(*)`, `+(a*)`, and `+(*a)` exceeded the 2,500 ms child-process timeout. GHSA-fc5q-39xc-vjpf / CVE-2026-112366 was withdrawn upstream on 2026-11-18; the measured timing behavior is real but does not establish an exploitable vulnerability. Preserve the tests and timeout while checking whether untrusted product input can reach this build-time matcher.
- PRs #255 and #256 are CLOSED; their earlier failed Validation results remain historical and are not treated as current candidate successes. PRs #251 and #252 remain separate candidate branches; no result from one branch is transferred to another.

### Issues, mainline governance, releases and security inventories

- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is CLOSED with 11 comments. Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains OPEN with 132 comments. Current main is `3a262358552a9650d865aa5bd3c92905f1e863cb`; PR #200's DNS-pinned transport is integrated. Production SSRF acceptance remains blocked by explicit independent security-owner approval, complete production NAT64/DNS64 inventory, verified deployed `USEIT_NAT64_PREFIXES`, and captured staging/production egress behavior.
- Active ruleset [#26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) targets the default branch and is ACTIVE. It requires six strict checks (`CodeQL`, `backend`, `frontend`, `ios`, `analyze`, `dependency-review`), one approving review, stale-review dismissal, last-push approval and resolved review threads; deletion and non-fast-forward are blocked; bypass actors are empty and current-user bypass is never.
- GitHub Releases API returned an empty array: 0 published releases. Code Scanning, Dependabot and Secret Scanning alert inventories are unavailable through the connected integration (the endpoint requests were rejected): UNAVAILABLE, UNVERIFIED, NOT EMPTY.

### Canonical 25-point release register

| Status | Items | Count |
|---|---|---:|
| Done | #1, #6 | 2 |
| In Progress | #3, #7–#15, #17, #19, #20, #23, #24 | 15 |
| Blocked | #2, #4, #5, #16, #18, #21, #22, #25 | 8 |
| **Total** | **#1–#25** | **25** |

The eight Blocked items remain blocked: #2 durable repository-visibility/release-plan decision; #4 physical iPhone App Attest; #5 Play-installed physical Android Play Integrity; #16 witnessed production backup/restore; #18 representative product-recognition benchmark and business acceptance; #21 production monitoring with witnessed alert delivery; #22 approved staged rollout and tested rollback; and #25 real-user pilot plus business sign-off. Main's separate historical register remains 3 Done / 15 In Progress / 7 Blocked; the two registers are not merged.

Release decision: NOT READY. Production/pilot acceptance: NOT GRANTED.

### Historical checkpoint preserved — 2026-11-23 19:31 CET (superseded by 22:03 CET)

Evidence refreshed from live GitHub PR metadata, exact-commit Actions runs and jobs, PR review timelines/submissions/threads, issue records, repository refs, the active ruleset, the Releases API, and the three release records. This checkpoint records repository and automated evidence only; it does not grant production or pilot acceptance.

### PR #41 — merged source baseline

- PR #41 is CLOSED/MERGED from `fix/release-blockers-2026-10` to `main`. Live PR metadata and the independent branch ref agree on exact source HEAD `68b380e73ca3c870048035197beef8febbf90ef1`, merge commit `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`, 517 commits, 100 changed files, +11,887 additions and -2,005 deletions.
- Exact-head Validation [#43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [#43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [#43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS on that exact SHA. Frontend, backend, iOS, CodeQL Analyze and Dependency Review jobs all passed (5/5).
- Refreshed PR timeline: 109 combined records; 53 conversation comments, 30 inline review comments, and 26 formal review submissions (25 COMMENTED, one human APPROVED by `tarlaci1984-sketch` on 2026-11-13). All 22 inline review threads are resolved: 22/22 inline review threads resolved, 0 unresolved and 20 outdated.
- Historical runs [#43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), [#43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and [#43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255) remain QUEUED on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`; all three jobs endpoints return zero jobs. They are stale historical queues, not current PR #41 failures. Repository administrator cancellation is required.

### PR #249 — current release-documentation candidate and Validation failure

- PR #249 is OPEN/DRAFT on `fix/pr233-live-checkpoint-refresh-20261123-1150`, based on PR #233 exact HEAD `1f21b900c44194739ae6c85f171c3dd657c9fc84`. Parent exact HEAD before this checkpoint update was `d4a11d82c62c98a0e2ee9c0f669a54c6ac4f8a9d`; it had 7 commits and 4 changed files (+575 / -56). The checkpoint/test-contract correction in this commit advances that branch; its own exact-head CI is pending and is not pre-claimed. PR #249 is not merged or human-approved. Review inventory before this commit: 1 Dependency Review bot conversation comment, 0 formal reviews, 0 inline threads.
- On parent exact HEAD `d4a11d8`, Validation [#45231276486](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45231276486) was terminal FAILURE; CodeQL [#45231276504](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45231276504) and Dependency Review [#45231276317](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45231276317) were terminal SUCCESS on the same SHA. Frontend job [#137914573998](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45231276486/job/137914573998) failed; backend [#137914578447](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45231276486/job/137914578447) and iOS [#137914577505](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45231276486/job/137914577505) passed. CodeQL Analyze [#137891149143](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45231276504/job/137891149143) and Dependency Review job [#137891148097](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45231276317/job/137891148097) passed.
- Frontend TypeScript passed; 338/349 unit tests passed and 11 failed. All 11 failures are stale evidence-contract assertions in `scripts/release-evidence-checkpoint.test.mjs`, not demonstrated application runtime failures. At parent `d4a11d8`, the test still required the 2026-11-23 11:50 marker at the start of each document, while the three documents started with the 18:42 live checkpoint. Its parser also stopped at a horizontal rule rather than the next top-level checkpoint heading, which mixed historical checkpoints into the latest-section comparison. This commit updates the marker to the 19:31 checkpoint, ends extraction at the next `##` heading, keeps historical assertions against the full documents, and updates current PR #244 assertions. No test is deleted, skipped, weakened or marked xfail.
- Because the unit-test step failed on parent `d4a11d8`, Expo Doctor, Android export, native Android Release build, Android emulator smoke and frontend runtime audit were skipped on that SHA. These are NOT passed.
- Earlier exact HEAD `e8e80b1931667020ebeac561bd9a0adf905a32b7` had 349/349 frontend tests pass but Expo Doctor failed 20/21 checks, identifying SDK 57 patch mismatches: `expo-constants` expected `~57.0.25` but found `~57.0.24`; `expo-image-picker` expected `~57.0.22` but found `~57.0.21`; `expo-router` expected `~57.0.32` but found `~57.0.31`. Current `package.json` and `package-lock.json` still contain those older versions. The parent `d4a11d8` run did not reach Expo Doctor, so those mismatches remain unverified on that newer exact HEAD and unresolved until the full pipeline runs.

### PR #244 — picomatch runtime observation and withdrawn advisory

- PR #244 is OPEN/DRAFT on `test/picomatch-counterexamples-20261123-run11`, exact HEAD `6a1d531132cd457cdb997e8a677d39ace17d019a`; 4 commits and one changed test file. Review inventory: 2 conversation comments, 0 formal reviews, 0 inline threads.
- Exact-head Validation [#45220119684](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45220119684) is terminal FAILURE: frontend 330 tests passed / 4 failed across 72 files; backend and iOS passed. CodeQL [#45220119625](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45220119625) and Dependency Review [#45220119889](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45220119889) are terminal SUCCESS on the same SHA. The four failures are the exact patterns `+(*)`, `*(*)`, `+(a*)`, and `+(*a)` exceeding the 2,500 ms child-process timeout; the two control patterns completed.
- The GitHub Advisory Database marks [GHSA-fc5q-39xc-vjpf / CVE-2026-112366](https://github.com/advisories/GHSA-fc5q-39xc-vjpf) WITHDRAWN on 2026-11-18 and states the advisory was withdrawn because it is not a security issue. The four measured timeouts remain reproducible observations for the tested Expo-nested `picomatch@4.0.7`, but they do not establish a confirmed vulnerability or exploitability. No evidence currently establishes that untrusted end users can supply glob patterns reaching this development/build-tool dependency. Keep the test and timeout unchanged; do not describe the withdrawn advisory as active or claim a security fix.

### Mainline SSRF remediation and issue status

- PR #200 is CLOSED/MERGED into main. Source HEAD `fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a`; current main/merge commit `3a262358552a9650d865aa5bd3c92905f1e863cb`. Source-head Validation [#44735858583](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858583), CodeQL [#44735858347](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858347), and Dependency Review [#44735858455](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858455) passed on the source SHA. Main merge-commit push Validation [#45030954025](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45030954025) and CodeQL [#45030954087](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45030954087) passed on main; no push-triggered Dependency Review run was returned, and source-PR Dependency Review is not substituted for it.
- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is CLOSED with 11 comments. Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains OPEN with 130 comments, last updated 2026-11-23 16:49:12 UTC. Production SSRF acceptance remains blocked pending independent security-owner approval, complete production NAT64/DNS64 prefix inventory, deployed `USEIT_NAT64_PREFIXES` verification, and staging/production egress tests.

### Repository governance, releases and security-alert availability

- Main HEAD: `3a262358552a9650d865aa5bd3c92905f1e863cb`. Active ruleset [#26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) requires six strict checks (CodeQL, backend, frontend, ios, analyze, dependency-review), one approving review, last-push approval, stale-review dismissal, resolved review threads, deletion/non-fast-forward protection, and has no bypass actors.
- GitHub Releases API returned 0 published releases. Code Scanning, Dependabot and Secret Scanning alert inventories are unavailable through the connected integration: unverified, not empty. No zero-alert claim is made.

### Canonical 25-point candidate register

The candidate row-level register remains exactly 25 items: **2 Done / 15 In Progress / 8 Blocked**. Done: #1, #6. In Progress: #3, #7–#15, #17, #19, #20, #23, #24. Blocked: #2, #4, #5, #16, #18, #21, #22, #25. The detailed 25-row table is preserved in `25-POINT-RELEASE-BACKLOG.md`. Main's separate historical register remains 3 Done / 15 In Progress / 7 Blocked; the two registers are not silently merged.

The eight Blocked items remain blocked: #2 durable repository-visibility/release-plan decision; #4 physical iPhone App Attest; #5 Play-installed physical Android Play Integrity; #16 witnessed production backup/restore; #18 representative product-recognition benchmark and business acceptance; #21 production monitoring with witnessed alert delivery; #22 approved staged rollout and tested rollback; and #25 real-user pilot and business sign-off.

Release decision: NOT READY. Production/pilot acceptance: NOT GRANTED.



## Current release evidence checkpoint — 2026-11-23 11:50 CET

Evidence refreshed at 10:50 UTC on 2026-11-23 from live repository metadata, all paginated branches, open PR/issue inventories, exact-head Actions runs and jobs, PR reviews and threads, issue records, the active ruleset, and the Releases API. Repository visibility is public. Main HEAD is `3a262358552a9650d865aa5bd3c92905f1e863cb`. Active ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) requires six strict status checks, one approving review, last-push approval, stale-review dismissal, resolved threads, deletion/non-fast-forward protection, and has no bypass actors. Paginated branch inventory returned 204 branches (100 + 100 + 4); the fourth page was empty. The repository has 131 open pull requests and 8 open issues. GitHub Releases API returned 0 published releases. Code Scanning, Dependabot, and Secret Scanning alert inventories are unavailable through the connected integration: unverified, not empty. This checkpoint does not grant production or pilot acceptance.

### PR #41 — merged baseline

- PR #41 is CLOSED/MERGED on `fix/release-blockers-2026-10`. Live PR metadata and the independent branch ref agree on exact HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge commit `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. PR metadata reports 517 commits, 100 changed files, +11,887 additions and -2,005 deletions. Compared with current main, the retained source branch is 517 ahead / 4 behind (diverged); no further merge or branch update is implied.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS on this exact SHA. Frontend, backend, iOS, CodeQL Analyze, and Dependency Review jobs all passed (5/5).
- Review inventory: 109 combined timeline records; 53 conversation comments, 30 inline review comments, 26 formal review submissions (25 COMMENTED and one human APPROVED by `tarlaci1984-sketch`), 22/22 inline review threads resolved, 0 unresolved, and 20 outdated threads.
- Historical runs [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255) remain QUEUED on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`; each jobs endpoint returns zero jobs. They are historical queues, not current PR #41 failures. Repository-administrator cancellation remains required.
- The PR #41 description contains superseded historical prose claiming it is open/unmerged and quoting an old head. Live metadata and the branch ref are authoritative; the closed PR description was not modified.

### Mainline SSRF remediation — PR #200

- PR #200 is CLOSED/MERGED. Source exact HEAD `fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a`; merge commit and current main HEAD `3a262358552a9650d865aa5bd3c92905f1e863cb`.
- Source-head Validation [44735858583](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858583), CodeQL [44735858347](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858347), and Dependency Review [44735858455](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858455) passed on the source SHA. Backend evidence includes 539 tests, 27 production-readiness checks, and 78 security/privacy checks.
- Main merge-commit push-triggered Validation [45030954025](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45030954025) and CodeQL [45030954087](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45030954087) are terminal SUCCESS on exact main SHA `3a262358552a9650d865aa5bd3c92905f1e863cb`. No push-triggered Dependency Review run was returned; source-PR Dependency Review is not substituted for a main push run.
- Production acceptance remains BLOCKED pending independent security-owner approval, complete production NAT64/DNS64 prefix inventory, deployed `USEIT_NAT64_PREFIXES` verification, and staging/production egress tests.

### PR #233 — current exact-head Validation failure

- PR #233 is OPEN/DRAFT at exact HEAD `1f21b900c44194739ae6c85f171c3dd657c9fc84` on `docs/release-evidence-main-sync-20261122-run13`, 18 commits and 4 changed files (+3,052 / -17), based on main `3a262358552a9650d865aa5bd3c92905f1e863cb`. The branch comparison is 18 ahead / 0 behind.
- Exact-head Validation [45153637592](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45153637592) is terminal FAILURE. CodeQL [45153637645](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45153637645) and Dependency Review [45153637640](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45153637640) are terminal SUCCESS on the same exact SHA.
- Frontend job [137638389920](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45153637592/job/137638389920) failed at unit tests: 329 passed / 4 failed across 72 test files. All four failures are stale checkpoint-string expectations: the main push Dependency Review wording changed, PR #245 evidence says “removing” rather than “deletes”, the PR #244 line includes its OPEN/DRAFT state, and the audit safety command is quoted in Markdown. The underlying evidence is present; these are documentation-test assertion mismatches, not demonstrated application runtime failures.
- Backend job [137638392077](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45153637592/job/137638392077) passed 539 pytest tests, 27 production-readiness checks, and 78 security/privacy checks; cryptography is 50.0.2 and `pip-audit` reports no known vulnerabilities. iOS job [137638393316](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45153637592/job/137638393316) passed the native Release build and simulator smoke. CodeQL Analyze job [137620986726](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45153637645/job/137620986726) and Dependency Review job [137621000006](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45153637640/job/137621000006) passed.
- Expo Doctor, Android export, native Android Release build, emulator smoke, and frontend runtime `npm audit` were skipped after the frontend unit-test failure. Runtime npm audit was skipped, not failed, on exact HEAD `1f21b900c44194739ae6c85f171c3dd657c9fc84`. The previous validated `b92b29b` candidate's runtime audit reported 3 MODERATE minimatch findings; that result is historical and is not attributed to `1f21b900`.
- Current PR #233 review inventory: 5 conversation comments, 0 formal review submissions, 0 inline review threads, and 0 human approvals. PR #233 remains draft and unapproved.

### PR #243 and PR #238 — integrated child history

- PR #243 is CLOSED/MERGED into the PR #233 branch only. Child exact HEAD `b92b29b4d605e466de3104d6fc4b7aec81c380a3` was based on previous PR #233 HEAD `835ca2f030e7d58c894fea00b39fc02ae63dc2a3`, fast-forwarded with expected-SHA and `force=false`, and did not merge anything into main. PR #243's own exact-head Validation, CodeQL, and Dependency Review all passed; those results are not substituted for PR #233's newer `2d8ca0d` result.
- PR #238 is CLOSED/MERGED into the PR #233 branch only at exact child HEAD `4a9685b361223a32c4ff49ea91fd467327bee3be`, 3 commits and 4 changed files. It was fast-forwarded with expected previous SHA and force=false, and did not merge anything into main. At that integration checkpoint PR #233 review inventory was 3 conversation comments, 0 formal review submissions, 0 inline review threads, and 0 human approvals; PR #238 review inventory was 2 conversation comments, 0 formal review submissions, 0 inline review threads, and 0 human approvals. These are historical counts, not current PR #233 counts.

### Competing and security/dependency candidates

- PR #245 is OPEN/DRAFT at exact HEAD `6ef6801fc43178b967f71ad241f160f3dc80651f`, based on old PR #233 HEAD `835ca2f030e7d58c894fea00b39fc02ae63dc2a3`. Compared with current PR #233 it is diverged: 1 ahead / 4 behind. Its one-file patch adds 23 lines and deletes 40, removing historical `8acad8` regression assertions and replacing them with a negative assertion. Do not integrate as-is; green CI does not justify weakening evidence coverage.
- PR #246 is OPEN/DRAFT at exact HEAD `ad614dd25d0fd11d3d50737718e7dbd88a74c89a`, based on PR #231 exact HEAD `444e312b4bf94237eedfb0af1a24922bf5853942`. Validation [45112214845](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45112214845), CodeQL [45112214955](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45112214955), and Dependency Review [45112214927](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45112214927) are 3/3 terminal SUCCESS. Its full `npm audit --audit-level=moderate` and runtime `npm audit --omit=dev --audit-level=high` both reported found 0 vulnerabilities. This is a candidate branch, not merged into main.
- PR #231 is OPEN/DRAFT at exact HEAD `444e312b4bf94237eedfb0af1a24922bf5853942`. Validation [45031336861](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45031336861), CodeQL [45031337208](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45031337208), and Dependency Review [45031336869](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45031336869) are 3/3 terminal SUCCESS. Its high-threshold runtime audit reported found 0 vulnerabilities, but this is not a full moderate-threshold audit; it has 0 formal reviews and 0 inline threads.
- PR #244 is OPEN/DRAFT at exact HEAD `914e5f81df1c1859bfa7e946fda5504a211718fa`. Validation [45110396689](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45110396689) is terminal FAILURE (329 passed / 4 failed across 72 files); CodeQL [45110396639](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45110396639) and Dependency Review [45110396664](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45110396664) passed. The exact six no-space patterns tested are `+(*)`, `*(*)`, `+(a*)`, `+(*a)`, `*(a*|b)`, and `+(ab|abab)`. The first four exceeded the 2500ms child timeout; `*(a*|b)` and `+(ab|abab)` completed in 27ms and 97ms. This is an unresolved security-test signal, not proof of a confirmed exploitable vulnerability. Do not relax the timeout or suppress tests without a demonstrated technical reason.
- PR #232 is OPEN/DRAFT at exact HEAD `696ac10f2bbb4a502a507a07d562fb92136b0fb2`. Validation [45040014939](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45040014939), CodeQL [45040015166](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45040015166), and Dependency Review [45040014952](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45040014952) are 3/3 terminal SUCCESS. Production Redis endpoint, TLS, sysctl, and host-hardening evidence remains outstanding.
- Historical PR #204 exact HEAD `00d2dff332888e5eb2fa731d32e2e5b3e1cc4f9f` has Validation [45017190851](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45017190851) terminal FAILURE, CodeQL [45017190867](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45017190867) and Dependency Review [45017190810](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45017190810) SUCCESS; frontend recorded 332 passed / 2 failed across 72 test files. PR #229 exact HEAD `26aafc7a2f5b3a735bc04926568ef5cbcc99f1d6` has Validation [45031397060](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45031397060), CodeQL [45031397027](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45031397027), and Dependency Review [45031397143](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45031397143) all passed on its own exact SHA.
- The previous validated PR #233 exact HEAD `b92b29b4d605e466de3104d6fc4b7aec81c380a3` runtime audit reported 3 MODERATE severity vulnerabilities (minimatch) via `@expo/fingerprint`; the high-only threshold does not mean zero vulnerabilities and this is not a clean zero-vulnerability audit. The current `1f21b900` frontend runtime audit was skipped after the unit-test failure. Do not run `npm audit fix --force`; PR #246 is the separately validated full-audit candidate.

### Issues, releases, security inventory, and 25-point register

- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is CLOSED with 11 comments. Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains OPEN with 124 comments and tracks the DNS-rebinding SSRF production acceptance boundary.
- Repository visibility is public. Paginated branch inventory returned 204 branches across three non-empty pages (100 + 100 + 4); page four was empty. The repository has 131 open pull requests and 8 open issues. GitHub Releases API returned 0 published releases. Code Scanning, Dependabot, and Secret Scanning alert inventories are unavailable through the connected integration: unverified, not empty.
- The canonical row-level 25-point register contains exactly 25 items: **2 Done / 15 In Progress / 8 Blocked**. Done: #1, #6. In Progress: #3, #7–#15, #17, #19, #20, #23, #24. Blocked: #2, #4, #5, #16, #18, #21, #22, #25. Main's separate older register remains 3 Done / 15 In Progress / 7 Blocked; the two registers are not silently merged.
- #2 remains Blocked pending the owner's durable repository-visibility/release-plan decision. #4 requires production Apple App Attest entitlement and physical-iPhone verification. #5 requires Play-installed physical Android Play Integrity. #16 requires witnessed production backup/restore. #18 requires a representative labeled product-recognition benchmark and business acceptance. #21 requires production monitoring and witnessed alert delivery. #22 requires approved staged rollout and tested rollback. #25 requires a real-user pilot and business sign-off.
- External console setup, physical iPhone/Android checks, production cloud access, witnessed backup/restore, production monitoring, staged rollout/rollback approvals, and real-user pilot/business acceptance remain Blocked until direct evidence exists. CI, simulators, emulators, and documentation do not satisfy those external gates.

**Release decision: NOT READY. Production/pilot acceptance: NOT GRANTED.** No CI result from a parent commit is attributed to a child SHA, and no simulator/emulator result is promoted into physical-device or production acceptance.

---

## Current release evidence checkpoint — 2026-11-23 09:51 CET

Evidence refreshed at 08:51 UTC on 2026-11-23 from live PR metadata, independent branch refs, exact-head Actions runs and jobs, PR conversation timelines, inline review threads and formal submissions, issue records, the active main ruleset, paginated release-branch search, and the GitHub Releases API. Repository visibility is public. Main HEAD is `3a262358552a9650d865aa5bd3c92905f1e863cb`. Ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) is ACTIVE and requires six strict checks (CodeQL, backend, frontend, ios, analyze, dependency-review), one approving review, last-push approval, stale-review dismissal, resolved review threads, deletion/non-fast-forward protection, and no bypass actors. The release-branch search returned 97 matching names and the next page was empty. GitHub Releases API returned 0 published releases. Code Scanning, Dependabot, and Secret Scanning alert inventories remain unavailable through the connected integration: unverified, not empty. This checkpoint does not grant production or pilot acceptance.

### PR #41 — merged baseline

- PR #41 is CLOSED/MERGED on branch `fix/release-blockers-2026-10`. Live PR metadata and the independent branch ref agree on exact HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge commit `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. It contains 517 commits, 100 changed files, +11,887 additions and -2,005 deletions.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS on this exact SHA. Frontend, backend, iOS, CodeQL Analyze, and Dependency Review jobs all passed (5/5).
- Review inventory: 109 combined timeline records; 53 conversation comments, 30 inline review comments, 26 formal review submissions (25 COMMENTED and one human APPROVED by `tarlaci1984-sketch`), 22/22 inline review threads resolved, 0 unresolved threads, and 20 outdated threads.
- Historical runs [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255) remain QUEUED on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`; each jobs endpoint returns zero jobs. These are historical queues, not current PR #41 failures. Repository-administrator cancellation remains required.
- The PR #41 description still contains superseded historical prose claiming it is open/unmerged and quoting an old head. Live PR metadata and the independent branch ref are authoritative; the closed PR description was not modified.

### Mainline SSRF remediation — PR #200

- PR #200 is CLOSED/MERGED. Source exact HEAD `fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a`; merge commit and current main HEAD `3a262358552a9650d865aa5bd3c92905f1e863cb`.
- Source-head Validation [44735858583](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858583), CodeQL [44735858347](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858347), and Dependency Review [44735858455](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858455) passed on the source SHA. Backend evidence includes 539 tests, 27 production-readiness checks, and 78 security/privacy checks.
- Main merge-commit push-triggered Validation [45030954025](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45030954025) and CodeQL [45030954087](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45030954087) are terminal SUCCESS on exact main SHA `3a262358552a9650d865aa5bd3c92905f1e863cb`. No push-triggered Dependency Review run was returned; the source PR's Dependency Review is not substituted for a main push run.
- The main merge commit has no separate PR-triggered workflow runs or combined status contexts. Production acceptance remains BLOCKED pending independent security-owner approval, complete production NAT64/DNS64 prefix inventory, deployed `USEIT_NAT64_PREFIXES` verification, and staging/production egress tests.

### PR #233 — current exact-head release validation

- PR #233 is OPEN/DRAFT at exact HEAD `b92b29b4d605e466de3104d6fc4b7aec81c380a3` on `docs/release-evidence-main-sync-20261122-run13`, 16 commits and 4 changed files, based on main `3a262358552a9650d865aa5bd3c92905f1e863cb`.
- PR #243 is CLOSED/MERGED into the PR #233 branch only. Its exact child HEAD is `b92b29b4d605e466de3104d6fc4b7aec81c380a3`, based on prior PR #233 HEAD `835ca2f030e7d58c894fea00b39fc02ae63dc2a3`. It was fast-forwarded with expected-SHA, `force=false`, and did not merge anything into main.
- Exact-head Validation [45131288055](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45131288055), CodeQL [45131287993](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45131287993), and Dependency Review [45131287991](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45131287991) are terminal SUCCESS on the same exact SHA. All five jobs passed (frontend, backend, iOS, CodeQL Analyze, Dependency Review).
- Frontend job [137547143310](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45131288055/job/137547143310) passed typecheck, unit tests, pinned Expo Doctor, Android export, native Android Release build, KVM setup, and Android emulator install/launch smoke. Backend job [137547143281](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45131288055/job/137547143281) passed 539 pytest tests, 27 production-readiness checks, and 78 security/privacy checks; pip-audit reported no known vulnerabilities. iOS job [137547143081](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45131288055/job/137547143081) passed native Release build and simulator smoke. CodeQL Analyze job [137547143239](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45131287993/job/137547143239) and Dependency Review job [137547142368](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45131287991/job/137547142368) passed.
- The frontend runtime `npm audit --omit=dev --audit-level=high` completed successfully but reported 3 MODERATE severity vulnerabilities (minimatch) via `@expo/fingerprint`. The high-only threshold does not mean zero vulnerabilities; this is not a clean zero-vulnerability audit. `npm audit fix --force` would downgrade Expo to 52.0.49, a breaking change. Do not run npm audit fix --force.
- PR #233 review inventory: 4 conversation comments, 0 formal review submissions, 0 inline review threads, and 0 human approvals. PR #233 remains draft and unapproved.

### PR #245 — competing test-contract branch

- PR #245 is OPEN/DRAFT at exact HEAD `6ef6801fc43178b967f71ad241f160f3dc80651f`, based on the old PR #233 HEAD `835ca2f030e7d58c894fea00b39fc02ae63dc2a3`. Compared with current PR #233 HEAD `b92b29b`, it is diverged: 1 ahead / 2 behind. Its one-file patch adds 23 lines and deletes 40.
- PR #245 exact-head Validation [45110582385](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45110582385), CodeQL [45110582323](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45110582323), and Dependency Review [45110582312](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45110582312) passed, but its test diff deletes the historical `8acad8` evidence assertions and replaces them with a negative assertion. Do not integrate this branch as-is; green CI does not justify weakening the evidence contract.

### Dependency and security candidates

- PR #246 is OPEN/DRAFT at exact HEAD `ad614dd25d0fd11d3d50737718e7dbd88a74c89a`, based on PR #231 exact HEAD `444e312b4bf94237eedfb0af1a24922bf5853942`. Validation [45112214845](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45112214845), CodeQL [45112214955](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45112214955), and Dependency Review [45112214927](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45112214927) are 3/3 terminal SUCCESS. Its full `npm audit --audit-level=moderate` and runtime `npm audit --omit=dev --audit-level=high` both reported found 0 vulnerabilities. This is a candidate branch, not merged into main.
- PR #231 is OPEN/DRAFT at exact HEAD `444e312b4bf94237eedfb0af1a24922bf5853942`. Validation [45031336861](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45031336861), CodeQL [45031337208](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45031337208), and Dependency Review [45031336869](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45031336869) are 3/3 terminal SUCCESS. Its high-threshold runtime audit reported found 0 vulnerabilities, but that is not a full moderate-threshold audit. PR #231 has 0 formal reviews and 0 inline threads.
- PR #244 exact HEAD `914e5f81df1c1859bfa7e946fda5504a211718fa` is a picomatch counterexample test candidate. Validation [45110396689](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45110396689) is terminal FAILURE (329 passed / 4 failed across 72 files); CodeQL [45110396639](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45110396639) and Dependency Review [45110396664](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45110396664) passed. Four adversarial patterns exceeded the 2500ms child timeout. This remains an unresolved security-test signal, not proof of a confirmed exploitable vulnerability. Do not relax the timeout or suppress the tests without a demonstrated technical reason.
- PR #232 is OPEN/DRAFT at exact HEAD `696ac10f2bbb4a502a507a07d562fb92136b0fb2`. Validation [45040014939](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45040014939), CodeQL [45040015166](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45040015166), and Dependency Review [45040014952](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45040014952) are 3/3 terminal SUCCESS. Production Redis endpoint, TLS, sysctl and host-hardening evidence remains outstanding.
- PR #238 is CLOSED/MERGED into the PR #233 branch only at exact HEAD `4a9685b361223a32c4ff49ea91fd467327bee3be`, 3 commits and 4 changed files. It was fast-forwarded with expected previous SHA and force=false, and did not merge anything into main. At that earlier checkpoint PR #233 review inventory was 3 conversation comments, 0 formal review submissions, 0 inline review threads, and 0 human approvals; PR #238 review inventory was 2 conversation comments, 0 formal review submissions, 0 inline review threads, and 0 human approvals.
- Historical PR #204 exact HEAD `00d2dff332888e5eb2fa731d32e2e5b3e1cc4f9f` has Validation [45017190851](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45017190851) terminal FAILURE, CodeQL [45017190867](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45017190867) and Dependency Review [45017190810](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45017190810) SUCCESS; its frontend recorded 332 passed / 2 failed. PR #229 exact HEAD `26aafc7a2f5b3a735bc04926568ef5cbcc99f1d6` has Validation [45031397060](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45031397060), CodeQL [45031397027](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45031397027), and Dependency Review [45031397143](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45031397143) all passed on its own exact SHA.
- The earlier PR #233 candidate `4a9685b361223a32c4ff49ea91fd467327bee3be` reported 3 MODERATE severity vulnerabilities (minimatch) in its runtime audit; this is not a clean zero-vulnerability audit. Do not run npm audit fix --force. PR #231 exact HEAD 444e312b4bf94237eedfb0af1a24922bf5853942 has its own high-threshold audit result only; PR #246 is the separately validated full-audit candidate.

### Issues, releases, security inventory, and 25-point register

- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is CLOSED with 11 comments. Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains OPEN with 122 comments and tracks the DNS-rebinding SSRF production acceptance boundary.
- Repository visibility is public. The paginated release-branch search returned 97 matching names and the next page was empty. GitHub Releases API returned 0 published releases. Code Scanning, Dependabot, and Secret Scanning alert inventories are unavailable through the connected integration: unverified, not empty.
- The canonical row-level 25-point register contains exactly 25 items: **2 Done / 15 In Progress / 8 Blocked**. Done: #1, #6. In Progress: #3, #7–#15, #17, #19, #20, #23, #24. Blocked: #2, #4, #5, #16, #18, #21, #22, #25. Main's separate older register remains 3 Done / 15 In Progress / 7 Blocked; the two registers are not silently merged.
- #2 remains Blocked pending the owner's durable repository-visibility/release-plan decision. #4 requires production Apple App Attest entitlement and physical-iPhone verification. #5 requires Play-installed physical Android Play Integrity. #16 requires witnessed production backup/restore. #18 requires a representative labeled product-recognition benchmark and business acceptance. #21 requires production monitoring and witnessed alert delivery. #22 requires approved staged rollout and tested rollback. #25 requires a real-user pilot and business sign-off.
- External console setup, physical iPhone/Android checks, production cloud access, witnessed backup/restore, production monitoring, staged rollout/rollback approvals, and real-user pilot/business acceptance remain Blocked until direct evidence exists. CI, simulators, emulators, and documentation do not satisfy those external gates.

**Release decision: NOT READY. Production/pilot acceptance: NOT GRANTED.** No CI result from a parent commit is attributed to a child SHA, and no simulator/emulator result is promoted into physical-device or production acceptance.

---

## Current release evidence checkpoint — 2026-11-23 06:36 CET

Evidence refreshed at 05:36 UTC on 2026-11-23 from live GitHub PR metadata, independent branch refs, exact-head Actions runs and jobs, PR conversation comments, inline review threads and formal submissions, issue records, the active main ruleset, paginated release-branch search, and the GitHub Releases API. Repository visibility is public. Main HEAD is `3a262358552a9650d865aa5bd3c92905f1e863cb`. Ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) is ACTIVE and requires six strict checks (CodeQL, backend, frontend, ios, analyze, dependency-review), one approving review, last-push approval, stale-review dismissal, resolved review threads, deletion/non-fast-forward protection, and no bypass actors. The release-branch search returned 97 matching names and the next page was empty. GitHub Releases API returned 0 published releases. Code Scanning, Dependabot, and Secret Scanning alert inventories remain unavailable through the connected integration: unverified, not empty. This checkpoint does not grant production or pilot acceptance.

### PR #41 — merged baseline

- PR #41 is CLOSED/MERGED on branch `fix/release-blockers-2026-10`. Live PR metadata and the independent branch ref agree on exact HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge commit `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. It contains 517 commits, 100 changed files, +11,887 additions and -2,005 deletions.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS on this exact SHA. Frontend, backend, iOS, CodeQL Analyze, and Dependency Review jobs all passed (5/5).
- Review inventory: 109 combined timeline records; 53 conversation comments, 30 inline review comments, 26 formal review submissions (25 COMMENTED and one human APPROVED by `tarlaci1984-sketch`), 22/22 inline review threads resolved, 0 unresolved threads, and 20 outdated threads.
- Historical runs [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255) remain QUEUED on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`; each jobs endpoint returns zero jobs. These are historical queues, not current PR #41 failures. Repository-administrator cancellation remains required.
- The PR #41 description still contains superseded historical prose claiming it is open/unmerged and quoting an old head. Live PR metadata and the independent branch ref are authoritative; the closed PR description was not modified.

### Mainline SSRF remediation — PR #200

- PR #200 is CLOSED/MERGED. Source exact HEAD `fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a`; merge commit and current main HEAD `3a262358552a9650d865aa5bd3c92905f1e863cb`.
- Source-head Validation [44735858583](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858583), CodeQL [44735858347](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858347), and Dependency Review [44735858455](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858455) passed on the source SHA. Backend evidence includes 539 tests, 27 production-readiness checks, and 78 security/privacy checks.
- Main merge-commit push-triggered Validation [45030954025](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45030954025) and CodeQL [45030954087](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45030954087) are terminal SUCCESS on exact main SHA `3a262358552a9650d865aa5bd3c92905f1e863cb`. No push-triggered Dependency Review run was returned; the source PR's Dependency Review is not substituted for a main push run.
- The main merge commit has no separate PR-triggered workflow runs or combined status contexts. Production acceptance remains BLOCKED pending independent security-owner approval, complete production NAT64/DNS64 prefix inventory, deployed `USEIT_NAT64_PREFIXES` verification, and staging/production egress tests.

### PR #233 — current exact-head Validation failure

- PR #233 is OPEN/DRAFT at exact HEAD `835ca2f030e7d58c894fea00b39fc02ae63dc2a3` on `docs/release-evidence-main-sync-20261122-run13`, 14 commits and 4 changed files (+2,455 / -17), based on main `3a262358552a9650d865aa5bd3c92905f1e863cb`.
- Validation [45108244823](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45108244823) is terminal FAILURE. CodeQL [45108244835](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45108244835) and Dependency Review [45108244803](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45108244803) are terminal SUCCESS on the same exact SHA.
- Frontend job [137479943865](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45108244823/job/137479943865) reports 345 passed / 1 failed across 72 test files. The sole failure is `scripts/release-evidence-checkpoint.test.mjs:186`: the regression test requires missing historical 8acad8c evidence, specifically the exact-head checkpoint for `8acad8c5e80206a5095e97d06e79f906fce58818`. This is a release-evidence/test-contract defect, not a demonstrated application runtime failure.
- Backend job [137479945106](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45108244823/job/137479945106) passed 539 pytest tests, 27 production-readiness checks, and 78 security/privacy checks; pip-audit reported no known vulnerabilities. iOS job [137479984376](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45108244823/job/137479984376) passed the native Release build and simulator smoke. CodeQL Analyze job [137474397520](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45108244835/job/137474397520) and Dependency Review job [137474396353](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45108244803/job/137474396353) passed.
- Expo Doctor, Android export/Release build, emulator smoke, and runtime npm audit were skipped after the frontend unit-test failure; runtime npm audit was skipped, not failed. PR #233 review inventory: 4 conversation comments, 0 formal review submissions, 0 inline review threads, and 0 human approvals.

### PR #243 and PR #245 — competing test-contract children

- PR #243 is OPEN/DRAFT at exact HEAD `571434c362fa54d2472623742a63647eb483348f`, one commit and one changed file, based on PR #233 exact HEAD `835ca2f030e7d58c894fea00b39fc02ae63dc2a3`. Its Validation [45109873771](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45109873771) is terminal FAILURE; CodeQL [45109873749](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45109873749) and Dependency Review [45109873765](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45109873765) are terminal SUCCESS. The patch changes the `cc4c3f7` historical assertions to search the complete documents instead of only the latest checkpoint and preserves the assertions. Its frontend failure remains the missing `8acad8` historical evidence. Review inventory: 2 conversation comments, 0 formal reviews, 0 inline threads, 0 human approvals.
- PR #245 is OPEN/DRAFT at exact HEAD `6ef6801fc43178b967f71ad241f160f3dc80651f`, one commit and one changed file, based on PR #233 exact HEAD `835ca2f030e7d58c894fea00b39fc02ae63dc2a3`. Validation [45110582385](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45110582385), CodeQL [45110582323](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45110582323), and Dependency Review [45110582312](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45110582312) are 3/3 terminal SUCCESS with all five jobs passing. Its diff deletes the historical `8acad8` evidence assertions and replaces them with a negative assertion, weakening regression coverage. Do not integrate this patch as-is. Review inventory: 1 conversation comment, 0 formal reviews, 0 inline threads, 0 human approvals.

### PR #238 — integrated child correction

- PR #238 is CLOSED/MERGED into the PR #233 branch only at exact HEAD `4a9685b361223a32c4ff49ea91fd467327bee3be`, 3 commits and 4 changed files. The child branch was fast-forwarded with expected previous SHA and force=false; it did not merge anything into main.
- At the integration checkpoint, PR #233 review inventory: 3 conversation comments, 0 formal review submissions, 0 inline review threads, and 0 human approvals. PR #238 review inventory: 2 conversation comments, 0 formal review submissions, 0 inline review threads, and 0 human approvals.

### PR #231 and PR #246 — minimatch remediation and full dependency audit

- PR #231 is OPEN/DRAFT at exact HEAD `444e312b4bf94237eedfb0af1a24922bf5853942`. PR #231 exact HEAD 444e312b4bf94237eedfb0af1a24922bf5853942: Validation [45031336861](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45031336861), CodeQL [45031337208](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45031337208), and Dependency Review [45031336869](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45031336869) are terminal SUCCESS on that exact SHA. Its runtime audit reported found 0 vulnerabilities at the configured high threshold; the candidate remains unmerged with 0 formal reviews and 0 inline threads.
- The earlier validated PR #233 exact HEAD `4a9685b361223a32c4ff49ea91fd467327bee3be` reported 3 MODERATE severity vulnerabilities (minimatch) in the runtime npm audit. This is not a clean zero-vulnerability audit. Do not run npm audit fix --force; use targeted, compatibility-verified dependency updates and rerun the audit.
- PR #246 is OPEN/DRAFT at exact HEAD `ad614dd25d0fd11d3d50737718e7dbd88a74c89a`, based on PR #231 exact HEAD `444e312b4bf94237eedfb0af1a24922bf5853942`, with 2 commits and 2 changed files. Validation [45112214845](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45112214845), CodeQL [45112214955](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45112214955), and Dependency Review [45112214927](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45112214927) are 3/3 terminal SUCCESS; frontend, backend, iOS, CodeQL Analyze and Dependency Review jobs all passed (5/5). Its frontend log confirms the full `npm audit --audit-level=moderate` and runtime `npm audit --omit=dev --audit-level=high` both reported found 0 vulnerabilities. This is candidate-branch evidence only; it is not merged into main.

### PR #232, PR #244, PR #204, and PR #229 — other active candidates

- PR #232 is OPEN/DRAFT at exact HEAD `696ac10f2bbb4a502a507a07d562fb92136b0fb2`. Validation [45040014939](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45040014939), CodeQL [45040015166](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45040015166), and Dependency Review [45040014952](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45040014952) are 3/3 terminal SUCCESS. Production Redis endpoint, TLS, sysctl and host-hardening evidence remains outstanding.
- PR #244 is OPEN/DRAFT at exact HEAD `914e5f81df1c1859bfa7e946fda5504a211718fa`; PR #244 exact HEAD `914e5f81df1c1859bfa7e946fda5504a211718fa` is a test-only picomatch counterexample candidate. Validation [45110396689](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45110396689) is terminal FAILURE; CodeQL [45110396639](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45110396639) and Dependency Review [45110396664](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45110396664) are terminal SUCCESS. Frontend tests report 329 passed / 4 failed across 72 files: `+(*)`, `*(*)`, `+(a*)`, and `+(*a)` exceeded the 2500ms child timeout. Backend and iOS passed. This is an unresolved security-test signal, not proof of a confirmed exploitable vulnerability.
- PR #204 exact HEAD `00d2dff332888e5eb2fa731d32e2e5b3e1cc4f9f` has Validation [45017190851](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45017190851) terminal FAILURE, CodeQL [45017190867](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45017190867) and Dependency Review [45017190810](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45017190810) SUCCESS; its frontend recorded 332 passed / 2 failed across 72 test files. PR #229 exact HEAD `26aafc7a2f5b3a735bc04926568ef5cbcc99f1d6` has Validation [45031397060](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45031397060), CodeQL [45031397027](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45031397027), and Dependency Review [45031397143](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45031397143) all passed on its own exact SHA.
- Historical review evidence retained: PR #85 current exact HEAD `e3cc12a5ecb36877bdee5984ddd09d5e4f8f7bc9`, 9/9 resolved inline threads, three commits behind current main at that capture; PR #171 exact HEAD `cd3cd0e01f8dab9c1ac8e47c923a05134857d47d`; PR #172 exact HEAD `5e0f0c000a3a3707e5565c32804e4d221a886caa`.

### Issues, releases, security inventory, and canonical 25-point register

- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is CLOSED with 11 comments. Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains OPEN with 121 comments and tracks the DNS-rebinding SSRF production acceptance boundary.
- The canonical row-level register contains exactly 25 items: 2 Done / 15 In Progress / 8 Blocked. Done: #1 and #6. In Progress: #3, #7–#15, #17, #19, #20, #23, and #24. Blocked: #2, #4, #5, #16, #18, #21, #22, and #25. Main's separate older register remains 3 Done / 15 In Progress / 7 Blocked; the two registers are not silently merged.
- #2 remains Blocked pending the owner's durable repository-visibility/release-plan decision. #4 requires production Apple App Attest entitlement and physical-iPhone verification. #5 requires Play-installed physical Android Play Integrity. #16 requires witnessed production backup/restore. #18 requires a representative labeled product-recognition benchmark and business acceptance. #21 requires production monitoring and witnessed alert delivery. #22 requires approved staged rollout and tested rollback. #25 requires a real-user pilot and business sign-off.
- External console setup, physical iPhone/Android checks, production cloud access, witnessed backup/restore, production monitoring, staged rollout/rollback approvals, and real-user pilot/business acceptance remain blocked until evidence exists. CI, simulators, emulators, and documentation do not satisfy those external gates.

**Release decision: NOT READY. Production/pilot acceptance: NOT GRANTED.** No CI result from a parent commit is attributed to a child SHA, and historical queued workflows are not treated as successful.

---

## Current release evidence checkpoint — 2026-11-23 04:45 CET

Evidence refreshed at 03:45 UTC on 2026-11-23 from live PR metadata, the independent PR #41 branch ref, exact-head Actions workflow runs and jobs, PR conversation timelines, inline review threads, formal review submissions, issue records, the active main ruleset, paginated release-branch search, and the GitHub Releases API. Repository visibility is public. Main HEAD is 3a262358552a9650d865aa5bd3c92905f1e863cb. Ruleset 26370589 is active with six strict required status checks, one approving review, last-push approval, stale-review dismissal, resolved review threads, deletion/non-fast-forward protection, and no bypass actors. The release-branch search returned 97 matching names and the next page was empty. GitHub Releases API returned 0 published releases. Code Scanning, Dependabot, and Secret Scanning alert inventories remain unavailable through the connected integration: unverified, not empty. This checkpoint does not grant production or pilot acceptance.

### PR #41 — merged baseline

- PR #41 is CLOSED/MERGED on branch fix/release-blockers-2026-10. Live PR metadata and the independent branch ref agree on exact HEAD 68b380e73ca3c870048035197beef8febbf90ef1; merge commit f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1. It contains 517 commits, 100 changed files, +11,887 additions and -2,005 deletions.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS on this exact SHA. Frontend, backend, iOS, CodeQL Analyze, and Dependency Review jobs all passed (5/5).
- Review inventory: 109 combined timeline records; 53 conversation comments, 30 inline review comments, 26 formal review submissions (25 COMMENTED and one human APPROVED by tarlaci1984-sketch), 22/22 inline review threads resolved, 0 unresolved threads, and 20 outdated threads.
- Historical runs [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255) remain QUEUED on obsolete SHA b46c5b8082ecbebd263a86cd53b1321a86e570d1; each jobs endpoint returns zero jobs. These are historical queues, not current PR #41 failures. Repository-administrator cancellation remains required.
- The PR #41 description still contains superseded historical prose claiming it is open/unmerged and quoting an old head. Live PR metadata and the independent branch ref are authoritative; the closed PR description was not modified.

### Mainline SSRF remediation — PR #200

- PR #200 is CLOSED/MERGED. Source exact HEAD fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a; merge commit and current main HEAD 3a262358552a9650d865aa5bd3c92905f1e863cb.
- Source-head Validation [44735858583](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858583), CodeQL [44735858347](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858347), and Dependency Review [44735858455](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858455) passed on the source SHA. Backend evidence includes 539 tests, 27 production-readiness checks, and 78 security/privacy checks.
- Main merge-commit push-triggered Validation [45030954025](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45030954025) and CodeQL [45030954087](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45030954087) are terminal SUCCESS on exact main SHA 3a262358552a9650d865aa5bd3c92905f1e863cb. No push-triggered Dependency Review run was returned; the source PR's Dependency Review is not substituted for a main push run.
- The main merge commit has no separate PR-triggered workflow runs or combined status contexts. Production acceptance remains blocked pending independent security-owner approval, complete production NAT64/DNS64 prefix inventory, deployed USEIT_NAT64_PREFIXES verification, and staging/production egress tests.

### PR #233 — current exact-head validation failure

- PR #233 is OPEN/DRAFT on docs/release-evidence-main-sync-20261122-run13, current exact HEAD `cc4c3f7b00d4ac7b7c1e3cc1c382b548a1362537`, 13 commits and 4 changed files; base main SHA is `3a262358552a9650d865aa5bd3c92905f1e863cb`.
- Validation [45102371195](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45102371195) is terminal FAILURE. CodeQL [45102371200](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45102371200) and Dependency Review [45102371250](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45102371250) are terminal SUCCESS on the same exact SHA.
- Frontend job [137463168713](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45102371195/job/137463168713) reports 343 passed / 1 failed across 72 test files. The sole failure is `scripts/release-evidence-checkpoint.test.mjs`: the current checkpoint omits the required safety instruction `Do not run npm audit fix --force`, even though the previous validated PR #233 runtime audit recorded three moderate minimatch findings. This is a documentation/test-contract mismatch, not an application-code failure. Preserve the assertion and add the explicit instruction to all three release records.
- Backend job [137463171003](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45102371195/job/137463171003) passed 539 pytest tests, 27 production-readiness checks, and 78 security/privacy checks. iOS job [137463201544](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45102371195/job/137463201544) passed the native Release build and simulator smoke. CodeQL Analyze job [137455905257](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45102371200/job/137455905257) and Dependency Review job [137455905249](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45102371250/job/137455905249) passed.
- Expo Doctor, Android export, Android native Release build, KVM setup, emulator smoke, and runtime npm audit were skipped after the frontend unit-test failure; runtime npm audit was skipped, not failed. PR #233 review inventory: 3 conversation comments, 0 formal review submissions, 0 inline review threads, and 0 human approvals.

### Previous validated PR #233 exact head and PR #238 integration

- Previous validated PR #233 exact HEAD is `4a9685b361223a32c4ff49ea91fd467327bee3be`, 11 commits and 4 changed files. Validation [45093002583](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45093002583), CodeQL [45093002548](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45093002548), and Dependency Review [45093002611](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45093002611) were terminal SUCCESS on the same exact SHA. Frontend, backend, iOS, CodeQL Analyze, and Dependency Review jobs all passed (5/5). Frontend recorded 340 passed across 72 test files. Runtime npm audit reported 3 MODERATE severity vulnerabilities (minimatch); this is not a clean zero-vulnerability audit and the high-only threshold passing does not mean the runtime dependency tree is clean. Do not run npm audit fix --force; use targeted, compatibility-verified dependency updates and rerun the runtime audit. Backend passed 539 pytest tests, 27 production-readiness checks, and 78 security/privacy checks; pip-audit reported No known vulnerabilities found. Android emulator smoke and iOS simulator smoke passed.
- PR #238 is CLOSED/MERGED into the PR #233 branch only at exact HEAD 4a9685b361223a32c4ff49ea91fd467327bee3be, 3 commits and 4 changed files. The child branch was fast-forwarded with expected previous SHA and force=false; the branches became identical and did not merge anything into main. PR #238 review inventory: 2 conversation comments, 0 formal review submissions, 0 inline review threads, and 0 human approvals. PR #233 review inventory: 3 conversation comments, 0 formal review submissions, 0 inline review threads, and 0 human approvals.

### Other release candidates

- PR #204 exact HEAD 00d2dff332888e5eb2fa731d32e2e5b3e1cc4f9f has a Validation failure; its two frontend failures are documentation assertions. PR #229 exact HEAD 26aafc7a2f5b3a735bc04926568ef5cbcc99f1d6, PR #231 exact HEAD 444e312b4bf94237eedfb0af1a24922bf5853942, and PR #232 exact HEAD 696ac10f2bbb4a502a507a07d562fb92136b0fb2 have previously recorded exact-head 3/3 successful workflows. Their external acceptance and review requirements remain separate.
- PR #231's minimatch 11 candidate reported found 0 vulnerabilities on its own exact HEAD. It remains a separate open candidate and has not been merged into main.

### Issues, releases, security inventory, and release register

- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is CLOSED with 11 comments. Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains OPEN with 119 comments and tracks the DNS-rebinding SSRF production acceptance boundary.
- The active main ruleset is [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589), with six strict checks, one approval, last-push approval, resolved-thread enforcement, deletion/non-fast-forward protection, and no bypass actors. Repository visibility is public. The release-branch search returned 96 matching names; the next page was empty. GitHub Releases API returned 0 published releases.
- Code Scanning, Dependabot, and Secret Scanning alert inventories are unavailable through the connected integration: unverified, not empty. Successful CodeQL and Dependency Review workflows do not prove those repository-wide inventories are empty.
- The canonical row-level register contains 25 items: 2 Done / 15 In Progress / 8 Blocked. Done: #1 and #6. In Progress: #3, #7–#15, #17, #19, #20, #23, and #24. Blocked: #2, #4, #5, #16, #18, #21, #22, and #25. External console setup, physical iPhone/Android checks, production cloud access, witnessed backup/restore, production monitoring, staged rollout/rollback approvals, and real-user pilot/business acceptance remain blocked until evidence exists.
- The three release records share this exact checkpoint. No external acceptance item is promoted by CI, simulator, emulator, or documentation evidence.

**Release decision: NOT READY. Production/pilot acceptance: NOT GRANTED.** Do not attribute parent-commit CI to a child SHA, and do not treat historical queued workflows as successful.

---

### Historical PR #233 checkpoint — 2026-11-23 02:55 CET

- PR #233 is OPEN/DRAFT on docs/release-evidence-main-sync-20261122-run13, current exact HEAD `8acad8c5e80206a5095e97d06e79f906fce58818`, 12 commits and 4 changed files.
- Validation [45097970332](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45097970332) was terminal FAILURE; CodeQL [45097970383](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45097970383) and Dependency Review [45097970305](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45097970305) were terminal SUCCESS on the same exact SHA.
- Frontend job [137449656002](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45097970332/job/137449656002) reported 343 passed / 1 failed across 72 test files. The sole failure was the historical 340 passed assertion is incorrectly scoped to latestSections; this was an evidence-scope/test-contract failure, not an application runtime failure.
- Backend job [137449658202](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45097970332/job/137449658202) passed 539 pytest tests, 27 production-readiness checks, and 78 security/privacy checks; pip-audit reported no known vulnerabilities. iOS job [137449657218](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45097970332/job/137449657218) passed the native Release build and simulator smoke.
- The runtime npm audit was skipped, not failed. CodeQL Analyze job [137441955103](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45097970383/job/137441955103) and Dependency Review job [137441954598](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45097970305/job/137441954598) passed.
- PR #233 review inventory at this historical capture: 3 conversation comments, 0 formal review submissions, 0 inline review threads, and 0 human approvals.

---

## Current release evidence checkpoint — 2026-11-23 01:12 CET

Evidence refreshed at 00:12 UTC on 2026-11-23 from live GitHub reads of PR metadata, exact-head workflow runs and jobs, review submissions and inline threads, issue states/comments, branch refs, release records, and the active main ruleset. Repository visibility is public. Main HEAD is 3a262358552a9650d865aa5bd3c92905f1e863cb. Ruleset 26370589 is active on main and requires six strict status checks, one approving review, last-push approval, stale-review dismissal, resolved review threads, deletion/non-fast-forward protection, and no bypass actors. GitHub Releases API returned 0 published releases. Code Scanning, Dependabot, and Secret Scanning alert inventories remain unavailable through the connected integration: unverified, not empty. The 23:21 and 23:54 evidence below is retained as history; the final 01:12 section supersedes it where values differ. This checkpoint does not grant production or pilot acceptance.

### PR #41 — merged baseline

- PR #41 is CLOSED/MERGED on branch fix/release-blockers-2026-10. Live PR metadata and the independent branch ref agree on exact HEAD 68b380e73ca3c870048035197beef8febbf90ef1; merge commit f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1. It contains 517 commits, 100 changed files, +11,887 additions and -2,005 deletions.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS on this exact SHA. Frontend, backend, iOS, CodeQL Analyze, and Dependency Review jobs all passed (5/5).
- Review inventory: 109 combined timeline records; 53 conversation comments, 30 inline review comments, 26 formal review submissions (25 COMMENTED and one human APPROVED by tarlaci1984-sketch), 22/22 inline review threads resolved, 0 unresolved threads, and 20 outdated threads.
- Historical runs [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255) remain QUEUED on obsolete SHA b46c5b8082ecbebd263a86cd53b1321a86e570d1; each jobs endpoint returns zero jobs. These are historical queues, not current PR #41 failures. Repository-administrator cancellation remains required.
- The PR #41 description still contains superseded historical prose claiming it is open/unmerged and quoting an old head. Live PR metadata and the branch ref are authoritative; the closed PR description was not modified.

### Mainline SSRF remediation — PR #200

- PR #200 is CLOSED/MERGED. Source exact HEAD fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a; merge commit and current main HEAD 3a262358552a9650d865aa5bd3c92905f1e863cb.
- Source-head Validation [44735858583](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858583), CodeQL [44735858347](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858347), and Dependency Review [44735858455](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858455) passed on the source SHA. Backend evidence includes 539 tests, 27 production-readiness checks, and 78 security/privacy checks.
- The main merge commit has no separate PR-triggered workflow runs or combined status contexts in the available endpoints. Source-head CI is not transferred to the merge commit.
- Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains OPEN with 115 comments. Mainline DNS-pinned transport and real HTTPX/httpcore/TLS regression evidence is recorded there. Production acceptance remains BLOCKED pending independent authorized security-owner approval, complete production NAT64/DNS64 prefix inventory, direct verification of deployed USEIT_NAT64_PREFIXES, and staging/production egress tests.

### PR #204 and PR #229 — historical documentation candidates

- PR #204 is OPEN/DRAFT on docs/release-evidence-current-main-20261120-run11, exact HEAD 00d2dff332888e5eb2fa731d32e2e5b3e1cc4f9f, with 23 commits and 4 changed files. Its base e12d6daca4cdb19c7c4bd0b0a1610e96e851b266 is older than current main.
- PR #204 exact-head Validation [45017190851](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45017190851) is terminal FAILURE; CodeQL [45017190867](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45017190867) and Dependency Review [45017190810](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45017190810) are terminal SUCCESS on that same SHA. Frontend failed two documentation assertions (332 passed / 2 failed across 72 test files); backend passed 450 pytest tests, 27 production-readiness checks and 78 security/privacy checks, installed cryptography 50.0.2 and passed pip-audit with no known vulnerabilities; iOS passed native Release build and simulator install/launch smoke.
- PR #229 is OPEN/DRAFT on fix/pr204-release-checkpoint-assertions-20261122-run12-child, exact HEAD 26aafc7a2f5b3a735bc04926568ef5cbcc99f1d6, with 3 commits and 1 changed file. Its own Validation [45031397060](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45031397060), CodeQL [45031397027](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45031397027), and Dependency Review [45031397143](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45031397143) are terminal SUCCESS on that exact SHA; frontend, backend, iOS, CodeQL Analyze and Dependency Review jobs all passed. The PR #229 test correction is carried forward by content in PR #233; no parent CI result is transferred.

### Current-main dependency and Redis candidates

- PR #231 is OPEN/DRAFT on security/minimatch-11-current-main-20261122, exact HEAD 444e312b4bf94237eedfb0af1a24922bf5853942. Validation [45031336861](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45031336861), CodeQL [45031337208](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45031337208), and Dependency Review [45031336869](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45031336869) are 3/3 terminal SUCCESS on that exact SHA. Its frontend runtime audit npm audit --omit=dev --audit-level=high reported found 0 vulnerabilities; Android emulator smoke passed. PR #231 has 0 formal reviews and 0 inline threads; it remains unapproved and draft.
- PR #232 is OPEN/DRAFT on fix/release-register-2026-11-22-redis-acceptance, exact HEAD 696ac10f2bbb4a502a507a07d562fb92136b0fb2. Validation [45040014939](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45040014939), CodeQL [45040015166](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45040015166), and Dependency Review [45040014952](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45040014952) are 3/3 terminal SUCCESS on that exact SHA. Production Redis endpoint, TLS, sysctl, and host-hardening evidence remains outstanding.

### PR #233 — current exact-head Validation failure

- PR #233 is OPEN/DRAFT at exact HEAD 6805604d5781ff62284a94beb5d77f39b816ccf9 on docs/release-evidence-main-sync-20261122-run13, based directly on main 3a262358552a9650d865aa5bd3c92905f1e863cb. The PR metadata and independent branch ref agree. It has 7 commits and 4 changed files (+1,948 / -13).
- Exact-head Validation [45073803426](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45073803426) is terminal FAILURE; CodeQL [45073803442](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45073803442) and Dependency Review [45073803419](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45073803419) are terminal SUCCESS on this same SHA.
- Frontend job [137372295266](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45073803426/job/137372295266) failed at Unit tests: 335 passed / 2 failed across 72 test files. Both failures are brittle checkpoint-test wording mismatches, not application/runtime failures: the test expected 450 tests while the PR #204 evidence correctly says 450 pytest tests; the test expected fast-forward with expected-SHA while the PR #236 provenance correctly says fast-forwarded with expected-SHA. The targeted test correction is to align those two assertions with the documented evidence, not to change application code or weaken the checks.
- Backend job [137372346371](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45073803426/job/137372346371) passed 539 pytest tests, 27 production-readiness checks, and 78 security/privacy checks; cryptography 50.0.2 was installed and pip-audit reported no known vulnerabilities. iOS job [137372296410](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45073803426/job/137372296410) passed native Release build and simulator smoke. The frontend job stopped at Unit tests, so Expo Doctor, Android export/release build, emulator smoke, and runtime npm audit were skipped; this is not an npm audit failure.
- PR #236 is CLOSED/MERGED into the PR #233 branch only at commit ea2ee9e6e8d3e4b30dd9bac2f10bff0dd0d1e461. Its one-line regression-test correction was fast-forwarded with expected-SHA and force=false; no concurrent work was overwritten.
- Historical PR #233 HEAD 6cf6f262697fbf0682d0c48c66ced56fcb46c000 had Validation FAILURE (333 passed / 4 failed across 72 test files), while CodeQL and Dependency Review succeeded. Its earlier parent 1a35bf4aa51b5d0f623728c4645e42b5df0fe54c had Validation FAILURE (336 passed / 1 failed across 72 test files), while CodeQL and Dependency Review succeeded. These are historical results, not current-head results.
- PR #233 review inventory: 2 conversation comments, 0 formal review submissions, 0 inline review threads, and 0 human approvals. Dependency Review's bot comment reports no vulnerabilities, license issues, or Scorecard issues in the docs-only diff; its Scanned Files section says None. Human review and approval remain outstanding.
- The PR #229 test correction is carried forward by content in PR #233; it was not authored on the PR #204 branch. No parent CI result is transferred to the current PR #233 exact head.

### Issues and security inventory

- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is CLOSED with 11 comments.
- Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains OPEN with 115 comments; production acceptance is still blocked as described above.
- Code Scanning, Dependabot, and Secret Scanning alert inventories are unavailable through the connected integration: unverified, not empty. GitHub Releases API returned 0 published releases.
- The repository is public. Main ruleset 26370589 is active with six strict required checks, one approving review, last-push approval, resolved threads, deletion/non-fast-forward protection, and no bypass actors.

### Canonical 25-point release register

The candidate row-level register contains exactly 25 items and parses to **2 Done / 15 In Progress / 8 Blocked**. Done: **#1, #6**. In Progress: **#3, #7–#15, #17, #19, #20, #23, #24**. Blocked: **#2, #4, #5, #16, #18, #21, #22, #25**.
- **#2** remains Blocked pending the owner's durable repository-visibility/release-plan decision. **#4** requires production Apple App Attest entitlement and physical-iPhone verification. **#5** requires Play-installed physical Android Play Integrity. **#16** requires witnessed production backup/restore. **#18** requires a representative labeled product-recognition benchmark and business acceptance. **#21** requires production monitoring and witnessed alert delivery. **#22** requires approved staged rollout and tested rollback. **#25** requires a real-user pilot and explicit business sign-off.
- No physical-device, production-cloud, backup/restore, monitoring, rollout, or business-acceptance item is promoted by CI, simulator, or emulator evidence.

**Release decision: NOT READY. Production/pilot acceptance: NOT GRANTED.** No CI result from a parent commit or queued workflow is attributed to a child SHA.

### Live exact-head refresh — 2026-11-22 23:54 CET

This addendum preserves the earlier checkpoints as history and records the fresh exact-head state. A parent, sibling, or older base run is not transferred to a different SHA.

#### PR #233 current and historical exact heads

- Historical PR #233 HEAD `6cf6f262697fbf0682d0c48c66ced56fcb46c000`: **6 commits and 4 changed files** against main. Validation [#45067156099](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45067156099) was terminal **FAILURE**; CodeQL [#45067156045](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45067156045) and Dependency Review [#45067156113](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45067156113) succeeded. Frontend Unit tests reported **333 passed / 4 failed across 72 test files**. Backend and iOS jobs succeeded; runtime npm audit was skipped because the frontend Unit-test step failed first.
- Historical PR #233 HEAD `6805604d5781ff62284a94beb5d77f39b816ccf9`: **7 commits and 4 changed files**. Validation [#45073803426](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45073803426) was terminal **FAILURE**; CodeQL [#45073803442](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45073803442) and Dependency Review [#45073803419](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45073803419) succeeded. Frontend Unit tests reported **335 passed / 2 failed across 72 test files**. Backend job [137372346371](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45073803426/job/137372346371) passed 539 pytest tests, 27 production-readiness checks, and 78 security/privacy checks; iOS job [137372296410](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45073803426/job/137372296410) passed the native Release build and simulator smoke. Runtime npm audit was skipped after the frontend Unit-test failure. This is the base SHA of PR #237, not the current PR #233 head.
- Current PR #233 exact HEAD is `dd732252a3a8eea5211ca0a5324c61eca044a8c4`, **8 commits and 4 changed files**. Validation [#45077680540](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45077680540) is terminal **FAILURE**; CodeQL [#45077680551](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45077680551) and Dependency Review [#45077680544](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45077680544) succeeded. Frontend job [137384099462](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45077680540/job/137384099462) reports **337 passed / 1 failed across 72 test files**. The sole failure is the checkpoint test at `scripts/release-evidence-checkpoint.test.mjs:80`: the latest section omits the historical `6 commits and 4 changed files` record that the regression test requires. This is a missing documentation-evidence assertion, not an application runtime failure. Android/Expo Doctor did not run after that failure; runtime npm audit was skipped, not failed. Backend job [137384139535](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45077680540/job/137384139535) passed 539 pytest tests, 27 production-readiness checks, and 78 security/privacy checks; the job log reports cryptography 50.0.2 and pip-audit with no known vulnerabilities. iOS job [137384100732](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45077680540/job/137384100732) passed the native Release build and simulator smoke.
- PR #233 review inventory at this refresh: **2 conversation comments, 0 formal review submissions, 0 inline review threads, 0 human approvals**.
- PR #237 is a separate child at exact HEAD `fe6178ce5d342dc7a9dbf9eb4594e51167622503`; its Validation [#45074564943](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45074564943), CodeQL [#45074565015](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45074565015), and Dependency Review [#45074564951](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45074564951) are **3/3 terminal SUCCESS**. Its PR base SHA is still `6805604d5781ff62284a94beb5d77f39b816ccf9`, not current PR #233 HEAD `dd7322...`; therefore those green runs do not validate the current PR #233 head. Its frontend audit reported **3 moderate minimatch findings**, not a clean audit. PR #237 has 0 formal reviews and 0 inline threads.

#### PR #85 and release checkpoint chain

- PR #85 current exact HEAD `e3cc12a5ecb36877bdee5984ddd09d5e4f8f7bc9`: Validation [#45073743589](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45073743589), CodeQL [#45073743569](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45073743569), and Dependency Review [#45073743660](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45073743660) are **3/3 terminal SUCCESS**. The frontend runtime audit still reports **3 moderate minimatch findings**; it does not report picomatch. Review inventory: 16 COMMENTED submissions, 9/9 resolved inline threads, 0 human approvals; `tarlaci1984-sketch` remains requested. PR #85's base SHA `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1` is **three commits behind current main** `3a262358552a9650d865aa5bd3c92905f1e863cb`; passing source-head checks do not replace a current-base review.
- PRs #163–#166 and #168–#169 have terminal Validation failures in frontend Unit-test assertions; their exact-head CodeQL and Dependency Review runs succeeded. PRs #167 and #170 instead failed the runtime npm audit step with 28 findings; these are historical pre-withdrawal audit results, not evidence of an active GitHub-reviewed HIGH picomatch advisory. Each of #163–#170 currently has 0 formal review submissions and 0 inline review threads.
- PR #171 exact HEAD `cd3cd0e01f8dab9c1ac8e47c923a05134857d47d`: Validation [#44358862088](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44358862088), CodeQL [#44358862249](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44358862249), Dependency Review [#44358862085](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44358862085) all succeeded.
- PR #172 exact HEAD `5e0f0c000a3a3707e5565c32804e4d221a886caa`: Validation [#44350568289](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44350568289), CodeQL [#44350568525](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44350568525), Dependency Review [#44350568368](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44350568368) all succeeded. #171 and #172 remain sibling commits on the same tree `cf955182d98cae2e19f10c0e08f8e12621cb5242`; each has 0 formal reviews and 0 inline threads. Their frontend audits each show **3 moderate minimatch findings and no picomatch finding**. Neither PR is auto-closed or merged.
- Issue #74 remains **64 items / 41 checked / 23 open**. The separate 25-point release register remains **2 Done / 15 In Progress / 8 Blocked**. No checkbox or release-register row is changed by this evidence refresh.


### Live exact-head refresh — 2026-11-23 01:12 CET

Evidence refreshed at 00:12 UTC. This update records the last fully observed branch heads before this documentation/test commit. The new commit will trigger its own exact-head workflows; no result is claimed for that new SHA.

#### PR #41 — merged source branch, review and exact-head CI

- PR #41 is CLOSED/MERGED. The independent PR metadata and source branch ref `fix/release-blockers-2026-10` agree on exact HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge commit is `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. The PR records 517 commits, 100 changed files, +11,887 additions and -2,005 deletions. Latest source-branch commit message is `fix(ci): align Expo SDK 57 lock refresh with release manifest` (2026-11-13T19:25:52Z).
- Exact-head Validation [#43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [#43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [#43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS on `68b380e73ca3c870048035197beef8febbf90ef1`. Frontend, backend, iOS, CodeQL Analyze, and Dependency Review jobs all passed (5/5).
- Review inventory: 109 combined timeline records; 53 conversation comments, 30 inline review comments, 26 formal review submissions (25 COMMENTED and one human APPROVED by `tarlaci1984-sketch`), 22/22 inline review threads resolved, 0 unresolved threads, and 20 outdated threads.
- The three historical runs [#43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), [#43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and [#43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255) remain QUEUED on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`; each jobs endpoint returns zero jobs. They are not current PR #41 failures. Repository-administrator cancellation remains required.
- The PR #41 source branch is unprotected (the PR is already merged); main is protected and covered by active ruleset 26370589. The PR description retains superseded historical open/unmerged wording; live PR metadata and branch ref are authoritative, and the closed PR was not edited.

#### PR #233 and child PR #238 — exact-head documentation-test failures

- PR #233 remains OPEN/DRAFT on `docs/release-evidence-main-sync-20261122-run13`, exact HEAD `dd732252a3a8eea5211ca0a5324c61eca044a8c4`, based on main `3a262358552a9650d865aa5bd3c92905f1e863cb`. It has 8 commits and 4 changed files. Validation [#45077680540](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45077680540) is terminal FAILURE; CodeQL [#45077680551](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45077680551) and Dependency Review [#45077680544](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45077680544) are terminal SUCCESS on this exact SHA. Frontend Unit tests reported 337 passed / 1 failed across 72 files; backend passed 539 pytest tests, 27 production-readiness checks and 78 security/privacy checks; iOS native Release build and simulator smoke passed. The frontend failure is the missing historical checkpoint evidence now carried into the top section by this child update.
- PR #233 current review inventory: 3 conversation comments, 0 formal review submissions, 0 inline review threads, and 0 human approvals. It remains draft and unapproved.
- PR #238 is OPEN/DRAFT at exact HEAD `46c594e57404934d8be8c8f2dc300886fc02caf0` on `fix/pr233-checkpoint-history-refresh-20261122-run15-child`, based on PR #233 branch `docs/release-evidence-main-sync-20261122-run13` at `dd732252a3a8eea5211ca0a5324c61eca044a8c4`. It has 1 commit and 4 changed files (+86 / 0). Validation [#45081443668](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45081443668) is terminal FAILURE; CodeQL [#45081443620](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45081443620) and Dependency Review [#45081443715](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45081443715) are terminal SUCCESS on this exact SHA.
- PR #238 frontend Unit tests reported 337 passed / 2 failed across 72 test files. Backend job [137394341947](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45081443668/job/137394341947) passed 539 pytest tests, 27 production-readiness checks, and 78 security/privacy checks. iOS job [137394342328](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45081443668/job/137394342328) passed native Release build and simulator smoke. Runtime npm audit was skipped after the frontend Unit-test failure; it did not fail and did not pass on this SHA.
- The two PR #238 frontend failures are test/evidence-contract mismatches, not application runtime failures: one assertion expected the label `Validation [45067156099](` while the evidence correctly uses `Validation [#45067156099](`; the other expected the phrase `PR #233 current exact HEAD`, while the historical checkpoint says `Current PR #233 exact HEAD is`. This update aligns the link-label assertions and expected phrase with the documented evidence without removing or weakening tests.
- PR #238 review inventory: 2 conversation comments, 0 formal review submissions, 0 inline review threads, and 0 human approvals. PR #233 remains at exact HEAD `dd732252a3a8eea5211ca0a5324c61eca044a8c4`; PR #238 is a child candidate and has not been merged or fast-forwarded into PR #233.
- PR #237 remains a separate child at exact HEAD `fe6178ce5d342dc7a9dbf9eb4594e51167622503`; its three workflows passed on its own SHA, but its base SHA is `6805604d5781ff62284a94beb5d77f39b816ccf9`, not current PR #233 HEAD `dd732252a3a8eea5211ca0a5324c61eca044a8c4`. Its green runs do not validate PR #233.
- PR #236 is CLOSED/MERGED into the PR #233 branch only at `ea2ee9e6e8d3e4b30dd9bac2f10bff0dd0d1e461`; its fast-forward used expected-SHA and force=false. No concurrent work was overwritten.

#### Mainline SSRF remediation and governance

- PR #200 is CLOSED/MERGED. Source exact HEAD `fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a`; merge commit and current main HEAD are `3a262358552a9650d865aa5bd3c92905f1e863cb`. Source-head Validation [#44735858583](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858583), CodeQL [#44735858347](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858347), and Dependency Review [#44735858455](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858455) passed.
- Main merge-commit push-triggered Validation [#45030954025](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45030954025) and CodeQL [#45030954087](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45030954087) passed. No main push-triggered Dependency Review run was returned; source PR Dependency Review is not substituted for a merge-commit run.
- Active ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) is enforced on main: six strict required checks, one approving review, last-push approval, stale-review dismissal, resolved review threads, deletion and non-fast-forward protection, and no bypass actors.
- Production SSRF acceptance remains BLOCKED pending independent authorized security-owner approval of the exact production configuration, complete production NAT64/DNS64 translator-prefix inventory, direct verification of deployed `USEIT_NAT64_PREFIXES`, and staging/production egress tests.

#### Current issue, release and security inventory

- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is CLOSED with 11 comments. Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains OPEN with 116 comments.
- GitHub Releases API returned 0 published releases.
- Code Scanning, Dependabot, and Secret Scanning alert inventories remain unavailable through the connected integration: unverified, not empty.
- Repository visibility is public. The release-name branch search's last complete inventory was 94 matching branches; this is not the total repository branch count.

#### Canonical 25-point release register and acceptance boundary

The candidate row-level register contains exactly 25 items and parses to **2 Done / 15 In Progress / 8 Blocked**. Done: **#1, #6**. In Progress: **#3, #7–#15, #17, #19, #20, #23, #24**. Blocked: **#2, #4, #5, #16, #18, #21, #22, #25**.
- **#2** remains Blocked pending the owner's durable repository-visibility/release-plan decision. **#4** requires production Apple App Attest entitlement and physical-iPhone verification. **#5** requires Play-installed physical Android Play Integrity. **#16** requires witnessed production backup/restore. **#18** requires a representative labeled product-recognition benchmark and business acceptance. **#21** requires production monitoring and witnessed alert delivery. **#22** requires approved staged rollout and tested rollback. **#25** requires a real-user pilot and explicit business sign-off.
- No physical-device, production-cloud, backup/restore, monitoring, rollout, or business-acceptance item is promoted by CI, simulator, or emulator evidence.

**Release decision: NOT READY. Production/pilot acceptance: NOT GRANTED.** The new commit based on PR #238 parent `46c594e57404934d8be8c8f2dc300886fc02caf0` will have its own exact-head Validation, CodeQL, and Dependency Review; those results are pending and are not claimed here.

---

## Current release evidence checkpoint — 2026-11-22 20:12 CET

Evidence refreshed at 19:12 UTC from live PR metadata, exact branch refs, exact-head Actions runs and jobs, PR conversation/review inventories, issue records, main ruleset, published Releases API, paginated release-branch search, and all three release records. Main is `3a262358552a9650d865aa5bd3c92905f1e863cb`. Issue #64 is OPEN with 111 comments. The release-branch search returned 94 matching names and the next page was empty. GitHub Releases API returned 0 published releases. Code Scanning, Dependabot, and Secret Scanning alert inventories are unavailable through the connected integration: unverified, not empty. This checkpoint does not grant production or pilot acceptance.

### PR #41 — merged baseline

- PR #41 is CLOSED/MERGED on `fix/release-blockers-2026-10`. Live PR metadata and the source branch ref agree on exact HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge commit `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. It contains 517 commits, 100 changed files, +11,887 additions and -2,005 deletions.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS on that exact SHA. Frontend, backend, iOS, CodeQL Analyze, and Dependency Review jobs all passed.
- Review inventory: 109 combined timeline records; 53 conversation comments, 30 inline review comments, 26 formal review submissions (25 COMMENTED and one human APPROVED by `tarlaci1984-sketch`), 22/22 inline review threads resolved, and 0 unresolved threads. Twenty threads are marked outdated.
- Historical runs [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255) remain QUEUED on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`, created 2026-11-11 20:48:34 UTC; each jobs endpoint returns zero jobs. They are historical queues, not current PR #41 failures. Repository-administrator cancellation remains required.

### Main governance and merged security remediation

- Repository visibility is public. Main is protected and currently points to `3a262358552a9650d865aa5bd3c92905f1e863cb`.
- Active ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) applies to the default branch. It requires six strict checks (`CodeQL`, `backend`, `frontend`, `ios`, `analyze`, `dependency-review`), one approving review, stale-approval dismissal, last-push approval, resolved review threads, deletion and non-fast-forward protection, and no bypass actors.
- PR #200 is CLOSED/MERGED. Its source exact HEAD was `fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a`; merge commit `3a262358552a9650d865aa5bd3c92905f1` is now main. Source-head Validation [44735858583](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858583), CodeQL [44735858347](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858347), and Dependency Review [44735858455](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858455) all passed on the source SHA. Backend evidence: 539 tests, 27 production-readiness checks, and 78 security/privacy checks.
- The main merge commit `3a262358552a9650d865aa5bd3c92905f1` has no separate PR-triggered workflow runs or combined status contexts in the available endpoints. Do not transfer PR #200 source-head CI results to the merge commit.
- Main's three release records remain on their older 2026-11-13 checkpoint. This refreshed candidate is on PR #233; main was not edited.

### PR #204 and PR #229 — historical documentation candidates

- PR #204 remains OPEN/DRAFT on `docs/release-evidence-current-main-20261120-run11`, exact HEAD `00d2dff332888e5eb2fa731d32e2e5b3e1cc4f9f`, with 23 commits and 4 changed files. Its base SHA `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266` is the previous main commit and is one commit behind current main.
- PR #204 exact-head Validation [45017190851](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45017190851) is terminal FAILURE; CodeQL [45017190867](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45017190867) and Dependency Review [45017190810](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45017190810) are terminal SUCCESS on that same SHA. Frontend failed two documentation assertions (332 passed / 2 failed across 72 test files); backend passed 450 tests, 27 readiness checks and 78 security/privacy checks; iOS native Release build and simulator install/launch smoke passed. Expo Doctor, Android export/Release/smoke, and frontend runtime audit were skipped after the unit-test failure.
- PR #229 remains OPEN/DRAFT on `fix/pr204-release-checkpoint-assertions-20261122-run12-child`, exact HEAD `26aafc7a2f5b3a735bc04926568ef5cbcc99f1d6`, with 3 commits and 1 changed file. Its own Validation [45031397060](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45031397060), CodeQL [45031397027](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45031397027), and Dependency Review [45031397143](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45031397143) are terminal SUCCESS on that exact SHA. Frontend, backend, iOS, CodeQL Analyze and Dependency Review jobs all passed. The PR #229 test correction is carried forward by content in PR #233; no parent CI result is transferred.

### Current-main dependency and Redis candidates

- PR #231 is OPEN/DRAFT on `security/minimatch-11-current-main-20261122`, exact HEAD `444e312b4bf94237eedfb0af1a24922bf5853942`. Validation [45031336861](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45031336861), CodeQL [45031337208](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45031337208), and Dependency Review [45031336869](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45031336869) are 3/3 terminal SUCCESS on that exact SHA. Its frontend runtime audit `npm audit --omit=dev --audit-level=high` reported `found 0 vulnerabilities`; Android emulator smoke passed. PR #231 has 0 formal reviews and 0 inline threads; it remains draft/unmerged.
- PR #232 is OPEN/DRAFT on `fix/release-register-2026-11-22-redis-acceptance`, exact HEAD `696ac10f2bbb4a502a507a07d562fb92136b0fb2`. Validation [45040014939](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45040014939), CodeQL [45040015166](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45040015166), and Dependency Review [45040014952](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45040014952) are 3/3 terminal SUCCESS on that exact SHA. This is a Redis production-acceptance documentation candidate; successful CI does not provide production Redis endpoint/TLS/sysctl evidence.

### PR #233 — current clean-main release-documentation candidate

- PR #233 is OPEN/DRAFT on `docs/release-evidence-main-sync-20261122-run13`, exact HEAD `ea2ee9e6e8d3e4b30dd9bac2f10bff0dd0d1e461`, based directly on current main `3a262358552a9650d865aa5bd3c92905f1e863cb`. It has 4 commits and 4 changed files (+1,608 / -13). PR metadata and the branch ref agree.
- Exact-head Validation [45051779453](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45051779453), CodeQL [45051779441](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45051779441), and Dependency Review [45051779511](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45051779511) are all terminal SUCCESS on this exact SHA. Frontend, backend, iOS, CodeQL Analyze, and Dependency Review jobs all passed. The same SHA also passed the three PR #236-triggered workflows before its fast-forward integration.
- PR #236 is CLOSED/MERGED into the PR #233 branch. Its one-line test-only correction moved PR #233 from `4ce94f96fcbc7b21a85025d8646fd27824dd04b8` to `ea2ee9e6e8d3e4b30dd9bac2f10bff0dd0d1e461` by fast-forward with expected-SHA `4ce94f96fcbc7b21a85025d8646fd27824dd04b8` and `force=false`. No concurrent work was overwritten.
- The prior PR #233 HEAD `1a35bf4aa51b5d0f623728c4645e42b5df0fe54c` had a frontend-only documentation assertion failure (336 passed / 1 failed across 72 test files); the one-line PR #236 correction was validated on the exact resulting SHA before integration. No parent result is used in place of current PR #233 exact-head CI.
- PR #233 review inventory: 2 conversation comments (Dependency Review bot and maintainer exact-head follow-up), 0 formal review submissions, 0 inline review threads, and 0 human approvals. Dependency Review lists Scanned Files: None because the current diff is documentation-only; this is not a repository-wide dependency inventory.

### Issues and security inventory

- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is CLOSED with 11 comments.
- Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains OPEN with 111 comments. PR #200's DNS-pinned transport remediation is merged into main, but production acceptance is not established by source CI.
- Production SSRF acceptance remains BLOCKED pending independent authorized security-owner approval, complete production NAT64/DNS64 prefix inventory, direct verification of deployed `USEIT_NAT64_PREFIXES`, and staging/production egress evidence.
- Code Scanning, Dependabot, and Secret Scanning alert inventories are unavailable through the connected integration: unverified, not empty. GitHub Releases API returned 0 published releases.

### Canonical 25-point release register

The candidate row-level register contains exactly 25 items and parses to **2 Done / 15 In Progress / 8 Blocked**. Done: **#1, #6**. In Progress: **#3, #7–#15, #17, #19, #20, #23, #24**. Blocked: **#2, #4, #5, #16, #18, #21, #22, #25**. Main's separate older register remains **3 Done / 15 In Progress / 7 Blocked**; the two registers are not silently merged.
- **#2** remains Blocked pending the owner's durable repository-visibility/release-plan decision. **#4** requires production Apple App Attest entitlement and physical-iPhone verification. **#5** requires Play-installed physical Android Play Integrity. **#16** requires witnessed production backup/restore. **#18** requires a representative labeled product-recognition benchmark and business acceptance. **#21** requires production monitoring and witnessed alert delivery. **#22** requires approved staged rollout and tested rollback. **#25** requires a real-user pilot and explicit business sign-off.
- No physical-device, production-cloud, backup/restore, monitoring, rollout, or business-acceptance item is promoted by CI, simulator, or emulator evidence.

**Release decision: NOT READY. Production/pilot acceptance: NOT GRANTED.** No CI result from a parent commit is attributed to a child SHA.

---

## Current release evidence checkpoint — 2026-11-22 17:37 CET

Evidence refreshed at 16:37 UTC from live PR metadata, exact branch refs, exact-head Actions runs and jobs, PR discussion/review inventories, issue records, current-main comparison, paginated release-branch search, published Releases API, and all three release records. Main is `3a262358552a9650d865aa5bd3c92905f1e863cb`. Issue #64 is OPEN with 109 comments. The release-branch search returned 94 matching names and the next page was empty. GitHub Releases API returned 0 published releases. Code Scanning, Dependabot, and Secret Scanning alert inventories are unavailable through the connected integration: unverified, not empty. This checkpoint does not grant production or pilot acceptance.

### PR #41 — merged baseline

- PR #41 is CLOSED/MERGED on `fix/release-blockers-2026-10`. Live PR metadata and the source branch ref agree on exact HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge commit `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. It contains 517 commits, 100 changed files, +11,887 additions and -2,005 deletions.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS on that exact SHA. Frontend, backend, iOS, CodeQL Analyze, and Dependency Review jobs all passed.
- Review inventory: 109 combined timeline records; 53 conversation comments, 30 inline review comments, 26 formal review submissions (25 COMMENTED and one human APPROVED by `tarlaci1984-sketch`), 22/22 inline review threads resolved, and 0 unresolved threads.
- Historical runs [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255) were last observed QUEUED on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`, with zero jobs. They are historical queues, not current PR #41 failures; administrator cancellation remains requested.

### Main governance and merged security remediation

- Repository visibility is public. Main is protected and currently points to `3a262358552a9650d865aa5bd3c92905f1e863cb`.
- Active ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) applies to the default branch. It requires six strict checks (`CodeQL`, `backend`, `frontend`, `ios`, `analyze`, `dependency-review`), one approving review, stale-approval dismissal, last-push approval, resolved review threads, deletion and non-fast-forward protection, and no bypass actors.
- PR #200 is CLOSED/MERGED. Its source exact HEAD was `fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a`; merge commit `3a262358552a9650d865aa5bd3c92905f1` is now main. Source-head Validation [44735858583](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858583), CodeQL [44735858347](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858347), and Dependency Review [44735858455](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858455) all passed on the source SHA. Backend evidence: 539 tests, 27 production-readiness checks, and 78 security/privacy checks.
- The main merge commit `3a262358552a9650d865aa5bd3c92905f1` has no separate PR-triggered workflow runs or combined status contexts in the available endpoints. Do not transfer PR #200 source-head CI results to the merge commit.
- Main's three release records remain on their older 2026-11-13 checkpoint. This reviewed candidate refresh is on PR #233; main was not edited.

### PR #204 and PR #229 — historical documentation candidates

- PR #204 remains OPEN/DRAFT on `docs/release-evidence-current-main-20261120-run11`, exact HEAD `00d2dff332888e5eb2fa731d32e2e5b3e1cc4f9f`, with 23 commits and 4 changed files. Its base SHA `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266` is one commit behind current main.
- PR #204 exact-head Validation [45017190851](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45017190851) is terminal FAILURE; CodeQL [45017190867](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45017190867) and Dependency Review [45017190810](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45017190810) are terminal SUCCESS on that same SHA. Frontend failed two documentation assertions (332 passed / 2 failed across 72 test files); backend passed 450 tests, 27 readiness checks and 78 security/privacy checks; iOS native Release build and simulator install/launch smoke passed. Expo Doctor, Android export/Release/smoke, and frontend runtime audit were skipped after the unit-test failure.
- PR #229 remains OPEN/DRAFT on `fix/pr204-release-checkpoint-assertions-20261122-run12-child`, exact HEAD `26aafc7a2f5b3a735bc04926568ef5cbcc99f1d6`. Its own Validation [45031397060](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45031397060), CodeQL [45031397027](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45031397027), and Dependency Review [45031397143](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45031397143) are terminal SUCCESS on that exact SHA. Frontend, backend, iOS, CodeQL Analyze and Dependency Review jobs all passed.
- The PR #229 test correction is carried forward by content in PR #233, created directly from main; it is not a commit on the PR #204 branch. No parent CI result is attributed to a child SHA.

### Current-main dependency and Redis candidates

- PR #231 is OPEN/DRAFT on `security/minimatch-11-current-main-20261122`, exact HEAD `444e312b4bf94237eedfb0af1a24922bf5853942`. Validation [45031336861](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45031336861), CodeQL [45031337208](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45031337208), and Dependency Review [45031336869](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45031336869) are 3/3 terminal SUCCESS on that exact SHA. Its frontend runtime audit `npm audit --omit=dev --audit-level=high` reported `found 0 vulnerabilities`; Android emulator smoke passed. PR #231 has 0 formal reviews and 0 inline threads; it remains draft/unmerged.
- PR #232 is OPEN/DRAFT on `fix/release-register-2026-11-22-redis-acceptance`, exact HEAD `696ac10f2bbb4a502a507a07d562fb92136b0fb2`. Validation [45040014939](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45040014939), CodeQL [45040015166](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45040015166), and Dependency Review [45040014952](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45040014952) are 3/3 terminal SUCCESS on that exact SHA. This is a Redis production-acceptance documentation candidate; successful CI does not provide production Redis endpoint/TLS/sysctl evidence.

### PR #233 — current clean-main release-documentation candidate

- PR #233 is OPEN/DRAFT on `docs/release-evidence-main-sync-20261122-run13`, exact HEAD `1a35bf4aa51b5d0f623728c4645e42b5df0fe54c`, based directly on main `3a262358552a9650d865aa5bd3c92905f1e863cb`. It has 2 commits and 4 changed files (+1,604 / -13); comparison is 2 ahead / 0 behind. PR metadata and the branch ref agree.
- Exact-head Validation [45043529095](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45043529095) is terminal FAILURE; CodeQL [45043529103](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45043529103) and Dependency Review [45043529261](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45043529261) are terminal SUCCESS on the same exact SHA.
- Frontend job `137275187018` failed one documentation assertion at `scripts/release-evidence-checkpoint.test.mjs:63`: 336 passed / 1 failed across 72 test files. The assertion expects `450 pytest tests` but the PR #204 backend evidence correctly says `450 tests`. This is a test-contract wording/count mismatch, not an application failure. Backend job `137275188241` passed 539 tests, 27 production-readiness checks, 78 security/privacy checks, and its dependency audit. iOS job `137275236141` passed native Release build and simulator install/launch smoke. Expo Doctor, Android export/Release/smoke, and frontend runtime audit were skipped after the unit-test failure.
- PR #233 review inventory: 1 conversation comment (Dependency Review bot), 0 formal review submissions, 0 inline review threads, and 0 human approvals. Dependency Review lists Scanned Files: None because this is a documentation-only diff; this is not a repository-wide dependency inventory.
- The corrective test change is limited to matching the documented `450 tests` wording. The ten checkpoint tests remain present. PR #233 has not yet passed its own Validation; no result from PR #229 or any parent is transferred to this SHA.

### Issues and security inventory

- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is CLOSED with 11 comments.
- Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains OPEN with 109 comments. PR #200's DNS-pinned transport fix is merged into main, but production acceptance is not established by source CI.
- Production SSRF acceptance remains BLOCKED pending independent authorized security-owner approval, complete production NAT64/DNS64 prefix inventory, direct verification of deployed `USEIT_NAT64_PREFIXES`, and staging/production egress evidence.
- Code Scanning, Dependabot, and Secret Scanning alert inventories are unavailable through the connected integration: unverified, not empty. GitHub Releases API returned 0 published releases.

### Canonical 25-point release register

The candidate row-level register contains exactly 25 items and parses to **2 Done / 15 In Progress / 8 Blocked**. Done: **#1, #6**. In Progress: **#3, #7–#15, #17, #19, #20, #23, #24**. Blocked: **#2, #4, #5, #16, #18, #21, #22, #25**. Main's separate older register remains **3 Done / 15 In Progress / 7 Blocked**; the two registers are not silently merged.
- **#2** remains Blocked pending the owner's durable repository-visibility/release-plan decision. **#4** requires production Apple App Attest entitlement and physical-iPhone verification. **#5** requires Play-installed physical Android Play Integrity. **#16** requires witnessed production backup/restore. **#18** requires a representative labeled product-recognition benchmark and business acceptance. **#21** requires production monitoring and witnessed alert delivery. **#22** requires approved staged rollout and tested rollback. **#25** requires a real-user pilot and explicit business sign-off.
- No physical-device, production-cloud, backup/restore, monitoring, rollout, or business-acceptance item is promoted by CI, simulator, or emulator evidence.

**Release decision: NOT READY. Production/pilot acceptance: NOT GRANTED.** No CI result from a parent commit is attributed to a child SHA.

---

## Current release evidence checkpoint — 2026-11-22 12:20 CET

Evidence refreshed at 11:20 UTC from live PR metadata, exact branch refs, exact-head Actions runs/jobs, PR comments/reviews/threads, issues #47 and #64, main ruleset, release inventory, and paginated release-branch search. Main is `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`. This checkpoint does not grant production or pilot acceptance.

### PR #41 — merged baseline

- PR #41 is CLOSED/MERGED on `fix/release-blockers-2026-10`. PR metadata and the source branch ref agree on exact HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge commit `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. It contains 517 commits, 100 changed files, +11,887 additions and -2,005 deletions.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS on that exact SHA. Frontend, backend, iOS, CodeQL Analyze and Dependency Review jobs passed.
- Review inventory: 53 conversation comments, 30 inline review comments, 26 formal review submissions (25 COMMENTED and one human APPROVED by `tarlaci1984-sketch`), 22/22 inline review threads resolved, 0 unresolved threads, and 109 combined timeline records.
- Historical runs [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255) remain QUEUED on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`; each has zero jobs. They are historical queues, not current-head failures. Repository-administrator cancellation remains required.

### Main governance and repository inventory

- Repository visibility is public. Main ref is `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`.
- Active ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) applies to the default branch and requires six strict checks (`CodeQL`, `backend`, `frontend`, `ios`, `analyze`, `dependency-review`), one approving review, stale-approval dismissal, last-push approval and resolved review threads. Deletion and non-fast-forward are blocked; there are no bypass actors.
- Main's release records remain on the 2026-11-13 checkpoint: Runbook blob `b7b848743edf8fb8c238ef3367b0e74b64e6d540`, Pilot Acceptance blob `f6bd4f041f802d0286b209769621079e517bd3a1`, and Backlog blob `891ec704b18bb1a59c9598b9fe2aedd0a9df9dae`. This candidate refresh is on PR #204 only; main was not edited.
- Paginated branch search returned 88 names matching `release`; the second page was empty and pagination is exhausted. This is a search-match count, not total branch count. GitHub Releases API returned an empty array: 0 published releases.

### PR #204 — current-main release-documentation candidate

- PR #204 is OPEN/DRAFT against `main`, on `docs/release-evidence-current-main-20261120-run11`, with 22 commits and 4 changed files. PR metadata and branch ref agree: current exact HEAD is `ddd34e688343189b67d9fca463590287479188d1`; base main is `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`. It remains unapproved and unmerged.
- Current exact-head Validation [45011953827](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45011953827) is terminal FAILURE; CodeQL [45011953752](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45011953752) and Dependency Review [45011953751](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45011953751) are terminal SUCCESS. All three runs were fetched for this exact SHA; parent results are not reused.
- Frontend job [137182793749](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45011953827/job/137182793749) failed only at `scripts/release-evidence-checkpoint.test.mjs:99`: 333 tests passed / 1 failed across 72 files. The assertion expects literal `Issue #47 is CLOSED`, while the checkpoint correctly uses Markdown link syntax `Issue [#47](...)` followed by `is CLOSED with 11 comments`. This is a documentation/test-contract mismatch, not an application defect.
- Backend job [137182794703](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45011953827/job/137182794703) passed 450 pytest tests, 27 production-readiness checks and 78 security/privacy checks; pip-audit reported no known vulnerabilities. iOS job [137182795014](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45011953827/job/137182795014) passed native Release build and simulator install/launch smoke. CodeQL Analyze job [137175993483](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45011953752/job/137175993483) and Dependency Review job [137175993364](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45011953751/job/137175993364) passed.
- Frontend source-boundary check and TypeScript passed. Expo Doctor, Android export, Android Release build, Android emulator smoke, and frontend runtime audit were skipped after the frontend unit-test failure. No Android build/smoke or current-head frontend runtime-audit result is claimed. Three moderate minimatch findings were reported by an earlier separate parent audit and were not rechecked on `ddd34e6`.
- PR #204 review inventory: 2 conversation comments, 0 inline threads, 0 formal review submissions, and 0 human approvals. `tarlaci1984-sketch` is requested. Human review remains outstanding.

### Other current-main and release candidates

- PR #200 exact HEAD `fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a` is OPEN/DRAFT on main; Validation [44735858583](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858583), CodeQL [44735858347](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858347), and Dependency Review [44735858455](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858455) are 3/3 terminal SUCCESS. Backend evidence is 539 tests, 27 readiness checks and 78 security/privacy checks. Issue #64 remains OPEN. Production SSRF acceptance is blocked pending independent security-owner approval, production NAT64/DNS64 inventory, deployed `USEIT_NAT64_PREFIXES` verification, and staging/production egress evidence. PR #200 has 0 formal reviews and 0 inline threads; the older PR #99 approval is attached to #99 only and does not transfer to #200.
- PR #201 exact HEAD `776432e4e75327088034fa2f5448d96d7d71f068` is OPEN/DRAFT on main; Validation [44735892822](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735892822), CodeQL [44735893037](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735893037), and Dependency Review [44735893258](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735893258) are 3/3 terminal SUCCESS. Its exact-head frontend npm audit reports found 0 vulnerabilities after minimatch 11.0.5 migration; it remains unmerged and awaits human review.
- PR #218 exact HEAD `c01fef68d1a33f5ca60f3cd8ed62781c4e59cb6e`: Validation [44945232153](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44945232153) is terminal FAILURE; CodeQL [44945232175](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44945232175) and Dependency Review [44945232099](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44945232099) are terminal SUCCESS.
- PR #219 exact HEAD `3ba1c4f20f7aab6dafa774bb8c2d11cb21c59735` has 0 exact-head workflow runs, 0 check-runs and 0 status contexts. GitHub's last recorded mergeability is false; do not claim CI success or overwrite this branch.
- PR #220 exact HEAD `1adf04eb3b17f91873ab7724a0d946ad7343ae11`: Validation [44955675733](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44955675733), CodeQL [44955675682](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44955675682), and Dependency Review [44955675650](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44955675650) are 3/3 terminal SUCCESS. This does not validate PR #204.

### Issues and security inventory

- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is CLOSED with 11 comments. Its resolution is supported by the active main ruleset.
- Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains OPEN with 105 comments. PR #200 is the current-main DNS-rebinding/SSRF remediation candidate; source/tests and exact-head CI are not production deployment proof. The latest #64 discussion confirms the PR #99 approval is not a review of PR #200.
- Code Scanning, Dependabot and Secret Scanning alert inventories are **unverified, not empty**. The connected GitHub integration rejects these alert endpoint families; successful CodeQL and Dependency Review workflows do not establish repository-wide alert inventories are empty.
- GitHub Releases API returned an empty array: **0 published releases**.

### Canonical 25-point release register

The candidate row-level register contains exactly 25 items and parses to **2 Done / 15 In Progress / 8 Blocked**. Done: **#1, #6**. In Progress: **#3, #7–#15, #17, #19, #20, #23, #24**. Blocked: **#2, #4, #5, #16, #18, #21, #22, #25**. Main's separate register remains **3 Done / 15 In Progress / 7 Blocked**; the two registers are not silently merged.
- **#2 remains Blocked** pending the owner's durable repository-visibility and release-plan decision. **#4** requires production Apple App Attest entitlement and physical-iPhone verification. **#5** requires Play-installed physical Android Play Integrity. **#16** requires witnessed production backup/restore. **#18** requires a representative labeled product-recognition benchmark and business acceptance. **#21** requires production monitoring and witnessed alert delivery. **#22** requires approved staged rollout and tested rollback. **#25** requires a real-user pilot and explicit business sign-off.
- No physical-device, production-cloud, backup/restore, monitoring, rollout, or business-acceptance item is promoted by CI, simulator, or emulator evidence.

**Release decision: NOT READY. Production/pilot acceptance: NOT GRANTED.** PR #204 current exact HEAD has Validation FAILURE, CodeQL SUCCESS and Dependency Review SUCCESS. Human review and external acceptance remain outstanding.

---



---

## Current release evidence checkpoint — 2026-11-22 08:22 CET

This checkpoint supersedes the 07:19 CET checkpoint. Evidence refreshed at 07:22 UTC from live PR metadata, source branch refs, exact-head Actions runs/jobs, reviews and threads, issues #47 and #64, main ruleset, release inventory, release-branch search, and the three candidate release records. Main is `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`. This checkpoint does not grant production or pilot acceptance.

### PR #41 — merged baseline

- PR #41 is CLOSED/MERGED on `fix/release-blockers-2026-10`. Live PR metadata and the source branch ref both report exact HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge commit `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. It contains 517 commits, 100 changed files, +11,887 additions and -2,005 deletions.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS on that exact SHA. Frontend, backend, iOS, CodeQL Analyze and Dependency Review jobs all passed.
- Review inventory: 53 conversation comments, 30 inline review comments, 26 formal review submissions (25 COMMENTED and one human APPROVED by `tarlaci1984-sketch`), 22/22 inline review threads resolved, 0 unresolved threads, and 109 combined timeline records.
- Historical runs [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255) remain QUEUED on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`; each has zero jobs. They are historical queues, not current-head successes or failures. Repository-administrator cancellation remains required.

### Main governance and repository state

- Repository visibility is public. Main ref is `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`.
- Active ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) applies to the default branch and requires six strict checks (`CodeQL`, `backend`, `frontend`, `ios`, `analyze`, `dependency-review`), one approving review, stale-approval dismissal, last-push approval and resolved review threads. Deletion and non-fast-forward are blocked; there are no bypass actors.
- Main's release records remain on the 2026-11-13 checkpoint: Runbook blob `b7b848743edf8fb8c238ef3367b0e74b64e6d540`, Pilot Acceptance blob `f6bd4f041f802d0286b209769621079e517bd3a1`, and Backlog blob `891ec704b18bb1a59c9598b9fe2aedd0a9df9dae`. This candidate refresh is on PR #204 only; main was not edited.
- Paginated branch search returned 86 branch names matching `release`; pagination is exhausted. This is a search-match count, not total repository branches. GitHub Releases API returned an empty array: 0 published releases.

### PR #204 — current-main release-documentation candidate

- PR #204 is OPEN/DRAFT against `main`, on `docs/release-evidence-current-main-20261120-run11`, with 18 commits and 4 changed files. PR metadata and branch ref agree: current exact HEAD is `9311dae635423369badf9b4fcfdcc14aa26a8b96`. Compare against main is 18 commits ahead / 0 behind.
- Exact-head Validation [44993531919](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44993531919), CodeQL [44993531899](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44993531899), and Dependency Review [44993531931](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44993531931) are terminal SUCCESS, all referencing `9311dae635423369badf9b4fcfdcc14aa26a8b96`.
- Validation jobs passed: frontend [137119578491](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44993531919/job/137119578491), backend [137119578415](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44993531919/job/137119578415), and iOS [137119578529](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44993531919/job/137119578529). CodeQL Analyze [137119578374](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44993531899/job/137119578374) and Dependency Review [137119578217](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44993531931/job/137119578217) also passed.
- Frontend on this exact HEAD: 334 tests across 72 files; source-boundary check passed across 356 tracked files; pinned Expo Doctor 21/21; Android export, native Release build and emulator install/launch smoke passed. Runtime npm audit completed at its configured high-severity threshold but reported 3 moderate minimatch vulnerabilities through `@expo/fingerprint`; this is not a zero-vulnerability audit. The suggested `npm audit fix --force` would downgrade Expo and was not run.
- Backend on this exact HEAD: 450 pytest tests, 27 production-readiness checks and 78 security/privacy checks passed; pip-audit reported no known vulnerabilities. iOS native Release build and simulator install/launch smoke passed.
- Previous PR #204 HEAD `0526826a0c6c0dd3a0ba818bdc397c4270611d79` had terminal Validation FAILURE (332 passed / 3 failed in frontend assertion-contract tests), while its CodeQL and Dependency Review passed. That failure is historical and is not attributed to current HEAD `9311dae`.
- PR #204 review inventory: 2 conversation comments, 0 inline threads, 0 formal review submissions and 0 human approvals; `tarlaci1984-sketch` is requested. Human review remains outstanding.

### Other current-main and release candidates

- PR #200 exact HEAD `fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a`: Validation [44735858583](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858583), CodeQL [44735858347](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858347), and Dependency Review [44735858455](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858455) are 3/3 SUCCESS. Backend evidence is 539 tests, 27 readiness checks and 78 security/privacy checks. Issue #64 remains OPEN. Production SSRF acceptance is blocked pending independent security-owner approval, production NAT64/DNS64 inventory, deployed `USEIT_NAT64_PREFIXES` verification, and staging/production egress evidence. Its frontend runtime audit reports 3 moderate minimatch findings.
- PR #201 exact HEAD `776432e4e75327088034fa2f5448d96d7d71f068`: Validation [44735892822](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735892822), CodeQL [44735893037](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735893037), and Dependency Review [44735893258](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735893258) are 3/3 SUCCESS; its exact-head frontend npm audit reports found 0 vulnerabilities. It remains OPEN/DRAFT and unmerged.
- PR #203 exact HEAD `a006fdb882bfb6989487e3faea77db23f183839f`: Validation [44744190838](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190838), CodeQL [44744190840](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190840), and Dependency Review [44744190839](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190839) are 3/3 SUCCESS.
- PR #218 exact HEAD `c01fef68d1a33f5ca60f3cd8ed62781c4e59cb6e`: Validation [44945232153](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44945232153) is FAILURE in frontend assertion tests (333 passed / 4 failed); CodeQL [44945232175](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44945232175) and Dependency Review [44945232099](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44945232099) are SUCCESS.
- PR #219 exact HEAD `3ba1c4f20f7aab6dafa774bb8c2d11cb21c59735`: 0 exact-head workflow runs, 0 check-runs and 0 status contexts; GitHub reports mergeable=false. It has 4 commits and requires base reconciliation. Do not claim CI success or overwrite the branch.
- PR #220 exact HEAD `1adf04eb3b17f91873ab7724a0d946ad7343ae11`: Validation [44955675733](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44955675733), CodeQL [44955675682](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44955675682), and Dependency Review [44955675650](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44955675650) are 3/3 SUCCESS; it is stacked on PR #85.
- PR #221 exact HEAD `4b638819229e60e43705d1abbd939967fb744c86`: Validation [44966362140](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44966362140), CodeQL [44966362251](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44966362251), and Dependency Review [44966362153](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44966362153) are 3/3 SUCCESS; it is stacked on PR #218.
- PR #222 exact HEAD `6a4c0026be3e5d6f73cead92ea4f99a2dbf42042`: Validation [44978322495](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44978322495), CodeQL [44978322473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44978322473), and Dependency Review [44978322447](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44978322447) are 3/3 SUCCESS, but it is based on older PR #204 parent `429bcf42` and GitHub reports mergeable=false. Do not merge or close it automatically.

### Issues and security inventory

- Issue #47 is CLOSED with 11 comments. Its resolution is supported by the active main ruleset.
- Issue #64 is OPEN with 101 comments. PR #200 is the current-main DNS-rebinding/SSRF remediation candidate; source/tests and exact-head CI are not production deployment proof.
- Code Scanning, Dependabot and Secret Scanning alert inventories are **unverified, not empty**. The connected GitHub integration rejects these alert endpoint families; successful CodeQL and Dependency Review workflows do not establish repository-wide alert inventories are empty.
- GitHub Releases API returned an empty array: **0 published releases**.

### Canonical 25-point release register

The candidate row-level register contains exactly 25 items and parses to **2 Done / 15 In Progress / 8 Blocked**. Done: **#1, #6**. In Progress: **#3, #7–#15, #17, #19, #20, #23, #24**. Blocked: **#2, #4, #5, #16, #18, #21, #22, #25**. Main's separate register remains **3 Done / 15 In Progress / 7 Blocked**; the two registers are not silently merged.
- Row #10 and row #24 cite PR #204 exact HEAD `9311dae635423369badf9b4fcfdcc14aa26a8b96` and its own 3/3 exact-head workflow results.
- **#2 remains Blocked** pending the owner's durable repository-visibility and release-plan decision. **#4** requires production Apple App Attest entitlement and physical-iPhone verification. **#5** requires Play-installed physical Android Play Integrity. **#16** requires witnessed production backup/restore. **#18** requires a representative labeled product-recognition benchmark and business acceptance. **#21** requires production monitoring and witnessed alert delivery. **#22** requires approved staged rollout and tested rollback. **#25** requires a real-user pilot and explicit business sign-off.
- No physical-device, production-cloud, backup/restore, monitoring, rollout, or business-acceptance item is promoted by CI, simulator, or emulator evidence.

**Release decision: NOT READY. Production/pilot acceptance: NOT GRANTED.** Current PR #204 exact HEAD `9311dae` has 3/3 mandatory exact-head workflows SUCCESS, but its frontend runtime audit still reports 3 moderate findings and human review is outstanding. External acceptance remains blocked.

---

## Current release evidence checkpoint — 2026-11-20 23:18 CET

This checkpoint supersedes the 21:41 CET checkpoint. Evidence was refreshed at 22:18 UTC against live PR metadata, branch refs, exact-head Actions runs/jobs, issues, and release records. Current main is `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`. This checkpoint does not grant production or pilot acceptance.

### PR #41 — merged baseline

- PR #41 is CLOSED/MERGED on `fix/release-blockers-2026-10`. Live PR metadata and the source branch ref both report exact HEAD `68b380e73ca3c870048035197beef8febbf90ef1`. Merge commit: `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. The PR contains 517 commits, 100 changed files, +11,887 additions, and -2,005 deletions.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS on that exact SHA. Frontend, backend, iOS, CodeQL Analyze, and Dependency Review jobs all passed.
- Complete review inventory: 53 conversation comments, 30 inline review comments, 26 formal review submissions (25 COMMENTED and 1 human APPROVED by `tarlaci1984-sketch`), 22/22 inline threads resolved, 0 unresolved, and 109 combined timeline records.
- Historical runs [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255) are still QUEUED on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`; each has zero jobs. They are historical queues, not current-head successes or failures. Repository administrator cancellation is required.

### Main governance

- Repository visibility is public. Main HEAD is `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`; the branch API reports `protected: true`.
- Active ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) enforces six strict required checks (CodeQL, backend, frontend, ios, analyze, dependency-review), one approval, stale-approval dismissal, last-push approval, resolved review threads, deletion and non-fast-forward protection, and no bypass actors. The legacy branch-protection detail endpoint remains restricted to this integration; the active ruleset and branch metadata are the available evidence.

### Current-main remediation candidates

- **PR #193:** OPEN/DRAFT, 5 commits, 4 changed files, stacked on base `0b991f23856962a5164e63f864e3578130fee6ca`, not directly on main. Exact HEAD `c1250400f5c6022483c967c8b79a42be0dc614fd`; Validation [44743155619](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155619), CodeQL [44743155647](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155647), and Dependency Review [44743155582](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155582) all terminal SUCCESS on that SHA. Its frontend runtime audit reports 3 moderate minimatch findings.
- **PR #200:** OPEN/DRAFT on current main, exact HEAD `fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a`; Validation [44735858583](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858583), CodeQL [44735858347](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858347), and Dependency Review [44735858455](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858455) all terminal SUCCESS. DNS-pinned outbound transport validates complete DNS answers and redirect hops, pins numeric-IP TCP connections, verifies the connected peer, preserves Host/TLS SNI, and disables inherited proxies. Its frontend runtime audit still reports 3 moderate minimatch findings; a passing high-severity threshold is not a zero-finding audit. Production DNS64/NAT64 prefix inventory, deployed `USEIT_NAT64_PREFIXES` verification, staging/production egress evidence, and independent security-owner approval remain outstanding.
- **PR #201:** OPEN/DRAFT on current main, exact HEAD `776432e4e75327088034fa2f5448d96d7d71f068`; Validation [44735892822](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735892822), CodeQL [44735893037](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735893037), and Dependency Review [44735893258](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735893258) all terminal SUCCESS. Its exact-head frontend npm audit explicitly reports `found 0 vulnerabilities` after the minimatch 11.0.5 migration. It is unmerged and awaits human review.
- **PR #202:** OPEN/DRAFT on current main, exact HEAD `67eafbebd5f45724f2c97430fee4bc1a6d153746`; Validation [44735931701](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735931701), CodeQL [44735931794](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735931794), and Dependency Review [44735931634](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735931634) all terminal SUCCESS. CodeQL init and analyze use the same immutable v4.39.4 revision.
- **PR #203:** OPEN/DRAFT on current main, exact HEAD `a006fdb882bfb6989487e3faea77db23f183839f`; Validation [44744190838](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190838), CodeQL [44744190840](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190840), and Dependency Review [44744190839](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190839) all terminal SUCCESS. Its test-only change protects Node 22 for Android and iOS native prebuild. PRs #200–203 are based on current main; all remain unmerged and require human review.

### PR #204 — current documentation branch

- PR #204 is OPEN/DRAFT on `docs/release-evidence-current-main-20261120-run11`, based on main `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`, with 9 commits and 4 changed files. Current exact HEAD is `cbdb625f775acb0267069b2405972b4d2ea380f8`.
- Current exact-head Validation [44821276883](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44821276883) is terminal FAILURE. Frontend job [136596379668](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44821276883/job/136596379668) failed in `scripts/release-evidence-checkpoint.test.mjs`: 330 tests passed and 2 failed; 71 other test files passed. The two failures are stale test expectations: the test expects `450 pytest` although the current checkpoint does not assert that backend test count, and its regex `/published GitHub releases\s+0/i` omits the colon in the documented text `Published GitHub releases: 0`. This is a regression-test assertion defect, not an application failure.
- The frontend source-boundary check and TypeScript passed. Android export, Android Release/emulator smoke, Expo Doctor, and frontend runtime audit were skipped after the unit-test failure; no Android or frontend runtime-audit pass is claimed for this HEAD.
- Backend job [136596381544](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44821276883/job/136596381544) SUCCESS; its readiness suite reported 27 passed and production-security suite 78 passed, and the backend dependency-audit step completed successfully. iOS job [136596463771](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44821276883/job/136596463771) SUCCESS, including native iOS Release build and simulator smoke.
- Exact-head CodeQL [44821276876](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44821276876), Analyze job [136582473058](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44821276876/job/136582473058), terminal SUCCESS. Exact-head Dependency Review [44821276864](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44821276864), job [136582472196](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44821276864/job/136582472196), terminal SUCCESS. Its bot comment reports `Scanned Files: None`; this is not a repository-wide dependency or alert inventory.
- PR #204 review inventory: 2 conversation comments, 0 inline threads, 0 formal review submissions, and 0 human approvals. Reviewer `tarlaci1984-sketch` is requested. One human status comment still refers to the older `62c3bf1` HEAD and should be reconciled after the next exact-head validation.

### Issues and security

- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is CLOSED with 11 comments. Current main protection is verified through branch metadata and active ruleset 26370589.
- Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains OPEN with 84 comments. PR #200 is the current-main DNS-rebinding/SSRF successor. Older PR #99 remains based on the merged PR #41 commit, 17 commits ahead and 2 behind current main; its empty-body approval is not explicit independent security-owner sign-off. Production DNS64/NAT64 prefix inventory, deployed `USEIT_NAT64_PREFIXES` verification, and staging/production egress evidence remain missing.
- Issue [#155](https://github.com/milanradics89-beep/POS-Doctor/issues/155) remains OPEN with 92 comments. The picomatch advisory was withdrawn, but this does not constitute a patched package or complete runtime reachability assessment. Six lockfile resolutions remain; security-owner acceptance is incomplete.

### Repository inventory and security alert limitations

- Repository is public. Paginated branches: 161 (100 + 61 + 0). Open pull requests: 97. Open non-PR issues: 8. Published GitHub releases: 0.
- Code Scanning, Dependabot, and Secret Scanning alert inventories are unverified, not empty: the connected GitHub integration does not expose those alert endpoint families. Successful CodeQL/Dependency Review workflows and bot comments with `Scanned Files: None` do not establish empty alert inventories.
- Main still contains the older 2026-11-13 release records: `RELEASE_RUNBOOK.md` blob `b7b848743edf8fb8c238ef3367b0e74b64e6d540`, `RELEASE_PILOT_ACCEPTANCE.md` blob `f6bd4f041f802d0286b209769621079e517bd3a1`, and `25-POINT-RELEASE-BACKLOG.md` blob `891ec704b18bb1a59c9598b9fe2aedd0a9df9dae`. The refreshed records remain on this PR branch and are not yet integrated into main.

### Canonical 25-point release register

The row-level register contains 25 items and independently parses to **2 Done / 15 In Progress / 8 Blocked**. Done: **#1, #6**. In Progress: **#3, #7–#15, #17, #19, #20, #23, #24**. Blocked: **#2, #4, #5, #16, #18, #21, #22, #25**.

- **#2 remains Blocked** pending the owner's durable repository-visibility and release-plan decision. Issue #47 verifies branch protection; it does not record that separate final decision. Reverify the ruleset after any visibility change.
- **#4** requires production Apple App Attest entitlement and physical-iPhone verification. **#5** requires Play Integrity on a physical Android installed from Play. **#16** requires witnessed production backup/restore. **#18** requires a representative product-recognition benchmark and business acceptance. **#21** requires production monitoring and witnessed alert delivery. **#22** requires approved staged rollout and tested rollback. **#25** requires a real-user pilot and explicit business sign-off.
- No physical-device, production-cloud, backup/restore, monitoring, rollout, or business-acceptance item is promoted by CI, simulator, or emulator evidence.

**Release decision:** PR #204 current exact-head Validation failed only in the documentation regression-test file; CodeQL and Dependency Review passed. Correct the two stale assertions with a targeted test-only change, then verify all mandatory workflows on the resulting exact HEAD. No parent CI is substituted. This checkpoint does not grant production or pilot acceptance.

---

## Current release evidence checkpoint — 2026-11-20 21:41 CET

This checkpoint supersedes the 21:13 CET checkpoint. Evidence was refreshed at 20:41 UTC against current GitHub refs and exact-head workflow runs. Current main is `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`. PR #204 current exact HEAD is `2182ef09fb32f061780552df20a52aadae6770e5`; its own Validation is terminal FAILURE, while its own CodeQL and Dependency Review are terminal SUCCESS. No parent-run result is transferred. This checkpoint does not grant production or pilot acceptance.

### PR #41 — merged baseline

- PR #41 is CLOSED/MERGED on `fix/release-blockers-2026-10`. Its live branch ref and PR head both equal `68b380e73ca3c870048035197beef8febbf90ef1`. Merge commit: `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. It contains 517 commits, 100 changed files, +11,887 additions and -2,005 deletions.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS. Frontend, backend, iOS, CodeQL Analyze and Dependency Review jobs all succeeded.
- Review inventory: 53 conversation comments, 30 inline review comments, 26 formal submissions (25 COMMENTED, 1 human APPROVED), 22/22 inline threads resolved, 0 unresolved, 109 combined timeline records.
- Historical runs [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255) remain QUEUED on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`; each has zero jobs. They are historical queues, not successful or failed current-head checks. Repository administrator cancellation is required.

### Main governance

- Repository visibility is public. Main HEAD is `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`; branch metadata reports `protected: true`.
- Active ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) enforces six strict required checks (CodeQL, backend, frontend, ios, analyze, dependency-review), one approval, stale-approval dismissal, last-push approval, resolved review threads, deletion and non-fast-forward protection, with no bypass actors.
- The legacy branch-protection detail endpoint is restricted to this integration; the active ruleset and branch metadata are the available protection evidence.

### Current-main remediation candidates

- **PR #193:** exact HEAD `c1250400f5c6022483c967c8b79a42be0dc614fd`; Validation [44743155619](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155619), CodeQL [44743155647](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155647), and Dependency Review [44743155582](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155582) all terminal SUCCESS. It is stacked on base `0b991f23856962a5164e63f864e3578130fee6ca`, not directly on main. Its frontend runtime audit still reports 3 moderate minimatch findings.
- **PR #200:** exact HEAD `fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a`; Validation [44735858583](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858583), CodeQL [44735858347](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858347), and Dependency Review [44735858455](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858455) all terminal SUCCESS. DNS-pinned outbound transport validates DNS answers and redirect hops, pins numeric-IP connections, verifies the connected peer, preserves Host/TLS SNI, and disables inherited proxies. Its runtime audit still reports 3 moderate minimatch findings; the high-severity threshold passing is not a zero-finding audit. Production DNS64/NAT64 prefix inventory, deployed `USEIT_NAT64_PREFIXES` verification, staging/production egress evidence and independent security-owner approval remain outstanding.
- **PR #201:** exact HEAD `776432e4e75327088034fa2f5448d96d7d71f068`; Validation [44735892822](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735892822), CodeQL [44735893037](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735893037), and Dependency Review [44735893258](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735893258) all terminal SUCCESS. Its exact-head frontend npm audit explicitly reports `found 0 vulnerabilities` after the minimatch 11.0.5 override and lockfile update. This candidate remains OPEN/DRAFT and unmerged pending human review.
- **PR #202:** exact HEAD `67eafbebd5f45724f2c97430fee4bc1a6d153746`; Validation [44735931701](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735931701), CodeQL [44735931794](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735931794), and Dependency Review [44735931634](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735931634) all terminal SUCCESS. CodeQL init and analyze use the same immutable v4.39.4 revision.
- **PR #203:** exact HEAD `a006fdb882bfb6989487e3faea77db23f183839f`; Validation [44744190838](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190838), CodeQL [44744190840](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190840), and Dependency Review [44744190839](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190839) all terminal SUCCESS. Its test-only change asserts Node 22 for Android and iOS native prebuild. These four current-main candidates remain OPEN/DRAFT and await human review; no candidate is merged by this automation.

### PR #204 — current documentation branch

- **PR #204:** OPEN/DRAFT on current main, 7 commits and 4 changed files. Branch `docs/release-evidence-current-main-20261120-run11`; exact HEAD `2182ef09fb32f061780552df20a52aadae6770e5`.
- PR #204 current exact-head Validation [44810024178](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44810024178): terminal FAILURE. Backend job [136556435007](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44810024178/job/136556435007) SUCCESS; iOS job [136556511770](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44810024178/job/136556511770) SUCCESS, including native iOS Release build and simulator smoke; frontend job [136556433414](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44810024178/job/136556433414) FAILURE at Unit tests. The suite reported 331 passed and 1 failed, with 71 other test files passed. The failing regression assertion expected the obsolete literal `PR #204 exact-head Validation`; the checkpoint uses the label `**PR #204:**`. This is a test expectation/documentation-label mismatch, not an application defect. Android export/Release/emulator and frontend runtime-audit steps were skipped after the unit-test failure.
- PR #204 current exact-head CodeQL [44810024440](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44810024440), Analyze job [136543878467](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44810024440/job/136543878467): terminal SUCCESS. Dependency Review [44810024188](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44810024188), job [136543875977](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44810024188/job/136543875977): terminal SUCCESS.
- Validated parent `7dbc4110b25ab3a879f8711f005d7876b1fbb74e` independently passed its own Validation [44794452919](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44794452919), CodeQL [44794452874](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44794452874), and Dependency Review [44794452833](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44794452833). Those parent results are not transferred to current HEAD `2182ef0`.
- PR #204 review inventory: 2 conversation comments, 0 inline threads, 0 formal review submissions and 0 human approvals. Reviewer `tarlaci1984-sketch` is requested. One human status comment still refers to older SHA `62c3bf1` and needs reconciliation after the next exact-head validation.

### Separate stacked documentation child

- **PR #205** is a separate OPEN/DRAFT child in the PR #85 documentation chain, not a current-main PR and not part of PR #204. Exact HEAD `9f275e853429de173975f87bf1bd3ea476e7b9ce`, base `ea1bf815d90d91026b24c46ec1869b8218211d80`. Exact-head Validation [44799071611](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44799071611), CodeQL [44799071582](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44799071582), and Dependency Review [44799071704](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44799071704) all terminal SUCCESS. It changes the same three release records; reconcile overlapping documentation before integration. Its Dependency Review bot reports `Scanned Files: None`, not a repository-wide alert inventory.

### Issues #47, #64 and #155

- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is CLOSED with 11 comments. Current main branch protection is verified through branch metadata and active ruleset 26370589.
- Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains OPEN with 83 comments. PR #200 is the current-main DNS-rebinding/SSRF successor. Older PR #99 remains based on `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`, 17 commits ahead and 2 behind current main; its empty-body human approval is not explicit independent security sign-off. Production DNS64/NAT64 prefix inventory, deployed `USEIT_NAT64_PREFIXES` verification, and staging/production egress evidence remain missing.
- Issue [#155](https://github.com/milanradics89-beep/POS-Doctor/issues/155) remains OPEN with 90 comments. The picomatch advisory was withdrawn on 2026-11-18 by GitHub and OSV; this is not a patched npm release. Six lockfile resolutions remain and product-level runtime reachability/security-owner acceptance is incomplete. Do not import the unreviewed fork or suppress the audit.

### Repository inventory and security alerts

- Repository is public. Paginated branches: 161 (100 + 61 + 0). Open pull requests: 97. Open non-PR issues: 8. Published GitHub releases: 0.
- Code Scanning, Dependabot and Secret Scanning alert inventories are unavailable through the connected GitHub interface. Their status is **unverified, not empty**. Successful CodeQL/Dependency Review workflows and bot comments with `Scanned Files: None` do not establish empty alert inventories.
- The three release records on this PR branch carry identical checkpoint sections. Main still has the older 2026-11-13 records; this PR has not been merged.

### Canonical 25-point release register

The current row-level register is **2 Done / 15 In Progress / 8 Blocked**. Done: **#1, #6**. In Progress: **#3, #7–#15, #17, #19, #20, #23, #24**. Blocked: **#2, #4, #5, #16, #18, #21, #22, #25**.

- **#2 remains Blocked** pending the owner's durable public/private repository-visibility and release-plan decision. Issue #47 verifies active branch protection; it does not record that separate final decision. Reverify the ruleset after any visibility change.
- **#4** requires production Apple App Attest entitlement and verification on a physical iPhone. **#5** requires Play Integrity on a physical Android installed from Play. **#16** requires witnessed production backup/restore. **#18** requires a representative product-recognition benchmark and business acceptance. **#21** requires production monitoring and witnessed alert delivery. **#22** requires approved staged rollout and tested rollback. **#25** requires a real-user pilot and explicit business sign-off.
- The row-level table contains 25 items and independently parses to 2 Done / 15 In Progress / 8 Blocked. No physical-device, production, backup/restore, monitoring, rollout or business-acceptance item is promoted by CI, simulator or emulator evidence.

**Release decision:** PR #204 current exact-head Validation failed on a documentation regression-test assertion; CodeQL and Dependency Review passed. Fix the targeted test assertion, then rerun all mandatory workflows on the resulting exact HEAD. No parent CI is substituted. No production or pilot acceptance is granted.

---

## Current release evidence checkpoint — 2026-11-20 17:18 CET

This checkpoint supersedes the 15:07 CET branch checkpoint and the 2026-11-13 main-branch checkpoint. Evidence was refreshed at 16:18 UTC. Current main is `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`. The validated PR #204 parent is `b375c6608cbdd3436fa1893d2d118b2cab9f3d73`; all three workflows for that exact SHA are terminal SUCCESS. This documentation-only child must pass its own exact-head CI; no parent result is transferred. This checkpoint does not grant production or pilot acceptance.

### PR #41 — merged baseline

- PR #41 is CLOSED/MERGED on `fix/release-blockers-2026-10`; its live branch ref and PR head both equal `68b380e73ca3c870048035197beef8febbf90ef1`. Merge commit: `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. It contains 517 commits, 100 changed files, +11,887 additions and -2,005 deletions.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS on that SHA. Review inventory: 53 conversation comments, 30 inline comments, 26 formal submissions (25 COMMENTED, 1 human APPROVED), 22/22 inline threads resolved, 0 unresolved, 109 combined timeline records.
- Historical runs [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255) remain QUEUED on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`; each has zero jobs. Administrator cancellation is required.

### Main governance

- Repository visibility is public; main HEAD is `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266` and the branch API reports `protected: true`.
- Active ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) enforces six strict checks (CodeQL, backend, frontend, ios, analyze, dependency-review), one approval, stale-approval dismissal, last-push approval, resolved threads, deletion and non-fast-forward protection, with no bypass actors.

### Current-main candidates

- **PR #193:** exact HEAD `c1250400f5c6022483c967c8b79a42be0dc614fd`; Validation [44743155619](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155619), CodeQL [44743155647](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155647), Dependency Review [44743155582](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155582) all SUCCESS. It is stacked on base `0b991f23856962a5164e63f864e3578130fee6ca`, not directly on main. Its frontend audit still reports 3 moderate minimatch findings.
- **PR #200:** exact HEAD `fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a`; Validation [44735858583](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858583), CodeQL [44735858347](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858347), Dependency Review [44735858455](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858455) all SUCCESS. DNS-pinned transport is validated in CI; production prefix inventory, deployed `USEIT_NAT64_PREFIXES` and staging/production egress remain outstanding.
- **PR #201:** exact HEAD `776432e4e75327088034fa2f5448d96d7d71f068`; Validation [44735892822](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735892822), CodeQL [44735893037](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735893037), Dependency Review [44735893258](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735893258) all SUCCESS. Its exact-head frontend npm audit explicitly reports `found 0 vulnerabilities`; the minimatch 11.0.5 candidate is not merged and awaits human review.
- **PR #202:** exact HEAD `67eafbebd5f45724f2c97430fee4bc1a6d153746`; Validation [44735931701](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735931701), CodeQL [44735931794](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735931794), Dependency Review [44735931634](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735931634) all SUCCESS. CodeQL init/analyze use the same immutable v4.39.4 revision.
- **PR #203:** exact HEAD `a006fdb882bfb6989487e3faea77db23f183839f`; Validation [44744190838](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190838), CodeQL [44744190840](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190840), Dependency Review [44744190839](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190839) all SUCCESS. Its test-only change asserts Node 22 for Android and iOS native prebuild.
- **PR #204:** OPEN/DRAFT, 2 commits, 4 files, validated parent HEAD `b375c6608cbdd3436fa1893d2d118b2cab9f3d73`. Validation [44754308331](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44754308331), CodeQL [44754308313](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44754308313), Dependency Review [44754308298](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44754308298) all SUCCESS on that exact SHA. Validation backend [136349905143](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44754308331/job/136349905143), frontend [136349905785](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44754308331/job/136349905785), and iOS [136349905872](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44754308331/job/136349905872) passed; CodeQL analyze [136349905207](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44754308313/job/136349905207) and Dependency Review [136349905003](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44754308298/job/136349905003) passed. Frontend: 332 tests across 72 files, Expo Doctor 21/21, Android Release/emulator smoke; runtime npm audit still reports 3 moderate minimatch findings. Backend: 450 pytest, 27 readiness checks, 78 production-security checks; pip-audit reports no known vulnerabilities. iOS Release/simulator smoke passed. Dependency Review scanned no manifest files. PR #204 has 1 bot comment, 0 inline threads, 0 formal reviews, no human approval; `tarlaci1984-sketch` is requested.

### Issues #47 and #64

- [Issue #47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is CLOSED with 11 comments; main protection is independently verified above.
- [Issue #64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains OPEN with 79 comments. Older PR #99 is OPEN/DRAFT at `f91c70d2636948e538f8e3559afc39cd93eb5139`; comparison with current main is DIVERGED, 17 commits ahead and 2 behind. It has one human APPROVED review from `milanzoltanics`, but the empty review body is not explicit security sign-off. PR #200 is the current-main successor. Production acceptance still requires independent security-owner approval, production DNS64/NAT64 prefix inventory, deployed `USEIT_NAT64_PREFIXES` verification and staging/production egress evidence.

### Repository inventory and security alerts

- Paginated branches: 160 (100 + 60 + 0). Open pull requests: 96. Open non-PR issues: 8. published GitHub releases 0.
- Code Scanning, Dependabot and Secret Scanning alert inventories are unavailable through the connected integration; status remains **unverified, not empty**. Green CI is not an alert-inventory query.
- PR #193/#204 runtime npm audit: 3 moderate minimatch findings. PR #201's separate exact-head audit: `found 0 vulnerabilities`. Backend pip-audit on PR #204: no known Python vulnerabilities.

### Canonical 25-point release register

- **Done (2):** #1, #6.
- **In Progress (15):** #3, #7, #8, #9, #10, #11, #12, #13, #14, #15, #17, #19, #20, #23, #24.
- **Blocked (8):** #2, #4, #5, #16, #18, #21, #22, #25.
- #2 remains Blocked pending the owner's durable repository-visibility/release-plan decision. #4 requires production Apple App Attest and a physical iPhone; #5 requires Play Integrity on Play-installed physical Android; #16 witnessed production backup/restore; #18 representative product-recognition benchmark/business acceptance; #21 production monitoring/alert delivery; #22 approved staged rollout and tested rollback; #25 real-user pilot and business sign-off.

Production/pilot acceptance remains **NOT GRANTED**. External console setup, physical-device verification, production cloud access, witnessed backup/restore, staged rollout/rollback approvals and real-user/business approval remain blocked until direct evidence exists. No PR is merged automatically; no security threshold or required check is weakened.

---

## Current release evidence checkpoint — 2026-11-20 15:07 CET

This checkpoint supersedes the 2026-11-13 18:49 CET main-branch checkpoint and the earlier 2026-11-20 13:09 CET stacked-branch snapshot. It is based on current `main` HEAD `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266` and fresh GitHub evidence captured at 2026-11-20 14:07 UTC. CI results apply only to the exact SHA named beside each run. This checkpoint does not grant production or pilot acceptance.

### PR #41 — merged release-blocker baseline

- PR #41 is CLOSED/MERGED on source branch `fix/release-blockers-2026-10`; its exact source-branch ref and PR head are both `68b380e73ca3c870048035197beef8febbf90ef1`. The merge commit is `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`; current `main` has advanced to `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`.
- PR #41 contains 517 commits, 100 changed files, +11,887 additions and -2,005 deletions.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS on `68b380e73ca3c870048035197beef8febbf90ef1`. Validation frontend [132115828836](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234/job/132115828836), backend [132115829214](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234/job/132115829214), and iOS [132115829399](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234/job/132115829399) all passed; CodeQL analyze [132115827817](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161/job/132115827817) and Dependency Review [132115827187](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021/job/132115827187) also passed.
- Review inventory: 53 conversation comments, 30 inline review comments, 26 formal submissions (25 COMMENTED, 1 human APPROVED), 22/22 inline threads resolved, and 109 combined timeline records.
- Historical PR #41 runs [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255) remain QUEUED on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`; each jobs endpoint returns zero jobs. These are historical queues, not current-head failures; repository administrator cancellation is required.

### Current-main remediation candidates

- **PR #193 — release-document regression correction:** OPEN/DRAFT, stacked on `fix/release-doc-checkpoint-inventory-case-20261120-run11` at base SHA `0b991f23856962a5164e63f864e3578130fee6ca`, not based directly on current main. Exact HEAD `c1250400f5c6022483c967c8b79a42be0dc614fd`; 5 commits, 4 changed files, +653/-0 relative to its base. Its own Validation [44743155619](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155619), CodeQL [44743155647](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155647), and Dependency Review [44743155582](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155582) are terminal SUCCESS on that exact HEAD. Validation frontend [136311632814](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155619/job/136311632814), backend [136311633349](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155619/job/136311633349), and iOS [136311633065](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155619/job/136311633065) passed; CodeQL analyze [136311632689](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155647/job/136311632689) and Dependency Review [136311632118](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155582/job/136311632118) passed. Frontend: 307 tests across 61 files, TypeScript, Expo Doctor 21/21, Android Release and emulator smoke passed. Backend: 450 tests, 27 readiness checks, 78 production-security checks and pip-audit passed; pip-audit reported no known Python vulnerabilities. iOS Release and simulator smoke passed. The frontend runtime npm audit still reports 3 moderate minimatch findings; it is not clean. PR #193 has 1 conversation comment, 0 inline threads, 0 formal review submissions and no human approval. This stacked PR's evidence is not substituted for a current-main documentation commit.
- **PR #200 — DNS-pinned product-page transport:** OPEN/DRAFT on current main base `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`, exact HEAD `fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a`. Validation [44735858583](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858583), CodeQL [44735858347](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858347), and Dependency Review [44735858455](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858455) are terminal SUCCESS on that exact HEAD; frontend, backend and iOS jobs passed. Frontend reported 327 tests and Android Release/emulator plus iOS Release/simulator smoke passed; backend tests and pip-audit passed. The patch pins outbound TCP connections to validated numeric DNS answers, revalidates each redirect hop, checks the connected peer, preserves original Host/TLS SNI, disables environment proxy inheritance and requires explicit network-specific `USEIT_NAT64_PREFIXES`. Reviewer `tarlaci1984-sketch` is requested; no formal human approval or inline review thread is recorded. Production prefix inventory, deployed configuration and staging/production egress evidence remain outstanding.
- **PR #201 — minimatch migration:** OPEN/DRAFT on current main base `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`, exact HEAD `776432e4e75327088034fa2f5448d96d7d71f068`. Validation [44735892822](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735892822), CodeQL [44735893037](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735893037), and Dependency Review [44735893258](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735893258) are terminal SUCCESS on that exact HEAD; frontend, backend and iOS jobs passed. Frontend reported 334 tests, Android/iOS Release and smoke passed, and `npm audit --omit=dev --audit-level=high` explicitly reported **found 0 vulnerabilities**. The candidate pins all lockfile minimatch resolutions to 11.0.5 and adds regression coverage. It remains draft/open with reviewer `tarlaci1984-sketch` requested and no formal human approval. This is a candidate, not a merged-main audit result.
- **PR #202 — CodeQL action consistency:** OPEN/DRAFT on current main base `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`, exact HEAD `67eafbebd5f45724f2c97430fee4bc1a6d153746`. Validation [44735931701](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735931701), CodeQL [44735931794](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735931794), and Dependency Review [44735931634](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735931634) are terminal SUCCESS on that exact HEAD. Frontend reported 329 tests; backend and iOS jobs passed. CodeQL init and analyze use the same immutable v4.39.4 commit `1bd86f2fdb4b86187fa4059f16f31a3202acc9ea`, guarded by a regression test. Reviewer `tarlaci1984-sketch` is requested; no formal human approval or inline review thread is recorded.
- PR #99 remains an older DNS-pinning branch at `f91c70d2636948e538f8e3559afc39cd93eb5139`. Compared with current main it is DIVERGED: 17 commits ahead / 2 behind, merge base `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. PR #200 is the current-main successor; do not use PR #99's old green runs as current-main integration evidence.

### Issues, branch protection and release inventory

- Issue #47 is CLOSED with 11 comments. Main is protected and active ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) requires six strict checks (`CodeQL`, `backend`, `frontend`, `ios`, `analyze`, `dependency-review`), one approving review, stale-review dismissal, last-push approval and resolved review threads; deletion and non-fast-forward are blocked; no bypass actors are configured.
- Issue #64 remains OPEN with 76 comments. Its current-main successor PR #200 has passed exact-head CI, but independent human security approval, a production DNS64/NAT64 prefix inventory, verified deployed `USEIT_NAT64_PREFIXES`, and staging/production egress evidence are still missing. Production acceptance remains BLOCKED.
- Issue #155 remains OPEN with 83 comments. Advisory `GHSA-fc5q-39xc-vjpf` is WITHDRAWN (2026-11-18); the lockfile has six picomatch entries and repository-wide runtime-call reachability review remains incomplete. Withdrawal is not a patched-release claim.
- Repository visibility is PUBLIC. Current `main` is `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`; branch inventory is 159 (100 + 59, third page empty), open pull requests 95, open non-PR issues 8, and published GitHub releases 0.
- Code Scanning, Dependabot and Secret Scanning alert inventories are unavailable through the connected GitHub interface. Their status is **unverified, not empty**. Green CodeQL or Dependency Review workflows do not establish an empty alert inventory.

### Canonical 25-point release register

The current row-level register is **2 Done / 15 In Progress / 8 Blocked**. Done: **#1, #6**. In Progress: **#3, #7–#15, #17, #19, #20, #23, #24**. Blocked: **#2, #4, #5, #16, #18, #21, #22, #25**.

- **#2 remains Blocked** pending the owner's durable public/private repository-visibility and release-plan decision. Issue #47 verifies that branch protection is active and is correctly closed; that does not record the separate final visibility decision. Reverify the ruleset after any visibility change.
- External acceptance blockers remain #4 physical iPhone App Attest, #5 Play-installed physical Android Play Integrity, #16 witnessed production backup/restore, #18 representative product-recognition benchmark and business acceptance, #21 production monitoring and alert delivery, #22 approved staged rollout and tested rollback, and #25 real-user pilot/business sign-off.
- CI, emulators and simulators do not satisfy production console setup, physical-device verification, production cloud access, witnessed backup/restore, staged rollout approval or real-user/business acceptance.

**Release decision: NOT READY. Production/pilot acceptance: NOT GRANTED.** No published release exists. Human review remains outstanding on PRs #193, #200, #201 and #202; no PR is merged automatically by this process.

---

## Superseded release checkpoint — 2026-11-13 18:49 CET

### Pre-integration evidence for PR #41

PR #41 remains open, unmerged, and non-draft on `fix/release-blockers-2026-10`, targeting `main`. Immediately before this integration commit, its exact HEAD was `b793a47f8f0a84155d1200fc797f191701f4eb92` (parent `e74a69a2fa1a4afd4e0c1cf5bf848d4acba2ede4`). The branch was 515 commits ahead and 0 behind main; the PR diff contained 98 files (+11,362 / -911).

Exact-head workflows for `b793a47f8f0a84155d1200fc797f191701f4eb92`:

- Validation [#43463804114](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43463804114): **failure overall**. Backend [job 132027276413](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43463804114/job/132027276413) and iOS [job 132027357144](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43463804114/job/132027357144) passed. Frontend [job 132027272954](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43463804114/job/132027272954) failed at Expo Doctor.
- Frontend unit tests passed **285/285 across 58 files**. Expo Doctor passed 20/21 checks and found four SDK 57 patch mismatches: `expo` 57.0.32 vs `~57.0.33`, `expo-constants` 57.0.23 vs `~57.0.24`, `expo-linking` 57.0.13 vs `~57.0.14`, and `expo-router` 57.0.30 vs `~57.0.31`. Android export, Release build, and emulator smoke were not reached after this failure.
- CodeQL [#43463804128](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43463804128), analyze job 132017424470: **success**.
- Dependency Review [#43463804149](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43463804149), job 132017428447: **success**.

### Validated remediation candidate integrated by this commit

Draft PR [#65](https://github.com/milanradics89-beep/POS-Doctor/pull/65), exact candidate HEAD `678fe7fde32f4dc785288d5a8ac939f1ac6478f0`, passed its own exact-head workflows:

- Validation [#43452488602](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43452488602): backend, frontend, and iOS jobs all **success**.
- CodeQL [#43452493289](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43452493289): **success**.
- Dependency Review [#43452488754](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43452488754): **success**.

The candidate updates the four Expo SDK 57 packages and lockfile, aligns validation jobs to Node 22, pins the Expo Doctor CLI used by the lock-refresh workflow, adds App Attest config/workflow regression coverage, and adds a prototype-pollution regression test for the vendored deepmerge package. Its Redis readiness and production rate-limiting corrections are byte-identical to the current release branch runbook.

This commit applies the validated candidate tree as a single child of the current PR #41 HEAD. The resulting commit is a **new exact-head CI gate**. Do not reuse either the pre-integration PR #41 failure or the PR #65 candidate's green runs as CI evidence for the resulting commit. PR #65 remains open and draft; it has not been merged.

### Review, security, and release state

- PR #41 inline review threads: **22/22 resolved**.
- Review submissions: **25**, all `COMMENTED`; **0 human APPROVED**. A human approving review and last-push approval remain mandatory.
- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed. Active main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) requires CodeQL, analyze, backend, frontend, iOS, and dependency-review; one approval; last-push approval; resolved threads; deletion/non-fast-forward protection; and no bypass actors.
- Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains open. PRs [#70](https://github.com/milanradics89-beep/POS-Doctor/pull/70) and [#79](https://github.com/milanradics89-beep/POS-Doctor/pull/79) have each passed Validation, CodeQL, and Dependency Review on their own exact heads. The redirect-chain and DNS-pinning code still requires review/integration before #64 can close.
- Repository inventory at this checkpoint: **57 branches, 33 open PRs, 0 published GitHub releases**.
- Code Scanning, Dependabot, and Secret Scanning alert inventories remain **unverified, not zero** because their alert endpoints are not exposed by the connected GitHub interface.
- The 25-point register remains **3 Done / 15 In Progress / 7 Blocked**. External blockers #4, #5, #16, #18, #21, #22, and #25 remain Blocked until physical-device, production, witnessed backup/restore, monitoring, rollout, and real-pilot evidence exists.

**Release decision:** the pre-integration PR #41 HEAD did not pass Validation. The integration commit created by this checkpoint must pass all exact-head required workflows independently. Human approval and external production/pilot acceptance remain outstanding. Do not merge PR #41 automatically or bypass required checks.

---

## Latest release checkpoint — 2026-11-11 21:40 CET

PR #41 remains **open, unmerged, and non-draft** on fix/release-blockers-2026-10, targeting main. The fully validated parent immediately before this documentation repair is 4883c652d61b93236b7a604f124bf5708caa07e6. This commit is a documentation-only child of that parent; its own exact-head Validation, CodeQL, and Dependency Review must pass independently. Do not reuse the parent runs as evidence for the child.

### Exact-head evidence for validated parent 4883c65

All three required workflows completed successfully for the same exact SHA:

- Validation [#43090044324](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044324): backend [130764391957](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044324/job/130764391957), frontend/Android [130764391800](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044324/job/130764391800), and iOS [130764391399](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044324/job/130764391399) all **success**. All steps passed, including Expo Doctor, Android export/Release/emulator smoke, iOS Release simulator/smoke, and runtime dependency audit.
- CodeQL [#43090044306](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044306), analyze [130764391156](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044306/job/130764391156): **success**.
- Dependency Review [#43090044397](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044397), job [130764390843](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044397/job/130764390843): **success**; no high-or-higher vulnerable package in the reviewed diff and no denied package.

The unchanged source/test baseline 2faa49c records **450 backend tests / 27 production-readiness checks / 78 security-privacy checks**, **285 frontend tests across 58 files**, Expo Doctor **21/21**, Android Release and emulator install/launch smoke, and iOS Release simulator build and launch smoke. The exact 4883c65 Validation reran all three jobs successfully; its source/test tree is unchanged from the validated parent.

### Dependency and security disposition

- Runtime npm audit: **four moderate** transitive glob/minimatch advisory instances; no high-or-higher finding at the configured --audit-level=high threshold.
- Dependency Review metadata: unknown license metadata remains for vendor/deepmerge@4.3.2; below-threshold Scorecard results remain for @expo/devcert (2.9) and is-mergeable-object (1.5).
- CodeQL succeeded. The previously observed SARIF column-kind mismatch is non-fatal.
- Code Scanning, Dependabot, and Secret Scanning alert inventories remain **unverified, not zero** because the connected integration does not expose those alert endpoints.

### Review, governance, and repository state

- The Codex review of 4883c65 raised two P2 documentation findings: distinguish the validated parent from the current documentation HEAD, and preserve the actionable production/mobile/staging/rollout/monitoring/rollback/release-record procedures. This commit addresses both. The two corresponding review threads are resolved after the push.
- At the pre-write refresh, PR #41 had **20 inline threads total, 18 resolved and 2 open**, **24 review submissions, 0 APPROVED**. A fresh Codex review is requested for this documentation child; a human approving review and last-push approval remain mandatory.
- Branch comparison immediately before this commit: **512 ahead / 0 behind** main; this documentation-only commit adds one linear commit. Main HEAD: 7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0.
- Repository inventory: **32 branches, 19 open PRs, 4 open non-PR issues** (#46, #25, #24, #23). GitHub Releases API returns **0 published releases**.
- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed. Active main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) requires six strict checks, one approval, last-push approval, resolved review threads, deletion/non-fast-forward protection, and no bypass actors. Issues #62 and #63 are closed.

The 25-point register remains **3 Done / 15 In Progress / 7 Blocked**. External blockers remain #4 physical iPhone App Attest production entitlement; #5 Play-installed physical Android Play Integrity; #16 witnessed production backup/restore; #18 representative product-recognition benchmark and business acceptance; #21 production monitoring and alert delivery; #22 staged rollout/rollback approval; and #25 real-user pilot and business approval.

**Automated CI acceptance for exact parent HEAD 4883c65: PASSED. The documentation-only child created by this checkpoint has separate exact-head checks and is not accepted until those checks pass. Pilot/production acceptance: NOT GRANTED. Do not merge automatically or bypass required checks.**

# USEIT release and production runbook

## 1. Required CI evidence and merge gate

Before merge, require the current PR HEAD (not its parent) to pass all six ruleset contexts: CodeQL, analyze, backend, frontend, ios, and dependency-review. Confirm Validation's backend, frontend/Android, and iOS jobs all completed successfully. A successful parent commit does not validate a documentation-only child.

PR #41 also requires one human approving review, approval of the last push, and resolved review threads. Keep the PR open until those gates and the external acceptance gates below are met. Never bypass checks, weaken the ruleset, force-push, or merge automatically.

Simulator/emulator CI is not evidence of physical-device App Attest or Play Integrity. CI success is not production, store, pilot, or business approval.

## 2. Production backend configuration

Configure secrets in the hosting platform's secret manager, never in source control, committed app config, logs, or client-side EXPO_PUBLIC variables.

Required:
- USEIT_ENV=production
- OPENAI_API_KEY
- Either USEIT_API_KEY for server-to-server/legacy access or USEIT_SESSION_SECRET for server-issued sessions. Session secrets must be at least 32 characters and randomly generated.
- USEIT_CORS_ORIGINS containing explicit trusted origins; wildcard CORS is forbidden.
- USEIT_ALLOW_DOCS=false
- USEIT_RATE_LIMIT_MODE=redis
- USEIT_REDIS_URL pointing to the shared production Redis service used by every backend worker/replica. Production startup rejects process-local memory rate limiting because its counters are not shared across workers. The Redis sliding-window operation is atomic and uses Redis server time.

When session authentication is enabled:
- USEIT_ATTESTATION_MODE=required
- USEIT_ATTESTATION_APP_ID set to the platform's real app identity.
- The shared USEIT_REDIS_URL service also stores persistent challenge and attestation-key state. The normal shared Redis client uses a 2-second connection timeout and a 5-second socket timeout; readiness must not close this shared client. If the temporary fallback readiness probe client is used, it uses a 2-second connection timeout and a 2-second socket timeout and must be closed after the ping. Treat a failed readiness check as a release blocker. The in-memory challenge store is capped at 10,000 unexpired challenges and fails closed at capacity; it is for tests/local development only.
- Select USEIT_ATTESTATION_PROVIDER=apple_app_attest or google_play_integrity to match the released platform and backend deployment.

For Google Play Integrity:
- Set `EXPO_PUBLIC_GOOGLE_CLOUD_PROJECT_NUMBER` in the EAS build environment to the numeric Google Cloud project number associated with the Play Integrity API. This identifier is embedded in the client build and is not a secret; the Android client fails closed if it is missing or invalid.
- USEIT_GOOGLE_PLAY_PACKAGE_NAME must match the Android package.
- USEIT_GOOGLE_PLAY_CERT_SHA256 must contain the production Play signing certificate digest(s) returned in the Play Integrity payload.
- Set `USEIT_GOOGLE_PLAY_DEVICE_INTEGRITY` to the explicitly approved comma-separated device verdicts. The default is `MEETS_DEVICE_INTEGRITY`; do not weaken it without a documented risk decision.
- Confirm the Google service account has the required Play Integrity permission and that the production app is published through the expected Play track.

For Apple App Attest:
- The bundle identifier and team-prefixed App Attest app ID must match the Apple Developer configuration.
- Production builds must use the production App Attest entitlement and production AAGUID.
- Confirm the production Apple Developer capability is enabled for the correct App ID.

Every production deployment must use `USEIT_RATE_LIMIT_MODE=redis` and a shared Redis instance, including single-instance production deployments. Memory-mode rate limiting is permitted only for local development and automated tests; it is never an acceptable production configuration. Redis rate limiting uses one Lua operation with Redis server time, a sorted-set sliding 60-second window, atomic pruning/count/admission, and TTL assignment for the event and sequence keys. Redis connections use explicit 2-second connect and 5-second socket timeouts. If Redis is unavailable, rate limiting fails closed with HTTP 503. Set explicit rate limits and request timeouts based on observed traffic and cost.

## 3. Mobile release configuration

- [ ] Verify the bundle identifier/package name and app version (com.useit.app in the current app.json).
- [ ] Create/review the EAS production profile and configure store signing credentials in the external build service. The repository currently has no eas.json; this is an external release prerequisite.
- [ ] Use the EAS production build profile for store artifacts.
- [ ] Confirm Apple App Attest entitlement is production in production builds; never ship a production build with development attestation.
- [ ] Confirm the Android application is signed with the intended Play App Signing certificate.
- [ ] Keep provider credentials and backend secrets out of the mobile bundle.
- [ ] Test camera permission grant, denial, recovery through Settings, image capture, analysis failure, retry, product discovery, and no-results states on physical devices.
- [ ] Test on at least one supported physical iOS device and one supported physical Android device. Simulator/emulator tests do not validate hardware-backed attestation.


### Bounded staging load probe

The repository includes `scripts/load-test.mjs` for a controlled HTTP load probe. Run it only against an approved staging environment after agreeing request volume and expected thresholds with the service owner.

Example health/readiness probe:

```bash
USEIT_LOAD_BASE_URL=https://staging-api.example.com \
USEIT_LOAD_TARGET_ENV=staging \
USEIT_LOAD_APPROVED_ORIGIN=https://staging-api.example.com \
USEIT_LOAD_PATH=/ready \
USEIT_LOAD_REQUESTS=100 \
USEIT_LOAD_CONCURRENCY=5 \
node scripts/load-test.mjs
```

For POST endpoints, explicitly set `USEIT_LOAD_TEST_ALLOW_POST=YES`, provide `USEIT_LOAD_BODY_JSON`, and configure `USEIT_LOAD_API_KEY` if required. POST tests can trigger billable AI calls or state changes. The harness caps each run at 1,000 requests and concurrency at 20, reports status counts, throughput and p50/p95/max latency, and exits non-zero on any failed request. Do not treat a health-endpoint probe as evidence of AI-analysis capacity; use an approved representative payload and a cost ceiling for analysis tests.

## 4. Staged rollout

1. Deploy the exact reviewed backend commit to staging.
2. Apply required environment variables and verify the readiness endpoint.
3. Smoke-test health/readiness, authentication, attestation, image analysis, product discovery, rate limiting, and timeout/error handling.
4. Release mobile builds to internal TestFlight and Google Play internal testing first.
5. Validate sign-in/session creation, attestation on real devices, camera permissions, analysis, shopping results, and recovery after network loss.
6. Run a limited pilot. Track crash-free sessions, API error rates, p95 latency, provider failures, product-resolution success rate, rate-limit events, and per-session AI cost.
7. Expand rollout only after the pilot meets the agreed quality, reliability, and cost thresholds. Record the approval and released commit SHA.

## 5. Monitoring, privacy, and rollback

- [ ] Confirm structured logs include request IDs and status/latency but do not contain images, data URIs, API keys, bearer tokens, or raw provider responses.
- [ ] Confirm `vision_usage` events contain only the model identifier and validated prompt/completion/total token counts; establish model-specific pricing and per-session budget alerts outside the application rather than hard-coding mutable provider prices.
- [ ] Alert on sustained 5xx/429 rates, provider outages, readiness failures, unusual cost spikes, and repeated attestation failures.
- [ ] Verify backups and recovery procedures for the production datastore and shared Redis state where applicable.
- [ ] Document the on-call owner, hosting provider, alert destination, and incident escalation path before public launch.
- [ ] Keep the previous known-good backend artifact and mobile store release available for rollback.
- [ ] For a backend regression, roll back to the previous known-good artifact/configuration and verify readiness and smoke tests. Use a reviewed revert commit for source rollback; do not force-push shared release branches.
- [ ] For a mobile regression, halt staged rollout and use the store's release controls. Mobile clients generally cannot be remotely downgraded, so restore service compatibility on the backend and publish a fixed version.
- [ ] After release, review metrics and crash reports at 24 hours and 7 days; turn findings into tracked issues with owners and acceptance criteria.

## 6. Release record

Record before release:
- Release version and Git commit SHA
- CI run URLs for validation and security workflows
- Backend deployment identifier and environment
- Mobile artifact identifiers and signing/build profiles
- Attestation provider and configuration verification (never record secrets)
- Pilot start/end, acceptance results, approver, and rollback owner

This repository does not itself prove that cloud secrets, Apple/Google console settings, store signing, production hosting, monitoring, backups, or physical-device validation are configured. Those items require verification in the relevant external systems before public release.


## Repository settings required for CI

The dependency-review workflow uses GitHub's dependency graph and must not be bypassed. If it reports that dependency review is unsupported, enable **Settings → Advanced Security → Dependency graph** for this repository, then rerun the workflow for the exact release commit. Lockfile-based npm and Python audits are additional checks, not a substitute for this gate.


## Personal memory security

- Set `USEIT_MEMORY_SECRET` to a randomly generated secret of at least 32 bytes before enabling the memory API.
- Treat memory IDs as bearer capabilities: clients must generate an unpredictable URL-safe token of at least 32 characters and store it privately. Guessable IDs such as usernames are rejected.
- Personal-memory writes require a literal JSON boolean `consent: true`; coerced values such as `1` or `"true"` are not consent.


## Personal memory encryption at rest

Personal-memory values are encrypted with AES-256-GCM before SQLite persistence. The encryption key is derived with domain separation from `USEIT_MEMORY_SECRET`; keep that secret in the host's secret manager and back up the database and secret together. Existing plaintext rows are migrated transactionally on first access after upgrading. If the secret is missing/weak or ciphertext authentication fails, the memory API fails closed rather than returning plaintext or corrupt data.

---

## Current release evidence checkpoint — 2026-11-22 01:21 CET

Evidence refreshed at 2026-11-22 00:21 UTC from live PR metadata, branch refs, exact-head Actions runs/jobs, issue records, ruleset metadata, and release inventory. Main is `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`. This checkpoint does not grant production or pilot acceptance.

### PR #41 — merged baseline

- PR #41 is CLOSED/MERGED on `fix/release-blockers-2026-10`. PR metadata and the source branch ref both report exact HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge commit `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. The merged PR contains 517 commits, 100 changed files, +11,887 additions, and -2,005 deletions.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS on that exact SHA. Frontend, backend, iOS, CodeQL Analyze, and Dependency Review jobs all passed.
- Complete review inventory: 53 conversation comments, 30 inline review comments, 26 formal review submissions (25 COMMENTED and one human APPROVED by `tarlaci1984-sketch`), 22/22 inline threads resolved, 0 unresolved, and 109 combined timeline records.
- Historical runs [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255) remain QUEUED on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`; all three jobs endpoints return zero jobs. They are historical queues, not current-head failures. Repository administrator cancellation is required.

### PR #204 — clean-main release-documentation candidate

- PR #204 is OPEN/DRAFT on `docs/release-evidence-current-main-20261120-run11`, based on main `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`, with 10 commits and 4 changed files. PR metadata and branch ref agree: PR #204 current exact HEAD is `c3fd17a1029adb26962b8cb96b06ef87b5fee2a7`.
- Exact-head Validation [44828340885](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44828340885) is terminal FAILURE. Frontend job [136618168236](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44828340885/job/136618168236) failed one assertion in `scripts/release-evidence-checkpoint.test.mjs`: the test expects the obsolete phrase/head `PR #204 current exact HEAD is cbdb625...`, while the checkpoint uses a different sentence and records the prior head. This is a release-evidence/test-contract defect, not a demonstrated application runtime defect. Backend job [136618171118](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44828340885/job/136618171118) and iOS job [136618170211](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44828340885/job/136618170211) passed.
- Exact-head CodeQL [44828340790](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44828340790) and Dependency Review [44828341122](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44828341122) are terminal SUCCESS on the same SHA.
- PR #204 review inventory: 2 conversation comments, 0 inline threads, 0 formal review submissions, and 0 human approvals. Reviewer `tarlaci1984-sketch` is requested. The current candidate remains unapproved and unmerged.

### Other release-evidence candidates

- PR #206 exact HEAD `df0c26e7fb14b170b4f7cd80da570ce031480720`: Validation [44918462263](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44918462263) terminal FAILURE; CodeQL [44918462197](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44918462197) and Dependency Review [44918462179](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44918462179) SUCCESS.
- PR #217 exact HEAD `1ccbcd00ed02d2bad68bfc6bc3aaf2cb6c97845a`: Validation [44930055117](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44930055117) terminal FAILURE; CodeQL [44930055149](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44930055149) and Dependency Review [44930055266](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44930055266) SUCCESS.
- PR #218 exact HEAD `c01fef68d1a33f5ca60f3cd8ed62781c4e59cb6e`: Validation [44945232153](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44945232153) terminal FAILURE (frontend 333 passed / 4 failed; backend and iOS passed); CodeQL [44945232175](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44945232175) and Dependency Review [44945232099](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44945232099) SUCCESS.
- PR #219 exact HEAD `3ba1c4f20f7aab6dafa774bb8c2d11cb21c59735` has zero exact-head workflow runs, zero check-runs, and zero status contexts. Its recorded base SHA is `e638a5714481afbb08adc54877131d7152e5ab24`, while its live base branch (PR #218) is `c01fef68d1a33f5ca60f3cd8ed62781c4e59cb6e`; comparison is DIVERGED, 4 commits ahead / 1 behind. Its CodeQL inefficient-regex thread remains unresolved/outdated. The iterative parser correction in commit `6909afe` is not verified on current HEAD.
- PR #215 exact HEAD `061bd79a581f5c98385bab58dc9d355ece2f3fce` has 3/3 exact-head workflows SUCCESS, but is DIVERGED from the current PR #206 base (1 ahead / 5 behind) and is not mergeable.
- PR #220 exact HEAD `1adf04eb3b17f91873ab7724a0d946ad7343ae11`, a separate PR #85 test-only correction, has exact-head Validation [44955675733](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44955675733), CodeQL [44955675682](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44955675682), and Dependency Review [44955675650](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44955675650) all terminal SUCCESS. Frontend, backend, iOS, CodeQL Analyze, and Dependency Review jobs passed. This does not validate PR #204 or PR #219.

### Issues, security, and current-main remediation

- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is CLOSED with 11 comments. Active ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) protects main with six strict required checks, one approving review, last-push approval, resolved review threads, deletion/non-fast-forward protection, and no bypass actors. Repository visibility is public. The separate durable visibility/release-plan decision is not recorded; backlog item #2 remains Blocked.
- Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains OPEN with 96 comments. Current-main PR #200 exact HEAD `fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a` has Validation [44735858583](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858583), CodeQL [44735858347](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858347), and Dependency Review [44735858455](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858455) all terminal SUCCESS. Backend evidence: 539 tests, 27 production-readiness checks, 78 security/privacy checks, and a local TCP/TLS integration test. PR #200 has 0 formal reviews and 0 inline threads. Production remains BLOCKED pending independent security-owner approval, complete production NAT64/DNS64 prefix inventory, deployed `USEIT_NAT64_PREFIXES` verification, and staging/production egress evidence.
- Current-main PR #201 exact HEAD `776432e4e75327088034fa2f5448d96d7d71f068` has Validation [44735892822](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735892822), CodeQL [44735893037](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735893037), and Dependency Review [44735893258](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735893258) all terminal SUCCESS; its frontend runtime audit reports found 0 vulnerabilities. PR #201 remains an unmerged draft pending human review and does not make repository-wide security-alert inventories available.
- Current-main PR #203 exact HEAD `a006fdb882bfb6989487e3faea77db23f183839f` has Validation [44744190838](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190838), CodeQL [44744190840](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190840), and Dependency Review [44744190839](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190839) all terminal SUCCESS.
- Issue #74 has 356 comments; issue #149 has 275; issue #155 has 120. The separate 64-item development checklist remains 41 checked / 23 open. The earlier frontend runtime audit reported 3 moderate minimatch findings; PR #201's separate exact-head audit reports 0 vulnerabilities, but it remains unmerged and full alert inventories remain unavailable.

### Release records and 25-point register

- Main's three release records remain on the 2026-11-13 checkpoint. Main `RELEASE_PILOT_ACCEPTANCE.md` still incorrectly says PR #41 is open/unmerged and had zero human approvals; live GitHub shows it is merged with one human approval. This is a real documentation defect and must be integrated through a reviewed candidate, not a direct main edit.
- The three PR #204 candidate documents are synchronized but their previous checkpoint is stale. This commit appends the current exact-head evidence section to all three and updates register rows #10 and #24 without changing any status.
- The candidate row-level 25-point register contains exactly 25 rows: **2 Done / 15 In Progress / 8 Blocked**. Done: #1, #6. In Progress: #3, #7–#15, #17, #19, #20, #23, #24. Blocked: #2, #4, #5, #16, #18, #21, #22, #25. Main's older register remains 3 Done / 15 In Progress / 7 Blocked; the two registers are not silently merged.
- #2 remains Blocked pending the owner's durable visibility/release-plan decision. #4 physical iPhone App Attest; #5 Play-installed physical Android Play Integrity; #16 witnessed production backup/restore; #18 representative product-recognition benchmark/business acceptance; #21 production monitoring and witnessed alert delivery; #22 approved staged rollout and tested rollback; #25 real-user pilot and business sign-off remain Blocked.
- Published GitHub releases: 0. Code Scanning, Dependabot, and Secret Scanning alert inventories are unavailable through the connected GitHub integration: **unverified, not empty**.

**Release decision: NOT READY. Production/pilot acceptance: NOT GRANTED.** No CI result from a parent commit is attributed to a child SHA. No simulator, emulator, or automated test result is promoted into physical-device, production, backup/restore, monitoring, rollout, or business acceptance.

---

---

## Current release evidence checkpoint — 2026-11-22 03:54 CET

Evidence refreshed at 02:54 UTC from live PR metadata, exact branch refs, exact-head Actions runs and jobs, review threads and submissions, issue records, the active main ruleset, the release-branch search, and the GitHub Releases endpoint. Main is `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`. This checkpoint does not grant production or pilot acceptance.

### PR #41 — merged baseline

- PR #41 is CLOSED/MERGED on `fix/release-blockers-2026-10`. Live PR metadata and the source branch ref both report exact HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge commit `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. It contains 517 commits, 100 changed files, +11,887 additions and -2,005 deletions. The source branch ref is not protected; main is protected by the active ruleset.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS on that exact SHA. Frontend, backend, iOS, CodeQL Analyze, and Dependency Review jobs all passed.
- Review inventory: 109 combined timeline records; 53 conversation comments, 30 inline review comments, 26 formal review submissions (25 COMMENTED and one human APPROVED by `tarlaci1984-sketch`), 22/22 inline review threads resolved, 0 unresolved, and 20 outdated threads.
- Historical runs [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255) remain QUEUED on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`; each jobs endpoint returns zero jobs. They are historical queues, not current-head results. Repository administrator cancellation is required.
- The PR description retains superseded historical open/unmerged wording. Live PR metadata is authoritative.

### Main governance and repository inventory

- Repository visibility is public. Main HEAD is `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`; the main branch API reports `protected: true`.
- Active ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) is active on the default branch. It requires six strict checks (`CodeQL`, `backend`, `frontend`, `ios`, `analyze`, `dependency-review`), one approval, stale-approval dismissal, last-push approval, resolved review threads, deletion and non-fast-forward protection, and no bypass actors.
- The paginated release-branch search returned 81 matching branch names and is complete. GitHub Releases API returned an empty array: **Published GitHub releases: 0**.
- Main's three release documents remain on their older 2026-11-13 checkpoint. The refreshed candidate records are on PR #204's branch only; PR #204 is still draft and unmerged.

### PR #204 — current-main release-documentation candidate

- PR #204 is OPEN/DRAFT on `docs/release-evidence-current-main-20261120-run11`, based on main `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`, with 13 commits and 4 changed files. PR metadata and the branch ref agree: PR #204 current exact HEAD is `429bcf42e654dd7875eb1ec6e9121785641fdebb`.
- Current exact-head Validation [44973384594](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44973384594) is terminal FAILURE. Frontend job [137063021907](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44973384594/job/137063021907) failed Unit tests: **333 passed / 1 failed across 72/72 files** (71 files passed, one file failed). The failing assertion in `scripts/release-evidence-checkpoint.test.mjs` expects the literal `PR #218 exact HEAD`, while the checkpoint correctly formats the label as `**PR #218** exact HEAD`. The corresponding PR #219 assertion has the same Markdown-format assumption and is being corrected in the test contract. This is a documentation/test-contract mismatch, not a demonstrated application runtime defect.
- After the frontend unit-test failure, pinned Expo Doctor, Android export, native Android Release build, Android emulator smoke, and frontend runtime dependency audit were skipped on this exact HEAD. No result is claimed for those steps.
- Backend job [137063022997](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44973384594/job/137063022997) passed **450 pytest tests**, **27 production-readiness checks**, and **78 security/privacy checks**; pip-audit reported **No known vulnerabilities found**. iOS job [137063023297](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44973384594/job/137063023297) passed native Release build and simulator install/launch smoke.
- CodeQL [44973384562](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44973384562), Analyze job `137057808508`, and Dependency Review [44973384597](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44973384597), job `137057808240`, are terminal SUCCESS on the same exact HEAD `429bcf42`.
- Previous PR #204 HEAD `a676a8420a3a98093d3687476b3fbc987a080a98` had terminal Validation FAILURE (330 passed / 3 failed across 71/72 files), CodeQL SUCCESS, and Dependency Review SUCCESS. Earlier PR #204 HEAD `ef8b92b63ce3449b061728f56c351671f46ffe14` had 3/3 exact-head workflows SUCCESS; its frontend recorded **332 tests across 72 test files**, Android Release/emulator smoke and runtime audit. This is historical ancestor evidence only, not validation for `429bcf42`. That ancestor runtime audit reported **3 moderate severity vulnerabilities** in transitive minimatch via `@expo/fingerprint`; the proposed `npm audit fix --force` would downgrade Expo and was not run.
- PR #204 review inventory: 2 conversation comments, 0 inline threads, 0 formal review submissions, and 0 human approvals. Reviewer `tarlaci1984-sketch` is requested. The candidate remains unapproved and unmerged.

### Other release and security candidates

- **PR #218** exact HEAD `c01fef68d1a33f5ca60f3cd8ed62781c4e59cb6e`: Validation [44945232153](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44945232153) terminal FAILURE (frontend 333 passed / 4 failed; backend and iOS passed); CodeQL [44945232175](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44945232175) and Dependency Review [44945232099](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44945232099) terminal SUCCESS on that same SHA.
- **PR #219** exact HEAD `3ba1c4f20f7aab6dafa774bb8c2d11cb21c59735` has zero exact-head workflow runs, zero check-runs, and zero status contexts. Its recorded base SHA is `e638a5714481afbb08adc54877131d7152e5ab24`, while the current base branch (PR #218) is at `c01fef68d1a33f5ca60f3cd8ed62781c4e59cb6e`; comparison is DIVERGED, 4 commits ahead / 1 behind. The CodeQL inefficient-regex review thread remains unresolved/outdated. The iterative parser and assertion corrections are present but unverified on this exact HEAD. Do not overwrite or force-push this concurrent branch.
- **PR #220 exact HEAD `1adf04eb3b17f91873ab7724a0d946ad7343ae11`** is a separate PR #85 test-only correction; exact-head Validation [44955675733](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44955675733), CodeQL [44955675682](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44955675682), and Dependency Review [44955675650](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44955675650) are terminal SUCCESS. This does not validate PR #204 or #219.
- **PR #200 exact HEAD `fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a`**: Validation [44735858583](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858583), CodeQL [44735858347](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858347), and Dependency Review [44735858455](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858455) are terminal SUCCESS. Backend evidence is 539 tests, 27 readiness checks and 78 security/privacy checks; frontend runtime audit evidence records 3 moderate minimatch findings. PR #200 has 0 formal reviews and 0 inline threads; reviewer `tarlaci1984-sketch` is requested. Production acceptance remains BLOCKED pending independent security-owner approval, complete NAT64/DNS64 prefix inventory, deployed `USEIT_NAT64_PREFIXES` verification, and staging/production egress evidence.
- **PR #201 exact HEAD `776432e4e75327088034fa2f5448d96d7d71f068`**: Validation [44735892822](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735892822), CodeQL [44735893037](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735893037), and Dependency Review [44735893258](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735893258) are terminal SUCCESS. Its exact-head frontend npm audit reported **found 0 vulnerabilities** after minimatch 11.0.5 migration; the PR remains OPEN/DRAFT pending human review.
- **PR #203 exact HEAD `a006fdb882bfb6989487e3faea77db23f183839f`**: Validation [44744190838](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190838), CodeQL [44744190840](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190840), and Dependency Review [44744190839](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190839) are terminal SUCCESS.

### Issues and security inventory

- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is CLOSED with 11 comments. Main protection is verified through the active ruleset and main branch metadata.
- Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains OPEN with 97 comments. Its current-main DNS-rebinding SSRF remediation candidate is PR #200; CI and local transport tests are not production acceptance.
- Code Scanning, Dependabot, and Secret Scanning alert inventories are unavailable through the connected GitHub integration: **unverified, not empty**. The corresponding alert endpoints are not exposed by the integration; successful CodeQL and Dependency Review workflows do not prove repository-wide alert inventories are empty.

### Canonical 25-point release register

The candidate row-level register contains exactly 25 items and parses to **2 Done / 15 In Progress / 8 Blocked**. Done: **#1, #6**. In Progress: **#3, #7–#15, #17, #19, #20, #23, #24**. Blocked: **#2, #4, #5, #16, #18, #21, #22, #25**. Main's separate register remains **3 Done / 15 In Progress / 7 Blocked**; the two registers are not silently merged.
- **#2 remains Blocked** pending the owner's durable repository-visibility and release-plan decision; active branch protection alone does not record that separate decision.
- **#4** requires production Apple App Attest entitlement and physical-iPhone verification. **#5** requires Play-installed physical Android Play Integrity. **#16** requires witnessed production backup/restore. **#18** requires a representative labeled product-recognition benchmark and business acceptance. **#21** requires production monitoring and witnessed alert delivery. **#22** requires approved staged rollout and tested rollback. **#25** requires a real-user pilot and explicit business sign-off.
- No physical-device, production-cloud, backup/restore, monitoring, rollout, or business-acceptance item is promoted by CI, simulator, or emulator evidence.

**Release decision: NOT READY. Production/pilot acceptance: NOT GRANTED.** No CI result from a parent commit is attributed to a child SHA. The latest PR #204 exact HEAD `429bcf42` has Validation FAILURE, CodeQL SUCCESS and Dependency Review SUCCESS; human review and external release acceptance remain outstanding.


---



---

## Current release evidence checkpoint — 2026-11-23 13:39 CET

Evidence refreshed from live GitHub PR metadata, exact branch refs, exact-commit Actions runs and job records, PR timeline/reviews/threads, issue records, repository metadata, the active ruleset, and the GitHub Releases endpoint. This checkpoint records automated evidence only; it does not grant production or pilot acceptance.

### PR #41 — merged baseline and review closure

- PR #41 is CLOSED/MERGED. Live PR metadata and independent refs/heads/fix/release-blockers-2026-10 both report exact HEAD 68b380e73ca3c870048035197beef8febbf90ef1; merge commit f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1. The PR contains 517 commits, 100 changed files, +11,887 additions and -2,005 deletions. Compared with current main 3a262358552a9650d865aa5bd3c92905f1e863cb, the retained source branch is 517 ahead / 4 behind; it is already merged and must not be merged again.
- Exact-head Validation 43492153234, CodeQL 43492153161, and Dependency Review 43492153021 are terminal SUCCESS on that exact SHA. Frontend, backend, iOS, CodeQL Analyze and Dependency Review jobs all passed (5/5).
- Refreshed review inventory: 109 combined timeline records; 53 conversation comments, 30 inline review comments, 26 formal submissions (25 COMMENTED and one human APPROVED by tarlaci1984-sketch), 22/22 inline threads resolved, 0 unresolved, 20 outdated.
- Historical runs 43098210284, 43098210473, and 43098210255 remain QUEUED on obsolete SHA b46c5b8082ecbebd263a86cd53b1321a86e570d1; each jobs endpoint returned zero jobs. These are historical queues, not current PR #41 failures. Repository administrator cancellation is required.
- PR #41's description still contains superseded historical open/unmerged wording; live metadata is authoritative.

### Current release-documentation candidate — PR #249

- PR #249 is OPEN/DRAFT on fix/pr233-live-checkpoint-refresh-20261123-1150, based on PR #233 exact HEAD 1f21b900c44194739ae6c85f171c3dd657c9fc84. Current exact PR #249 HEAD is ecc54c53b04ae767f583970273876b0792101eb1; 3 commits and 4 changed files. The branch remains a child candidate and has not been merged into PR #233 or main.
- Exact-head Validation 45169777686, CodeQL 45169777815, and Dependency Review 45169777770 are terminal SUCCESS on ecc54c53b04ae767f583970273876b0792101eb1. Validation frontend, backend and iOS jobs all passed; CodeQL Analyze and Dependency Review jobs passed. This is exact-child evidence, not a retroactive pass for the parent PR #233 SHA.
- The latest PR #249 commit changes only scripts/release-evidence-checkpoint.test.mjs: two historical checkpoint wording assertions were aligned with the actual recorded Markdown wording. Both assertions remain present. No application source, dependency manifest/lockfile, workflow security setting, or test coverage was removed.
- Parent PR #233 remains OPEN/DRAFT at 1f21b900c44194739ae6c85f171c3dd657c9fc84; its own Validation 45153637592 failed (frontend 329 passed / 4 failed), while CodeQL 45153637645 and Dependency Review 45153637640 passed. PR #249's green child checks do not change the parent's recorded result. Human review and reconciliation are still required before integration.
- This checkpoint documentation update is a new child commit; its own exact-head Validation, CodeQL and Dependency Review must be evaluated separately after the branch ref moves. No result is pre-claimed.

### Issues, repository governance, releases and security inventory

- Issue #47 is CLOSED with 11 comments. Issue #64 remains OPEN with 126 comments; its latest source-level notes re-verify the merged DNS-pinned transport but do not provide production deployment evidence.
- Current main is 3a262358552a9650d865aa5bd3c92905f1e863cb. Active ruleset 26370589 is enforced on the default branch: six strict required checks (CodeQL, backend, frontend, ios, analyze, dependency-review), one approving review, stale-review dismissal, last-push approval, resolved review threads, deletion/non-fast-forward protection, and no bypass actors.
- GitHub Releases API returned an empty array: 0 published releases.
- Code Scanning, Dependabot, and Secret Scanning alert inventories remain unavailable through the connected integration: UNVERIFIED, NOT EMPTY. Their alert endpoints were rejected by the integration; successful workflow checks are not a substitute for repository-wide alert inventories.

### Other active security/release candidates

- PR #246 remains OPEN/DRAFT at exact HEAD ad614dd25d0fd11d3d50737718e7dbd88a74c89a; its exact-head Validation 45112214845, CodeQL 45112214955, and Dependency Review 45112214927 are terminal SUCCESS. Its recorded full dependency-tree audit at moderate threshold and runtime audit at high threshold reported zero vulnerabilities. It is an unmerged candidate, not mainline remediation.
- PR #244 remains OPEN/DRAFT at 914e5f81df1c1859bfa7e946fda5504a211718fa; Validation 45110396689 failed, while CodeQL 45110396639 and Dependency Review 45110396664 passed. Four picomatch adversarial patterns exceeded the 2,500 ms child-process timeout: +(*) *(*) , +(a*), and +(*a). This is an unresolved security-testing signal, not proof of exploitability. Tests/timeouts were not weakened.
- PR #245 is not an acceptable integration path: its patch removes historical regression assertions. Green CI on that branch does not justify dropping those assertions.
- Mainline PR #200's DNS-pinned SSRF implementation is merged on main. Production acceptance remains blocked pending independent security-owner approval, complete production NAT64/DNS64 prefix inventory, deployed USEIT_NAT64_PREFIXES verification, and staging/production egress tests.

### Canonical 25-point release register

The candidate row-level register contains exactly 25 items: 2 Done / 15 In Progress / 8 Blocked. Done: #1, #6. In Progress: #3, #7–#15, #17, #19, #20, #23, #24. Blocked: #2, #4, #5, #16, #18, #21, #22, #25. Main's separate historical register remains 3 Done / 15 In Progress / 7 Blocked; the two registers are not silently merged.
- #2 remains Blocked pending the owner's durable repository-visibility/release-plan decision.
- #4 requires production Apple App Attest entitlement and physical-iPhone verification. #5 requires Play-installed physical Android Play Integrity. #16 requires witnessed production backup/restore. #18 requires a representative labeled product-recognition benchmark and business acceptance. #21 requires production monitoring and witnessed alert delivery. #22 requires approved staged rollout and tested rollback. #25 requires a real-user pilot and explicit business sign-off.
- No simulator, emulator, automated CI, source inspection, or local test is promoted into physical-device, production-cloud, witnessed backup/restore, monitoring, rollout, or business acceptance.

Release decision: NOT READY. Production/pilot acceptance: NOT GRANTED.

### Operational next actions

1. Repository administrator cancels the three obsolete PR #41 queued runs listed above.
2. Reviewer inspects PR #249 and its exact-head green checks; do not merge it automatically.
3. Security owner investigates the picomatch counterexamples and reviews PR #246 before dependency remediation is selected.
4. Production security owner supplies NAT64/DNS64 and deployed egress evidence for Issue #64.
5. Keep production rollout, backup/restore, monitoring, physical-device, and pilot gates closed until witnessed evidence and named approvals are recorded.


## Latest live release-watch checkpoint — 2026-11-23 15:17 CET

### Exact PR and branch evidence

- PR #41 is CLOSED/MERGED. Its source branch `fix/release-blockers-2026-10` and PR metadata agree on exact HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge commit `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. The PR records 517 commits, 100 changed files, +11,887/-2,005. Comparison with current main is DIVERGED, 517 ahead / 4 behind; do not reopen or merge it again.
- PR #41 exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS. All five jobs are terminal success: backend, frontend, iOS, CodeQL analyze, and dependency-review.
- PR #41 review inventory: 109 combined timeline records (53 conversation comments, 30 inline review comments, 26 formal review submissions); 25 submissions are COMMENTED and one human APPROVED by `tarlaci1984-sketch`. All 22 inline threads are resolved; 0 unresolved; 20 outdated.

### Current release-documentation candidate

- PR #249 is OPEN/DRAFT, based on PR #233's release-evidence branch, at exact HEAD `03f696d5213554e23527552daf74b0c769ea27f5`. It has 4 commits and 4 changed files. It remains a child candidate; it has not been merged into PR #233 or main.
- PR #249 exact-head Validation [45177427806](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45177427806), CodeQL [45177427823](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45177427823), and Dependency Review [45177427845](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45177427845) are all terminal SUCCESS. Validation's backend, frontend, and iOS jobs passed. Frontend steps include unit tests, Expo Doctor, Android export, native Android Release build, Android emulator smoke, and runtime dependency audit; iOS Release build and simulator smoke passed. CodeQL Analyze and Dependency Review also passed.
- PR #249 currently has one Dependency Review bot conversation comment, 0 formal review submissions, and 0 inline review threads. Human review is still required; green automation is not approval.
- Parent PR #233 remains OPEN/DRAFT at exact HEAD `1f21b900c44194739ae6c85f171c3dd657c9fc84`. Its own Validation [45153637592](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45153637592) failed (329 passed / 4 failed in frontend); CodeQL [45153637645](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45153637645) and Dependency Review [45153637640](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45153637640) passed. PR #249's green child checks do not change that parent result.

### Issues, mainline, releases, and security inventory

- Issue #47 is CLOSED with 11 comments. Issue #64 is OPEN with 127 comments (last updated 2026-11-23 14:00:53 UTC). The merged DNS-pinned transport has source-level and automated regression evidence, but production NAT64/DNS64 inventory, deployed `USEIT_NAT64_PREFIXES` verification, staging/production egress evidence, and independent security-owner acceptance remain outstanding.
- Current main HEAD is `3a262358552a9650d865aa5bd3c92905f1e863cb`. Active ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) requires six strict checks, one approving review, last-push approval, stale-review dismissal, resolved review threads, deletion/non-fast-forward protection, and has no bypass actors.
- GitHub Releases API returned an empty array: 0 published releases.
- Code Scanning, Dependabot, and Secret Scanning alert inventories remain UNAVAILABLE through the connected integration: UNVERIFIED, NOT EMPTY. The alert endpoint family was rejected; successful workflow checks are not a substitute for alert inventory.
- PR #244 remains a picomatch counterexample test candidate. The four exact patterns are `+(*)`, `*(*)`, `+(a*)`, and `+(*a)`; each exceeded the 2,500 ms child-process timeout on its recorded failing Validation. This is an unresolved security-testing signal, not proof of exploitability. Do not weaken the timeout or suppress tests.

### Release decision

Automated CI on PR #249 is green at its exact HEAD, but PR #249 still requires human review and reconciliation with its parent. Production and pilot acceptance remain NOT GRANTED. Simulator/emulator checks do not satisfy physical-device, production-cloud, witnessed backup/restore, monitoring, staged rollout/rollback, real-user pilot, or business approval.


## Latest live release-watch checkpoint — 2026-11-23 15:59 CET

### PR #41 — merged baseline, branch and review evidence

- PR #41 is CLOSED/MERGED. Live PR metadata and `refs/heads/fix/release-blockers-2026-10` both report exact HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge commit `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. The PR records 517 commits, 100 changed files, +11,887 additions and -2,005 deletions. Compared with current `main` `3a262358552a9650d865aa5bd3c92905f1e863cb`, the retained branch is DIVERGED, 517 ahead / 4 behind; it is already merged and must not be merged again.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS on `68b380e73ca3c870048035197beef8febbf90ef1`. All five jobs passed: backend, frontend, iOS, CodeQL Analyze and Dependency Review.
- Refreshed PR timeline: 109 records = 53 conversation comments, 30 inline review comments and 26 formal review submissions (25 COMMENTED, one human APPROVED by `tarlaci1984-sketch`). All 22 inline threads are resolved; 0 unresolved and 20 outdated.
- Historical runs [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255) remain QUEUED on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`; each jobs endpoint returns zero jobs. They are stale historical queues, not failures on the merged PR #41 HEAD. Repository administrator cancellation is required.

### Current release-documentation candidate — PR #249

- PR #249 is OPEN/DRAFT on `fix/pr233-live-checkpoint-refresh-20261123-1150`, based on PR #233 exact HEAD `1f21b900c44194739ae6c85f171c3dd657c9fc84`. Its current exact HEAD is `7615189b9c7e52d2b4e67d1cc389d4c57a0d4104`; 5 commits and 4 changed files. The branch ref and PR metadata agree. It remains an unmerged child candidate.
- Exact-head Validation [45193033662](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45193033662) is terminal FAILURE; CodeQL [45193033650](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45193033650) and Dependency Review [45193033682](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45193033682) are terminal SUCCESS on the same SHA. Backend and iOS jobs passed; frontend failed at Expo Doctor.
- Frontend evidence on this exact head: 349/349 unit tests passed across 72 files and TypeScript typecheck passed. Expo Doctor 20/21 failed its SDK package-version check. Android export, native Android Release build, emulator smoke and runtime dependency audit were skipped after that failure; no result is claimed for those steps.
- Expo Doctor reports these mismatches against the official Expo SDK 57 `bundledNativeModules.json` map ([source](https://github.com/expo/expo/blob/sdk-57/packages/expo/bundledNativeModules.json)): `expo-constants` expected `~57.0.25`, found `57.0.24`; `expo-image-picker` expected `~57.0.22`, found `57.0.21`; `expo-router` expected `~57.0.32`, found `57.0.31`. The candidate's `package.json` and `package-lock.json` both still carry the older patch versions.
- This is a real SDK dependency-alignment failure, not a unit-test or demonstrated application-runtime failure. No package or lockfile write was made in this checkpoint: the lockfile must be regenerated with npm and verified as a matched, integrity-preserving pair; speculative manual integrity edits or a forced SDK downgrade are not acceptable. The next remediation is to update the three compatible SDK 57 patch versions and regenerate the lockfile in an npm-enabled Node 22 environment, then rerun the complete exact-head Validation, CodeQL and Dependency Review.
- PR #249 has one Dependency Review bot conversation comment, 0 formal review submissions and 0 inline review threads. Human review remains required. Parent PR #233 remains OPEN/DRAFT at exact HEAD `1f21b900c44194739ae6c85f171c3dd657c9fc84`; its own Validation [45153637592](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45153637592) failed (329 passed / 4 frontend assertions), while CodeQL [45153637645](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45153637645) and Dependency Review [45153637640](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45153637640) passed. PR #249 results do not rewrite the parent result.

### Other active release/security candidates

- PR #246 remains OPEN/DRAFT at exact HEAD `ad614dd25d0fd11d3d50737718e7dbd88a74c89a`; Validation [45112214845](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45112214845), CodeQL [45112214955](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45112214955), and Dependency Review [45112214927](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45112214927) passed on that SHA. Its recorded full dependency-tree moderate-threshold audit and runtime audit reported zero vulnerabilities. It remains unmerged.
- PR #244 remains OPEN/DRAFT at exact HEAD `914e5f81df1c1859bfa7e946fda5504a211718fa`; Validation [45110396689](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45110396689) failed, while CodeQL [45110396639](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45110396639) and Dependency Review [45110396664](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45110396664) passed. Four picomatch counterexample patterns exceeded the 2,500 ms child-process timeout: `+(*)`, `*(*)`, `+(a*)`, and `+(*a)`. This remains an unresolved security-testing signal, not proof of exploitability; tests and timeouts were not weakened.
- PR #245 remains an unsuitable integration path because its patch removes historical regression assertions. Green CI does not justify dropping them.
- PR #251 is OPEN/DRAFT at exact HEAD `6ec5397210efdbf308bbaaf8e8772c073935ca0e`; its test-only CodeQL/Dependabot assertion correction passed Validation [45171240696](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45171240696), CodeQL [45171240514](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45171240514), and Dependency Review [45171240479](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45171240479) on that exact SHA.
- PR #252 is OPEN/DRAFT at exact HEAD `16e1bb03aa2166092fdeaacd7456be23f2bf20cc`; its Node 22 Android/iOS prebuild regression assertions passed Validation [45180656948](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45180656948), CodeQL [45180656708](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45180656708), and Dependency Review [45180657275](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/45180657275) on that exact SHA. It remains unmerged and requires human review.

### Issues, governance, releases and security inventory

- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is CLOSED with 11 comments. Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains OPEN with 127 comments (last updated 2026-11-23 14:00:53 UTC). The merged DNS-pinned SSRF transport has source-level and automated regression evidence, but production NAT64/DNS64 inventory, deployed `USEIT_NAT64_PREFIXES` verification, staging/production egress tests and independent security-owner approval remain outstanding.
- Current main ref is `3a262358552a9650d865aa5bd3c92905f1e863cb`. Active ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) requires six strict checks, one approving review, last-push approval, stale-review dismissal, resolved threads, deletion/non-fast-forward protection and has no bypass actors.
- GitHub Releases API returned an empty array: 0 published releases. Code Scanning, Dependabot and Secret Scanning alert inventories remain unavailable through the connected integration: UNVERIFIED, NOT EMPTY.

### Canonical 25-point release register

| Status | Items | Count |
|---|---|---:|
| Done | #1, #6 | 2 |
| In Progress | #3, #7–#15, #17, #19, #20, #23, #24 | 15 |
| Blocked | #2, #4, #5, #16, #18, #21, #22, #25 | 8 |
| **Total** | **#1–#25** | **25** |

The eight Blocked items remain blocked: #2 durable visibility/release-plan decision; #4 physical iPhone App Attest; #5 Play-installed physical Android Play Integrity; #16 witnessed production backup/restore; #18 representative product-recognition benchmark and business acceptance; #21 production monitoring with witnessed alert delivery; #22 approved staged rollout and tested rollback; and #25 real-user pilot plus business sign-off. Main's separate historical register remains 3 Done / 15 In Progress / 7 Blocked; the two registers are not silently merged.

Release decision: NOT READY. Production/pilot acceptance: NOT GRANTED.