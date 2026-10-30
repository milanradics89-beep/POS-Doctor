# USEIT 25-point release backlog

Last reviewed: 2026-10-30  
Working branch: `fix/release-blockers-2026-10`  
PR: [#41](https://github.com/milanradics89-beep/POS-Doctor/pull/41)  
Baseline commit reviewed: `660883e2c3ea85f2decef1cd6466b59d3597d6f6`

Status meanings:
- **Done**: repository/CI evidence exists for the stated acceptance criterion.
- **In Progress**: implementation or automated evidence exists, but the full acceptance criterion is not yet met.
- **Blocked**: the next required action depends on external access, physical hardware, a production environment, a curated dataset, or an owner decision.

## Current evidence

For baseline commit `660883e`, all three PR workflows completed successfully:
- [Validation run 41100762588](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41100762588): frontend, backend, and iOS jobs succeeded.
- [CodeQL run 41100762599](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41100762599): analysis succeeded.
- [Dependency Review run 41100762402](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41100762402): succeeded; no high-or-higher vulnerabilities and no denied packages. It reported dependencies without detectable licenses and low OpenSSF Scorecard results for `@expo/devcert` (2.9) and `is-mergeable-object` (1.5). These are supply-chain review warnings, not vulnerability findings; the license identities and dependency reachability still require a recorded owner decision.

The validation workflow includes Android release APK build/emulator launch, iOS simulator build/launch, backend pytest with a Redis 7.4 service, production-readiness checks, and Python dependency audit. Simulator/emulator evidence does not satisfy hardware-backed attestation.

## 25-point status

| # | Work item | Status | Evidence / remaining acceptance |
|---:|---|---|---|
| 1 | iOS CI completion | **Done** | iOS Release simulator build and launch job succeeded in validation run 41100762588. This is simulator evidence only. |
| 2 | Protect `main` | **Blocked** | Repository rulesets endpoint returned an empty list; branch-protection read returned HTTP 403 to the integration. A repository administrator must create and verify a `main` ruleset with PR, exact required checks, force-push/deletion restrictions, and no routine admin bypass. See [issue #47](https://github.com/milanradics89-beep/POS-Doctor/issues/47). |
| 3 | Dependency Review warnings | **In Progress** | No high-or-higher vulnerabilities and no denied packages. Investigate dependencies with unknown license metadata and low Scorecard results; record the license/source and risk decision before release. |
| 4 | Physical iPhone App Attest | **Blocked** | Requires a physical iPhone, production App Attest entitlement/AAGUID, Apple Developer capability, and a production-like backend. Record device/build evidence without storing attestation payloads. |
| 5 | Physical Play Integrity | **Blocked** | Requires a physical Android device, Play-installed build, Play App Signing certificate, valid Cloud project number, service-account permission, and Play Console configuration. |
| 6 | Redis multi-instance challenge/replay tests | **Done** | Backend CI runs against Redis 7.4 and includes independent-client and separate-worker-process single-use/replay integration tests. |
| 7 | Attestation retry/network/expiry | **In Progress** | Client session recovery and challenge-expiry regressions have been added; complete end-to-end interruption/retry verification on both real platforms remains outstanding. |
| 8 | Backend production security audit | **In Progress** | Fail-closed configuration, CORS, docs exposure, session secret, Redis, and readiness checks have automated coverage. Actual production secret/configuration and deployment review remain unverified. |
| 9 | Privacy and logging audit | **In Progress** | Structured request telemetry and privacy tests exist. This commit hardens exception logging so exception messages/tracebacks cannot leak provider or user data; CI evidence for this change is pending. |
| 10 | Release acceptance evidence | **In Progress** | [Release pilot acceptance record](RELEASE_PILOT_ACCEPTANCE.md) and [release runbook](RELEASE_RUNBOOK.md) define gates; production identity, artifacts, owners, test evidence, thresholds, and sign-offs remain blank/unverified. |
| 11 | Mobile regression | **In Progress** | Android emulator and iOS simulator smoke tests pass in CI. Full user-flow regression and physical-device coverage are not yet evidenced. |
| 12 | Camera/image pipeline | **In Progress** | Image validation and bounded request upload are automated. Camera permission, capture quality, memory, and image lifecycle require device-level validation. |
| 13 | Offline/weak network | **In Progress** | Session recovery work exists; a complete offline/weak-network acceptance matrix and real-device evidence are still needed. |
| 14 | API timeout/retry | **In Progress** | Backend request/body deadlines exist. Client session bootstrap now has a bounded timeout; automatic retries are limited to safe methods or POSTs carrying an explicit `Idempotency-Key`, with regression tests. Validate cancellation and real network recovery on devices. |
| 15 | Backend load testing | **In Progress** | Added `scripts/load-test.mjs`: bounded staging probe (1–1,000 requests, concurrency capped at 20), timeout, status distribution, throughput and p50/p95/max latency. No staging run, capacity threshold or signed-off report exists yet. |
| 16 | Backup/restore | **Blocked** | Requires production datastore/Redis backup access, retention policy, restore target, and a witnessed restore rehearsal. |
| 17 | AI cost optimization | **In Progress** | Per-session cost is listed as a pilot metric; measured baseline, budgets, and optimization results are not recorded. |
| 18 | Product recognition accuracy | **Blocked** | Requires a representative, approved, labelled image/product benchmark and agreed precision/recall or task-success thresholds. |
| 19 | AI fallback | **In Progress** | Optional product-discovery degradation is implemented and regression-tested. Vision-provider outage/retry and user-facing fallback acceptance remain incomplete. |
| 20 | UI loading/empty/error/permission states | **In Progress** | The release checklist includes camera permission and failure states; a complete automated UI state matrix is not yet evidenced. |
| 21 | Monitoring/alerting | **In Progress** | Safe structured request telemetry and readiness endpoint exist. Production alert destination, thresholds, on-call ownership, and alert-delivery test remain unverified. |
| 22 | Staged rollout | **Blocked** | Requires TestFlight/Play internal track and production hosting/store access, rollout cohort, thresholds, and named release approval. |
| 23 | User analytics | **Blocked** | Requires a product/privacy decision on event taxonomy, consent, retention, and analytics provider before implementation can be accepted. |
| 24 | Automated release pipeline | **In Progress** | CI validates builds and tests; signed store artifact publication, environment promotion, and rollback automation are not yet evidenced. |
| 25 | Pilot/business validation | **Blocked** | Requires an approved pilot cohort, product/business acceptance thresholds, named approvers, and real usage/cost/support evidence. |

## Engineering work started on 2026-10-30

- API retry safety: prevent duplicate billable/state-changing POST work by requiring an explicit idempotency key before retrying POST requests; bound session bootstrap time; add regression tests.
- Load testing: add a bounded, opt-in Node.js harness for staging with explicit POST opt-in and machine-readable latency/status metrics.
- Privacy: exception-message suppression and sentinel regression tests are present in the current branch; verify them in the current-head CI run.

## Remaining engineering actions

- Validate client cancellation and retry behavior under real network loss.
- Execute the load harness against an approved staging target and agree capacity thresholds before interpreting results.
- Continue the UI-state matrix, AI cost measurement, monitoring/alert wiring, and release artifact workflow where repository-only work is possible.

## Release decision

The PR remains open and must not be merged until all required checks pass for the exact final SHA and all externally verifiable release gates have recorded evidence. A blank or unverified acceptance item is not a pass.
