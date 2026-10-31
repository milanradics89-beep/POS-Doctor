# Release pilot acceptance record

Complete this record before promoting a build beyond internal testing. Do not enter secrets, raw attestation payloads, personal data, or bearer tokens.

## Latest fully validated CI baseline (not a production sign-off)

Latest fully validated parent source commit: f8148b30d5646ea3d196c791b26b2989d6bf0f6a (2026-10-31).

- [Validation run 41210918327](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41210918327): all three jobs passed. Frontend passed source-boundary validation, TypeScript, unit tests, Expo Doctor, Android export, Android Release build/emulator install-launch, and runtime dependency audit. Backend passed compilation, full Redis 7.4-backed tests, production-readiness checks, and backend dependency audit. iOS passed native generation, CocoaPods, Release simulator build, and simulator install/launch.
- [CodeQL run 41210918374](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41210918374): completed successfully. The connected API did not expose the repository alert inventory, so no zero-alert claim is made.
- [Dependency Review run 41210918324](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41210918324): completed successfully with 0 vulnerable packages, 0 incompatible licenses, 0 invalid SPDX definitions, 1 unknown-license metadata warning, and 2 low Scorecard warnings. The separate npm audit report still records 11 moderate transitive glob / minimatch advisories; no high/critical npm-audit findings were reported.
- Commit 9da15a9 adds request-path redaction for personal-memory bearer capabilities, with regression tests covering successful and 500 responses. Earlier prompt/user-intent redaction remains covered by sentinel tests.
- All three historical inline PR review threads are resolved. The latest Codex review receipt is older than the f814 documentation head; current source inspection confirms the known Request/init, privacy-fixture, error-boundary and permission-recovery findings are addressed.

This evidence applies to source SHA f8148b30d5646ea3d196c791b26b2989d6bf0f6a only. The current revision adds Redis server-time sliding-window rate limiting plus boundary and concurrency tests; its exact-head CI is pending and is not covered by the runs above. This is not a production sign-off: simulator/emulator results do not satisfy physical-device App Attest or Play Integrity. Production secrets/provider settings, staging deployment, backup/restore, monitoring/alert delivery, rollout, pilot thresholds, moderate npm-audit risk decision, and human approvals remain unverified.

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

- [x] Full CI validation passed for the exact source SHA: `9da15a95b2515339c050d1ab3b22cda10d0db8f7` ([run 41210918327](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41210918327)).
- [x] CodeQL passed for the exact source SHA: `9da15a95b2515339c050d1ab3b22cda10d0db8f7` ([run 41210918374](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41210918374)).
- [x] Dependency Review passed for the exact source SHA: `9da15a95b2515339c050d1ab3b22cda10d0db8f7` ([run 41210918324](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41210918324)); 1 unknown-license metadata warning and 2 highlighted low Scorecard results remain visible.
- [ ] Review or remediate the 11 moderate npm-audit advisories in the Expo 57 transitive `glob` / `minimatch` dependency paths; do not apply the forced Expo 51 downgrade.
- [x] Automated production-readiness checks passed in [validation run 41210918327](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41210918327); production environment configuration is still unverified.
- [ ] Staging readiness and health checks passed:
- [ ] Shared Redis is configured; challenge replay and multi-instance tests passed:
- [ ] EAS build environment contains the valid numeric `EXPO_PUBLIC_GOOGLE_CLOUD_PROJECT_NUMBER` for Play Integrity:
- [ ] Google Play Integrity verified on a Play-installed physical Android device:
- [ ] Apple App Attest verified on a physical iPhone using the production entitlement:
- [ ] Camera permission grant/denial/recovery flows tested on both platforms:
- [ ] Network interruption and session recovery tested:
- [ ] Privacy review confirms production log sinks and retention contain no images, data URIs, secrets, bearer tokens, or raw provider responses. Code-level prompt/user-intent redaction and personal-memory capability path redaction with sentinel tests passed on commit `9da15a95b2515339c050d1ab3b22cda10d0db8f7`:
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
