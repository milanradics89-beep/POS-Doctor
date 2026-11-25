import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const APK_SIGNING_BLOCK_MAGIC = Buffer.from('APK Sig Block 42', 'ascii');
const EXPECTED_UNSIGNED_DIAGNOSTIC = /^ERROR:\\s*Missing META-INF\\/MANIFEST\\.MF$/i;
const UNSAFE_DIAGNOSTIC = /(?:digest mismatch|signature verification failed|failed to verify|malformed|invalid signature|signing block|signer #\\d+|certificate)/i;

export function inspectApkSigningState(apkBytes) {
  if (!Buffer.isBuffer(apkBytes) || apkBytes.length < 22) {
    throw new TypeError('APK bytes must be a non-empty Buffer.');
  }

  const minimumEocdOffset = Math.max(0, apkBytes.length - 22 - 0xffff);
  let eocdOffset = -1;
  for (let offset = apkBytes.length - 22; offset >= minimumEocdOffset; offset -= 1) {
    if (
      apkBytes.readUInt32LE(offset) === 0x06054b50 &&
      offset + 22 + apkBytes.readUInt16LE(offset + 20) === apkBytes.length
    ) {
      eocdOffset = offset;
      break;
    }
  }
  if (eocdOffset < 0) {
    throw new Error('APK ZIP end-of-central-directory record is missing or malformed.');
  }

  const diskNumber = apkBytes.readUInt16LE(eocdOffset + 4);
  const centralDirectoryDisk = apkBytes.readUInt16LE(eocdOffset + 6);
  const entriesOnDisk = apkBytes.readUInt16LE(eocdOffset + 8);
  const totalEntries = apkBytes.readUInt16LE(eocdOffset + 10);
  const centralDirectorySize = apkBytes.readUInt32LE(eocdOffset + 12);
  const centralDirectoryOffset = apkBytes.readUInt32LE(eocdOffset + 16);

  if (
    diskNumber !== 0 ||
    centralDirectoryDisk !== 0 ||
    entriesOnDisk !== totalEntries ||
    totalEntries === 0xffff ||
    centralDirectorySize === 0xffffffff ||
    centralDirectoryOffset === 0xffffffff
  ) {
    throw new Error('Multi-disk or ZIP64 APK archives are not accepted by the unsigned verifier.');
  }
  if (centralDirectoryOffset + centralDirectorySize !== eocdOffset) {
    throw new Error('APK central-directory bounds are inconsistent.');
  }

  let hasV2OrV3SigningBlock = false;
  if (centralDirectoryOffset >= 24) {
    const magicOffset = centralDirectoryOffset - APK_SIGNING_BLOCK_MAGIC.length;
    if (apkBytes.subarray(magicOffset, centralDirectoryOffset).equals(APK_SIGNING_BLOCK_MAGIC)) {
      const trailingSizeOffset = centralDirectoryOffset - 24;
      const blockSize = apkBytes.readBigUInt64LE(trailingSizeOffset);
      const blockStart = centralDirectoryOffset - Number(blockSize) - 8;
      if (
        blockSize < 24n ||
        blockStart < 0 ||
        blockStart + 8 > trailingSizeOffset ||
        apkBytes.readBigUInt64LE(blockStart) !== blockSize
      ) {
        throw new Error('APK signing-block magic is present but its size fields are malformed.');
      }
      hasV2OrV3SigningBlock = true;
    }
  }

  const signatureEntries = [];
  let cursor = centralDirectoryOffset;
  const centralDirectoryEnd = centralDirectoryOffset + centralDirectorySize;
  let parsedEntries = 0;

  while (cursor < centralDirectoryEnd) {
    if (cursor + 46 > centralDirectoryEnd || apkBytes.readUInt32LE(cursor) !== 0x02014b50) {
      throw new Error('APK central-directory entry is malformed.');
    }

    const fileNameLength = apkBytes.readUInt16LE(cursor + 28);
    const extraLength = apkBytes.readUInt16LE(cursor + 30);
    const commentLength = apkBytes.readUInt16LE(cursor + 32);
    const entryEnd = cursor + 46 + fileNameLength + extraLength + commentLength;
    if (entryEnd > centralDirectoryEnd) {
      throw new Error('APK central-directory entry exceeds its declared bounds.');
    }

    const name = apkBytes
      .subarray(cursor + 46, cursor + 46 + fileNameLength)
      .toString('utf8')
      .replaceAll('\\\\', '/');
    const normalizedName = name.toUpperCase();
    if (
      normalizedName.startsWith('META-INF/') &&
      /\\.(?:SF|RSA|DSA|EC|SIG)$/.test(normalizedName)
    ) {
      signatureEntries.push(name);
    }

    parsedEntries += 1;
    cursor = entryEnd;
  }

  if (cursor !== centralDirectoryEnd || parsedEntries !== totalEntries) {
    throw new Error('APK central-directory entry count or length is inconsistent.');
  }

  return {
    hasV2OrV3SigningBlock,
    signatureEntries,
    entryCount: parsedEntries,
  };
}

export function isVerifiedUnsignedApk({ exitCode, output, apkBytes }) {
  if (!Number.isInteger(exitCode) || typeof output !== 'string' || exitCode === 0) {
    return false;
  }

  let signingState;
  try {
    signingState = inspectApkSigningState(apkBytes);
  } catch {
    return false;
  }

  const lines = output.split(/\\r?\\n/).map((line) => line.trim()).filter(Boolean);
  const hasFailureBanner = lines.some((line) => /^DOES NOT VERIFY$/i.test(line));
  const hasExpectedUnsignedDiagnostic = lines.some((line) =>
    EXPECTED_UNSIGNED_DIAGNOSTIC.test(line),
  );
  const hasUnexpectedError = lines.some(
    (line) => /^ERROR:/i.test(line) && !EXPECTED_UNSIGNED_DIAGNOSTIC.test(line),
  );

  if (
    !hasFailureBanner ||
    !hasExpectedUnsignedDiagnostic ||
    hasUnexpectedError ||
    signingState.hasV2OrV3SigningBlock ||
    signingState.signatureEntries.length > 0
  ) {
    return false;
  }

  return !UNSAFE_DIAGNOSTIC.test(output);
}

const isDirectExecution =
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href;

if (isDirectExecution) {
  const [logPath, exitCodeText, apkPath] = process.argv.slice(2);
  if (!logPath || !/^\\d+$/.test(exitCodeText ?? '') || !apkPath) {
    throw new Error(
      'Usage: node scripts/verify-unsigned-android-apk.mjs <apksigner-log> <exit-code> <apk-path>',
    );
  }

  const output = readFileSync(logPath, 'utf8');
  const apkBytes = readFileSync(apkPath);
  const exitCode = Number(exitCodeText);
  if (!isVerifiedUnsignedApk({ exitCode, output, apkBytes })) {
    process.stderr.write('ERROR: apksigner output and APK structure do not prove an unsigned APK.\\n');
    process.exitCode = 1;
  } else {
    process.stdout.write(
      'Verified: apksigner reports no v1 signature, and the APK contains no v1 signature entries or v2/v3 signing block.\\n',
    );
  }
}
