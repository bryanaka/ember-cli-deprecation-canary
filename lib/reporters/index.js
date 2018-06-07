/* eslint-env node */

module.exports = {
  tap: require('./tap_deprecation_reporter'),
  xunit: require('./xunit_deprecation_reporter'),
  dot: require('./dot_deprecation_reporter'),
  teamcity: require('./teamcity_deprecation_reporter')
};
