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

Current PR #41 source head, fully validated by all required workflows: `c95530f88254697704d45ba385cf0bb3d0ea5170`.

- [Validation run 41220026884](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41220026884): frontend, backend, and iOS jobs all completed successfully. Frontend passed the source-boundary guard, TypeScript, unit tests, Expo Doctor, Android export, native Android Release build/emulator install-launch, and runtime dependency audit. Backend passed compilation, the full Redis 7.4-backed test suite, production-readiness checks, and backend dependency audit. The backend suite includes the Redis server-time sliding 60-second rate-limit boundary regression and the 32-request/two-independent-client atomicity test introduced in this revision. iOS passed native project generation, CocoaPods installation, Release simulator build, and simulator install/launch.
- [CodeQL run 41220027004](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41220027004): completed successfully for the same source SHA. The connected integration cannot read the repository code-scanning alert inventory; this is not a zero-alert assertion.
- [Dependency Review run 41220026908](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41220026908): completed successfully. Its PR summary reports 0 vulnerable packages, 0 incompatible licenses, 0 invalid SPDX definitions, 1 unknown-license metadata warning, and 2 low OpenSSF Scorecard warnings. The current log identifies `@expo/devcert@1.2.2` (2.9) and `is-mergeable-object@1.1.1` (1.5); the local `vendor/deepmerge@4.3.2` link is the known unknown-license metadata item.
- The separate frontend `npm audit --omit=dev --audit-level=high` gate passed. The previously inspected lockfile still has 11 moderate transitive `glob@13.0.6` / `minimatch@10.2.6` advisories; a high-threshold pass is not a clean dependency tree. No forced Expo downgrade or threshold reduction was applied.
- All three inline PR #41 review threads are resolved. Current source inspection confirms the Request/init effective-header and Request-method handling, explicit-auth POST retry tests, valid base64 vision-usage fixture, sanitized error-boundary logging, and Settings recovery for permanently denied camera/gallery permissions.
- [Issue #47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) remains open. The repository rulesets endpoint is empty and the integration cannot read branch protection (HTTP 403); a repository administrator must configure and verify the `main` ruleset.
- The GitHub releases endpoint returned an empty list. The connected integration cannot read code-scanning/Dependabot alert inventories, so no zero-alert claim is made.

The CI above validates the application source at `c95530f88254697704d45ba385cf0bb3d0ea5170`; it is not a production sign-off. The documentation follow-up itself must also complete its own required CI before PR #41 can be considered merge-ready. Physical-device attestation, production provider/secrets, production hosting, backup/restore, monitoring delivery, store rollout, and pilot approval remain unverified.

## 25-point status

| # | Work item | Status | Evidence / remaining acceptance |
|---:|---|---|---|
| 1 | iOS CI completion | **Done** | Exact application source SHA `c95530f88254697704d45ba385cf0bb3d0ea5170` passed native iOS project generation, CocoaPods installation, Release simulator build, and simulator install/launch in [validation run 41220026884](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41220026884). This is repository iOS CI only; physical-device App Attest remains Blocked under item 4. |
| 2 | Protect `main` | **Blocked** | The rulesets endpoint returns an empty list and branch-protection read returns HTTP 403 to the connected integration. Current PR #41 workflows have successful validation, CodeQL, and Dependency Review runs, but no required-check policy is enforced. A repository administrator must create and verify a `main` ruleset with pull-request review, the exact required check contexts, force-push/deletion restrictions, and no routine admin bypass. See [issue #47](https://github.com/milanradics89-beep/POS-Doctor/issues/47). |
| 3 | Dependency Review warnings | **In Progress** | [Dependency Review run 41220026908](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41220026908) passed with 0 vulnerable packages, 0 incompatible licenses, 0 invalid SPDX definitions, 1 unknown-license metadata warning, and 2 low Scorecard warnings (`@expo/devcert@1.2.2` 2.9; `is-mergeable-object@1.1.1` 1.5). The local `vendor/deepmerge@4.3.2` link is the known license-metadata item. The separate npm audit high threshold passed, but 11 moderate transitive `glob` / `minimatch` advisories remain. |
| 4 | Physical iPhone App Attest | **Blocked** | Requires a physical iPhone, production App Attest entitlement/AAGUID, Apple Developer capability, and a production-like backend. Record device/build evidence without storing attestation payloads. |
| 5 | Physical Play Integrity | **Blocked** | Requires a physical Android device, Play-installed build, Play App Signing certificate, valid Cloud project number, service-account permission, and Play Console configuration. |
| 6 | Redis multi-instance challenge/replay tests | **Done** | Redis 7.4-backed backend tests passed on exact source SHA `c95530f88254697704d45ba385cf0bb3d0ea5170` in [validation run 41220026884](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41220026884). The run includes atomic multi-client rate-limit coverage (32 requests across independent clients, limit 7) and rolling-window boundary/TTL assertions; production shared-Redis configuration remains a separate release gate. |
| 7 | Attestation retry/network/expiry | **In Progress** | Session recovery, challenge-expiry, timeout/abort, and same-evidence retry regressions pass in exact-head [frontend job 124508582653](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41210918327). Real network interruption and provider-backed retry behavior still require physical iPhone and Play-installed Android verification. |
| 8 | Backend production security audit | **In Progress** | Fail-closed configuration, CORS, docs exposure, session secret, Redis, and readiness checks have automated coverage. Exact source SHA `c95530f88254697704d45ba385cf0bb3d0ea5170` passed the backend suite with Redis server-time sliding-window rate limiting, atomic prune/count/admission, bounded connection/socket timeouts, and matching Retry-After tests in [validation run 41220026884](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41220026884). Actual production secret/configuration and deployment review remain unverified. |
| 9 | Privacy and logging audit | **In Progress** | Commit [`9da15a9`](https://github.com/milanradics89-beep/POS-Doctor/commit/9da15a95b2515339c050d1ab3b22cda10d0db8f7) redacts personal-memory bearer-capability IDs from request paths; success and 500-path sentinel tests remain in the exact source tree `c95530f88254697704d45ba385cf0bb3d0ea5170`, whose backend/frontend jobs passed in [validation run 41220026884](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41220026884). Production log sinks, access/ingress logs, retention, and alert delivery still require review. |
| 10 | Release acceptance evidence | **In Progress** | [Release pilot acceptance record](RELEASE_PILOT_ACCEPTANCE.md) and [release runbook](RELEASE_RUNBOOK.md) record fully validated application source SHA `c95530f88254697704d45ba385cf0bb3d0ea5170` with [validation](41220026884), [CodeQL](41220027004), and [Dependency Review](41220026908) evidence. This documentation follow-up must pass its own CI. Production identity/artifacts, staging evidence, owners, thresholds, pilot results, moderate npm-audit risk decision, and sign-offs remain blank/unverified. |
| 11 | Mobile regression | **In Progress** | Android Release build/emulator install-launch and iOS Release simulator build/install-launch passed for application source SHA `c95530f88254697704d45ba385cf0bb3d0ea5170` in [validation run 41220026884](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41220026884). Full camera-to-analysis/product-discovery user-flow regression and physical-device coverage are not yet evidenced. |
| 12 | Camera/image pipeline | **In Progress** | Image validation and bounded request upload are automated. Camera permission, capture quality, memory, and image lifecycle require device-level validation. |
| 13 | Offline/weak network | **In Progress** | Session recovery work exists; a complete offline/weak-network acceptance matrix and real-device evidence are still needed. |
| 14 | API timeout/retry | **In Progress** | Safe-method retry policy, bounded session bootstrap, 10-second attestation deadlines, abort/same-evidence recovery, explicit-auth POST retry tests, and effective `Request` / `init` header-method regressions are present; the exact-source frontend job passed in [validation run 41220026884](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41220026884). State-changing POST retries remain disabled without backend idempotency enforcement. Real-device network interruption and staging latency characterization remain required. |
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
