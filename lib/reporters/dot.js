/* eslint-env node */
var DotReporter = require('testem/lib/reporters/dot_reporter');
var DeprecationCanaryMixin = require('ember-cli-deprecation-canary/lib/reporters/deprecation-canary-mixin');

module.exports = DeprecationCanaryMixin(DotReporter);
