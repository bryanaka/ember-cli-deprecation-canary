(function() {
  if (!window) {
    throw new Error(`Ember CLI Deprecation Canary only works within a browser context`);
  }

  var utils = {
    assertEmberDebug() {
      var hasEmberDebug = !!(window.Ember && window.Ember.Debug);
      if (hasEmberDebug) { return true; }

      throw new Error(`Ember.Debug is required to use Ember CLI Deprecation Canary`);
    },

    assertHasDeprecationWorkflow() {
      var hasWorkflow = !!(window.deprecationWorkflow && window.deprecationWorkflow.config && window.deprecationWorkflow.config.workflow);
      if (hasWorkflow) { return true; }

      throw new Error(`Ember CLI Deprecation Workflow is required to use Ember CLI Deprecation Canary`);
    },

    assertHasCanaryLoaded() {
      var canaryDidLoaded = !!(window.deprecationWorkflow && window.deprecationWorkflow.canary && window.deprecationWorkflow.canary.adapters);
      if (canaryDidLoaded) { return true; }

      throw new Error('This file must be loaded after main, deprecation tracker, and necessary adapters');
    }
  }

  utils.assertEmberDebug();
  utils.assertHasDeprecationWorkflow();

  window.deprecationWorkflow.canary = {
    utils: utils,
    adapters: {},
    deprecationTracker: null
  };
})();
