(function() {
  'use strict';
  new Obsolete({
    template: '<div>Hello</div>',
    position: 'beforeend',
    promptOnNonTargetBrowser: true,
    promptOnUnknownBrowser: false,
  }).test([
    'chrome 9',
    'chrome 8',
    'chrome 7',
    'chrome 6',
    'chrome 5',
    'chrome 4',
  ]);
})();
