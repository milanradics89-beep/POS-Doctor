## Latest live release-watch checkpoint — 2026-11-26 09:10 CET

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

### Mainline camera/vision integration and remaining production boundary

The current main commit is `df959f270ed95f3b2a3eb4e2293b45505a074823`, with commit message **“feat: integrate camera vision and unsigned Android release”**. Its exact-head Actions inventory contains eight completed successful runs; the required Validation, CodeQL and Quality/Security workflows passed on this SHA.

Source-level integration now exists on main:
- `app/index.tsx` reads `EXPO_PUBLIC_USEIT_API_URL`, supports camera and gallery selection, normalizes selected images and sends the selected photo with the chosen intent.
- `src/core/intelligence/imageNormalization.ts` caps the normalized longest edge at 2,048 px and retries bounded encodings down to 720 px; `imageInput.ts` caps the data URL at 7.9 MB.
- The mobile API client sends a single POST attempt to `/v1/useit/analyze`; the FastAPI route calls the existing OpenAI vision adapter using strict structured output, a 35-second provider timeout and a bounded completion-token budget.
- The image is sent as request data; this integration does not add server-side image storage.

This is **source/CI integration, not end-to-end acceptance**. Issue [#303](https://github.com/milanradics89-beep/USEIT/issues/303) remains open: the App Preview reported “USEIT is not connected”, because a reachable HTTPS backend URL and live `/health`/`/ready` proof are still missing. The mobile build validator now fails closed on missing, local or non-HTTPS URLs and probes both readiness endpoints, but no deployed endpoint has been verified. Do not insert a placeholder URL or put a server secret in an `EXPO_PUBLIC_*` variable.

The requested data-store architecture is also not complete on main: `backend/personal_memory.py` still uses SQLite; `backend/rate_limit.py` and `backend/attestation_store.py` still use Redis, while the attestation module retains a bounded in-memory path for non-Redis/test operation. Firestore-backed personal memory, rate limiting and single-use attestation challenges with proven atomic TTL semantics and no production in-memory fallback are not yet accepted. PR #338 is an unmerged Firestore billable-analysis idempotency candidate and still has a Fallow blocker; it does not by itself complete those migrations.

The current Issue #74 body has **56 task checkboxes, 0 checked / 56 open** (the two checkbox examples in its status legend are excluded). Its body and historical comments were read and preserved; no task checkbox was changed.

| Candidate | Exact HEAD and exact-head workflow evidence | Review / decision |
|---|---|---|
| PR [#337](https://github.com/milanradics89-beep/USEIT/pull/337), WIF workflow | `0a907e820b396111a15f42c48ce7ce4b4053be13`; Validation [45723475105](https://github.com/milanradics89-beep/USEIT/actions/runs/45723475105), CodeQL [45723475050](https://github.com/milanradics89-beep/USEIT/actions/runs/45723475050), Dependency Review [45723475048](https://github.com/milanradics89-beep/USEIT/actions/runs/45723475048), Quality/Security [45723475166](https://github.com/milanradics89-beep/USEIT/actions/runs/45723475166): all 4 SUCCESS. Frontend, backend and iOS jobs passed; Android Release/emulator smoke and iOS simulator smoke passed. | 7/7 inline threads resolved; 5 COMMENTED reviews; no human APPROVED review. Open, non-draft; human approval remains required. |
| PR [#338](https://github.com/milanradics89-beep/USEIT/pull/338), Firestore idempotency | `809b97744abbb5075ec896d02e79b31ebd23706c`; Validation [45717661072](https://github.com/milanradics89-beep/USEIT/actions/runs/45717661072), CodeQL [45717661086](https://github.com/milanradics89-beep/USEIT/actions/runs/45717661086), Dependency Review [45717661270](https://github.com/milanradics89-beep/USEIT/actions/runs/45717661270), Quality/Security [45717661069](https://github.com/milanradics89-beep/USEIT/actions/runs/45717661069): all 4 workflow conclusions SUCCESS. Backend, frontend and iOS jobs passed. | 2/2 inline threads resolved; 2 COMMENTED reviews; no human APPROVED review; draft; `milanzoltanradics` requested. **Fallow on this exact HEAD is not clean:** its log reports `FALLOW_GATES_FAILED: audit-verdict` and CRAP findings Home 283.7, analyze 126.5, analyzeUseit 37.1 (threshold 30); `fail-on-issues: false` permits the green job conclusion. Stacked child PR #339 addresses the changed Home path; it is not merged. |
| PR [#339](https://github.com/milanradics89-beep/USEIT/pull/339), Home analysis refactor stacked on PR #338 | `707b4bbd7163aa36e73ca8fb2210cca2cb1e7d81`; Validation [45743545603](https://github.com/milanradics89-beep/USEIT/actions/runs/45743545603), CodeQL [45743545596](https://github.com/milanradics89-beep/USEIT/actions/runs/45743545596), Dependency Review [45743545518](https://github.com/milanradics89-beep/USEIT/actions/runs/45743545518), Quality/Security [45743545623](https://github.com/milanradics89-beep/USEIT/actions/runs/45743545623): all 4 SUCCESS. Frontend, backend and iOS passed; Fallow's changed-file audit reports `FALLOW_GATES_PASSED: audit-verdict` with no failed gates. | 13 commits / 7 files; base is PR #338's branch, not main; draft; CodeRabbit and Codex reviewed exact HEAD and reported no major issues; no formal review submissions or inline threads; `milanzoltanradics` requested; no human approval. `fail-on-issues: false` remains on this stacked candidate. |
| PR [#333](https://github.com/milanradics89-beep/USEIT/pull/333), fail-closed security gates | `f0c7d4561f449ce640bcaa813e84d0bd0a5b275e`; Validation [45748693636](https://github.com/milanradics89-beep/USEIT/actions/runs/45748693636), CodeQL [45748693477](https://github.com/milanradics89-beep/USEIT/actions/runs/45748693477), Dependency Review [45748693458](https://github.com/milanradics89-beep/USEIT/actions/runs/45748693458), Quality/Security [45748693481](https://github.com/milanradics89-beep/USEIT/actions/runs/45748693481): all 4 SUCCESS. Required frontend job 139670943787 passed Fallow with `fail-on-issues: true` and `FALLOW_GATES_PASSED: audit-verdict`; Semgrep `--error` also passed in that required job; the exact invocation is `semgrep scan --config p/ci --error --metrics=off /src`. Quality/Security separately runs Gitleaks and zizmor. | 1/1 inline thread resolved; 1 COMMENTED CodeRabbit review; Codex reviewed exact HEAD and found no major issues; CodeRabbit manual review request was rate-limited; `milanzoltanradics` requested; no human APPROVED review. Open, non-draft. Preferred enforcement candidate, not current-main behavior until merged. |
| PR [#314](https://github.com/milanradics89-beep/USEIT/pull/314), SURPRISE contrast | Exact HEAD `bf8cadbc5e2298ba230c73a40abd0d251df37c0d`; exact-head Actions lookup returned **0 workflow runs**. | Source applies the contrast overrides to all four visible SURPRISE elements and adds a token-based WCAG test. Open/non-draft, but 0 formal reviews, 0 inline threads and no exact-head Validation/CodeQL/Dependency Review evidence; not accepted. |

PR #337's WIF test parses YAML structurally and checks the exact trigger, permission map, job set, action pins, step set and complete shell command scalar; its seven review threads are resolved. PR #338's Firestore readiness probe verifies transactional write capability and ownership-checked cleanup in `finally`, but its exact-head Fallow audit still reports the three CRAP findings above. Stacked PR #339 extracts Home analysis orchestration into focused helpers with regression coverage; its exact-head Validation, CodeQL, Dependency Review and Quality/Security pass, and its changed-file Fallow audit passes, but it is based on PR #338 and remains draft/unapproved. PR #333's newer exact HEAD `f0c7d456` has fail-closed Fallow and Semgrep inside the required frontend job; its exact-head audit and Semgrep checks pass. None of these candidates is merged or human-approved.

The current main `.github/workflows/validate.yml` still does not contain the fail-closed Fallow/Semgrep enforcement from PR #333. Its updated exact HEAD `f0c7d4561f449ce640bcaa813e84d0bd0a5b275e` passes Fallow (`fail-on-issues: true`, exact `pass` verdict) and Semgrep (`--error`) inside the required frontend job, but that candidate is not yet merged. Do not treat PR #338's green Quality/Security conclusion as proof that Fallow passed.

### PR #340 — synchronized release records candidate

PR [#340](https://github.com/milanradics89-beep/USEIT/pull/340) remains OPEN/DRAFT on `docs/release-evidence-current-main-20261126-run11`, based on main `df959f270ed95f3b2a3eb4e2293b45505a074823`. Pre-write HEAD and live branch ref were `5a303b564bf4275469d154f0fbd4868918c5e96d`; the PR had 7 commits and 4 changed files. The three main-branch release documents still carry the older 2026-11-13 18:49 CET checkpoint.

The preceding validated child `768e1d018bba7d5c1cdaaf2310a98fd086014473` is a **new child of validated parent `790dcceedeb554638325f8127c68fe2a347c6e20`**. Its successful exact-head results are historical evidence only and are not transferred to the pre-write HEAD `5a303b564bf4275469d154f0fbd4868918c5e96d` or to this new checkpoint child.

Superseded earlier PR #340 child `5d026cb62e0626e59e3fdf686fca0e7f6981d780` had four exact-head workflows, all terminal SUCCESS:
- Validation [45743617132](https://github.com/milanradics89-beep/USEIT/actions/runs/45743617132): SUCCESS.
- CodeQL [45743617056](https://github.com/milanradics89-beep/USEIT/actions/runs/45743617056): SUCCESS.
- Dependency Review [45743617033](https://github.com/milanradics89-beep/USEIT/actions/runs/45743617033): SUCCESS.
- Quality/Security [45743617016](https://github.com/milanradics89-beep/USEIT/actions/runs/45743617016): SUCCESS.

Superseded previous child `790dcceedeb554638325f8127c68fe2a347c6e20` had:
- Validation [45759191651](https://github.com/milanradics89-beep/USEIT/actions/runs/45759191651): FAILURE. Backend and iOS jobs passed; frontend failed one release-checkpoint assertion after **395 passed / 1 failed** across 81 files. The assertion expected a shortened Semgrep command instead of the exact command used by PR #333. This was a documentation/test-contract mismatch, not an application-source failure.
- CodeQL [45759191640](https://github.com/milanradics89-beep/USEIT/actions/runs/45759191640): SUCCESS.
- Dependency Review [45759191636](https://github.com/milanradics89-beep/USEIT/actions/runs/45759191636): SUCCESS.
- Quality/Security [45759191631](https://github.com/milanradics89-beep/USEIT/actions/runs/45759191631): Fallow, Semgrep, Gitleaks and zizmor jobs concluded SUCCESS. Fallow recorded empty `FALLOW_GATES_FAILED` and `FALLOW_GATES_PASSED: audit-verdict`, but its input was `fail-on-issues: false`; this docs-only result does not fix PR #338's separate Fallow failure.

The preceding child `768e1d018bba7d5c1cdaaf2310a98fd086014473` had **all four exact-head workflows are terminal SUCCESS**:
- Validation [45764030850](https://github.com/milanradics89-beep/USEIT/actions/runs/45764030850): frontend [139720508108](https://github.com/milanradics89-beep/USEIT/actions/runs/45764030850/job/139720508108), backend [139720507945](https://github.com/milanradics89-beep/USEIT/actions/runs/45764030850/job/139720507945), and iOS [139720507653](https://github.com/milanradics89-beep/USEIT/actions/runs/45764030850/job/139720507653) all SUCCESS. Frontend logs show **396 passed across 81 test files**, Expo Doctor **21/21**, and Android emulator install/launch smoke passed. The iOS Validation job also completed successfully.
- CodeQL [45764030788](https://github.com/milanradics89-beep/USEIT/actions/runs/45764030788): analyze job [139720507522](https://github.com/milanradics89-beep/USEIT/actions/runs/45764030788/job/139720507522) SUCCESS.
- Dependency Review [45764030857](https://github.com/milanradics89-beep/USEIT/actions/runs/45764030857): dependency-review job [139720507391](https://github.com/milanradics89-beep/USEIT/actions/runs/45764030857/job/139720507391) SUCCESS. This documentation/test-only diff does not constitute a repository-wide dependency or security-alert inventory.
- Quality/Security [45764030833](https://github.com/milanradics89-beep/USEIT/actions/runs/45764030833): Fallow [139720507494](https://github.com/milanradics89-beep/USEIT/actions/runs/45764030833/job/139720507494), zizmor [139720507607](https://github.com/milanradics89-beep/USEIT/actions/runs/45764030833/job/139720507607), Gitleaks [139720507652](https://github.com/milanradics89-beep/USEIT/actions/runs/45764030833/job/139720507652), and Semgrep [139720507764](https://github.com/milanradics89-beep/USEIT/actions/runs/45764030833/job/139720507764) all SUCCESS. Fallow's exact log has empty `FALLOW_GATES_FAILED` and `FALLOW_GATES_PASSED: audit-verdict`, but its action input remains `fail-on-issues: false`. This changed-file documentation audit does not repair PR #338's separate fail-open Fallow finding.

Immediately before this checkpoint commit, PR #340 exact HEAD `5a303b564bf4275469d154f0fbd4868918c5e96d` had:
- Validation [45774286476](https://github.com/milanradics89-beep/USEIT/actions/runs/45774286476): FAILURE. Frontend job [139754071184](https://github.com/milanradics89-beep/USEIT/actions/runs/45774286476/job/139754071184) failed one release-evidence assertion after **395 passed / 1 failed** across 81 test files. Backend [139754071973](https://github.com/milanradics89-beep/USEIT/actions/runs/45774286476/job/139754071973) and iOS [139754071964](https://github.com/milanradics89-beep/USEIT/actions/runs/45774286476/job/139754071964) passed.
- CodeQL [45774286247](https://github.com/milanradics89-beep/USEIT/actions/runs/45774286247), analyze job [139754071459](https://github.com/milanradics89-beep/USEIT/actions/runs/45774286247/job/139754071459): SUCCESS.
- Dependency Review [45774286475](https://github.com/milanradics89-beep/USEIT/actions/runs/45774286475), job [139754070955](https://github.com/milanradics89-beep/USEIT/actions/runs/45774286475/job/139754070955): SUCCESS.
- Quality/Security [45774286453](https://github.com/milanradics89-beep/USEIT/actions/runs/45774286453): Gitleaks [139754071814](https://github.com/milanradics89-beep/USEIT/actions/runs/45774286453/job/139754071814), Semgrep [139754072077](https://github.com/milanradics89-beep/USEIT/actions/runs/45774286453/job/139754072077), zizmor [139754072279](https://github.com/milanradics89-beep/USEIT/actions/runs/45774286453/job/139754072279) and Fallow [139754072383](https://github.com/milanradics89-beep/USEIT/actions/runs/45774286453/job/139754072383) all concluded SUCCESS.

The Validation failure was a documentation/test-contract mismatch: the checkpoint test expected the historical `5d026cb` SHA and its four exact-head run IDs, but that verified history had been omitted from the three release records. This checkpoint restores the historical evidence rather than deleting or weakening the assertion. The new child commit created by this update has its own separate exact-head Validation, CodeQL, Dependency Review and Quality/Security gate; none of the `5a303b5` or older child results is transferred to it.

PR #340 has **0 formal review submissions and 0 inline review threads**. It remains draft/open with `milanzoltanradics` requested; no human APPROVED review is recorded. CodeRabbit automatic review is skipped because the repository has fewer than 10 stars. Human review remains required.

The current branch's three release documents share an identical 09:10 CET checkpoint and the 25-row register. The current branch blob SHAs before this checkpoint refresh were Runbook `7db3f721979ab83e28916be2c788876d6319887a`, Pilot Acceptance `c5ed2f4d74c4efe5a6965a6759c5b3a660ab8af6`, and Backlog `69e35f4d6e53f0e37deb7ef3c34093c655c876b2`. The main versions remain stale until this PR is reviewed and integrated.

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
| 24 | Release pipeline | **In Progress** | PR #337/#338/#339/#333 exact-head workflow sets passed, but #338 retains the Fallow false-green blocker and #339 remains stacked/unapproved. PR #340 pre-write HEAD `5a303b564bf4275469d154f0fbd4868918c5e96d` had Validation failure [45774286476] (frontend 395 passed / 1 failed), while CodeQL [45774286247], Dependency Review [45774286475] and Quality/Security [45774286453] succeeded. This new checkpoint child needs its own exact-head CI; signing, store distribution, rollout and rollback remain outstanding. |
| 25 | Pilot/business validation | **Blocked** | Requires real-user cohort, measurable acceptance criteria, participant safeguards and explicit business sign-off. |

**External blockers remain #4, #5, #16, #18, #21, #22 and #25.** No external console setup, physical-device test, production cloud access, witnessed backup/restore, staged rollout approval or real-user/business acceptance is claimed.

**Release decision: NOT READY. Production/pilot acceptance: NOT GRANTED.**

---

## Latest acceptance checkpoint — 2026-11-13 18:49 CET

**Pilot/production acceptance: NOT GRANTED.**

Immediately before the current integration commit, PR #41 exact HEAD was `b793a47f8f0a84155d1200fc797f191701f4eb92`. Its exact-head Validation [#43463804114](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43463804114) failed in the frontend job after 285/285 unit tests passed. Expo Doctor passed 20/21 checks but reported four Expo SDK 57 patch mismatches. Backend and iOS Validation jobs passed; CodeQL [#43463804128](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43463804128) and Dependency Review [#43463804149](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43463804149) passed on that exact pre-integration HEAD.

The remediation candidate in draft PR [#65](https://github.com/milanradics89-beep/POS-Doctor/pull/65), exact HEAD `678fe7fde32f4dc785288d5a8ac939f1ac6478f0`, passed its own Validation [#43452488602](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43452488602), CodeQL [#43452493289](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43452493289), and Dependency Review [#43452488754](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43452488754). Its tested dependency, workflow, and regression-test changes are included in this integration commit. **The integration commit has a new exact-head CI gate and is not accepted until all required checks pass for that resulting SHA.** Parent and candidate CI results are not substituted for the integration commit's own results. PR #65 remains draft/open and has not been merged.

PR #41 remains open and unmerged. Its current review inventory before this integration was 22/22 inline threads resolved, 25 review submissions, and **0 human APPROVED**. The active main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) requires six strict status checks, one approving review, approval of the last push, and resolved review threads. Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed.

Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains open. DNS-pinning PR #70 and redirect-chain fix PR #79 each passed their own exact-head Validation, CodeQL, and Dependency Review. Human review and integration are still required; no production deployment or exploit is claimed.

The repository has **0 published GitHub releases**. Code Scanning, Dependabot, and Secret Scanning alert inventories are **unverified, not zero** because the connected integration does not expose those endpoints.

### External acceptance requirements remain blocked

- **#4 App Attest:** production Apple App ID/capability and provisioning entitlement, signed production build, and provider-backed enrollment/assertion test on a supported physical iPhone.
- **#5 Play Integrity:** Play internal-track distribution, Play App Signing identity, Google Cloud service-account/API permissions, and verification on a physical Android installed from Play.
- **#16 Backup/restore:** witnessed production backup and restore with measured recovery point and recovery time.
- **#18 Product accuracy:** representative labelled dataset, measured accuracy, human evaluation, and business acceptance.
- **#21 Monitoring:** production metrics/log pipeline, named on-call owner, and verified alert delivery/acknowledgement.
- **#22 Rollout:** approved staged rollout gates, monitoring thresholds, named rollback owner, and tested rollback.
- **#25 Pilot:** real-user cohort, measured acceptance criteria, participant safeguards, and business sign-off.

The 25-point register remains **3 Done / 15 In Progress / 7 Blocked**. Simulator/emulator evidence does not satisfy physical-device, production, backup/restore, monitoring, rollout, pilot, or business acceptance.

---

## Latest acceptance checkpoint — 2026-11-11 21:40 CET

**Automated CI acceptance for validated parent PR #41 HEAD 4883c652d61b93236b7a604f124bf5708caa07e6: PASSED. The documentation-only child created by this checkpoint has its own exact-head CI gate. Pilot/production acceptance: NOT GRANTED.**

PR #41 remains open, unmerged, and non-draft on fix/release-blockers-2026-10, targeting main.

### Exact-head automated evidence for parent 4883c65

All three required workflows completed successfully for the same exact SHA:

- Validation [#43090044324](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044324):
  - Backend [130764391957](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044324/job/130764391957): success.
  - Frontend/Android [130764391800](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044324/job/130764391800): success, including unit tests, pinned Expo Doctor, Android export/Release build, emulator install/launch smoke, and runtime dependency audit.
  - iOS [130764391399](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044324/job/130764391399): Release simulator build and install/launch smoke passed.
- CodeQL [#43090044306](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044306), analyze [130764391156](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044306/job/130764391156): success.
- Dependency Review [#43090044397](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044397), job [130764390843](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044397/job/130764390843): success; no high-or-higher vulnerable package in the reviewed diff and no denied package.

The unchanged validated source/test baseline 2faa49c records 450 backend tests, 27 production-readiness checks, 78 security/privacy checks, 285 frontend tests across 58 files, Expo Doctor 21/21, Android Release/emulator smoke, and iOS Release simulator/smoke. Those detailed counts belong to the unchanged source/test baseline; the exact 4883c65 documentation descendant independently reran all three workflows successfully.

### Remaining dependency and security findings

- Runtime npm audit: four moderate transitive glob/minimatch findings; no high-or-higher finding at the configured high threshold.
- Dependency Review metadata: unknown license metadata for vendor/deepmerge@4.3.2; Scorecard results below threshold for @expo/devcert (2.9) and is-mergeable-object (1.5).
- CodeQL succeeded with a previously observed non-fatal SARIF column-kind mismatch warning.
- Code Scanning, Dependabot, and Secret Scanning alert inventories remain **unverified, not zero** because the connected integration does not expose their alert endpoints.

### Review and governance

- The Codex review of 4883c65 raised two P2 documentation findings. This child restores the operational release procedures and distinguishes the validated parent from the new documentation HEAD; both corresponding threads are resolved after the push.
- At pre-write capture: 20 inline threads total, 18 resolved and 2 open; 24 review submissions, 0 APPROVED. A fresh Codex review is requested for this documentation child. Human approving review and last-push approval remain mandatory.
- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed. Active main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) enforces six strict checks, one approval, last-push approval, resolved-thread enforcement, deletion/non-fast-forward protection, and no bypass actors.
- Main HEAD: 7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0. The release branch was 512 commits ahead and 0 behind immediately before this documentation-only child.
- Repository inventory: 32 branches, 19 open PRs, 4 open non-PR issues (#46, #25, #24, #23). GitHub Releases API returns 0 published releases.

### External acceptance requirements

- **#4 App Attest:** Apple production App ID/capability and provisioning entitlement, signed production build, and supported physical iPhone enrollment/assertion test.
- **#5 Play Integrity:** Google Play internal-track distribution, Play App Signing certificate identity, Google Cloud service-account/API permissions, and verification on a physical Android installed from Play.
- **#16 Backup/restore:** witnessed production backup and restore with documented recovery point and recovery time.
- **#18 Product accuracy:** representative labelled image dataset, measured accuracy, human evaluation, and business acceptance.
- **#21 Monitoring:** production metrics/log pipeline, named on-call owner, and verified alert delivery/acknowledgement.
- **#22 Rollout:** approved staged rollout gates, monitoring thresholds, named rollback owner, and tested rollback.
- **#25 Pilot:** real-user pilot cohort, measured acceptance criteria, participant safeguards, and business sign-off.

The repository currently has no eas.json; a reviewed EAS production build profile and external store-signing configuration must be created before store artifacts can be treated as ready. Simulator/emulator evidence does not satisfy physical-device, production, backup/restore, monitoring, rollout, pilot, or business acceptance.

**Automated CI acceptance for exact parent 4883c65: PASSED. The new documentation child remains a separate CI gate. Pilot/production acceptance: NOT GRANTED. Do not merge automatically or bypass required checks.**
