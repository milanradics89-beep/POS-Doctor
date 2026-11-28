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
    expect(home).toContain("import { matchesImageFidelity, normalizeImageAsset, resolveVisualDimensions } from '../src/core/intelligence/imageNormalization';");
    expect(home).toContain("import type { NormalizedImageFidelity } from '../src/core/intelligence/imageNormalization';");
    expect(home).toContain('await selectPickerResult(r, generation, copy.decode)');
    expect(home).toContain('await prepareAndSelectPhoto(asset.uri, asset.width, asset.height');
    expect(home).toContain('asset.exif?.Orientation');
    expect(home).toContain('resolveVisualDimensions(dimensions.width, dimensions.height, orientation)');
    expect(home).toContain('const normalized = await normalizeImageAsset(uri, resolvedWidth, resolvedHeight, sourceMimeType);');
    expect(home).toContain('setSelectedPhoto(normalized.dataUrl, normalized.fidelity);');
    expect(home).toContain('asset.mimeType');
    expect(home).not.toContain('setPhoto(`data:${a.mimeType || \'image/jpeg\'};base64,${a.base64}`)');
  });

  it('retains local fidelity metadata and verifies the same image before preview and API requests', () => {
    expect(home).toContain('const [photoFidelity, setPhotoFidelity] = useState<NormalizedImageFidelity | null>(null);');
    expect(home).toContain('setPhotoFidelity(fidelity);');
    expect(home).toContain('runAnalysisWithVerifiedPhoto(');
    expect(home).toContain('runVisualConceptWithVerifiedPhoto(');
    expect(home).toContain('accessibilityLabel={accessibilityLabel}');
    expect(home).toContain('setPhotoFidelity(null);');
    expect(home).toContain('photoFidelity={props.photoFidelity}');
    expect(home).toContain('The prepared photo could not be verified.');
  });

  it('invalidates a pending visual concept before photo preparation can await', () => {
    const start = home.indexOf('async function prepareAndSelectPhoto(');
    const end = home.indexOf('\n  const reset =', start);
    const preparation = home.slice(start, end);
    const invalidation = preparation.indexOf('onBegin();');
    const firstAwait = preparation.indexOf('await ');

    expect(invalidation).toBeGreaterThanOrEqual(0);
    expect(firstAwait).toBeGreaterThan(invalidation);
    expect(home).toContain('redesignControllerRef.current?.abort();');
    expect(home).toContain('onBegin: () => {\n      cancelRedesign();');
  });

  it('routes network failures to the offline panel with a retry for the same intent', () => {
    expect(home).toContain("import { requestFailureKind } from '../src/ui/requestFailure';");
    expect(home).toContain('const kind = requestFailureKind(error);');
    expect(home).toContain('kind,');
    expect(home).toContain("title: analysisFailureTitle(error, kind)");
    expect(home).toContain("description: kind === 'offline'");
    expect(home).toContain('void analyze(intent, idempotencyKey, refinement, refinementTarget, true);');
  });

  it('routes exhausted camera and gallery permissions to the permission-denied panel', () => {
    expect(home).toContain("kind: 'permission-denied'");
    expect(home).toContain("actionLabel: openSettings ? 'OPEN SETTINGS' : 'TRY AGAIN'");
    expect(home).toContain('if (openSettings) void Linking.openSettings();');
    expect(home).toContain('void pickPhoto(source);');
    expect(home).toContain("permissionNotice(copy, decision === 'open_settings'");
  });

  it('uses the shared panel for recoverable visual rendering failures', () => {
    expect(home).toContain("title: 'Visual concept failed'");
    expect(home).toContain('void createVisualConcept(true);');
    expect(home).toContain('const noticePanel = notice ? (');
    expect(home).toContain('<StatePanel');
  });
});
