import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

function findMatchingBrace(source, openingBraceIndex) {
  let depth = 0;
  let quote = null;
  let escaped = false;
  let lineComment = false;
  let blockComment = false;

  for (let i = openingBraceIndex; i < source.length; i += 1) {
    const char = source[i];
    const next = source[i + 1];

    if (lineComment) {
      if (char === '\n') lineComment = false;
      continue;
    }

    if (blockComment) {
      if (char === '*' && next === '/') {
        blockComment = false;
        i += 1;
      }
      continue;
    }

    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === '\\') {
        escaped = true;
      } else if (char === quote) {
        quote = null;
      }
      continue;
    }

    if (char === '/' && next === '/') {
      lineComment = true;
      i += 1;
      continue;
    }
    if (char === '/' && next === '*') {
      blockComment = true;
      i += 1;
      continue;
    }
    if (char === "'" || char === '"' || char === '`') {
      quote = char;
      continue;
    }

    if (char === '{') depth += 1;
    if (char === '}') {
      depth -= 1;
      if (depth === 0) return i;
    }
  }

  throw new Error('Unbalanced braces while locating the Android release build type.');
}

export function prepareUnsignedAndroidRelease(source) {
  if (typeof source !== 'string') {
    throw new TypeError('Android Gradle source must be a string.');
  }

  const buildTypesMatch = /\bbuildTypes\s*\{/m.exec(source);
  if (!buildTypesMatch) {
    throw new Error('Android buildTypes block was not found.');
  }

  const buildTypesOpen = source.indexOf('{', buildTypesMatch.index);
  const buildTypesClose = findMatchingBrace(source, buildTypesOpen);
  const buildTypesBody = source.slice(buildTypesOpen + 1, buildTypesClose);
  const releaseMatch = /\brelease\s*\{/m.exec(buildTypesBody);
  if (!releaseMatch) {
    throw new Error('Android release build type was not found inside buildTypes.');
  }

  const releaseStart = buildTypesOpen + 1 + releaseMatch.index;
  const releaseOpen = source.indexOf('{', releaseStart);
  const releaseClose = findMatchingBrace(source, releaseOpen);
  const releaseBlock = source.slice(releaseStart, releaseClose + 1);

  const debugSigningLines = [
    ...releaseBlock.matchAll(/^([ \t]*)signingConfig\s+signingConfigs\.debug\s*$/gm),
  ];
  if (debugSigningLines.length !== 1) {
    throw new Error(
      `Expected exactly one Expo debug signing assignment in release, found ${debugSigningLines.length}.`,
    );
  }

  const signingLines = [...releaseBlock.matchAll(/^[ \t]*signingConfig\b/gm)];
  if (signingLines.length !== 1) {
    throw new Error('Unexpected release signing configuration; refusing to rewrite it.');
  }

  const updatedReleaseBlock = releaseBlock.replace(
    /^([ \t]*)signingConfig\s+signingConfigs\.debug\s*$/m,
    '$1// Intentionally unsigned: CI artifacts must not use the debug keystore.',
  );

  if (/^[ \t]*signingConfig\b/m.test(updatedReleaseBlock)) {
    throw new Error('Release signing configuration remains after the unsigned transformation.');
  }

  return (
    source.slice(0, releaseStart) +
    updatedReleaseBlock +
    source.slice(releaseClose + 1)
  );
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  const filePath = process.argv[2];
  if (!filePath) {
    throw new Error('Usage: node scripts/prepare-unsigned-android-release.mjs <android/app/build.gradle>');
  }

  const original = readFileSync(filePath, 'utf8');
  const updated = prepareUnsignedAndroidRelease(original);
  if (updated === original) {
    throw new Error('Unsigned release transformation made no change.');
  }

  writeFileSync(filePath, updated, 'utf8');
  process.stdout.write('Removed the Expo debug signing assignment from the release build type.\n');
}
