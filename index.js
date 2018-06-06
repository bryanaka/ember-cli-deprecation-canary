'use strict';

module.exports = {
  name: 'ember-cli-deprecation-canary',

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
