(function() {
  document.addEventListener("DOMContentLoaded", function() {
    if (!window.require) { return; }
    var registerDeprecationCanary = window.require('ember-cli-deprecation-canary/register').default;
    registerDeprecationCanary();
  });
})();
