import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const guidance = readFileSync(new URL('../.github/copilot-instructions.md', import.meta.url), 'utf8');

describe('Copilot privacy test-data guidance', () => {
  it('forbids real sensitive data while explicitly permitting synthetic fixtures', () => {
    expect(guidance).toMatch(/Never log, expose, commit, or place real secrets, tokens, credentials, personal data, user photos, session tokens, or attestation payloads/);
    expect(guidance).toContain('Synthetic, deterministic, non-sensitive fixtures and mocked tokens or attestation payloads are allowed and preferred');
    expect(guidance).toContain('never copy production values');
  });
});
