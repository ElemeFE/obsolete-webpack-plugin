# Obsolete Webpack Plugin

[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![licenses][licenses]][licenses-url]

A webpack plugin generates a browser-side separate file that detects browser compatibility based on [Browserslist](https://github.com/browserslist/browserslist) and prompts website users to upgrade it.

## Getting Started

### Prerequisite

- node >=7.6.0
- webpack >=4.0.0

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

### Configuration

### Browser Support

### License