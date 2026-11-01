# Release pilot acceptance record

Complete this record before promoting a build beyond internal testing. Do not enter secrets, raw attestation payloads, personal data, or bearer tokens.

## Latest fully validated CI baseline (2026-11-01 17:27 CET; not a production sign-off)

PR #41 head: [`f7671fefd5b01564049288746ac15af8ad97d513`](https://github.com/milanradics89-beep/POS-Doctor/commit/f7671fefd5b01564049288746ac15af8ad97d513) (documentation-only; parent `e6b234dbf093d06af7c8d7a19441fea3cd4116a6`). All three required workflows completed successfully for this exact SHA. Application code last changed at `274fefb6390b2324dfb37b8201279675bf26b481`.

- [Validation run 41320067095](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41320067095): backend [124888152477](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41320067095/job/124888152477), frontend/Android [124888152647](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41320067095/job/124888152647), and iOS [124888152590](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41320067095/job/124888152590) all passed. Backend completed **351 tests with one Starlette/httpx TestClient deprecation warning** and passed production-readiness checks/dependency audit. Android Release build/emulator install-launch and iOS Release simulator build/install-launch passed.
- [CodeQL run 41320066902](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41320066902), analyze job [124888151796](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41320066902/job/124888151796), completed successfully. SARIF merge emitted a column-kind mismatch warning.
- [Dependency Review run 41320067008](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41320067008), job [124888151781](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41320067008/job/124888151781), completed successfully with no high-or-higher vulnerable packages. Unknown license metadata for `vendor/deepmerge@4.3.2`, low Scorecard results (`@expo/devcert` 2.9 and `is-mergeable-object` 1.5), and 11 moderate transitive `glob`/`minimatch` npm-audit advisories remain documented. No forced Expo downgrade or audit-threshold reduction was applied.
- Exact observed check names are `CodeQL`, `analyze`, `backend`, `frontend`, `ios`, and `dependency-review`; they are not enforced by a current `main` ruleset.
- All three inline PR #41 review threads are resolved. Source/tests verify explicit-auth POST retry cases, effective Request/init headers and method selection, a valid base64 vision-usage privacy fixture, sanitized error-boundary logging, Settings recovery for permanently denied camera/gallery permissions, and App Attest pending-enrollment recovery.
- [Issue #47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) remains open: `main.protected=false`, the rulesets endpoint is empty, and branch-protection detail reads return HTTP 403 to the integration. A repository administrator must create and verify the required `main` ruleset.
- The GitHub releases endpoint is empty. Complete code-scanning, Dependabot, and secret-scanning alert inventories are not exposed by the connected integration; their full status remains unverified.

This evidence is not production sign-off. Simulator/emulator results do not satisfy physical-device App Attest or Play Integrity. Production secrets/provider settings, staging deployment, backup/restore, monitoring/alert delivery, store rollout, pilot thresholds, moderate npm-audit risk decision, and human approvals remain unverified.

## Evidence gates

- [x] Full CI validation passed for PR head `f7671fefd5b01564049288746ac15af8ad97d513` ([run 41320067095](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41320067095)).
- [x] CodeQL passed for PR head `f7671fefd5b01564049288746ac15af8ad97d513` ([run 41320066902](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41320066902)).
- [x] Dependency Review passed for PR head `f7671fefd5b01564049288746ac15af8ad97d513` ([run 41320067008](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41320067008)); known dependency warnings and moderate npm-audit advisories remain documented above.
- [ ] Review or remediate the 11 moderate npm-audit advisories in the Expo 57 transitive `glob` / `minimatch` dependency paths; do not apply the forced Expo 51 downgrade.
- [x] Automated production-readiness checks passed in [validation run 41320067095](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41320067095); production environment configuration is still unverified.
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

- [x] Full CI validation passed for PR head `e6b234dbf093d06af7c8d7a19441fea3cd4116a6` ([run 41312305518](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41312305518)).
- [x] CodeQL passed for PR head `e6b234dbf093d06af7c8d7a19441fea3cd4116a6` ([run 41312305644](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41312305644)).
- [x] Dependency Review passed for PR head `e6b234dbf093d06af7c8d7a19441fea3cd4116a6` ([run 41312305528](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41312305528)); known dependency warnings and moderate npm-audit advisories remain documented above.
- [ ] Review or remediate the 11 moderate npm-audit advisories in the Expo 57 transitive `glob` / `minimatch` dependency paths; do not apply the forced Expo 51 downgrade.
- [x] Automated production-readiness checks passed in [validation run 41312305518](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41312305518); production environment configuration is still unverified.
- [ ] Staging readiness and health checks passed:
- [ ] Shared Redis is configured; challenge replay and multi-instance tests passed:
- [ ] EAS build environment contains the valid numeric `EXPO_PUBLIC_GOOGLE_CLOUD_PROJECT_NUMBER` for Play Integrity:
- [ ] Google Play Integrity verified on a Play-installed physical Android device:
- [ ] Apple App Attest verified on a physical iPhone using the production entitlement:
- [ ] Camera permission grant/denial/recovery flows tested on both platforms:
- [ ] Network interruption and session recovery tested:
- [ ] Privacy review confirms production log sinks and retention contain no images, data URIs, secrets, bearer tokens, or raw provider responses. Code-level prompt/user-intent redaction and personal-memory capability path redaction remain in application source SHA `274fefb6390b2324dfb37b8201279675bf26b481` and passed in [validation run 41312305518](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41312305518) for PR head `e6b234dbf093d06af7c8d7a19441fea3cd4116a6`:
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
