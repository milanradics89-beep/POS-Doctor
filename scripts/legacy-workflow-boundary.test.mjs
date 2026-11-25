import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const legacyWorkflow = resolve(process.cwd(), '.github/workflows', 'expo-sdk57-lock-refresh.yml');
const recoveryWorkflow = readFileSync(new URL('../.github/workflows/ci-auto-recovery.yml', import.meta.url), 'utf8');

describe('legacy workflow boundary', () => {
  it('does not retain the old POS-Doctor Expo SDK lock refresh workflow', () => {
    expect(existsSync(legacyWorkflow)).toBe(false);
  });

  it('keeps CI recovery manual instead of using a privileged workflow_run trigger', () => {
    expect(recoveryWorkflow).toContain('workflow_dispatch:');
    expect(recoveryWorkflow).not.toContain('workflow_run:');
  });
});
