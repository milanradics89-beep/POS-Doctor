import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const packageJson = JSON.parse(
  readFileSync(new URL('../package.json', import.meta.url), 'utf8')
);
const packageLock = JSON.parse(
  readFileSync(new URL('../package-lock.json', import.meta.url), 'utf8')
);

describe('image normalization runtime dependencies', () => {
  it('declares expo-file-system directly and keeps the SDK 57 lockfile aligned', () => {
    const declaredRange = packageJson.dependencies['expo-file-system'];

    expect(declaredRange).toBe('~57.0.7');
    expect(packageLock.packages[''].dependencies['expo-file-system']).toBe(declaredRange);
    expect(packageLock.packages['node_modules/expo-file-system'].version).toBe('57.0.7');
  });
});
