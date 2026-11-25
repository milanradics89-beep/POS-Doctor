import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const workflow = readFileSync(
  new URL('../.github/workflows/code-quality-security.yml', import.meta.url),
  'utf8',
);

describe('Gitleaks pull-request history coverage', () => {
  it('uses the event base and exact PR head instead of the paginated commits API', () => {
    expect(workflow).toContain('name: Scan the complete pull request commit range');
    expect(workflow).toContain('BASE_SHA: $' + '{' + '{ github.event.pull_request.base.sha }}');
    expect(workflow).toContain('HEAD_SHA: $' + '{' + '{ github.event.pull_request.head.sha }}');
    expect(workflow).toContain('refs/pull/$PR_NUMBER/head:refs/remotes/origin/pr/$PR_NUMBER');
    expect(workflow).toContain('gitleaks detect');
    expect(workflow).toContain('--log-opts="$BASE_SHA..$HEAD_SHA"');
  });

  it('scans the full commit graph range without truncating to first-parent or non-merge commits', () => {
    const step = workflow.split('name: Scan the complete pull request commit range')[1] ?? '';
    expect(step).toContain('$BASE_SHA..$HEAD_SHA');
    expect(step).not.toContain('--first-parent');
    expect(step).not.toContain('--no-merges');
  });
});
