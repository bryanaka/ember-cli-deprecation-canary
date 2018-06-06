export default function assertEmberDebug() {
  var hasEmberDebug = !!(window && window.Ember && window.Ember.Debug);
  if (hasEmberDebug) { return true; }

  throw new Error(`Ember.Debug is required to use Ember CLI Deprecation Canary`);
}
