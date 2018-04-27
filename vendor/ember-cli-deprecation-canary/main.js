(function() {
  if (!window) {
    throw new Error(`Ember CLI Deprecation Canary only works within a browser context`);
  }

  var EmberDebug = window.Ember && window.Ember.Debug;
  var deprecationWorkflow = window.deprecationWorkflow;
  var hasWorkflow = !!(deprecationWorkflow && deprecationWorkflow.config && deprecationWorkflow.config.workflow);

  if (!EmberDebug || !hasWorkflow) {
    throw new Error(`Ember and Ember CLI Deprecation Workflow is required to use Ember CLI Deprecation Canary`);
  }

  if (!window.QUnit) {
    throw new Error(`Only QUnit is currently supported`);
  }

  window.deprecationWorkflow.canary = {};
  window.deprecationWorkflow.canary.adapters = {};
})();
