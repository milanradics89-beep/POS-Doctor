import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { findPackageSourcesInMap, scanBundleSourceMaps } from './check-mobile-bundle-dependencies.mjs';

describe('mobile bundle dependency reachability', () => {
  it('detects root and nested package copies in source-map paths', () => {
    const map = {
      sources: [
        'node_modules/picomatch/index.js',
        '../../node_modules/@expo/metro-config/node_modules/picomatch/lib/index.js',
        'node_modules/picomatch-extra/index.js',
        'node_modules/@types/picomatch/index.d.ts',
      ],
    };

    expect(findPackageSourcesInMap(map, 'picomatch')).toEqual([
      'node_modules/picomatch/index.js',
      '../../node_modules/@expo/metro-config/node_modules/picomatch/lib/index.js',
    ]);
  });

  it('normalizes Windows separators before matching', () => {
    const map = { sources: ['..\\node_modules\\picomatch\\index.js'] };
    expect(findPackageSourcesInMap(map, 'picomatch')).toEqual(map.sources);
  });

  it('supports indexed source maps', () => {
    const map = {
      sections: [
        { offset: { line: 0, column: 0 }, map: { sources: ['node_modules/picomatch/index.js'] } },
        { offset: { line: 10, column: 0 }, map: { sources: ['src/app.ts'] } },
      ],
    };
    expect(findPackageSourcesInMap(map, 'picomatch')).toEqual(['node_modules/picomatch/index.js']);
  });

  it('scans nested source maps and reports bundle package paths', async () => {
    const root = await mkdtemp(join(tmpdir(), 'useit-bundle-audit-'));
    try {
      const android = join(root, 'android');
      const ios = join(root, 'ios');
      await mkdir(android, { recursive: true });
      await mkdir(ios, { recursive: true });
      await writeFile(join(android, 'index.android.js.map'), JSON.stringify({
        version: 3,
        sources: ['node_modules/@expo/metro-config/node_modules/picomatch/index.js'],
      }));
      await writeFile(join(ios, 'index.ios.js.map'), JSON.stringify({
        version: 3,
        sources: ['src/app.tsx'],
      }));

      const result = await scanBundleSourceMaps(root, 'picomatch');
      expect(result.sourceMapCount).toBe(2);
      expect(result.sourceCount).toBe(2);
      expect(result.matches).toEqual([{
        file: 'android/index.android.js.map',
        source: 'node_modules/@expo/metro-config/node_modules/picomatch/index.js',
      }]);
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  it('fails closed when no source maps were produced', async () => {
    const root = await mkdtemp(join(tmpdir(), 'useit-empty-bundle-audit-'));
    try {
      await expect(scanBundleSourceMaps(root, 'picomatch')).rejects.toThrow('No source maps found');
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });
});
