const { resolve } = require('path');
const { readFileAsync } = require('./utils/async-fs');
const { createHash } = require('./utils/hash');

class WebAsset {
  /**
   * @param {String} sourcePath
   * @param {String} filename
   */
  constructor(sourcePath, filename) {
    this.sourcePath = sourcePath;
    this.filename = filename;
    this.fileContent = '';
  }
  /**
   * Generate client code with defined variables.
   *
   * @param {Object} locals Local variables populated to template.
   * @param {Boolean} uglify
   */
  async populate(locals, uglify = false) {
    this.fileContent = await readFileAsync(this.sourcePath);
    this.composeCode(locals);
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
   * @param {String} name The webpack entry name to replace RegExp.
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
   * @returns {RawSource}.See also https://github.com/webpack/webpack-sources.
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
   * @param {Object} locals variables populated to template.
   * @returns {String}.
   */
  composeCode(locals) {
    this.fileContent += `
      (function () {
        new Obsolete().test(${JSON.stringify(locals.browsers)});
      }());
    `;
  }
}

module.exports = WebAsset;
