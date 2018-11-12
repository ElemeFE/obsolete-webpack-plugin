# Obsolete Web &middot; [![npm](https://img.shields.io/npm/v/obsolete-web.svg)](https://npmjs.com/package/obsolete-webpack-plugin) [![licenses(https://img.shields.io/npm/l/obsolete-webpack-plugin.svg)](https://github.elenet.me/fe/obsolete-webpack-plugin/blob/master/LICENSE)

A library that detects browser compatibility and prompts website users to upgrade it.

## Getting Started

### Installation

#### Via NPM

```sh
$ npm i -D obsolete-web
```

#### Via CDN

```html
<!-- minify version -->
<script src="//unpkg.com/obsolete-web/dist/obsolete.min.js"></script>
<!-- unminify version -->
<script src="//unpkg.com/obsolete-web/dist/obsolete.js"></script>
```

### Basic Usage

```js
new Obsolete().test(['ie 10', 'chrome 23'])
```

## API

### Constructor

#### Syntax

> new Obsolete([options])

#### Parameters

- `options`
  - `options.template` `{string}` The prompt html template injected to the bottom of body. The default value is:
    ```js
    `<div style="position: fixed; left: 0; top: 0; background: #fff">
      Your current browser is not supported, please upgrade it to the latest version.
      <button id="obsoleteClose">&times;</button>
    </div>`
    ```
  - `options.promptOnNonTargetBrowser=false` `{boolean}` If the current browser name doesn't match one of the target browsers, it's considered as unsupported. Thus, the prompt will be shown.

### Methods

#### Syntax

> test(browsers)

Test browser compatibility.

#### Parameters

- `browsers` `{string[]}` Browser names in Can I Use.

#### Returns

`{boolean}`
