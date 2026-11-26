## Latest live release-watch checkpoint — 2026-11-26 08:12 CET

**Canonical repository:** [milanradics89-beep/USEIT](https://github.com/milanradics89-beep/USEIT) (the legacy POS-Doctor repository path resolves here).  
**Current main:** `df959f270ed95f3b2a3eb4e2293b45505a074823`.  
**Release decision: NOT READY. Production/pilot acceptance: NOT GRANTED.**

### PR #41 — merged release-blocker baseline

PR [#41](https://github.com/milanradics89-beep/USEIT/pull/41) is **CLOSED/MERGED** on `fix/release-blockers-2026-10`. Its exact HEAD is `68b380e73ca3c870048035197beef8febbf90ef1`; the live branch ref matches that SHA. Merge commit: `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`.

GitHub's branch comparison against current main reports 517 commits ahead / 33 behind, merge base `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0`, 100 changed files, +11,887 / -2,005. The retained branch comparison does not mean the PR is unmerged.

Exact-head required workflows for `68b380e73ca3c870048035197beef8febbf90ef1` are terminal SUCCESS:
- Validation [43492153234](https://github.com/milanradics89-beep/USEIT/actions/runs/43492153234): frontend [132115828836](https://github.com/milanradics89-beep/USEIT/actions/runs/43492153234/job/132115828836), backend [132115829214](https://github.com/milanradics89-beep/USEIT/actions/runs/43492153234/job/132115829214), and iOS [132115829399](https://github.com/milanradics89-beep/USEIT/actions/runs/43492153234/job/132115829399) all SUCCESS.
- CodeQL [43492153161](https://github.com/milanradics89-beep/USEIT/actions/runs/43492153161): analyze job SUCCESS.
- Dependency Review [43492153021](https://github.com/milanradics89-beep/USEIT/actions/runs/43492153021): dependency-review job SUCCESS.

PR #41's refreshed discussion inventory is 109 combined timeline records: 53 conversation comments, 30 inline review comments and 26 formal review submissions (25 COMMENTED, one APPROVED). All 22/22 inline threads are resolved; 20 are outdated. The sole APPROVED review is by `tarlaci1984-sketch`, has an empty body, and does not establish independent security-owner acceptance. The PR description is stale and still describes the PR as open/unmerged with an old SHA; live GitHub metadata is authoritative.

Three historical runs remain QUEUED with zero jobs on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`: Validation [43098210284](https://github.com/milanradics89-beep/USEIT/actions/runs/43098210284), CodeQL [43098210473](https://github.com/milanradics89-beep/USEIT/actions/runs/43098210473), and Dependency Review [43098210255](https://github.com/milanradics89-beep/USEIT/actions/runs/43098210255). They are not current-HEAD failures or successes. Administrator cancellation remains outstanding.

### Current main and open engineering candidates

Main's exact-head Actions inventory contains eight completed successful runs on `df959f270ed95f3b2a3eb4e2293b45505a074823`: main push [45664648186](https://github.com/milanradics89-beep/USEIT/actions/runs/45664648186), Validation [45664649912](https://github.com/milanradics89-beep/USEIT/actions/runs/45664649912), CodeQL [45664649859](https://github.com/milanradics89-beep/USEIT/actions/runs/45664649859), and Code Quality/Security [45664649952](https://github.com/milanradics89-beep/USEIT/actions/runs/45664649952). Validation frontend/backend/iOS all passed. Four dependency-update runs on the same main SHA also passed: [45664944154](https://github.com/milanradics89-beep/USEIT/actions/runs/45664944154), [45664919031](https://github.com/milanradics89-beep/USEIT/actions/runs/45664919031), [45664918007](https://github.com/milanradics89-beep/USEIT/actions/runs/45664918007), and [45664913984](https://github.com/milanradics89-beep/USEIT/actions/runs/45664913984). The main push run set does not include a separate Dependency Review push workflow.

| Candidate | Exact HEAD and exact-head workflow evidence | Review / decision |
|---|---|---|
| PR [#337](https://github.com/milanradics89-beep/USEIT/pull/337), WIF workflow | `0a907e820b396111a15f42c48ce7ce4b4053be13`; Validation [45723475105](https://github.com/milanradics89-beep/USEIT/actions/runs/45723475105), CodeQL [45723475050](https://github.com/milanradics89-beep/USEIT/actions/runs/45723475050), Dependency Review [45723475048](https://github.com/milanradics89-beep/USEIT/actions/runs/45723475048), Quality/Security [45723475166](https://github.com/milanradics89-beep/USEIT/actions/runs/45723475166): all 4 SUCCESS. Frontend, backend and iOS jobs passed; Android Release/emulator smoke and iOS simulator smoke passed. | 7/7 inline threads resolved; 5 COMMENTED reviews; no human APPROVED review. Open, non-draft; human approval remains required. |
| PR [#338](https://github.com/milanradics89-beep/USEIT/pull/338), Firestore idempotency | `809b97744abbb5075ec896d02e79b31ebd23706c`; Validation [45717661072](https://github.com/milanradics89-beep/USEIT/actions/runs/45717661072), CodeQL [45717661086](https://github.com/milanradics89-beep/USEIT/actions/runs/45717661086), Dependency Review [45717661270](https://github.com/milanradics89-beep/USEIT/actions/runs/45717661270), Quality/Security [45717661069](https://github.com/milanradics89-beep/USEIT/actions/runs/45717661069): all 4 workflow conclusions SUCCESS. Backend, frontend and iOS jobs passed. | 2/2 inline threads resolved; 2 COMMENTED reviews; no human APPROVED review; draft; `milanzoltanradics` requested. **Fallow on this exact HEAD is not clean:** its log reports `FALLOW_GATES_FAILED: audit-verdict` and CRAP findings Home 283.7, analyze 126.5, analyzeUseit 37.1 (threshold 30); `fail-on-issues: false` permits the green job conclusion. Stacked child PR #339 addresses the changed Home path; it is not merged. |
| PR [#339](https://github.com/milanradics89-beep/USEIT/pull/339), Home analysis refactor stacked on PR #338 | `707b4bbd7163aa36e73ca8fb2210cca2cb1e7d81`; Validation [45743545603](https://github.com/milanradics89-beep/USEIT/actions/runs/45743545603), CodeQL [45743545596](https://github.com/milanradics89-beep/USEIT/actions/runs/45743545596), Dependency Review [45743545518](https://github.com/milanradics89-beep/USEIT/actions/runs/45743545518), Quality/Security [45743545623](https://github.com/milanradics89-beep/USEIT/actions/runs/45743545623): all 4 SUCCESS. Frontend, backend and iOS passed; Fallow's changed-file audit reports `FALLOW_GATES_PASSED: audit-verdict` with no failed gates. | 13 commits / 7 files; base is PR #338's branch, not main; draft; CodeRabbit and Codex reviewed exact HEAD and reported no major issues; no formal review submissions or inline threads; `milanzoltanradics` requested; no human approval. `fail-on-issues: false` remains on this stacked candidate. |
| PR [#333](https://github.com/milanradics89-beep/USEIT/pull/333), fail-closed security gates | `f0c7d4561f449ce640bcaa813e84d0bd0a5b275e`; Validation [45748693636](https://github.com/milanradics89-beep/USEIT/actions/runs/45748693636), CodeQL [45748693477](https://github.com/milanradics89-beep/USEIT/actions/runs/45748693477), Dependency Review [45748693458](https://github.com/milanradics89-beep/USEIT/actions/runs/45748693458), Quality/Security [45748693481](https://github.com/milanradics89-beep/USEIT/actions/runs/45748693481): all 4 SUCCESS. Required frontend job 139670943787 passed Fallow with `fail-on-issues: true` and `FALLOW_GATES_PASSED: audit-verdict`; Semgrep `--error` also passed in that required job; the exact invocation is `semgrep scan --config p/ci --error --metrics=off /src`. Quality/Security separately runs Gitleaks and zizmor. | 1/1 inline thread resolved; 1 COMMENTED CodeRabbit review; Codex reviewed exact HEAD and found no major issues; CodeRabbit manual review request was rate-limited; `milanzoltanradics` requested; no human APPROVED review. Open, non-draft. Preferred enforcement candidate, not current-main behavior until merged. |

PR #337's WIF test parses YAML structurally and checks the exact trigger, permission map, job set, action pins, step set and complete shell command scalar; its seven review threads are resolved. PR #338's Firestore readiness probe verifies transactional write capability and ownership-checked cleanup in `finally`, but its exact-head Fallow audit still reports the three CRAP findings above. Stacked PR #339 extracts Home analysis orchestration into focused helpers with regression coverage; its exact-head Validation, CodeQL, Dependency Review and Quality/Security pass, and its changed-file Fallow audit passes, but it is based on PR #338 and remains draft/unapproved. PR #333's newer exact HEAD `f0c7d456` has fail-closed Fallow and Semgrep inside the required frontend job; its exact-head audit and Semgrep checks pass. None of these candidates is merged or human-approved.

The current main `.github/workflows/validate.yml` still does not contain the fail-closed Fallow/Semgrep enforcement from PR #333. Its updated exact HEAD `f0c7d4561f449ce640bcaa813e84d0bd0a5b275e` passes Fallow (`fail-on-issues: true`, exact `pass` verdict) and Semgrep (`--error`) inside the required frontend job, but that candidate is not yet merged. Do not treat PR #338's green Quality/Security conclusion as proof that Fallow passed.

### PR #340 — synchronized release records candidate

PR [#340](https://github.com/milanradics89-beep/USEIT/pull/340) remains OPEN/DRAFT on `docs/release-evidence-current-main-20261126-run11`, based on current main `df959f270ed95f3b2a3eb4e2293b45505a074823`. Its current exact HEAD is `768e1d018bba7d5c1cdaaf2310a98fd086014473`; the live branch reference matches. GitHub comparison reports **6 commits ahead / 0 behind main**, 4 changed files, +405 / 0 deletions. The four paths are the three release records and `scripts/release-evidence-current-checkpoint.test.mjs`. The PR has 6 commits and 4 changed files. This checkpoint is synchronized at 2026-11-26 08:12 CET; the three main-branch release documents still carry the older 2026-11-13 18:49 CET checkpoint.

The current commit `768e1d018bba7d5c1cdaaf2310a98fd086014473` is a **new child of validated parent `790dcceedeb554638325f8127c68fe2a347c6e20`**. The current exact-head results below belong to `768e1d0`; no parent or prior-child result is transferred.

Superseded previous child `790dcceedeb554638325f8127c68fe2a347c6e20` had:
- Validation [45759191651](https://github.com/milanradics89-beep/USEIT/actions/runs/45759191651): FAILURE. Backend and iOS jobs passed; frontend failed one release-checkpoint assertion after **395 passed / 1 failed** across 81 files. The assertion expected a shortened Semgrep command instead of the exact command used by PR #333. This was a documentation/test-contract mismatch, not an application-source failure.
- CodeQL [45759191640](https://github.com/milanradics89-beep/USEIT/actions/runs/45759191640): SUCCESS.
- Dependency Review [45759191636](https://github.com/milanradics89-beep/USEIT/actions/runs/45759191636): SUCCESS.
- Quality/Security [45759191631](https://github.com/milanradics89-beep/USEIT/actions/runs/45759191631): Fallow, Semgrep, Gitleaks and zizmor jobs concluded SUCCESS. Fallow recorded empty `FALLOW_GATES_FAILED` and `FALLOW_GATES_PASSED: audit-verdict`, but its input was `fail-on-issues: false`; this docs-only result does not fix PR #338's separate Fallow failure.

The new exact-head workflows for `768e1d018bba7d5c1cdaaf2310a98fd086014473` are **all four exact-head workflows are terminal SUCCESS**:
- Validation [45764030850](https://github.com/milanradics89-beep/USEIT/actions/runs/45764030850): frontend [139720508108](https://github.com/milanradics89-beep/USEIT/actions/runs/45764030850/job/139720508108), backend [139720507945](https://github.com/milanradics89-beep/USEIT/actions/runs/45764030850/job/139720507945), and iOS [139720507653](https://github.com/milanradics89-beep/USEIT/actions/runs/45764030850/job/139720507653) all SUCCESS. Frontend logs show **396 passed across 81 test files**, Expo Doctor **21/21**, and Android emulator install/launch smoke passed. The iOS Validation job also completed successfully.
- CodeQL [45764030788](https://github.com/milanradics89-beep/USEIT/actions/runs/45764030788): analyze job [139720507522](https://github.com/milanradics89-beep/USEIT/actions/runs/45764030788/job/139720507522) SUCCESS.
- Dependency Review [45764030857](https://github.com/milanradics89-beep/USEIT/actions/runs/45764030857): dependency-review job [139720507391](https://github.com/milanradics89-beep/USEIT/actions/runs/45764030857/job/139720507391) SUCCESS. This documentation/test-only diff does not constitute a repository-wide dependency or security-alert inventory.
- Quality/Security [45764030833](https://github.com/milanradics89-beep/USEIT/actions/runs/45764030833): Fallow [139720507494](https://github.com/milanradics89-beep/USEIT/actions/runs/45764030833/job/139720507494), zizmor [139720507607](https://github.com/milanradics89-beep/USEIT/actions/runs/45764030833/job/139720507607), Gitleaks [139720507652](https://github.com/milanradics89-beep/USEIT/actions/runs/45764030833/job/139720507652), and Semgrep [139720507764](https://github.com/milanradics89-beep/USEIT/actions/runs/45764030833/job/139720507764) all SUCCESS. Fallow's exact log has empty `FALLOW_GATES_FAILED` and `FALLOW_GATES_PASSED: audit-verdict`, but its action input remains `fail-on-issues: false`. This changed-file documentation audit does not repair PR #338's separate fail-open Fallow finding.

PR #340 has **0 formal review submissions and 0 inline review threads**. It remains draft/open with `milanzoltanradics` requested; no human APPROVED review is recorded. CodeRabbit automatic review is skipped because the repository has fewer than 10 stars. Human review remains required.

The current branch's three release documents share an identical 08:12 CET checkpoint and the 25-row register. The current branch blob SHAs before this checkpoint refresh were Runbook `7db3f721979ab83e28916be2c788876d6319887a`, Pilot Acceptance `c5ed2f4d74c4efe5a6965a6759c5b3a660ab8af6`, and Backlog `69e35f4d6e53f0e37deb7ef3c34093c655c876b2`. The main versions remain stale until this PR is reviewed and integrated.

### Release-document candidates and repository governance

Older documentation candidates are not authoritative: PR [#204](https://github.com/milanradics89-beep/USEIT/pull/204) is based on stale main `252cb529`, HEAD `554eef67b851c1e48981b7d41ad039328a4bcc85`, and its latest recorded Validation [45615659033](https://github.com/milanradics89-beep/USEIT/actions/runs/45615659033) failed in frontend unit tests; CodeQL [45615658913](https://github.com/milanradics89-beep/USEIT/actions/runs/45615658913) and Dependency Review [45615658898](https://github.com/milanradics89-beep/USEIT/actions/runs/45615658898) succeeded. PR #233 is also based on stale main `3a262358` at HEAD `1f21b900c44194739ae6c85f171c3dd657c9fc84`. This new checkpoint is based on current main `df959f270ed95f3b2a3eb4e2293b45505a074823`.

Issue [#47](https://github.com/milanradics89-beep/USEIT/issues/47) is CLOSED with 11 comments. Its latest Nov 18 governance comment is consistent with current API evidence: the main branch object reports `protected: true`, and ruleset [#26370589](https://github.com/milanradics89-beep/USEIT/rules/26370589) is active. The ruleset detail confirms: six strict required checks (CodeQL, backend, frontend, iOS, analyze, dependency-review), one approving review, stale approval dismissal, last-push approval, resolved review threads, deletion/non-fast-forward protection, and no bypass actors. The separate branch-protection detail endpoint returns 403 to this integration; the active ruleset detail and protected main-branch object are the current verified evidence.

Issue [#64](https://github.com/milanradics89-beep/USEIT/issues/64) remains OPEN with 139 comments (last updated 2026-11-24). DNS-pinned outbound transport is integrated through merged PR #200. PR [#99](https://github.com/milanradics89-beep/USEIT/pull/99) remains OPEN/DRAFT at HEAD `f91c70d2636948e538f8e3559afc39cd93eb5139` on stale base `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`; its review inventory is 4 COMMENTED and 1 APPROVED by `milanzoltanradics`, with 2/2 inline threads resolved. The issue's latest acceptance checkpoint still requires a named independent authorized security-owner sign-off, so that approval is not treated as sufficient by itself. Production NAT64/DNS64 prefix inventory, verified deployed `USEIT_NAT64_PREFIXES`, and staging/production egress evidence remain outstanding.

GitHub Releases API: **0 published releases**. Code Scanning, Dependabot and Secret Scanning alert inventories are **UNVERIFIED, NOT EMPTY** because the connected GitHub integration does not expose those endpoints.

### 25-point release register — current status

**3 Done / 15 In Progress / 7 Blocked.** No status is promoted by another branch's CI, emulator/simulator evidence, or unverified production configuration.

| # | Workstream | Status | Current evidence / remaining acceptance |
|---:|---|---|---|
| 1 | iOS CI closure | **Done** | PR #41 exact-head iOS job 132115829399 passed simulator build/smoke; physical App Attest remains separate item #4. |
| 2 | Main branch protection | **Done** | Issue #47 closed; active ruleset #26370589 enforces six strict checks and review protections. |
| 3 | Dependency Review warnings | **In Progress** | PR #41, #337, #338, #339, #333 and #340 exact-head Dependency Review runs passed; PR #340's docs-only diff had no scanned dependency files. Security alert inventories remain unverified, not zero, and dependency metadata/runtime follow-up remains. |
| 4 | Physical iPhone App Attest production entitlement | **Blocked** | Requires Apple production capability/provisioning, signed production build and provider-backed verification on a supported physical iPhone. |
| 5 | Play-installed physical Android Play Integrity | **Blocked** | Requires Play internal-track distribution, Play App Signing identity, GCP permissions and verification on a physical Android installed from Play. |
| 6 | Redis multi-instance concurrency | **Done** | PR #41 exact-head backend job 132115829214 passed; production Redis endpoint/TLS/configuration still needs environment evidence. |
| 7 | Attestation retry/network/expiry | **In Progress** | Automated expiry, challenge, timeout and retry coverage exists; physical provider-backed verification remains. |
| 8 | Backend production security audit | **In Progress** | Main backend CI passed; production secrets, ingress/CORS, provider identity, live Redis TLS and host hardening remain unverified. |
| 9 | Privacy and logging audit | **In Progress** | Automated tests pass; production log sink, retention, ingress/access logs and operator access remain unverified. |
| 10 | Release acceptance evidence | **In Progress** | PR #41 exact-head CI is green; production acceptance and independent security-owner approval are not granted. |
| 11 | Mobile regression | **In Progress** | PR #337 Android Release/emulator and iOS simulator checks passed; physical-device verification remains under #4/#5. |
| 12 | Camera/image processing | **In Progress** | Image-contract and mobile regression coverage exists; representative physical capture and real-photo coverage remain. |
| 13 | Offline/weak network | **In Progress** | Abort/deadline/retry tests exist; real interruption and reconnect recovery need device/staging evidence. |
| 14 | API timeout/retry and billable idempotency | **In Progress** | PR #338 Firestore idempotency passed exact-head CI but its Fallow audit still reports the three CRAP findings; stacked PR #339 refactors the affected Home path and its own changed-file Fallow audit passes. Both remain unmerged; production Firestore/IAM/secret configuration is unverified. |
| 15 | Backend load test | **In Progress** | Guarded harness exists; execute only against owner-approved staging with agreed thresholds and recorded results. |
| 16 | Backup/restore | **Blocked** | Requires witnessed production backup/restore with measured recovery point and recovery time. |
| 17 | AI cost optimization | **In Progress** | Shared client, bounded retries and usage telemetry exist; provider-cost reconciliation and production cost alerts remain. |
| 18 | Product-recognition accuracy | **Blocked** | Requires representative labelled dataset, agreed metrics, human evaluation and business acceptance. |
| 19 | AI fallback | **In Progress** | Conservative fallback code/tests exist; provider-outage behavior and quality need staging evidence. |
| 20 | UI loading/empty/error/permission regression | **In Progress** | PR #339 adds focused Home analysis orchestration helpers and regression tests; its exact-head frontend/Android and iOS checks pass. Full state matrix and physical-device validation remain. |
| 21 | Monitoring/alerting | **Blocked** | Requires production monitoring, alert destination, named on-call owner and witnessed alert delivery. |
| 22 | Staged rollout | **Blocked** | Requires approved rollout/stop thresholds, named rollback owner and tested rollback procedure. |
| 23 | Analytics | **In Progress** | Token/model telemetry exists; product funnel, retention, dashboard validation and data-governance approval remain. |
| 24 | Release pipeline | **In Progress** | PR #337, #338, #339 and #333 exact-head workflow sets passed. PR #340 current exact HEAD `768e1d018bba7d5c1cdaaf2310a98fd086014473` passed its own Validation [45764030850], CodeQL [45764030788], Dependency Review [45764030857] and Quality/Security [45764030833]; frontend recorded 396 tests across 81 files, Expo Doctor 21/21 and Android emulator smoke success, and the iOS job passed. Signing, store distribution, rollout and rollback remain outstanding. |
| 25 | Pilot/business validation | **Blocked** | Requires real-user cohort, measurable acceptance criteria, participant safeguards and explicit business sign-off. |

**External blockers remain #4, #5, #16, #18, #21, #22 and #25.** No external console setup, physical-device test, production cloud access, witnessed backup/restore, staged rollout approval or real-user/business acceptance is claimed.

**Release decision: NOT READY. Production/pilot acceptance: NOT GRANTED.**

---

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
