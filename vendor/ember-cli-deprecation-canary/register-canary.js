(function() {
  var EmberDebug = window.Ember && window.Ember.Debug;

  var DeprecationTracker = window.deprecationWorkflow.canary.DeprecationTracker;
  var deprecationTracker = new DeprecationTracker(window.deprecationWorkflow.config.workflow)

  EmberDebug.registerDeprecationHandler(function collectNewDeprecations(message, options, next) {
    deprecationTracker.recordDeprecation(message, options);
    next(message, options);
  });

  var Adapter = window.deprecationWorkflow.adapters.getAdapter();
  var adapter = new Adapter(deprecationTracker);
  adapter.registerReporterHook();
})();
