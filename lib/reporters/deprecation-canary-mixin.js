/* eslint-env node */
var DeprecationNormalizer = require('ember-cli-deprecation-canary/lib/deprecation-normalizer');
var DeprecationFileWriter = require('ember-cli-deprecation-canary/lib/deprecation-file-writer');

function DeprecationCanaryMixin(ReporterClass) {
  class ReporterWithMixin extends ReporterClass {
    constructor() {
      super(...arguments);
      this._normalizer = new DeprecationNormalizer();
    }

    report(prefix, data) {
      this._normalizer.extractDeprecationsFromLogs(data.logs);
      super.report(...arguments);
    }

    finish() {
      this._handleDeprecations();
      super.finish(...arguments);
    }

    _handleDeprecations() {
      var deprecations = this._normalizer.getNormalizedDeprecations();
      if (deprecations.length <= 0) { return; }

      if (!this.silent) {
        this.out.write('\n\nNew Deprecations Found in test run:\n\n');
        this.out.write(deprecations.join('\n'));
      }

      var deprecationFileWriter = new DeprecationFileWriter();
      deprecationFileWriter.write(deprecations);
    }
  }

  return ReporterWithMixin;
}

module.exports = DeprecationCanaryMixin;
