# Release pilot acceptance record

Complete this record before promoting a build beyond internal testing. Do not enter secrets, raw attestation payloads, personal data, or bearer tokens.

## Latest fully validated CI baseline (not a production sign-off)

Current fully validated PR #41 head: `67f2d545247ea276b515a44d06473a466deacc85` (documentation-only evidence commit; parent `67f2d545247ea276b515a44d06473a466deacc85`). Application code last changed at `274fefb6390b2324dfb37b8201279675bf26b481`.

- [Validation run 41277283112](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41277283112): backend [124761921658](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41277283112/job/124761921658), frontend/Android [124761921517](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41277283112/job/124761921517), and iOS [124761921455](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41277283112/job/124761921455) all passed for the exact PR head. Android Release build and emulator install/launch passed; iOS native generation, CocoaPods, Release simulator build, and simulator install/launch passed. Backend compilation, 350 tests, production-readiness checks, and dependency audit passed; one Starlette/httpx TestClient deprecation warning remains.
- [CodeQL run 41277282923](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41277282923), analyze job [124761921352](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41277282923/job/124761921352), completed successfully. Its SARIF merge logged a column-kind mismatch warning.
- [Dependency Review run 41277283456](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41277283456), job [124761922861](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41277283456/job/124761922861), completed successfully. No high-or-higher vulnerable packages or denied packages were reported; warnings remain for unknown license metadata on `vendor/deepmerge@4.3.2`, low Scorecard findings (`@expo/devcert` 2.9 and `is-mergeable-object` 1.5), and 11 moderate transitive `glob`/`minimatch` npm-audit advisories. No forced Expo downgrade or audit-threshold reduction was applied.
- The exact observed check names are `CodeQL`, `analyze`, `backend`, `frontend`, `ios`, and `dependency-review`; they are not enforced by a current `main` ruleset.
- All three inline PR #41 review threads are resolved. Source inspection confirms App Attest pending-enrollment recovery, verifier test updates, effective Request/init header semantics, explicit-auth POST retry tests, a valid base64 vision-usage privacy fixture, sanitized error-boundary logging, and Settings recovery for permanently denied camera/gallery permissions.
- [Issue #47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) remains open: `main` is not protected, the rulesets endpoint is empty, and branch-protection reads return HTTP 403 to the integration. A repository administrator must create and verify the required `main` ruleset.
- The GitHub releases endpoint is empty. Complete code-scanning, Dependabot, and secret-scanning alert inventories are not exposed by the connected integration, so their full status remains unverified.

This evidence applies to the complete PR head `67f2d545247ea276b515a44d06473a466deacc85`; the commit changed release documentation only. It is not production sign-off: simulator/emulator results do not satisfy physical-device App Attest or Play Integrity. Production secrets/provider settings, staging deployment, backup/restore, monitoring/alert delivery, rollout, pilot thresholds, moderate npm-audit risk decision, and human approvals remain unverified.

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

- [x] Full CI validation passed for PR head `67f2d545247ea276b515a44d06473a466deacc85` ([run 41277283112](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41277283112)).
- [x] CodeQL passed for PR head `67f2d545247ea276b515a44d06473a466deacc85` ([run 41277282923](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41277282923)).
- [x] Dependency Review passed for PR head `67f2d545247ea276b515a44d06473a466deacc85` ([run 41277283456](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41277283456)); known dependency warnings and moderate npm-audit advisories remain documented above.
- [ ] Review or remediate the 11 moderate npm-audit advisories in the Expo 57 transitive `glob` / `minimatch` dependency paths; do not apply the forced Expo 51 downgrade.
- [x] Automated production-readiness checks passed in [validation run 41277283112](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41277283112); production environment configuration is still unverified.
- [ ] Staging readiness and health checks passed:
- [ ] Shared Redis is configured; challenge replay and multi-instance tests passed:
- [ ] EAS build environment contains the valid numeric `EXPO_PUBLIC_GOOGLE_CLOUD_PROJECT_NUMBER` for Play Integrity:
- [ ] Google Play Integrity verified on a Play-installed physical Android device:
- [ ] Apple App Attest verified on a physical iPhone using the production entitlement:
- [ ] Camera permission grant/denial/recovery flows tested on both platforms:
- [ ] Network interruption and session recovery tested:
- [ ] Privacy review confirms production log sinks and retention contain no images, data URIs, secrets, bearer tokens, or raw provider responses. Code-level prompt/user-intent redaction and personal-memory capability path redaction remain in application source SHA `274fefb6390b2324dfb37b8201279675bf26b481` and passed in [validation run 41277283112](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41277283112) for PR head `67f2d545247ea276b515a44d06473a466deacc85`:
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
