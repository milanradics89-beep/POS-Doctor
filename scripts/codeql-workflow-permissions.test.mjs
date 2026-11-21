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

  it('pins CodeQL init and analyze to the same immutable action revision', () => {
    const actionRefs = [...workflow.matchAll(
      /uses:\s*github\/codeql-action\/(?:init|analyze)@([0-9a-f]{40})/g,
    )].map((match) => match[1]);

    expect(actionRefs).toHaveLength(2);
    expect(new Set(actionRefs).size).toBe(1);
    expect(actionRefs[0]).toBe('33d7b85da1a04171e211befe2c739303b9a4c066');
  });

  it('does not grant Actions write access', () => {
    expect(workflow).not.toMatch(/\bactions:\s*write\b/);
  });
});
