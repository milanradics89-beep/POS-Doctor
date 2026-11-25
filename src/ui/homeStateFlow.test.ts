import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const home = readFileSync(new URL('../../app/index.tsx', import.meta.url), 'utf8');

describe('USEIT Home recovery-state integration', () => {
  it('uses a single-flight abortable analysis request and ignores stale completions', () => {
    expect(home).toContain('useRef');
    expect(home).toContain('const analysisControllerRef = useRef<AbortController | null>(null);');
    expect(home).toContain('if (analysisControllerRef.current) return;');
    expect(home).toContain('analysisControllerRef.current?.abort();');
    expect(home).toContain('signal: controller.signal');
    expect(home).toContain('requestId !== analysisRequestIdRef.current');
  });

  it('validates camera and gallery data URLs through the same shared path', () => {
    expect(home).toContain("import { validateImageUri } from '../src/core/intelligence/imageInput';");
    expect(home).toContain('validateImageUri(imageUri);');
    expect(home).toContain("import { normalizeImageAsset, resolveVisualDimensions } from '../src/core/intelligence/imageNormalization';");
    expect(home.split('await prepareAndSelectPhoto(').length - 1).toBe(2);
    expect(home).toContain('a.exif?.Orientation');
    expect(home).toContain('resolveVisualDimensions(dimensions.width, dimensions.height, orientation)');
    expect(home).toContain('const normalized = await normalizeImageAsset(uri, resolvedWidth, resolvedHeight);');
    expect(home).toContain('setSelectedPhoto(normalized.dataUrl);');
    expect(home).not.toContain('setPhoto(`data:${a.mimeType || \'image/jpeg\'};base64,${a.base64}`)');
  });

  it('routes network failures to the offline panel with a retry for the same intent', () => {
    expect(home).toContain("import { requestFailureKind } from '../src/ui/requestFailure';");
    expect(home).toContain('const kind = requestFailureKind(error);');
    expect(home).toContain('kind,');
    expect(home).toContain("title: kind === 'offline' ? 'No connection' : 'Could not understand the image'");
    expect(home).toContain("description: kind === 'offline'");
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
