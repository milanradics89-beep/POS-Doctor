import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const workflow = readFileSync(
  new URL('../.github/workflows/expo-sdk57-lock-refresh.yml', import.meta.url),
  'utf8',
);

describe('Expo SDK 57 lock refresh workflow', () => {
  it('supports an explicit manual retry without changing source files', () => {
    expect(workflow).toContain('workflow_dispatch:');
  });

  it('writes a real JSON newline instead of a literal backslash-n suffix', () => {
    const writeLine = workflow
      .split(/\r?\n/)
      .find(line => line.includes("fs.writeFileSync('package.json'"));
    expect(writeLine).toContain("JSON.stringify(pkg, null, 2) + '\\n');");
    expect(writeLine).not.toContain("JSON.stringify(pkg, null, 2) + '\\\\n');");
  });

  it('regenerates manifests from the current checkout instead of a stale run artifact', () => {
    expect(workflow).toContain('npm install --package-lock-only --ignore-scripts --no-audit --no-fund');
    expect(workflow).not.toContain('gh run download 42121369533');
  });

  it('aligns all five Expo Doctor SDK 57 patch requirements exactly', () => {
    expect(workflow).toContain('expo: "~57.0.33"');
    expect(workflow).toContain('"expo-constants": "~57.0.24"');
    expect(workflow).toContain('"expo-image-picker": "~57.0.21"');
    expect(workflow).toContain('"expo-linking": "~57.0.14"');
    expect(workflow).toContain('"expo-router": "~57.0.31"');
  });

  it('keeps expo-modules-core transitive to avoid the incompatible Worklets peer graph', () => {
    expect(workflow).not.toContain('npx expo install expo-modules-core');
    expect(workflow).toContain('expo-modules-core must remain a transitive Expo dependency');
  });

  it('runs reproducible install, Expo Doctor, typecheck and unit tests before artifact publication', () => {
    const install = workflow.indexOf('npm ci --ignore-scripts --no-audit --no-fund');
    const installDoctor = workflow.indexOf('expo-doctor@1.20.5');
    const expoDoctor = workflow.indexOf('node node_modules/expo-doctor/bin/expo-doctor.js');
    const typecheck = workflow.indexOf('npm run typecheck');
    const tests = workflow.indexOf('npm test -- --passWithNoTests');
    const artifact = workflow.indexOf('uses: actions/upload-artifact@cf430e030ddbb5b0abf93d22962f4752f3646cd9');
    expect([install, installDoctor, expoDoctor, typecheck, tests, artifact].every(index => index >= 0)).toBe(true);
    expect(install).toBeLessThan(installDoctor);
    expect(installDoctor).toBeLessThan(expoDoctor);
    expect(expoDoctor).toBeLessThan(typecheck);
    expect(typecheck).toBeLessThan(tests);
    expect(tests).toBeLessThan(artifact);
  });

  it('keeps checkout credentials disabled through validation and artifact publication', () => {
    const checkoutCredentials = workflow.indexOf('persist-credentials: false');
    const install = workflow.indexOf('npm ci --ignore-scripts --no-audit --no-fund');
    const installDoctor = workflow.indexOf('expo-doctor@1.20.5');
    const expoDoctor = workflow.indexOf('node node_modules/expo-doctor/bin/expo-doctor.js');
    const typecheck = workflow.indexOf('npm run typecheck');
    const tests = workflow.indexOf('npm test -- --passWithNoTests');
    const artifact = workflow.indexOf('uses: actions/upload-artifact@cf430e030ddbb5b0abf93d22962f4752f3646cd9');
    expect([checkoutCredentials, install, installDoctor, expoDoctor, typecheck, tests, artifact]
      .every(index => index >= 0)).toBe(true);
    expect(checkoutCredentials).toBeLessThan(install);
    expect(install).toBeLessThan(installDoctor);
    expect(installDoctor).toBeLessThan(expoDoctor);
    expect(expoDoctor).toBeLessThan(typecheck);
    expect(typecheck).toBeLessThan(tests);
    expect(tests).toBeLessThan(artifact);
  });

  it('publishes only checksum-verified manifest files and fails if any artifact file is missing', () => {
    expect(workflow).toContain('mkdir -p expo-sdk57-lock-refresh');
    expect(workflow).toContain('cp package.json package-lock.json expo-sdk57-lock-refresh/');
    expect(workflow).toContain('sha256sum package.json package-lock.json > SHA256SUMS');
    expect(workflow).toContain('path: expo-sdk57-lock-refresh/');
    expect(workflow).not.toContain('.expo-sdk57-lock-refresh');
    expect(workflow).toContain('if-no-files-found: error');
    expect(workflow).toContain('retention-days: 7');
    expect(workflow).toContain('ARTIFACT_DIGEST: ${{ steps.upload.outputs.artifact-digest }}');
  });

  it('pins the artifact action to the verified immutable v7.0.2 commit', () => {
    expect(workflow).toContain('actions/upload-artifact@cf430e030ddbb5b0abf93d22962f4752f3646cd9 # v7.0.2');
    expect(workflow).toContain('name: expo-sdk57-lock-refresh-${{ github.sha }}');
  });

  it('uses read-only repository permissions and never commits or pushes manifests', () => {
    expect(workflow).toMatch(/^permissions:\s*\n\s+contents:\s+read\s*$/m);
    expect(workflow).not.toContain('contents: write');
    expect(workflow).not.toContain('actions: write');
    expect(workflow).not.toContain('GH_TOKEN:');
    expect(workflow).not.toContain('gh auth setup-git');
    expect(workflow).not.toContain('gh api');
    expect(workflow).not.toContain('git commit');
    expect(workflow).not.toContain('git push');
  });

  it('restricts execution to the release branch', () => {
    expect(workflow).toContain('TARGET_REF: refs/heads/fix/release-blockers-2026-10');
    expect(workflow).toContain('if ! is_allowed_ref "$GITHUB_REF"');
    expect(workflow).toContain('Main must never be a lockfile-refresh target.');
  });
});
