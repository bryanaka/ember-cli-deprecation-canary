import DeprecationTracker from './deprecation-tracker';
import adapters from './test-adapters';
import {
  assertHasDeprecationWorkflow,
  assertEmberDebug
} from './utils';

const ADAPTER_REGISTRY = {
  QUNIT: adapters.QUnitAdapter
};

function generateAdapter(adapterName, deprecationTracker) {
  let Adapter;

  if (typeof adapterName === 'string') {
    const name = adapterName.toUpperCase();
    Adapter = ADAPTER_REGISTRY[name];
  } else {
    Adapter = adapterName
  }

  return new Adapter(deprecationTracker);
}

export default function register() {
  assertEmberDebug();
  assertHasDeprecationWorkflow();

  const workflow = window.deprecationWorkflow.config.workflow;
  const deprecationTracker = new DeprecationTracker(workflow);
  const adapter = generateAdapter('QUNIT', deprecationTracker);

  adapter.register();
}
