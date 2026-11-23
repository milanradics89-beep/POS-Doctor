# POS-Doctor Release Watch — Current Evidence Snapshot

**Captured:** 2026-11-24 00:22 CET  
**Repository:** `milanradics89-beep/POS-Doctor`  
**Candidate branch:** `fix/pr233-live-checkpoint-refresh-20261123-1150`

> Current operational evidence overlay. The three long-form release records retain their 22:03 CET checkpoint and historical sections; this file supersedes stale live-status values without rewriting or truncating those records. It does not grant production or pilot acceptance.


## Latest live audit — 2026-11-24 00:22 CET

This section supersedes the 2026-11-23 23:11 snapshot below. Claims are tied to exact refs and runs. This is repository/automated evidence only; it does not grant production or pilot acceptance.

### PR #41 — merged source baseline

- PR #41 is CLOSED/MERGED from fix/release-blockers-2026-10 to main. PR metadata and independent branch ref both report exact HEAD 68b380e73ca3c870048035197beef8febbf90ef1. Merge commit f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1.
- 517 commits, 100 changed files, +11,887 additions and -2,005 deletions. Comparison against current main 3a262358552a9650d865aa5bd3c92905f1e863cb is DIVERGED: 517 ahead / 4 behind.
- Exact-head Validation 43492153234, CodeQL 43492153161 and Dependency Review 43492153021 are terminal SUCCESS. All five jobs passed: frontend, backend, iOS, CodeQL Analyze and Dependency Review.
- Review timeline: 109 records = 53 conversation comments, 30 inline comments and 26 formal submissions (25 COMMENTED, one APPROVED by tarlaci1984-sketch on 2026-11-13). The approval body is empty and is not production/security acceptance. All 22 inline threads are resolved; 20 are outdated.
- The merged PR description still contains superseded historical text claiming an open/unmerged b46c5b8 state and unresolved threads. Live metadata and refs are authoritative; the merged PR body was not edited.
- Three historical workflows remain QUEUED with zero jobs on obsolete SHA b46c5b8082ecbebd263a86cd53b1321a86e570d1: Validation 43098210284, CodeQL 43098210473 and Dependency Review 43098210255. They are not failures on the merged HEAD. Repository-admin cancellation is required; the integration exposes no cancellation action.

### Main governance and repository state

- Current main HEAD: 3a262358552a9650d865aa5bd3c92905f1e863cb. Repository visibility is public.
- Ruleset Protect main / ID 26370589 is ACTIVE for the default branch. It requires six strict checks (CodeQL, backend, frontend, ios, analyze, dependency-review), one approving review, stale-review dismissal, last-push approval and resolved review threads; deletion and non-fast-forward are blocked; bypass actors are empty and current-user bypass is never.
- The legacy/classic branch-protection detail endpoint returned 403 to the integration. This does not negate the independently retrieved active ruleset; no separate classic-protection claim is made.

### PR #249 — current release-documentation candidate

- PR #249 is OPEN/DRAFT and unmerged at exact HEAD 778b5cde89e248bc94fac32278e8a9fe167eb8c9 on fix/pr233-live-checkpoint-refresh-20261123-1150. It is based on PR #254 exact HEAD 2c9d9ef7a052a2a55b491925c8c40d9fc3649bd3; 29 commits and 5 changed files.
- Exact-head Validation 45278060230, CodeQL 45278060009 and Dependency Review 45278059813 are terminal SUCCESS. Backend, frontend, iOS, CodeQL Analyze and Dependency Review jobs all passed. Frontend: 352 tests across 72 files; TypeScript, Expo Doctor, Android export, native Android Release build and emulator smoke passed.
- The frontend runtime audit ran npm audit --omit=dev --audit-level=high and reported 3 MODERATE minimatch findings. The HIGH threshold passed; the audit is not clean at moderate severity. The Dependency Review bot reports no scanned files, so it does not clear the runtime findings. Do not run npm audit fix --force: its proposed resolution downgrades Expo to 52.0.49.
- PR #249 has one Dependency Review bot conversation comment, zero formal reviews, zero inline review threads and zero human approvals. It remains draft and unmerged.

### PR #254 — Expo SDK 57 alignment

- PR #254 is OPEN/DRAFT at exact HEAD 2c9d9ef7a052a2a55b491925c8c40d9fc3649bd3, based on main 3a262358552a9650d865aa5bd3c92905f1e863cb; one commit and two changed files.
- package.json and package-lock.json align expo-constants ~57.0.25, expo-image-picker ~57.0.22, expo-router ~57.0.32 and @expo/metro-runtime 57.0.19. Exact-head Validation 45223358003, CodeQL 45223357946 and Dependency Review 45223358018 are terminal SUCCESS; all five jobs passed. Frontend 327/327 tests across 71 files, Expo Doctor 21/21, Android Release/emulator and iOS Release/simulator smoke passed.
- Three moderate minimatch findings remain in the runtime dependency audit. PR #254 has zero formal reviews, zero inline threads and zero human approvals; it remains draft and unmerged.

### PR #246 — minimatch 11 full-audit candidate

- PR #246 is OPEN/DRAFT at exact HEAD ad614dd25d0fd11d3d50737718e7dbd88a74c89a, based on PR #231 branch security/minimatch-11-current-main-20261122 at 444e312b4bf94237eedfb0af1a24922bf5853942.
- Exact-head Validation 45112214845, CodeQL 45112214955 and Dependency Review 45112214927 are terminal SUCCESS. Frontend, backend, iOS, CodeQL Analyze and Dependency Review jobs passed. Its frontend job runs npm audit --audit-level=moderate and npm audit --omit=dev --audit-level=high; both reported zero vulnerabilities on this candidate.
- The inherited PR #231 change pins minimatch 11.0.5 via npm overrides and updates the lockfile; PR #246 adds the full audit workflow step and a workflow-contract test. This candidate is not based on PR #254's SDK 57 patch-alignment branch. Do not retarget or merge blindly: regenerate the lockfile on the SDK 57 base and rerun Expo fingerprint, Android and iOS compatibility tests before integration.

### PR #244 — picomatch runtime observations

- PR #244 remains OPEN/DRAFT at exact HEAD 6a1d531132cd457cdb997e8a677d39ace17d019a. Validation 45220119684 failed (frontend 330 passed / 4 failed); CodeQL 45220119625 and Dependency Review 45220119889 passed.
- Four bounded counterexamples +( * ), *( * ), +(a*), and +(*a) exceeded the 2,500 ms child-process timeout. The exact tested patterns are +(*), *(*), +(a*) and +(*a). The upstream GHSA-fc5q-39xc-vjpf / CVE-2026-112366 advisory was withdrawn on 2026-11-18 as not a security issue. Preserve tests and timeout; timing observations do not establish exploitability. Determine whether untrusted user input can reach this build-time matcher.

### Issues, releases and security inventories

- Issue #47 is CLOSED with 11 comments. Its latest body records the active main ruleset; older protection warnings are superseded by the live ruleset read.
- Issue #64 remains OPEN with 133 comments, last updated 2026-11-23 21:42:53 UTC. PR #200's DNS-pinned transport is integrated in main, but production acceptance remains blocked by independent security-owner approval, complete production NAT64/DNS64 inventory, deployed USEIT_NAT64_PREFIXES verification and captured staging/production egress tests.
- GitHub Releases API returned an empty array: 0 published releases.
- Code Scanning, Dependabot and Secret Scanning alert inventories are UNAVAILABLE / UNVERIFIED / NOT EMPTY. The integration rejects the alert-list endpoints; no zero-alert claim is made.

### Canonical release records and 25-point register

- The three long-form release records remain at their shared 2026-11-23 22:03 CET checkpoint: RELEASE_RUNBOOK.md blob 2b376d418a2ea25068b779a459fe57e1e3143a1c; RELEASE_PILOT_ACCEPTANCE.md blob 1e05f34a207d6bb52d6b59358a4ce847568ce84c; 25-POINT-RELEASE-BACKLOG.md blob 55096a43ad351edd8f50fbbdaa0d7d406c226bfe. This evidence overlay supersedes stale live-status values; it does not rewrite their historical sections.
- Canonical register: 2 Done (#1, #6); 15 In Progress (#3, #7–#15, #17, #19, #20, #23, #24); 8 Blocked (#2, #4, #5, #16, #18, #21, #22, #25). All 25 rows remain accounted for.
- The eight blocked items remain: #2 durable repository visibility/release-plan decision; #4 physical iPhone App Attest; #5 Play-installed physical Android Play Integrity; #16 witnessed production backup/restore; #18 representative product-recognition benchmark and business acceptance; #21 production monitoring with witnessed alert delivery; #22 approved staged rollout and tested rollback; #25 real-user pilot and business sign-off. Do not promote these from CI, simulator or emulator evidence.

### Human actions

- Repository administrator: cancel the three obsolete PR #41 queued runs.
- Reviewers: review PR #249 documentation evidence and PR #254 SDK 57 alignment; both are draft with no human approvals.
- Engineering/security: reconcile PR #246's minimatch 11.0.5 override with the SDK 57 package set, using a regenerated lockfile and targeted compatibility tests; investigate picomatch input reachability without suppressing tests.
- Security owner and infrastructure: provide production SSRF/NAT64/DNS64 evidence and independent acceptance for Issue #64.
- Product/business and platform owners: supply physical-device, witnessed backup/restore, production monitoring, staged rollout/rollback and real-user pilot/business evidence.

**Release decision: NOT READY. Production/pilot acceptance is NOT GRANTED.**

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
