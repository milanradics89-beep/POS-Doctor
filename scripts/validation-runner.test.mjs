import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const workflow = readFileSync(
  new URL('../.github/workflows/validate.yml', import.meta.url),
  'utf8',
);

describe('USEIT validation runner contract', () => {
  const frontendJob = workflow.match(
    /^  frontend:\r?\n([\s\S]*?)(?=^  [A-Za-z0-9_-]+:\r?\n|$)/m,
  )?.[1] ?? '';

  it('pins the Android/frontend validation job to the previously validated Ubuntu LTS image', () => {
    expect(frontendJob).toMatch(/^\s+runs-on: ubuntu-24\.04\s*$/m);
  });

  it('does not leave the Android/frontend validation job on a moving ubuntu-latest image', () => {
    expect(frontendJob).not.toMatch(/^\s+runs-on: ubuntu-latest\s*$/m);
  });

  it('keeps the iOS build on the macOS runner', () => {
    expect(workflow).toMatch(/^  ios:\r?\n    runs-on: macos-latest$/m);
  });
});
