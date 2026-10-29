import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const workflow = readFileSync(
  new URL('../.github/workflows/ci-auto-recovery.yml', import.meta.url),
  'utf8',
);

describe('CI auto-recovery workflow', () => {
  it('passes the issue title as jq data instead of interpolating it into jq source', () => {
    expect(workflow).toContain(
      `jq -r --arg title "$TITLE" 'first(.[] | select(.title == $title) | .number) // empty'`,
    );
    expect(workflow).not.toContain('--jq '.[] | select(.title == "'');
  });

  it('limits automatic retries to one failed attempt from this repository', () => {
    expect(workflow).toContain("github.event.workflow_run.conclusion == 'failure'");
    expect(workflow).toContain('github.event.workflow_run.run_attempt == 1');
    expect(workflow).toContain('github.event.workflow_run.head_repository.full_name == github.repository');
    expect(workflow).toContain('rerun-failed-jobs');
  });

  it('reports a repeated failure only after the retry attempt', () => {
    expect(workflow).toContain('github.event.workflow_run.run_attempt >= 2');
  });
});
