import DeprecationTracker from 'ember-cli-deprecation-canary/deprecation-tracker';
import { generateAdapter } from 'ember-cli-deprecation-canary/test-adapters';
import {
  assertHasDeprecationWorkflow,
  assertEmberDebug
} from 'ember-cli-deprecation-canary/utils';


export default function registerDeprecationCanary() {
  assertEmberDebug();
  assertHasDeprecationWorkflow();

  const workflow = window.deprecationWorkflow.config.workflow;
  const deprecationTracker = new DeprecationTracker(workflow);
  const adapter = generateAdapter(deprecationTracker);

  adapter.register();
}
