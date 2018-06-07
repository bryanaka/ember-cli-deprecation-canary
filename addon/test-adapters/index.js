import QUnitAdapter from 'ember-cli-deprecation-canary/test-adapters/qunit';
import generateAdapter, { ADAPTER_REGISTRY } from 'ember-cli-deprecation-canary/test-adapters/generate-adapter';

export {
  QUnitAdapter,
  generateAdapter
};

export default {
  adapters: ADAPTER_REGISTRY,
  generateAdapter: generateAdapter,
};
