import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const tracked = execFileSync('git', ['ls-files'], { encoding: 'utf8' }).trim().split('\n').filter(Boolean);
const forbiddenPaths = tracked.filter((path) => path === 'mobile' || path.startsWith('mobile/') || path.startsWith('android/') || path.startsWith('ios/'));
if (forbiddenPaths.length) {
  console.error('Legacy/native tree detected in the USEIT source tree:', forbiddenPaths.join(', '));
  process.exit(1);
}

const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
if (packageJson.name !== 'useit') {
  console.error(`Unexpected package name: ${packageJson.name}`);
  process.exit(1);
}

const forbiddenDependencies = ['adbkit', 'react-native-adb', 'react-native-device-info'];
const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
const found = forbiddenDependencies.filter((name) => name in dependencies);
if (found.length) {
  console.error('Legacy POS diagnostics dependencies detected:', found.join(', '));
  process.exit(1);
}

console.log(`USEIT boundary check passed: ${tracked.length} tracked files, no legacy POS Doctor native tree.`);
