import { describe, expect, it } from 'vitest';
import { isVerifiedUnsignedApk } from './verify-unsigned-android-apk.mjs';

describe('isVerifiedUnsignedApk', () => {
  it('accepts an explicit no-JAR-signatures diagnostic with the expected failure banner', () => {
    expect(
      isVerifiedUnsignedApk({
        exitCode: 1,
        output: 'DOES NOT VERIFY\nERROR: No JAR signatures found.\n',
      }),
    ).toBe(true);
  });

  it('accepts the apksigner missing-manifest diagnostic only for an unsigned APK', () => {
    expect(
      isVerifiedUnsignedApk({
        exitCode: 1,
        output: 'DOES NOT VERIFY\nERROR: Missing META-INF/MANIFEST.MF\n',
        hasSigningBlock: false,
        hasJarSignatures: false,
      }),
    ).toBe(true);
  });

  it('rejects signature material even when apksigner reports a missing manifest', () => {
    const output = 'DOES NOT VERIFY\nERROR: Missing META-INF/MANIFEST.MF\n';
    expect(isVerifiedUnsignedApk({
      exitCode: 1, output, hasSigningBlock: true, hasJarSignatures: false,
    })).toBe(false);
    expect(isVerifiedUnsignedApk({
      exitCode: 1, output, hasSigningBlock: false, hasJarSignatures: true,
    })).toBe(false);
  });

  it('accepts an explicit no-signers diagnostic', () => {
    expect(
      isVerifiedUnsignedApk({
        exitCode: 1,
        output: 'DOES NOT VERIFY\nNo signers found.\n',
      }),
    ).toBe(true);
  });

  it('rejects the generic DOES NOT VERIFY banner without absence-of-signatures evidence', () => {
    expect(
      isVerifiedUnsignedApk({
        exitCode: 1,
        output: 'DOES NOT VERIFY\n',
      }),
    ).toBe(false);
  });

  it('rejects digest and signature verification errors even when no-signature text is also present', () => {
    expect(
      isVerifiedUnsignedApk({
        exitCode: 1,
        output:
          'DOES NOT VERIFY\nERROR: No JAR signatures found.\nERROR: SHA-256 digest mismatch.\n',
      }),
    ).toBe(false);
  });

  it('rejects signer certificate output', () => {
    expect(
      isVerifiedUnsignedApk({
        exitCode: 1,
        output:
          'DOES NOT VERIFY\nERROR: No JAR signatures found.\nSigner #1 certificate SHA-256 digest: abc\n',
      }),
    ).toBe(false);
  });

  it('rejects a successfully verified APK', () => {
    expect(
      isVerifiedUnsignedApk({
        exitCode: 0,
        output: 'Verifies\nSigner #1 certificate SHA-256 digest: abc\n',
      }),
    ).toBe(false);
  });

  it('rejects unexpected apksigner errors', () => {
    expect(
      isVerifiedUnsignedApk({
        exitCode: 1,
        output: 'DOES NOT VERIFY\nERROR: malformed APK signing block.\n',
      }),
    ).toBe(false);
  });
});

import { hasApkSigningBlock, hasJarSignatureEntries } from './verify-unsigned-android-apk.mjs';

describe('APK signing structure checks', () => {
  it('detects v1 signature files', () => {
    expect(hasJarSignatureEntries(['META-INF/MANIFEST.MF', 'classes.dex'])).toBe(true);
    expect(hasJarSignatureEntries(['META-INF/CERT.SF', 'META-INF/CERT.RSA'])).toBe(true);
    expect(hasJarSignatureEntries(['META-INF/services/provider'])).toBe(false);
  });

  it('detects APK Signing Block before the ZIP central directory', () => {
    const apk = Buffer.alloc(128);
    const cd = 80;
    apk.writeUInt32LE(0x02014b50, cd);
    Buffer.from('APK Sig Block 42', 'ascii').copy(apk, cd - 16);
    const eocd = 106;
    apk.writeUInt32LE(0x06054b50, eocd);
    apk.writeUInt32LE(cd, eocd + 16);
    expect(hasApkSigningBlock(apk)).toBe(true);
  });
});
