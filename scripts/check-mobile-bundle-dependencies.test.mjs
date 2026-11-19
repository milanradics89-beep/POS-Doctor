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
    expect(findPackageSourcesInMap(map, 'picomatch')).toEqual(['../node_modules/picomatch/index.js']);
  });

  it('applies sourceRoot before matching source paths', () => {
    const map = {
      sourceRoot: '../../node_modules/picomatch/',
      sources: ['/index.js', 'lib/parse.js'],
    };
    expect(findPackageSourcesInMap(map, 'picomatch')).toEqual([
      '../../node_modules/picomatch/index.js',
      '../../node_modules/picomatch/lib/parse.js',
    ]);
  });

  it('applies sourceRoot independently inside indexed source-map sections', () => {
    const map = {
      sections: [
        {
          offset: { line: 0, column: 0 },
          map: {
            sourceRoot: '../node_modules/picomatch',
            sources: ['index.js'],
          },
        },
        {
          offset: { line: 10, column: 0 },
          map: {
            sourceRoot: '../src',
            sources: ['app.ts'],
          },
        },
      ],
    };
    expect(findPackageSourcesInMap(map, 'picomatch')).toEqual([
      '../node_modules/picomatch/index.js',
    ]);
  });

  it('fails closed when sourceRoot has an invalid type', () => {
    expect(() => findPackageSourcesInMap({ sourceRoot: 42, sources: ['index.js'] }, 'picomatch'))
      .toThrow('sourceRoot must be a string');
  });

  it('fails closed when source entries are not strings, including indexed maps', () => {
    const malformedMaps = [
      { sources: ['node_modules/picomatch/index.js', null] },
      { sections: [{ offset: { line: 0, column: 0 }, map: { sources: [42] } }] },
    ];
    for (const map of malformedMaps) {
      expect(() => findPackageSourcesInMap(map, 'picomatch'))
        .toThrow('Source map sources must contain only strings.');
    }
  });

  it('fails closed when a source map has no source entries or indexed sections', () => {
    expect(() => findPackageSourcesInMap({ sources: [] }, 'picomatch'))
      .toThrow('sources must be a non-empty array');
    expect(() => findPackageSourcesInMap({ sections: [] }, 'picomatch'))
      .toThrow('sections must be a non-empty array');
    expect(() => findPackageSourcesInMap({ sources: [''] }, 'picomatch'))
      .toThrow('non-empty strings');
  });

  it('fails closed when a map mixes basic and indexed source-map fields', () => {
    expect(() => findPackageSourcesInMap({
      sources: [],
      sections: [{ offset: { line: 0, column: 0 }, map: { sources: ['node_modules/picomatch/index.js'] } }],
    }, 'picomatch')).toThrow('exactly one of sources or sections');
  });

  it('fails closed when indexed maps declare a top-level sourceRoot', () => {
    expect(() => findPackageSourcesInMap({
      sourceRoot: '../node_modules/picomatch',
      sections: [{ offset: { line: 0, column: 0 }, map: { sources: ['index.js'] } }],
    }, 'picomatch')).toThrow('Indexed source maps must not declare sourceRoot');
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

  it('matches package names as literal path segments, not regular expressions', () => {
    const map = {
      sources: [
        'node_modules/picomatch+/index.js',
        'node_modules/picomatch/index.js',
      ],
    };
    expect(findPackageSourcesInMap(map, 'picomatch+')).toEqual(['node_modules/picomatch+/index.js']);
  });

  it('rejects empty and traversal package path segments', () => {
    expect(() => findPackageSourcesInMap({ sources: [] }, '../picomatch')).toThrow('traversal path segments');
    expect(() => findPackageSourcesInMap({ sources: [] }, 'picomatch//nested')).toThrow('traversal path segments');
  });
});
