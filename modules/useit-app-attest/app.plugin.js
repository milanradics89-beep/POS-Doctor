const { withEntitlementsPlist } = require('@expo/config-plugins');

/** Keep the config plugin separate from the runtime TypeScript module entry. */
module.exports = function withUseItAppAttest(config) {
  return withEntitlementsPlist(config, (mod) => {
    const requested = process.env.USEIT_APP_ATTEST_ENVIRONMENT || 'development';
    const environment = requested === 'production' ? 'production' : 'development';
    mod.modResults['com.apple.developer.devicecheck.appattest-environment'] = environment;
    return mod;
  });
};
