const { withEntitlementsPlist } = require('@expo/config-plugins');

function resolveAppAttestEnvironment(env = process.env) {
  const requested = typeof env.USEIT_APP_ATTEST_ENVIRONMENT === 'string'
    ? env.USEIT_APP_ATTEST_ENVIRONMENT.trim().toLowerCase()
    : '';
  const productionBuild = env.EAS_BUILD_PROFILE?.trim().toLowerCase() === 'production'
    || env.NODE_ENV?.trim().toLowerCase() === 'production';

  if (requested && requested !== 'development' && requested !== 'production') {
    throw new Error('USEIT_APP_ATTEST_ENVIRONMENT must be development or production.');
  }
  if (productionBuild && requested === 'development') {
    throw new Error('Production builds cannot use the development App Attest environment.');
  }
  return requested || (productionBuild ? 'production' : 'development');
}

/** Keep the config plugin separate from the runtime TypeScript module entry. */
module.exports = function withUseItAppAttest(config) {
  const environment = resolveAppAttestEnvironment();
  return withEntitlementsPlist(config, (mod) => {
    mod.modResults['com.apple.developer.devicecheck.appattest-environment'] = environment;
    return mod;
  });
};

module.exports.resolveAppAttestEnvironment = resolveAppAttestEnvironment;
