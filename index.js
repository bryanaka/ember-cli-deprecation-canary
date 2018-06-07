'use strict';

function getApp(context) {
  var app;

  // If the addon has the _findHost() method (in ember-cli >= 2.7.0), we'll just
  // use that.
  if (typeof context._findHost === 'function') {
    app = context._findHost();
  } else {
    // Otherwise, we'll use this implementation borrowed from the _findHost()
    // method in ember-cli.
    let current = context;
    do {
      app = current.app || app;
    } while (current.parent.parent && (current = current.parent));
  }
  return app;
}


module.exports = {
  name: 'ember-cli-deprecation-canary',

  included() {
    if (this._shouldInclude()) {
      let app = getApp(this);
      app.import('vendor/register-ember-cli-deprecation-canary.js');
      return this._super.included.apply(this, arguments);
    }
  },

  treeFor() {
   if (this._shouldInclude()) {
     return this._super.treeFor.apply(this, arguments);
   }
 },

  _shouldInclude() {
    // the presence of `this.app.tests` shows that we are in one of:
    //
    // * running non-production build
    // * running tests against production
    //
    return !!this.app.tests;
  },
};
