import { describe, expect, it, vi } from 'vitest';
import type { NormalizedImageFidelity } from './imageNormalization';
import { fingerprintImage } from './imageFingerprint';
import {
  runAnalysisWithVerifiedPhoto,
  runVisualConceptWithVerifiedPhoto,
} from './verifiedPhotoRequest';

const photo = 'data:image/jpeg;base64,Zm9v';

type Guard = typeof runAnalysisWithVerifiedPhoto;

const guards: Array<[string, Guard]> = [
  ['analysis', runAnalysisWithVerifiedPhoto],
  ['visual concept', runVisualConceptWithVerifiedPhoto],
];

async function createFidelity(): Promise<NormalizedImageFidelity> {
  return {
    sourceWidth: 1,
    sourceHeight: 1,
    sourceMimeType: 'image/jpeg',
    outputWidth: 1,
    outputHeight: 1,
    mimeType: 'image/jpeg',
    outputBytes: 3,
    payloadBytes: new TextEncoder().encode(photo).byteLength,
    payloadFingerprint: await fingerprintImage(photo),
    jpegQuality: 0.82,
    resizeLimit: 2048,
    aspectRatioDelta: 0,
  };
}

async function expectRejected(
  guard: Guard,
  selectedPhoto: string | null,
  fidelity: NormalizedImageFidelity | null
): Promise<void> {
  const request = vi.fn(async (verifiedPhoto: string) => verifiedPhoto);
  const onRejected = vi.fn();
  const result = await guard(selectedPhoto, fidelity, onRejected, request);

  expect(result).toEqual({ ok: false });
  expect(onRejected).toHaveBeenCalledOnce();
  expect(request).not.toHaveBeenCalled();
}

describe.each(guards)('%s verified photo request', (_name, guard) => {
  it('shows rejection and never calls the provider when the photo is missing', async () => {
    await expectRejected(guard, null, await createFidelity());
  });

  it('shows rejection and never calls the provider when fidelity metadata is missing', async () => {
    await expectRejected(guard, photo, null);
  });

  it('rejects a different image with identical encoded and decoded lengths', async () => {
    await expectRejected(guard, 'data:image/jpeg;base64,YmFy', await createFidelity());
  });

  it('sends only the exact verified image payload to the request callback', async () => {
    const request = vi.fn(async (verifiedPhoto: string) => verifiedPhoto);
    const onRejected = vi.fn();
    const result = await guard(photo, await createFidelity(), onRejected, request);

    expect(result).toEqual({ ok: true, value: photo });
    expect(request).toHaveBeenCalledExactlyOnceWith(photo);
    expect(onRejected).not.toHaveBeenCalled();
  });

  it('does not dispatch when the request is invalidated during image verification', async () => {
    const request = vi.fn(async (verifiedPhoto: string) => verifiedPhoto);
    const onRejected = vi.fn();
    const canRequest = vi.fn(() => false);
    const result = await guard(photo, await createFidelity(), onRejected, request, canRequest);

    expect(result).toEqual({ ok: false });
    expect(canRequest).toHaveBeenCalledOnce();
    expect(request).not.toHaveBeenCalled();
    expect(onRejected).not.toHaveBeenCalled();
  });
});
