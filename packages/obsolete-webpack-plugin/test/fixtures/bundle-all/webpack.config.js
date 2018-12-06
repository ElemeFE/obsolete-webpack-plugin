const Plugin = require('../../../src');

module.exports = {
  output: {
    filename: 'main.js',
  },
  plugins: [new Plugin()],
};
