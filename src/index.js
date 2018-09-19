const { resolve } = require('path');
const browserslist = require('browserslist');
const {createHash} = require('./utils/hash');
const {readFileAsync} = require('./utils/async-fs');

const webAssetPath = resolve(__dirname, '../web-dist/obsolete.js');

class ObsoleteWebpackPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    compiler.hooks.compilation.tap(
      this.constructor.name,
      compilation => this.compilation(compilation)
    );
  }
  compilation(compilation) {

    compilation.hooks.additionalAssets.tapPromise(
      this.constructor.name,
      () => this.additionalAssets(compilation)
    );
  }
  async additionalAssets(compilation) {
    const webAsset = await this.getWebAsset();
    const obsoleteChunk = compilation.addChunk(this.options.name);

    this.connectEntrypointAndChunk(compilation, obsoleteChunk);
    obsoleteChunk.ids = [this.options.name];
    obsoleteChunk.files.push(webAsset.filename);
    compilation.assets[webAsset.filename] = {
      source() {
        return webAsset.content;
      },
      size() {
        return this.source().length;
      },
      map() {
        return null;
      }
    };
  }
  connectEntrypointAndChunk(compilation, chunk) {
    for (const entrypoint of compilation.entrypoints.values()) {
      if (entrypoint.pushChunk(chunk)) {
        chunk.addGroup(entrypoint);
      }
    }
  }
  async getWebAsset() {
    const fileContent = await readFileAsync(webAssetPath, 'utf-8');

    return {
      filename: this.options.filename
        .replace('[name]', this.options.name)
        .replace('[hash]', createHash(fileContent)),
      fileContent
    }
  }
  getAppendedCode() {
    const browsers = browserslist();

    return `
      (function () {
        new Obsolete({
          browsers: ${JSON.stringify(browsers)}
        });
      }());
    `;
  }
}

module.exports = ObsoleteWebpackPlugin;
