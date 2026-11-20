import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const workflow = readFileSync(
  new URL('../.github/workflows/codeql.yml', import.meta.url),
  'utf8',
);

describe('CodeQL workflow permissions', () => {
  it('grants the analyzer read-only Actions metadata access and required CodeQL permissions', () => {
    expect(workflow).toMatch(
      /analyze:\s*\n\s+permissions:\s*\n\s+actions:\s*read\s*\n\s+contents:\s*read\s*\n\s+security-events:\s*write/m,
    );
  });

  it('does not grant Actions write access', () => {
    expect(workflow).not.toMatch(/\bactions:\s*write\b/);
  });
});
