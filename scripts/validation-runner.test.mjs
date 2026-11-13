import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const workflow = readFileSync(
  new URL('../.github/workflows/validate.yml', import.meta.url),
  'utf8',
);

describe('USEIT validation runner contract', () => {
  const frontendJob = workflow.match(
    /^  frontend:\r?\n([\s\S]*?)(?=^  [A-Za-z0-9_-]+:\r?\n)/m,
  )?.[1] ?? '';

  it('pins the Android/frontend validation job to the previously validated Ubuntu LTS image', () => {
    expect(frontendJob).toMatch(/^\s+runs-on: ubuntu-24\.04\s*$/m);
  });

  it('does not leave the Android/frontend validation job on a moving ubuntu-latest image', () => {
    expect(frontendJob).not.toMatch(/^\s+runs-on: ubuntu-latest\s*$/m);
  });

  it('keeps the iOS build on the macOS runner', () => {
    expect(workflow).toMatch(/^  ios:\r?\n    runs-on: macos-latest$/m);
  });

  it('captures the complete frontend job, including Expo Doctor and Android validation', () => {
    expect(frontendJob).toContain('name: Validate Expo project health');
    expect(frontendJob).toContain('name: Validate Android export');
    expect(frontendJob).toContain('name: Runtime dependency audit');
  });


  it('pins Android Gradle to a reproducible Temurin JDK 21 runtime', () => {
    expect(frontendJob).toContain(
      'uses: actions/setup-java@b6effb05e454b25005698d916606bdc6ffcbf961',
    );
    expect(frontendJob).toMatch(/^\\s+distribution: temurin\\s*$/m);
    expect(frontendJob).toMatch(/^\\s+java-version: '21'\\s*$/m);
  });

  it('installs the published SDK 57 Expo Doctor CLI beside the lockfile-resolved @expo/env package', () => {
    const packageLock = JSON.parse(
      readFileSync(new URL('../package-lock.json', import.meta.url), 'utf8'),
    );
    const expoEnv = packageLock.packages['node_modules/@expo/env'];

    expect(expoEnv?.version).toBe('2.6.0');
    expect(expoEnv?.dev).not.toBe(true);
    expect(frontendJob).toContain(
      'npm pack --silent --pack-destination "$RUNNER_TEMP/expo-doctor" expo-doctor@1.20.5',
    );
    expect(frontendJob).toContain(
      'tar -xzf "$RUNNER_TEMP/expo-doctor/$TARBALL" -C node_modules/expo-doctor --strip-components=1',
    );
    expect(frontendJob).toContain("require.resolve('@expo/env')");
    expect(frontendJob).toContain(
      'run: node node_modules/expo-doctor/bin/expo-doctor.js',
    );
    expect(frontendJob).not.toContain('npm exec --yes --package=expo-doctor');
    expect(frontendJob).not.toContain('NODE_PATH:');
    expect(frontendJob).not.toMatch(/^\s+run:\s+npx expo-doctor\s*$/m);
  });
});
