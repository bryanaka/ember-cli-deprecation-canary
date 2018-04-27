'use strict';

module.exports = {
  name: 'ember-cli-deprecation-canary',

  included: function() {
    // the presence of `this.app.tests` shows that we are in one of:
    //
    // * running non-production build
    // * running tests against production
    if (this.app.tests) {
      this.app.import('vendor/ember-cli-deprecation-canary/main.js');
      this.app.import('vendor/ember-cli-deprecation-canary/deprecation-tracker.js');

      this.app.import('vendor/ember-cli-deprecation-canary/test-adapters/qunit.js');
      this.app.import('vendor/ember-cli-deprecation-canary/test-adapters.js');

      this.app.import('vendor/ember-cli-deprecation-canary/register-canary.js');
    }
  }
};
