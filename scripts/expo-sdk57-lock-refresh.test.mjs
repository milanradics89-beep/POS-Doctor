import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');
const packageJsonText = read('../package.json');
const packageLockText = read('../package-lock.json');
const packageJson = JSON.parse(packageJsonText);
const packageLock = JSON.parse(packageLockText);
const validation = read('../.github/workflows/validate.yml');
const security = read('../.github/workflows/code-quality-security.yml');
const recovery = read('../.github/workflows/ci-auto-recovery.yml');
const codemagic = read('../codemagic.yaml');
const androidCodemagic = codemagic.split('  useit-ios-ci:')[0];

describe('Expo SDK 57 release pipeline regression coverage', () => {
  it('keeps CI recovery explicit and manual rather than workflow-run privileged', () => {
    expect(recovery).toContain('workflow_dispatch:');
    expect(recovery).not.toContain('workflow_run:');
    expect(recovery).toContain("github.ref == 'refs/heads/main'");
  });

  it('keeps the package manifest valid JSON with a real trailing newline', () => {
    expect(packageJsonText.endsWith('\n')).toBe(true);
    expect(packageLockText.endsWith('\n')).toBe(true);
    expect(() => JSON.parse(packageJsonText)).not.toThrow();
    expect(() => JSON.parse(packageLockText)).not.toThrow();
  });

  it('installs from the checked-in lockfile instead of downloading a stale run artifact', () => {
    const install = 'npm ci --ignore-scripts --no-audit --no-fund';
    expect(validation).toContain(install);
    expect(codemagic).toContain(install);
    expect(validation).not.toContain('gh run download');
    expect(codemagic).not.toContain('gh run download');
  });

  it('aligns Expo SDK 57 manifest ranges with exact lockfile package versions', () => {
    const names = ['expo', 'expo-constants', 'expo-image-picker', 'expo-linking', 'expo-router'];
    for (const name of names) {
      const range = packageJson.dependencies[name];
      expect(range).toMatch(/^~57\.\d+\.\d+$/);
      expect(packageLock.packages[''].dependencies[name]).toBe(range);
      expect(packageLock.packages['node_modules/' + name]?.version).toBe(range.slice(1));
    }
  });

  it('keeps expo-modules-core transitive to avoid an incompatible direct peer graph', () => {
    expect(packageJson.dependencies).not.toHaveProperty('expo-modules-core');
    expect(packageJson.devDependencies).not.toHaveProperty('expo-modules-core');
    expect(packageLock.packages[''].dependencies).not.toHaveProperty('expo-modules-core');
    expect(packageLock.packages['node_modules/expo-modules-core']?.version).toBeTruthy();
  });

  it('orders reproducible install, source guard, typecheck, tests, Expo Doctor and Android Release validation', () => {
    const positions = [
      validation.indexOf('npm ci --ignore-scripts --no-audit --no-fund'),
      validation.indexOf('npm run guard:useit'),
      validation.indexOf('npm run typecheck'),
      validation.indexOf('run: npm test'),
      validation.indexOf('expo-doctor@1.20.5'),
      validation.indexOf('node node_modules/expo-doctor/bin/expo-doctor.js'),
      validation.indexOf('npx expo export --platform android'),
      validation.indexOf('./gradlew assembleRelease --no-daemon'),
    ];
    expect(positions.every((position) => position >= 0)).toBe(true);
    expect(positions).toEqual([...positions].sort((left, right) => left - right));
  });

  it('keeps the Codemagic Android pipeline ordered from reproducible install through Release build', () => {
    const positions = [
      androidCodemagic.indexOf('npm ci --ignore-scripts --no-audit --no-fund'),
      androidCodemagic.indexOf('npm run validate:mobile-config'),
      androidCodemagic.indexOf('npm run guard:useit'),
      androidCodemagic.indexOf('npm run typecheck'),
      androidCodemagic.indexOf('npm test'),
      androidCodemagic.indexOf('expo-doctor@1.20.5'),
      androidCodemagic.indexOf('node node_modules/expo-doctor/bin/expo-doctor.js'),
      androidCodemagic.indexOf('CI=1 npx expo prebuild --platform android --no-install'),
      androidCodemagic.indexOf('./gradlew assembleRelease --no-daemon'),
      androidCodemagic.indexOf('Generate and verify Android APK SHA-256 manifest'),
    ];
    expect(positions.every((position) => position >= 0)).toBe(true);
    expect(positions).toEqual([...positions].sort((left, right) => left - right));
  });

  it('publishes only an existing Android APK with a generated and verified SHA-256 manifest', () => {
    expect(androidCodemagic).toContain('No Android APK was produced');
    expect(androidCodemagic).toContain('test -s "$APK_DIR/SHA256SUMS"');
    expect(androidCodemagic).toContain('shasum -a 256 -c SHA256SUMS');
    expect(codemagic).toContain('android/app/build/outputs/apk/release/SHA256SUMS');
    expect(codemagic).toContain('android/app/build/outputs/apk/release/*.apk');
  });

  it('pins GitHub Actions used by validation and security workflows to immutable commit SHAs', () => {
    const workflows = validation + '\n' + security;
    const refs = [...workflows.matchAll(/^\s+uses:\s+[^@\s]+@([^\s#]+)(?:\s+#.*)?$/gm)];
    expect(refs.length).toBeGreaterThan(0);
    expect(refs.every((match) => /^[a-f0-9]{40}$/.test(match[1]))).toBe(true);
  });

  it('keeps validation read-only and disables persisted checkout credentials', () => {
    expect(validation).toMatch(/^permissions:\s*\n\s+contents:\s+read\s*$/m);
    const checkoutCount = (validation.match(/uses: actions\/checkout@/g) || []).length;
    const credentialOptOutCount = (validation.match(/persist-credentials: false/g) || []).length;
    expect(checkoutCount).toBeGreaterThan(0);
    expect(credentialOptOutCount).toBe(checkoutCount);
    expect(validation).not.toContain('contents: write');
    expect(validation).not.toContain('actions: write');
  });

  it('limits automatic push validation to main while retaining pull-request validation', () => {
    expect(validation).toMatch(/^on:\s*\n\s+pull_request:\s*\n\s+push:\s*\n\s+branches:\s*\[main\]\s*$/m);
  });
});
