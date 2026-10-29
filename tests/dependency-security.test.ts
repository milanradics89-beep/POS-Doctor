import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

type LockPackage = { version?: string };
type Lockfile = { packages: Record<string, LockPackage> };

const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8')) as {
  overrides?: Record<string, string>;
  dependencies: Record<string, string>;
};
const lockfile = JSON.parse(readFileSync(new URL('../package-lock.json', import.meta.url), 'utf8')) as Lockfile;
const dependencyReviewWorkflow = readFileSync(
  new URL('../.github/workflows/dependency-review.yml', import.meta.url),
  'utf8',
);

function versionAtLeast(actual: string | undefined, minimum: string): boolean {
  if (!actual) return false;
  const a = actual.split('.').map(Number);
  const b = minimum.split('.').map(Number);
  for (let i = 0; i < Math.max(a.length, b.length); i += 1) {
    const left = a[i] ?? 0;
    const right = b[i] ?? 0;
    if (left !== right) return left > right;
  }
  return true;
}

describe('runtime dependency security overrides', () => {
  it('pins Zod to a patched release throughout the installed dependency tree', () => {
    expect(packageJson.overrides?.zod).toBe('$zod');
    const zodPackages = Object.entries(lockfile.packages)
      .filter(([path]) => path === 'node_modules/zod' || path.endsWith('/node_modules/zod'));
    expect(zodPackages.length).toBeGreaterThan(0);
    for (const [path, pkg] of zodPackages) {
      expect(versionAtLeast(pkg.version, '4.6.6'), path).toBe(true);
    }
  });

  it('pins decode-uri-component to its patched release throughout the installed dependency tree', () => {
    expect(packageJson.overrides?.['decode-uri-component']).toBe('0.5.0');
    const packages = Object.entries(lockfile.packages)
      .filter(([path]) => path === 'node_modules/decode-uri-component' || path.endsWith('/node_modules/decode-uri-component'));
    expect(packages.length).toBeGreaterThan(0);
    for (const [path, pkg] of packages) {
      expect(versionAtLeast(pkg.version, '0.5.0'), path).toBe(true);
    }
  });

  it('uses the locally patched deepmerge package', () => {
    expect(packageJson.dependencies.deepmerge).toBe('file:vendor/deepmerge');
    expect(lockfile.packages['vendor/deepmerge']?.version).toBe('4.3.2');
  });

  it('does not silently skip the required dependency review gate', () => {
    expect(dependencyReviewWorkflow).not.toMatch(
      /^\s*if:\s*\$\{\{\s*vars\.USEIT_DEPENDENCY_GRAPH_ENABLED/m,
    );
    expect(dependencyReviewWorkflow).toContain('actions/dependency-review-action@');
    expect(dependencyReviewWorkflow).toContain('fail-on-severity: high');
  });
});
