import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const home = readFileSync(new URL('../../app/index.tsx', import.meta.url), 'utf8');

describe('USEIT Home recovery-state integration', () => {
  it('routes network failures to the offline panel with a retry for the same intent', () => {
    expect(home).toContain("import { requestFailureKind } from '../src/ui/requestFailure';");
    expect(home).toContain('const kind = requestFailureKind(error);');
    expect(home).toContain("kind: 'offline'");
    expect(home).toContain('onAction: () => { void analyze(intent); }');
  });

  it('routes exhausted camera and gallery permissions to the permission-denied panel', () => {
    expect(home).toContain("kind: 'permission-denied'");
    expect(home).toContain("actionLabel: openSettings ? 'OPEN SETTINGS' : 'TRY AGAIN'");
    expect(home).toContain('if (openSettings) void Linking.openSettings();');
    expect(home).toContain('else void chooseGallery();');
    expect(home).toContain('else void capture();');
  });

  it('uses the shared panel for recoverable visual rendering failures', () => {
    expect(home).toContain("title: 'Visual concept failed'");
    expect(home).toContain('onAction: () => { void createVisualConcept(); }');
    expect(home).toContain('const noticePanel = notice ? (');
    expect(home).toContain('<StatePanel');
  });
});
