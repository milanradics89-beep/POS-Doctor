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
