const Plugin = require('../../../src');

module.exports = {
  output: {
    chunkFilename: 'chunk.js'
  },
  plugins: [new Plugin()]
};
