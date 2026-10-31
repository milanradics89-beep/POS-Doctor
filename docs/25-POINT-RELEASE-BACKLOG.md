# USEIT 25-point release backlog

Last reviewed: 2026-10-31 (CET)  
Working branch: `fix/release-blockers-2026-10`  
PR: [#41](https://github.com/milanradics89-beep/POS-Doctor/pull/41)  
Last fully validated commit: `b48e295006dbf09a9bbfaae855ee31832f8ff19e`

Status meanings:
- **Done**: repository/CI evidence exists for the stated acceptance criterion.
- **In Progress**: implementation or automated evidence exists, but the full acceptance criterion is not yet met.
- **Blocked**: the next required action depends on external access, physical hardware, a production environment, a curated dataset, or an owner decision.

## Current evidence

The exact current PR #41 head `b48e295006dbf09a9bbfaae855ee31832f8ff19e` has completed all three required CI workflows successfully:

- [Validation run 41155582219](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41155582219): all three jobs passed. Frontend typecheck/unit tests, Expo Doctor, Android export, Android Release build/emulator launch, and runtime dependency audit passed; iOS native Release simulator build and install/launch passed; backend compilation, Redis 7.4-backed tests, production-readiness checks, and dependency audit passed.
- [CodeQL run 41155582210](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41155582210): analysis succeeded.
- [Dependency Review run 41155582212](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41155582212): succeeded with 0 vulnerable packages, 0 incompatible licenses, 0 invalid SPDX definitions, 1 unknown-license package, and 2 OpenSSF Scorecard warnings. These warnings remain open for owner risk acceptance or verified remediation; they are not vulnerabilities and have not been suppressed.

The validation run's [frontend job](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41155582219/job/124401547761), [iOS job](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41155582219/job/124401547802), and [backend job](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41155582219/job/124401547513) each completed successfully. This is automated repository evidence only. Simulator/emulator tests do not validate hardware-backed attestation, and CI does not establish production provider credentials, cloud configuration, backup/restore, alert delivery, staged rollout, or pilot approval.

The current implementation also bounds attestation session bootstrap, challenge retrieval, and evidence submission with 10-second AbortController-backed deadlines. The targeted timeout/retry regression is included in the passing frontend unit-test step. The retry reuses the same persisted evidence; it does not regenerate an App Attest key or automatically replay arbitrary POST operations.

The validation workflow includes Android Release APK build/emulator launch, iOS simulator build/launch, backend pytest with a Redis 7.4 service, production-readiness checks, and Python dependency audit. Simulator/emulator evidence does not satisfy hardware-backed attestation.

## 25-point status

| # | Work item | Status | Evidence / remaining acceptance |
|---:|---|---|---|
| 1 | iOS CI completion | **Done** | Exact PR #41 head `b48e295` passed native iOS project generation, CocoaPods installation, Release simulator build, and install/launch smoke test in [validation run 41155582219](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41155582219) ([iOS job](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41155582219/job/124401547802)). This item covers repository iOS CI; physical-device App Attest remains separately Blocked under item 4. |
| 2 | Protect `main` | **Blocked** | Repository rulesets endpoint returned an empty list; branch-protection read returned HTTP 403 to the integration. A repository administrator must create and verify a `main` ruleset with PR, exact required checks, force-push/deletion restrictions, and no routine admin bypass. See [issue #47](https://github.com/milanradics89-beep/POS-Doctor/issues/47). |
| 3 | Dependency Review warnings | **In Progress** | Latest [Dependency Review run 41123962323](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41123962323) passed with 0 vulnerable packages, 0 incompatible licenses, 0 invalid SPDX definitions, 1 unknown-license package and 2 Scorecard warnings. The unknown-license package is the installed local file dependency `deepmerge@4.3.2`: its package manifest and LICENSE declare MIT, but the lockfile link record omits license metadata. `@expo/devcert` (2.9) and `is-mergeable-object` (1.5) remain below the repository Scorecard threshold. Record owner acceptance or a maintainable remediation; do not suppress the warnings. |
| 4 | Physical iPhone App Attest | **Blocked** | Requires a physical iPhone, production App Attest entitlement/AAGUID, Apple Developer capability, and a production-like backend. Record device/build evidence without storing attestation payloads. |
| 5 | Physical Play Integrity | **Blocked** | Requires a physical Android device, Play-installed build, Play App Signing certificate, valid Cloud project number, service-account permission, and Play Console configuration. |
| 6 | Redis multi-instance challenge/replay tests | **Done** | Redis 7.4-backed validation passed in [run 41127335652](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41127335652). The suite exercises independent clients and separate worker-process single-use/replay behavior; the same run also passed the atomic Redis rate-limit Lua/TTL concurrency regression. Production shared-Redis configuration and operational verification remain part of production readiness, not this CI test item. |
| 7 | Attestation retry/network/expiry | **In Progress** | Session recovery, challenge-expiry, timeout/abort, and same-evidence retry regressions pass in the exact-head [frontend CI job](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41155582219/job/124401547761). Real network interruption and provider-backed retry behavior still require physical iPhone and Play-installed Android verification. |
| 8 | Backend production security audit | **In Progress** | Fail-closed configuration, CORS, docs exposure, session secret, Redis, and readiness checks have automated coverage. Actual production secret/configuration and deployment review remain unverified. |
| 9 | Privacy and logging audit | **In Progress** | Structured request telemetry, vision-usage sentinel tests, and sanitized error-boundary logging are present; the exact-head [frontend CI job](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41155582219/job/124401547761) and [backend CI job](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41155582219/job/124401547513) passed. A complete production log sink/configuration review and alert/retention verification remain outstanding. |
| 10 | Release acceptance evidence | **In Progress** | [Release pilot acceptance record](RELEASE_PILOT_ACCEPTANCE.md) and [release runbook](RELEASE_RUNBOOK.md) now record exact-head `b48e295` validation, CodeQL, and Dependency Review evidence. Production identity/artifacts, staging evidence, owners, thresholds, pilot results, and sign-offs remain blank/unverified. |
| 11 | Mobile regression | **In Progress** | Android Release build/emulator install-launch and iOS Release simulator build/install-launch passed for `b48e295` in [validation run 41155582219](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41155582219). Full camera-to-analysis/product-discovery user-flow regression and physical-device coverage are not yet evidenced. |
| 12 | Camera/image pipeline | **In Progress** | Image validation and bounded request upload are automated. Camera permission, capture quality, memory, and image lifecycle require device-level validation. |
| 13 | Offline/weak network | **In Progress** | Session recovery work exists; a complete offline/weak-network acceptance matrix and real-device evidence are still needed. |
| 14 | API timeout/retry | **In Progress** | Generic safe-method fetch deadlines and backend request/body deadlines exist; POST analysis/action calls are not automatically replayed without backend idempotency enforcement. The 10-second AbortController-backed deadlines for session bootstrap, challenge, and attestation submission plus abort/same-evidence retry tests pass on exact head `b48e295` in [validation run 41155582219](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41155582219). Real-device network interruption and staging latency characterization remain required. |
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

## Dependency review investigation

The latest run reports no vulnerable packages, no incompatible licenses and no invalid SPDX definitions. It reports one unknown-license package and two low OpenSSF Scorecard results.

- `deepmerge@4.3.2` is a direct local file dependency (`file:vendor/deepmerge`). Its `vendor/deepmerge/package.json` declares MIT and `vendor/deepmerge/LICENSE` contains the MIT license text. The npm lockfile records `node_modules/deepmerge` as a local link without a license field, which explains the Dependency Review unknown-license warning. Do not describe it as an uninstalled/extraneous dependency.
- `@expo/devcert@1.2.2` declares MIT; OpenSSF Scorecard reports 2.9.
- `is-mergeable-object@1.1.1` declares MIT; OpenSSF Scorecard reports 1.5.

These are supply-chain metadata/posture warnings, not vulnerability findings. Keep them visible and record the project owner's risk decision or a verified upstream/remediation path.

## Engineering work started on 2026-10-30

- API retry safety: prevent duplicate billable/state-changing POST work by disabling automatic POST retries until the backend implements and tests idempotency-key enforcement; bound session bootstrap time; add regression tests.
- Attestation HTTP deadlines: each session bootstrap, challenge and evidence-submission fetch has a 10-second AbortController-backed deadline; abort and exact same-evidence retry regressions passed on `b48e295` in [validation run 41155582219](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41155582219).
- Load testing: add a bounded, opt-in Node.js harness for staging with explicit POST opt-in and machine-readable latency/status metrics.
- AI cost observability: emit only validated token counts and model identifier from vision responses; add regression coverage that verifies image and user-intent sentinels never reach logs.
- Privacy: exception-message suppression and sentinel regression tests are present; exact-head frontend/backend CI passed in [validation run 41155582219](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41155582219). Production log-sink and retention review remain open.

## Remaining engineering actions

- Real-device network interruption and provider-backed attestation recovery still need physical-device verification; the automated 10-second deadline and same-evidence retry tests pass on the exact current head.
- Validate client cancellation and retry behavior under real network loss.
- Execute the load harness against an approved staging target and agree capacity thresholds before interpreting results.
- Continue the UI-state matrix, AI cost measurement, monitoring/alert wiring, and release artifact workflow where repository-only work is possible.

## Release decision

The PR remains open and must not be merged until all required checks pass for the exact final SHA and all externally verifiable release gates have recorded evidence. A blank or unverified acceptance item is not a pass.
