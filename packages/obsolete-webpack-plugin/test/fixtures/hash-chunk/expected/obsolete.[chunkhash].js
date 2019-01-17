(function() {
  'use strict';
  new Obsolete({
    position: 'afterbegin',
    promptOnNonTargetBrowser: false,
    promptOnUnknownBrowser: true
  }).test(__defaultBrowsers);
})();
