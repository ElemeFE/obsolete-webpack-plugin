const Plugin = require('../../../src');

module.exports = {
  output: {
    chunkFilename: '[name].[chunkhash].js'
  },
  plugins: [new Plugin()]
};
