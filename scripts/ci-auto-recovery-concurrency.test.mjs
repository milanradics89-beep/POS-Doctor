import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const workflow = readFileSync(
  new URL('../.github/workflows/ci-auto-recovery.yml', import.meta.url),
  'utf8',
);

describe('manual CI recovery concurrency', () => {
  it('serializes all repeated-failure reports that share the diagnostic issue title', () => {
    expect(workflow).toContain(
      "group: useit-ci-recovery-\${{ inputs.operation }}-\${{ inputs.operation == 'report-repeated-failure' && 'shared-diagnostic-issue' || inputs.run_id }}",
    );
  });

  it('keeps retry operations isolated by their target run ID', () => {
    expect(workflow).toContain("inputs.operation == 'report-repeated-failure'");
    expect(workflow).toContain("|| inputs.run_id");
    expect(workflow).toContain('cancel-in-progress: false');
  });
});
