import QUnit from 'qunit';
import BaseAdapter from './base';

/**
  @class QUnitAdapter
  @protected
*/
export default class QUnitAdapter extends BaseAdapter {

  /**
    @property testFramework
    @protected
  */
  get testFramework() {
    return QUnit;
  }

  /**
    @method registerReporterHook
    @param {Function} callback
    @override
    @protected
  */
  registerReporterHook(callback) {
    // TODO: we really want runEnd but doesn't work properly because testem
    // doesn't wait until the runEnd callbacks to be run
    QUnit.on('suiteEnd', callback);
  }
}
