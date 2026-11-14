import { readFileSync } from 'node:fs';
import { Minimatch, minimatch } from 'minimatch';
import { describe, expect, it } from 'vitest';

const lock = JSON.parse(readFileSync(new URL('../package-lock.json', import.meta.url), 'utf8'));
const packageManifest = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const installedManifest = JSON.parse(readFileSync(new URL('../node_modules/minimatch/package.json', import.meta.url), 'utf8'));

describe('minimatch 11 security override migration', () => {
  it('pins the patched release in both the manifest and lockfile', () => {
    expect(packageManifest.overrides?.minimatch).toBe('11.0.5');
    expect(lock.packages['node_modules/minimatch']?.version).toBe('11.0.5');
    expect(installedManifest.version).toBe('11.0.5');
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
});
