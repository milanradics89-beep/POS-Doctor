# POS-Doctor Release Watch — Current Evidence Snapshot

**Captured:** 2026-11-24 07:41 CET  
**Repository:** milanradics89-beep/POS-Doctor  
**Documentation branch:** fix/pr262-checkpoint-evidence-assertions-20261124-run11

## Current repository state

- Main: 3a262358552a9650d865aa5bd3c92905f1e863cb.
- Protect main #26370589 remains ACTIVE and unchanged: six strict checks, one approving review, last-push approval, resolved-thread requirement, deletion/non-fast-forward protection, no bypass actors.
- 220 branches, 131 open PRs, 8 open non-PR issues, 0 published releases.
- Issue #74: 64 items / 41 checked / 23 open. Separate 25-point register: 2 Done / 15 In Progress / 8 Blocked.
- Alert inventories: UNAVAILABLE, UNVERIFIED, NOT EMPTY.

## PR #249, #262 and #261

- PR #249 OPEN/DRAFT exact HEAD 6cd5acd991f1db74d1e79277f8e84884f1b885a5. Validation #45339568119 failed on 2 documentation assertions (352 passed / 2 failed across 72 files); CodeQL #45339568138 and Dependency Review #45339568192 succeeded. Backend and iOS passed; Android Expo Doctor/export/Release/emulator and runtime npm audit were skipped. No formal reviews or inline threads.
- PR #262 OPEN/DRAFT exact HEAD 4da3724366ba7248d97b8466a2d8272938aa6b86. Validation #45333673992 failed on 2 documentation assertions (353 passed / 2 failed); CodeQL #45333673995 and Dependency Review #45333674002 succeeded. Backend and iOS passed; Android validation and frontend runtime audit were skipped.
- Child branch fix/pr262-checkpoint-evidence-assertions-20261124-run11 was created from the terminal #262 head to correct the missing explicit #5 blocker and make checkpoint/register timestamp selection robust. No parent branch is overwritten.
- PR #261 exact HEAD 8532e130788e2d02877aeb9feb73360d54142a78: Validation #45341213308 remains in progress; frontend failed Expo Doctor on three SDK57 package patch mismatches, backend passed and iOS is running. CodeQL #45341213405 and Dependency Review #45341213310 passed. No Google Cloud WIF proof.

## SDK57 and minimatch candidates

- PR #254 exact HEAD 2c9d9ef7a052a2a55b491925c8c40d9fc3649bd3: 3/3 CI success; 327/327 frontend tests; Expo Doctor 21/21; Android/iOS release and smoke passed; runtime audit still reports 3 moderate minimatch findings.
- PR #246 exact HEAD ad614dd25d0fd11d3d50737718e7dbd88a74c89a: 3/3 CI success; 335/335 frontend tests; full moderate/runtime audits 0 findings; unmerged, 0 reviews/threads.
- PR #260 exact HEAD ae74da6d8f6a8f35ceb2a5b3696578218a92bffd: 3/3 CI success; 360/360 frontend tests, Expo Doctor 21/21, Android/iOS Release and smoke, 539 backend tests, 27 readiness checks, 78 security/privacy checks, pip-audit clean, full moderate/runtime audits 0 findings. It diverges from current #249 by 4 ahead / 4 behind; CI is not inherited.

## Release checkpoint chain

- PR #85 exact HEAD e3cc12a5ecb36877bdee5984ddd09d5e4f8f7bc9: 3/3 CI success; 16 COMMENTED reviews, 9/9 resolved threads, 0 human approvals; runtime audit 3 moderate minimatch findings.
- PRs #163–#166 and #168–#169 failed frontend Unit-test assertions. PRs #167 and #170 reached runtime npm audit and failed historically with 28 findings (2 moderate, 26 high). These are separate failure classes and predate the picomatch advisory withdrawal.
- PRs #171 and #172 each have 3/3 exact-head CI success, 0 review submissions and 0 inline threads. Their frontend logs report 3 moderate minimatch findings and no picomatch finding.

## Picomatch / Issue #155

- GHSA-fc5q-39xc-vjpf / CVE-2026-112366 was withdrawn on 2026-11-18. Snyk marks the JS advisory revoked; OSV records withdrawal but retains historical HIGH CVSS metadata. Official npm still lists picomatch 4.0.7 as latest; there is no 4.0.8 patched release.
- Main lockfile still contains picomatch, but current-main product reachability review found no app-source glob call site or untrusted user-defined glob pattern route. Keep Issue #155 open for documented product-level acceptance; do not label the withdrawn advisory an active HIGH blocker.
- Upstream PRs #264, #265, #254, #257 and #246 remain open with action_required runs and zero jobs. #257 has one APPROVED review. Upstream #238 remains open; Tests #39833229778 is FAILURE with zero jobs, 6 reviews (3 COMMENTED, 3 APPROVED), 0 inline threads. PR #235 is closed unmerged.
- The secured-picomatch fork remains rejected: master is unprotected, release commit unsigned, PR #1 has no independent reviews/threads, and npm provenance/integrity is unverified. Do not import, pin or override it.

## SSRF production acceptance

- Issue #64 remains OPEN with 136 comments. PR #99 exact HEAD f91c70d2636948e538f8e3559afc39cd93eb5139 passed 3/3 workflows; 4 COMMENTED and 1 APPROVED review, 2/2 threads resolved. The approval is not verified as authorized independent security-owner approval.
- PR #200 is merged; its DNS-pinned transport is integrated into main. Production acceptance remains blocked by independent security-owner approval, full production NAT64/DNS64 prefix inventory, verified deployed USEIT_NAT64_PREFIXES, and staging/production egress evidence.

## Canonical release register

**2 Done / 15 In Progress / 8 Blocked.** The eight blocked items are #2, #4, #5, #16, #18, #21, #22 and #25. The current 25-row register is in docs/25-POINT-RELEASE-BACKLOG.md.

**Release decision: NOT READY. Production/pilot acceptance: NOT GRANTED.**