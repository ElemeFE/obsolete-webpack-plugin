const HtmlWebpackPlugin = require('html-webpack-plugin');
const Plugin = require('../../../src');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin(),
    new ScriptExtHtmlWebpackPlugin({
      async: 'obsolete',
    }),
    new Plugin(),
  ],
};
