import QUnitAdapter from 'ember-cli-deprecation-canary/test-adapters/qunit';

export const ADAPTER_REGISTRY = {
  qunit: QUnitAdapter
};

/**
  Returns the adapter needed to detect deprecations in a given test framework.

  @function generateAdapter
  @param {DeprecationTracker} deprecationTracker
  @public
*/
export default function generateAdapter(deprecationTracker) {
  // TODO: allow this to be customizable or autodetect
  let adapterName = 'qunit';
  let Adapter;

  if (typeof adapterName === 'string') {
    const name = adapterName.toLowerCase();
    Adapter = ADAPTER_REGISTRY[name];
  } else {
    Adapter = adapterName
  }

  return new Adapter(deprecationTracker);
}
