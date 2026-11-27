import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const home = readFileSync(new URL('../../app/index.tsx', import.meta.url), 'utf8');

describe('USEIT Home recovery-state integration', () => {
  it('uses Hungarian as the launch locale and exposes five consumer intents', () => {
    expect(home).toContain("import { hu } from '../src/i18n/hu';");
    expect(home).toContain('locale: hu.locale');
    expect(home).not.toContain("locale: 'en-HU'");
    expect(home).toContain("['create', modeCopy.create.title, modeCopy.create.description]");
    expect(home).toContain("['improve', modeCopy.improve.title, modeCopy.improve.description]");
    expect(home).toContain("['fix', modeCopy.fix.title, modeCopy.fix.description]");
    expect(home).toContain("['cook', modeCopy.cook.title, modeCopy.cook.description]");
    expect(home).toContain("['surprise', modeCopy.surprise.title, modeCopy.surprise.description]");
    expect(home).not.toContain("['shop', modeCopy.shop.title");
    expect(home).toContain('<HomeWelcome');
  });

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
    expect(home).toContain('await selectPickerResult(r, generation, copy.decode)');
    expect(home).toContain('await prepareAndSelectPhoto(asset.uri, asset.width, asset.height');
    expect(home).toContain('asset.exif?.Orientation');
    expect(home).toContain('resolveVisualDimensions(dimensions.width, dimensions.height, orientation)');
    expect(home).toContain('const normalized = await normalizeImageAsset(uri, resolvedWidth, resolvedHeight);');
    expect(home).toContain('setSelectedPhoto(normalized.dataUrl, normalized.fidelity);');
    expect(home).not.toContain('setPhoto(`data:${a.mimeType || \'image/jpeg\'};base64,${a.base64}`)');
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

  it('renders the normalized image without cropping and keeps fidelity metadata out of analysis requests', () => {
    const previewStart = home.indexOf('function SelectedPhoto(');
    const previewEnd = home.indexOf('\nfunction ResultNavigation', previewStart);
    const preview = home.slice(previewStart, previewEnd);
    expect(preview).toContain('resizeMode="contain"');
    expect(preview).toContain('source={{ uri: photo }}');
    expect(preview).toContain('accessibilityHint={hu.flow.selectedPhotoHint}');
    expect(preview).toContain('photoFidelity.sourceWidth');
    expect(preview).toContain('photoFidelity.outputWidth');

    const analysisStart = home.indexOf('const response = await analyzeForConsumer(');
    const analysisEnd = home.indexOf('\n      );', analysisStart);
    const analysisCall = home.slice(analysisStart, analysisEnd);
    expect(analysisCall).toContain('photo,');
    expect(analysisCall).not.toContain('photoFidelity');
    expect(analysisCall).not.toContain('fidelity');
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
    expect(home).toContain("actionLabel: openSettings ? hu.flow.openSettings : hu.flow.tryAgain");
    expect(home).toContain('if (openSettings) void Linking.openSettings();');
    expect(home).toContain('void pickPhoto(source);');
    expect(home).toContain("permissionNotice(copy, decision === 'open_settings'");
  });

  it('uses the shared panel for recoverable visual rendering failures', () => {
    expect(home).toContain("title: hu.flow.conceptFailed");
    expect(home).toContain('void createVisualConcept(true);');
    expect(home).toContain('const noticePanel = notice ? (');
    expect(home).toContain('<StatePanel');
  });
});
