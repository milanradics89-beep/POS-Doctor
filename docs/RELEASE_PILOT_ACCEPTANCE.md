# Release pilot acceptance record

Complete this record before promoting a build beyond internal testing. Do not enter secrets, raw attestation payloads, personal data, or bearer tokens.

## Latest fully validated CI baseline (not a production sign-off)

Latest fully validated source commit: `b48e295006dbf09a9bbfaae855ee31832f8ff19e` (2026-10-31).

- [Validation run 41155582219](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41155582219): passed. [Frontend job](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41155582219/job/124401547761) passed typecheck, unit tests, Expo Doctor, Android export, Android Release build/emulator smoke test, and runtime dependency audit. [iOS job](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41155582219/job/124401547802) passed native iOS generation, CocoaPods installation, Release simulator build, and install/launch smoke test. [Backend job](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41155582219/job/124401547513) passed compilation, full tests with Redis 7.4, production-readiness checks, and dependency audit.
- [CodeQL run 41155582210](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41155582210): passed.
- [Dependency Review run 41155582212](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41155582212): passed with 0 vulnerable packages, 0 incompatible licenses, 0 invalid SPDX definitions, 1 unknown-license package, and 2 OpenSSF Scorecard warnings.

The CI evidence above applies to the exact SHA shown. It is not a production sign-off. Simulator/emulator results do not satisfy physical-device App Attest or Play Integrity. Production secrets/provider settings, staging deployment, backup/restore, monitoring/alert delivery, rollout, pilot thresholds, and human approvals remain unverified.

## Release identity

- [ ] Release version:
- [ ] Source commit SHA:
- [ ] Backend deployment identifier:
- [ ] Hosting environment/region:
- [ ] Android artifact/build number and signing certificate digest:
- [ ] iOS artifact/build number and bundle identifier:
- [ ] Release owner:
- [ ] On-call owner:
- [ ] Rollback owner:

## Evidence gates

- [x] Full CI validation passed for the exact source SHA: `b48e295006dbf09a9bbfaae855ee31832f8ff19e` ([run 41155582219](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41155582219)).
- [x] CodeQL passed for the exact source SHA: `b48e295006dbf09a9bbfaae855ee31832f8ff19e` ([run 41155582210](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41155582210)).
- [x] Dependency Review passed for the exact source SHA: `b48e295006dbf09a9bbfaae855ee31832f8ff19e` ([run 41155582212](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41155582212)); 1 unknown-license and 2 Scorecard warnings remain visible.
- [x] Automated production-readiness checks passed in [validation run 41155582219](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41155582219); production environment configuration is still unverified.
- [ ] Staging readiness and health checks passed:
- [ ] Shared Redis is configured; challenge replay and multi-instance tests passed:
- [ ] EAS build environment contains the valid numeric `EXPO_PUBLIC_GOOGLE_CLOUD_PROJECT_NUMBER` for Play Integrity:
- [ ] Google Play Integrity verified on a Play-installed physical Android device:
- [ ] Apple App Attest verified on a physical iPhone using the production entitlement:
- [ ] Camera permission grant/denial/recovery flows tested on both platforms:
- [ ] Network interruption and session recovery tested:
- [ ] Privacy review confirms logs contain no images, data URIs, secrets, bearer tokens, or raw provider responses:
- [ ] Backup and restore procedure verified:

## Pilot acceptance criteria

Agree and record thresholds before the pilot starts. Do not infer thresholds from CI results.

| Metric | Agreed threshold | Observed result | Evidence link | Pass |
|---|---|---|---|---|
| Crash-free sessions | | | | [ ] |
| API 5xx rate | | | | [ ] |
| API 429 rate | | | | [ ] |
| p95 API latency | | | | [ ] |
| Attestation success/failure rate | | | | [ ] |
| Product-resolution success rate | | | | [ ] |
| AI cost per session | | | | [ ] |
| Readiness failures | | | | [ ] |

- Pilot start (UTC):
- Pilot end (UTC):
- Cohort/eligible user count:
- Known issues accepted by owner:
- Expansion decision and rationale:

## Rollback rehearsal

- [ ] Previous known-good backend artifact is identified and retrievable.
- [ ] Previous mobile store release is identified.
- [ ] Backend rollback/configuration restoration was rehearsed.
- [ ] Readiness and smoke tests passed after rollback.
- [ ] Mobile staged rollout halt procedure was verified.
- [ ] Backend remains compatible with already-installed mobile clients.
- [ ] Incident escalation and alert destination were tested.

## Sign-off

- Engineering approver:
- Security approver:
- Product/business approver:
- Approval timestamp (UTC):
- Approved source SHA:

A blank or unverified item is not a pass. Simulator/emulator smoke tests do not replace physical-device attestation evidence.
