import QUnitAdapter from './qunit';

const ADAPTER_REGISTRY = {
  qunit: QUnitAdapter
};

function generateAdapter(deprecationTracker) {
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

export {
  QUnitAdapter,
};

export default {
  adapters: ADAPTER_REGISTRY,

  generateAdapter: generateAdapter,
};
