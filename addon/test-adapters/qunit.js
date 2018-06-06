import QUnit from 'qunit';
import BaseAdapter from './base';

/**
  @class QUnitAdapter
  @protected
*/
export default class QUnitAdapter extends BaseAdapter {
  /**
    @method assertTestFrameworkExists
    @override
    @protected
  */
  assertTestFrameworkExists() {
    if (!QUnit) {
      throw new Error('QUnit was not found and is required');
    }
    return true;
  }

  /**
    @method registerReporterHook
    @param {Function} callback
    @override
    @protected
  */
  registerReporterHook(callback) {
    // TODO: move to runEnd if possible
    QUnit.on('suiteEnd', callback);
  }
}
