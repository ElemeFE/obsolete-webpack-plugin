# Obsolete Webpack Plugin &middot; [![npm](https://img.shields.io/npm/v/obsolete-webpack-plugin.svg)](https://npmjs.com/package/obsolete-webpack-plugin) [![node](https://img.shields.io/node/v/obsolete-webpack-plugin.svg)](https://nodejs.org) [![licenses](https://img.shields.io/npm/l/obsolete-webpack-plugin.svg)](https://github.elenet.me/fe/obsolete-webpack-plugin/blob/master/LICENSE)

A webpack plugin generates a browser-side separate file that detects browser compatibility based on [Browserslist](https://github.com/browserslist/browserslist) and prompts website users to upgrade it.

## Getting Started

### Prerequisite

- node >=7.6.0
- webpack 4.x

### Installation

``` sh
$ npm i -D obsolete-webpack-plugin
```

### Basic Usage

``` js
const ObsoleteWebpackPlugin = require('obsolete-webpack-plugin');
```

``` js
{
  plugins: [
    new ObsoleteWebpackPlugin()
  ]
}
```

### Best Practice

``` js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ObsoleteWebpackPlugin = require('obsolete-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
```

``` js
{
  plugins: [
    new HtmlWebpackPlugin(),
    new ObsoleteWebpackPlugin(),
    new ScriptExtHtmlWebpackPlugin({
      async: 'obsolete'
    })
  ]
}
```

## Configuration

TODO

## Browser Support

TODO

## License

TODO
