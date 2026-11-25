import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const workflow = readFileSync(
  new URL('../.github/workflows/validate.yml', import.meta.url),
  'utf8',
);

describe('unsigned Android APK CI proof', () => {
  const buildStart = workflow.indexOf('name: Validate native Android release build');
  const emulatorStart = workflow.indexOf('name: Enable KVM for Android emulator');
  const emulatorSmokeStart = workflow.indexOf('name: Install and launch Android emulator smoke test');

  it('preserves the signed smoke APK before applying the unsigned release transformation', () => {
    expect(buildStart).toBeGreaterThanOrEqual(0);
    expect(emulatorStart).toBeGreaterThan(buildStart);
    const build = workflow.slice(buildStart, emulatorStart);
    expect(build).toContain('cp "$SIGNED_APK" "$RUNNER_TEMP/useit-ci-smoke.apk"');
    expect(build).toContain('node scripts/prepare-unsigned-android-release.mjs android/app/build.gradle');
    expect(build).toContain('app-release-unsigned.apk');
    expect(build).toContain('"$APKSIGNER" verify --verbose --print-certs "$UNSIGNED_APK"');
    expect(build).toContain('node scripts/verify-unsigned-android-apk.mjs "$VERIFY_LOG" "$VERIFY_EXIT" "$UNSIGNED_APK"');
    expect(build.indexOf('cat "$VERIFY_LOG"')).toBeLessThan(
      build.indexOf('node scripts/verify-unsigned-android-apk.mjs'),
    );
    expect(build.indexOf('prepare-unsigned-android-release.mjs')).toBeGreaterThan(
      build.indexOf('./gradlew assembleRelease --no-daemon'),
    );
  });

  it('installs only the preserved signed smoke APK in the emulator', () => {
    expect(emulatorSmokeStart).toBeGreaterThan(emulatorStart);
    const smoke = workflow.slice(emulatorSmokeStart);
    expect(smoke).toContain('APK_PATH="$RUNNER_TEMP/useit-ci-smoke.apk"');
    expect(smoke).not.toContain('app-release-unsigned.apk');
  });
});
