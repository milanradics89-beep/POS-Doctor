# USEIT 25-point release backlog

Last reviewed: 2026-10-31 (CET)  
Working branch: `fix/release-blockers-2026-10`  
PR: [#41](https://github.com/milanradics89-beep/POS-Doctor/pull/41)  
Last fully validated commit: `f8148b30d5646ea3d196c791b26b2989d6bf0f6a`

Status meanings:
- **Done**: repository/CI evidence exists for the stated acceptance criterion.
- **In Progress**: implementation or automated evidence exists, but the full acceptance criterion is not yet met.
- **Blocked**: the next required action depends on external access, physical hardware, a production environment, a curated dataset, or an owner decision.

## Current evidence

Last fully validated PR #41 parent baseline: f8148b30d5646ea3d196c791b26b2989d6bf0f6a. All required workflows completed successfully for that exact SHA:

- [Validation run 41210918327](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41210918327): frontend, backend, and iOS jobs all passed. Frontend passed source-boundary guard, TypeScript, unit tests, Expo Doctor, Android export, native Android Release build/emulator install-launch, and runtime dependency audit. Backend passed compilation, the full Redis 7.4-backed test suite, production-readiness checks, and backend dependency audit. iOS passed native project generation, CocoaPods, Release simulator build, and simulator install-launch.
- [CodeQL run 41210918374](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41210918374): completed successfully. The connected API does not expose the repository alert inventory; no zero-alert claim is made.
- [Dependency Review run 41210918324](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41210918324): completed successfully with 0 vulnerable packages, 0 incompatible licenses, 0 invalid SPDX definitions, 1 unknown-license metadata warning, and 2 low Scorecard warnings. Known items remain the local vendor/deepmerge license metadata link, @expo/devcert@1.2.2, and is-mergeable-object@1.1.1.
- The separate npm audit high-severity gate passed, but the dependency graph still records 11 moderate transitive glob@13.0.6 / minimatch@10.2.6 advisories. No forced Expo downgrade or threshold reduction was applied.
- Privacy commit [9da15a9](https://github.com/milanradics89-beep/POS-Doctor/commit/9da15a95b2515339c050d1ab3b22cda10d0db8f7) redacts personal-memory capability IDs from request paths; success and 500-path sentinel tests passed in the f814 baseline.
- All three historical inline PR #41 review threads are resolved. Current source inspection confirms effective Request/init auth semantics, explicit API-key POST retry tests, a valid base64 privacy fixture, sanitized error-boundary logging, and Settings recovery for permanently denied permissions. The latest Codex review receipt is older than the f814 documentation head.
- [Issue #47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) remains open. The rulesets endpoint returns an empty list and branch-protection read is forbidden to the integration (HTTP 403); a repository administrator must configure and verify protection for main.

This revision adds a Redis rolling 60-second rate limiter using Redis server time and one atomic Lua operation, with boundary and concurrent-client regression tests. Its exact-head CI is pending and must not be inferred from the f814 baseline. Physical-device attestation, production provider/secrets, backup/restore, production alert delivery, store rollout, and pilot approval remain unverified.

## 25-point status

| # | Work item | Status | Evidence / remaining acceptance |
|---:|---|---|---|
| 1 | iOS CI completion | **Done** | Source SHA `9da15a95b2515339c050d1ab3b22cda10d0db8f7` passed native iOS project generation, CocoaPods installation, Release simulator build, and simulator install/launch in [validation run 41210918327](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41210918327). This is repository iOS CI only; physical-device App Attest remains Blocked under item 4. |
| 2 | Protect `main` | **Blocked** | The rulesets endpoint returns an empty list and branch-protection read returns HTTP 403 to the connected integration. Current PR #41 workflows have successful validation, CodeQL, and Dependency Review runs, but no required-check policy is enforced. A repository administrator must create and verify a `main` ruleset with pull-request review, the exact required check contexts, force-push/deletion restrictions, and no routine admin bypass. See [issue #47](https://github.com/milanradics89-beep/POS-Doctor/issues/47). |
| 3 | Dependency Review warnings | **In Progress** | [Dependency Review run 41210918324](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41210918324) passed with 0 vulnerable packages, 0 incompatible licenses, 0 invalid SPDX definitions, 1 unknown-license metadata warning, and 2 Scorecard warnings. The separate npm audit high threshold passed, but 11 moderate transitive `glob@13.0.6` / `minimatch@10.2.6` advisories remain. Do not suppress warnings or force an Expo downgrade; verify compatible remediation or record explicit owner risk acceptance. |
| 4 | Physical iPhone App Attest | **Blocked** | Requires a physical iPhone, production App Attest entitlement/AAGUID, Apple Developer capability, and a production-like backend. Record device/build evidence without storing attestation payloads. |
| 5 | Physical Play Integrity | **Blocked** | Requires a physical Android device, Play-installed build, Play App Signing certificate, valid Cloud project number, service-account permission, and Play Console configuration. |
| 6 | Redis multi-instance challenge/replay tests | **Done** | Redis 7.4-backed backend tests passed in [validation run 41210918327](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41210918327). The repository's dedicated multi-client/worker replay and atomic rate-limit concurrency regressions are covered by the backend suite; production shared-Redis configuration and operational verification remain separate release gates. |
| 7 | Attestation retry/network/expiry | **In Progress** | Session recovery, challenge-expiry, timeout/abort, and same-evidence retry regressions pass in exact-head [frontend job 124508582653](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41210918327). Real network interruption and provider-backed retry behavior still require physical iPhone and Play-installed Android verification. |
| 8 | Backend production security audit | **In Progress** | Fail-closed configuration, CORS, docs exposure, session secret, Redis, and readiness checks have automated coverage. This revision replaces Redis calendar-minute fixed buckets with an atomic Redis-TIME sliding window and matching Retry-After values; boundary and concurrent-client tests await exact-head CI. Actual production secret/configuration and deployment review remain unverified. |
| 9 | Privacy and logging audit | **In Progress** | Commit [`9da15a9`](https://github.com/milanradics89-beep/POS-Doctor/commit/9da15a95b2515339c050d1ab3b22cda10d0db8f7) redacts personal-memory bearer-capability IDs from `/v1/memory/{id}` request paths; regression tests cover successful and 500 responses. Prompt/user-intent and image redaction tests remain present, and exact-head frontend/backend jobs passed in [validation run 41210918327](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41210918327). Production log sinks, access/ingress logs, retention, and alert delivery still require review. |
| 10 | Release acceptance evidence | **In Progress** | [Release pilot acceptance record](RELEASE_PILOT_ACCEPTANCE.md) and [release runbook](RELEASE_RUNBOOK.md) now record source SHA `9da15a95b2515339c050d1ab3b22cda10d0db8f7` and exact-head validation, CodeQL, and Dependency Review evidence. Production identity/artifacts, staging evidence, owners, thresholds, pilot results, moderate npm-audit risk decision, and sign-offs remain blank/unverified. The documentation-only follow-up commit also needs CI before merge. |
| 11 | Mobile regression | **In Progress** | Android Release build/emulator install-launch and iOS Release simulator build/install-launch passed for source SHA `9da15a95b2515339c050d1ab3b22cda10d0db8f7` in [validation run 41210918327](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41210918327). Full camera-to-analysis/product-discovery user-flow regression and physical-device coverage are not yet evidenced. |
| 12 | Camera/image pipeline | **In Progress** | Image validation and bounded request upload are automated. Camera permission, capture quality, memory, and image lifecycle require device-level validation. |
| 13 | Offline/weak network | **In Progress** | Session recovery work exists; a complete offline/weak-network acceptance matrix and real-device evidence are still needed. |
| 14 | API timeout/retry | **In Progress** | Safe-method retry policy, bounded session bootstrap, 10-second attestation deadlines, abort/same-evidence recovery, explicit POST auth, and effective `Request` / `init` header-method regressions are present; the exact-head frontend job passed in [validation run 41210918327](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41210918327). State-changing POST retries remain disabled without backend idempotency enforcement. Real-device network interruption and staging latency characterization remain required. |
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

## Latest engineering update (2026-10-31)

- Current hardening revision: Redis rate limiting now uses a server-clock sliding 60-second window, atomically pruning/counting/admitting requests and expiring sorted-set/sequence keys. Boundary and 32-request concurrent-client regressions were added. CI for this revision is pending; f814 is the last validated SHA.

- Privacy hardening commit [`9da15a9`](https://github.com/milanradics89-beep/POS-Doctor/commit/9da15a95b2515339c050d1ab3b22cda10d0db8f7) masks memory capability IDs in request paths and adds success/error-path sentinel tests. Exact-head frontend and backend CI passed in [validation run 41210918327](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41210918327).
- No production log-sink or ingress/access-log configuration was available for verification; item 9 remains In Progress.

## Dependency and supply-chain investigation

The current [Dependency Review run 41210918324](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41210918324) log reports no vulnerable packages at severity high or higher and no denied packages. It reports one unknown-license metadata entry and two highlighted low OpenSSF Scorecard results.

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
