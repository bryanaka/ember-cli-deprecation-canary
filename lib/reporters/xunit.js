/* eslint-env node */
var XUnitReporter = require('testem/lib/reporters/xunit_reporter');
var DeprecationCanaryMixin = require('ember-cli-deprecation-canary/lib/reporters/deprecation-canary-mixin');

module.exports = DeprecationCanaryMixin(XUnitReporter);
