/* eslint-env node */

module.exports = function(reporter) {
  return require(`ember-cli-deprecation-canary/lib/reporters/${reporter}`);
}
