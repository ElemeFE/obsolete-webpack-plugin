# Obsolete Web &middot; [![npm](https://img.shields.io/npm/v/obsolete-web.svg)](https://npmjs.com/package/obsolete-webpack-plugin) [![licenses](https://img.shields.io/npm/l/obsolete-webpack-plugin.svg)](https://github.elenet.me/fe/obsolete-webpack-plugin/blob/master/LICENSE)

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
  - `options.template` type: `string` The prompt html template injected to the bottom of body. The default value is:
    ```js
    '<div>Your browser is not supported. <button id="obsoleteClose">&times;</button></div>'
    ```
  - `options.position` type: `string` default: `'afterbegin'` If set `'afterbegin'`, the template will be injected into the start of body. If set `'beforeend'`, the template will be injected into the end of body.
  - `options.promptOnNonTargetBrowser` type: `boolean` default: `false` If the current browser useragent doesn't match one of the target browsers, it's considered as unsupported. Thus, the prompt will be shown. E.g, your browserslist configuration is `ie > 8`, by default, the prompt won't be shown on Chrome or Safari browser.
  - `options.promptOnUnknownBrowser` type: `boolean` default: `true` If the current browser useragent is unknown, the prompt will be shown.

### Methods

#### Syntax

> test(browsers, done)

Test browser compatibility.

#### Parameters

- `browsers` `{string[]}` Browser names in Can I Use.
- `done` `{function}` Callback when the template is injected in finish.

#### Returns

`{boolean}`
