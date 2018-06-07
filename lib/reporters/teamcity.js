/* eslint-env node */
var TeamcityReporter = require('testem/lib/reporters/teamcity_reporter');
var DeprecationCanaryMixin = require('ember-cli-deprecation-canary/lib/reporters/deprecation-canary-mixin');

module.exports = DeprecationCanaryMixin(TeamcityReporter);
