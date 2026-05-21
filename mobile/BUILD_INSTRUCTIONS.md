# POS Doctor - Build Instructions

## Building the Android APK

The POS Doctor app is ready to build. Follow these instructions to create an APK for testing on real POS terminals.

### Prerequisites

1. **Node.js** (v18+)
2. **Yarn** package manager
3. **Android Studio** or **Android SDK** with:
   - Android SDK Platform 34
   - Android Build Tools
   - Java JDK 17 or higher

### Method 1: Local Build (Recommended for Development)

#### Step 1: Install Dependencies

```bash
cd /app/mobile
yarn install
```

#### Step 2: Generate Native Project (Already Done)

The native Android project has already been generated at `/app/mobile/android/`.

If you need to regenerate it:

```bash
npx expo prebuild --platform android --clean
```

#### Step 3: Build the APK

```bash
cd /app/mobile/android
./gradlew assembleRelease
```

The APK will be created at:
```
/app/mobile/android/app/build/outputs/apk/release/app-release.apk
```

#### Step 4: Sign the APK (Optional but Recommended)

For production distribution, sign the APK:

```bash
# Generate a keystore (first time only)
keytool -genkey -v -keystore pos-doctor.keystore -alias pos-doctor -keyalg RSA -keysize 2048 -validity 10000

# Sign the APK
jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 -keystore pos-doctor.keystore /app/mobile/android/app/build/outputs/apk/release/app-release.apk pos-doctor

# Align the APK
zipalign -v 4 app-release.apk pos-doctor-signed.apk
```

### Method 2: EAS Build (Cloud Build - Easier)

Expo Application Services (EAS) can build your APK in the cloud without requiring local Android SDK setup.

#### Step 1: Install EAS CLI

```bash
npm install -g eas-cli
```

#### Step 2: Configure EAS

```bash
cd /app/mobile
eas build:configure
```

#### Step 3: Build APK

```bash
# Build for Android
eas build --platform android --profile preview

# Or for production
eas build --platform android --profile production
```

The APK will be available for download from the EAS dashboard.

### Method 3: Using Android Studio

1. Open Android Studio
2. Select "Open an Existing Project"
3. Navigate to `/app/mobile/android`
4. Wait for Gradle sync to complete
5. Select **Build > Build Bundle(s) / APK(s) > Build APK(s)**
6. APK will be at `app/build/outputs/apk/release/app-release.apk`

## Installing the APK on POS Terminal

### Via USB (ADB)

```bash
# Enable USB debugging on the POS terminal first
adb install /app/mobile/android/app/build/outputs/apk/release/app-release.apk

# Or use -r flag to replace existing installation
adb install -r app-release.apk
```

### Via File Transfer

1. Copy the APK to the POS terminal (USB drive, network share, etc.)
2. On the POS terminal, use a file manager to locate the APK
3. Tap the APK file to install
4. Allow installation from unknown sources if prompted

### Via Cloud Download

1. Upload the APK to a web server or cloud storage
2. On the POS terminal, open a browser and download the APK
3. Install from the Downloads folder

## Testing the App

### First Launch

1. **Open the app** - it will boot directly to the Diagnostics screen
2. **Check permissions banner** - if visible, tap "Grant Permissions"
3. **Grant required permissions:**
   - Location (for WiFi SSID/BSSID details)
   - Phone State (for telephony details)
4. **Tap "Run Diagnostics"** - the app will collect system information

### What to Verify

- [ ] App opens to diagnostic dashboard (no scan/connect screens)
- [ ] Permission banner shows if permissions are denied
- [ ] "Grant Permissions" button triggers Android permission dialog
- [ ] After granting permissions, diagnostics show full WiFi/telephony details
- [ ] All diagnostic categories display correctly:
  - Permissions & Access
  - Battery
  - WiFi
  - Mobile Network
  - NFC
  - Device Info
  - Memory & Storage
  - Display
  - Sensors
  - Power Management
- [ ] Overall health score is calculated (0-100)
- [ ] Cards are collapsible
- [ ] Export report works (PDF + text)
- [ ] History is saved and accessible via top nav
- [ ] EN/HU language toggle works

### Expected Behavior

#### With Permissions Granted
- WiFi card shows SSID, BSSID, signal strength
- Telephony card shows operator, network type, SIM state
- Permissions card shows "✓ Granted" for both permissions

#### With Permissions Denied
- WiFi card shows "Requires Location Permission"
- Telephony card shows "Limited info (requires phone permission)"
- Permissions card shows "✗ Denied" and explanation

## Troubleshooting

### Build Issues

**Problem:** Gradle build fails with "SDK location not found"
**Solution:** Create `local.properties` in `/app/mobile/android/`:
```
sdk.dir=/path/to/your/Android/sdk
```

**Problem:** "Execution failed for task ':app:mergeReleaseResources'"
**Solution:** Clean the build:
```bash
cd /app/mobile/android
./gradlew clean
./gradlew assembleRelease
```

**Problem:** Module not found errors
**Solution:** Reinstall dependencies:
```bash
cd /app/mobile
rm -rf node_modules
yarn install
npx expo prebuild --platform android --clean
```

### Runtime Issues

**Problem:** App crashes on launch
**Solution:** Check logcat:
```bash
adb logcat | grep "ReactNative\|PosDoctorDiagnostics"
```

**Problem:** Native module not found
**Solution:** Ensure the module is properly linked:
```bash
cd /app/mobile/android
./gradlew clean
./gradlew assembleRelease
```

**Problem:** Permissions not working
**Solution:** 
1. Ensure `AndroidManifest.xml` includes required permissions
2. Check Android version (permissions must be requested at runtime on Android 6.0+)
3. Grant permissions manually in Settings > Apps > POS Doctor > Permissions

## App Architecture

### Native Module

The app uses a custom Expo Module written in Kotlin:
- **Location:** `/app/mobile/modules/pos-doctor-diagnostics/`
- **Entry Point:** `PosDoctorDiagnosticsModule.kt`
- **Exposed Functions:**
  - `runDiagnostics()` - Collects all system info
  - `checkPermissions()` - Checks permission status
  - `getPermissionsInfo()` - Gets detailed permission + basic device state

### Key Android APIs Used

- `BatteryManager` - Battery level, health, temperature, voltage
- `WifiManager` - WiFi connection details (requires location permission)
- `TelephonyManager` - SIM, operator, network type (requires phone permission)
- `NfcAdapter` - NFC presence and state
- `Build` - Device manufacturer, model, serial, Android version
- `ActivityManager` - Memory info
- `StatFs` - Storage info
- `DisplayMetrics` - Screen resolution, density
- `SensorManager` - Available sensors
- `PowerManager` - Power save mode, interactive state
- `PackageManager` - System feature checks

## Support

For issues or questions:
1. Check the logs: `adb logcat`
2. Review `/app/mobile/android/app/build.gradle` for build configuration
3. Verify all dependencies in `/app/mobile/package.json`
4. Ensure Android SDK Platform 34 is installed

## Build Configuration

- **Package Name:** `com.posdoctor.app`
- **Version Code:** 1
- **Version Name:** 1.0.0
- **Min SDK:** 24 (Android 7.0)
- **Target SDK:** 34 (Android 14)
- **Compile SDK:** 34

## Required Permissions

The app declares the following permissions in `AndroidManifest.xml`:

- `android.permission.INTERNET` - For export/share functionality
- `android.permission.ACCESS_NETWORK_STATE` - Basic network info
- `android.permission.ACCESS_WIFI_STATE` - Basic WiFi state
- `android.permission.ACCESS_FINE_LOCATION` - **Runtime** - For WiFi SSID/BSSID
- `android.permission.READ_PHONE_STATE` - **Runtime** - For telephony details
- `android.permission.NFC` - NFC detection

Runtime permissions (Location, Phone State) are requested via UI when the app runs.
