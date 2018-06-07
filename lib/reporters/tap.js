/* eslint-env node */
var TAPReporter = require('testem/lib/reporters/tap_reporter');
var DeprecationCanaryMixin = require('ember-cli-deprecation-canary/lib/reporters/deprecation-canary-mixin');

module.exports = DeprecationCanaryMixin(TAPReporter);
