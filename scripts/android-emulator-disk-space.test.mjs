import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const workflow = readFileSync(
  new URL('../.github/workflows/validate.yml', import.meta.url),
  'utf8',
);

describe('Android emulator runner capacity', () => {
  it('reclaims build-only caches after APK assembly and before emulator installation', () => {
    const build = workflow.indexOf('- name: Validate native Android release build');
    const cleanup = workflow.indexOf('- name: Free runner disk space before Android emulator');
    const emulator = workflow.indexOf('- name: Install and launch Android emulator smoke test');

    expect(build).toBeGreaterThanOrEqual(0);
    expect(cleanup).toBeGreaterThan(build);
    expect(emulator).toBeGreaterThan(cleanup);

    const cleanupStep = workflow.slice(cleanup, emulator);
    expect(cleanupStep).toContain('rm -rf "$HOME/.gradle/caches"');
    expect(cleanupStep).toContain('system-images/android-35/google_apis/x86_64');
    expect(cleanupStep).toContain('df -Pk /');
    expect(cleanupStep).toContain('available_kb < 6291456');
  });
});
