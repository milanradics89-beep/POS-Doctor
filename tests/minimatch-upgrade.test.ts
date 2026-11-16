import { readFileSync } from 'node:fs';
import { createFingerprintAsync } from '@expo/fingerprint';
import { Minimatch, minimatch } from 'minimatch';
import { describe, expect, it } from 'vitest';

const lock = JSON.parse(readFileSync(new URL('../package-lock.json', import.meta.url), 'utf8'));
const packageManifest = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const installedManifest = JSON.parse(readFileSync(new URL('../node_modules/minimatch/package.json', import.meta.url), 'utf8'));
const resolvedMinimatchPackages = Object.entries(lock.packages)
  .filter(([path]) => /(^|\/)node_modules\/minimatch$/.test(path))
  .map(([path, pkg]) => ({ path, version: pkg.version }));

describe('minimatch 11 security override migration', () => {
  it('pins the patched release in the manifest and every lockfile resolution', () => {
    expect(packageManifest.overrides?.minimatch).toBe('11.0.5');
    expect(lock.packages['node_modules/minimatch']?.version).toBe('11.0.5');
    expect(installedManifest.version).toBe('11.0.5');
    expect(resolvedMinimatchPackages.length).toBeGreaterThan(0);
    expect(resolvedMinimatchPackages.every(({ version }) => version === '11.0.5')).toBe(true);
  });

  it('preserves globstar and brace expansion used by build tooling', () => {
    expect(minimatch('packages/mobile/src/index.ts', '**/src/*.{ts,tsx}')).toBe(true);
    expect(minimatch('packages/mobile/src/index.tsx', '**/src/*.{ts,tsx}')).toBe(true);
    expect(minimatch('packages/mobile/src/index.js', '**/src/*.{ts,tsx}')).toBe(false);
  });

  it('preserves negation and extglob matching', () => {
    expect(minimatch('src/app.ts', 'src/!(test).ts')).toBe(true);
    expect(minimatch('src/test.ts', 'src/!(test).ts')).toBe(false);
    expect(minimatch('src/generated/client.ts', '!src/generated/**')).toBe(false);
  });

  it('keeps dotfile behavior explicit and compatible with minimatch defaults', () => {
    expect(minimatch('.env', '*')).toBe(false);
    expect(minimatch('.env', '*', { dot: true })).toBe(true);
  });

  it('preserves the Minimatch class contract used by @expo/fingerprint', () => {
    const ignoredModules = new Minimatch('**/node_modules/**', { dot: true });
    const reIncludedModule = new Minimatch('!**/node_modules/keep/**', { dot: true });

    expect(ignoredModules.negate).toBe(false);
    expect(ignoredModules.match('packages/mobile/node_modules/drop/index.js')).toBe(true);
    expect(ignoredModules.match('packages/mobile/src/index.ts')).toBe(false);

    expect(reIncludedModule.negate).toBe(true);
    expect(reIncludedModule.match('packages/mobile/node_modules/keep/index.js')).toBe(false);
    expect(reIncludedModule.match('packages/mobile/node_modules/drop/index.js')).toBe(true);
  });

  it('runs the SDK 57 Expo fingerprint pipeline with minimatch 11', async () => {
    const fingerprint = await createFingerprintAsync(process.cwd(), {
      ignorePaths: ['**/node_modules/**'],
      platforms: ['android', 'ios'],
      silent: true,
    });

    expect(fingerprint.hash).toMatch(/^[a-f0-9]+$/);
    expect(fingerprint.sources.length).toBeGreaterThan(0);
  }, 30_000);
});
