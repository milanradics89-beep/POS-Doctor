# POS Doctor — Build Instructions

This document explains how to build the POS Doctor Android APK from source.

---

## Prerequisites

1. **Node.js 18+** and **npm / yarn**
2. **Expo CLI**
   ```bash
   npm install -g @expo/cli
   ```
3. **EAS CLI** (for cloud builds)
   ```bash
   npm install -g eas-cli
   ```
4. **Expo Account** — create one free at https://expo.dev
5. **Android Studio** (optional, only needed for local builds)

---

## Option A: Cloud Build with EAS (Recommended — no Android Studio needed)

1. Clone / download the source code
2. Navigate to the `mobile/` directory:
   ```bash
   cd mobile
   npm install
   ```
3. Log in to Expo:
   ```bash
   eas login
   ```
4. Configure the project:
   ```bash
   eas build:configure
   ```
5. Build the APK (preview profile):
   ```bash
   eas build --platform android --profile preview
   ```
6. Download the APK from the EAS dashboard when build completes.

---

## Option B: Local Build (requires Android Studio + Java 17+)

1. Generate native Android project:
   ```bash
   cd mobile
   npm install
   npx expo prebuild --platform android
   ```
2. Build APK:
   ```bash
   cd android
   ./gradlew assembleRelease
   ```
3. APK location: `android/app/build/outputs/apk/release/app-release.apk`

---

## App Permissions

The following Android permissions are declared in `app.json`:
- `INTERNET` — required for TCP/ADB connections
- `ACCESS_NETWORK_STATE` — required to detect WiFi state
- `ACCESS_WIFI_STATE` — required to read WiFi IP address for subnet auto-detection
- `CHANGE_WIFI_MULTICAST_STATE` — optional, for multicast scanning

---

## First Run

On first launch, the app generates an RSA-2048 keypair for ADB authentication (~2-3 seconds). This happens only once; subsequent launches are instant.

When connecting to a POS terminal for the **first time**, you may see an **“Allow USB debugging” dialog** on the terminal screen. Tap **Allow** (and optionally check "Always allow from this device").

---

## ADB Requirements on POS Terminal

1. **USB debugging / ADB over WiFi must be enabled** on the POS terminal.
2. The terminal must be on the **same WiFi network** as the technician’s phone.
3. Port **5555** must be open (default ADB over WiFi port).
4. Some POS devices use different ports (e.g., 5556). Use the Manual Connect option in that case.

### Enabling ADB over WiFi (standard Android):
```bash
# Via USB first (one-time setup per device):
adb tcpip 5555
```
Or enable via Developer Options → ADB over WiFi (Android 11+).

---

## Dependencies

| Package | Purpose |
|---|---|
| `react-native-tcp-socket` | TCP connections for ADB protocol |
| `node-forge` | RSA key generation/signing for ADB auth |
| `@react-native-community/netinfo` | WiFi IP detection for subnet auto-scan |
| `@react-native-async-storage/async-storage` | Persistent storage (language, history, keys) |
| `expo-print` | PDF report generation |
| `expo-sharing` | Share/export reports |
| `expo-file-system` | Write temp report files |
| `@react-navigation/native` | Screen navigation |

---

## Troubleshooting

**“No ADB terminals found” during scan:**
- Ensure device is on same WiFi subnet
- Check that ADB over WiFi is enabled on the terminal
- Try Manual Connect with the terminal’s exact IP

**“Authentication failed”:**
- Look for authorization dialog on the POS terminal screen
- If no dialog appears, the device may need insecure ADB mode

**Slow key generation on first run:**
- Normal — RSA-2048 keypair generation takes 2-5 seconds in JavaScript
- Only happens once; key is cached in secure storage
