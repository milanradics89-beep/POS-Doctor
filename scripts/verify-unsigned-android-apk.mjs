import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const NO_SIGNATURE_LINE = /^(?:ERROR:\s*)?(?:No JAR signatures(?: found)?|No signers found)\.?$/i;
const UNSAFE_DIAGNOSTIC = /(?:digest mismatch|signature verification failed|failed to verify|malformed|invalid signature|signing block|signer #\d+|certificate)/i;

export function isVerifiedUnsignedApk({ exitCode, output }) {
  if (!Number.isInteger(exitCode) || typeof output !== 'string' || exitCode === 0) {
    return false;
  }

  const lines = output.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const hasFailureBanner = lines.some((line) => /^DOES NOT VERIFY$/i.test(line));
  const hasExplicitNoSignatureEvidence = lines.some((line) => NO_SIGNATURE_LINE.test(line));
  const hasUnexpectedError = lines.some(
    (line) => /^ERROR:/i.test(line) && !NO_SIGNATURE_LINE.test(line),
  );

  if (!hasFailureBanner || !hasExplicitNoSignatureEvidence || hasUnexpectedError) {
    return false;
  }

  const withoutExpectedAbsence = output
    .replace(/No JAR signatures(?: found)?/gi, '')
    .replace(/No signers found/gi, '');
  return !UNSAFE_DIAGNOSTIC.test(withoutExpectedAbsence);
}

const isDirectExecution =
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href;

if (isDirectExecution) {
  const [logPath, exitCodeText] = process.argv.slice(2);
  if (!logPath || !/^\d+$/.test(exitCodeText ?? '')) {
    throw new Error('Usage: node scripts/verify-unsigned-android-apk.mjs <apksigner-log> <exit-code>');
  }

  const output = readFileSync(logPath, 'utf8');
  const exitCode = Number(exitCodeText);
  if (!isVerifiedUnsignedApk({ exitCode, output })) {
    process.stderr.write('ERROR: apksigner output does not prove an unsigned APK.\n');
    process.exitCode = 1;
  } else {
    process.stdout.write('Verified: apksigner reports an explicit absence of APK signatures.\n');
  }

}