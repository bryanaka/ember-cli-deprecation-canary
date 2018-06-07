/* eslint-env node */
var DotReporter = require('testem/lib/reporters/dot_reporter');
var DeprecationNormalizer = require('../deprecation-normalizer');
var DeprecationFileWriter = require('../deprecation-file-writer');


class DeprecationDotReporter extends DotReporter {
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
    var deprecations = this.normalizer.getNormalizedDeprecations();
    if (deprecations.length <= 0) { return; }

    this.out.write('\n\nNew Deprecations Found in test run:\n\n');
    this.out.write(deprecations.join('\n'));

    var deprecationFileWriter = new DeprecationFileWriter();
    deprecationFileWriter.write(deprecations);
  }
}

module.exports = DeprecationDotReporter;
