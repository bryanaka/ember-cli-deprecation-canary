/* jshint node:true */
var fs = require('fs');
var DotReporter = require('testem/lib/reporters/dot_reporter');

var DEPRECATION_REGEX = /NEW DEPRECATIONS FOUND:/;
var DEPRECATION_FILE_NAME = 'tests/artifacts/new-deprecations.txt';
var DEPRECATION_DELIMITER = '::';


class DeprecationDotReporter extends DotReporter {
  constructor(silent, out) {
    super(silent, out);
    this.deprecationLogs = [];
  }

  get deprecationFileName() {
    return DEPRECATION_FILE_NAME;
  }

  report(prefix, data) {
    this._extractDeprecationLogs(data.logs);
    super.report(prefix, data);
  }

  finish() {
    this.handleDeprecations();
    super.finish();
  }

  handleDeprecations() {
    const deprecations = this._getNormalizedDeprecations();
    this.out.write('\n\nNew Deprecations Found in test run:\n\n');
    this.out.write(deprecations.join('\n'));
    this._writeDeprecationFile(deprecations);
  }

  _extractDeprecationLogs(logs) {
    logs = logs || [];
    const newDeprecationLogs = logs.filter(log => DEPRECATION_REGEX.test(log.text));
    this.deprecationLogs = this.deprecationLogs.concat(newDeprecationLogs);
  }

  _writeDeprecationFile(deprecations) {
    const newLineDelimitedDeprecations = deprecations.join('\n');
    fs.writeFileSync(this.deprecationFileName, newLineDelimitedDeprecations);
  }

  _getNormalizedDeprecations() {
    const uniqueDeprecations = this.deprecationLogs.reduce((deprecationIndex, log) => {
      const deprecations = this._normalizeLogEntryToDeprecations(log.text);
      deprecations.forEach(deprecationText => deprecationIndex[deprecationText] = 0);
      return deprecationIndex;
    }, {});
    return Object.keys(uniqueDeprecations);
  }

  _normalizeLogEntryToDeprecations(logText) {
    return logText.replace(DEPRECATION_REGEX, '').replace(/^'/, '').replace(/'\n$/, '').split(DEPRECATION_DELIMITER);
  }
}

module.exports = DeprecationDotReporter;
