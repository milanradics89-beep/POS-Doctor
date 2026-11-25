## Latest live release-watch checkpoint — 2026-11-25 10:27 CET

This checkpoint supersedes the 08:14 CET snapshot. It records fresh GitHub metadata, exact-head Actions runs and jobs, branch refs and comparison, PR discussion/review inventories, issue records, complete branch pagination, active ruleset, release inventory and the three release documents. It records repository evidence only; it does not grant production, store, pilot or business acceptance.

### Repository and governance

- The former milanradics89-beep/POS-Doctor path redirects to milanradics89-beep/USEIT; repository ID 1246135116 is unchanged and visibility is public.
- Main HEAD is 252cb529e9fdb0cf7ef05bbb25a29ec94fca1cfc. Main package metadata and lockfile resolve Expo 57.0.34 and minimatch 11.0.5.
- Protect-main ruleset [#26370589](https://github.com/milanradics89-beep/USEIT/rules/26370589) is ACTIVE: strict CodeQL, backend, frontend, ios, analyze and dependency-review checks; one approving review; last-push approval; stale-review dismissal; resolved review threads; deletion and non-fast-forward protection; no bypass actors.
- Fully paginated branch inventory: **286 (100 + 100 + 86; page 4 empty)**. GitHub Releases API returned **0 published releases**.
- Code Scanning, Dependabot and Secret Scanning alert inventories remain **UNVERIFIED, NOT EMPTY**. Their endpoints are unavailable through the connected integration; successful CodeQL and Dependency Review runs do not establish an empty repository-wide alert inventory.

### PR #41 — merged source baseline

- PR #41 is CLOSED/MERGED on fix/release-blockers-2026-10. Live PR metadata and independent branch ref agree on exact HEAD 68b380e73ca3c870048035197beef8febbf90ef1; merge commit f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1. It contains 517 commits, 100 changed files, +11,887 additions and -2,005 deletions. Compared with main, the retained branch is DIVERGED: 517 ahead / 18 behind. It is already merged and must not be merged again.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/USEIT/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/USEIT/actions/runs/43492153161) and Dependency Review [43492153021](https://github.com/milanradics89-beep/USEIT/actions/runs/43492153021) are terminal SUCCESS on that exact SHA. Frontend, backend, iOS, CodeQL Analyze and Dependency Review passed (5/5 jobs).
- Review inventory: 109 timeline records; 53 conversation comments; 30 inline review comments; 26 formal submissions (25 COMMENTED and one APPROVED by tarlaci1984-sketch); 22/22 inline threads resolved; 0 unresolved; 20 outdated. The sole approval has an empty body and is not independent security-owner or production acceptance.
- Historical runs [43098210284](https://github.com/milanradics89-beep/USEIT/actions/runs/43098210284), [43098210473](https://github.com/milanradics89-beep/USEIT/actions/runs/43098210473) and [43098210255](https://github.com/milanradics89-beep/USEIT/actions/runs/43098210255) remain QUEUED on obsolete SHA b46c5b8082ecbebd263a86cd53b1321a86e570d1; each jobs endpoint returns zero jobs. These are historical queues, not current-head failures; repository-administrator cancellation is required.
- PR #41's description retains superseded historical open/unmerged wording and an old HEAD. Live metadata and the independent branch ref are authoritative.

### PR #305 — Expo SDK 57.0.34 merged

- PR #305 is CLOSED/MERGED. Source HEAD b0af4e7d43acdb0ccaa809899f43d96d47712748; merge commit and current main HEAD 252cb529e9fdb0cf7ef05bbb25a29ec94fca1cfc.
- Exact-source Validation [45521231491](https://github.com/milanradics89-beep/USEIT/actions/runs/45521231491), CodeQL [45521231436](https://github.com/milanradics89-beep/USEIT/actions/runs/45521231436) and Dependency Review [45521231462](https://github.com/milanradics89-beep/USEIT/actions/runs/45521231462) passed. Post-merge main Validation [45524790576](https://github.com/milanradics89-beep/USEIT/actions/runs/45524790576), CodeQL [45524790560](https://github.com/milanradics89-beep/USEIT/actions/runs/45524790560) and dynamic prebuild [45524790755](https://github.com/milanradics89-beep/USEIT/actions/runs/45524790755) passed. Expo 57.0.34 is merged and post-merge validated; register item #3 is DONE.

### PR #288 and PR #249

- PR #288 is OPEN/non-draft on feat/phase2-camera-openai-guardrails-expo57-20261124. Exact HEAD 77e964b91aca17bf42fddf6bf69639f24733b86b; 12 commits, 11 changed files, +295 / -35; base main 252cb529. Exact-head Validation [45532871751](https://github.com/milanradics89-beep/USEIT/actions/runs/45532871751), CodeQL [45532871933](https://github.com/milanradics89-beep/USEIT/actions/runs/45532871933) and Dependency Review [45532871944](https://github.com/milanradics89-beep/USEIT/actions/runs/45532871944) passed. Five reviews exist (three APPROVED, two DISMISSED), all by milanzoltanradics; no fresh independent security-owner approval. Its PR description's older HEAD db37acaa is stale.
- PR #249 is OPEN/DRAFT at exact HEAD e89ca4d78082ef8df447388223a62fc8ae7ee95d, based on fix/expo-sdk57-package-alignment-main-20261123-1754. Validation [45461939876](https://github.com/milanradics89-beep/USEIT/actions/runs/45461939876) is terminal FAILURE at Expo Doctor 20/21; CodeQL [45461940145](https://github.com/milanradics89-beep/USEIT/actions/runs/45461940145) and Dependency Review [45461940144](https://github.com/milanradics89-beep/USEIT/actions/runs/45461940144) passed. The PR description's claim of HEAD b3533ca and 3/3 successful workflows is stale.

### PR #204 — release-documentation candidate

- PR #204 is OPEN/DRAFT on docs/release-evidence-current-main-20261120-run11, based on main 252cb529e9fdb0cf7ef05bbb25a29ec94fca1cfc. Current exact HEAD f9c9a8ad2208db5312804dbc58c538f9553ec95d; 33 commits, 4 changed files, +2,478 / -13.
- Exact-head Validation [45567377367](https://github.com/milanradics89-beep/USEIT/actions/runs/45567377367) is terminal FAILURE; CodeQL [45567377260](https://github.com/milanradics89-beep/USEIT/actions/runs/45567377260) and Dependency Review [45567377312](https://github.com/milanradics89-beep/USEIT/actions/runs/45567377312) are terminal SUCCESS. Frontend: FAILURE (341 passed / 5 failed across 74 files); Backend: SUCCESS; iOS: SUCCESS. The five failures are stale release-evidence assertions: branch count, PR #249 Markdown formatting, PR #204's old HEAD/workflow claim, and PR #320's code-formatted deleted-test path.
- The previous exact HEAD d3d532182b26f0d3c024dfadca5cddbda95a0797 passed all three exact-head workflows (Validation [45557201551](https://github.com/milanradics89-beep/USEIT/actions/runs/45557201551), CodeQL [45557201495](https://github.com/milanradics89-beep/USEIT/actions/runs/45557201495), Dependency Review [45557201514](https://github.com/milanradics89-beep/USEIT/actions/runs/45557201514)); all five jobs passed. No parent result is reused for f9c9a8ad.
- PR #204 has 6 conversation comments, 0 inline threads and 0 formal review submissions. tarlaci1984-sketch is requested; no approval is recorded. Its three release-record files are byte-identical at the 08:14 checkpoint, but stale against the current 10:27 evidence. Main's copies remain historical at 2026-11-13 18:49 CET. No merge has occurred.

### PR #313, #319 and #320 — security/release candidates

- PR #313 exact HEAD 59b9bc6dc614564126aac484f249f957d61c469b passed Validation [45532619165](https://github.com/milanradics89-beep/USEIT/actions/runs/45532619165), CodeQL [45532619204](https://github.com/milanradics89-beep/USEIT/actions/runs/45532619204), Dependency Review [45532619548](https://github.com/milanradics89-beep/USEIT/actions/runs/45532619548) and Quality/Security [45532619354](https://github.com/milanradics89-beep/USEIT/actions/runs/45532619354). It is not merged.
- PR #319 exact HEAD 6a937425ea4d3763ab4555e8bf09f61c5a1797c2 passed Validation [45545777077](https://github.com/milanradics89-beep/USEIT/actions/runs/45545777077), CodeQL [45545777202](https://github.com/milanradics89-beep/USEIT/actions/runs/45545777202) and Dependency Review [45545776953](https://github.com/milanradics89-beep/USEIT/actions/runs/45545776953). This does not establish an actual Codemagic artifact or physical-device acceptance.
- PR #320 exact HEAD e2bac14104ab112108b4a91f138c3eb3de7b7ca2 passed Validation [45546055534](https://github.com/milanradics89-beep/USEIT/actions/runs/45546055534), CodeQL [45546055447](https://github.com/milanradics89-beep/USEIT/actions/runs/45546055447), Dependency Review [45546055514](https://github.com/milanradics89-beep/USEIT/actions/runs/45546055514) and Quality/Security [45546055455](https://github.com/milanradics89-beep/USEIT/actions/runs/45546055455). Semgrep, Gitleaks, Fallow and zizmor passed. The patch deletes scripts/expo-sdk57-lock-refresh.test.mjs (110 lines, 11 existing regression cases); preserve or migrate all 11 existing regression cases before integration. The >30-commit Gitleaks fixture remains unexercised and Fallow is informational (fail-on-issues=false). Do not merge as-is.

### PR #321–#326 — unsigned APK and camera integration

- PR #321 exact HEAD 2fdb8894f67a40171fe858ee01acd9c0e81c5d5f: Validation [45554749062](https://github.com/milanradics89-beep/USEIT/actions/runs/45554749062) terminal FAILURE (360 passed / 1 failed) because the workflow-contract test expects apksigner inline in YAML while execution is delegated to a script; CodeQL [45554749356](https://github.com/milanradics89-beep/USEIT/actions/runs/45554749356) and Dependency Review [45554749051](https://github.com/milanradics89-beep/USEIT/actions/runs/45554749051) passed.
- PR #322 exact HEAD aee4f500b233d31cab4eb73c9b3a1bf92b33d6db: Validation [45554864698](https://github.com/milanradics89-beep/USEIT/actions/runs/45554864698) terminal FAILURE; Gradle produced the release APK but apksigner evidence did not prove signer absence. CodeQL [45554864646](https://github.com/milanradics89-beep/USEIT/actions/runs/45554864646) and Dependency Review [45554864669](https://github.com/milanradics89-beep/USEIT/actions/runs/45554864669) passed.
- PR #323 exact HEAD 95fa71a9a3b8bebfe0ed9b31923fa9dc05cc0b90: Validation [45562801531](https://github.com/milanradics89-beep/USEIT/actions/runs/45562801531) terminal FAILURE; CodeQL [45562801514](https://github.com/milanradics89-beep/USEIT/actions/runs/45562801514) and Dependency Review [45562801542](https://github.com/milanradics89-beep/USEIT/actions/runs/45562801542) passed. The apksigner output contained DOES NOT VERIFY and ERROR: Missing META-INF/MANIFEST.MF, but did not independently prove signer absence.
- PR #324 exact HEAD bb5907d3c75ff50aa8b819fd2487ee693c5fce8b passed Validation [45563830049](https://github.com/milanradics89-beep/USEIT/actions/runs/45563830049), CodeQL [45563830003](https://github.com/milanradics89-beep/USEIT/actions/runs/45563830003) and Dependency Review [45563829997](https://github.com/milanradics89-beep/USEIT/actions/runs/45563829997). Android emulator smoke, backend and iOS jobs passed.
- PR #325 exact HEAD b9bc12963166f1fb22c2c5068aaed5b395987203, based on PR #323 exact HEAD 95fa71a9a3b8bebfe0ed9b31923fa9dc05cc0b90, passed Validation [45569681415](https://github.com/milanradics89-beep/USEIT/actions/runs/45569681415), CodeQL [45569681087](https://github.com/milanradics89-beep/USEIT/actions/runs/45569681087) and Dependency Review [45569681152](https://github.com/milanradics89-beep/USEIT/actions/runs/45569681152). Validation frontend, backend and iOS jobs passed; frontend ran 365 tests across 76 files. Android Release BUILD SUCCESSFUL; apksigner reported DOES NOT VERIFY / Missing META-INF/MANIFEST.MF and the structural verifier confirmed no v1 signature entries or v2/v3 APK Signing Block. 0 formal reviews and 0 inline threads.
- PR #326 exact HEAD 63e7c57381db6856328e354032a57662e75845c7 is a clean main-based integration snapshot on integrate/camera-unsigned-apk-mainline-20261125, based on main 252cb529e9fdb0cf7ef05bbb25a29ec94fca1cfc. Its own exact-head Validation [45577240833](https://github.com/milanradics89-beep/USEIT/actions/runs/45577240833), CodeQL [45577240879](https://github.com/milanradics89-beep/USEIT/actions/runs/45577240879) and Dependency Review [45577240825](https://github.com/milanradics89-beep/USEIT/actions/runs/45577240825) all passed; frontend, backend and iOS jobs passed, including 365 frontend tests across 76 files and the Android Release structural unsigned-APK verifier. PR remains OPEN/DRAFT with 0 formal reviews and 0 inline threads. The GitHub Actions artifact is not a Codemagic build artifact; physical-device and store-distribution acceptance remain separate.

### Issues, SSRF and release acceptance

- Issue [#47](https://github.com/milanradics89-beep/USEIT/issues/47) is CLOSED with 11 comments. Active ruleset #26370589 verifies main protection.
- Issue [#64](https://github.com/milanradics89-beep/USEIT/issues/64) remains OPEN with 139 comments. PR #200 is CLOSED/MERGED with DNS-pinned outbound transport in main (source HEAD fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a; merge commit 3a262358552a9650d865aa5bd3c92905f1e863cb). Production acceptance remains BLOCKED pending independent authorized security-owner approval, complete production NAT64/DNS64 prefix inventory, verification of deployed USEIT_NAT64_PREFIXES, and staging/production egress evidence.
- Security alert inventories remain UNVERIFIED, NOT EMPTY; published GitHub Releases: 0.

### Canonical candidate 25-point release register

The candidate row-level register contains exactly 25 items and is **3 Done / 14 In Progress / 8 Blocked**. Main's separate historical register remains **3 Done / 15 In Progress / 7 Blocked**; the two registers are not silently merged.

| # | Workstream | Status | Evidence / next gate |
|---:|---|---|---|
| 1 | iOS CI closure | **Done** | PR #41 exact-head iOS Release build and simulator smoke passed. Physical iPhone acceptance remains separate item #4. |
| 2 | Main branch protection and durable visibility decision | **Blocked** | Active ruleset is verified, but the owner's durable public/private visibility and release-plan decision is not recorded. |
| 3 | Dependency review and Expo SDK alignment | **Done** | PR #305 merged Expo 57.0.34 to main at 252cb529. Its exact source HEAD b0af4e7 passed Validation, CodeQL and Dependency Review; post-merge main Validation, CodeQL and dynamic prebuild passed. |
| 4 | Physical iPhone App Attest production entitlement | **Blocked** | Requires production Apple App ID/capability and provisioning entitlement, signed production build, and provider-backed verification on a supported physical iPhone. |
| 5 | Play-installed physical Android Play Integrity | **Blocked** | Requires Play internal-track distribution, Play App Signing identity, Google Cloud service-account/API permissions, and verification on a physical Android installed from Play. |
| 6 | Redis multi-instance concurrency | **Done** | Merged PR #41 backend validation passed shared-Redis/multi-client and separate-worker challenge-consumption regression coverage. Production Redis endpoint/TLS configuration remains an environment gate. |
| 7 | Attestation retry/network/expiry | **In Progress** | Automated expiry, missing/non-integer challenge, transport failure and retry coverage exists. Physical provider-backed device/network verification remains open. |
| 8 | Backend production security audit | **In Progress** | DNS-pinned SSRF transport is merged; independent security-owner approval, production NAT64/DNS64 inventory, deployed prefix configuration, egress evidence, secrets and host hardening remain. |
| 9 | Privacy and logging audit | **In Progress** | Automated security/privacy tests pass; production log sink, ingress/access logs, retention and operator access remain unverified. |
| 10 | Release acceptance evidence | **In Progress** | PR #204 exact HEAD f9c9a8ad2208db5312804dbc58c538f9553ec95d has terminal Validation FAILURE: frontend 341 passed / 5 failed across 74 files; backend and iOS passed. CodeQL and Dependency Review passed. Previous exact HEAD d3d532182b26f0d3c024dfadca5cddbda95a0797 passed all three required workflows. The three release records remain byte-identical at the 08:14 checkpoint but are stale against current branch inventory and PR state. PR remains draft with 6 conversation comments, 0 inline threads and 0 formal reviews; tarlaci1984-sketch is requested. External acceptance remains outstanding. |
| 11 | Mobile regression | **In Progress** | PR #288 exact HEAD 77e964b91aca passed Validation, CodeQL and Dependency Review. Clean main-based PR #326 exact HEAD 63e7c57381db independently passed all three required workflows and includes the camera/OpenAI integration. Physical-device camera, App Attest and Play Integrity validation remain. |
| 12 | Camera/image processing | **In Progress** | PR #326 includes camera flow and bounded image normalization; its exact-head frontend, backend and iOS jobs passed. Representative physical capture, real-photo coverage and device camera/gallery acceptance remain. |
| 13 | Offline/weak network | **In Progress** | Abort/deadline/retry and provider transport-failure tests exist. Real network interruption and reconnect recovery need device/staging evidence. |
| 14 | API timeout/retry | **In Progress** | Bounded request deadlines and explicit retry controls exist. Real network interruption and backend-enforced POST idempotency remain unproven. |
| 15 | Backend load test | **In Progress** | Guarded load-test harness exists. Execute only against owner-approved staging with agreed thresholds and recorded results. |
| 16 | Backup/restore | **Blocked** | Requires production datastore/Redis access and a witnessed restore/recovery drill with measured RPO/RTO. |
| 17 | AI cost optimization | **In Progress** | Shared client, bounded retries and token/model telemetry exist. Pricing inputs, per-session budgets, provider-cost reconciliation and production cost alerts remain. |
| 18 | Product-recognition accuracy | **Blocked** | Requires a representative labeled dataset, agreed accuracy metrics, human evaluation and explicit business acceptance. |
| 19 | AI fallback | **In Progress** | Conservative scene/no-candidate fallback code and tests exist. Provider-outage behavior and fallback quality need staging evidence. |
| 20 | UI loading/empty/error/permission regression | **In Progress** | Automated permission and UI-state coverage exists; the full physical-device loading/empty/error/permission matrix remains. |
| 21 | Monitoring/alerting | **Blocked** | Requires production monitoring workspace, alert destination, named on-call owner, configured thresholds and witnessed alert delivery. |
| 22 | Staged rollout | **Blocked** | Requires production approval, TestFlight/Play track access, documented rollout/stop thresholds and a named rollback owner with tested rollback. |
| 23 | Analytics | **In Progress** | Token/model usage telemetry exists; product funnel, retention, dashboard validation and production data-governance approval remain. |
| 24 | Release pipeline | **In Progress** | PR #325 exact HEAD b9bc12963166 passed Validation, CodeQL and Dependency Review; its Android Release APK passed structural checks for v1 signature entries and v2/v3 signing blocks (365 frontend tests across 76 files). Main-based PR #326 exact HEAD 63e7c57381db independently passed 3/3 workflows and the same APK structural proof. PR #321 Validation failed on a workflow-test assertion (360 passed / 1 failed); PR #322 and #323 failed closed because signer absence was not proven; PR #324 exact head passed 3/3. PR #320 still deletes scripts/expo-sdk57-lock-refresh.test.mjs; preserve or migrate all 11 existing regression cases before integration. Actual Codemagic artifact, physical-device/store distribution, staged rollout and rollback remain open. |
| 25 | Pilot/business validation | **Blocked** | Requires a real pilot cohort, success/stop thresholds, named business owner and explicit business/release approval. |

### Release decision

**Release decision: NOT READY.**

**Production/pilot acceptance: NOT GRANTED.**

External blockers #2, #4, #5, #16, #18, #21, #22 and #25 remain Blocked. No external console setup, physical-device verification, production cloud access, witnessed backup/restore, staged rollout approval or real-user/business acceptance is inferred from GitHub CI.

---

## Latest live release-watch checkpoint — 2026-11-25 08:14 CET

This checkpoint supersedes the 06:52 CET snapshot. It is based on fresh PR metadata, independent branch refs, exact-HEAD workflow runs and jobs, review submissions and threads, issue records, complete branch pagination, the active main ruleset, package manifests/lockfile, and the GitHub Releases endpoint. It records repository evidence only; it does not grant production, store, pilot, or business acceptance.

### Repository and governance

- The former `milanradics89-beep/POS-Doctor` path redirects to `milanradics89-beep/USEIT`; GitHub repository ID **1246135116** is unchanged. The repository is public.
- Current main HEAD is `252cb529e9fdb0cf7ef05bbb25a29ec94fca1cfc`. Main package metadata and lockfile resolve Expo 57.0.34 and minimatch 11.0.5.
- Protect-main ruleset [#26370589](https://github.com/milanradics89-beep/USEIT/rules/26370589) remains ACTIVE. It requires strict CodeQL, backend, frontend, ios, analyze and dependency-review checks; one approving review; last-push approval; stale-review dismissal; resolved review threads; deletion and non-fast-forward protection; and no bypass actors.
- The fully paginated branch inventory is **283** (100 + 100 + 83; page 4 empty). GitHub Releases API returned **0 published releases**.
- Code Scanning, Dependabot and Secret Scanning alert inventories remain **UNVERIFIED, NOT EMPTY**. Their endpoints are unavailable through the connected integration; successful CodeQL or Dependency Review runs do not establish an empty repository-wide alert inventory.

### PR #41 — merged source baseline

- PR #41 is CLOSED/MERGED on `fix/release-blockers-2026-10`. Live PR metadata and the independent branch ref agree on exact source HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge commit `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. It contains 517 commits, 100 changed files, +11,887 additions and -2,005 deletions. Compared with current main, the retained source branch is DIVERGED: 517 ahead / 18 behind. It is already merged and must not be merged again.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/USEIT/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/USEIT/actions/runs/43492153161) and Dependency Review [43492153021](https://github.com/milanradics89-beep/USEIT/actions/runs/43492153021) are terminal SUCCESS on that exact SHA. Frontend, backend, iOS, CodeQL Analyze and Dependency Review all passed (5/5 jobs).
- Review inventory: 109 timeline records; 53 conversation comments; 30 inline review comments; 26 formal submissions (25 COMMENTED and one APPROVED by `tarlaci1984-sketch`); 22/22 inline threads resolved; 0 unresolved; 20 outdated. The single approval has an empty body and is not independent security-owner or production acceptance.
- Historical runs [43098210284](https://github.com/milanradics89-beep/USEIT/actions/runs/43098210284), [43098210473](https://github.com/milanradics89-beep/USEIT/actions/runs/43098210473) and [43098210255](https://github.com/milanradics89-beep/USEIT/actions/runs/43098210255) remain QUEUED on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`; each jobs endpoint returns zero jobs. These are historical queues, not current-head failures. Repository-administrator cancellation is required.
- PR #41's description retains superseded historical open/unmerged wording and an old HEAD; live metadata and the independent branch ref are authoritative.

### PR #305 — Expo SDK 57.0.34 alignment merged

- PR #305 is CLOSED/MERGED. Source HEAD `b0af4e7d43acdb0ccaa809899f43d96d47712748`; merge commit and current main HEAD `252cb529e9fdb0cf7ef05bbb25a29ec94fca1cfc`. It changed package.json and package-lock.json.
- Exact-source Validation [45521231491](https://github.com/milanradics89-beep/USEIT/actions/runs/45521231491), CodeQL [45521231436](https://github.com/milanradics89-beep/USEIT/actions/runs/45521231436) and Dependency Review [45521231462](https://github.com/milanradics89-beep/USEIT/actions/runs/45521231462) are terminal SUCCESS on the exact source SHA.
- Post-merge main Validation [45524790576](https://github.com/milanradics89-beep/USEIT/actions/runs/45524790576), CodeQL [45524790560](https://github.com/milanradics89-beep/USEIT/actions/runs/45524790560) and dynamic prebuild [45524790755](https://github.com/milanradics89-beep/USEIT/actions/runs/45524790755) are terminal SUCCESS on main. Frontend, backend, iOS, CodeQL Analyze and dynamic prebuild passed. A separate push-triggered Dependency Review on the merge commit was not found; the PR source exact-head Dependency Review did pass.
- Expo 57.0.34 is merged and post-merge validated. Candidate register item #3 is DONE.

### PR #288 — camera/OpenAI integration candidate

- PR #288 is OPEN and non-draft on `feat/phase2-camera-openai-guardrails-expo57-20261124`. Exact HEAD `77e964b91aca17bf42fddf6bf69639f24733b86b`; 12 commits, 11 changed files, +295 / -35. Base is current main `252cb529e9fdb0cf7ef05bbb25a29ec94fca1cfc`; comparison is 12 ahead / 0 behind.
- Exact-head Validation [45532871751](https://github.com/milanradics89-beep/USEIT/actions/runs/45532871751), CodeQL [45532871933](https://github.com/milanradics89-beep/USEIT/actions/runs/45532871933) and Dependency Review [45532871944](https://github.com/milanradics89-beep/USEIT/actions/runs/45532871944) are terminal SUCCESS on that exact SHA. Frontend, backend and iOS jobs passed.
- Five formal reviews exist: three APPROVED and two DISMISSED, all by `milanzoltanradics`; zero inline threads. These are not independent security-owner approvals. The PR description still reports older HEAD `db37acaa` and is stale. No merge has occurred.

### PR #249 — older stacked Expo candidate

- PR #249 is OPEN/DRAFT on `fix/pr233-live-checkpoint-refresh-20261123-1150`, based on `fix/expo-sdk57-package-alignment-main-20261123-1754`. Exact HEAD `e89ca4d78082ef8df447388223a62fc8ae7ee95d`; 47 commits, 5 changed files, +4,553 / -17; comparison is DIVERGED, 47 ahead / 1 behind.
- Exact-head Validation [45461939876](https://github.com/milanradics89-beep/USEIT/actions/runs/45461939876) is terminal FAILURE at Expo Doctor (20/21); backend and iOS passed. Android export, Android Release/emulator smoke and runtime dependency audit were skipped after the failure. CodeQL [45461940145](https://github.com/milanradics89-beep/USEIT/actions/runs/45461940145) and Dependency Review [45461940144](https://github.com/milanradics89-beep/USEIT/actions/runs/45461940144) are terminal SUCCESS on that same SHA.
- The PR description's claim of HEAD `b3533ca` and 3/3 successful workflows is stale and does not describe the current branch. PR #305's mainline dependency update does not automatically update this stacked branch.

### PR #204 — current-main release-documentation candidate

- PR #204 is OPEN/DRAFT on `docs/release-evidence-current-main-20261120-run11`, based on current main `252cb529e9fdb0cf7ef05bbb25a29ec94fca1cfc`. Current exact HEAD `d3d532182b26f0d3c024dfadca5cddbda95a0797`; 32 commits, 4 changed files, +2,100 / -13; comparison is 32 ahead / 0 behind.
- Exact-head Validation [45557201551](https://github.com/milanradics89-beep/USEIT/actions/runs/45557201551), CodeQL [45557201495](https://github.com/milanradics89-beep/USEIT/actions/runs/45557201495) and Dependency Review [45557201514](https://github.com/milanradics89-beep/USEIT/actions/runs/45557201514) are terminal SUCCESS on this exact SHA. All five jobs passed: frontend, backend, iOS, CodeQL Analyze and Dependency Review.
- The previous exact HEAD `e2b077f30c45386d142881932ce2fae7e40a7707` had Validation FAILURE (343 passed / 2 failed across 74 files); both failures were documentation-contract assertions for stale PR #249 wording and Markdown-linked issue status. Those assertions were corrected in `d3d5321` without deleting, skipping or weakening tests.
- PR #204 has 6 conversation comments, 0 inline threads and 0 formal review submissions. Reviewer `tarlaci1984-sketch` is requested; no approval is recorded. The three release-record files on this branch have identical latest checkpoint sections. Main's copies remain historical and are not edited directly. No merge has occurred.

### PR #313 — security workflow review remediation

- PR #313 is OPEN on `fix/security-review-findings-20261125`, based on PR #309's security-tool activation branch. Exact HEAD `59b9bc6dc614564126aac484f249f957d61c469b`.
- Exact-head Validation [45532619165](https://github.com/milanradics89-beep/USEIT/actions/runs/45532619165), CodeQL [45532619204](https://github.com/milanradics89-beep/USEIT/actions/runs/45532619204), Dependency Review [45532619548](https://github.com/milanradics89-beep/USEIT/actions/runs/45532619548) and Quality/Security [45532619354](https://github.com/milanradics89-beep/USEIT/actions/runs/45532619354) are terminal SUCCESS on that exact SHA. This branch is not merged into main.

### PR #319 — unsigned Android APK verification candidate

- PR #319 is OPEN/DRAFT on `fix/unsigned-apk-current-camera-20261125`, based on PR #288 exact HEAD `77e964b91aca17bf42fddf6bf69639f24733b86b`. Exact HEAD `6a937425ea4d3763ab4555e8bf09f61c5a1797c2`; one commit, 5 changed files, +346 / 0 deletions.
- Exact-head Validation [45545777077](https://github.com/milanradics89-beep/USEIT/actions/runs/45545777077), CodeQL [45545777202](https://github.com/milanradics89-beep/USEIT/actions/runs/45545777202) and Dependency Review [45545776953](https://github.com/milanradics89-beep/USEIT/actions/runs/45545776953) are terminal SUCCESS. The candidate checks fail-closed Gradle signing configuration and explicit signer absence.
- No actual Codemagic artifact or physical-device acceptance is established. GitHub CI is not Codemagic acceptance.

### PR #320 — hardened quality/security workflow candidate

- PR #320 is OPEN/DRAFT on `ci/security-workflows-mainline-20261125`, based on current main. Exact HEAD `e2bac14104ab112108b4a91f138c3eb3de7b7ca2`; one commit, 12 changed files, +295 / -358.
- Exact-head Validation [45546055534](https://github.com/milanradics89-beep/USEIT/actions/runs/45546055534), CodeQL [45546055447](https://github.com/milanradics89-beep/USEIT/actions/runs/45546055447), Dependency Review [45546055514](https://github.com/milanradics89-beep/USEIT/actions/runs/45546055514) and Quality/Security [45546055455](https://github.com/milanradics89-beep/USEIT/actions/runs/45546055455) are terminal SUCCESS on that exact SHA. Semgrep Community, Gitleaks, Fallow and zizmor jobs passed.
- The patch deletes `scripts/expo-sdk57-lock-refresh.test.mjs` (110 lines containing 11 existing regression cases) while adding a two-case `legacy-workflow-boundary.test.mjs`. This violates the no-test-deletion rule: preserve or migrate all 11 existing regression cases before integration. Do not merge as-is. The greater-than-30-commit Gitleaks fixture remains unexercised; Fallow uses `fail-on-issues: false` and is informational. PR #320 has 0 formal reviews and 0 inline threads.

### PRs #321–#324 — current unsigned-APK and app-integration candidates

- PR #321 exact HEAD `2fdb8894f67a40171fe858ee01acd9c0e81c5d5f`: Validation [45554749062](https://github.com/milanradics89-beep/USEIT/actions/runs/45554749062) is terminal FAILURE on attempt 2 because `scripts/unsigned-apk-validation-workflow.test.mjs:21` expects the apksigner command inline in the workflow YAML, while the workflow delegates it to a script. The frontend suite reported 360 passed / 1 failed; backend and iOS passed. CodeQL [45554749356](https://github.com/milanradics89-beep/USEIT/actions/runs/45554749356) and Dependency Review [45554749051](https://github.com/milanradics89-beep/USEIT/actions/runs/45554749051) are terminal SUCCESS.
- PR #322 exact HEAD `aee4f500b233d31cab4eb73c9b3a1bf92b33d6db`: Validation [45554864698](https://github.com/milanradics89-beep/USEIT/actions/runs/45554864698) is terminal FAILURE on attempt 2 at native Android Release verification. Gradle successfully produced the release APK, but the apksigner output did not prove signer absence. CodeQL [45554864646](https://github.com/milanradics89-beep/USEIT/actions/runs/45554864646) and Dependency Review [45554864669](https://github.com/milanradics89-beep/USEIT/actions/runs/45554864669) are terminal SUCCESS.
- PR #323 exact HEAD `95fa71a9a3b8bebfe0ed9b31923fa9dc05cc0b90`: CodeQL [45562801514](https://github.com/milanradics89-beep/USEIT/actions/runs/45562801514) and Dependency Review [45562801542](https://github.com/milanradics89-beep/USEIT/actions/runs/45562801542) are terminal SUCCESS; Validation [45562801531](https://github.com/milanradics89-beep/USEIT/actions/runs/45562801531) remains IN PROGRESS in the native Android Release build. Do not claim it passed.
- PR #324 exact HEAD `bb5907d3c75ff50aa8b819fd2487ee693c5fce8b`: CodeQL [45563830003](https://github.com/milanradics89-beep/USEIT/actions/runs/45563830003) and Dependency Review [45563829997](https://github.com/milanradics89-beep/USEIT/actions/runs/45563829997) are terminal SUCCESS; Validation [45563830049](https://github.com/milanradics89-beep/USEIT/actions/runs/45563830049) remains IN PROGRESS at Android emulator smoke. Do not claim it passed.

### Issues, SSRF and release acceptance

- Issue [#47](https://github.com/milanradics89-beep/USEIT/issues/47) is CLOSED with 11 comments. Active ruleset #26370589 directly verifies main protection.
- Issue [#64](https://github.com/milanradics89-beep/USEIT/issues/64) remains OPEN with 139 comments; last updated 2026-11-24. PR #200 is CLOSED/MERGED with DNS-pinned outbound transport in main (source HEAD `fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a`; merge commit `3a262358552a9650d865aa5bd3c92905f1e863cb`). Production acceptance remains BLOCKED pending independent authorized security-owner approval, complete production NAT64/DNS64 prefix inventory, verification of deployed `USEIT_NAT64_PREFIXES`, and staging/production egress evidence.
- Code Scanning, Dependabot and Secret Scanning alert inventories remain **UNVERIFIED, NOT EMPTY** because their endpoints are unavailable through the connected integration. GitHub Releases API returned 0 published releases.

### Canonical candidate 25-point release register

The candidate row-level register contains exactly 25 items and is **3 Done / 14 In Progress / 8 Blocked**. Main's separate historical register remains **3 Done / 15 In Progress / 7 Blocked**; the two registers are not silently merged.

| # | Workstream | Status | Evidence / next gate |
|---:|---|---|---|
| 1 | iOS CI closure | **Done** | PR #41 exact-head iOS Release build and simulator smoke passed. Physical iPhone acceptance remains separate item #4. |
| 2 | Main branch protection and durable visibility decision | **Blocked** | Active ruleset is verified, but the owner's durable public/private visibility and release-plan decision is not recorded. |
| 3 | Dependency review and Expo SDK alignment | **Done** | PR #305 merged Expo 57.0.34 to main at 252cb529. Its exact source HEAD b0af4e7 passed Validation, CodeQL and Dependency Review; post-merge main Validation, CodeQL and dynamic prebuild passed. |
| 4 | Physical iPhone App Attest production entitlement | **Blocked** | Requires production Apple App ID/capability and provisioning entitlement, signed production build, and provider-backed verification on a supported physical iPhone. |
| 5 | Play-installed physical Android Play Integrity | **Blocked** | Requires Play internal-track distribution, Play App Signing identity, Google Cloud service-account/API permissions, and verification on a physical Android installed from Play. |
| 6 | Redis multi-instance concurrency | **Done** | Merged PR #41 backend validation passed shared-Redis/multi-client and separate-worker challenge-consumption regression coverage. Production Redis endpoint/TLS configuration remains an environment gate. |
| 7 | Attestation retry/network/expiry | **In Progress** | Automated expiry, missing/non-integer challenge, transport failure and retry coverage exists. Physical provider-backed device/network verification remains open. |
| 8 | Backend production security audit | **In Progress** | DNS-pinned SSRF transport is merged; independent security-owner approval, production NAT64/DNS64 inventory, deployed prefix configuration, egress evidence, secrets and host hardening remain. |
| 9 | Privacy and logging audit | **In Progress** | Automated security/privacy tests pass; production log sink, ingress/access logs, retention and operator access remain unverified. |
| 10 | Release acceptance evidence | **In Progress** | PR #204 exact HEAD d3d5321 passed exact-head Validation, CodeQL and Dependency Review (5/5 jobs). The three records are synchronized and the 25-row regression test passes. PR remains draft with no formal review; external production/pilot acceptance remains outstanding. |
| 11 | Mobile regression | **In Progress** | PR #288 exact HEAD 77e964b passed Validation, CodeQL and Dependency Review; frontend, backend and iOS jobs passed. Physical-device camera, App Attest and Play Integrity validation remain. |
| 12 | Camera/image processing | **In Progress** | Image contract, GIF/MIME validation and camera/gallery tests exist. Representative physical capture and real-photo coverage remain. |
| 13 | Offline/weak network | **In Progress** | Abort/deadline/retry and provider transport-failure tests exist. Real network interruption and reconnect recovery need device/staging evidence. |
| 14 | API timeout/retry | **In Progress** | Bounded request deadlines and explicit retry controls exist. Real network interruption and backend-enforced POST idempotency remain unproven. |
| 15 | Backend load test | **In Progress** | Guarded load-test harness exists. Execute only against owner-approved staging with agreed thresholds and recorded results. |
| 16 | Backup/restore | **Blocked** | Requires production datastore/Redis access and a witnessed restore/recovery drill with measured RPO/RTO. |
| 17 | AI cost optimization | **In Progress** | Shared client, bounded retries and token/model telemetry exist. Pricing inputs, per-session budgets, provider-cost reconciliation and production cost alerts remain. |
| 18 | Product-recognition accuracy | **Blocked** | Requires a representative labeled dataset, agreed accuracy metrics, human evaluation and explicit business acceptance. |
| 19 | AI fallback | **In Progress** | Conservative scene/no-candidate fallback code and tests exist. Provider-outage behavior and fallback quality need staging evidence. |
| 20 | UI loading/empty/error/permission regression | **In Progress** | Automated permission and UI-state coverage exists; the full physical-device loading/empty/error/permission matrix remains. |
| 21 | Monitoring/alerting | **Blocked** | Requires production monitoring workspace, alert destination, named on-call owner, configured thresholds and witnessed alert delivery. |
| 22 | Staged rollout | **Blocked** | Requires production approval, TestFlight/Play track access, documented rollout/stop thresholds and a named rollback owner with tested rollback. |
| 23 | Analytics | **In Progress** | Token/model usage telemetry exists; product funnel, retention, dashboard validation and production data-governance approval remain. |
| 24 | Release pipeline | **In Progress** | PR #319 exact HEAD 6a93742 passed 3/3 CI but still needs a real Codemagic unsigned APK and apksigner proof. PR #321 has a workflow-test assertion failure; PR #322's Android Release APK is produced but signer absence is not proven; PR #323's Android Release validation and PR #324's Android emulator smoke are still running. PR #320 must preserve/migrate 11 existing tests. PR #249 current exact HEAD fails Expo Doctor. |
| 25 | Pilot/business validation | **Blocked** | Requires a real pilot cohort, success/stop thresholds, named business owner and explicit business/release approval. |

### External acceptance blockers

Keep **#2, #4, #5, #16, #18, #21, #22 and #25** Blocked until the specified human, physical-device, production or business evidence exists. Issue #64 production SSRF acceptance is an additional external gate.

**Release decision: NOT READY. Production/pilot acceptance: NOT GRANTED.** No parent-commit result is attributed to a child SHA. No unavailable security-alert inventory is represented as empty. No simulator, emulator or GitHub CI result is promoted to physical-device or production acceptance.

---

---

## Latest live release-watch checkpoint — 2026-11-25 06:52 CET

This checkpoint supersedes the 05:52 CET snapshot. It is based on fresh PR metadata, independent branch refs, exact-HEAD workflow runs and jobs, review submissions and threads, issue records, branch pagination, the active main ruleset, package manifests/lockfile, and the GitHub Releases endpoint. It records repository evidence only; it does not grant production, store, pilot, or business acceptance.

### Repository and governance

- The former milanradics89-beep/POS-Doctor path redirects to milanradics89-beep/USEIT; GitHub repository ID 1246135116 is unchanged. The repository is public.
- Current main HEAD is 252cb529e9fdb0cf7ef05bbb25a29ec94fca1cfc. Main package.json resolves Expo ~57.0.34, expo-constants ~57.0.25 and expo-router ~57.0.32; package-lock.json resolves Expo 57.0.34 and minimatch 11.0.5.
- Protect-main ruleset [#26370589](https://github.com/milanradics89-beep/USEIT/rules/26370589) is ACTIVE. It requires strict CodeQL, backend, frontend, ios, analyze and dependency-review checks; one approving review; last-push approval; stale-review dismissal; resolved review threads; deletion and non-fast-forward protection; and no bypass actors.
- The fully paginated branch inventory is 281 (100 + 100 + 81; page 4 empty). GitHub Releases API returned 0 published releases.
- Code Scanning, Dependabot and Secret Scanning alert inventories are unavailable through the connected integration: UNVERIFIED, NOT EMPTY. Successful CodeQL or Dependency Review runs do not establish an empty repository-wide alert inventory.

### PR #41 — merged source baseline

- PR #41 is CLOSED/MERGED on fix/release-blockers-2026-10. Live PR metadata and the independent branch ref agree on exact source HEAD 68b380e73ca3c870048035197beef8febbf90ef1; merge commit f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1. It contains 517 commits, 100 changed files, +11,887 additions and -2,005 deletions. Compared with current main, the retained source branch is DIVERGED: 517 ahead / 18 behind. It is already merged and must not be merged again.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/USEIT/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/USEIT/actions/runs/43492153161) and Dependency Review [43492153021](https://github.com/milanradics89-beep/USEIT/actions/runs/43492153021) are terminal SUCCESS on that exact SHA. Frontend, backend, iOS, CodeQL Analyze and Dependency Review all passed (5/5 jobs).
- Review inventory: 109 timeline records; 53 conversation comments; 30 inline review comments; 26 formal submissions (25 COMMENTED and one APPROVED by tarlaci1984-sketch); 22/22 inline threads resolved; 0 unresolved; 20 outdated. The single approval has an empty body and is not independent security-owner or production acceptance.
- Historical runs [43098210284](https://github.com/milanradics89-beep/USEIT/actions/runs/43098210284), [43098210473](https://github.com/milanradics89-beep/USEIT/actions/runs/43098210473) and [43098210255](https://github.com/milanradics89-beep/USEIT/actions/runs/43098210255) remain QUEUED on obsolete SHA b46c5b8082ecbebd263a86cd53b1321a86e570d1; each jobs endpoint returns zero jobs. These are historical queues, not current-head failures. Repository-administrator cancellation is required.
- PR #41's description retains superseded historical open/unmerged wording and an old HEAD; live metadata and the independent branch ref are authoritative.

### PR #305 — Expo SDK 57.0.34 alignment merged

- PR #305 is CLOSED/MERGED. Source HEAD b0af4e7d43acdb0ccaa809899f43d96d47712748; merge commit and current main HEAD 252cb529e9fdb0cf7ef05bbb25a29ec94fca1cfc. It changed package.json and package-lock.json.
- Exact-source Validation [45521231491](https://github.com/milanradics89-beep/USEIT/actions/runs/45521231491), CodeQL [45521231436](https://github.com/milanradics89-beep/USEIT/actions/runs/45521231436) and Dependency Review [45521231462](https://github.com/milanradics89-beep/USEIT/actions/runs/45521231462) are terminal SUCCESS on the exact source SHA.
- Post-merge main Validation [45524790576](https://github.com/milanradics89-beep/USEIT/actions/runs/45524790576), CodeQL [45524790560](https://github.com/milanradics89-beep/USEIT/actions/runs/45524790560) and dynamic prebuild [45524790755](https://github.com/milanradics89-beep/USEIT/actions/runs/45524790755) are terminal SUCCESS on main. Frontend, backend, iOS, CodeQL Analyze and dynamic prebuild passed. A separate push-triggered Dependency Review on the merge commit was not found; the PR source exact-head Dependency Review did pass.
- Expo 57.0.34 is merged and post-merge validated. Candidate register item #3 is DONE.

### PR #288 — camera/OpenAI integration candidate

- PR #288 is OPEN and non-draft on feat/phase2-camera-openai-guardrails-expo57-20261124. Current exact HEAD 77e964b91aca17bf42fddf6bf69639f24733b86b; 12 commits, 11 changed files, +295 / -35. Base is current main 252cb529e9fdb0cf7ef05bbb25a29ec94fca1cfc; comparison is 12 ahead / 0 behind.
- Exact-head Validation [45532871751](https://github.com/milanradics89-beep/USEIT/actions/runs/45532871751), CodeQL [45532871933](https://github.com/milanradics89-beep/USEIT/actions/runs/45532871933) and Dependency Review [45532871944](https://github.com/milanradics89-beep/USEIT/actions/runs/45532871944) are terminal SUCCESS on that exact SHA. Frontend, backend and iOS jobs all passed.
- Review inventory is five submissions: three APPROVED and two DISMISSED, all by milanzoltanradics; zero inline threads. These approvals are not independent security-owner approval. The PR description still reports older HEAD db37acaa and is stale. No merge has occurred.

### PR #249 — older stacked Expo candidate

- PR #249 is OPEN/DRAFT on fix/pr233-live-checkpoint-refresh-20261123-1150, based on fix/expo-sdk57-package-alignment-main-20261123-1754. Exact HEAD e89ca4d78082ef8df447388223a62fc8ae7ee95d; 47 commits, 5 changed files, +4,553 / -17; comparison with its base is DIVERGED, 47 ahead / 1 behind.
- Exact-head Validation [45461939876](https://github.com/milanradics89-beep/USEIT/actions/runs/45461939876) is terminal FAILURE at Expo Doctor (20/21); backend and iOS passed. Android export, Android Release/emulator smoke and runtime dependency audit were skipped after the failure. CodeQL [45461940145](https://github.com/milanradics89-beep/USEIT/actions/runs/45461940145) and Dependency Review [45461940144](https://github.com/milanradics89-beep/USEIT/actions/runs/45461940144) are terminal SUCCESS on that same SHA.
- The PR description's claim of HEAD b3533ca and 3/3 successful workflows is stale and does not describe the current branch. PR #305's mainline dependency update does not automatically update this stacked branch.

### PR #204 — current-main release-documentation candidate

- PR #204 is OPEN/DRAFT on docs/release-evidence-current-main-20261120-run11, based on current main 252cb529e9fdb0cf7ef05bbb25a29ec94fca1cfc. Current exact HEAD e2b077f30c45386d142881932ce2fae7e40a7707; 31 commits, 4 changed files, +2,097 / -13; comparison is 31 ahead / 0 behind.
- Exact-head Validation [45550259837](https://github.com/milanradics89-beep/USEIT/actions/runs/45550259837) is terminal FAILURE; CodeQL [45550259874](https://github.com/milanradics89-beep/USEIT/actions/runs/45550259874) and Dependency Review [45550259796](https://github.com/milanradics89-beep/USEIT/actions/runs/45550259796) are terminal SUCCESS on the same exact SHA. Validation frontend failed at Unit tests; backend and iOS passed. The frontend suite reports 343 passed / 2 failed across 74 files.
- Failure analysis: scripts/release-evidence-checkpoint.test.mjs now selects the identical latest checkpoint and the 25-row register test passes. Two assertions remain: (1) the PR #249 assertion expects the obsolete phrase “superseded HEAD b3533ca” instead of the accurate statement that the PR description's claim of HEAD b3533ca is stale; (2) the issue assertions expect plain text while the checkpoint uses Markdown links for Issues #47 and #64. These are test/documentation contract mismatches; no application runtime failure is reported. Correct the expectations without removing or skipping tests.
- The immediate parent HEAD 46955eb3b27878d02e2835a4a6fe4ce54d85db37 had its own terminal exact-head Validation [45540368306](https://github.com/milanradics89-beep/USEIT/actions/runs/45540368306) FAILURE, with CodeQL [45540368268](https://github.com/milanradics89-beep/USEIT/actions/runs/45540368268) and Dependency Review [45540368335](https://github.com/milanradics89-beep/USEIT/actions/runs/45540368335) SUCCESS. Its parent fe8b0d0e3e412dfd81005a828ccfc77a2506132e had earlier successful checks, but those results are not transferred to either child SHA.
- PR #204 has 6 conversation comments, 0 inline threads and 0 formal review submissions. Reviewer tarlaci1984-sketch is requested; no approval is recorded. No merge has occurred.

### PR #319 — unsigned Android APK verification candidate

- PR #319 is OPEN/DRAFT on fix/unsigned-apk-current-camera-20261125, based on PR #288 current exact HEAD 77e964b91aca17bf42fddf6bf69639f24733b86b. Current exact HEAD 6a937425ea4d3763ab4555e8bf09f61c5a1797c2; one commit, 5 changed files, +346 / 0 deletions.
- Exact-head Validation [45545777077](https://github.com/milanradics89-beep/USEIT/actions/runs/45545777077), CodeQL [45545777202](https://github.com/milanradics89-beep/USEIT/actions/runs/45545777202) and Dependency Review [45545776953](https://github.com/milanradics89-beep/USEIT/actions/runs/45545776953) are terminal SUCCESS. Frontend, backend, iOS, CodeQL Analyze and Dependency Review jobs passed.
- PR #319 has 0 formal reviews and 0 inline threads. Its acceptance still requires an actual Codemagic Android build to produce app-release-unsigned.apk and a successful strict apksigner signer-absence check. GitHub CI is not Codemagic or physical-device acceptance.

### PR #320 — hardened quality/security workflow candidate

- PR #320 is OPEN/DRAFT on ci/security-workflows-mainline-20261125, based on current main. Exact HEAD e2bac14104ab112108b4a91f138c3eb3de7b7ca2; one commit, 12 changed files, +295 / -358.
- Exact-head Validation [45546055534](https://github.com/milanradics89-beep/USEIT/actions/runs/45546055534), CodeQL [45546055447](https://github.com/milanradics89-beep/USEIT/actions/runs/45546055447), Dependency Review [45546055514](https://github.com/milanradics89-beep/USEIT/actions/runs/45546055514) and Quality/Security [45546055455](https://github.com/milanradics89-beep/USEIT/actions/runs/45546055455) are terminal SUCCESS on that exact SHA.
- Quality/Security jobs Semgrep Community, Gitleaks, Fallow and zizmor all passed. PR #320 has 0 formal reviews and 0 inline threads. Its patch deletes scripts/expo-sdk57-lock-refresh.test.mjs (110 lines containing 11 existing regression cases) while adding a two-case legacy-workflow-boundary.test.mjs. This violates the no-test-deletion rule: preserve or migrate all 11 existing regression cases before integration, and do not merge as-is. Its greater-than-30-commit Gitleaks fixture has not yet been empirically exercised; Fallow uses fail-on-issues:false and is informational. The PR is not merged.

### Issues, SSRF and release acceptance

- Issue [#47](https://github.com/milanradics89-beep/USEIT/issues/47) is CLOSED with 11 comments. Active ruleset #26370589 directly verifies main protection.
- Issue [#64](https://github.com/milanradics89-beep/USEIT/issues/64) remains OPEN with 139 comments; last updated 2026-11-24. PR #200 is CLOSED/MERGED with DNS-pinned outbound transport in main (source HEAD fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a; merge commit 3a262358552a9650d865aa5bd3c92905f1e863cb). Production acceptance remains BLOCKED pending independent authorized security-owner approval, complete production NAT64/DNS64 prefix inventory, verification of deployed USEIT_NAT64_PREFIXES, and staging/production egress evidence.
- Code Scanning, Dependabot and Secret Scanning alert inventories remain UNVERIFIED, NOT EMPTY because their endpoints are unavailable through the connected integration. GitHub Releases API returned 0 published releases.

### Canonical candidate 25-point release register

The candidate row-level register contains exactly 25 items and is **3 Done / 14 In Progress / 8 Blocked**. Main's separate historical register remains **3 Done / 15 In Progress / 7 Blocked**; the two registers are not silently merged.

| # | Workstream | Status | Evidence / next gate |
|---:|---|---|---|
| 1 | iOS CI closure | **Done** | PR #41 exact-head iOS Release build and simulator smoke passed. Physical iPhone acceptance remains separate item #4. |
| 2 | Main branch protection and durable visibility decision | **Blocked** | Active ruleset is verified, but the owner's durable public/private visibility and release-plan decision is not recorded. |
| 3 | Dependency review and Expo SDK alignment | **Done** | PR #305 merged Expo 57.0.34 to main at 252cb529. Its exact source HEAD b0af4e7 passed Validation, CodeQL and Dependency Review; post-merge main Validation, CodeQL and dynamic prebuild passed. Main package.json and package-lock.json resolve Expo ~57.0.34 and minimatch 11.0.5. |
| 4 | Physical iPhone App Attest production entitlement | **Blocked** | Requires production Apple App ID/capability and provisioning entitlement, signed production build, and provider-backed verification on a supported physical iPhone. |
| 5 | Play-installed physical Android Play Integrity | **Blocked** | Requires Play internal-track distribution, Play App Signing identity, Google Cloud service-account/API permissions, and verification on a physical Android installed from Play. |
| 6 | Redis multi-instance concurrency | **Done** | Merged PR #41 backend validation passed shared-Redis/multi-client and separate-worker challenge-consumption regression coverage. Production Redis endpoint/TLS configuration remains an environment gate. |
| 7 | Attestation retry/network/expiry | **In Progress** | Automated expiry, missing/non-integer challenge, transport failure and retry coverage exists. Physical provider-backed device/network verification remains open. |
| 8 | Backend production security audit | **In Progress** | DNS-pinned SSRF transport is merged; independent security-owner approval, production NAT64/DNS64 inventory, deployed prefix configuration, egress evidence, secrets and host hardening remain. |
| 9 | Privacy and logging audit | **In Progress** | Automated security/privacy tests pass; production log sink, ingress/access logs, retention and operator access remain unverified. |
| 10 | Release acceptance evidence | **In Progress** | PR #204 exact HEAD e2b077f has Validation FAILURE (343 passed / 2 failed across 74 files); CodeQL and Dependency Review passed, as did backend and iOS. Two remaining assertions mismatch the accurate PR #249 stale-description wording and Markdown-linked Issue #47/#64 references. Correct the expectations without deleting tests, refresh all three records, rerun exact-head CI and obtain human review; external acceptance remains outstanding. |
| 11 | Mobile regression | **In Progress** | PR #288 exact HEAD 77e964b passed Validation, CodeQL and Dependency Review; frontend, backend and iOS jobs passed. Physical-device camera, App Attest and Play Integrity validation remain. |
| 12 | Camera/image processing | **In Progress** | Image contract, GIF/MIME validation and camera/gallery tests exist. Representative physical capture and real-photo coverage remain. |
| 13 | Offline/weak network | **In Progress** | Abort/deadline/retry and provider transport-failure tests exist. Real network interruption and reconnect recovery need device/staging evidence. |
| 14 | API timeout/retry | **In Progress** | Bounded request deadlines and explicit retry controls exist. Real network interruption and backend-enforced POST idempotency remain unproven. |
| 15 | Backend load test | **In Progress** | Guarded load-test harness exists. Execute only against owner-approved staging with agreed thresholds and recorded results. |
| 16 | Backup/restore | **Blocked** | Requires production datastore/Redis access and a witnessed restore/recovery drill with measured RPO/RTO. |
| 17 | AI cost optimization | **In Progress** | Shared client, bounded retries and token/model telemetry exist. Pricing inputs, per-session budgets, provider-cost reconciliation and production cost alerts remain. |
| 18 | Product-recognition accuracy | **Blocked** | Requires a representative labeled dataset, agreed accuracy metrics, human evaluation and explicit business acceptance. |
| 19 | AI fallback | **In Progress** | Conservative scene/no-candidate fallback code and tests exist. Provider-outage behavior and fallback quality need staging evidence. |
| 20 | UI loading/empty/error/permission regression | **In Progress** | Automated permission and UI-state coverage exists; the full physical-device loading/empty/error/permission matrix remains. |
| 21 | Monitoring/alerting | **Blocked** | Requires production monitoring workspace, alert destination, named on-call owner, configured thresholds and witnessed alert delivery. |
| 22 | Staged rollout | **Blocked** | Requires production approval, TestFlight/Play track access, documented rollout/stop thresholds and a named rollback owner with tested rollback. |
| 23 | Analytics | **In Progress** | Token/model usage telemetry exists; product funnel, retention, dashboard validation and production data-governance approval remain. |
| 24 | Release pipeline | **In Progress** | PR #319 exact HEAD 6a93742 passed Validation, CodeQL and Dependency Review; actual Codemagic unsigned-APK output and apksigner evidence remain. PR #320 exact HEAD e2bac14 passed Validation, CodeQL, Dependency Review and Quality/Security, but deletes 11 existing regression cases and must preserve/migrate them before integration; its >30-commit Gitleaks fixture remains unexercised. PR #249 current exact HEAD e89ca4d fails Expo Doctor; PR #204 current exact HEAD e2b077f fails two documentation-test assertions. Signing, store distribution, staged rollout and rollback ownership remain open. |
| 25 | Pilot/business validation | **Blocked** | Requires a real pilot cohort, success/stop thresholds, named business owner and explicit business/release approval. |

### External acceptance blockers

Keep **#2, #4, #5, #16, #18, #21, #22 and #25** Blocked until the specified human, physical-device, production or business evidence exists. Issue #64 production SSRF acceptance is an additional external gate.

**Release decision: NOT READY. Production/pilot acceptance: NOT GRANTED.** No parent-commit result is attributed to a child SHA. No unavailable security-alert inventory is represented as empty. No simulator, emulator or GitHub CI result is promoted to physical-device or production acceptance.

---

## Latest live release-watch checkpoint — 2026-11-25 04:25 CET

This checkpoint supersedes the 03:19 CET checkpoint below. It is based on fresh PR metadata, the independent PR #41 branch ref, exact-head Actions runs and jobs, review timelines/threads/submissions, issue records, the active main ruleset, paginated branch inventory, and the GitHub Releases endpoint. It records repository evidence only; it does not grant production, store, pilot, or business acceptance.

### Repository and governance

- The former `milanradics89-beep/POS-Doctor` path redirects to `milanradics89-beep/USEIT`; GitHub repository ID **1246135116** is unchanged. The repository is public.
- Current main HEAD is `252cb529e9fdb0cf7ef05bbb25a29ec94fca1cfc`. Main's `package.json` and `package-lock.json` resolve Expo `57.0.34` and minimatch `11.0.5`.
- Protect-main ruleset [#26370589](https://github.com/milanradics89-beep/USEIT/rules/26370589) is ACTIVE with strict required checks `CodeQL`, `backend`, `frontend`, `ios`, `analyze`, and `dependency-review`; one approving review; last-push approval; stale-review dismissal; resolved review threads; deletion and non-fast-forward protection; and no bypass actors.
- The paginated branch inventory contains **277 branches** (100 + 100 + 77; page 4 is empty). GitHub Releases API returned **0 published releases**.
- Code Scanning, Dependabot, and Secret Scanning alert inventories are unavailable through the connected integration: **UNVERIFIED, NOT EMPTY**. Successful CodeQL or Dependency Review workflows do not establish empty repository-wide alert inventories.

### PR #41 — merged source baseline

- PR #41 is CLOSED/MERGED on `fix/release-blockers-2026-10`. Live PR metadata and the independent branch ref agree on exact source HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge commit `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. It contains 517 commits, 100 changed files, +11,887 additions, and -2,005 deletions. Against current main the retained source branch is DIVERGED: 517 ahead / 18 behind. It is already merged and must not be merged again.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/USEIT/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/USEIT/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/USEIT/actions/runs/43492153021) are terminal SUCCESS on that exact SHA. Frontend, backend, iOS, CodeQL Analyze, and Dependency Review all passed (5/5 jobs).
- Review inventory: 109 timeline records; 53 conversation comments; 30 inline review comments; 26 formal submissions (25 COMMENTED and one APPROVED by `tarlaci1984-sketch`); 22/22 inline threads resolved; 0 unresolved; 20 outdated. The single approval has an empty body and is not independent security-owner or production acceptance.
- Historical runs [43098210284](https://github.com/milanradics89-beep/USEIT/actions/runs/43098210284), [43098210473](https://github.com/milanradics89-beep/USEIT/actions/runs/43098210473), and [43098210255](https://github.com/milanradics89-beep/USEIT/actions/runs/43098210255) remain QUEUED on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`; each jobs endpoint returned zero jobs. These are historical queues, not current-head failures. Repository-administrator cancellation is required.
- PR #41's description retains superseded historical open/unmerged wording and an old HEAD; live metadata and the exact branch ref are authoritative.

### PR #305 — Expo SDK 57.0.34 alignment merged

- PR #305 is CLOSED/MERGED. Source HEAD `b0af4e7d43acdb0ccaa809899f43d96d47712748`; merge commit and current main HEAD `252cb529e9fdb0cf7ef05bbb25a29ec94fca1cfc`. It changed `package.json` and `package-lock.json`.
- Exact-source Validation [45521231491](https://github.com/milanradics89-beep/USEIT/actions/runs/45521231491), CodeQL [45521231436](https://github.com/milanradics89-beep/USEIT/actions/runs/45521231436), and Dependency Review [45521231462](https://github.com/milanradics89-beep/USEIT/actions/runs/45521231462) are terminal SUCCESS on the exact source SHA.
- Post-merge main Validation [45524790576](https://github.com/milanradics89-beep/USEIT/actions/runs/45524790576), CodeQL [45524790560](https://github.com/milanradics89-beep/USEIT/actions/runs/45524790560), and dynamic prebuild [45524790755](https://github.com/milanradics89-beep/USEIT/actions/runs/45524790755) are terminal SUCCESS on main. Validation frontend, backend, and iOS jobs all passed. A separate push-triggered Dependency Review on the merge commit was not found; the PR source exact-head Dependency Review did pass.
- The Expo 57.0.34 alignment is merged and post-merge validated. Candidate register item **#3 is DONE**.

### Current camera/OpenAI integration candidate — PR #288

- PR #288 is OPEN and non-draft on `feat/phase2-camera-openai-guardrails-expo57-20261124`. Exact current HEAD `77e964b91aca17bf42fddf6bf69639f24733b86b`; 12 commits, 11 changed files, +295 / -35. Base is current main `252cb529e9fdb0cf7ef05bbb25a29ec94fca1cfc`; comparison is 12 ahead / 0 behind.
- Exact-head Validation [45532871751](https://github.com/milanradics89-beep/USEIT/actions/runs/45532871751) remains IN PROGRESS: backend and frontend passed; the iOS simulator launch/smoke step is still running. CodeQL [45532871933](https://github.com/milanradics89-beep/USEIT/actions/runs/45532871933) and Dependency Review [45532871944](https://github.com/milanradics89-beep/USEIT/actions/runs/45532871944) are terminal SUCCESS on the same exact HEAD.
- Earlier green CI for older PR #288 SHAs is not reused. Do not merge until current-head Validation completes and required human review is current.

### Older stacked Expo candidate — PR #249

- PR #249 remains OPEN/DRAFT on `fix/pr233-live-checkpoint-refresh-20261123-1150`, based on `fix/expo-sdk57-package-alignment-main-20261123-1754`. Exact HEAD `e89ca4d78082ef8df447388223a62fc8ae7ee95d`; 47 commits, 5 changed files, +4,553 / -17; comparison with its base is DIVERGED, 47 ahead / 1 behind.
- Current exact-head Validation [45461939876](https://github.com/milanradics89-beep/USEIT/actions/runs/45461939876) is terminal FAILURE at `Validate Expo project health`; backend and iOS jobs passed. Android export, Android Release/emulator smoke, and runtime dependency audit were skipped after the Expo Doctor failure. CodeQL [45461940145](https://github.com/milanradics89-beep/USEIT/actions/runs/45461940145) and Dependency Review [45461940144](https://github.com/milanradics89-beep/USEIT/actions/runs/45461940144) are terminal SUCCESS on that same SHA.
- The PR description's claim of HEAD `b3533ca` and 3/3 successful workflows is stale and does not describe the current branch. PR #305's mainline dependency update does not automatically update this stacked branch.

### PR #204 — current-main release-documentation candidate

- PR #204 is OPEN/DRAFT on `docs/release-evidence-current-main-20261120-run11`, based on current main `252cb529e9fdb0cf7ef05bbb25a29ec94fca1cfc`. Exact HEAD at this checkpoint is `fe8b0d0e3e412dfd81005a828ccfc77a2506132e`; 29 commits, 4 changed files, +1,535 / -13; comparison is 29 ahead / 0 behind.
- Exact-head Validation [45532839638](https://github.com/milanradics89-beep/USEIT/actions/runs/45532839638), CodeQL [45532839715](https://github.com/milanradics89-beep/USEIT/actions/runs/45532839715), and Dependency Review [45532839650](https://github.com/milanradics89-beep/USEIT/actions/runs/45532839650) are terminal SUCCESS on `fe8b0d0`. All five jobs passed: frontend, backend, iOS, CodeQL Analyze, and Dependency Review.
- PR #204 has 6 conversation comments, 0 inline threads, and 0 formal review submissions; reviewer `tarlaci1984-sketch` is requested. The candidate is not merged. The three release-record files on this branch have identical latest checkpoint sections; main's copies remain historical and are not edited directly.
- The new checkpoint commit being created from this verified parent is a new exact HEAD and must pass its own Validation, CodeQL, and Dependency Review. No parent result is reused as child validation.

### Issues, SSRF, and release acceptance

- Issue [#47](https://github.com/milanradics89-beep/USEIT/issues/47) is CLOSED with 11 comments. The active main ruleset is direct evidence that branch protection is in force.
- Issue [#64](https://github.com/milanradics89-beep/USEIT/issues/64) remains OPEN with 139 comments; last updated 2026-11-24. PR #200 is CLOSED/MERGED with DNS-pinned outbound transport in main (merge commit `3a262358552a9650d865aa5bd3c92905f1e863cb`). Production acceptance remains BLOCKED pending independent authorized security-owner approval, a complete production NAT64/DNS64 prefix inventory, verification of deployed `USEIT_NAT64_PREFIXES`, and staging/production egress evidence.
- Code Scanning, Dependabot, and Secret Scanning alert inventories remain **UNVERIFIED, NOT EMPTY** because their endpoints are unavailable through the connected integration. GitHub Releases API currently returns 0 published releases.

### Canonical candidate 25-point release register

The candidate row-level register contains exactly 25 items and remains **3 Done / 14 In Progress / 8 Blocked**.

- **Done:** #1, #3, #6.
- **In Progress:** #7–#15, #17, #19, #20, #23, #24.
- **Blocked:** #2, #4, #5, #16, #18, #21, #22, #25.

The eight external blockers remain:
- **#2:** durable repository-visibility and release-plan decision.
- **#4:** production Apple App Attest entitlement and physical-iPhone verification.
- **#5:** Play-installed physical Android Play Integrity verification.
- **#16:** witnessed production backup/restore with recovery evidence.
- **#18:** representative labeled product-recognition benchmark and business acceptance.
- **#21:** production monitoring and witnessed alert delivery/acknowledgement.
- **#22:** approved staged rollout, thresholds, rollback owner, and tested rollback.
- **#25:** real-user pilot cohort and explicit business sign-off.

No physical-device, production-cloud, backup/restore, monitoring, rollout, or business-acceptance item is promoted by automated CI, simulator, or emulator evidence. Main's older historical register remains separate and is not silently merged with the candidate register.

**Release decision: NOT READY. Production/pilot acceptance: NOT GRANTED.** No CI result from a parent commit is attributed to a child SHA. The exact-head workflows for the new PR #204 checkpoint commit are a separate pending gate.


---

## Latest live release-watch checkpoint — 2026-11-25 03:19 CET

Repository identity: the former milanradics89-beep/POS-Doctor path redirects to milanradics89-beep/USEIT; GitHub repository ID 1246135116 is unchanged. The repository is public. This checkpoint uses live PR metadata, independent branch refs, exact-head Actions runs and jobs, review submissions and threads, issue records, paginated branch inventory, the active main ruleset, package manifests and lockfiles, and the GitHub Releases endpoint. It records repository evidence only and does not grant production, store, pilot or business acceptance.

### Repository and governance

- Current main HEAD is 252cb529e9fdb0cf7ef05bbb25a29ec94fca1cfc. The main package.json and package-lock.json resolve Expo ~57.0.34 and minimatch 11.0.5.
- Protect-main ruleset #26370589 is ACTIVE. It requires strict CodeQL, backend, frontend, ios, analyze and dependency-review checks; one approving review; last-push approval; stale-review dismissal; resolved review threads; deletion and non-fast-forward protection; and no bypass actors.
- The paginated branch inventory contains 264 branches (100 + 100 + 64; page 4 is empty). GitHub Releases API returned 0 published releases.
- Code Scanning, Dependabot and Secret Scanning alert inventories are unavailable through the connected integration: UNVERIFIED, NOT EMPTY. Successful CodeQL or Dependency Review workflows do not prove repository-wide alert inventories are empty.

### PR #41 — merged source baseline

- PR #41 is CLOSED/MERGED on fix/release-blockers-2026-10. Live PR metadata and the independent branch ref agree on exact source HEAD 68b380e73ca3c870048035197beef8febbf90ef1; merge commit f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1. It contains 517 commits, 100 changed files, +11,887 additions and -2,005 deletions. The retained branch compares DIVERGED with current main: 517 ahead / 18 behind. It is already merged and must not be merged again.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/USEIT/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/USEIT/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/USEIT/actions/runs/43492153021) are terminal SUCCESS on that exact SHA. Frontend, backend, iOS, CodeQL Analyze and Dependency Review all passed (5/5 jobs).
- Review inventory: 109 timeline records; 53 conversation comments; 30 inline review comments; 26 formal submissions (25 COMMENTED and one APPROVED by tarlaci1984-sketch); 22/22 inline threads resolved; 0 unresolved; 20 outdated. The single approval has an empty body and is not independent security-owner or production acceptance.
- Historical runs [43098210284](https://github.com/milanradics89-beep/USEIT/actions/runs/43098210284), [43098210473](https://github.com/milanradics89-beep/USEIT/actions/runs/43098210473), and [43098210255](https://github.com/milanradics89-beep/USEIT/actions/runs/43098210255) remain QUEUED on obsolete SHA b46c5b8082ecbebd263a86cd53b1321a86e570d1; each jobs endpoint returned zero jobs. These are historical queues, not current-head failures. Repository-administrator cancellation is required.
- PR #41's description retains superseded historical wording and an old HEAD; live PR metadata and exact refs are authoritative.

### PR #305 — Expo SDK 57.0.34 alignment merged

- PR #305 is CLOSED/MERGED. Source branch fix/expo-sdk57-034-mainline-20261125, exact source HEAD b0af4e7d43acdb0ccaa809899f43d96d47712748; merge commit and current main HEAD 252cb529e9fdb0cf7ef05bbb25a29ec94fca1cfc. It changed package.json and package-lock.json only.
- Exact-source Validation [45521231491](https://github.com/milanradics89-beep/USEIT/actions/runs/45521231491), CodeQL [45521231436](https://github.com/milanradics89-beep/USEIT/actions/runs/45521231436), and Dependency Review [45521231462](https://github.com/milanradics89-beep/USEIT/actions/runs/45521231462) are terminal SUCCESS on b0af4e7.
- Post-merge main Validation [45524790576](https://github.com/milanradics89-beep/USEIT/actions/runs/45524790576) passed frontend, backend and iOS; main CodeQL [45524790560](https://github.com/milanradics89-beep/USEIT/actions/runs/45524790560) passed; dynamic prebuild [45524790755](https://github.com/milanradics89-beep/USEIT/actions/runs/45524790755) passed. A separate push-triggered Dependency Review run on the merge commit was not found; the PR source exact-head Dependency Review did pass.
- PR #305 has one APPROVED submission by milanzoltanradics. The dependency alignment is merged and post-merge Validation/CodeQL/prebuild are successful. Candidate register item #3 is therefore DONE.

### Current camera/OpenAI integration candidate — PR #288

- PR #288 is OPEN and non-draft on feat/phase2-camera-openai-guardrails-expo57-20261124. Exact current HEAD 23a235e0fa35555507190902341143f592fad5aa; 11 commits, 13 changed files, +346 / -116. Its base snapshot is 5389190fe230122f19c3406bfcb125c98ced5966; compared with current main it is 11 ahead / 2 behind.
- Exact-head Validation [45525231729](https://github.com/milanradics89-beep/USEIT/actions/runs/45525231729), CodeQL [45525231505](https://github.com/milanradics89-beep/USEIT/actions/runs/45525231505), and Dependency Review [45525231555](https://github.com/milanradics89-beep/USEIT/actions/runs/45525231555) are terminal SUCCESS on 23a235e.
- Review inventory: five formal submissions (three APPROVED, two DISMISSED), all by milanzoltanradics; all predate the current HEAD. There are zero inline threads and no fresh approval on 23a235e. The PR description still cites the superseded db37acaa HEAD and must be reconciled. This candidate is not merged; physical-device, provider-backed and production acceptance remain outstanding.

### Older Expo candidate — PR #249

- PR #249 is OPEN/DRAFT on fix/pr233-live-checkpoint-refresh-20261123-1150. Live PR metadata reports exact HEAD e89ca4d78082ef8df447388223a62fc8ae7ee95d, 47 commits and 5 changed files, based on PR #254 branch HEAD 2c9d9ef7a052a2a55b491925c8c40d9fc3649bd3.
- Exact-head Validation [45461939876](https://github.com/milanradics89-beep/USEIT/actions/runs/45461939876) is terminal FAILURE; CodeQL [45461940145](https://github.com/milanradics89-beep/USEIT/actions/runs/45461940145) and Dependency Review [45461940144](https://github.com/milanradics89-beep/USEIT/actions/runs/45461940144) are terminal SUCCESS on the same SHA. Expo Doctor failed 20/21 because this branch resolves Expo 57.0.33 while the SDK metadata expects ~57.0.34.
- The PR description instead claims superseded HEAD b3533ca and 3/3 successful workflows; that is not the current branch evidence. PR #249 has zero formal reviews and zero inline threads. PR #305's mainline merge does not retroactively update this stacked branch.

### PR #204 — release documentation candidate

- PR #204 is OPEN/DRAFT on docs/release-evidence-current-main-20261120-run11. Before this checkpoint commit, its branch was based on main 5389190fe230122f19c3406bfcb125c98ced5966 at exact HEAD bfd018b95b9edea5b1fd762bb26794a7d1656618 (28 commits, 4 changed files, +1,490 / -13). The branch compares 28 ahead / 2 behind current main.
- Exact-head Validation [45509270446](https://github.com/milanradics89-beep/USEIT/actions/runs/45509270446) is terminal FAILURE; CodeQL [45509270613](https://github.com/milanradics89-beep/USEIT/actions/runs/45509270613) and Dependency Review [45509270488](https://github.com/milanradics89-beep/USEIT/actions/runs/45509270488) are terminal SUCCESS on bfd018b. Validation jobs: frontend FAILURE, backend SUCCESS, iOS SUCCESS.
- Frontend reported 343 passed / 1 failed across 74 files. The sole failure is scripts/release-evidence-checkpoint.test.mjs:63: the test expects the obsolete wording “Before this checkpoint commit, PR #204 branch HEAD was ...”, while the actual section says PR #204 was OPEN/DRAFT on the branch at exact HEAD. This is a documentation-test assertion mismatch, not an application runtime defect. Android Expo Doctor/export/native Release/emulator checks were skipped after the unit-test failure.
- PR #204 has 6 conversation comments, 0 formal review submissions, 0 inline threads and 0 approvals. Its requested reviewer has not submitted a review.
- Before the prior checkpoint refresh its branch HEAD was 00d2dff332888e5eb2fa731d32e2e5b3e1cc4f9f; Validation [45017190851](https://github.com/milanradics89-beep/USEIT/actions/runs/45017190851) failed two historical documentation assertions (332 passed / 2 failed across 72 files), while CodeQL [45017190867](https://github.com/milanradics89-beep/USEIT/actions/runs/45017190867) and Dependency Review [45017190810](https://github.com/milanradics89-beep/USEIT/actions/runs/45017190810) passed. This is historical evidence, not current-head CI.
- This checkpoint commit synchronizes the PR branch with current main as a second parent, updates the three release records and corrects the failing assertion. Its own exact-head Validation, CodeQL and Dependency Review must be evaluated separately. No result from bfd018b is transferred to the new SHA.

### Issues, SSRF and release acceptance

- Issue [#47](https://github.com/milanradics89-beep/USEIT/issues/47) is CLOSED with 11 comments. Active ruleset #26370589 verifies main protection; the owner's durable repository-visibility/release-plan decision remains unrecorded.
- Issue [#64](https://github.com/milanradics89-beep/USEIT/issues/64) remains OPEN with 139 comments. PR #200's DNS-pinned SSRF transport is merged into main (source HEAD fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a, merge commit 3a262358552a9650d865aa5bd3c92905f1e863cb). Production acceptance remains blocked pending independent security-owner approval, complete production NAT64/DNS64 prefix inventory, deployed USEIT_NAT64_PREFIXES verification, and captured staging/production egress tests.
- No physical-device, production-cloud, witnessed backup/restore, production-monitoring, staged-rollout, real-user-pilot or business-approval evidence is inferred from CI, simulator, emulator or source inspection.

### Canonical candidate 25-point release register

The current candidate register contains exactly 25 items: **3 Done / 14 In Progress / 8 Blocked**. Main's separate historical register remains **3 Done / 15 In Progress / 7 Blocked**; the two registers are not silently merged.

| # | Workstream | Status | Evidence / next gate |
|---:|---|---|---|
| 1 | iOS CI closure | **Done** | PR #41 exact-head iOS Release build and simulator smoke passed. Physical iPhone acceptance remains separate item #4. |
| 2 | Main branch protection and durable visibility decision | **Blocked** | Active ruleset is verified, but the owner's durable public/private visibility and release-plan decision is not recorded. |
| 3 | Dependency review and Expo SDK alignment | **Done** | PR #305 merged Expo 57.0.34 to main at 252cb529. Its exact source HEAD b0af4e7 passed Validation, CodeQL and Dependency Review; post-merge main Validation, CodeQL and dynamic prebuild also passed. Main package.json and package-lock.json resolve Expo ~57.0.34 and minimatch 11.0.5. |
| 4 | Physical iPhone App Attest production entitlement | **Blocked** | Requires production Apple App ID/capability and provisioning entitlement, signed production build, and provider-backed verification on a supported physical iPhone. |
| 5 | Play-installed physical Android Play Integrity | **Blocked** | Requires Play internal-track distribution, Play App Signing identity, Google Cloud service-account/API permissions, and verification on a physical Android installed from Play. |
| 6 | Redis multi-instance concurrency | **Done** | Merged PR #41 backend validation passed shared-Redis/multi-client and separate-worker challenge-consumption regression coverage. Production Redis endpoint/TLS configuration remains an environment gate. |
| 7 | Attestation retry/network/expiry | **In Progress** | Automated expiry, missing/non-integer challenge, transport failure and retry coverage exists. Physical provider-backed device/network verification remains open. |
| 8 | Backend production security audit | **In Progress** | DNS-pinned SSRF transport is merged; independent security-owner approval, production NAT64/DNS64 inventory, deployed prefix configuration, egress evidence, secrets and host hardening remain. |
| 9 | Privacy and logging audit | **In Progress** | Automated security/privacy tests pass; production log sink, ingress/access logs, retention and operator access remain unverified. |
| 10 | Release acceptance evidence | **In Progress** | PR #204 exact HEAD bfd018b has Validation FAILURE from one stale checkpoint assertion (343 passed / 1 failed across 74 files); CodeQL and Dependency Review passed, as did backend and iOS. Correct the assertion, synchronize current main, rerun exact-head CI and obtain human review; external acceptance remains outstanding. |
| 11 | Mobile regression | **In Progress** | PR #288 Android emulator and iOS simulator Release smoke passed. Physical-device camera, App Attest and Play Integrity validation remain. |
| 12 | Camera/image processing | **In Progress** | Image contract, GIF/MIME validation and camera/gallery tests exist. Representative physical capture and real-photo coverage remain. |
| 13 | Offline/weak network | **In Progress** | Abort/deadline/retry and provider transport-failure tests exist. Real network interruption and reconnect recovery need device/staging evidence. |
| 14 | API timeout/retry | **In Progress** | Bounded request deadlines and explicit retry controls exist. Real network interruption and backend-enforced POST idempotency remain unproven. |
| 15 | Backend load test | **In Progress** | Guarded load-test harness exists. Execute only against owner-approved staging with agreed thresholds and recorded results. |
| 16 | Backup/restore | **Blocked** | Requires production datastore/Redis access and a witnessed restore/recovery drill with measured RPO/RTO. |
| 17 | AI cost optimization | **In Progress** | Shared client, bounded retries and token/model telemetry exist. Pricing inputs, per-session budgets, provider-cost reconciliation and production cost alerts remain. |
| 18 | Product-recognition accuracy | **Blocked** | Requires a representative labeled dataset, agreed accuracy metrics, human evaluation and explicit business acceptance. |
| 19 | AI fallback | **In Progress** | Conservative scene/no-candidate fallback code and tests exist. Provider-outage behavior and fallback quality need staging evidence. |
| 20 | UI loading/empty/error/permission regression | **In Progress** | Automated permission and UI-state coverage exists; the full physical-device loading/empty/error/permission matrix remains. |
| 21 | Monitoring/alerting | **Blocked** | Requires production monitoring workspace, alert destination, named on-call owner, configured thresholds and witnessed alert delivery. |
| 22 | Staged rollout | **Blocked** | Requires production approval, TestFlight/Play track access, documented rollout/stop thresholds and a named rollback owner with tested rollback. |
| 23 | Analytics | **In Progress** | Token/model usage telemetry exists; product funnel, retention, dashboard validation and production data-governance approval remain. |
| 24 | Release pipeline | **In Progress** | PR #288 exact HEAD 23a235e passed all three exact-head workflows; PR #249 exact HEAD e89ca4d still fails Expo Doctor 20/21 on Expo 57.0.33; PR #305 merged Expo 57.0.34 to main; PR #204 exact HEAD bfd018b has one documentation assertion failure. Signing, store distribution, staged rollout and rollback ownership remain open. |
| 25 | Pilot/business validation | **Blocked** | Requires a real pilot cohort, success/stop thresholds, named business owner and explicit business/release approval. |


### External acceptance blockers

Keep **#2, #4, #5, #16, #18, #21, #22 and #25** Blocked until the specified human, physical-device, production or business evidence exists. Production SSRF acceptance under Issue #64 is an additional external gate.

**Release decision: NOT READY. Production/pilot acceptance: NOT GRANTED.** No parent-commit result is transferred to a child SHA; no unavailable alert inventory is represented as empty.

---



---

## Current release evidence checkpoint — 2026-11-22 08:22 CET

This checkpoint supersedes the 07:19 CET checkpoint. Evidence refreshed at 07:22 UTC from live PR metadata, source branch refs, exact-head Actions runs/jobs, reviews and threads, issues #47 and #64, main ruleset, release inventory, release-branch search, and the three candidate release records. Main is `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`. This checkpoint does not grant production or pilot acceptance.

### PR #41 — merged baseline

- PR #41 is CLOSED/MERGED on `fix/release-blockers-2026-10`. Live PR metadata and the source branch ref both report exact HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge commit `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. It contains 517 commits, 100 changed files, +11,887 additions and -2,005 deletions.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS on that exact SHA. Frontend, backend, iOS, CodeQL Analyze and Dependency Review jobs all passed.
- Review inventory: 53 conversation comments, 30 inline review comments, 26 formal review submissions (25 COMMENTED and one human APPROVED by `tarlaci1984-sketch`), 22/22 inline review threads resolved, 0 unresolved threads, and 109 combined timeline records.
- Historical runs [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255) remain QUEUED on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`; each has zero jobs. They are historical queues, not current-head successes or failures. Repository-administrator cancellation remains required.

### Main governance and repository state

- Repository visibility is public. Main ref is `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`.
- Active ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) applies to the default branch and requires six strict checks (`CodeQL`, `backend`, `frontend`, `ios`, `analyze`, `dependency-review`), one approving review, stale-approval dismissal, last-push approval and resolved review threads. Deletion and non-fast-forward are blocked; there are no bypass actors.
- Main's release records remain on the 2026-11-13 checkpoint: Runbook blob `b7b848743edf8fb8c238ef3367b0e74b64e6d540`, Pilot Acceptance blob `f6bd4f041f802d0286b209769621079e517bd3a1`, and Backlog blob `891ec704b18bb1a59c9598b9fe2aedd0a9df9dae`. This candidate refresh is on PR #204 only; main was not edited.
- Paginated branch search returned 86 branch names matching `release`; pagination is exhausted. This is a search-match count, not total repository branches. GitHub Releases API returned an empty array: 0 published releases.

### PR #204 — current-main release-documentation candidate

- PR #204 is OPEN/DRAFT against `main`, on `docs/release-evidence-current-main-20261120-run11`, with 18 commits and 4 changed files. PR metadata and branch ref agree: current exact HEAD is `9311dae635423369badf9b4fcfdcc14aa26a8b96`. Compare against main is 18 commits ahead / 0 behind.
- Exact-head Validation [44993531919](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44993531919), CodeQL [44993531899](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44993531899), and Dependency Review [44993531931](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44993531931) are terminal SUCCESS, all referencing `9311dae635423369badf9b4fcfdcc14aa26a8b96`.
- Validation jobs passed: frontend [137119578491](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44993531919/job/137119578491), backend [137119578415](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44993531919/job/137119578415), and iOS [137119578529](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44993531919/job/137119578529). CodeQL Analyze [137119578374](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44993531899/job/137119578374) and Dependency Review [137119578217](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44993531931/job/137119578217) also passed.
- Frontend on this exact HEAD: 334 tests across 72 files; source-boundary check passed across 356 tracked files; pinned Expo Doctor 21/21; Android export, native Release build and emulator install/launch smoke passed. Runtime npm audit completed at its configured high-severity threshold but reported 3 moderate minimatch vulnerabilities through `@expo/fingerprint`; this is not a zero-vulnerability audit. The suggested `npm audit fix --force` would downgrade Expo and was not run.
- Backend on this exact HEAD: 450 pytest tests, 27 production-readiness checks and 78 security/privacy checks passed; pip-audit reported no known vulnerabilities. iOS native Release build and simulator install/launch smoke passed.
- Previous PR #204 HEAD `0526826a0c6c0dd3a0ba818bdc397c4270611d79` had terminal Validation FAILURE (332 passed / 3 failed in frontend assertion-contract tests), while its CodeQL and Dependency Review passed. That failure is historical and is not attributed to current HEAD `9311dae`.
- PR #204 review inventory: 2 conversation comments, 0 inline threads, 0 formal review submissions and 0 human approvals; `tarlaci1984-sketch` is requested. Human review remains outstanding.

### Other current-main and release candidates

- PR #200 exact HEAD `fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a`: Validation [44735858583](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858583), CodeQL [44735858347](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858347), and Dependency Review [44735858455](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858455) are 3/3 SUCCESS. Backend evidence is 539 tests, 27 readiness checks and 78 security/privacy checks. Issue #64 remains OPEN. Production SSRF acceptance is blocked pending independent security-owner approval, production NAT64/DNS64 inventory, deployed `USEIT_NAT64_PREFIXES` verification, and staging/production egress evidence. Its frontend runtime audit reports 3 moderate minimatch findings.
- PR #201 exact HEAD `776432e4e75327088034fa2f5448d96d7d71f068`: Validation [44735892822](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735892822), CodeQL [44735893037](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735893037), and Dependency Review [44735893258](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735893258) are 3/3 SUCCESS; its exact-head frontend npm audit reports found 0 vulnerabilities. It remains OPEN/DRAFT and unmerged.
- PR #203 exact HEAD `a006fdb882bfb6989487e3faea77db23f183839f`: Validation [44744190838](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190838), CodeQL [44744190840](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190840), and Dependency Review [44744190839](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190839) are 3/3 SUCCESS.
- PR #218 exact HEAD `c01fef68d1a33f5ca60f3cd8ed62781c4e59cb6e`: Validation [44945232153](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44945232153) is FAILURE in frontend assertion tests (333 passed / 4 failed); CodeQL [44945232175](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44945232175) and Dependency Review [44945232099](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44945232099) are SUCCESS.
- PR #219 exact HEAD `3ba1c4f20f7aab6dafa774bb8c2d11cb21c59735`: 0 exact-head workflow runs, 0 check-runs and 0 status contexts; GitHub reports mergeable=false. It has 4 commits and requires base reconciliation. Do not claim CI success or overwrite the branch.
- PR #220 exact HEAD `1adf04eb3b17f91873ab7724a0d946ad7343ae11`: Validation [44955675733](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44955675733), CodeQL [44955675682](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44955675682), and Dependency Review [44955675650](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44955675650) are 3/3 SUCCESS; it is stacked on PR #85.
- PR #221 exact HEAD `4b638819229e60e43705d1abbd939967fb744c86`: Validation [44966362140](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44966362140), CodeQL [44966362251](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44966362251), and Dependency Review [44966362153](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44966362153) are 3/3 SUCCESS; it is stacked on PR #218.
- PR #222 exact HEAD `6a4c0026be3e5d6f73cead92ea4f99a2dbf42042`: Validation [44978322495](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44978322495), CodeQL [44978322473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44978322473), and Dependency Review [44978322447](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44978322447) are 3/3 SUCCESS, but it is based on older PR #204 parent `429bcf42` and GitHub reports mergeable=false. Do not merge or close it automatically.

### Issues and security inventory

- Issue #47 is CLOSED with 11 comments. Its resolution is supported by the active main ruleset.
- Issue #64 is OPEN with 101 comments. PR #200 is the current-main DNS-rebinding/SSRF remediation candidate; source/tests and exact-head CI are not production deployment proof.
- Code Scanning, Dependabot and Secret Scanning alert inventories are **unverified, not empty**. The connected GitHub integration rejects these alert endpoint families; successful CodeQL and Dependency Review workflows do not establish repository-wide alert inventories are empty.
- GitHub Releases API returned an empty array: **0 published releases**.

### Canonical 25-point release register

The candidate row-level register contains exactly 25 items and parses to **2 Done / 15 In Progress / 8 Blocked**. Done: **#1, #6**. In Progress: **#3, #7–#15, #17, #19, #20, #23, #24**. Blocked: **#2, #4, #5, #16, #18, #21, #22, #25**. Main's separate register remains **3 Done / 15 In Progress / 7 Blocked**; the two registers are not silently merged.
- Row #10 and row #24 cite PR #204 exact HEAD `9311dae635423369badf9b4fcfdcc14aa26a8b96` and its own 3/3 exact-head workflow results.
- **#2 remains Blocked** pending the owner's durable repository-visibility and release-plan decision. **#4** requires production Apple App Attest entitlement and physical-iPhone verification. **#5** requires Play-installed physical Android Play Integrity. **#16** requires witnessed production backup/restore. **#18** requires a representative labeled product-recognition benchmark and business acceptance. **#21** requires production monitoring and witnessed alert delivery. **#22** requires approved staged rollout and tested rollback. **#25** requires a real-user pilot and explicit business sign-off.
- No physical-device, production-cloud, backup/restore, monitoring, rollout, or business-acceptance item is promoted by CI, simulator, or emulator evidence.

**Release decision: NOT READY. Production/pilot acceptance: NOT GRANTED.** Current PR #204 exact HEAD `9311dae` has 3/3 mandatory exact-head workflows SUCCESS, but its frontend runtime audit still reports 3 moderate findings and human review is outstanding. External acceptance remains blocked.

---

## Current release evidence checkpoint — 2026-11-20 23:18 CET

This checkpoint supersedes the 21:41 CET checkpoint. Evidence was refreshed at 22:18 UTC against live PR metadata, branch refs, exact-head Actions runs/jobs, issues, and release records. Current main is `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`. This checkpoint does not grant production or pilot acceptance.

### PR #41 — merged baseline

- PR #41 is CLOSED/MERGED on `fix/release-blockers-2026-10`. Live PR metadata and the source branch ref both report exact HEAD `68b380e73ca3c870048035197beef8febbf90ef1`. Merge commit: `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. The PR contains 517 commits, 100 changed files, +11,887 additions, and -2,005 deletions.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS on that exact SHA. Frontend, backend, iOS, CodeQL Analyze, and Dependency Review jobs all passed.
- Complete review inventory: 53 conversation comments, 30 inline review comments, 26 formal review submissions (25 COMMENTED and 1 human APPROVED by `tarlaci1984-sketch`), 22/22 inline threads resolved, 0 unresolved, and 109 combined timeline records.
- Historical runs [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255) are still QUEUED on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`; each has zero jobs. They are historical queues, not current-head successes or failures. Repository administrator cancellation is required.

### Main governance

- Repository visibility is public. Main HEAD is `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`; the branch API reports `protected: true`.
- Active ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) enforces six strict required checks (CodeQL, backend, frontend, ios, analyze, dependency-review), one approval, stale-approval dismissal, last-push approval, resolved review threads, deletion and non-fast-forward protection, and no bypass actors. The legacy branch-protection detail endpoint remains restricted to this integration; the active ruleset and branch metadata are the available evidence.

### Current-main remediation candidates

- **PR #193:** OPEN/DRAFT, 5 commits, 4 changed files, stacked on base `0b991f23856962a5164e63f864e3578130fee6ca`, not directly on main. Exact HEAD `c1250400f5c6022483c967c8b79a42be0dc614fd`; Validation [44743155619](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155619), CodeQL [44743155647](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155647), and Dependency Review [44743155582](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155582) all terminal SUCCESS on that SHA. Its frontend runtime audit reports 3 moderate minimatch findings.
- **PR #200:** OPEN/DRAFT on current main, exact HEAD `fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a`; Validation [44735858583](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858583), CodeQL [44735858347](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858347), and Dependency Review [44735858455](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858455) all terminal SUCCESS. DNS-pinned outbound transport validates complete DNS answers and redirect hops, pins numeric-IP TCP connections, verifies the connected peer, preserves Host/TLS SNI, and disables inherited proxies. Its frontend runtime audit still reports 3 moderate minimatch findings; a passing high-severity threshold is not a zero-finding audit. Production DNS64/NAT64 prefix inventory, deployed `USEIT_NAT64_PREFIXES` verification, staging/production egress evidence, and independent security-owner approval remain outstanding.
- **PR #201:** OPEN/DRAFT on current main, exact HEAD `776432e4e75327088034fa2f5448d96d7d71f068`; Validation [44735892822](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735892822), CodeQL [44735893037](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735893037), and Dependency Review [44735893258](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735893258) all terminal SUCCESS. Its exact-head frontend npm audit explicitly reports `found 0 vulnerabilities` after the minimatch 11.0.5 migration. It is unmerged and awaits human review.
- **PR #202:** OPEN/DRAFT on current main, exact HEAD `67eafbebd5f45724f2c97430fee4bc1a6d153746`; Validation [44735931701](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735931701), CodeQL [44735931794](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735931794), and Dependency Review [44735931634](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735931634) all terminal SUCCESS. CodeQL init and analyze use the same immutable v4.39.4 revision.
- **PR #203:** OPEN/DRAFT on current main, exact HEAD `a006fdb882bfb6989487e3faea77db23f183839f`; Validation [44744190838](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190838), CodeQL [44744190840](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190840), and Dependency Review [44744190839](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190839) all terminal SUCCESS. Its test-only change protects Node 22 for Android and iOS native prebuild. PRs #200–203 are based on current main; all remain unmerged and require human review.

### PR #204 — current documentation branch

- PR #204 is OPEN/DRAFT on `docs/release-evidence-current-main-20261120-run11`, based on main `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`, with 9 commits and 4 changed files. Current exact HEAD is `cbdb625f775acb0267069b2405972b4d2ea380f8`.
- Current exact-head Validation [44821276883](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44821276883) is terminal FAILURE. Frontend job [136596379668](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44821276883/job/136596379668) failed in `scripts/release-evidence-checkpoint.test.mjs`: 330 tests passed and 2 failed; 71 other test files passed. The two failures are stale test expectations: the test expects `450 pytest` although the current checkpoint does not assert that backend test count, and its regex `/published GitHub releases\s+0/i` omits the colon in the documented text `Published GitHub releases: 0`. This is a regression-test assertion defect, not an application failure.
- The frontend source-boundary check and TypeScript passed. Android export, Android Release/emulator smoke, Expo Doctor, and frontend runtime audit were skipped after the unit-test failure; no Android or frontend runtime-audit pass is claimed for this HEAD.
- Backend job [136596381544](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44821276883/job/136596381544) SUCCESS; its readiness suite reported 27 passed and production-security suite 78 passed, and the backend dependency-audit step completed successfully. iOS job [136596463771](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44821276883/job/136596463771) SUCCESS, including native iOS Release build and simulator smoke.
- Exact-head CodeQL [44821276876](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44821276876), Analyze job [136582473058](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44821276876/job/136582473058), terminal SUCCESS. Exact-head Dependency Review [44821276864](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44821276864), job [136582472196](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44821276864/job/136582472196), terminal SUCCESS. Its bot comment reports `Scanned Files: None`; this is not a repository-wide dependency or alert inventory.
- PR #204 review inventory: 2 conversation comments, 0 inline threads, 0 formal review submissions, and 0 human approvals. Reviewer `tarlaci1984-sketch` is requested. One human status comment still refers to the older `62c3bf1` HEAD and should be reconciled after the next exact-head validation.

### Issues and security

- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is CLOSED with 11 comments. Current main protection is verified through branch metadata and active ruleset 26370589.
- Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains OPEN with 84 comments. PR #200 is the current-main DNS-rebinding/SSRF successor. Older PR #99 remains based on the merged PR #41 commit, 17 commits ahead and 2 behind current main; its empty-body approval is not explicit independent security-owner sign-off. Production DNS64/NAT64 prefix inventory, deployed `USEIT_NAT64_PREFIXES` verification, and staging/production egress evidence remain missing.
- Issue [#155](https://github.com/milanradics89-beep/POS-Doctor/issues/155) remains OPEN with 92 comments. The picomatch advisory was withdrawn, but this does not constitute a patched package or complete runtime reachability assessment. Six lockfile resolutions remain; security-owner acceptance is incomplete.

### Repository inventory and security alert limitations

- Repository is public. Paginated branches: 161 (100 + 61 + 0). Open pull requests: 97. Open non-PR issues: 8. Published GitHub releases: 0.
- Code Scanning, Dependabot, and Secret Scanning alert inventories are unverified, not empty: the connected GitHub integration does not expose those alert endpoint families. Successful CodeQL/Dependency Review workflows and bot comments with `Scanned Files: None` do not establish empty alert inventories.
- Main still contains the older 2026-11-13 release records: `RELEASE_RUNBOOK.md` blob `b7b848743edf8fb8c238ef3367b0e74b64e6d540`, `RELEASE_PILOT_ACCEPTANCE.md` blob `f6bd4f041f802d0286b209769621079e517bd3a1`, and `25-POINT-RELEASE-BACKLOG.md` blob `891ec704b18bb1a59c9598b9fe2aedd0a9df9dae`. The refreshed records remain on this PR branch and are not yet integrated into main.

### Canonical 25-point release register

The row-level register contains 25 items and independently parses to **2 Done / 15 In Progress / 8 Blocked**. Done: **#1, #6**. In Progress: **#3, #7–#15, #17, #19, #20, #23, #24**. Blocked: **#2, #4, #5, #16, #18, #21, #22, #25**.

- **#2 remains Blocked** pending the owner's durable repository-visibility and release-plan decision. Issue #47 verifies branch protection; it does not record that separate final decision. Reverify the ruleset after any visibility change.
- **#4** requires production Apple App Attest entitlement and physical-iPhone verification. **#5** requires Play Integrity on a physical Android installed from Play. **#16** requires witnessed production backup/restore. **#18** requires a representative product-recognition benchmark and business acceptance. **#21** requires production monitoring and witnessed alert delivery. **#22** requires approved staged rollout and tested rollback. **#25** requires a real-user pilot and explicit business sign-off.
- No physical-device, production-cloud, backup/restore, monitoring, rollout, or business-acceptance item is promoted by CI, simulator, or emulator evidence.

**Release decision:** PR #204 current exact-head Validation failed only in the documentation regression-test file; CodeQL and Dependency Review passed. Correct the two stale assertions with a targeted test-only change, then verify all mandatory workflows on the resulting exact HEAD. No parent CI is substituted. This checkpoint does not grant production or pilot acceptance.

---

## Current release evidence checkpoint — 2026-11-20 21:41 CET

This checkpoint supersedes the 21:13 CET checkpoint. Evidence was refreshed at 20:41 UTC against current GitHub refs and exact-head workflow runs. Current main is `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`. PR #204 current exact HEAD is `2182ef09fb32f061780552df20a52aadae6770e5`; its own Validation is terminal FAILURE, while its own CodeQL and Dependency Review are terminal SUCCESS. No parent-run result is transferred. This checkpoint does not grant production or pilot acceptance.

### PR #41 — merged baseline

- PR #41 is CLOSED/MERGED on `fix/release-blockers-2026-10`. Its live branch ref and PR head both equal `68b380e73ca3c870048035197beef8febbf90ef1`. Merge commit: `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. It contains 517 commits, 100 changed files, +11,887 additions and -2,005 deletions.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS. Frontend, backend, iOS, CodeQL Analyze and Dependency Review jobs all succeeded.
- Review inventory: 53 conversation comments, 30 inline review comments, 26 formal submissions (25 COMMENTED, 1 human APPROVED), 22/22 inline threads resolved, 0 unresolved, 109 combined timeline records.
- Historical runs [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255) remain QUEUED on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`; each has zero jobs. They are historical queues, not successful or failed current-head checks. Repository administrator cancellation is required.

### Main governance

- Repository visibility is public. Main HEAD is `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`; branch metadata reports `protected: true`.
- Active ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) enforces six strict required checks (CodeQL, backend, frontend, ios, analyze, dependency-review), one approval, stale-approval dismissal, last-push approval, resolved review threads, deletion and non-fast-forward protection, with no bypass actors.
- The legacy branch-protection detail endpoint is restricted to this integration; the active ruleset and branch metadata are the available protection evidence.

### Current-main remediation candidates

- **PR #193:** exact HEAD `c1250400f5c6022483c967c8b79a42be0dc614fd`; Validation [44743155619](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155619), CodeQL [44743155647](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155647), and Dependency Review [44743155582](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155582) all terminal SUCCESS. It is stacked on base `0b991f23856962a5164e63f864e3578130fee6ca`, not directly on main. Its frontend runtime audit still reports 3 moderate minimatch findings.
- **PR #200:** exact HEAD `fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a`; Validation [44735858583](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858583), CodeQL [44735858347](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858347), and Dependency Review [44735858455](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858455) all terminal SUCCESS. DNS-pinned outbound transport validates DNS answers and redirect hops, pins numeric-IP connections, verifies the connected peer, preserves Host/TLS SNI, and disables inherited proxies. Its runtime audit still reports 3 moderate minimatch findings; the high-severity threshold passing is not a zero-finding audit. Production DNS64/NAT64 prefix inventory, deployed `USEIT_NAT64_PREFIXES` verification, staging/production egress evidence and independent security-owner approval remain outstanding.
- **PR #201:** exact HEAD `776432e4e75327088034fa2f5448d96d7d71f068`; Validation [44735892822](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735892822), CodeQL [44735893037](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735893037), and Dependency Review [44735893258](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735893258) all terminal SUCCESS. Its exact-head frontend npm audit explicitly reports `found 0 vulnerabilities` after the minimatch 11.0.5 override and lockfile update. This candidate remains OPEN/DRAFT and unmerged pending human review.
- **PR #202:** exact HEAD `67eafbebd5f45724f2c97430fee4bc1a6d153746`; Validation [44735931701](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735931701), CodeQL [44735931794](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735931794), and Dependency Review [44735931634](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735931634) all terminal SUCCESS. CodeQL init and analyze use the same immutable v4.39.4 revision.
- **PR #203:** exact HEAD `a006fdb882bfb6989487e3faea77db23f183839f`; Validation [44744190838](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190838), CodeQL [44744190840](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190840), and Dependency Review [44744190839](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190839) all terminal SUCCESS. Its test-only change asserts Node 22 for Android and iOS native prebuild. These four current-main candidates remain OPEN/DRAFT and await human review; no candidate is merged by this automation.

### PR #204 — current documentation branch

- **PR #204:** OPEN/DRAFT on current main, 7 commits and 4 changed files. Branch `docs/release-evidence-current-main-20261120-run11`; exact HEAD `2182ef09fb32f061780552df20a52aadae6770e5`.
- PR #204 current exact-head Validation [44810024178](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44810024178): terminal FAILURE. Backend job [136556435007](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44810024178/job/136556435007) SUCCESS; iOS job [136556511770](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44810024178/job/136556511770) SUCCESS, including native iOS Release build and simulator smoke; frontend job [136556433414](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44810024178/job/136556433414) FAILURE at Unit tests. The suite reported 331 passed and 1 failed, with 71 other test files passed. The failing regression assertion expected the obsolete literal `PR #204 exact-head Validation`; the checkpoint uses the label `**PR #204:**`. This is a test expectation/documentation-label mismatch, not an application defect. Android export/Release/emulator and frontend runtime-audit steps were skipped after the unit-test failure.
- PR #204 current exact-head CodeQL [44810024440](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44810024440), Analyze job [136543878467](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44810024440/job/136543878467): terminal SUCCESS. Dependency Review [44810024188](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44810024188), job [136543875977](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44810024188/job/136543875977): terminal SUCCESS.
- Validated parent `7dbc4110b25ab3a879f8711f005d7876b1fbb74e` independently passed its own Validation [44794452919](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44794452919), CodeQL [44794452874](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44794452874), and Dependency Review [44794452833](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44794452833). Those parent results are not transferred to current HEAD `2182ef0`.
- PR #204 review inventory: 2 conversation comments, 0 inline threads, 0 formal review submissions and 0 human approvals. Reviewer `tarlaci1984-sketch` is requested. One human status comment still refers to older SHA `62c3bf1` and needs reconciliation after the next exact-head validation.

### Separate stacked documentation child

- **PR #205** is a separate OPEN/DRAFT child in the PR #85 documentation chain, not a current-main PR and not part of PR #204. Exact HEAD `9f275e853429de173975f87bf1bd3ea476e7b9ce`, base `ea1bf815d90d91026b24c46ec1869b8218211d80`. Exact-head Validation [44799071611](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44799071611), CodeQL [44799071582](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44799071582), and Dependency Review [44799071704](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44799071704) all terminal SUCCESS. It changes the same three release records; reconcile overlapping documentation before integration. Its Dependency Review bot reports `Scanned Files: None`, not a repository-wide alert inventory.

### Issues #47, #64 and #155

- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is CLOSED with 11 comments. Current main branch protection is verified through branch metadata and active ruleset 26370589.
- Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains OPEN with 83 comments. PR #200 is the current-main DNS-rebinding/SSRF successor. Older PR #99 remains based on `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`, 17 commits ahead and 2 behind current main; its empty-body human approval is not explicit independent security sign-off. Production DNS64/NAT64 prefix inventory, deployed `USEIT_NAT64_PREFIXES` verification, and staging/production egress evidence remain missing.
- Issue [#155](https://github.com/milanradics89-beep/POS-Doctor/issues/155) remains OPEN with 90 comments. The picomatch advisory was withdrawn on 2026-11-18 by GitHub and OSV; this is not a patched npm release. Six lockfile resolutions remain and product-level runtime reachability/security-owner acceptance is incomplete. Do not import the unreviewed fork or suppress the audit.

### Repository inventory and security alerts

- Repository is public. Paginated branches: 161 (100 + 61 + 0). Open pull requests: 97. Open non-PR issues: 8. Published GitHub releases: 0.
- Code Scanning, Dependabot and Secret Scanning alert inventories are unavailable through the connected GitHub interface. Their status is **unverified, not empty**. Successful CodeQL/Dependency Review workflows and bot comments with `Scanned Files: None` do not establish empty alert inventories.
- The three release records on this PR branch carry identical checkpoint sections. Main still has the older 2026-11-13 records; this PR has not been merged.

### Canonical 25-point release register

The current row-level register is **2 Done / 15 In Progress / 8 Blocked**. Done: **#1, #6**. In Progress: **#3, #7–#15, #17, #19, #20, #23, #24**. Blocked: **#2, #4, #5, #16, #18, #21, #22, #25**.

- **#2 remains Blocked** pending the owner's durable public/private repository-visibility and release-plan decision. Issue #47 verifies active branch protection; it does not record that separate final decision. Reverify the ruleset after any visibility change.
- **#4** requires production Apple App Attest entitlement and verification on a physical iPhone. **#5** requires Play Integrity on a physical Android installed from Play. **#16** requires witnessed production backup/restore. **#18** requires a representative product-recognition benchmark and business acceptance. **#21** requires production monitoring and witnessed alert delivery. **#22** requires approved staged rollout and tested rollback. **#25** requires a real-user pilot and explicit business sign-off.
- The row-level table contains 25 items and independently parses to 2 Done / 15 In Progress / 8 Blocked. No physical-device, production, backup/restore, monitoring, rollout or business-acceptance item is promoted by CI, simulator or emulator evidence.

**Release decision:** PR #204 current exact-head Validation failed on a documentation regression-test assertion; CodeQL and Dependency Review passed. Fix the targeted test assertion, then rerun all mandatory workflows on the resulting exact HEAD. No parent CI is substituted. No production or pilot acceptance is granted.

---

## Current release evidence checkpoint — 2026-11-20 17:18 CET

This checkpoint supersedes the 15:07 CET branch checkpoint and the 2026-11-13 main-branch checkpoint. Evidence was refreshed at 16:18 UTC. Current main is `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`. The validated PR #204 parent is `b375c6608cbdd3436fa1893d2d118b2cab9f3d73`; all three workflows for that exact SHA are terminal SUCCESS. This documentation-only child must pass its own exact-head CI; no parent result is transferred. This checkpoint does not grant production or pilot acceptance.

### PR #41 — merged baseline

- PR #41 is CLOSED/MERGED on `fix/release-blockers-2026-10`; its live branch ref and PR head both equal `68b380e73ca3c870048035197beef8febbf90ef1`. Merge commit: `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. It contains 517 commits, 100 changed files, +11,887 additions and -2,005 deletions.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS on that SHA. Review inventory: 53 conversation comments, 30 inline comments, 26 formal submissions (25 COMMENTED, 1 human APPROVED), 22/22 inline threads resolved, 0 unresolved, 109 combined timeline records.
- Historical runs [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255) remain QUEUED on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`; each has zero jobs. Administrator cancellation is required.

### Main governance

- Repository visibility is public; main HEAD is `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266` and the branch API reports `protected: true`.
- Active ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) enforces six strict checks (CodeQL, backend, frontend, ios, analyze, dependency-review), one approval, stale-approval dismissal, last-push approval, resolved threads, deletion and non-fast-forward protection, with no bypass actors.

### Current-main candidates

- **PR #193:** exact HEAD `c1250400f5c6022483c967c8b79a42be0dc614fd`; Validation [44743155619](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155619), CodeQL [44743155647](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155647), Dependency Review [44743155582](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155582) all SUCCESS. It is stacked on base `0b991f23856962a5164e63f864e3578130fee6ca`, not directly on main. Its frontend audit still reports 3 moderate minimatch findings.
- **PR #200:** exact HEAD `fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a`; Validation [44735858583](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858583), CodeQL [44735858347](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858347), Dependency Review [44735858455](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858455) all SUCCESS. DNS-pinned transport is validated in CI; production prefix inventory, deployed `USEIT_NAT64_PREFIXES` and staging/production egress remain outstanding.
- **PR #201:** exact HEAD `776432e4e75327088034fa2f5448d96d7d71f068`; Validation [44735892822](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735892822), CodeQL [44735893037](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735893037), Dependency Review [44735893258](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735893258) all SUCCESS. Its exact-head frontend npm audit explicitly reports `found 0 vulnerabilities`; the minimatch 11.0.5 candidate is not merged and awaits human review.
- **PR #202:** exact HEAD `67eafbebd5f45724f2c97430fee4bc1a6d153746`; Validation [44735931701](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735931701), CodeQL [44735931794](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735931794), Dependency Review [44735931634](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735931634) all SUCCESS. CodeQL init/analyze use the same immutable v4.39.4 revision.
- **PR #203:** exact HEAD `a006fdb882bfb6989487e3faea77db23f183839f`; Validation [44744190838](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190838), CodeQL [44744190840](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190840), Dependency Review [44744190839](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190839) all SUCCESS. Its test-only change asserts Node 22 for Android and iOS native prebuild.
- **PR #204:** OPEN/DRAFT, 2 commits, 4 files, validated parent HEAD `b375c6608cbdd3436fa1893d2d118b2cab9f3d73`. Validation [44754308331](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44754308331), CodeQL [44754308313](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44754308313), Dependency Review [44754308298](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44754308298) all SUCCESS on that exact SHA. Validation backend [136349905143](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44754308331/job/136349905143), frontend [136349905785](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44754308331/job/136349905785), and iOS [136349905872](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44754308331/job/136349905872) passed; CodeQL analyze [136349905207](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44754308313/job/136349905207) and Dependency Review [136349905003](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44754308298/job/136349905003) passed. Frontend: 332 tests across 72 files, Expo Doctor 21/21, Android Release/emulator smoke; runtime npm audit still reports 3 moderate minimatch findings. Backend: 450 pytest, 27 readiness checks, 78 production-security checks; pip-audit reports no known vulnerabilities. iOS Release/simulator smoke passed. Dependency Review scanned no manifest files. PR #204 has 1 bot comment, 0 inline threads, 0 formal reviews, no human approval; `tarlaci1984-sketch` is requested.

### Issues #47 and #64

- [Issue #47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is CLOSED with 11 comments; main protection is independently verified above.
- [Issue #64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains OPEN with 79 comments. Older PR #99 is OPEN/DRAFT at `f91c70d2636948e538f8e3559afc39cd93eb5139`; comparison with current main is DIVERGED, 17 commits ahead and 2 behind. It has one human APPROVED review from `milanzoltanics`, but the empty review body is not explicit security sign-off. PR #200 is the current-main successor. Production acceptance still requires independent security-owner approval, production DNS64/NAT64 prefix inventory, deployed `USEIT_NAT64_PREFIXES` verification and staging/production egress evidence.

### Repository inventory and security alerts

- Paginated branches: 160 (100 + 60 + 0). Open pull requests: 96. Open non-PR issues: 8. published GitHub releases 0.
- Code Scanning, Dependabot and Secret Scanning alert inventories are unavailable through the connected integration; status remains **unverified, not empty**. Green CI is not an alert-inventory query.
- PR #193/#204 runtime npm audit: 3 moderate minimatch findings. PR #201's separate exact-head audit: `found 0 vulnerabilities`. Backend pip-audit on PR #204: no known Python vulnerabilities.

### Canonical 25-point release register

- **Done (2):** #1, #6.
- **In Progress (15):** #3, #7, #8, #9, #10, #11, #12, #13, #14, #15, #17, #19, #20, #23, #24.
- **Blocked (8):** #2, #4, #5, #16, #18, #21, #22, #25.
- #2 remains Blocked pending the owner's durable repository-visibility/release-plan decision. #4 requires production Apple App Attest and a physical iPhone; #5 requires Play Integrity on Play-installed physical Android; #16 witnessed production backup/restore; #18 representative product-recognition benchmark/business acceptance; #21 production monitoring/alert delivery; #22 approved staged rollout and tested rollback; #25 real-user pilot and business sign-off.

Production/pilot acceptance remains **NOT GRANTED**. External console setup, physical-device verification, production cloud access, witnessed backup/restore, staged rollout/rollback approvals and real-user/business approval remain blocked until direct evidence exists. No PR is merged automatically; no security threshold or required check is weakened.

---

## Current release evidence checkpoint — 2026-11-20 15:07 CET

This checkpoint supersedes the 2026-11-13 18:49 CET main-branch checkpoint and the earlier 2026-11-20 13:09 CET stacked-branch snapshot. It is based on current `main` HEAD `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266` and fresh GitHub evidence captured at 2026-11-20 14:07 UTC. CI results apply only to the exact SHA named beside each run. This checkpoint does not grant production or pilot acceptance.

### PR #41 — merged release-blocker baseline

- PR #41 is CLOSED/MERGED on source branch `fix/release-blockers-2026-10`; its exact source-branch ref and PR head are both `68b380e73ca3c870048035197beef8febbf90ef1`. The merge commit is `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`; current `main` has advanced to `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`.
- PR #41 contains 517 commits, 100 changed files, +11,887 additions and -2,005 deletions.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS on `68b380e73ca3c870048035197beef8febbf90ef1`. Validation frontend [132115828836](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234/job/132115828836), backend [132115829214](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234/job/132115829214), and iOS [132115829399](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234/job/132115829399) all passed; CodeQL analyze [132115827817](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161/job/132115827817) and Dependency Review [132115827187](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021/job/132115827187) also passed.
- Review inventory: 53 conversation comments, 30 inline review comments, 26 formal submissions (25 COMMENTED, 1 human APPROVED), 22/22 inline threads resolved, and 109 combined timeline records.
- Historical PR #41 runs [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255) remain QUEUED on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`; each jobs endpoint returns zero jobs. These are historical queues, not current-head failures; repository administrator cancellation is required.

### Current-main remediation candidates

- **PR #193 — release-document regression correction:** OPEN/DRAFT, stacked on `fix/release-doc-checkpoint-inventory-case-20261120-run11` at base SHA `0b991f23856962a5164e63f864e3578130fee6ca`, not based directly on current main. Exact HEAD `c1250400f5c6022483c967c8b79a42be0dc614fd`; 5 commits, 4 changed files, +653/-0 relative to its base. Its own Validation [44743155619](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155619), CodeQL [44743155647](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155647), and Dependency Review [44743155582](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155582) are terminal SUCCESS on that exact HEAD. Validation frontend [136311632814](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155619/job/136311632814), backend [136311633349](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155619/job/136311633349), and iOS [136311633065](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155619/job/136311633065) passed; CodeQL analyze [136311632689](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155647/job/136311632689) and Dependency Review [136311632118](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155582/job/136311632118) passed. Frontend: 307 tests across 61 files, TypeScript, Expo Doctor 21/21, Android Release and emulator smoke passed. Backend: 450 tests, 27 readiness checks, 78 production-security checks and pip-audit passed; pip-audit reported no known Python vulnerabilities. iOS Release and simulator smoke passed. The frontend runtime npm audit still reports 3 moderate minimatch findings; it is not clean. PR #193 has 1 conversation comment, 0 inline threads, 0 formal review submissions and no human approval. This stacked PR's evidence is not substituted for a current-main documentation commit.
- **PR #200 — DNS-pinned product-page transport:** OPEN/DRAFT on current main base `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`, exact HEAD `fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a`. Validation [44735858583](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858583), CodeQL [44735858347](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858347), and Dependency Review [44735858455](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858455) are terminal SUCCESS on that exact HEAD; frontend, backend and iOS jobs passed. Frontend reported 327 tests and Android Release/emulator plus iOS Release/simulator smoke passed; backend tests and pip-audit passed. The patch pins outbound TCP connections to validated numeric DNS answers, revalidates each redirect hop, checks the connected peer, preserves original Host/TLS SNI, disables environment proxy inheritance and requires explicit network-specific `USEIT_NAT64_PREFIXES`. Reviewer `tarlaci1984-sketch` is requested; no formal human approval or inline review thread is recorded. Production prefix inventory, deployed configuration and staging/production egress evidence remain outstanding.
- **PR #201 — minimatch migration:** OPEN/DRAFT on current main base `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`, exact HEAD `776432e4e75327088034fa2f5448d96d7d71f068`. Validation [44735892822](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735892822), CodeQL [44735893037](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735893037), and Dependency Review [44735893258](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735893258) are terminal SUCCESS on that exact HEAD; frontend, backend and iOS jobs passed. Frontend reported 334 tests, Android/iOS Release and smoke passed, and `npm audit --omit=dev --audit-level=high` explicitly reported **found 0 vulnerabilities**. The candidate pins all lockfile minimatch resolutions to 11.0.5 and adds regression coverage. It remains draft/open with reviewer `tarlaci1984-sketch` requested and no formal human approval. This is a candidate, not a merged-main audit result.
- **PR #202 — CodeQL action consistency:** OPEN/DRAFT on current main base `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`, exact HEAD `67eafbebd5f45724f2c97430fee4bc1a6d153746`. Validation [44735931701](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735931701), CodeQL [44735931794](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735931794), and Dependency Review [44735931634](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735931634) are terminal SUCCESS on that exact HEAD. Frontend reported 329 tests; backend and iOS jobs passed. CodeQL init and analyze use the same immutable v4.39.4 commit `1bd86f2fdb4b86187fa4059f16f31a3202acc9ea`, guarded by a regression test. Reviewer `tarlaci1984-sketch` is requested; no formal human approval or inline review thread is recorded.
- PR #99 remains an older DNS-pinning branch at `f91c70d2636948e538f8e3559afc39cd93eb5139`. Compared with current main it is DIVERGED: 17 commits ahead / 2 behind, merge base `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. PR #200 is the current-main successor; do not use PR #99's old green runs as current-main integration evidence.

### Issues, branch protection and release inventory

- Issue #47 is CLOSED with 11 comments. Main is protected and active ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) requires six strict checks (`CodeQL`, `backend`, `frontend`, `ios`, `analyze`, `dependency-review`), one approving review, stale-review dismissal, last-push approval and resolved review threads; deletion and non-fast-forward are blocked; no bypass actors are configured.
- Issue #64 remains OPEN with 76 comments. Its current-main successor PR #200 has passed exact-head CI, but independent human security approval, a production DNS64/NAT64 prefix inventory, verified deployed `USEIT_NAT64_PREFIXES`, and staging/production egress evidence are still missing. Production acceptance remains BLOCKED.
- Issue #155 remains OPEN with 83 comments. Advisory `GHSA-fc5q-39xc-vjpf` is WITHDRAWN (2026-11-18); the lockfile has six picomatch entries and repository-wide runtime-call reachability review remains incomplete. Withdrawal is not a patched-release claim.
- Repository visibility is PUBLIC. Current `main` is `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`; branch inventory is 159 (100 + 59, third page empty), open pull requests 95, open non-PR issues 8, and published GitHub releases 0.
- Code Scanning, Dependabot and Secret Scanning alert inventories are unavailable through the connected GitHub interface. Their status is **unverified, not empty**. Green CodeQL or Dependency Review workflows do not establish an empty alert inventory.

### Canonical 25-point release register

The current row-level register is **2 Done / 15 In Progress / 8 Blocked**. Done: **#1, #6**. In Progress: **#3, #7–#15, #17, #19, #20, #23, #24**. Blocked: **#2, #4, #5, #16, #18, #21, #22, #25**.

- **#2 remains Blocked** pending the owner's durable public/private repository-visibility and release-plan decision. Issue #47 verifies that branch protection is active and is correctly closed; that does not record the separate final visibility decision. Reverify the ruleset after any visibility change.
- External acceptance blockers remain #4 physical iPhone App Attest, #5 Play-installed physical Android Play Integrity, #16 witnessed production backup/restore, #18 representative product-recognition benchmark and business acceptance, #21 production monitoring and alert delivery, #22 approved staged rollout and tested rollback, and #25 real-user pilot/business sign-off.
- CI, emulators and simulators do not satisfy production console setup, physical-device verification, production cloud access, witnessed backup/restore, staged rollout approval or real-user/business acceptance.

**Release decision: NOT READY. Production/pilot acceptance: NOT GRANTED.** No published release exists. Human review remains outstanding on PRs #193, #200, #201 and #202; no PR is merged automatically by this process.

---

## Superseded release checkpoint — 2026-11-13 18:49 CET

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

---

## Current release evidence checkpoint — 2026-11-22 01:21 CET

Evidence refreshed at 2026-11-22 00:21 UTC from live PR metadata, branch refs, exact-head Actions runs/jobs, issue records, ruleset metadata, and release inventory. Main is `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`. This checkpoint does not grant production or pilot acceptance.

### PR #41 — merged baseline

- PR #41 is CLOSED/MERGED on `fix/release-blockers-2026-10`. PR metadata and the source branch ref both report exact HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge commit `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. The merged PR contains 517 commits, 100 changed files, +11,887 additions, and -2,005 deletions.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS on that exact SHA. Frontend, backend, iOS, CodeQL Analyze, and Dependency Review jobs all passed.
- Complete review inventory: 53 conversation comments, 30 inline review comments, 26 formal review submissions (25 COMMENTED and one human APPROVED by `tarlaci1984-sketch`), 22/22 inline threads resolved, 0 unresolved, and 109 combined timeline records.
- Historical runs [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255) remain QUEUED on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`; all three jobs endpoints return zero jobs. They are historical queues, not current-head failures. Repository administrator cancellation is required.

### PR #204 — clean-main release-documentation candidate

- PR #204 is OPEN/DRAFT on `docs/release-evidence-current-main-20261120-run11`, based on main `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`, with 10 commits and 4 changed files. PR metadata and branch ref agree: PR #204 current exact HEAD is `c3fd17a1029adb26962b8cb96b06ef87b5fee2a7`.
- Exact-head Validation [44828340885](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44828340885) is terminal FAILURE. Frontend job [136618168236](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44828340885/job/136618168236) failed one assertion in `scripts/release-evidence-checkpoint.test.mjs`: the test expects the obsolete phrase/head `PR #204 current exact HEAD is cbdb625...`, while the checkpoint uses a different sentence and records the prior head. This is a release-evidence/test-contract defect, not a demonstrated application runtime defect. Backend job [136618171118](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44828340885/job/136618171118) and iOS job [136618170211](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44828340885/job/136618170211) passed.
- Exact-head CodeQL [44828340790](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44828340790) and Dependency Review [44828341122](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44828341122) are terminal SUCCESS on the same SHA.
- PR #204 review inventory: 2 conversation comments, 0 inline threads, 0 formal review submissions, and 0 human approvals. Reviewer `tarlaci1984-sketch` is requested. The current candidate remains unapproved and unmerged.

### Other release-evidence candidates

- PR #206 exact HEAD `df0c26e7fb14b170b4f7cd80da570ce031480720`: Validation [44918462263](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44918462263) terminal FAILURE; CodeQL [44918462197](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44918462197) and Dependency Review [44918462179](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44918462179) SUCCESS.
- PR #217 exact HEAD `1ccbcd00ed02d2bad68bfc6bc3aaf2cb6c97845a`: Validation [44930055117](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44930055117) terminal FAILURE; CodeQL [44930055149](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44930055149) and Dependency Review [44930055266](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44930055266) SUCCESS.
- PR #218 exact HEAD `c01fef68d1a33f5ca60f3cd8ed62781c4e59cb6e`: Validation [44945232153](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44945232153) terminal FAILURE (frontend 333 passed / 4 failed; backend and iOS passed); CodeQL [44945232175](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44945232175) and Dependency Review [44945232099](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44945232099) SUCCESS.
- PR #219 exact HEAD `3ba1c4f20f7aab6dafa774bb8c2d11cb21c59735` has zero exact-head workflow runs, zero check-runs, and zero status contexts. Its recorded base SHA is `e638a5714481afbb08adc54877131d7152e5ab24`, while its live base branch (PR #218) is `c01fef68d1a33f5ca60f3cd8ed62781c4e59cb6e`; comparison is DIVERGED, 4 commits ahead / 1 behind. Its CodeQL inefficient-regex thread remains unresolved/outdated. The iterative parser correction in commit `6909afe` is not verified on current HEAD.
- PR #215 exact HEAD `061bd79a581f5c98385bab58dc9d355ece2f3fce` has 3/3 exact-head workflows SUCCESS, but is DIVERGED from the current PR #206 base (1 ahead / 5 behind) and is not mergeable.
- PR #220 exact HEAD `1adf04eb3b17f91873ab7724a0d946ad7343ae11`, a separate PR #85 test-only correction, has exact-head Validation [44955675733](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44955675733), CodeQL [44955675682](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44955675682), and Dependency Review [44955675650](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44955675650) all terminal SUCCESS. Frontend, backend, iOS, CodeQL Analyze, and Dependency Review jobs passed. This does not validate PR #204 or PR #219.

### Issues, security, and current-main remediation

- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is CLOSED with 11 comments. Active ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) protects main with six strict required checks, one approving review, last-push approval, resolved review threads, deletion/non-fast-forward protection, and no bypass actors. Repository visibility is public. The separate durable visibility/release-plan decision is not recorded; backlog item #2 remains Blocked.
- Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains OPEN with 96 comments. Current-main PR #200 exact HEAD `fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a` has Validation [44735858583](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858583), CodeQL [44735858347](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858347), and Dependency Review [44735858455](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858455) all terminal SUCCESS. Backend evidence: 539 tests, 27 production-readiness checks, 78 security/privacy checks, and a local TCP/TLS integration test. PR #200 has 0 formal reviews and 0 inline threads. Production remains BLOCKED pending independent security-owner approval, complete production NAT64/DNS64 prefix inventory, deployed `USEIT_NAT64_PREFIXES` verification, and staging/production egress evidence.
- Current-main PR #201 exact HEAD `776432e4e75327088034fa2f5448d96d7d71f068` has Validation [44735892822](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735892822), CodeQL [44735893037](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735893037), and Dependency Review [44735893258](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735893258) all terminal SUCCESS; its frontend runtime audit reports found 0 vulnerabilities. PR #201 remains an unmerged draft pending human review and does not make repository-wide security-alert inventories available.
- Current-main PR #203 exact HEAD `a006fdb882bfb6989487e3faea77db23f183839f` has Validation [44744190838](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190838), CodeQL [44744190840](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190840), and Dependency Review [44744190839](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190839) all terminal SUCCESS.
- Issue #74 has 356 comments; issue #149 has 275; issue #155 has 120. The separate 64-item development checklist remains 41 checked / 23 open. The earlier frontend runtime audit reported 3 moderate minimatch findings; PR #201's separate exact-head audit reports 0 vulnerabilities, but it remains unmerged and full alert inventories remain unavailable.

### Release records and 25-point register

- Main's three release records remain on the 2026-11-13 checkpoint. Main `RELEASE_PILOT_ACCEPTANCE.md` still incorrectly says PR #41 is open/unmerged and had zero human approvals; live GitHub shows it is merged with one human approval. This is a real documentation defect and must be integrated through a reviewed candidate, not a direct main edit.
- The three PR #204 candidate documents are synchronized but their previous checkpoint is stale. This commit appends the current exact-head evidence section to all three and updates register rows #10 and #24 without changing any status.
- The candidate row-level 25-point register contains exactly 25 rows: **2 Done / 15 In Progress / 8 Blocked**. Done: #1, #6. In Progress: #3, #7–#15, #17, #19, #20, #23, #24. Blocked: #2, #4, #5, #16, #18, #21, #22, #25. Main's older register remains 3 Done / 15 In Progress / 7 Blocked; the two registers are not silently merged.
- #2 remains Blocked pending the owner's durable visibility/release-plan decision. #4 physical iPhone App Attest; #5 Play-installed physical Android Play Integrity; #16 witnessed production backup/restore; #18 representative product-recognition benchmark/business acceptance; #21 production monitoring and witnessed alert delivery; #22 approved staged rollout and tested rollback; #25 real-user pilot and business sign-off remain Blocked.
- Published GitHub releases: 0. Code Scanning, Dependabot, and Secret Scanning alert inventories are unavailable through the connected GitHub integration: **unverified, not empty**.

**Release decision: NOT READY. Production/pilot acceptance: NOT GRANTED.** No CI result from a parent commit is attributed to a child SHA. No simulator, emulator, or automated test result is promoted into physical-device, production, backup/restore, monitoring, rollout, or business acceptance.

---

---

## Current release evidence checkpoint — 2026-11-22 03:54 CET

Evidence refreshed at 02:54 UTC from live PR metadata, exact branch refs, exact-head Actions runs and jobs, review threads and submissions, issue records, the active main ruleset, the release-branch search, and the GitHub Releases endpoint. Main is `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`. This checkpoint does not grant production or pilot acceptance.

### PR #41 — merged baseline

- PR #41 is CLOSED/MERGED on `fix/release-blockers-2026-10`. Live PR metadata and the source branch ref both report exact HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge commit `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. It contains 517 commits, 100 changed files, +11,887 additions and -2,005 deletions. The source branch ref is not protected; main is protected by the active ruleset.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS on that exact SHA. Frontend, backend, iOS, CodeQL Analyze, and Dependency Review jobs all passed.
- Review inventory: 109 combined timeline records; 53 conversation comments, 30 inline review comments, 26 formal review submissions (25 COMMENTED and one human APPROVED by `tarlaci1984-sketch`), 22/22 inline review threads resolved, 0 unresolved, and 20 outdated threads.
- Historical runs [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255) remain QUEUED on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`; each jobs endpoint returns zero jobs. They are historical queues, not current-head results. Repository administrator cancellation is required.
- The PR description retains superseded historical open/unmerged wording. Live PR metadata is authoritative.

### Main governance and repository inventory

- Repository visibility is public. Main HEAD is `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`; the main branch API reports `protected: true`.
- Active ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) is active on the default branch. It requires six strict checks (`CodeQL`, `backend`, `frontend`, `ios`, `analyze`, `dependency-review`), one approval, stale-approval dismissal, last-push approval, resolved review threads, deletion and non-fast-forward protection, and no bypass actors.
- The paginated release-branch search returned 81 matching branch names and is complete. GitHub Releases API returned an empty array: **Published GitHub releases: 0**.
- Main's three release documents remain on their older 2026-11-13 checkpoint. The refreshed candidate records are on PR #204's branch only; PR #204 is still draft and unmerged.

### PR #204 — current-main release-documentation candidate

- PR #204 is OPEN/DRAFT on `docs/release-evidence-current-main-20261120-run11`, based on main `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`, with 13 commits and 4 changed files. PR metadata and the branch ref agree: PR #204 current exact HEAD is `429bcf42e654dd7875eb1ec6e9121785641fdebb`.
- Current exact-head Validation [44973384594](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44973384594) is terminal FAILURE. Frontend job [137063021907](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44973384594/job/137063021907) failed Unit tests: **333 passed / 1 failed across 72/72 files** (71 files passed, one file failed). The failing assertion in `scripts/release-evidence-checkpoint.test.mjs` expects the literal `PR #218 exact HEAD`, while the checkpoint correctly formats the label as `**PR #218** exact HEAD`. The corresponding PR #219 assertion has the same Markdown-format assumption and is being corrected in the test contract. This is a documentation/test-contract mismatch, not a demonstrated application runtime defect.
- After the frontend unit-test failure, pinned Expo Doctor, Android export, native Android Release build, Android emulator smoke, and frontend runtime dependency audit were skipped on this exact HEAD. No result is claimed for those steps.
- Backend job [137063022997](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44973384594/job/137063022997) passed **450 pytest tests**, **27 production-readiness checks**, and **78 security/privacy checks**; pip-audit reported **No known vulnerabilities found**. iOS job [137063023297](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44973384594/job/137063023297) passed native Release build and simulator install/launch smoke.
- CodeQL [44973384562](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44973384562), Analyze job `137057808508`, and Dependency Review [44973384597](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44973384597), job `137057808240`, are terminal SUCCESS on the same exact HEAD `429bcf42`.
- Previous PR #204 HEAD `a676a8420a3a98093d3687476b3fbc987a080a98` had terminal Validation FAILURE (330 passed / 3 failed across 71/72 files), CodeQL SUCCESS, and Dependency Review SUCCESS. Earlier PR #204 HEAD `ef8b92b63ce3449b061728f56c351671f46ffe14` had 3/3 exact-head workflows SUCCESS; its frontend recorded **332 tests across 72 test files**, Android Release/emulator smoke and runtime audit. This is historical ancestor evidence only, not validation for `429bcf42`. That ancestor runtime audit reported **3 moderate severity vulnerabilities** in transitive minimatch via `@expo/fingerprint`; the proposed `npm audit fix --force` would downgrade Expo and was not run.
- PR #204 review inventory: 2 conversation comments, 0 inline threads, 0 formal review submissions, and 0 human approvals. Reviewer `tarlaci1984-sketch` is requested. The candidate remains unapproved and unmerged.

### Other release and security candidates

- **PR #218** exact HEAD `c01fef68d1a33f5ca60f3cd8ed62781c4e59cb6e`: Validation [44945232153](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44945232153) terminal FAILURE (frontend 333 passed / 4 failed; backend and iOS passed); CodeQL [44945232175](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44945232175) and Dependency Review [44945232099](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44945232099) terminal SUCCESS on that same SHA.
- **PR #219** exact HEAD `3ba1c4f20f7aab6dafa774bb8c2d11cb21c59735` has zero exact-head workflow runs, zero check-runs, and zero status contexts. Its recorded base SHA is `e638a5714481afbb08adc54877131d7152e5ab24`, while the current base branch (PR #218) is at `c01fef68d1a33f5ca60f3cd8ed62781c4e59cb6e`; comparison is DIVERGED, 4 commits ahead / 1 behind. The CodeQL inefficient-regex review thread remains unresolved/outdated. The iterative parser and assertion corrections are present but unverified on this exact HEAD. Do not overwrite or force-push this concurrent branch.
- **PR #220 exact HEAD `1adf04eb3b17f91873ab7724a0d946ad7343ae11`** is a separate PR #85 test-only correction; exact-head Validation [44955675733](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44955675733), CodeQL [44955675682](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44955675682), and Dependency Review [44955675650](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44955675650) are terminal SUCCESS. This does not validate PR #204 or #219.
- **PR #200 exact HEAD `fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a`**: Validation [44735858583](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858583), CodeQL [44735858347](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858347), and Dependency Review [44735858455](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858455) are terminal SUCCESS. Backend evidence is 539 tests, 27 readiness checks and 78 security/privacy checks; frontend runtime audit evidence records 3 moderate minimatch findings. PR #200 has 0 formal reviews and 0 inline threads; reviewer `tarlaci1984-sketch` is requested. Production acceptance remains BLOCKED pending independent security-owner approval, complete NAT64/DNS64 prefix inventory, deployed `USEIT_NAT64_PREFIXES` verification, and staging/production egress evidence.
- **PR #201 exact HEAD `776432e4e75327088034fa2f5448d96d7d71f068`**: Validation [44735892822](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735892822), CodeQL [44735893037](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735893037), and Dependency Review [44735893258](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735893258) are terminal SUCCESS. Its exact-head frontend npm audit reported **found 0 vulnerabilities** after minimatch 11.0.5 migration; the PR remains OPEN/DRAFT pending human review.
- **PR #203 exact HEAD `a006fdb882bfb6989487e3faea77db23f183839f`**: Validation [44744190838](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190838), CodeQL [44744190840](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190840), and Dependency Review [44744190839](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190839) are terminal SUCCESS.

### Issues and security inventory

- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is CLOSED with 11 comments. Main protection is verified through the active ruleset and main branch metadata.
- Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains OPEN with 97 comments. Its current-main DNS-rebinding SSRF remediation candidate is PR #200; CI and local transport tests are not production acceptance.
- Code Scanning, Dependabot, and Secret Scanning alert inventories are unavailable through the connected GitHub integration: **unverified, not empty**. The corresponding alert endpoints are not exposed by the integration; successful CodeQL and Dependency Review workflows do not prove repository-wide alert inventories are empty.

### Canonical 25-point release register

The candidate row-level register contains exactly 25 items and parses to **2 Done / 15 In Progress / 8 Blocked**. Done: **#1, #6**. In Progress: **#3, #7–#15, #17, #19, #20, #23, #24**. Blocked: **#2, #4, #5, #16, #18, #21, #22, #25**. Main's separate register remains **3 Done / 15 In Progress / 7 Blocked**; the two registers are not silently merged.
- **#2 remains Blocked** pending the owner's durable repository-visibility and release-plan decision; active branch protection alone does not record that separate decision.
- **#4** requires production Apple App Attest entitlement and physical-iPhone verification. **#5** requires Play-installed physical Android Play Integrity. **#16** requires witnessed production backup/restore. **#18** requires a representative labeled product-recognition benchmark and business acceptance. **#21** requires production monitoring and witnessed alert delivery. **#22** requires approved staged rollout and tested rollback. **#25** requires a real-user pilot and explicit business sign-off.
- No physical-device, production-cloud, backup/restore, monitoring, rollout, or business-acceptance item is promoted by CI, simulator, or emulator evidence.

**Release decision: NOT READY. Production/pilot acceptance: NOT GRANTED.** No CI result from a parent commit is attributed to a child SHA. The latest PR #204 exact HEAD `429bcf42` has Validation FAILURE, CodeQL SUCCESS and Dependency Review SUCCESS; human review and external release acceptance remain outstanding.


---

