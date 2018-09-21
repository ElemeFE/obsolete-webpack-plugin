const { resolve } = require('path');
const browserslist = require('browserslist');
const WebAsset = require('./web-asset');

const libraryPath = resolve(__dirname, '../web-dist/obsolete.js');

class ObsoleteWebpackPlugin {
  /**
   * @param {Object} options User configuration.
   */
  constructor(options) {
    const defaultOptions = {
      name: 'obsolete',
    };

    this.options = {
      ...defaultOptions,
      ...options,
    };
  }
  /**
   * Entrypoint of plugin.
   *
   * @param {Compilation} compiler See also webpack/lib/Compilation.js.
   */
  apply(compiler) {
    compiler.hooks.compilation.tap(this.constructor.name, compilation => {
      compilation.hooks.additionalAssets.tapPromise(this.constructor.name, () =>
        this.additionalAssets(compilation)
      );
    });
  }
  /**
   * Attach plugin chunk to webpack inside.
   * Generate additional asset finally.
   *
   * @param {Compilation} compilation See also webpack/lib/Compilation.js.
   */
  async additionalAssets(compilation) {
    if (compilation.name) {
      return;
    }

    const webAsset = new WebAsset(
      libraryPath,
      compilation.outputOptions.filename
    );
    const obsoleteChunk = compilation.addChunk(this.options.name);

    await webAsset.populate({
      browsers: browserslist(),
    });
    webAsset.hash(this.options.name);
    this.connectEntrypointAndChunk(compilation, obsoleteChunk);
    obsoleteChunk.ids = [this.options.name];
    obsoleteChunk.files.push(webAsset.filename);
    compilation.assets[webAsset.filename] = webAsset.getWebpackAsset();
  }
  /**
   * Connect entrypoint chunk group with plugin chunk each other
   *
   * @param {Compilation} compilation See also webpack/lib/Compilation.js.
   * @param {Chunk} chunk See also webpack/lib/Chunk.js.
   */
  connectEntrypointAndChunk(compilation, chunk) {
    for (const entrypoint of compilation.entrypoints.values()) {
      if (entrypoint.pushChunk(chunk)) {
        chunk.addGroup(entrypoint);
      }
    }
  }
}

module.exports = ObsoleteWebpackPlugin;
