# USEIT 25-point release backlog

Last reviewed: 2026-11-01 (CET)  
Working branch: `fix/release-blockers-2026-10`  
PR: [#41](https://github.com/milanradics89-beep/POS-Doctor/pull/41)  
Last fully validated PR head: `8de5effdee8885170e4d80381fe043fb1838e575`

Status meanings:
- **Done**: repository/CI evidence exists for the stated acceptance criterion.
- **In Progress**: implementation or automated evidence exists, but the full acceptance criterion is not yet met.
- **Blocked**: the next required action depends on external access, physical hardware, a production environment, a curated dataset, or an owner decision.

## Current evidence

Current PR #41 head, fully validated by all required workflows: `8de5effdee8885170e4d80381fe043fb1838e575` (`docs(release): refresh exact-head evidence and 25-point status`, documentation-only). Its parent `9bbfde2cb2d4a9aef1e10119e01019a954cadf5a` adds the Google Auth Requests transport dependency; application code last changed at `274fefb6390b2324dfb37b8201279675bf26b481`.

- [Validation run 41253959559](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41253959559): frontend, backend, and iOS jobs all completed successfully for the exact current PR head. The backend job [124693068128](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41253959559/job/124693068128) ran against Redis 7.4 and reported **350 passed, 1 warning** (Starlette's httpx/TestClient deprecation). The frontend job [124693068427](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41253959559/job/124693068427) passed typecheck, unit tests, Expo Doctor, Android export, Android Release build, emulator install/launch smoke test, and the configured runtime dependency audit. The iOS job [124693068327](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41253959559/job/124693068327) passed native project generation, CocoaPods, Release simulator build, and simulator install/launch.
- [CodeQL run 41253959541](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41253959541): completed successfully. The exact CodeQL check summary says **“No new alerts in code changed by this pull request”**; the SARIF scan completed. The connected integration does not expose the complete repository alert inventory, so this is not a zero-open-alert assertion.
- [Dependency Review run 41253959551](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41253959551): completed successfully with 0 vulnerable packages at high severity or above, 0 incompatible licenses, 0 invalid SPDX definitions, 1 unknown-license metadata warning for the local vendor/deepmerge@4.3.2 link, and 2 low OpenSSF Scorecard warnings (@expo/devcert 2.9; is-mergeable-object 1.5). The separate npm audit --omit=dev --audit-level=high step passed its configured threshold but still reports **11 moderate** transitive glob/minimatch advisories; no forced Expo downgrade or audit-threshold reduction was applied.
- Exact check-run names observed on this head: CodeQL, analyze, backend, frontend, ios, and dependency-review. These are evidence for the GitHub ruleset picker only; they are not enforced by a current main ruleset.
- All three historical inline PR #41 review threads are resolved. Current source inspection confirms pending App Attest enrollment/recovery, updated Apple verifier test expectations, effective Fetch Request/init header replacement semantics and method selection, explicit-auth POST retry tests, the valid base64 vision-usage fixture, sanitized error-boundary logging, and Settings recovery for permanently denied camera/gallery permissions.
- [Issue #26](https://github.com/milanradics89-beep/POS-Doctor/issues/26) remains closed as completed after the Redis-backed challenge-store integration tests passed against Redis 7.4.
- [Issue #47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) remains open. The current branch listing reports main.protected=false, the rulesets endpoint returns an empty list, and the integration's branch-protection read remains HTTP 403. A repository administrator must create and verify the main ruleset using the observed check names.
- The GitHub releases endpoint returned an empty list. The connected integration does not expose the full code-scanning/Dependabot alert inventories; no zero-alert claim is made.

The CI above validates the complete PR head 8de5effdee8885170e4d80381fe043fb1838e575. This is automated CI evidence, not a production sign-off. Physical-device App Attest/Play Integrity, production provider secrets and configuration, production hosting, backup/restore, monitoring delivery, store rollout, pilot thresholds, business approval, and the main branch ruleset remain unverified. PR #41 remains open and unmerged.

## 25-point status

| # | Work item | Status | Evidence / remaining acceptance |
|---:|---|---|---|
| 1 | iOS CI completion | **Done** | Exact PR #41 head 8de5effdee8885170e4d80381fe043fb1838e575 passed native iOS project generation, CocoaPods installation, Release simulator build, and simulator install/launch in [validation run 41253959559, iOS job 124693068327](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41253959559/job/124693068327). This is repository iOS CI only; physical-device App Attest remains Blocked under item 4. |
| 2 | Protect `main` | **Blocked** | The rulesets endpoint returns an empty list and branch-protection read returns HTTP 403 to the connected integration. Current PR #41 workflows have successful validation, CodeQL, and Dependency Review runs, but no required-check policy is enforced. A repository administrator must create and verify a `main` ruleset with pull-request review, the exact required check contexts, force-push/deletion restrictions, and no routine admin bypass. See [issue #47](https://github.com/milanradics89-beep/POS-Doctor/issues/47). |
| 3 | Dependency Review warnings | **In Progress** | [Dependency Review run 41253959551](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41253959551) passed with 0 high-or-higher vulnerable packages, 0 incompatible licenses, 0 invalid SPDX definitions, 1 unknown-license metadata warning for vendor/deepmerge@4.3.2, and 2 low Scorecard warnings (@expo/devcert 2.9; is-mergeable-object 1.5). The separate npm audit still reports 11 moderate transitive glob/minimatch advisories; retain the warnings and obtain an owner risk decision or a compatible upstream remediation. |
| 4 | Physical iPhone App Attest | **Blocked** | Requires a physical iPhone, production App Attest entitlement/AAGUID, Apple Developer capability, and a production-like backend. Record device/build evidence without storing attestation payloads. |
| 5 | Physical Play Integrity | **Blocked** | Requires a physical Android device, Play-installed build, Play App Signing certificate, valid Cloud project number, service-account permission, and Play Console configuration. |
| 6 | Redis multi-instance challenge/replay tests | **Done** | The exact PR #41 backend job [124693068128](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41253959559/job/124693068128) passed 350 tests with the Redis 7.4 service and USEIT_TEST_REDIS_URL (1 Starlette deprecation warning). backend/test_attestation_store_integration.py verifies hashed challenge keys, server-side TTL expiry, atomic single-use consumption across independent Redis clients, replay rejection, and consumption across separate backend worker processes. Production Redis topology/persistence remains a separate environment gate. |
| 7 | Attestation retry/network/expiry | **In Progress** | Session recovery, challenge expiry, 10-second timeout/abort, same-evidence retry, and replacement-enrollment recovery are covered by automated regressions; the exact-head frontend job [124693068427](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41253959559/job/124693068427) passed. Real network interruption and provider-backed retry behavior still require physical iPhone and Play-installed Android verification. |
| 8 | Backend production security audit | **In Progress** | Fail-closed configuration, CORS, docs exposure, session secret, Redis, request controls, and readiness checks have automated coverage. The exact-head backend job [124693068128](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41253959559/job/124693068128) passed compilation, 350 tests, production-readiness checks, and backend dependency audit. Actual production secrets/configuration and deployment review remain unverified. |
| 9 | Privacy and logging audit | **In Progress** | Prompt/user-intent and personal-memory capability-path redaction, plus image/intent sentinel tests, remain in the application source tree ending at 274fefb6390b2324dfb37b8201279675bf26b481; the exact-head backend/frontend jobs passed in [validation run 41253959559](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41253959559). Production log sinks, ingress/access logs, retention, and alert delivery still require review. |
| 10 | Release acceptance evidence | **In Progress** | [Release pilot acceptance record](RELEASE_PILOT_ACCEPTANCE.md) and [release runbook](RELEASE_RUNBOOK.md) now record current PR head 8de5effdee8885170e4d80381fe043fb1838e575 with [validation 41253959559](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41253959559), [CodeQL 41253959541](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41253959541), and [Dependency Review 41253959551](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41253959551). Production identity/artifacts, staging evidence, owners, thresholds, pilot results, moderate npm-audit risk decision, and sign-offs remain blank/unverified. |
| 11 | Mobile regression | **In Progress** | Android Release build/emulator install-launch passed in [frontend job 124693068427](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41253959559/job/124693068427); iOS Release simulator build/install-launch passed in [iOS job 124693068327](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41253959559/job/124693068327), both for exact PR head 9bbfde2cb2d4a9aef1e10119e01019a954cadf5a. Full physical camera-to-analysis/product-discovery user-flow coverage is not yet evidenced. |
| 12 | Camera/image pipeline | **In Progress** | Image validation and bounded request upload are automated. Camera permission, capture quality, memory, and image lifecycle require device-level validation. |
| 13 | Offline/weak network | **In Progress** | Session recovery work exists; a complete offline/weak-network acceptance matrix and real-device evidence are still needed. |
| 14 | API timeout/retry | **In Progress** | Safe-method retry policy, bounded session bootstrap, 10-second attestation deadlines, abort/same-evidence recovery, explicit-auth POST retry tests, and effective Request/init header-method regressions are present; the exact-head frontend job [124693068427](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41253959559/job/124693068427) passed. State-changing POST retries remain disabled without backend idempotency enforcement. Real-device network interruption and staging latency characterization remain required. |
| 15 | Backend load testing | **In Progress** | Added `scripts/load-test.mjs`: bounded staging probe (1–1,000 requests, concurrency capped at 20), timeout, status distribution, throughput and p50/p95/max latency. No staging run, capacity threshold or signed-off report exists yet. |
| 16 | Backup/restore | **Blocked** | Requires production datastore/Redis backup access, retention policy, restore target, and a witnessed restore rehearsal. |
| 17 | AI cost optimization | **In Progress** | Added privacy-safe vision token usage telemetry (`model`, prompt/completion/total token counts) with sentinel tests proving prompts and images are not logged. A measured baseline, model pricing, budget thresholds and optimization results still need staging traffic and an owner decision. |
| 18 | Product recognition accuracy | **Blocked** | Requires a representative, approved, labelled image/product benchmark and agreed precision/recall or task-success thresholds. |
| 19 | AI fallback | **In Progress** | Optional product-discovery degradation is implemented and regression-tested. Vision-provider outage/retry and user-facing fallback acceptance remain incomplete. |
| 20 | UI loading/empty/error/permission states | **In Progress** | The release checklist includes camera permission and failure states; a complete automated UI state matrix is not yet evidenced. |
| 21 | Monitoring/alerting | **In Progress** | Safe request latency/status telemetry and vision token usage events exist. Production alert destination, thresholds, on-call ownership, dashboards and alert-delivery test remain unverified. |
| 22 | Staged rollout | **Blocked** | Requires TestFlight/Play internal track and production hosting/store access, rollout cohort, thresholds, and named release approval. |
| 23 | User analytics | **Blocked** | Requires a product/privacy decision on event taxonomy, consent, retention, and analytics provider before implementation can be accepted. |
| 24 | Automated release pipeline | **In Progress** | CI validates builds and tests; signed store artifact publication, environment promotion, and rollback automation are not yet evidenced. |
| 25 | Pilot/business validation | **Blocked** | Requires an approved pilot cohort, product/business acceptance thresholds, named approvers, and real usage/cost/support evidence. |

## Latest engineering update (2026-11-01)

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
