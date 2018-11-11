const { resolve } = require('path');
const browserslist = require('browserslist');
const WebAsset = require('./web-asset');

class ObsoleteWebpackPlugin {
  /**
   * @param {Object} [options] Configuration.
   * @param {string} [options.name='obsolete'] The chunk name
   * @param {string} [options.template] The prompt html template injected to the bottom of body.
   * @param {string[]} [options.browsers] Browsers to support, overriding browserslist.
   * @param {boolean} [options.promptOnNonTargetBrowser=false] If the current browser name doesn't match one of the
   * target browsers, it's considered as unsupported. Thus, the prompt will be shown.
   */
  constructor(options) {
    const defaultOptions = {
      name: 'obsolete',
      promptOnNonTargetBrowser: false,
    };

    this.options = {
      ...defaultOptions,
      ...options,
    };
    this.libraryPath = require.resolve('obsolete-web');
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
      this.libraryPath,
      compilation.outputOptions.filename
    );
    const obsoleteChunk = compilation.addChunk(this.options.name);
    const template = this.options.template;

    await webAsset.populate({
      browsers: browserslist(this.options.browsers),
      template,
      promptOnNonTargetBrowser: this.options.promptOnNonTargetBrowser,
    });
    webAsset.hash(this.options.name);
    this.connectEntrypointAndChunk(compilation, obsoleteChunk);
    obsoleteChunk.id = this.options.name;
    obsoleteChunk.ids = [obsoleteChunk.id];
    obsoleteChunk.files.push(webAsset.filename);
    compilation.assets[webAsset.filename] = webAsset.createWebpackAsset(
      compilation.outputOptions.path
    );
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
