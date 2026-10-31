# Release pilot acceptance record

Complete this record before promoting a build beyond internal testing. Do not enter secrets, raw attestation payloads, personal data, or bearer tokens.

## Latest fully validated CI baseline (not a production sign-off)

Latest fully validated source commit: `78402c8f35c2aad4717ae0ae5ba307dfae2b7c14` (2026-10-31).

- [Validation run 41191342523](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41191342523): all three jobs passed. [Frontend job 124508582653](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41191342523/job/124508582653) passed source-boundary validation, TypeScript, unit tests, Expo Doctor, Android export, Android Release build/emulator install-launch, and the configured runtime dependency audit. [iOS job 124508582705](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41191342523/job/124508582705) passed native generation, CocoaPods installation, Release simulator build, and simulator install/launch. [Backend job 124508582430](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41191342523/job/124508582430) passed compilation, full tests with Redis 7.4, production-readiness checks, and backend dependency audit.
- [CodeQL run 41191342553](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41191342553) completed successfully and uploaded combined JavaScript/Python SARIF results. The connected API did not expose the repository alert inventory for this run, so no zero-alert claim is made.
- [Dependency Review run 41191342726](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41191342726) completed successfully: no vulnerable packages at severity high or higher and no denied packages; one license-metadata warning for the local `vendor/deepmerge@4.3.2` link; two highlighted low Scorecard results (`@expo/devcert@1.2.2` 2.9 and `is-mergeable-object@1.1.1` 1.5).
- The frontend `npm audit --omit=dev --audit-level=high` step passed its configured threshold but reported 11 moderate advisories in transitive `glob@13.0.6` / `minimatch@10.2.6` paths; no high/critical npm-audit findings were reported. This remains open for compatible remediation or explicit owner risk acceptance. Do not use the suggested forced Expo 51 downgrade.
- Commit `78402c8` adds prompt/user-prompt/user-intent redaction to structured logging with sentinel regression tests. Frontend and backend tests passed on the exact source SHA.
- Historical inline review threads are resolved; the latest recorded Codex receipts found no major issues on commits `123c0c4` and `0ae7517`. The new privacy commit has not yet received a newer review receipt.

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

- [x] Full CI validation passed for the exact source SHA: `78402c8f35c2aad4717ae0ae5ba307dfae2b7c14` ([run 41191342523](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41191342523)).
- [x] CodeQL passed for the exact source SHA: `78402c8f35c2aad4717ae0ae5ba307dfae2b7c14` ([run 41191342553](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41191342553)).
- [x] Dependency Review passed for the exact source SHA: `78402c8f35c2aad4717ae0ae5ba307dfae2b7c14` ([run 41191342726](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41191342726)); 1 unknown-license metadata warning and 2 highlighted low Scorecard results remain visible.
- [ ] Review or remediate the 11 moderate npm-audit advisories in the Expo 57 transitive `glob` / `minimatch` dependency paths; do not apply the forced Expo 51 downgrade.
- [x] Automated production-readiness checks passed in [validation run 41191342523](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41191342523); production environment configuration is still unverified.
- [ ] Staging readiness and health checks passed:
- [ ] Shared Redis is configured; challenge replay and multi-instance tests passed:
- [ ] EAS build environment contains the valid numeric `EXPO_PUBLIC_GOOGLE_CLOUD_PROJECT_NUMBER` for Play Integrity:
- [ ] Google Play Integrity verified on a Play-installed physical Android device:
- [ ] Apple App Attest verified on a physical iPhone using the production entitlement:
- [ ] Camera permission grant/denial/recovery flows tested on both platforms:
- [ ] Network interruption and session recovery tested:
- [ ] Privacy review confirms production log sinks and retention contain no images, data URIs, secrets, bearer tokens, or raw provider responses. Code-level prompt/user-intent redaction and sentinel tests passed on commit `78402c8`:
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
