(function() {
  var BaseAdapter = window.deprecationWorkflow.canary.adapters.base;

  if (!BaseAdapter) {
    throw new Error('BaseAdapter was not loaded, but is required');
  }

  var QUnitAdapter = BaseAdapter.extend({
    assertTestFrameworkExists() {
      if (!window.Qunit) { throw new Error('QUnit was not found'); }
      return true;
    },

    // TODO: move to runEnd if possible
    registerReporterHook(callback) {
      window.QUnit.on('suiteEnd', callback);
    }
  });

  window.deprecationWorkflow.canary.adapters.qunit = QUnitAdapter;
})();
