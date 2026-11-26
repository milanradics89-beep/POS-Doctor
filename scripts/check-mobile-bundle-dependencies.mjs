import { readdir, readFile } from 'node:fs/promises';
import { resolve, relative, join } from 'node:path';
import { fileURLToPath } from 'node:url';

function packageSourceMatcher(packageName) {
  if (typeof packageName !== 'string' || !packageName.trim()) {
    throw new TypeError('packageName must be a non-empty string.');
  }
  const packagePath = packageName.trim().replace(/^\/+|\/+$/g, '');
  const packageSegments = packagePath.split('/');
  if (packageSegments.some((segment) => !segment || segment === '.' || segment === '..')) {
    throw new TypeError('packageName must contain valid package path segments.');
  }

  return (source) => {
    const sourceSegments = source.replaceAll('\\', '/').split('/');
    for (let index = 0; index < sourceSegments.length; index++) {
      if (sourceSegments[index] !== 'node_modules') continue;
      if (packageSegments.every((segment, offset) => sourceSegments[index + 1 + offset] === segment)) {
        return true;
      }
    }
    return false;
  };
}
function flattenSources(sourceMap) {
  if (Array.isArray(sourceMap.sources)) {
    return sourceMap.sources.map((source) => String(source));
  }
  if (Array.isArray(sourceMap.sections)) {
    return sourceMap.sections.flatMap((section) => {
      if (!section || !section.map || typeof section.map !== 'object') {
        throw new Error('Indexed source map contains a section without a map.');
      }
      return flattenSources(section.map);
    });
  }
  throw new Error('Source map does not contain a sources array or indexed sections.');
}

export function findPackageSourcesInMap(sourceMap, packageName = 'picomatch') {
  const matcher = packageSourceMatcher(packageName);
  return flattenSources(sourceMap).filter((source) => matcher(source));
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

  const matcher = packageSourceMatcher(packageName);
  const matches = [];
  let sourceCount = 0;

  for (const file of files) {
    const sourceMap = JSON.parse(await readFile(file, 'utf8'));
    const sources = flattenSources(sourceMap);
    sourceCount += sources.length;
    for (const source of sources) {
      if (matcher(source)) {
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
