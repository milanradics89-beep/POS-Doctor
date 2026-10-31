# Release pilot acceptance record

Complete this record before promoting a build beyond internal testing. Do not enter secrets, raw attestation payloads, personal data, or bearer tokens.

## Latest fully validated CI baseline (not a production sign-off)

Latest fully validated PR #41 head: 9bbfde2cb2d4a9aef1e10119e01019a954cadf5a (fix(attestation): install google-auth requests transport, 2026-10-31). Its immediate parent, 274fefb6390b2324dfb37b8201279675bf26b481, is the latest application-code commit; the current HEAD changes only the backend Google Auth dependency extra.

- [Validation run 41247748380](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41247748380): all three jobs passed for the exact PR head. Backend job [124674607358](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41247748380/job/124674607358) used Redis 7.4 and reported **350 passed, 1 Starlette deprecation warning**. Frontend job [124674607201](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41247748380/job/124674607201) passed TypeScript, unit tests, Expo Doctor, Android export/Release build, and emulator install/launch. iOS job [124674607390](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41247748380/job/124674607390) passed native generation, CocoaPods, Release simulator build, and simulator install/launch.
- [CodeQL run 41247748378](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41247748378): completed successfully. Its check summary reports **no new alerts in code changed by this pull request**; the complete repository alert inventory is not exposed by the connected integration, so no zero-open-alert claim is made.
- [Dependency Review run 41247748383](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41247748383): completed successfully with 0 high-or-higher vulnerable packages, 0 incompatible licenses, 0 invalid SPDX definitions, 1 unknown-license metadata warning (vendor/deepmerge@4.3.2), and 2 low Scorecard warnings (@expo/devcert 2.9; is-mergeable-object 1.5). The separate npm audit still reports 11 moderate transitive glob/minimatch advisories.
- Exact check-run names observed on this head are CodeQL, analyze, backend, frontend, ios, and dependency-review. They are not currently enforced by a main ruleset.
- All three historical inline PR #41 review threads are resolved. Current source inspection confirms App Attest pending-enrollment recovery, updated invalid-provider test expectations, effective Request/init header semantics, explicit-auth POST retry tests, valid base64 privacy fixture, sanitized error-boundary logging, and Settings recovery for permanently denied camera/gallery permissions.
- [Issue #26](https://github.com/milanradics89-beep/POS-Doctor/issues/26) is closed as completed after Redis challenge-store integration tests passed against Redis 7.4.
- [Issue #47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) remains open: current branch metadata reports main.protected=false, the rulesets endpoint is empty, and branch-protection reads return HTTP 403 to the integration. A repository administrator must create and verify the required main ruleset.
- The GitHub releases endpoint is empty. Code-scanning/Dependabot alert inventories are not exposed by the connected integration, so their full status remains unverified.

This evidence applies to the complete PR head 9bbfde2cb2d4a9aef1e10119e01019a954cadf5a; the application source code in that tree last changed at 274fefb6390b2324dfb37b8201279675bf26b481. It is not a production sign-off: simulator/emulator results do not satisfy physical-device App Attest or Play Integrity. Production secrets/provider settings, staging deployment, backup/restore, monitoring/alert delivery, rollout, pilot thresholds, moderate npm-audit risk decision, and human approvals remain unverified.

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

- [x] Full CI validation passed for PR head `9bbfde2cb2d4a9aef1e10119e01019a954cadf5a` ([run 41247748380](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41247748380)).
- [x] CodeQL passed for PR head `9bbfde2cb2d4a9aef1e10119e01019a954cadf5a` ([run 41247748378](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41247748378)).
- [x] Dependency Review passed for PR head `9bbfde2cb2d4a9aef1e10119e01019a954cadf5a` ([run 41247748383](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41247748383)); 1 unknown-license metadata warning and 2 highlighted low Scorecard results remain visible.
- [ ] Review or remediate the 11 moderate npm-audit advisories in the Expo 57 transitive `glob` / `minimatch` dependency paths; do not apply the forced Expo 51 downgrade.
- [x] Automated production-readiness checks passed in [validation run 41247748380](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41247748380); production environment configuration is still unverified.
- [ ] Staging readiness and health checks passed:
- [ ] Shared Redis is configured; challenge replay and multi-instance tests passed:
- [ ] EAS build environment contains the valid numeric `EXPO_PUBLIC_GOOGLE_CLOUD_PROJECT_NUMBER` for Play Integrity:
- [ ] Google Play Integrity verified on a Play-installed physical Android device:
- [ ] Apple App Attest verified on a physical iPhone using the production entitlement:
- [ ] Camera permission grant/denial/recovery flows tested on both platforms:
- [ ] Network interruption and session recovery tested:
- [ ] Privacy review confirms production log sinks and retention contain no images, data URIs, secrets, bearer tokens, or raw provider responses. Code-level prompt/user-intent redaction and personal-memory capability path redaction remain in application source SHA `274fefb6390b2324dfb37b8201279675bf26b481` and passed in [validation run 41247748380](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41247748380) for PR head `9bbfde2cb2d4a9aef1e10119e01019a954cadf5a`:
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
