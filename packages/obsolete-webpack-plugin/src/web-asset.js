const { resolve } = require('path');
const { CachedSource, OriginalSource } = require('webpack-sources');
const { readFileAsync } = require('./lib/async-fs');
const { createHash } = require('./lib/hash');
const { removeEmptyValues } = require('./lib/filter');
const { indent, stringify } = require('./lib/formatter');

class WebAsset {
  /**
   * @param {string} sourcePath
   * @param {string} filename
   */
  constructor(sourcePath, filename) {
    this.sourcePath = sourcePath;
    this.filename = filename;
    this.fileContent = '';
  }
  /**
   * Generate client code with defined variables.
   *
   * @param {Object} context Variables populated to template.
   */
  async populate(context) {
    this.fileContent = await readFileAsync(this.sourcePath, 'utf-8');
    this.fileContent = this.composeCode(context);
  }
  /**
   * Format filename with placeholder of `[name]` and `[hash]`.
   *
   * @param {string} name The webpack chunk name to replace RegExp.
   */
  hash(name) {
    this.filename = this.filename
      .replace(/\[name\]/gi, name)
      .replace(/\[id\]/gi, name)
      .replace(/\[(?:content|chunk|)hash(?::(\d+))?\]/gi, (...matches) => {
        const hash = createHash(this.fileContent);

        return matches[1] ? hash.substr(0, Number(matches[1])) : hash;
      });
  }
  /**
   * Get asset of generated file, the format is compliant with `webpack-resources`.
   *
   * @param {string} path Webpack output path
   * @returns {CachedSource} See also https://github.com/webpack/webpack-sources.
   */
  createWebpackAsset(path) {
    return new CachedSource(
      new OriginalSource(this.fileContent, resolve(path, this.filename))
    );
  }
  /**
   * Get code which is supposed to being appended to the bottom of library.
   *
   * @param {Object} context Variables populated to template.
   * @param {string[]} context.browsers Must be the output of `browserslist`.
   * @param {string} [context.template]
   * @param {string} [context.position]
   * @param {boolean} [context.promptOnNonTargetBrowser]
   * @param {boolean} [context.promptOnUnknownBrowser]
   * @returns {string}
   */
  composeCode(context) {
    const options = {
      template: context.template,
      position: context.position,
      promptOnNonTargetBrowser: context.promptOnNonTargetBrowser,
      promptOnUnknownBrowser: context.promptOnUnknownBrowser,
    };
    const slimOptions = removeEmptyValues(options);

    return (
      this.fileContent +
      [
        indent(`(function() {`, 0),
        indent(`'use strict';`, 2),
        indent(
          `new Obsolete(${stringify(slimOptions)}).test(${stringify(
            context.browsers
          )});`,
          2
        ),
        indent(`})();\n`, 0),
      ].join('\n')
    );
  }
}

module.exports = WebAsset;
