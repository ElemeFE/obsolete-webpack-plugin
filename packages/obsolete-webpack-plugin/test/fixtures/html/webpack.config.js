const HtmlWebpackPlugin = require('html-webpack-plugin');
const Plugin = require('../../../src');

module.exports = {
  plugins: [new HtmlWebpackPlugin(), new Plugin()],
};
