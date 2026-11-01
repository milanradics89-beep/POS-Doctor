# Release pilot acceptance record

Complete this record before promoting a build beyond internal testing. Do not enter secrets, raw attestation payloads, personal data, or bearer tokens.

## Latest fully validated CI baseline (2026-11-01 19:36 CET; not a production sign-off)

PR #41 head: [`94772ced44c7f8147d1e24785cec33c2eacc4e94`](https://github.com/milanradics89-beep/POS-Doctor/commit/94772ced44c7f8147d1e24785cec33c2eacc4e94) (application-code commit; parent [`b6e3b91e8b80fb4f890af682deeb5094ef23d118`](https://github.com/milanradics89-beep/POS-Doctor/commit/b6e3b91e8b80fb4f890af682deeb5094ef23d118)). The latest code change rejects empty or whitespace-only `OPENAI_API_KEY` values in production and adds parameterized regression tests.

- [Validation run 41332198167](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41332198167): backend [124924465587](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41332198167/job/124924465587), frontend/Android [124924465314](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41332198167/job/124924465314), and iOS [124924465669](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41332198167/job/124924465669) all passed. Backend completed **354 tests with one Starlette/httpx TestClient deprecation warning**, production-readiness checks, and dependency audit using Redis 7.4.1. The Redis runner emitted a non-fatal `vm.overcommit_memory` warning. Android Release build/emulator install-launch and iOS Release simulator build/install-launch passed.
- [CodeQL run 41332198176](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41332198176), analyze job [124924465382](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41332198176/job/124924465382), completed successfully; SARIF merge emitted a column-kind mismatch warning.
- [Dependency Review run 41332198050](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41332198050), job [124924465007](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41332198050/job/124924465007), completed successfully with no high-or-higher vulnerable packages and no denied packages. Unknown license metadata for `vendor/deepmerge@4.3.2`, low Scorecard results (`@expo/devcert` 2.9 and `is-mergeable-object` 1.5), and 11 moderate transitive `glob`/`minimatch` npm-audit advisories remain documented. No forced Expo downgrade or audit-threshold reduction was applied.
- Exact observed check names are `CodeQL`, `analyze`, `backend`, `frontend`, `ios`, and `dependency-review`; they are not enforced by a current `main` ruleset.
- All three inline PR #41 review threads are resolved. Current source/tests verify explicit-auth POST retry cases, effective Request/init headers and method selection, a valid base64 vision-usage privacy fixture, sanitized error-boundary logging, Settings recovery for permanently denied camera/gallery permissions, and App Attest pending-enrollment recovery.
- [Issue #47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) remains open: `main.protected=false`, the rulesets endpoint is empty, and branch-protection detail reads return HTTP 403 to the integration. A repository administrator must create and verify the required `main` ruleset.
- The GitHub releases endpoint is empty. Complete code-scanning, Dependabot, and secret-scanning alert inventories are not exposed by the connected integration; their full status remains unverified.

This evidence is not production sign-off. Simulator/emulator results do not satisfy physical-device App Attest or Play Integrity. Production secrets/provider settings, staging deployment, backup/restore, monitoring/alert delivery, store rollout, pilot thresholds, moderate npm-audit risk decision, and human approvals remain unverified.

## Evidence gates

- [x] Full CI validation passed for PR head `94772ced44c7f8147d1e24785cec33c2eacc4e94` ([run 41332198167](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41332198167)).
- [x] CodeQL passed for PR head `94772ced44c7f8147d1e24785cec33c2eacc4e94` ([run 41332198176](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41332198176)).
- [x] Dependency Review passed for PR head `94772ced44c7f8147d1e24785cec33c2eacc4e94` ([run 41332198050](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41332198050)); known dependency warnings and moderate npm-audit advisories remain documented above.
- [ ] Review or remediate the 11 moderate npm-audit advisories in the Expo 57 transitive `glob` / `minimatch` dependency paths; do not apply the forced Expo 51 downgrade.
- [x] Automated production-readiness checks passed in [validation run 41332198167](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41332198167); production environment configuration is still unverified.

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
