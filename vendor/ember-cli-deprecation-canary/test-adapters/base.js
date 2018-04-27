(function() {
  window.deprecationWorkflow.canary.utils.assertHasCanaryLoaded();

  var deprecationPreamble = 'NEW DEPRECATIONS FOUND:';

  function BaseAdapter(deprecationTracker) {
    this.deprecationTracker = deprecationTracker;
    this.assertTestFrameworkExists();
  }

  BaseAdapter.prototype = {
    assertTestFrameworkExists() {
      return true;
    },

    formatLog() {
      var stats = this.deprecationTracker.generateDeprecationStats();
      return deprecationPreamble + JSON.stringify(stats);
    },

    log() {
      console.log.apply(console, arguments);
    },

    register() {
      var reportingFn = this._getBoundReportingCallback();
      this.registerReporterHook(reportingFn);
    },

    registerReporterHook(/* callback */) {
      throw new Error('registerReporterHook needs to be implemented');
    },

    _getBoundReportingCallback() {
      var deprecationsLog = this.formatLog()
      return this.log.bind(this, deprecationsLog);
    },
  };

  BaseAdapter.extend = function extend(extendedAttrs) {
    function Klass() {
      BaseAdapter.apply(this, arguments);
    }

    Klass.prototype = Object.create(BaseAdapter);
    Object.assign(Klass.prototype, extendedAttrs || {});
    return Klass;
  };

  window.deprecationWorkflow.canary.adapters.base = BaseAdapter;
})();
