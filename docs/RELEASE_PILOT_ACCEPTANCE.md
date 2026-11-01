# Release pilot acceptance record

Complete this record before promoting a build beyond internal testing. Do not enter secrets, raw attestation payloads, personal data, or bearer tokens.

## Latest fully validated CI baseline (2026-11-01 20:08 CET; not a production sign-off)

PR #41 head [`a0120a0ab075c1bbb3703a4f5f672271c02c3937`](https://github.com/milanradics89-beep/POS-Doctor/commit/a0120a0ab075c1bbb3703a4f5f672271c02c3937) is a documentation-only commit; its application-code parent is [`94772ced44c7f8147d1e24785cec33c2eacc4e94`](https://github.com/milanradics89-beep/POS-Doctor/commit/94772ced44c7f8147d1e24785cec33c2eacc4e94). The application-code change rejects empty or whitespace-only production `OPENAI_API_KEY` values and adds parameterized regression tests.

- [Validation run 41338053985](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41338053985): backend [124941984384](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41338053985/job/124941984384), frontend/Android [124941984328](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41338053985/job/124941984328), and iOS [124941984209](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41338053985/job/124941984209) all passed for the exact head. Backend completed **354 tests with one Starlette/httpx TestClient deprecation warning**, production-readiness checks, and dependency audit using Redis 7.4.1; the Redis runner emitted a non-fatal `vm.overcommit_memory` warning. Android Release build/emulator install-launch and iOS Release simulator build/install-launch passed. The frontend npm audit still reports **11 moderate transitive `glob`/`minimatch` advisories**; the configured high-severity threshold passed, but the dependency tree is not clean.
- [CodeQL run 41338053990](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41338053990), analyze job [124941984258](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41338053990/job/124941984258), completed successfully; SARIF merge emitted a column-kind mismatch warning.
- [Dependency Review run 41338054022](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41338054022), job [124941984081](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41338054022/job/124941984081), completed successfully with 0 high-or-higher vulnerable packages, 0 incompatible licenses, 0 invalid SPDX definitions, and 0 denied packages. It reports unknown license metadata for `vendor/deepmerge@4.3.2` and low Scorecard results for `@expo/devcert` (2.9) and `is-mergeable-object` (1.5).
- Exact observed check names are `CodeQL`, `analyze`, `backend`, `frontend`, `ios`, and `dependency-review`. Android validation is part of the `frontend` job. These checks are not enforced by a current `main` ruleset.
- All three inline PR #41 review threads are resolved. Current source/tests verify explicit-auth POST retry cases, effective Request/init headers and method selection, a valid base64 vision-usage privacy fixture, sanitized error-boundary logging, Settings recovery for permanently denied camera/gallery permissions, and App Attest pending-enrollment recovery.
- [Issue #47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) remains open: `main.protected=false`, `protection.enabled=false`, and the rulesets endpoint is empty. The connected integration has no branch-protection/ruleset write action; a repository administrator must create and verify the required `main` ruleset.
- The GitHub releases endpoint is empty. Complete code-scanning, Dependabot, and secret-scanning alert inventories are not exposed by the connected integration; their full status remains unverified.

This evidence is not production sign-off. Simulator/emulator results do not satisfy physical-device App Attest or Play Integrity. Production secrets/provider settings, staging deployment, backup/restore, monitoring/alert delivery, store rollout, pilot thresholds, moderate npm-audit risk decision, and human approvals remain unverified.

## Evidence gates

- [x] Full CI validation passed for PR head `a0120a0ab075c1bbb3703a4f5f672271c02c3937` ([run 41338053985](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41338053985)).
- [x] CodeQL passed for PR head `a0120a0ab075c1bbb3703a4f5f672271c02c3937` ([run 41338053990](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41338053990)).
- [x] Dependency Review passed for PR head `a0120a0ab075c1bbb3703a4f5f672271c02c3937` ([run 41338054022](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41338054022)); unknown license metadata and two low Scorecard warnings remain.
- [ ] Review or remediate the 11 moderate npm-audit advisories in the Expo 57 transitive `glob` / `minimatch` dependency paths; do not apply the forced Expo 51 downgrade or lower the audit threshold.
- [x] Automated production-readiness checks passed in [validation run 41338053985](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41338053985); production environment configuration is still unverified.


