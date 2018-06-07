import Ember from 'ember';

const deprecationPreamble = 'NEW DEPRECATIONS FOUND:';

/**
  @class BaseAdapter
  @abstract
  @protected
*/
export default class BaseAdapter {
  /**
    @constructor
  */
  constructor(deprecationTracker) {
    this.deprecationTracker = deprecationTracker;
    this.assertTestFrameworkExists();
  }

  /**
    @method register
    @public
  */
  register() {
    const reportingFn = this._getBoundReportingCallback();
    this.registerReporterHook(reportingFn);
    this._registerHandler();
  }

  /**
    @method assertTestFrameworkExists
    @protected
  */
  assertTestFrameworkExists() {
    return true;
  }

  /**
    @method registerReporterHook
    @param {Function} callback
    @protected
  */
  registerReporterHook(/* callback */) {
    throw new Error('registerReporterHook needs to be implemented');
  }

  /**
    @method formatLog
    @protected
  */
  formatLog() {
    const stats = this.deprecationTracker.generateDeprecationStats();
    return deprecationPreamble + JSON.stringify(stats);
  }

  /**
    @method log
    @protected
  */
  log() {
    window.console.log.apply(console, arguments);
  }

  /**
    @method registerHandler
    @private
  */
  _registerHandler() {
    const deprecationTracker = this.deprecationTracker;

    Ember.Debug.registerDeprecationHandler(function collectNewDeprecations(message, options, next) {
      deprecationTracker.recordDeprecation(message, options);
      next(message, options);
    });
  }

  /**
    @method _getBoundReportingCallback
    @private
  */
  _getBoundReportingCallback() {
    const deprecationsLog = this.formatLog()
    return this.log.bind(this, deprecationsLog);
  }
}
