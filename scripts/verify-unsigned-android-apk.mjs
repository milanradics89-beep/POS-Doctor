import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const NO_SIGNATURE_LINE = /^(?:ERROR:\s*)?(?:Missing META-INF\/MANIFEST\.MF|No JAR signatures(?: found)?|No signers found)\.?$/i;
const UNSAFE_DIAGNOSTIC = /(?:digest mismatch|signature verification failed|failed to verify|malformed|invalid signature|signing block|signer #\d+|certificate)/i;
const APK_MAGIC = Buffer.from('APK Sig Block 42', 'ascii');

export function hasApkSigningBlock(apk) {
  const min = Math.max(0, apk.length - 22 - 0xffff);
  let eocd = -1;
  for (let i = apk.length - 22; i >= min; i--) {
    if (apk.readUInt32LE(i) === 0x06054b50 && i + 22 + apk.readUInt16LE(i + 20) === apk.length) { eocd = i; break; }
  }
  if (eocd < 0) throw new Error('APK ZIP end-of-central-directory record is missing.');
  const cd = apk.readUInt32LE(eocd + 16);
  if (cd < 24 || cd > eocd || apk.readUInt32LE(cd) !== 0x02014b50) throw new Error('APK ZIP central directory is malformed.');
  return apk.subarray(cd - 16, cd).equals(APK_MAGIC);
}

export function hasJarSignatureEntries(entries) {
  return entries.some((entry) => /^META-INF\/(?:MANIFEST\.MF|[^/]+\.(?:SF|RSA|DSA|EC))$/i.test(entry.trim()));
}

export function isVerifiedUnsignedApk({ exitCode, output, hasSigningBlock = false, hasJarSignatures = false }) {
  if (!Number.isInteger(exitCode) || typeof output !== 'string' || exitCode === 0 || hasSigningBlock || hasJarSignatures) return false;
  const lines = output.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const banner = lines.some((line) => /^DOES NOT VERIFY$/i.test(line));
  const absence = lines.some((line) => NO_SIGNATURE_LINE.test(line));
  const unexpected = lines.some((line) => /^ERROR:/i.test(line) && !NO_SIGNATURE_LINE.test(line));
  return banner && absence && !unexpected && !UNSAFE_DIAGNOSTIC.test(output);
}

const direct = process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href;
if (direct) {
  const [logPath, exitText, apkPath] = process.argv.slice(2);
  if (!logPath || !/^\d+$/.test(exitText ?? '') || !apkPath) throw new Error('Usage: verify-unsigned-android-apk <log> <exit-code> <apk>');
  const output = readFileSync(logPath, 'utf8');
  const apk = readFileSync(apkPath);
  const entries = execFileSync('unzip', ['-Z1', apkPath], { encoding: 'utf8' }).split(/\r?\n/).filter(Boolean);
  const hasSigningBlock = hasApkSigningBlock(apk);
  const hasJarSignatures = hasJarSignatureEntries(entries);
  if (!isVerifiedUnsignedApk({ exitCode: Number(exitText), output, hasSigningBlock, hasJarSignatures })) {
    process.stderr.write('ERROR: unsigned APK proof failed (APK Signing Block: ' + hasSigningBlock + '; JAR signatures: ' + hasJarSignatures + ').\n');
    process.exitCode = 1;
  } else {
    process.stdout.write('Verified unsigned APK: ZIP readable; no APK Signing Block or JAR signature entries.\n');
  }
}
