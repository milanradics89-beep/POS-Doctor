import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

export function parseSimctlLaunchPid(output, bundleId) {
  if (typeof output !== 'string' || typeof bundleId !== 'string' || !bundleId.trim()) {
    return null;
  }

  const lines = output.trim().split(/\r?\n/);
  if (lines.length !== 1) return null;

  const prefix = `${bundleId}:`;
  if (!lines[0].startsWith(prefix)) return null;

  const pid = lines[0].slice(prefix.length).trim();
  return /^[1-9]\d*$/.test(pid) ? pid : null;
}

function launchSimulatorApp(deviceId, bundleId) {
  const result = spawnSync('xcrun', ['simctl', 'launch', deviceId, bundleId], {
    encoding: 'utf8',
  });

  if (result.error) {
    console.error(`Unable to run simctl launch: ${result.error.message}`);
    process.exitCode = 1;
    return;
  }

  if (result.status !== 0) {
    if (result.stderr?.trim()) console.error(result.stderr.trim());
    process.exitCode = result.status ?? 1;
    return;
  }

  const pid = parseSimctlLaunchPid(result.stdout ?? '', bundleId);
  if (!pid) {
    console.error(`simctl launch returned no valid process ID for ${bundleId}`);
    process.exitCode = 1;
    return;
  }

  console.log(`iOS simulator app launched: ${bundleId} (PID ${pid})`);
}

const isDirectExecution =
  process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href;

if (isDirectExecution) {
  const [deviceId, bundleId] = process.argv.slice(2);
  if (!deviceId || !bundleId) {
    console.error('Usage: node scripts/ios-simulator-launch.mjs <device-udid> <bundle-id>');
    process.exitCode = 2;
  } else {
    launchSimulatorApp(deviceId, bundleId);
  }
}
