import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (path: string) => readFileSync(new URL(path, import.meta.url), 'utf8');
const runbook = read('../docs/RELEASE_RUNBOOK.md');
const acceptance = read('../docs/RELEASE_PILOT_ACCEPTANCE.md');
const backlog = read('../docs/25-POINT-RELEASE-BACKLOG.md');
const currentSections = [
  runbook.split('## Historical release checkpoint')[0],
  acceptance.split('## Historical acceptance checkpoint')[0],
  backlog.split('## Historical 25-point status checkpoint')[0],
];

describe('current main release audit checkpoint', () => {
  it('records the same exact main SHA, Validation run, and three moderate minimatch findings', () => {
    for (const section of currentSections) {
      expect(section).toContain('3a262358552a9650d865aa5bd3c92905f1e863cb');
      expect(section).toContain('45030954025');
      expect(section).toContain('137234211132');
      expect(section).toContain('3 moderate');
      expect(section).toContain('GHSA-g3hv-75wg-m249');
      expect(section).not.toContain('four moderate');
    }
  });

  it('does not promote the clean minimatch 11 candidate to current main', () => {
    for (const section of currentSections) {
      expect(section).toContain('PR #231');
      expect(section).toContain('candidate');
      expect(section).toContain('does not change the current main audit');
    }
  });

  it('preserves the older four-moderate audit checkpoint as historical evidence', () => {
    expect(runbook).toContain('Historical release checkpoint');
    expect(acceptance).toContain('Historical acceptance checkpoint');
    expect(backlog).toContain('Historical 25-point status checkpoint');
    expect(runbook).toContain('four moderate');
    expect(acceptance).toContain('four moderate');
    expect(backlog).toContain('four moderate');
  });

  it('keeps the 168-hour checklist and 25-point register separate', () => {
    expect(backlog).toContain('2 Done / 15 In Progress / 8 Blocked');
    expect(backlog).toContain('64 items / 41 checked / 23 open');
  });
});
