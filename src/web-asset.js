const { resolve } = require('path');
const { readFileAsync } = require('./utils/async-fs');
const { createHash } = require('./utils/hash');

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
   * @param {boolean} uglify
   */
  async populate(context, uglify = false) {
    this.fileContent = await readFileAsync(this.sourcePath);
    this.composeCode(context);
    if (uglify) {
      this.compress();
    }
  }
  /**
   * Compress source code.
   */
  compress() {
    // TODO
  }
  /**
   * Format filename with placeholder of `[name]` and `[hash]`
   *
   * @param {string} name The webpack entry name to replace RegExp.
   */
  hash(name) {
    this.filename = this.filename
      .replace(/\[name\]/gi, name)
      .replace(/\[(?:content|chunk|)hash(?::(\d+))?\]/gi, (...matches) => {
        const hash = createHash(this.fileContent);

        return matches[1] ? hash.substr(0, Number(matches[1])) : hash;
      });
  }
  /**
   * Get asset of generated file, the format is compliant with `webpack-resources`.
   *
   * @returns {RawSource} See also https://github.com/webpack/webpack-sources.
   */
  getWebpackAsset() {
    return {
      source() {
        return this.fileContent;
      },
      size() {
        return this.source().length;
      },
      map() {
        return null;
      },
    };
  }
  /**
   * Get code which is supposed to being appended to the bottom of library.
   *
   * @param {Object} context Variables populated to template.
   * @returns {String}.
   */
  composeCode(context) {
    this.fileContent += `
      (function () {
        new Obsolete({
          template: ${JSON.stringify(context.template)},
          promptOnUnknownBrowser: ${JSON.stringify(
            context.promptOnUnknownBrowser
          )},
        }).test(${JSON.stringify(context.browsers)});
      }());
    `;
  }
}

module.exports = WebAsset;
