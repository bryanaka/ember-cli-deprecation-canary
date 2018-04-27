(function() {
  var BaseAdapter = window.deprecationWorkflow.canary.adapters.base;

  if (!BaseAdapter) {
    throw new Error('BaseAdapter was not loaded, but is required');
  }

  var JasmineAdapter = BaseAdapter.extend({
    assertTestFrameworkExists() {
      if (!window.Mocha) { throw new Error('Mocha was not found'); }
      return true;
    },

    // TODO: move to runEnd if possible
    registerReporterHook(callback) {
      window.Jasmine.on('suiteEnd', callback);
    }
  });

  window.deprecationWorkflow.canary.adapters.jasmine = JasmineAdapter;
})();
