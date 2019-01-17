const Plugin = require('../../../src');

module.exports = {
  output: {
    filename: '[name].[hash].js'
  },
  plugins: [new Plugin()]
};
