/* eslint-env node */

var DEPRECATION_PREAMBLE_REGEX = /NEW DEPRECATIONS FOUND:/;
var DEPRECATION_POSTAMBLE_REGEX = /END DEPRECATIONS'/;

class DeprecationNormalizer {
  constructor() {
    this.newDeprecations = [];
    this.notFoundDeprecations = [];
  }

  extractDeprecationsFromLogs(logs) {
    return logs.forEach(log => {
      if (!DEPRECATION_PREAMBLE_REGEX.test(log.text)) { return; }
      let parsedDeprecations;
      const extractedDeprecationText = this._normalizeLogEntry(log);

      try {
        parsedDeprecations = JSON.parse(extractedDeprecationText);
      } catch (err) {
        throw new Error(`failed with text: ${extractedDeprecationText}`);
      }

      // We will dedup later
      this.newDeprecations = this.newDeprecations.concat(parsedDeprecations.newDeprecations);

      // we only care about the final state of this one
      this.notFoundDeprecations = parsedDeprecations.notFoundDeprecations;
    });
  }

  getNormalizedDeprecations() {
    const uniqueDeprecations = this.newDeprecations.reduce((deprecationIndex, deprecationText) => {
      deprecationIndex[deprecationText] = 0;
      return deprecationIndex;
    }, {});
    return Object.keys(uniqueDeprecations);
  }

  _normalizeLogEntry(log) {
    const textWithoutPreamble = log.text.replace(DEPRECATION_PREAMBLE_REGEX, '');
    const textWithoutPostamble = textWithoutPreamble.split(DEPRECATION_POSTAMBLE_REGEX)[0];
    return textWithoutPostamble.replace(/^'/, '').replace(/'$/, '').trim();
  }
}

module.exports = DeprecationNormalizer;
