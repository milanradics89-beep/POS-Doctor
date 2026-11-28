import { Platform } from 'react-native';

function decodeImageBytes(dataUrl: string): Uint8Array<ArrayBuffer> {
  const match = /^data:image\/[a-z0-9.+-]+;base64,([A-Za-z0-9+/]+={0,2})$/i.exec(dataUrl);
  if (!match || match[1].length % 4 !== 0) {
    throw new Error('Invalid image data URL.');
  }
  return Uint8Array.from(atob(match[1]), (character) => character.charCodeAt(0));
}

async function digestSha256(bytes: Uint8Array<ArrayBuffer>): Promise<ArrayBuffer> {
  // Browser image processing must fail closed outside secure contexts. React Native
  // also exposes a window-like global, but it does not provide browser security state.
  if (
    Platform.OS === 'web'
    && (typeof window === 'undefined' || window.isSecureContext !== true)
  ) {
    throw new Error('Image verification requires a secure browser context. Open USEIT over HTTPS or localhost.');
  }

  const subtle = globalThis.crypto?.subtle;
  if (subtle?.digest) return subtle.digest('SHA-256', bytes);

  const ExpoCrypto = await import('expo-crypto');
  return ExpoCrypto.digest(ExpoCrypto.CryptoDigestAlgorithm.SHA256, bytes);
}

export async function fingerprintImage(dataUrl: string): Promise<string> {
  const bytes = decodeImageBytes(dataUrl);
  const digest = await digestSha256(bytes);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}
