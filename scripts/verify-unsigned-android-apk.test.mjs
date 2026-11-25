import { describe, expect, it } from 'vitest';
import { isVerifiedUnsignedApk } from './verify-unsigned-android-apk.mjs';

describe('isVerifiedUnsignedApk', () => {
  it('accepts an explicit no-JAR-signatures diagnostic with the expected failure banner', () => {
    expect(
      isVerifiedUnsignedApk({
        exitCode: 1,
        output: 'DOES NOT VERIFY\\nERROR: No JAR signatures found.\\n',
      }),
    ).toBe(true);
  });

  it('accepts an explicit no-signers diagnostic', () => {
    expect(
      isVerifiedUnsignedApk({
        exitCode: 1,
        output: 'DOES NOT VERIFY\\nNo signers found.\\n',
      }),
    ).toBe(true);
  });

  it('rejects the generic DOES NOT VERIFY banner without absence-of-signatures evidence', () => {
    expect(
      isVerifiedUnsignedApk({
        exitCode: 1,
        output: 'DOES NOT VERIFY\\n',
      }),
    ).toBe(false);
  });

  it('rejects digest and signature verification errors even when no-signature text is also present', () => {
    expect(
      isVerifiedUnsignedApk({
        exitCode: 1,
        output:
          'DOES NOT VERIFY\\nERROR: No JAR signatures found.\\nERROR: SHA-256 digest mismatch.\\n',
      }),
    ).toBe(false);
  });

  it('rejects signer certificate output', () => {
    expect(
      isVerifiedUnsignedApk({
        exitCode: 1,
        output:
          'DOES NOT VERIFY\\nERROR: No JAR signatures found.\\nSigner #1 certificate SHA-256 digest: abc\\n',
      }),
    ).toBe(false);
  });

  it('rejects a successfully verified APK', () => {
    expect(
      isVerifiedUnsignedApk({
        exitCode: 0,
        output: 'Verifies\\nSigner #1 certificate SHA-256 digest: abc\\n',
      }),
    ).toBe(false);
  });

  it('rejects unexpected apksigner errors', () => {
    expect(
      isVerifiedUnsignedApk({
        exitCode: 1,
        output: 'DOES NOT VERIFY\\nERROR: malformed APK signing block.\\n',
      }),
    ).toBe(false);
  });
});
