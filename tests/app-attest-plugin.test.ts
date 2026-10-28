import { createRequire } from 'node:module';
import { describe, expect, it } from 'vitest';

const require = createRequire(import.meta.url);
const { resolveAppAttestEnvironment } = require('../modules/useit-app-attest/app.plugin.js') as {
  resolveAppAttestEnvironment: (env: Record<string, string | undefined>) => string;
};

describe('App Attest build environment', () => {
  it('defaults local builds to development', () => {
    expect(resolveAppAttestEnvironment({})).toBe('development');
  });

  it('selects production for the EAS production profile', () => {
    expect(resolveAppAttestEnvironment({ EAS_BUILD_PROFILE: 'production' })).toBe('production');
  });

  it('selects production when NODE_ENV is production', () => {
    expect(resolveAppAttestEnvironment({ NODE_ENV: 'production' })).toBe('production');
  });

  it('rejects a development entitlement for a production build', () => {
    expect(() => resolveAppAttestEnvironment({
      EAS_BUILD_PROFILE: 'production',
      USEIT_APP_ATTEST_ENVIRONMENT: 'development',
    })).toThrow('Production builds cannot use the development App Attest environment.');
  });

  it('rejects unknown explicit environment values instead of silently falling back', () => {
    expect(() => resolveAppAttestEnvironment({
      USEIT_APP_ATTEST_ENVIRONMENT: 'prodution',
    })).toThrow('USEIT_APP_ATTEST_ENVIRONMENT must be development or production.');
  });
});
