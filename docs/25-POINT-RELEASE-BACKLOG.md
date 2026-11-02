# USEIT 25-point release backlog

Last reviewed: 2026-11-02 23:56 CET
Working branch: fix/release-blockers-2026-10
PR: [#41](https://github.com/milanradics89-beep/POS-Doctor/pull/41)

## Latest verified release evidence (2026-11-02; last fully validated PR HEAD)

- PR #41 remains open, unmerged, and non-draft. At the start of this documentation update, exact PR HEAD [`d52232b`](https://github.com/milanradics89-beep/POS-Doctor/commit/d52232b88f067d728d25dd8afe34bce262bf7bd9) had passed all three required workflows. This documentation-only update creates a new PR HEAD whose own CI is pending; do not treat the `d52232b` runs as checks for the new SHA. The latest application-source change remains [`d7aeb21`](https://github.com/milanradics89-beep/POS-Doctor/commit/d7aeb212fbd3c47009edbb981540a09e3c431a3f). The PR base and `main` HEAD both equal `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0`.
- Exact-head [Validation 41536391718](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41536391718), [CodeQL 41536391486](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41536391486), and [Dependency Review 41536391499](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41536391499) all succeeded for PR HEAD `d52232b88f067d728d25dd8afe34bce262bf7bd9`. Validation jobs: backend [125589192369](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41536391718/job/125589192369), frontend/Android [125589192213](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41536391718/job/125589192213), and iOS [125589191949](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41536391718/job/125589191949); CodeQL analyze [125589190063](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41536391486/job/125589190063); Dependency Review [125589189652](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41536391499/job/125589189652).
- Backend compilation, tests, production-readiness checks and dependency audit passed. Frontend source-boundary guard, typecheck, unit tests, Expo Doctor, Android export/Release build/emulator smoke test passed. iOS native generation, CocoaPods, Release simulator build and install/launch smoke test passed.
- Dependency Review reported 0 vulnerable packages, 0 incompatible licenses, 0 invalid SPDX definitions, 1 unknown-license warning, and 2 OpenSSF Scorecard warnings. The local `vendor/deepmerge@4.3.2` license-metadata warning, two low Scorecard findings, and 11 moderate transitive `glob`/`minimatch` npm-audit advisories remain. No forced Expo downgrade or audit-threshold reduction was applied.
- Eight inline PR #41 review threads are recorded. Seven earlier findings are resolved. The latest Codex review identified a P2 exact-head evidence wording issue; this update addresses it by recording `d52232b` as the last validated baseline and leaving the new documentation-only HEAD pending its own checks. Current source/tests confirm explicit-auth POST retry fixtures, effective Request/init headers and method, valid base64 privacy data, sanitized error-boundary logging, Settings recovery, and App Attest enrollment only after server acceptance.
- [Issue #47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed as completed. Active ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) targets main and enforces strict checks `CodeQL`, `backend`, `frontend`, `ios`, `analyze`, and `dependency-review`; PR plus one approval, stale-review dismissal, last-push approval, thread resolution, deletion/non-fast-forward protection, and no bypass actors. Main reports `protected: true`. No approving review is currently recorded, so the one-approval merge gate remains outstanding.
- [Issue #46](https://github.com/milanradics89-beep/POS-Doctor/issues/46) remains open for a historical CodeQL failure on SHA `9616867170b299797a699929b2939b5571266307`; current exact-head CodeQL succeeded, but the old issue remains open. GitHub Releases is empty. Complete code-scanning, Dependabot, and secret-scanning alert inventories remain unavailable through the connected integration; do not infer zero alerts.

## 25-point status register

| # | Workstream | Status | Evidence / next gate |
|---:|---|---|---|
| 1 | iOS CI closure | **Done** | Last fully validated PR HEAD `d52232b` iOS job [125589191949](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41536391718/job/125589191949) passed native generation, CocoaPods, Release simulator build, install/launch. Physical attestation is #4. |
| 2 | Main branch protection | **Done** | Active ruleset 26370589 targets main; strict required checks CodeQL/backend/frontend/ios/analyze/dependency-review, PR plus one approval, stale-review dismissal, last-push approval, thread resolution, deletion/non-fast-forward blocked, no bypass actors. Issue #47 closed completed. |
| 3 | Dependency Review warnings | **In Progress** | Review passed but deepmerge license metadata and two low Scorecard warnings remain; npm audit has 11 moderate advisories. Remediate compatibly or record owner risk acceptance. |
| 4 | Physical iPhone App Attest production entitlement | **Blocked** | Apple Developer production capability/App ID and supported physical iPhone required. |
| 5 | Play-installed physical Android Play Integrity | **Blocked** | Play internal track, Play App Signing identity, Google Cloud project/service-account permission, and physical Android required. |
| 6 | Redis multi-instance concurrency | **Done** | backend/test_attestation_store_integration.py verifies single-use challenge consumption across separate backend worker processes using shared Redis; exact-head backend CI passed. |
| 7 | Attestation retry/network/expiry | **In Progress** | Timeout, expiry, pending-enrollment, and same-evidence tests exist; physical network-loss/provider-backed verification remains. |
| 8 | Backend production security audit | **In Progress** | Production-readiness/security tests and dependency audit pass; deployed secrets, ingress, CORS, provider identity/config remain unverified. |
| 9 | Privacy and logging audit | **In Progress** | Source redaction and token-only vision_usage tests exist; early 429/503 responses now have request IDs and completion logging with regression coverage. Production log sink, ingress/access logs, retention, and operator access remain unverified. |
| 10 | Release acceptance evidence | **In Progress** | Last fully validated PR HEAD at this update start is `d52232b`, with successful Validation, CodeQL, and Dependency Review evidence above. This documentation-only update needs its own exact-HEAD CI before the new PR HEAD is considered validated; latest application source remains `d7aeb212`. Production and physical-device gates remain. |
| 11 | Mobile regression | **In Progress** | Android emulator and iOS simulator smoke tests pass; physical-device regression remains. |
| 12 | Camera/image processing | **In Progress** | Image-contract and permission tests exist; physical capture and representative photo coverage remain. |
| 13 | Offline/weak network | **In Progress** | Abort/deadline/retry tests exist; real interruption/reconnect recovery needs device/staging validation. |
| 14 | API timeout/retry | **In Progress** | Request deadlines, safe-method retry, and exact Request-body replay after 401 session refresh are tested; real network behavior and POST idempotency remain unproven. |
| 15 | Backend load test | **In Progress** | c41bb74 adds the production HTTPS-only guard and its regression test on top of explicit target/origin/approval and redirect guards. Run only against owner-approved staging and record agreed thresholds/results. |
| 16 | Backup/restore | **Blocked** | Production datastore/Redis backup access and witnessed restore drill required. |
| 17 | AI cost optimization | **In Progress** | Token/model usage telemetry exists; pricing, per-session budgets, and production cost alerts need owner configuration. |
| 18 | Product-recognition accuracy | **Blocked** | Representative labeled dataset, agreed metrics, and human evaluation required; no benchmark claimed. |
| 19 | AI fallback | **In Progress** | Conservative scene and no-candidate shopping fallback code/tests exist; provider-outage and fallback-quality staging evidence remains. |
| 20 | UI loading/empty/error/permission regression | **In Progress** | Permission recovery and sanitized error boundary covered; full state matrix/device validation remains. |
| 21 | Monitoring/alerting | **Blocked** | Production monitoring workspace, alert destination, on-call owner, and delivery tests required. |
| 22 | Staged rollout | **Blocked** | Production approval, TestFlight/Play track access, rollout gates, and rollback owner required. |
| 23 | Analytics | **In Progress** | vision_usage token/model telemetry exists; product funnel, retention, and dashboard validation remain. |
| 24 | Release pipeline | **In Progress** | Android/iOS CI build and smoke tests pass; store signing, EAS artifacts, distribution, promotion permissions unverified. |
| 25 | Pilot/business validation | **Blocked** | Real pilot cohort, success/stop thresholds, named business owner, and documented approval required. |

**Current count: 3 Done / 15 In Progress / 7 Blocked.** Source presence alone does not satisfy an external acceptance gate.

## Required external hand-offs

- Repository administrator: main ruleset 26370589 is active and verified; issue #47 is closed. Preserve the exact required checks and no-bypass policy.
- Apple/Google owners: configure production attestation identities/permissions and provide store-distributed physical devices.
- Infrastructure owner: provide approved staging/production config, backup/restore, monitoring destination, and written load-test target/threshold approval.
- Product/business owner: provide labeled accuracy data, AI cost budgets, pilot cohort/thresholds, and release approval.



## Previous engineering update (2026-11-01; exact PR head 67f2d545; superseded by c87450df)

- PR #41 remains open and unmerged. Current head is [67f2d545](https://github.com/milanradics89-beep/POS-Doctor/commit/67f2d545247ea276b515a44d06473a466deacc85), a documentation-only evidence refresh whose parent is [dd864aa8](https://github.com/milanradics89-beep/POS-Doctor/commit/dd864aa8d829dbbb4bd60255ad7e0d3d269a94ff). Application source remains unchanged since [274fefb](https://github.com/milanradics89-beep/POS-Doctor/commit/274fefb6390b2324dfb37b8201279675bf26b481).
- All required workflows completed successfully for exact head 67f2d545: [Validation 41277283112](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41277283112), [CodeQL 41277282923](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41277282923), and [Dependency Review 41277283456](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41277283456).
- Validation jobs: [backend 124761921658](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41277283112/job/124761921658), [frontend/Android 124761921517](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41277283112/job/124761921517), and [iOS 124761921455](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41277283112/job/124761921455) all completed successfully. Backend reported 350 passed and one Starlette/httpx TestClient deprecation warning; the Redis 7.4.12 service emitted a runner-host `vm.overcommit_memory` warning, not a test failure. Android Release/emulator and iOS Release simulator build/install/launch checks passed.
- [CodeQL analyze job 124761921352](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41277282923/job/124761921352) succeeded; its SARIF merge logged a column-kind mismatch warning. [Dependency Review job 124761922861](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41277283456/job/124761922861) succeeded with no high-or-higher vulnerable packages and no denied packages. The unknown `vendor/deepmerge@4.3.2` license metadata, two low Scorecard findings, and 11 moderate transitive glob/minimatch npm-audit advisories remain. No forced Expo downgrade or threshold reduction was applied.
- Exact observed check-run names: `CodeQL`, `analyze`, `backend`, `frontend`, `ios`, and `dependency-review`. They are not enforced by a main-branch ruleset.
- All three inline PR #41 review threads are resolved. Source inspection confirms explicit-auth POST retry tests, effective Request/init headers and method selection, a valid base64 image data URI in the vision-usage privacy test, sanitized error-boundary logging, Settings recovery for permanently denied camera/gallery permissions, and App Attest pending-enrollment recovery.
- [Issue #47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) remains open. `main` reports `protected=false`, the rulesets endpoint is empty, and branch-protection detail reads return HTTP 403 to the integration. A repository administrator must create and verify the required `main` ruleset.
- The GitHub releases endpoint is empty. The connected integration does not expose complete code-scanning, Dependabot, or secret-scanning alert inventories; their full status remains unverified.
- Backlog remains **2 Done / 15 In Progress / 8 Blocked**. Physical-device, production-environment, external administration, and human pilot gates remain open.

## Previous engineering update (2026-11-01; exact PR head 77fea7ab; superseded by dd864aa8)

- PR #41 remains open and unmerged. Its current head is `77fea7ab2df95d1baadfcf453afaa9e427e97096`, a documentation-only evidence refresh whose parent is `a5fdcdc0f3302ea12a169c7226c74a9ab2495e9e`; application source remains unchanged since `274fefb6390b2324dfb37b8201279675bf26b481`.
- [Validation 41270593350](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41270593350) completed successfully: backend, frontend/Android, and iOS jobs all passed. Backend job [124742385604](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41270593350/job/124742385604) used Redis 7.4.12 and reported **350 passed, 1 Starlette/httpx TestClient deprecation warning**. Frontend job [124742385610](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41270593350/job/124742385610) passed the source-boundary guard, typecheck, unit tests, Expo Doctor, Android export/Release build, emulator install/launch, and runtime dependency audit. iOS job [124742385450](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41270593350/job/124742385450) passed native project generation, CocoaPods, Release simulator build, and simulator install/launch.
- [CodeQL 41270593270](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41270593270) completed successfully and uploaded combined JavaScript/Python SARIF. The merge emitted a SARIF column-kind mismatch warning; the workflow nevertheless succeeded. The connected integration does not expose the complete code-scanning alert inventory.
- [Dependency Review 41270593238](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41270593238) completed successfully with no high-or-higher vulnerable packages and no denied packages. Warnings remain for unknown license metadata on `package-lock.json » vendor/deepmerge@4.3.2` and low Scorecard results for `@expo/devcert` (2.9) and `is-mergeable-object` (1.5). The runtime npm audit still reports 11 moderate transitive `glob`/`minimatch` advisories; the only suggested automatic fix downgrades Expo to 51.0.39, so no forced downgrade or audit-threshold reduction was applied.
- All three inline PR #41 review threads are resolved. The latest source still contains the App Attest enrollment recovery, effective Fetch Request/init header semantics, explicit-auth POST retry tests, valid base64 privacy fixture, sanitized error-boundary logging, and Settings recovery for permanently denied camera/gallery permissions.
- [Issue #47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) remains open. `main` reports `protected=false`, the rulesets endpoint is empty, and the branch-protection read returns HTTP 403 to the integration; repository-admin action is still required.
- The GitHub releases endpoint is empty. Complete code-scanning and Dependabot alert inventories are not exposed by the connected integration; their status remains unverified.

## Latest engineering update (2026-11-01; exact PR head 5086e378)

- PR #41 head [5086e37](https://github.com/milanradics89-beep/POS-Doctor/commit/5086e378c29e338bb1bdaaffcce53030e30c9902) is a documentation-only evidence refresh; application source remains unchanged since [274fefb](https://github.com/milanradics89-beep/POS-Doctor/commit/274fefb6390b2324dfb37b8201279675bf26b481).
- Exact-head [validation 41257943934](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41257943934) passed backend, frontend/Android, and iOS jobs. Backend job [124705008763](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41257943934/job/124705008763) passed **350 tests with 1 Starlette deprecation warning** using Redis 7.4.12. Frontend job [124705008632](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41257943934/job/124705008632) passed source-boundary guard, typecheck, unit tests, Expo Doctor, Android export/Release build, emulator install/launch, and runtime dependency audit. iOS job [124705008758](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41257943934/job/124705008758) passed native generation, CocoaPods, Release simulator build, and simulator install/launch.
- [CodeQL 41257943925](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41257943925) and [Dependency Review 41257943924](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41257943924) completed successfully. Dependency Review found no high-or-higher vulnerable packages and no denied packages; the unknown-license metadata warning for `vendor/deepmerge@4.3.2` and two low Scorecard warnings (`@expo/devcert` 2.9, `is-mergeable-object` 1.5) remain. The separate npm audit continues to report 11 moderate transitive advisories.
- All three inline PR #41 review threads are resolved. Current source inspection confirms Request/init header semantics, explicit-auth POST retry tests, valid base64 privacy fixture, sanitized error-boundary logging, Settings recovery, and App Attest enrollment recovery.
- [Issue #47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) remains open: main is not protected, no ruleset is active, and the integration cannot read branch-protection details (HTTP 403); administrator action is required.
- The releases endpoint is empty. Complete code-scanning and Dependabot alert inventories are not exposed by the connected integration; no zero-alert claim is made.
- Backlog remains **2 Done / 15 In Progress / 8 Blocked**. PR #41 remains open and unmerged; external production and physical-device gates remain open.

## Previous engineering update (2026-11-01; exact PR head 8de5eff)

- PR #41 head [8de5eff](https://github.com/milanradics89-beep/POS-Doctor/commit/8de5effdee8885170e4d80381fe043fb1838e575) is a documentation-only evidence refresh. Its parent [9bbfde2](https://github.com/milanradics89-beep/POS-Doctor/commit/9bbfde2cb2d4a9aef1e10119e01019a954cadf5a) adds the Google Auth Requests transport; application code last changed at [274fefb](https://github.com/milanradics89-beep/POS-Doctor/commit/274fefb6390b2324dfb37b8201279675bf26b481).
- Exact-head [validation 41253959559](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41253959559) passed backend, frontend/Android, and iOS jobs. Backend job [124693068128](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41253959559/job/124693068128) passed **350 tests with 1 Starlette deprecation warning** using Redis 7.4. Frontend job [124693068427](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41253959559/job/124693068427) passed source-boundary guard, typecheck, unit tests, Expo Doctor, Android export/Release build, emulator install/launch, and runtime dependency audit. iOS job [124693068327](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41253959559/job/124693068327) passed native generation, CocoaPods, Release simulator build, and simulator install/launch.
- [CodeQL 41253959541](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41253959541) and [Dependency Review 41253959551](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41253959551) completed successfully. Dependency Review found no high-or-higher vulnerabilities or denied packages; one unknown-license entry (`vendor/deepmerge@4.3.2`) and two low Scorecard warnings (`@expo/devcert` 2.9, `is-mergeable-object` 1.5) remain. The separate npm audit continues to report 11 moderate transitive advisories.
- All three inline PR #41 review threads are resolved. The Request/init header semantics, explicit-auth POST retry tests, valid base64 privacy fixture, sanitized error-boundary logging, Settings recovery, and App Attest enrollment recovery were rechecked in the current source.
- [Issue #47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) remains open. The repository reports `main.protected=false`, no active rulesets, and HTTP 403 for branch-protection reads through the integration; administrator action is required.
- The releases endpoint is empty. Complete code-scanning and Dependabot alert inventories are not exposed by the connected integration; no zero-alert claim is made.
- Backlog remains **2 Done / 15 In Progress / 8 Blocked**. PR #41 remains open and unmerged; external production and physical-device gates remain open.



## Engineering update (2026-10-31; historical)

- Documentation-only commit `3756175afb93fc9886b97b99f1e44220173e9054` passed [validation 41228116353](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41228116353), [CodeQL 41228116244](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41228116244), and [Dependency Review 41228116350](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41228116350). This is the latest fully validated PR head; application source code remains unchanged from `c95530f88254697704d45ba385cf0bb3d0ea5170`.

- Commit [`c95530f`](https://github.com/milanradics89-beep/POS-Doctor/commit/c95530f88254697704d45ba385cf0bb3d0ea5170) replaces Redis calendar-minute counters with an atomic Redis-server-time sliding 60-second window. The Lua operation prunes expired events, counts, admits/rejects, and updates TTLs atomically; the backend tests cover the minute-boundary case and 32 concurrent requests across independent clients. Backend, frontend, and iOS jobs passed in [validation run 41220026884](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41220026884); CodeQL and Dependency Review also passed for this exact source SHA.
- Dependency Review still reports the known one unknown-license metadata warning and two low Scorecard warnings; the separate npm audit high threshold passes while 11 moderate transitive `glob` / `minimatch` advisories remain.
- Privacy hardening commit [`9da15a9`](https://github.com/milanradics89-beep/POS-Doctor/commit/9da15a95b2515339c050d1ab3b22cda10d0db8f7) masks memory capability IDs in request paths and adds success/error-path sentinel tests. Those tests remain in the current source tree and the exact-source backend/frontend jobs passed.
- All three inline PR #41 review threads are resolved; current source inspection confirms the previously identified request-auth, privacy fixture, error-boundary, and permission-recovery findings are addressed.
- No production log-sink or ingress/access-log configuration was available for verification; item 9 remains In Progress.

## Dependency and supply-chain investigation

The current [Dependency Review run 41220026908](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41210918324) log reports no vulnerable packages at severity high or higher and no denied packages. It reports one unknown-license metadata entry and two highlighted low OpenSSF Scorecard results.

- `deepmerge@4.3.2` is a direct local file dependency (`file:vendor/deepmerge`). Its `vendor/deepmerge/package.json` declares MIT and `vendor/deepmerge/LICENSE` contains the MIT license text. The npm lockfile records `node_modules/deepmerge` as a local link without a license field, which explains the Dependency Review unknown-license warning. Do not describe it as an uninstalled/extraneous dependency.
- `@expo/devcert@1.2.2` declares MIT; OpenSSF Scorecard reports 2.9.
- `is-mergeable-object@1.1.1` declares MIT; OpenSSF Scorecard reports 1.5.

These are supply-chain metadata/posture warnings, not vulnerability findings. Keep them visible and record the project owner's risk decision or a verified upstream/remediation path.

### Separate npm audit findings

The exact-head frontend job ran `npm audit --omit=dev --audit-level=high`. It exited successfully because the report contained 11 moderate advisories and no high/critical findings, but this is not a clean dependency tree:

- `glob@13.0.6` is affected by [GHSA-3g3m-2fjr-6pw4](https://github.com/advisories/GHSA-3g3m-2fjr-6pw4), a moderate AbortSignal cancellation-bypass issue.
- `minimatch@10.2.6` is affected by [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249), a moderate globparts-amplification denial-of-service issue.
- Both are transitive in the npm non-dev dependency graph through Expo SDK 57 tooling. This classification does not prove that the packages are included in the shipped JavaScript bundle or reachable in the app's runtime paths.
- `npm audit fix --force` proposed installing Expo `51.0.39`, a breaking SDK downgrade. It was not run. Verify a compatible upstream patch or a tested override before changing the lockfile; otherwise record an explicit owner risk decision and retain the warnings.

Do not conflate the npm audit report with Dependency Review's vulnerable-package count, and do not lower the audit threshold to make the pipeline green.
## Engineering work started on 2026-10-30

- API retry safety: prevent duplicate billable/state-changing POST work by disabling automatic POST retries until the backend implements and tests idempotency-key enforcement; bound session bootstrap time; add regression tests.
- Attestation HTTP deadlines: each session bootstrap, challenge and evidence-submission fetch has a 10-second AbortController-backed deadline; abort and exact same-evidence retry regressions passed on `78402c8` in [validation run 41191342523](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41191342523).
- Load testing: add a bounded, opt-in Node.js harness for staging with explicit POST opt-in and machine-readable latency/status metrics.
- AI cost observability: emit only validated token counts and model identifier from vision responses; add regression coverage that verifies image and user-intent sentinels never reach logs.
- Privacy: commit `78402c8` redacts prompt/user-prompt/user-intent aliases; sentinel regression tests prove user-intent and prompt values are absent from structured logs. Exact-head frontend/backend CI passed in [validation run 41191342523](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41191342523). Production log-sink and retention review remain open.

## Remaining engineering actions

- Real-device network interruption and provider-backed attestation recovery still need physical-device verification; the automated 10-second deadline and same-evidence retry tests pass on the exact current head.
- Validate client cancellation and retry behavior under real network loss.
- Execute the load harness against an approved staging target and agree capacity thresholds before interpreting results.
- Continue the UI-state matrix, AI cost measurement, monitoring/alert wiring, and release artifact workflow where repository-only work is possible.

## Release decision

The PR remains open and must not be merged until all required checks pass for the exact final SHA and all externally verifiable release gates have recorded evidence. A blank or unverified acceptance item is not a pass.
