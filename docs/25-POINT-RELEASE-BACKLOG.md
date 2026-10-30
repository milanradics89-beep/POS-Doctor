# USEIT 25-point release backlog

Last reviewed: 2026-10-30  
Working branch: `fix/release-blockers-2026-10`  
PR: [#41](https://github.com/milanradics89-beep/POS-Doctor/pull/41)  
Baseline commit reviewed: `0ae7517428c81395affe1f4ac18440ab4006e30f`

Status meanings:
- **Done**: repository/CI evidence exists for the stated acceptance criterion.
- **In Progress**: implementation or automated evidence exists, but the full acceptance criterion is not yet met.
- **Blocked**: the next required action depends on external access, physical hardware, a production environment, a curated dataset, or an owner decision.

## Current evidence

For baseline commit `0ae7517`, all three PR workflows completed successfully:
- [Validation run 41123962370](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41123962370): frontend and backend passed; iOS Release simulator build and launch passed; Android Release build and emulator launch passed; runtime dependency audit passed. Backend tests ran with the Redis 7.4 service.
- [CodeQL run 41123962331](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41123962331): analysis succeeded and uploaded SARIF for 71 Python files and 4 GitHub Actions files. A successful scan does not prove the repository has zero open code-scanning alerts.
- [Dependency Review run 41123962323](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41123962323): succeeded with 0 vulnerable packages, 0 incompatible licenses, 0 invalid SPDX definitions, 1 unknown-license package and 2 low OpenSSF Scorecard warnings. The unknown-license entry is the local `deepmerge@4.3.2` file dependency: `vendor/deepmerge/package.json` declares MIT and `vendor/deepmerge/LICENSE` is present, but the `package-lock.json` link entry has no license field. Scorecard warnings remain for `@expo/devcert` (2.9) and `is-mergeable-object` (1.5).

The current commit adds atomic Redis rate limiting, explicit Redis client timeouts and real-Redis concurrency coverage. Its CI must pass before the new code is considered validated.

The validation workflow includes Android release APK build/emulator launch, iOS simulator build/launch, backend pytest with a Redis 7.4 service, production-readiness checks, and Python dependency audit. Simulator/emulator evidence does not satisfy hardware-backed attestation.

## 25-point status

| # | Work item | Status | Evidence / remaining acceptance |
|---:|---|---|---|
| 1 | iOS CI completion | **In Progress** | The preceding baseline `0ae7517` passed iOS Release simulator build and launch in [validation run 41123962370](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41123962370). The new Redis hardening commit requires its own complete validation run before this item is Done for the latest head. Simulator evidence does not validate hardware-backed App Attest. |
| 2 | Protect `main` | **Blocked** | Repository rulesets endpoint returned an empty list; branch-protection read returned HTTP 403 to the integration. A repository administrator must create and verify a `main` ruleset with PR, exact required checks, force-push/deletion restrictions, and no routine admin bypass. See [issue #47](https://github.com/milanradics89-beep/POS-Doctor/issues/47). |
| 3 | Dependency Review warnings | **In Progress** | Latest [Dependency Review run 41123962323](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41123962323) passed with 0 vulnerable packages, 0 incompatible licenses, 0 invalid SPDX definitions, 1 unknown-license package and 2 Scorecard warnings. The unknown-license package is the installed local file dependency `deepmerge@4.3.2`: its package manifest and LICENSE declare MIT, but the lockfile link record omits license metadata. `@expo/devcert` (2.9) and `is-mergeable-object` (1.5) remain below the repository Scorecard threshold. Record owner acceptance or a maintainable remediation; do not suppress the warnings. |
| 4 | Physical iPhone App Attest | **Blocked** | Requires a physical iPhone, production App Attest entitlement/AAGUID, Apple Developer capability, and a production-like backend. Record device/build evidence without storing attestation payloads. |
| 5 | Physical Play Integrity | **Blocked** | Requires a physical Android device, Play-installed build, Play App Signing certificate, valid Cloud project number, service-account permission, and Play Console configuration. |
| 6 | Redis multi-instance challenge/replay tests | **In Progress** | Redis 7.4 CI includes independent-client and separate-worker-process single-use/replay tests. This audit also found a separate rate-limit race (`INCR` and `EXPIRE` were separate commands); an atomic Lua increment/TTL operation and bounded Redis timeouts are added in the current commit and await its CI evidence. |
| 7 | Attestation retry/network/expiry | **In Progress** | Client session recovery and challenge-expiry regressions have been added; complete end-to-end interruption/retry verification on both real platforms remains outstanding. |
| 8 | Backend production security audit | **In Progress** | Fail-closed configuration, CORS, docs exposure, session secret, Redis, and readiness checks have automated coverage. Actual production secret/configuration and deployment review remain unverified. |
| 9 | Privacy and logging audit | **In Progress** | Structured request telemetry and privacy tests exist. This commit hardens exception logging so exception messages/tracebacks cannot leak provider or user data; CI evidence for this change is pending. |
| 10 | Release acceptance evidence | **In Progress** | [Release pilot acceptance record](RELEASE_PILOT_ACCEPTANCE.md) and [release runbook](RELEASE_RUNBOOK.md) define gates; production identity, artifacts, owners, test evidence, thresholds, and sign-offs remain blank/unverified. |
| 11 | Mobile regression | **In Progress** | Android emulator and iOS simulator smoke tests pass in CI. Full user-flow regression and physical-device coverage are not yet evidenced. |
| 12 | Camera/image pipeline | **In Progress** | Image validation and bounded request upload are automated. Camera permission, capture quality, memory, and image lifecycle require device-level validation. |
| 13 | Offline/weak network | **In Progress** | Session recovery work exists; a complete offline/weak-network acceptance matrix and real-device evidence are still needed. |
| 14 | API timeout/retry | **In Progress** | Backend request/body deadlines and the generic safe-method fetch timeout exist; POST analysis/action calls are not automatically replayed without backend idempotency enforcement. `src/core/intelligence/attestationClient.ts` still performs direct session, challenge and attestation submissions without an explicit AbortController deadline. Add bounded client deadlines and timeout/abort regression tests, then validate real network recovery on devices. |
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
- Load testing: add a bounded, opt-in Node.js harness for staging with explicit POST opt-in and machine-readable latency/status metrics.
- AI cost observability: emit only validated token counts and model identifier from vision responses; add regression coverage that verifies image and user-intent sentinels never reach logs.
- Privacy: exception-message suppression and sentinel regression tests are present in the current branch; verify them in the current-head CI run.

## Remaining engineering actions

- Add explicit bounded timeouts to attestation client session/challenge/submission fetches and test abort plus same-evidence recovery.
- Validate client cancellation and retry behavior under real network loss.
- Execute the load harness against an approved staging target and agree capacity thresholds before interpreting results.
- Continue the UI-state matrix, AI cost measurement, monitoring/alert wiring, and release artifact workflow where repository-only work is possible.

## Release decision

The PR remains open and must not be merged until all required checks pass for the exact final SHA and all externally verifiable release gates have recorded evidence. A blank or unverified acceptance item is not a pass.
