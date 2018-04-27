(function() {
  if (!window || !window.deprecationWorkflow || !window.deprecationWorkflow.canary || !window.deprecationWorkflow.canary.adapters) {
    throw new Error('This file must be loaded after main, deprecation tracker, and necessary adapters');
  }

  var deprecationPreamble = 'NEW DEPRECATIONS FOUND:';

  function QUnitAdapter(deprecationTracker) {
    this.deprecationTracker = deprecationTracker;
  }

  QUnitAdapter.prototype = {
    logStats() {
      var stats = this.deprecationTracker.generateDeprecationStats();
      var deprecationsLog = deprecationPreamble + JSON.stringify(stats);
      this.log(deprecationsLog);
    },

    registerReporterHook() {
      var callback = this.logStats.bind(this);
      this._registerReporterHook(callback);
    },

    log() {
      console.log.apply(console, arguments);
    },

    _registerReporterHook(callback) {
      if (!window.Qunit) {
        throw new Error('QUnit was not found');
      }
      // TODO: move to runEnd if possible
      window.QUnit.on('suiteEnd', callback);
    }
  };

  window.deprecationWorkflow.canary.adapters.qunit = QUnitAdapter;
})();
