/* eslint-env node */
var fs = require('fs');
var path = require('path');
var config = require(path.resolve('config/environment'));

var CONFIG = config['ember-cli-deprecation-canary'] || {};
var DEPRECATION_FILE_NAME = CONFIG.deprecationFileName  || 'tests/new-deprecations.txt';

class DeprecationFileWriter {
  get deprecationFileName() {
    return DEPRECATION_FILE_NAME;
  }

  write(deprecations) {
    var newLineDelimitedDeprecations = deprecations.join('\n');
    var deprecationFilePath = path.resolve(this.deprecationFileName);
    fs.writeFileSync(deprecationFilePath, newLineDelimitedDeprecations);
  }
}

module.exports = DeprecationFileWriter;
