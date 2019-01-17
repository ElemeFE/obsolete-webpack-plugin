const Plugin = require('../../../src');

module.exports = {
  plugins: [
    new Plugin({
      name: 'outdated',
      template: '<div>Hello</div>',
      position: 'beforeend',
      browsers: ['Chrome < 10'],
      promptOnNonTargetBrowser: true,
      promptOnUnknownBrowser: false
    })
  ]
};
