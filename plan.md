# POS Doctor — Development Plan (Updated)

## 1) Objectives
- Deliver a **fully self-contained Android (React Native + Expo) app** for technicians to discover Android POS terminals on local WiFi and run **real ADB-over-WiFi diagnostics** (no laptop, no backend).
- Implement the **core workflow end-to-end** on-device: subnet scan → connect ADB → run shell commands → parse → technician dashboard.
- Provide **English/Hungarian** UI toggle with persistent setting.
- Persist **diagnostic history** per terminal (by serial) and enable **export/share** (text + PDF).
- Fit environment constraints: ship complete mobile source under `/app/mobile/` + a **web UI replica** for the preview URL.
- Ensure the implementation is **not reliant on bundling an adb binary** (which is fragile on Android/Expo); instead use a **pure JS ADB wire-protocol client** over TCP with RSA authentication.

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

Steps (executed):
- Web research: constraints and best practices for **ADB protocol in JS**, auth/RSA key handling, and React Native TCP socket limitations.
- Implemented a full **Node.js protocol POC** (mock device server + client) proving:
  - CRC32 framing
  - ADB 24-byte header encode/decode
  - CNXN handshake
  - AUTH handshake (RSA token/signature)
  - OPEN/WRTE/OKAY/CLSE shell stream execution
  - subnet port scanning logic
  - end-to-end multi-command “diagnostic flow”
- Fixed stream ID accounting in the POC until **all tests passed**.

Deliverables (completed):
- ✅ `/app/tests/poc/adb_poc.js` — ADB protocol test suite (8/8 passing).

Status: **COMPLETED**

---

### Phase 2 — V1 App Development (MVP around proven core)
**Goal:** Full technician flow with discovery, diagnostics dashboard, bilingual UX, persistence, export, plus web UI replica.

User stories:
1. As a technician, I want automatic subnet discovery with manual override so I can find terminals on any network.
2. As a technician, I want to see a list of discovered terminals with manufacturer/model so I can pick the right one fast.
3. As a technician, I want one-tap “Run Diagnostics” so I can generate a health report quickly.
4. As a technician, I want color-coded component status so I can immediately identify faults.
5. As a technician, I want results grouped in collapsible sections so I can navigate long outputs easily.

Steps (updated with progress):

#### 2.1 Project scaffolding (Mobile)
- Create Expo + TypeScript project under `/app/mobile/`.
- Add navigation (Native Stack).
- Implement dark theme token system.
- Implement i18n (EN/HU) with persistent language toggle.

**Completed artifacts:**
- ✅ `/app/mobile/` Expo project created.
- ✅ Navigation + screens wired: Scan → Device Detail → Diagnostics → History.
- ✅ Dark theme + components: TopNav, StatusBadge, CollapsibleCard, DeviceListItem, BottomActionBar.
- ✅ EN/HU translation system in `/app/mobile/src/i18n/` with AsyncStorage persistence.

#### 2.2 ADB Client core (Mobile)
- Implement **pure JS ADB wire protocol** over TCP (`react-native-tcp-socket`).
- Implement RSA keypair generation and ADB auth (token/signature + public key payload).
- Provide shell command execution (OPEN/WRTE/OKAY/CLSE) with timeouts.

**Completed artifacts:**
- ✅ `/app/mobile/src/adb/AdbProtocol.ts` (framing/CRC/parser)
- ✅ `/app/mobile/src/adb/AdbAuth.ts` (node-forge RSA + Android pubkey payload)
- ✅ `/app/mobile/src/adb/AdbClient.ts` (connect/auth/shell)

#### 2.3 Discovery (Subnet scan)
- Auto-detect subnet from WiFi IP (NetInfo) with manual override.
- Scan `/24` on port 5555 with concurrency + cancellation.
- Probe discovered devices with `getprop` to enrich manufacturer/model/serial.

**Completed artifacts:**
- ✅ `/app/mobile/src/adb/SubnetScanner.ts`
- ✅ Scan screen integrates scanning + probe.

#### 2.4 Diagnostics engine + dashboard
- Implement command set and parsers:
  - battery, nfc, wifi, telephony.registry, meminfo, activity/uptime, getprop props
  - card reader / EMV / contactless are best-effort via `service list` + `getprop` heuristics (vendor variability acknowledged)
- Build structured report, category statuses, and overall health score.
- UI: 10 collapsible sections, color-coded statuses, re-run, export.

**Completed artifacts:**
- ✅ `/app/mobile/src/adb/DiagnosticCommands.ts`
- ✅ `DiagnosticsScreen` dashboard + collapsibles + action bar.

#### 2.5 Persistence + export
- Store diagnostic history per terminal serial in AsyncStorage.
- Export report as **text** and **PDF**, share via native share sheet.

**Completed artifacts:**
- ✅ `/app/mobile/src/storage/index.ts`
- ✅ `/app/mobile/src/export/index.ts` (expo-print + expo-sharing)

#### 2.6 Build packaging / docs
- EAS build profiles for APK + instructions.

**Completed artifacts:**
- ✅ `/app/mobile/eas.json`
- ✅ `/app/mobile/app.json`
- ✅ `/app/mobile/BUILD_INSTRUCTIONS.md`

#### 2.7 Web preview replica
- Update `/app/frontend/` to provide a phone-frame UI preview of Scan/Device/Diagnostics/History + Build APK instructions.
- Include EN/HU toggle; clearly label that preview is UI-only and real ADB runs in APK.

**Completed artifacts:**
- ✅ `/app/frontend/src/App.js` + `/app/frontend/src/App.css` updated
- ✅ Preview running at `https://pos-doctor.preview.emergentagent.com`

Phase-end testing (remaining):
- ⏳ Run 1 E2E pass on **web preview** using the testing agent:
  - language toggle
  - scan flow to device detail
  - run diagnostics (UI)
  - history list
  - build screen

Status: **IN PROGRESS (implementation complete, web preview testing pending)**

---

### Phase 3 — Hardening + Feature Completion
**Goal:** Reliability, better parsing, better UX, and operational readiness for field use.

User stories:
1. As a technician, I want a diagnostic run to show progress per category so I know it’s not stuck.
2. As a technician, I want partial results preserved if one command fails so I still get value.
3. As a technician, I want history comparison (last vs current) so I can see regressions.
4. As a technician, I want export to include timestamps and device identifiers so reports are audit-ready.
5. As a technician, I want resilient scanning (pause/resume/cancel) so I can control network load.

Steps (revised based on current implementation):
- Robustness:
  - Improve ADB error classification (timeout vs unauthorized vs connection refused).
  - Add per-command progress + partial updates to UI (category-by-category).
  - Add retries/backoff for unstable WiFi.
  - Consider connection reuse vs per-command behavior (optimize based on field testing).
- Parsers:
  - Expand dumpsys parsing for vendor variations.
  - Make “feature absent” vs “fault” explicit (especially NFC/mobile).
  - Improve card reader detection messaging (vendor-specific limitations).
- UX improvements:
  - Add cancel diagnostics.
  - Add clearer “authorize on terminal” instructions when AUTH fails.
  - Add recommendations per category (EN/HU).

Phase-end testing:
- 1 E2E pass on core flows + regression checks on language toggle, history, export.

Status: **NOT STARTED**

---

### Phase 4 — Packaging & Release Readiness
User stories:
1. As an installer, I want a repeatable APK build process so I can ship to technicians reliably.
2. As a technician, I want the app to work offline on-site so I’m not blocked by connectivity.
3. As a technician, I want consistent behavior across Android versions so I can trust results.
4. As a technician, I want app permissions explained so I can grant them confidently.
5. As a maintainer, I want logs/exportable debug bundle so field issues are diagnosable.

Steps:
- EAS config review (profiles, signing guidance, versioning).
- Android permission review and store policy notes.
- Performance tuning:
  - scanning concurrency defaults
  - memory safety for large shell outputs
- Add optional “diagnostic debug bundle” export:
  - include raw outputs, app version, device info, timestamps

Status: **NOT STARTED**

---

## 3) Next Actions
1. **Web preview E2E test** (testing agent): validate key flows + EN/HU toggle.
2. Fix any UX bugs uncovered by testing (layout overflow, click targets, collapsibles, navigation).
3. Mobile source sanity checks:
   - TypeScript compile
   - dependency correctness
   - ensure required Expo plugins are configured
4. Document any known limitations:
   - card reader/EMV/contactless detection is vendor-dependent
   - ADB-over-WiFi must be enabled and authorized on the POS terminal
5. (Optional) Prepare a minimal “smoke test checklist” for technicians.

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
- Web preview accurately reflects UI/UX flows and clearly notes that **live ADB requires the Android APK**.
- Phase 1 validation: **ADB protocol POC passes (8/8 tests)** and serves as the reference implementation.