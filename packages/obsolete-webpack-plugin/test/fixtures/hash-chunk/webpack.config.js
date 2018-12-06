const Plugin = require('../../../src');

module.exports = {
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js',
  },
  plugins: [new Plugin()],
};
