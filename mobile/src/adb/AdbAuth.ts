/**
 * ADB RSA Authentication
 * Uses node-forge for pure-JS RSA (no native modules needed)
 * Handles key generation, signing, and Android public key format
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const PRIVATE_KEY_KEY = '@pos_doctor:adb_private_key';
const PUBLIC_KEY_KEY = '@pos_doctor:adb_public_key';

export interface AdbKeyPair {
  privateKey: string; // PEM
  publicKey: string;  // PEM
}

let _forge: any = null;

async function getForge(): Promise<any> {
  if (!_forge) {
    // Lazy-load forge to avoid startup time
    _forge = require('node-forge');
  }
  return _forge;
}

export async function loadOrCreateKeyPair(): Promise<AdbKeyPair> {
  try {
    const existingPrivate = await AsyncStorage.getItem(PRIVATE_KEY_KEY);
    const existingPublic = await AsyncStorage.getItem(PUBLIC_KEY_KEY);

    if (existingPrivate && existingPublic) {
      return { privateKey: existingPrivate, publicKey: existingPublic };
    }
  } catch (_e) {
    // Storage error, generate new
  }

  // Generate new RSA-2048 keypair
  const forge = await getForge();
  const keyPair = await new Promise<{ privateKey: string; publicKey: string }>((resolve, reject) => {
    forge.pki.rsa.generateKeyPair({ bits: 2048, workers: -1, e: 0x10001 }, (err: any, keypair: any) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({
        privateKey: forge.pki.privateKeyToPem(keypair.privateKey),
        publicKey: forge.pki.publicKeyToPem(keypair.publicKey),
      });
    });
  });

  // Persist
  await AsyncStorage.setItem(PRIVATE_KEY_KEY, keyPair.privateKey);
  await AsyncStorage.setItem(PUBLIC_KEY_KEY, keyPair.publicKey);

  return keyPair;
}

export async function signToken(tokenBuffer: Buffer, privateKeyPem: string): Promise<Buffer> {
  const forge = await getForge();
  const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);

  // ADB uses SHA-1 RSA PKCS#1 v1.5 signature
  const md = forge.md.sha1.create();
  const byteStr = forge.util.binary.raw.encode(new Uint8Array(tokenBuffer));
  md.update(byteStr);
  const signature = privateKey.sign(md);

  // Convert forge binary string back to Buffer
  const sigBytes = forge.util.binary.raw.decode(signature);
  return Buffer.from(new Uint8Array(sigBytes.split('').map((c: string) => c.charCodeAt(0))));
}

/**
 * Encode public key in Android ADB format
 * Format: base64(RSAPublicKey struct) + " hostname\0"
 * The RSAPublicKey struct is defined in Android's crypto_utils.c
 */
export async function buildPublicKeyPayload(
  publicKeyPem: string,
  comment = 'pos-doctor@android'
): Promise<Buffer> {
  const forge = await getForge();
  const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);

  const RSANUMWORDS = 64; // 2048 / 32

  // Get modulus as BigInt (little-endian 32-bit words)
  const nHex = publicKey.n.toString(16).padStart(512, '0');

  // Build nWords (little-endian: word 0 = least significant)
  const nWords = new Uint32Array(RSANUMWORDS);
  for (let i = 0; i < RSANUMWORDS; i++) {
    // Byte position (from end of hex string, each word is 8 hex chars)
    const hexStart = 512 - (i + 1) * 8;
    nWords[i] = parseInt(nHex.substring(hexStart, hexStart + 8), 16);
  }

  // Compute n0inv = -n[0]^-1 mod 2^32
  const n0 = BigInt(nWords[0]);
  const mod32 = 2n ** 32n;
  const n0inv = modInverse(n0, mod32);
  const n0invNeg = Number((mod32 - n0inv) % mod32);

  // Compute rr = R^2 mod n, where R = 2^2048
  // We need BigInt arithmetic
  const nBig = BigInt('0x' + nHex);
  const R = 2n ** 2048n;
  const rr = (R * R) % nBig;

  const rrWords = new Uint32Array(RSANUMWORDS);
  let tmp = rr;
  for (let i = 0; i < RSANUMWORDS; i++) {
    rrWords[i] = Number(tmp & 0xFFFFFFFFn);
    tmp >>= 32n;
  }

  // Exponent
  const exponent = publicKey.e.toNumber ? publicKey.e.toNumber() : Number(publicKey.e);

  // Serialize struct: len(4) + n0inv(4) + n[64*4] + rr[64*4] + exponent(4) = 528 bytes
  const structSize = 4 + 4 + RSANUMWORDS * 4 + RSANUMWORDS * 4 + 4;
  const buf = Buffer.alloc(structSize);
  let offset = 0;

  buf.writeUInt32LE(RSANUMWORDS, offset); offset += 4;
  buf.writeUInt32LE(n0invNeg >>> 0, offset); offset += 4;
  for (let i = 0; i < RSANUMWORDS; i++) {
    buf.writeUInt32LE(nWords[i] >>> 0, offset); offset += 4;
  }
  for (let i = 0; i < RSANUMWORDS; i++) {
    buf.writeUInt32LE(rrWords[i] >>> 0, offset); offset += 4;
  }
  buf.writeUInt32LE(exponent >>> 0, offset);

  // Base64-encode and format
  const b64 = buf.toString('base64');
  return Buffer.from(`${b64} ${comment}\0`);
}

function modInverse(a: bigint, m: bigint): bigint {
  let [old_r, r] = [a, m];
  let [old_s, s] = [1n, 0n];

  while (r !== 0n) {
    const q = old_r / r;
    [old_r, r] = [r, old_r - q * r];
    [old_s, s] = [s, old_s - q * s];
  }

  if (old_s < 0n) old_s += m;
  return old_s;
}
