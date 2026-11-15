import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const workflow = readFileSync(resolve(repositoryRoot, '.github/workflows/validate.yml'), 'utf8');
const packageJson = JSON.parse(readFileSync(resolve(repositoryRoot, 'package.json'), 'utf8'));

describe('validation test command contract', () => {
  it('runs the normal Vitest command and fails when no tests are discovered', () => {
    expect(packageJson.scripts.test).toBe('vitest run');
    expect(workflow).toMatch(/^\\s*run:\\s*npm test\\s*$/m);
    expect(workflow).not.toContain('--passWithNoTests');
  });
});
