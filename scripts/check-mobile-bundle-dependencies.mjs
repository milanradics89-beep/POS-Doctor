import { readdir, readFile } from 'node:fs/promises';
import { resolve, relative, join } from 'node:path';
import { fileURLToPath } from 'node:url';

function packageNameSegments(packageName) {
  if (typeof packageName !== 'string' || !packageName.trim()) {
    throw new TypeError('packageName must be a non-empty package path.');
  }
  const segments = packageName.trim().split('/');
  if (segments.some((segment) => !segment || segment === '.' || segment === '..')) {
    throw new TypeError('packageName must not contain empty or traversal path segments.');
  }
  return segments;
}

function sourceContainsPackage(source, packageSegments) {
  const pathSegments = String(source).replaceAll('\\', '/').split('/');
  for (let index = 0; index < pathSegments.length; index += 1) {
    if (pathSegments[index] !== 'node_modules') continue;
    let matches = true;
    for (let offset = 0; offset < packageSegments.length; offset += 1) {
      if (pathSegments[index + 1 + offset] !== packageSegments[offset]) {
        matches = false;
        break;
      }
    }
    if (matches) return true;
  }
  return false;
}

function flattenSources(sourceMap) {
  if (!sourceMap || typeof sourceMap !== 'object' || Array.isArray(sourceMap)) {
    throw new Error('Source map must be an object.');
  }

  const hasSources = Object.hasOwn(sourceMap, 'sources');
  const hasSections = Object.hasOwn(sourceMap, 'sections');
  if (hasSources === hasSections) {
    throw new Error('Source map must contain exactly one of sources or sections.');
  }

  if (hasSources) {
    if (!Array.isArray(sourceMap.sources) || sourceMap.sources.length === 0) {
      throw new Error('Source map sources must be a non-empty array.');
    }
    const sourceRoot = sourceMap.sourceRoot;
    if (Object.hasOwn(sourceMap, 'sourceRoot') && typeof sourceRoot !== 'string') {
      throw new Error('Source map sourceRoot must be a string when present.');
    }
    const normalizedRoot = typeof sourceRoot === 'string'
      ? sourceRoot.replaceAll('\\', '/').replace(/\\/+$/, '')
      : '';
    if (!sourceMap.sources.every((source) => typeof source === 'string' && source.trim().length > 0)) {
      throw new Error('Source map sources must contain only non-empty strings.');
    }
    return sourceMap.sources.map((source) => {
      const sourcePath = source.replaceAll('\\', '/');
      return normalizedRoot
        ? normalizedRoot + '/' + sourcePath.replace(/^\\/+/, '')
        : sourcePath;
    });
  }

  if (!Array.isArray(sourceMap.sections) || sourceMap.sections.length === 0) {
    throw new Error('Indexed source map sections must be a non-empty array.');
  }
  if (Object.hasOwn(sourceMap, 'sourceRoot')) {
    throw new Error('Indexed source maps must not declare sourceRoot; each section map owns its sourceRoot.');
  }
  return sourceMap.sections.flatMap((section) => {
    if (!section || typeof section !== 'object' || Array.isArray(section)
      || !section.map || typeof section.map !== 'object' || Array.isArray(section.map)) {
      throw new Error('Indexed source map contains a section without a valid map.');
    }
    return flattenSources(section.map);
  });
}

export function findPackageSourcesInMap(sourceMap, packageName = 'picomatch') {
  const segments = packageNameSegments(packageName);
  return flattenSources(sourceMap).filter((source) => sourceContainsPackage(source, segments));
}

async function collectSourceMapFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await collectSourceMapFiles(path));
    } else if (entry.isFile() && entry.name.endsWith('.map')) {
      files.push(path);
    }
  }
  return files.sort();
}

export async function scanBundleSourceMaps(rootDirectory, packageName = 'picomatch') {
  const root = resolve(rootDirectory);
  const files = await collectSourceMapFiles(root);
  if (files.length === 0) {
    throw new Error('No source maps found under ' + root + '; bundle reachability was not verified.');
  }

  const segments = packageNameSegments(packageName);
  const matches = [];
  let sourceCount = 0;

  for (const file of files) {
    const sourceMap = JSON.parse(await readFile(file, 'utf8'));
    const sources = flattenSources(sourceMap);
    sourceCount += sources.length;
    for (const source of sources) {
      if (sourceContainsPackage(source, segments)) {
        matches.push({ file: relative(root, file), source });
      }
    }
  }

  return { sourceMapCount: files.length, sourceCount, matches };
}

async function runCli() {
  const [rootDirectory = '.expo-export', packageName = 'picomatch'] = process.argv.slice(2);
  try {
    const result = await scanBundleSourceMaps(rootDirectory, packageName);
    console.log('Scanned ' + result.sourceMapCount + ' source map(s) and ' + result.sourceCount + ' source entries.');
    if (result.matches.length > 0) {
      console.error('Found ' + result.matches.length + ' ' + packageName + ' module source(s) in the exported mobile bundles:');
      for (const match of result.matches) {
        console.error('- ' + match.file + ': ' + match.source);
      }
      process.exitCode = 1;
      return;
    }
    console.log('No ' + packageName + ' package source was found in the exported mobile bundles.');
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await runCli();
}
