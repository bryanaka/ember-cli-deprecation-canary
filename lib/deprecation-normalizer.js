/* eslint-env node */

var DEPRECATION_REGEX = /NEW DEPRECATIONS FOUND:/;

class DeprecationNormalizer {
  constructor() {
    this.newDeprecations = [];
    this.notFoundDeprecations = [];
  }

  extractDeprecationsFromLogs(logs) {
    return logs.forEach(log => {
      if (!DEPRECATION_REGEX.test(log.text)) { return; }

      const parsedDeprecations = JSON.parse(log.text.replace(DEPRECATION_REGEX, '').trim());

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
}

module.exports = DeprecationNormalizer;
