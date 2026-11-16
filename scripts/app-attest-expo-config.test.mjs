import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { describe, expect, it } from 'vitest';

const require = createRequire(import.meta.url);
const root = new URL('../', import.meta.url);
const read = (path) => readFileSync(new URL(path, root), 'utf8');

const app = JSON.parse(read('app.json')).expo;
const nativeModule = JSON.parse(read('modules/useit-app-attest/expo-module.config.json'));
const runtimeEntry = read('modules/useit-app-attest/index.ts');
const pluginSource = read('modules/useit-app-attest/app.plugin.js');
const plugin = require('../modules/useit-app-attest/app.plugin.js');
const workflow = read('.github/workflows/validate.yml');

function workflowJob(name) {
  const lines = workflow.split('\n');
  const start = lines.findIndex((line) => line === `  ${name}:`);
  if (start === -1) return '';
  const nextJob = lines.findIndex((line, index) => index > start && /^  [a-z0-9_-]+:$/.test(line));
  return lines.slice(start + 1, nextJob === -1 ? undefined : nextJob).join('\n');
}

function workflowSteps(jobName) {
  const lines = workflowJob(jobName).split('\n');
  const starts = lines.flatMap((line, index) => line.startsWith('      - name: ')
    ? [index]
    : []);
  return starts.map((start, index) => {
    const end = starts[index + 1] ?? lines.length;
    return {
      name: lines[start].slice('      - name: '.length),
      lines: lines.slice(start + 1, end),
    };
  });
}

function stepRun(step) {
  const runIndex = step.lines.findIndex((line) => /^        run:/.test(line));
  if (runIndex === -1) return '';
  const runValue = step.lines[runIndex].replace(/^        run:\s*/, '');
  if (runValue !== '|' && !runValue.startsWith('|-')) return runValue;

  const script = [];
  for (const line of step.lines.slice(runIndex + 1)) {
    if (line.trim() && !/^          /.test(line)) break;
    if (/^          /.test(line)) script.push(line.slice(10));
  }
  return script.join('\n');
}

function expectNode22Prebuild(jobName, buildStepName, command) {
  const steps = workflowSteps(jobName);
  const setupIndex = steps.findIndex((step) => step.name === 'Setup Node');
  const buildIndex = steps.findIndex((step) => step.name === buildStepName);
  expect(setupIndex).toBeGreaterThanOrEqual(0);
  expect(buildIndex).toBeGreaterThan(setupIndex);
  expect(steps[setupIndex].lines.join('\n')).toMatch(/node-version:\s*22/);
  expect(stepRun(steps[buildIndex]).split('\n').map((line) => line.trim())).toContain(command);
}

describe('App Attest config/runtime entrypoint separation', () => {
  it('loads the JavaScript config plugin, never the runtime TypeScript entrypoint', () => {
    expect(app.plugins).toContain('./modules/useit-app-attest/app.plugin.js');
    expect(app.plugins).not.toContain('./modules/useit-app-attest');
    expect(pluginSource).toContain('withEntitlementsPlist');
    expect(pluginSource).not.toContain('requireNativeModule');
    expect(pluginSource).not.toContain('expo-modules-core');
    expect(() => plugin.resolveAppAttestEnvironment({})).not.toThrow();
  });

  it('keeps native autolinking and the runtime TypeScript module intact', () => {
    expect(nativeModule.platforms).toContain('ios');
    expect(nativeModule.ios.modules).toContain('UseitAppAttestModule');
    expect(runtimeEntry).toContain("requireNativeModule<UseitAppAttestModule>('UseitAppAttest')");
    expect(runtimeEntry).toContain('expo-modules-core');
  });

  it('selects a production entitlement only for production builds', () => {
    expect(plugin.resolveAppAttestEnvironment({})).toBe('development');
    expect(plugin.resolveAppAttestEnvironment({ EAS_BUILD_PROFILE: 'production' })).toBe('production');
    expect(() => plugin.resolveAppAttestEnvironment({
      EAS_BUILD_PROFILE: 'production',
      USEIT_APP_ATTEST_ENVIRONMENT: 'development',
    })).toThrow(/Production builds cannot use the development App Attest environment/);
  });

  it('executes Android and iOS Expo prebuild after Node 22 setup', () => {
    expectNode22Prebuild(
      'frontend',
      'Validate native Android release build',
      'npx expo prebuild --platform android --no-install',
    );
    expectNode22Prebuild(
      'ios',
      'Generate native iOS project',
      'npx expo prebuild --platform ios --no-install',
    );
  });
});
