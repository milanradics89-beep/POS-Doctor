# POS Doctor — Development Plan

## 1) Objectives
- Deliver a **fully self-contained Android (React Native + Expo) app** for technicians to discover Android POS terminals on local WiFi and run **real ADB-over-WiFi diagnostics** (no laptop, no backend).
- Implement the **core workflow end-to-end**: subnet scan → connect ADB → run shell commands → parse → dashboard.
- Provide **English/Hungarian** UI toggle with persistent setting.
- Persist **diagnostic history** per terminal (by serial) and enable **export/share** (text + PDF).
- Fit environment constraints: ship complete mobile source under `/app/mobile/` + a **web UI replica** for preview.

---

## 2) Implementation Steps

### Phase 1 — Core POC (Isolation): ADB-over-WiFi from a phone (must work before UI build-out)
**Goal:** Prove we can connect to a real POS terminal via TCP:5555 and execute `getprop`/`dumpsys` reliably from an Android app build.

User stories:
1. As a technician, I want the app to connect to an IP:5555 target so I can start diagnostics without a laptop.
2. As a technician, I want the app to run `getprop` and show manufacturer/model so I know I selected the right terminal.
3. As a technician, I want clear errors when ADB auth fails so I can fix pairing/setup quickly.
4. As a technician, I want a reconnect button so intermittent WiFi doesn’t block the job.
5. As a technician, I want a minimal command runner so I can validate connectivity before full diagnostics.

Steps:
- Web research: best practice for **ADB protocol in JS**, auth/RSA key handling, and React Native TCP socket constraints.
- Decide core transport implementation:
  - Primary: **Pure JS ADB wire protocol** using `react-native-tcp-socket` + local RSA keypair.
  - Secondary/fallback: **Expo bare + Kotlin native module** bridging to `dadb` (or equivalent) if JS implementation hits blockers.
- Build a minimal RN screen: input IP/port → Connect → Run `getprop ro.product.manufacturer`, `ro.product.model`, `ro.serialno`.
- Verify against real device behavior assumptions:
  - Device must have ADB-over-network enabled and authorized.
  - Handle unauthorized/offline/timeouts distinctly.
- “Fix until it works” loop: connection lifecycle, packet framing, shell response capture, timeouts.

Deliverables:
- `/app/mobile/packages/adb/` (or similar) containing the ADB client core.
- A minimal POC screen and logs proving real command output (no mocks).

---

### Phase 2 — V1 App Development (MVP around proven core)
**Goal:** Full technician flow with discovery, diagnostics dashboard, bilingual UX, persistence.

User stories:
1. As a technician, I want automatic subnet discovery with manual override so I can find terminals on any network.
2. As a technician, I want to see a list of discovered terminals with manufacturer/model so I can pick the right one fast.
3. As a technician, I want one-tap “Run Diagnostics” so I can generate a health report quickly.
4. As a technician, I want color-coded component status so I can immediately identify faults.
5. As a technician, I want results grouped in collapsible sections so I can navigate long outputs easily.

Steps:
- Project scaffolding:
  - Create Expo (bare workflow if needed for native modules) under `/app/mobile/`.
  - Add navigation (stack + tabs), dark theme UI kit.
  - Add i18n system (EN/HU) + persisted setting.
- Discovery:
  - Auto-detect device subnet from WiFi IP; allow manual CIDR/IP range override.
  - Implement fast port scan for 5555 with concurrency + cancellation.
  - On discovery, fetch `getprop` fields to enrich list entries.
- Diagnostics engine:
  - Define command set and parsers:
    - `dumpsys battery`, `dumpsys nfc`, `dumpsys wifi`, `dumpsys telephony.registry`, `dumpsys meminfo`, `dumpsys activity`, `getprop`.
  - Normalize into structured JSON results.
  - Status scoring rules (OK/Warn/Fault) per component.
- UI:
  - Terminal list + detail screen.
  - Diagnostics dashboard with collapsible cards + indicators.
  - “Re-run diagnostics” refresh.
- Persistence:
  - Store terminals by serial + last known IP + history entries (SQLite or MMKV).
- Export:
  - Generate shareable **plain text report**.
  - Generate **PDF** (expo-print / react-native-pdf-lib) and share (expo-sharing).
- Web preview replica:
  - Update `/app/frontend/` to render the same screens in a phone frame (UI-only preview); clearly label that live ADB runs only in APK.

Phase-end testing:
- Run 1 E2E pass on web preview for UI/flows.
- Validate mobile build steps locally via documented EAS workflow (since APK cannot be built here).

---

### Phase 3 — Hardening + Feature Completion
**Goal:** Reliability, better parsing, better UX, and operational readiness for field use.

User stories:
1. As a technician, I want a diagnostic run to show progress per category so I know it’s not stuck.
2. As a technician, I want partial results preserved if one command fails so I still get value.
3. As a technician, I want history comparison (last vs current) so I can see regressions.
4. As a technician, I want export to include timestamps and device identifiers so reports are audit-ready.
5. As a technician, I want resilient scanning (pause/resume/cancel) so I can control network load.

Steps:
- Robustness:
  - Retries/backoff; per-command timeout; better error classification.
  - Connection pooling vs per-command connect (based on POC learnings).
- Parsers:
  - Expand/adjust dumpsys parsing for vendor variations.
  - Add explicit handling for “feature absent” vs “fault”.
- UX improvements:
  - Progress UI, cancel diagnostics, background-safe behavior.
  - More actionable recommendations in each section (EN/HU).
- Data model refactor for long-term maintainability.

Phase-end testing:
- 1 E2E pass on core flows + regression checks on language toggle, history, export.

---

### Phase 4 — Packaging & Release Readiness
User stories:
1. As an installer, I want a repeatable APK build process so I can ship to technicians reliably.
2. As a technician, I want the app to work offline on-site so I’m not blocked by connectivity.
3. As a technician, I want consistent behavior across Android versions so I can trust results.
4. As a technician, I want app permissions explained so I can grant them confidently.
5. As a maintainer, I want logs/exportable debug bundle so field issues are diagnosable.

Steps:
- EAS config (`eas.json`), build profiles, signing guidance.
- Android permissions review (WiFi/network state, storage/share).
- Performance: scanning concurrency tuning, memory safety.
- Add optional “diagnostic debug bundle” export.

---

## 3) Next Actions
1. Implement Phase 1 POC with **pure JS ADB wire protocol** + `react-native-tcp-socket`.
2. If blocked by auth/transport constraints, implement Kotlin module fallback and re-test.
3. Once ADB POC is proven, proceed to subnet scanning + terminal list (Phase 2).
4. Build dashboard + parsers, then persistence + export.
5. Produce web UI replica for preview and finalize EAS build instructions.

---

## 4) Success Criteria
- From the Android app, on a real POS terminal with ADB-over-WiFi enabled, the app can:
  - Discover devices on subnet (auto + manual),
  - Connect to ADB on port 5555,
  - Execute `getprop` + required `dumpsys` commands,
  - Display a structured, color-coded health dashboard,
  - Save history keyed by serial,
  - Export/share report (text + PDF),
  - Toggle EN/HU with persistence.
- No backend services required; all diagnostics run locally on the phone.
- Web preview accurately reflects UI/UX flows (with clear limitation note about live ADB).
