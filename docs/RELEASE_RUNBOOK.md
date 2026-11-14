## Latest release checkpoint — 2026-11-14 01:16 CET

### Merged application baseline

PR [#41](https://github.com/milanradics89-beep/POS-Doctor/pull/41) is closed and merged. Reviewed PR HEAD: `68b380e73ca3c870048035197beef8febbf90ef1`; merge commit and current `main` HEAD: [`f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`](https://github.com/milanradics89-beep/POS-Doctor/commit/f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1). Final PR review: 22/22 inline threads resolved; 26 submissions (25 COMMENTED, 1 APPROVED).

All three required workflows passed on the exact PR #41 HEAD:
- Validation [#43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234): success; frontend, backend, and iOS jobs passed.
- CodeQL [#43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161): success.
- Dependency Review [#43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021): success.

Post-merge checks on the exact `main` commit `f03d239` also passed: Validation [#43503743786](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43503743786) and CodeQL [#43503743752](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43503743752). The PR-head Dependency Review is the recorded dependency gate; no separate post-merge Dependency Review run is claimed.

### Documentation PR #85: previous exact-head gate failed

Before this documentation refresh, PR [#85](https://github.com/milanradics89-beep/POS-Doctor/pull/85) was open on `docs/post-merge-release-evidence-20261113` at exact HEAD `ab302518de26a798fc417b22a32bda10376fcf11`. All three runs reached terminal states, but none passed:
- Validation [#43520112435](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43520112435): failure. Backend job [132231794474](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43520112435/job/132231794474) and iOS job [132231856374](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43520112435/job/132231856374) passed. Frontend job [132231791727](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43520112435/job/132231791727) failed while preparing the Google APIs Intel x86_64 Atom System Image: `No space left on device`. Android emulator smoke and later runtime dependency audit did not complete. This is a runner-capacity failure, not a passing Validation result.
- CodeQL [#43520112498](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43520112498): failure. The scan processed 75/75 Python files and 5/5 GitHub Actions files and exported SARIF, then failed because the action could not access workflow-run metadata (`Resource not accessible by integration`). The log also explicitly says Code Scanning is not enabled and requests `security-events: read`. A successful scan/export is not a successful CodeQL workflow.
- Dependency Review [#43520112508](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43520112508): failure. GitHub reports Dependency Review is not supported on this repository and requires Dependency Graph plus GitHub Advanced Security.

PR [#87](https://github.com/milanradics89-beep/POS-Doctor/pull/87), exact HEAD `18eec1bda29d419d8e71958df895c14fac4de464`, attempted a job-scoped `actions: read` permission change. Its Validation was cancelled, CodeQL failed with the explicit Code Scanning-not-enabled error, and Dependency Review failed with the same repository-capability error. The permission-only candidate has not resolved the owner-side feature/configuration blockers.

This documentation refresh creates a new PR #85 commit with a new exact-head CI gate. Do not inherit PR #41 or `main` CI results, and do not treat the previous PR #85 failures as results for the new commit.

### Main branch governance

The repository is private. The current `main` branch object reports `protected: false`; the rulesets API returns HTTP 403 with GitHub's requirement to upgrade to GitHub Pro or make the repository public. Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) remains open. The 2026-11-02 ruleset evidence is historical, not proof of current enforcement. Owner action and fresh verification are required before main protection can be marked Done.

### SSRF, releases, and security inventories

Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains open. PR [#70](https://github.com/milanradics89-beep/POS-Doctor/pull/70), exact HEAD `935cb0a6b88810696849f93c61a336541ce50914`, and PR [#79](https://github.com/milanradics89-beep/POS-Doctor/pull/79), exact HEAD `109e77ba8ccd78d42d4c4dc9cc0d557c98c0d902`, each passed Validation, CodeQL, and Dependency Review on its own exact head. Both remain open on separate branches and are not integrated security acceptance on `main`.

The repository has 0 published GitHub releases. Current inventory: 61 branches, 36 open pull requests, and 8 open issues. Code Scanning, Dependabot, and Secret Scanning alert inventories could not be retrieved through the connected GitHub interface; they remain unverified, not zero.

Pilot/production acceptance remains **NOT GRANTED**. Physical-device, production-cloud, witnessed backup/restore, monitoring, staged rollout, and real-user/business acceptance require their own external evidence.

## Latest release checkpoint — 2026-11-13 22:07 CET

### PR #41 merged; exact-head CI verified

PR [#41](https://github.com/milanradics89-beep/POS-Doctor/pull/41) was merged into `main` at **2026-11-13 20:40:35 UTC (21:40:35 CET)**. Reviewed PR HEAD: `68b380e73ca3c870048035197beef8febbf90ef1`; resulting main commit: [`f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`](https://github.com/milanradics89-beep/POS-Doctor/commit/f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1).

A human approval was recorded from `tarlaci1984-sketch` at 2026-11-13 20:05:16 UTC. Final PR review inventory: **22/22 inline threads resolved; 26 review submissions (25 COMMENTED, 1 APPROVED)**.

The three required workflows completed successfully on the exact PR HEAD `68b380e`:

- Validation [#43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234): **success**. Frontend [job 132115828836](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234/job/132115828836), backend [job 132115829214](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234/job/132115829214), and iOS [job 132115829399](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234/job/132115829399) all passed.
- CodeQL [#43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), analyze job 132115827817: **success**.
- Dependency Review [#43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021), job 132115827187: **success**.

Frontend log: **59 test files passed**, Expo Doctor passed, Android native Release build **BUILD SUCCESSFUL**, and Android emulator smoke passed for `com.useit.app`. The iOS simulator smoke passed for `com.useit.app`; backend Validation passed. Auxiliary Expo SDK 57 lock-refresh workflow [#43492142700](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492142700) passed and uploaded an artifact (SHA-256 `cac15d2ff98a79b14917c85eb32a8a70989c9d63775bf4908399ad01f47d442e`).

Post-merge checks on exact `main` commit `f03d239` also completed:
- Push Validation [#43503743786](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43503743786): frontend, backend, and iOS jobs all **success**.
- Push CodeQL [#43503743752](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43503743752): analyze **success**.
- Dependency Review above is the PR-head check; no separate post-merge push Dependency Review run is claimed.

### Main branch protection requires renewed owner action

Repository visibility is **private**. The current `main` branch API response reports `protected: false`. The rulesets API returns HTTP 403 with: `Upgrade to GitHub Pro or make this repository public to enable this feature.` Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47), previously closed after the 2026-11-02 verification of ruleset #26370589, has been **reopened** because current enforcement cannot be independently verified after privatization. The 403 does not prove the historical ruleset was deleted; it does mean current protection must not be represented as verified.

**Owner action:** while keeping the repository private, upgrade to GitHub Pro and verify the active ruleset and exact required checks; alternatively, make the repository public and re-verify. Until then, main branch protection is Blocked.

### Remaining security and release status

- Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains **open**. PRs [#70](https://github.com/milanradics89-beep/POS-Doctor/pull/70) and [#79](https://github.com/milanradics89-beep/POS-Doctor/pull/79) remain open/unmerged; each has Validation, CodeQL, and Dependency Review success on its own exact head. The SSRF remediation is not yet integrated and accepted.
- PR [#81](https://github.com/milanradics89-beep/POS-Doctor/pull/81), a separate full npm-audit candidate, has all three exact-head workflows green but reports **3 moderate, 0 high, and 0 critical** findings. These results are not attributed to the merged main tree.
- PR #41 Dependency Review reported 0 vulnerable packages, 0 incompatible licenses, 0 invalid SPDX definitions, 1 unknown-license package, and 2 Scorecard findings.
- Repository inventory: **57 branches, 32 open PRs, 0 published GitHub releases**.
- Code Scanning, Dependabot, and Secret Scanning alert inventories are **unavailable/unverified, not empty**; the connected GitHub interface does not expose those endpoints.
- Pilot/production acceptance remains **NOT GRANTED**. Physical-device, production-cloud, witnessed backup/restore, monitoring, staged rollout, and real-user/business acceptance remain blocked.

## Latest release checkpoint — 2026-11-13 18:49 CET

### Pre-integration evidence for PR #41

PR #41 remains open, unmerged, and non-draft on `fix/release-blockers-2026-10`, targeting `main`. Immediately before this integration commit, its exact HEAD was `b793a47f8f0a84155d1200fc797f191701f4eb92` (parent `e74a69a2fa1a4afd4e0c1cf5bf848d4acba2ede4`). The branch was 515 commits ahead and 0 behind main; the PR diff contained 98 files (+11,362 / -911).

Exact-head workflows for `b793a47f8f0a84155d1200fc797f191701f4eb92`:

- Validation [#43463804114](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43463804114): **failure overall**. Backend [job 132027276413](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43463804114/job/132027276413) and iOS [job 132027357144](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43463804114/job/132027357144) passed. Frontend [job 132027272954](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43463804114/job/132027272954) failed at Expo Doctor.
- Frontend unit tests passed **285/285 across 58 files**. Expo Doctor passed 20/21 checks and found four SDK 57 patch mismatches: `expo` 57.0.32 vs `~57.0.33`, `expo-constants` 57.0.23 vs `~57.0.24`, `expo-linking` 57.0.13 vs `~57.0.14`, and `expo-router` 57.0.30 vs `~57.0.31`. Android export, Release build, and emulator smoke were not reached after this failure.
- CodeQL [#43463804128](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43463804128), analyze job 132017424470: **success**.
- Dependency Review [#43463804149](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43463804149), job 132017428447: **success**.

### Validated remediation candidate integrated by this commit

Draft PR [#65](https://github.com/milanradics89-beep/POS-Doctor/pull/65), exact candidate HEAD `678fe7fde32f4dc785288d5a8ac939f1ac6478f0`, passed its own exact-head workflows:

- Validation [#43452488602](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43452488602): backend, frontend, and iOS jobs all **success**.
- CodeQL [#43452493289](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43452493289): **success**.
- Dependency Review [#43452488754](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43452488754): **success**.

The candidate updates the four Expo SDK 57 packages and lockfile, aligns validation jobs to Node 22, pins the Expo Doctor CLI used by the lock-refresh workflow, adds App Attest config/workflow regression coverage, and adds a prototype-pollution regression test for the vendored deepmerge package. Its Redis readiness and production rate-limiting corrections are byte-identical to the current release branch runbook.

This commit applies the validated candidate tree as a single child of the current PR #41 HEAD. The resulting commit is a **new exact-head CI gate**. Do not reuse either the pre-integration PR #41 failure or the PR #65 candidate's green runs as CI evidence for the resulting commit. PR #65 remains open and draft; it has not been merged.

### Review, security, and release state

- PR #41 inline review threads: **22/22 resolved**.
- Review submissions: **25**, all `COMMENTED`; **0 human APPROVED**. A human approving review and last-push approval remain mandatory.
- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed. Active main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) requires CodeQL, analyze, backend, frontend, iOS, and dependency-review; one approval; last-push approval; resolved threads; deletion/non-fast-forward protection; and no bypass actors.
- Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains open. PRs [#70](https://github.com/milanradics89-beep/POS-Doctor/pull/70) and [#79](https://github.com/milanradics89-beep/POS-Doctor/pull/79) have each passed Validation, CodeQL, and Dependency Review on their own exact heads. The redirect-chain and DNS-pinning code still requires review/integration before #64 can close.
- Repository inventory at this checkpoint: **57 branches, 33 open PRs, 0 published GitHub releases**.
- Code Scanning, Dependabot, and Secret Scanning alert inventories remain **unverified, not zero** because their alert endpoints are not exposed by the connected GitHub interface.
- The 25-point register remains **3 Done / 15 In Progress / 7 Blocked**. External blockers #4, #5, #16, #18, #21, #22, and #25 remain Blocked until physical-device, production, witnessed backup/restore, monitoring, rollout, and real-pilot evidence exists.

**Release decision:** the pre-integration PR #41 HEAD did not pass Validation. The integration commit created by this checkpoint must pass all exact-head required workflows independently. Human approval and external production/pilot acceptance remain outstanding. Do not merge PR #41 automatically or bypass required checks.

---

## Latest release checkpoint — 2026-11-11 21:40 CET

PR #41 remains **open, unmerged, and non-draft** on fix/release-blockers-2026-10, targeting main. The fully validated parent immediately before this documentation repair is 4883c652d61b93236b7a604f124bf5708caa07e6. This commit is a documentation-only child of that parent; its own exact-head Validation, CodeQL, and Dependency Review must pass independently. Do not reuse the parent runs as evidence for the child.

### Exact-head evidence for validated parent 4883c65

All three required workflows completed successfully for the same exact SHA:

- Validation [#43090044324](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044324): backend [130764391957](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044324/job/130764391957), frontend/Android [130764391800](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044324/job/130764391800), and iOS [130764391399](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044324/job/130764391399) all **success**. All steps passed, including Expo Doctor, Android export/Release/emulator smoke, iOS Release simulator/smoke, and runtime dependency audit.
- CodeQL [#43090044306](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044306), analyze [130764391156](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044306/job/130764391156): **success**.
- Dependency Review [#43090044397](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044397), job [130764390843](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044397/job/130764390843): **success**; no high-or-higher vulnerable package in the reviewed diff and no denied package.

The unchanged source/test baseline 2faa49c records **450 backend tests / 27 production-readiness checks / 78 security-privacy checks**, **285 frontend tests across 58 files**, Expo Doctor **21/21**, Android Release and emulator install/launch smoke, and iOS Release simulator build and launch smoke. The exact 4883c65 Validation reran all three jobs successfully; its source/test tree is unchanged from the validated parent.

### Dependency and security disposition

- Runtime npm audit: **four moderate** transitive glob/minimatch advisory instances; no high-or-higher finding at the configured --audit-level=high threshold.
- Dependency Review metadata: unknown license metadata remains for vendor/deepmerge@4.3.2; below-threshold Scorecard results remain for @expo/devcert (2.9) and is-mergeable-object (1.5).
- CodeQL succeeded. The previously observed SARIF column-kind mismatch is non-fatal.
- Code Scanning, Dependabot, and Secret Scanning alert inventories remain **unverified, not zero** because the connected integration does not expose those alert endpoints.

### Review, governance, and repository state

- The Codex review of 4883c65 raised two P2 documentation findings: distinguish the validated parent from the current documentation HEAD, and preserve the actionable production/mobile/staging/rollout/monitoring/rollback/release-record procedures. This commit addresses both. The two corresponding review threads are resolved after the push.
- At the pre-write refresh, PR #41 had **20 inline threads total, 18 resolved and 2 open**, **24 review submissions, 0 APPROVED**. A fresh Codex review is requested for this documentation child; a human approving review and last-push approval remain mandatory.
- Branch comparison immediately before this commit: **512 ahead / 0 behind** main; this documentation-only commit adds one linear commit. Main HEAD: 7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0.
- Repository inventory: **32 branches, 19 open PRs, 4 open non-PR issues** (#46, #25, #24, #23). GitHub Releases API returns **0 published releases**.
- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed. Active main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) requires six strict checks, one approval, last-push approval, resolved review threads, deletion/non-fast-forward protection, and no bypass actors. Issues #62 and #63 are closed.

The 25-point register remains **3 Done / 15 In Progress / 7 Blocked**. External blockers remain #4 physical iPhone App Attest production entitlement; #5 Play-installed physical Android Play Integrity; #16 witnessed production backup/restore; #18 representative product-recognition benchmark and business acceptance; #21 production monitoring and alert delivery; #22 staged rollout/rollback approval; and #25 real-user pilot and business approval.

**Automated CI acceptance for exact parent HEAD 4883c65: PASSED. The documentation-only child created by this checkpoint has separate exact-head checks and is not accepted until those checks pass. Pilot/production acceptance: NOT GRANTED. Do not merge automatically or bypass required checks.**

# USEIT release and production runbook

## 1. Required CI evidence and merge gate

Before merge, require the current PR HEAD (not its parent) to pass all six ruleset contexts: CodeQL, analyze, backend, frontend, ios, and dependency-review. Confirm Validation's backend, frontend/Android, and iOS jobs all completed successfully. A successful parent commit does not validate a documentation-only child.

PR #41 also requires one human approving review, approval of the last push, and resolved review threads. Keep the PR open until those gates and the external acceptance gates below are met. Never bypass checks, weaken the ruleset, force-push, or merge automatically.

Simulator/emulator CI is not evidence of physical-device App Attest or Play Integrity. CI success is not production, store, pilot, or business approval.

## 2. Production backend configuration

Configure secrets in the hosting platform's secret manager, never in source control, committed app config, logs, or client-side EXPO_PUBLIC variables.

Required:
- USEIT_ENV=production
- OPENAI_API_KEY
- Either USEIT_API_KEY for server-to-server/legacy access or USEIT_SESSION_SECRET for server-issued sessions. Session secrets must be at least 32 characters and randomly generated.
- USEIT_CORS_ORIGINS containing explicit trusted origins; wildcard CORS is forbidden.
- USEIT_ALLOW_DOCS=false
- USEIT_RATE_LIMIT_MODE=redis
- USEIT_REDIS_URL pointing to the shared production Redis service used by every backend worker/replica. Production startup rejects process-local memory rate limiting because its counters are not shared across workers. The Redis sliding-window operation is atomic and uses Redis server time.

When session authentication is enabled:
- USEIT_ATTESTATION_MODE=required
- USEIT_ATTESTATION_APP_ID set to the platform's real app identity.
- The shared USEIT_REDIS_URL service also stores persistent challenge and attestation-key state. The normal shared Redis client uses a 2-second connection timeout and a 5-second socket timeout; readiness must not close this shared client. If the temporary fallback readiness probe client is used, it uses a 2-second connection timeout and a 2-second socket timeout and must be closed after the ping. Treat a failed readiness check as a release blocker. The in-memory challenge store is capped at 10,000 unexpired challenges and fails closed at capacity; it is for tests/local development only.
- Select USEIT_ATTESTATION_PROVIDER=apple_app_attest or google_play_integrity to match the released platform and backend deployment.

For Google Play Integrity:
- Set `EXPO_PUBLIC_GOOGLE_CLOUD_PROJECT_NUMBER` in the EAS build environment to the numeric Google Cloud project number associated with the Play Integrity API. This identifier is embedded in the client build and is not a secret; the Android client fails closed if it is missing or invalid.
- USEIT_GOOGLE_PLAY_PACKAGE_NAME must match the Android package.
- USEIT_GOOGLE_PLAY_CERT_SHA256 must contain the production Play signing certificate digest(s) returned in the Play Integrity payload.
- Set `USEIT_GOOGLE_PLAY_DEVICE_INTEGRITY` to the explicitly approved comma-separated device verdicts. The default is `MEETS_DEVICE_INTEGRITY`; do not weaken it without a documented risk decision.
- Confirm the Google service account has the required Play Integrity permission and that the production app is published through the expected Play track.

For Apple App Attest:
- The bundle identifier and team-prefixed App Attest app ID must match the Apple Developer configuration.
- Production builds must use the production App Attest entitlement and production AAGUID.
- Confirm the production Apple Developer capability is enabled for the correct App ID.

Every production deployment must use `USEIT_RATE_LIMIT_MODE=redis` and a shared Redis instance, including single-instance production deployments. Memory-mode rate limiting is permitted only for local development and automated tests; it is never an acceptable production configuration. Redis rate limiting uses one Lua operation with Redis server time, a sorted-set sliding 60-second window, atomic pruning/count/admission, and TTL assignment for the event and sequence keys. Redis connections use explicit 2-second connect and 5-second socket timeouts. If Redis is unavailable, rate limiting fails closed with HTTP 503. Set explicit rate limits and request timeouts based on observed traffic and cost.

## 3. Mobile release configuration

- [ ] Verify the bundle identifier/package name and app version (com.useit.app in the current app.json).
- [ ] Create/review the EAS production profile and configure store signing credentials in the external build service. The repository currently has no eas.json; this is an external release prerequisite.
- [ ] Use the EAS production build profile for store artifacts.
- [ ] Confirm Apple App Attest entitlement is production in production builds; never ship a production build with development attestation.
- [ ] Confirm the Android application is signed with the intended Play App Signing certificate.
- [ ] Keep provider credentials and backend secrets out of the mobile bundle.
- [ ] Test camera permission grant, denial, recovery through Settings, image capture, analysis failure, retry, product discovery, and no-results states on physical devices.
- [ ] Test on at least one supported physical iOS device and one supported physical Android device. Simulator/emulator tests do not validate hardware-backed attestation.


### Bounded staging load probe

The repository includes `scripts/load-test.mjs` for a controlled HTTP load probe. Run it only against an approved staging environment after agreeing request volume and expected thresholds with the service owner.

Example health/readiness probe:

```bash
USEIT_LOAD_BASE_URL=https://staging-api.example.com \
USEIT_LOAD_TARGET_ENV=staging \
USEIT_LOAD_APPROVED_ORIGIN=https://staging-api.example.com \
USEIT_LOAD_PATH=/ready \
USEIT_LOAD_REQUESTS=100 \
USEIT_LOAD_CONCURRENCY=5 \
node scripts/load-test.mjs
```

For POST endpoints, explicitly set `USEIT_LOAD_TEST_ALLOW_POST=YES`, provide `USEIT_LOAD_BODY_JSON`, and configure `USEIT_LOAD_API_KEY` if required. POST tests can trigger billable AI calls or state changes. The harness caps each run at 1,000 requests and concurrency at 20, reports status counts, throughput and p50/p95/max latency, and exits non-zero on any failed request. Do not treat a health-endpoint probe as evidence of AI-analysis capacity; use an approved representative payload and a cost ceiling for analysis tests.

## 4. Staged rollout

1. Deploy the exact reviewed backend commit to staging.
2. Apply required environment variables and verify the readiness endpoint.
3. Smoke-test health/readiness, authentication, attestation, image analysis, product discovery, rate limiting, and timeout/error handling.
4. Release mobile builds to internal TestFlight and Google Play internal testing first.
5. Validate sign-in/session creation, attestation on real devices, camera permissions, analysis, shopping results, and recovery after network loss.
6. Run a limited pilot. Track crash-free sessions, API error rates, p95 latency, provider failures, product-resolution success rate, rate-limit events, and per-session AI cost.
7. Expand rollout only after the pilot meets the agreed quality, reliability, and cost thresholds. Record the approval and released commit SHA.

## 5. Monitoring, privacy, and rollback

- [ ] Confirm structured logs include request IDs and status/latency but do not contain images, data URIs, API keys, bearer tokens, or raw provider responses.
- [ ] Confirm `vision_usage` events contain only the model identifier and validated prompt/completion/total token counts; establish model-specific pricing and per-session budget alerts outside the application rather than hard-coding mutable provider prices.
- [ ] Alert on sustained 5xx/429 rates, provider outages, readiness failures, unusual cost spikes, and repeated attestation failures.
- [ ] Verify backups and recovery procedures for the production datastore and shared Redis state where applicable.
- [ ] Document the on-call owner, hosting provider, alert destination, and incident escalation path before public launch.
- [ ] Keep the previous known-good backend artifact and mobile store release available for rollback.
- [ ] For a backend regression, roll back to the previous known-good artifact/configuration and verify readiness and smoke tests. Use a reviewed revert commit for source rollback; do not force-push shared release branches.
- [ ] For a mobile regression, halt staged rollout and use the store's release controls. Mobile clients generally cannot be remotely downgraded, so restore service compatibility on the backend and publish a fixed version.
- [ ] After release, review metrics and crash reports at 24 hours and 7 days; turn findings into tracked issues with owners and acceptance criteria.

## 6. Release record

Record before release:
- Release version and Git commit SHA
- CI run URLs for validation and security workflows
- Backend deployment identifier and environment
- Mobile artifact identifiers and signing/build profiles
- Attestation provider and configuration verification (never record secrets)
- Pilot start/end, acceptance results, approver, and rollback owner

This repository does not itself prove that cloud secrets, Apple/Google console settings, store signing, production hosting, monitoring, backups, or physical-device validation are configured. Those items require verification in the relevant external systems before public release.


## Repository settings required for CI

The dependency-review workflow uses GitHub's dependency graph and must not be bypassed. If it reports that dependency review is unsupported, enable **Settings → Advanced Security → Dependency graph** for this repository, then rerun the workflow for the exact release commit. Lockfile-based npm and Python audits are additional checks, not a substitute for this gate.


## Personal memory security

- Set `USEIT_MEMORY_SECRET` to a randomly generated secret of at least 32 bytes before enabling the memory API.
- Treat memory IDs as bearer capabilities: clients must generate an unpredictable URL-safe token of at least 32 characters and store it privately. Guessable IDs such as usernames are rejected.
- Personal-memory writes require a literal JSON boolean `consent: true`; coerced values such as `1` or `"true"` are not consent.


## Personal memory encryption at rest

Personal-memory values are encrypted with AES-256-GCM before SQLite persistence. The encryption key is derived with domain separation from `USEIT_MEMORY_SECRET`; keep that secret in the host's secret manager and back up the database and secret together. Existing plaintext rows are migrated transactionally on first access after upgrading. If the secret is missing/weak or ciphertext authentication fails, the memory API fails closed rather than returning plaintext or corrupt data.
