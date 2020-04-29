# Obsolete Webpack Plugin

[![npm](https://img.shields.io/circleci/project/github/ElemeFE/obsolete-webpack-plugin.svg)](https://circleci.com/gh/ElemeFE/obsolete-webpack-plugin) [![npm](https://ci.appveyor.com/api/projects/status/github/ElemeFE/obsolete-webpack-plugin?svg=true)](https://ci.appveyor.com/project/chikara-chan/obsolete-webpack-plugin) [![npm](https://img.shields.io/codecov/c/github/ElemeFE/obsolete-webpack-plugin.svg)](https://codecov.io/github/ElemeFE/obsolete-webpack-plugin) [![npm](https://img.shields.io/npm/v/obsolete-webpack-plugin.svg)](https://npmjs.com/package/obsolete-webpack-plugin) [![node](https://img.shields.io/node/v/obsolete-webpack-plugin.svg)](https://nodejs.org) [![npm](https://img.badgesize.io/https://unpkg.com/obsolete-web/dist/obsolete.min.js?compression=gzip)](https://unpkg.com/obsolete-web/dist/obsolete.min.js) [![licenses](https://img.shields.io/npm/l/obsolete-webpack-plugin.svg)](https://gitlab.alibaba-inc.com/eleme-fe-lpd/obsolete-webpack-plugin/blob/master/LICENSE)

## Introduction :star2:

A Webpack plugin generates a browser-side standalone script that detects browser compatibility based on [Browserslist](https://github.com/browserslist/browserslist) and prompts website users to upgrade it.

## Motivation :collision:

In modern front-end development, we use toolchain to convert next JavaScript version into a backwards compatible version of JavaScript that works in older browser environment. For next syntax features, such as [Object Rest/Spread Properties](https://tc39.github.io/proposal-object-rest-spread/), [Exponentiation Operator](http://rwaldron.github.io/exponentiation-operator/), we can transform all of them through [AST](https://astexplorer.net/) parser. For next built-in features, such as [Promise](https://tc39.github.io/ecma262/#sec-promise-objects), [WeakMap](https://tc39.github.io/ecma262/#sec-weakmap-objects), [String.prototype.padstart](https://tc39.github.io/ecma262/#sec-string.prototype.padstart), we can provide pollyfills that mimic native functionality. However, for some browser only features, such as [Service Worker](https://w3c.github.io/ServiceWorker/), [WebAssembly](https://webassembly.github.io/spec/js-api/), [CSS Grid Layout](https://drafts.csswg.org/css-grid/), no polyfills support these or partially support. In the worst case, our users who use old browsers open a website but catch a sight of blank page. It may be a bad network condition, may be syntax parsing error, may be built-in losing. But they must not realize that the browser they using does not meet the requirements of our website target. Therefore, we need a mechanism to notify that they should upgrade their browser before accessing content. Thus, this plugin borns.

## Getting Started :zap:

### Prerequisite

- Node >=8.3.0
- Webpack 4.x

### Installation

```sh
$ npm i -D obsolete-webpack-plugin
```

### Basic Usage

Apply the plugin in your Webpack configuration, often used together with [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin). By the way, the putting order of plugins is irrelevant.

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ObsoleteWebpackPlugin = require('obsolete-webpack-plugin');

module.exports = {
  // ...
  plugins: [
    // ...
    new HtmlWebpackPlugin(),
    new ObsoleteWebpackPlugin()
  ]
};
```

### Best Practice

To improve first page load speed, you should always reduce render-blocking scripts as far as possible. For non-critical script, it's best to mark them with the `async` attribute. Thanks to [script-ext-html-webpack-plugin](https://github.com/numical/script-ext-html-webpack-plugin), we are able to fulfill this goal easily.

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ObsoleteWebpackPlugin = require('obsolete-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

module.exports = {
  // ...
  plugins: [
    new HtmlWebpackPlugin(),
    new ObsoleteWebpackPlugin({
      name: 'obsolete'
    }),
    new ScriptExtHtmlWebpackPlugin({
      async: 'obsolete'
    })
  ]
};
```

## Configuration :book:

### Options

| Name | Type | Default | Description
| :-: | :-: | :-: | :-:
| name | string | `'obsolete'` | The chunk name.
| template | string | `'<div>Your browser is not supported. <button id="obsoleteClose">&times;</button></div>'` | The prompt html template. It accepts any document fragment. E.g., `'<style>...</style><div>...</div><script>...</script>'`. Specially, the template will be removed when a node with attribute `id="obsoleteClose"` is clicked.
| position | string | `'afterbegin'` | If set `'afterbegin'`, the template will be injected into the start of body. <br>If set `'beforeend'`, the template will be injected into the end of body.
| browsers | string[] | | Browsers to support, overriding global browserslist configuration.
| promptOnNonTargetBrowser | boolean | `false` | If the current browser useragent doesn't match one of the target browsers, it's considered as unsupported. Thus, the prompt will be shown. E.g., your browserslist configuration is `ie > 8`, by default, the prompt won't be shown on Chrome or Safari browser. E.g., your browserslist configuration is `ie > 8`, by default, the prompt won't be shown on Chrome or other browsers. Another e.g., your browserslist configuration is `chrome > 80`, by default, the prompt won't be shown on IE or other browsers.
| promptOnUnknownBrowser | boolean | `true` | If the current browser useragent is unknown, the prompt will be shown.

## Demonstration :art:

![](https://fuss10.elemecdn.com/c/ee/57a564fb6b64c7cf8cf3ac37293c9gif.gif)

## Browser Support :eyeglasses:

The name matches Browserslist queries.

### Desktop

IE | Edge | Chrome | Safari | Firefox | Opera | Electron 
:-: | :-: | :-: | :-: | :-: | :-: | :-:
![](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/46.1.0/archive/internet-explorer_9-11/internet-explorer_9-11_64x64.png) | ![](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/46.1.0/edge/edge_64x64.png) | ![](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/46.1.0/chrome/chrome_64x64.png) | ![](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/46.1.0/safari/safari_64x64.png) | ![](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/46.1.0/firefox/firefox_64x64.png) | ![](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/46.1.0/opera/opera_64x64.png) | ![](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/46.1.0/electron/electron_64x64.png)

### Mobile

ChromeAndroid | Android<br>(5+, WebView) | iOS<br>(OS)
:-: | :-: | :-:
![](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/46.1.0/chrome/chrome_64x64.png) | ![](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/46.1.0/android-webview-beta/android-webview-beta_64x64.png) | ![](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/46.1.0/safari-ios/safari-ios_64x64.png)

## FAQ :tea:

Q: Does this plugin support Yandex, Maxthon, UC or QQ browser?

A: Yep. This plugin supports those browsers based on the mainstream browser kernel, such as Chromium based browser, Mozilla based browser. In other words, `Chrome >= 30` will be also applied to Yandex browser, `ChromeAndroid >= 30` will be also applied to Android UC browser.

Q: Does plugin work in IE 6?

A: Yep. This plugin supports browsers that implement the full [ES3 spec](https://www-archive.mozilla.org/js/language/E262-3.pdf). Although the source code is ES2015+, it will be compiled and shimmed to the target environment eventually.

<!-- ## External Links :anchor: -->
