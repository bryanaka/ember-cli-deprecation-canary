(function() {
  if (!window || !window.deprecationWorkflow || !window.deprecationWorkflow.canary || !window.deprecationWorkflow.canary.adapters) {
    throw new Error('This file must be loaded after main, deprecation tracker, and necessary adapters');
  }

  window.deprecationWorkflow.canary.adapters.getAdapter = function getAdapter() {
    // only supports QUnit right now
    return window.deprecationWorkflow.canary.adapters.qunit;
  };
})();
