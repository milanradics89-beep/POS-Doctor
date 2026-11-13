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
  return workflow.split(`\\n  ${name}:\\n`)[1]?.split(/\\n  [a-z0-9_-]+:\\n/)[0] ?? '';
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

  it('runs both Expo validation and iOS prebuild on Node 22', () => {
    expect(workflowJob('frontend')).toMatch(/node-version:\\s*22/);
    expect(workflowJob('ios')).toMatch(/node-version:\\s*22/);
    expect(workflowJob('ios')).toContain('npx expo prebuild --platform ios --no-install');
  });
});
