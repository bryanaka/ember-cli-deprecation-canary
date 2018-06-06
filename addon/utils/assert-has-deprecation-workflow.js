export default function assertHasDeprecationWorkflow() {
  var hasWorkflow = !!(window && window.deprecationWorkflow && window.deprecationWorkflow.config && window.deprecationWorkflow.config.workflow);
  if (hasWorkflow) { return true; }

  throw new Error(`Ember CLI Deprecation Workflow is required to use Ember CLI Deprecation Canary`);
}
