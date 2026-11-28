import { afterEach, describe, expect, it, vi } from 'vitest';

const digestMock = vi.hoisted(() => vi.fn());
const platformMock = vi.hoisted(() => ({ OS: 'web' as string }));

vi.mock('expo-crypto', () => ({
  CryptoDigestAlgorithm: { SHA256: 'SHA-256' },
  digest: digestMock,
}));
vi.mock('react-native', () => ({ Platform: platformMock }));

import { fingerprintImage } from './imageFingerprint';

const photo = 'data:image/jpeg;base64,Zm9v';
const expected = '2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae';
const expectedBytes = Uint8Array.from(
  expected.match(/.{2}/g) ?? [],
  (pair) => Number.parseInt(pair, 16)
);

afterEach(() => {
  platformMock.OS = 'web';
  vi.unstubAllGlobals();
  digestMock.mockReset();
});

describe('image fingerprint SHA-256', () => {
  it('hashes decoded image bytes with WebCrypto in a secure web context when available', async () => {
    vi.stubGlobal('window', { isSecureContext: true });

    await expect(fingerprintImage(photo)).resolves.toBe(expected);
    expect(digestMock).not.toHaveBeenCalled();
  });

  it('uses Expo Crypto in a native runtime when SubtleCrypto is unavailable', async () => {
    platformMock.OS = 'ios';
    vi.stubGlobal('crypto', undefined);
    // React Native may expose a window-like global without browser security state.
    vi.stubGlobal('window', {});

    digestMock.mockResolvedValue(expectedBytes.buffer);

    await expect(fingerprintImage(photo)).resolves.toBe(expected);
    expect(digestMock).toHaveBeenCalledOnce();
    expect(digestMock).toHaveBeenCalledWith('SHA-256', Uint8Array.from([102, 111, 111]));
  });

  it('uses Expo Crypto in a secure web context when SubtleCrypto is unavailable', async () => {
    platformMock.OS = 'web';
    vi.stubGlobal('crypto', undefined);
    vi.stubGlobal('window', { isSecureContext: true });
    digestMock.mockResolvedValue(expectedBytes.buffer);

    await expect(fingerprintImage(photo)).resolves.toBe(expected);
    expect(digestMock).toHaveBeenCalledOnce();
  });

  it('fails closed on insecure web origins before attempting either digest path', async () => {
    platformMock.OS = 'web';
    const subtleDigest = vi.fn();
    vi.stubGlobal('crypto', { subtle: { digest: subtleDigest } });
    vi.stubGlobal('window', { isSecureContext: false });

    await expect(fingerprintImage(photo)).rejects.toThrow(
      'Image verification requires a secure browser context. Open USEIT over HTTPS or localhost.'
    );
    expect(subtleDigest).not.toHaveBeenCalled();
    expect(digestMock).not.toHaveBeenCalled();
  });

  it.each([
    'not-a-data-url',
    'data:image/jpeg;base64,',
    'data:image/jpeg;base64,not-valid!',
    'data:text/plain;base64,Zm9v',
    'data:image/jpeg;base64,Zm9',
  ])('rejects malformed image data URLs: %s', async (value) => {
    await expect(fingerprintImage(value)).rejects.toThrow('Invalid image data URL.');
  });
});
