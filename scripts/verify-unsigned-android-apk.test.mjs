import { describe, expect, it } from 'vitest';
import {
  inspectApkSigningState,
  isVerifiedUnsignedApk,
} from './verify-unsigned-android-apk.mjs';

function makeZip(entries = ['classes.dex'], { signingBlock = false } = {}) {
  const localParts = [];
  const centralParts = [];
  let localOffset = 0;

  for (const name of entries) {
    const nameBytes = Buffer.from(name, 'utf8');
    const local = Buffer.alloc(30 + nameBytes.length);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(nameBytes.length, 26);
    nameBytes.copy(local, 30);
    localParts.push(local);

    const central = Buffer.alloc(46 + nameBytes.length);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(20, 4);
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(nameBytes.length, 28);
    central.writeUInt32LE(localOffset, 42);
    nameBytes.copy(central, 46);
    centralParts.push(central);
    localOffset += local.length;
  }

  const localData = Buffer.concat(localParts);
  const signing = signingBlock
    ? (() => {
        const block = Buffer.alloc(32);
        block.writeBigUInt64LE(24n, 0);
        block.writeBigUInt64LE(24n, 8);
        Buffer.from('APK Sig Block 42', 'ascii').copy(block, 16);
        return block;
      })()
    : Buffer.alloc(0);
  const centralDirectory = Buffer.concat(centralParts);
  const centralDirectoryOffset = localData.length + signing.length;
  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0);
  eocd.writeUInt16LE(entries.length, 8);
  eocd.writeUInt16LE(entries.length, 10);
  eocd.writeUInt32LE(centralDirectory.length, 12);
  eocd.writeUInt32LE(centralDirectoryOffset, 16);
  return Buffer.concat([localData, signing, centralDirectory, eocd]);
}

const unsignedApksignerOutput =
  'DOES NOT VERIFY\\nERROR: Missing META-INF/MANIFEST.MF\\n';

describe('inspectApkSigningState', () => {
  it('detects an APK without v1 entries or a v2/v3 signing block', () => {
    expect(inspectApkSigningState(makeZip())).toEqual({
      hasV2OrV3SigningBlock: false,
      signatureEntries: [],
      entryCount: 1,
    });
  });

  it('detects an APK Signing Block by its terminal magic and matching size fields', () => {
    expect(inspectApkSigningState(makeZip(['classes.dex'], { signingBlock: true })).hasV2OrV3SigningBlock)
      .toBe(true);
  });

  it('detects v1 signature metadata in META-INF', () => {
    expect(inspectApkSigningState(makeZip(['META-INF/CERT.SF', 'META-INF/CERT.RSA'])).signatureEntries)
      .toEqual(['META-INF/CERT.SF', 'META-INF/CERT.RSA']);
  });

  it('rejects malformed ZIP structures', () => {
    expect(() => inspectApkSigningState(Buffer.from('not an APK'))).toThrow();
  });
});

describe('isVerifiedUnsignedApk', () => {
  it('accepts the exact apksigner diagnostic only when the APK structure is unsigned', () => {
    expect(
      isVerifiedUnsignedApk({
        exitCode: 1,
        output: unsignedApksignerOutput,
        apkBytes: makeZip(),
      }),
    ).toBe(true);
  });

  it('rejects a generic DOES NOT VERIFY banner without the expected absence diagnostic', () => {
    expect(
      isVerifiedUnsignedApk({
        exitCode: 1,
        output: 'DOES NOT VERIFY\\n',
        apkBytes: makeZip(),
      }),
    ).toBe(false);
  });

  it('rejects digest and signature verification errors', () => {
    expect(
      isVerifiedUnsignedApk({
        exitCode: 1,
        output:
          'DOES NOT VERIFY\\nERROR: Missing META-INF/MANIFEST.MF\\nERROR: SHA-256 digest mismatch.\\n',
        apkBytes: makeZip(),
      }),
    ).toBe(false);
  });

  it('rejects v1 signature entries even when apksigner emits the unsigned diagnostic', () => {
    expect(
      isVerifiedUnsignedApk({
        exitCode: 1,
        output: unsignedApksignerOutput,
        apkBytes: makeZip(['META-INF/CERT.SF', 'META-INF/CERT.RSA']),
      }),
    ).toBe(false);
  });

  it('rejects a v2/v3 APK Signing Block even when apksigner emits the unsigned diagnostic', () => {
    expect(
      isVerifiedUnsignedApk({
        exitCode: 1,
        output: unsignedApksignerOutput,
        apkBytes: makeZip(['classes.dex'], { signingBlock: true }),
      }),
    ).toBe(false);
  });

  it('rejects a successfully verified APK', () => {
    expect(
      isVerifiedUnsignedApk({
        exitCode: 0,
        output: 'Verifies\\nSigner #1 certificate SHA-256 digest: abc\\n',
        apkBytes: makeZip(),
      }),
    ).toBe(false);
  });

  it('rejects malformed APK data', () => {
    expect(
      isVerifiedUnsignedApk({
        exitCode: 1,
        output: unsignedApksignerOutput,
        apkBytes: Buffer.from('not an APK'),
      }),
    ).toBe(false);
  });
});
