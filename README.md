# Obsolete Webpack Plugin &middot; [![npm](https://img.shields.io/circleci/project/github/ElemeFE/obsolete-webpack-plugin.svg)](https://circleci.com/gh/ElemeFE/obsolete-webpack-plugin) [![npm](https://img.shields.io/codecov/c/github/ElemeFE/obsolete-webpack-plugin.svg)](https://codecov.io/github/ElemeFE/obsolete-webpack-plugin) [![npm](https://img.shields.io/npm/v/obsolete-webpack-plugin.svg)](https://npmjs.com/package/obsolete-webpack-plugin) [![node](https://img.shields.io/node/v/obsolete-webpack-plugin.svg)](https://nodejs.org) [![licenses](https://img.shields.io/npm/l/obsolete-webpack-plugin.svg)](https://gitlab.alibaba-inc.com/eleme-fe-lpd/obsolete-webpack-plugin/blob/master/LICENSE)

A Webpack plugin generates a browser-side standalone script that detects browser compatibility based on [Browserslist](https://github.com/browserslist/browserslist) and prompts website users to upgrade it.

## Getting Started :rocket:

### Prerequisite

- Node >=7.6.0
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

## Configuration :art:

### Options

| Name | Type | Default | Description
| :-: | :-: | :-: | :-:
| name | string | `'obsolete'` | The chunk name.
| template | string | `'<div>Your browser is not supported.<button id="obsoleteClose">&times;</button></div>'` | The prompt html template. It accepts any document fragment. E.g., `'<style>...</style><div>...</div><script>...</script>'`. Specially, the template will be removed when a node with attribute `id="obsoleteClose"` is clicked.
| position | string | `'afterbegin'` | If set `'afterbegin'`, the template will be injected into the start of body. <br>If set `'beforeend'`, the template will be injected into the end of body.
| browsers | string[] | | Browsers to support, overriding global browserslist configuration.
| promptOnNonTargetBrowser | boolean | `false` | If the current browser useragent doesn't match one of the target browsers, it's considered as unsupported. Thus, the prompt will be shown. E.g, your browserslist configuration is `ie > 8`, by default, the prompt won't be shown on Chrome or Safari browser.
| promptOnUnknownBrowser | boolean | `true` | If the current browser useragent is unknown, the prompt will be shown.

## Browser Support :eyeglasses:

The name matches Browserslist queries.

### Desktop

IE | Edge | Chrome | Safari | Firefox | Opera | Electron 
:-: | :-: | :-: | :-: | :-: | :-: | :-:
![](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/46.1.0/archive/internet-explorer_9-11/internet-explorer_9-11_64x64.png) | ![](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/46.1.0/edge/edge_64x64.png) | ![](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/46.1.0/chrome/chrome_64x64.png) | ![](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/46.1.0/safari/safari_64x64.png) | ![](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/46.1.0/firefox/firefox_64x64.png) | ![](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/46.1.0/opera/opera_64x64.png) | ![](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/46.1.0/electron/electron_64x64.png)

### Mobile

ChromeAndroid | Android<br>(5+, WebView) | iOS<br>(OS)
:-: | :-: | :-: | :-:
![](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/46.1.0/chrome/chrome_64x64.png) | ![](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/46.1.0/android-webview-beta/android-webview-beta_64x64.png) | ![](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/46.1.0/safari-ios/safari-ios_64x64.png)

## FAQ :tea:

Q: Does plugin support Yandex, Maxthon, UC or QQ browser?

A: Yep. Plugin support those browsers based on the mainstream browser kernel, such as Chromium based browser, Mozilla based browser. In other words, `Chrome >= 30` will be also applied to Yandex browser, `ChromeAndroid >= 30` will be also applied to Android UC browser.
