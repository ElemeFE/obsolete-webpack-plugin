const { resolve } = require('path');
const browserslist = require('browserslist');
const WebAsset = require('./web-asset');

class ObsoleteWebpackPlugin {
  /**
   * @param {Object} [options]
   * @param {string} [options.name='obsolete'] The chunk name.
   * @param {string} [options.template] The prompt html template. It accepts any document fragment.
   * @param {string} [options.position='afterbegin'] If set 'afterbegin', the template will be injected
   * into the start of body. If set 'beforeend', the template will be injected into the end of body.
   * @param {string[]} [options.browsers] Browsers to support, overriding global browserslist configuration.
   * @param {boolean} [options.promptOnNonTargetBrowser=false] If the current browser useragent
   * doesn't match one of the target browsers, it's considered as unsupported. Thus, the prompt
   * will be shown. E.g, your browserslist configuration is `ie > 8`, by default, the prompt won't
   * be shown on Chrome or Safari browser.
   * @param {boolean} [options.promptOnUnknownBrowser=true] If the current browser useragent is
   * unknown, the prompt will be shown.
   */
  constructor(options) {
    const defaultOptions = {
      name: 'obsolete',
      position: 'afterbegin',
      promptOnNonTargetBrowser: false,
      promptOnUnknownBrowser: true,
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
      ObsoleteWebpackPlugin.libraryPath,
      this.resolveFilename(compilation)
    );
    const obsoleteChunk = compilation.addChunk(this.options.name);
    const template = this.options.template;

    await webAsset.populate({
      browsers: browserslist(this.options.browsers),
      template,
      position: this.options.position,
      promptOnNonTargetBrowser: this.options.promptOnNonTargetBrowser,
      promptOnUnknownBrowser: this.options.promptOnUnknownBrowser,
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
   * Resolve named chunk filename.
   *
   * @param {Compilation} compilation See also webpack/lib/Compilation.js.
   * @returns {string}
   */
  resolveFilename(compilation) {
    const filename = compilation.outputOptions.chunkFilename;

    return filename.includes('[name]') || filename.includes('[id]')
      ? filename
      : `[name].${filename}`;
  }
  /**
   * Connect entrypoint chunk group with plugin chunk each other.
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
ObsoleteWebpackPlugin.libraryPath = resolve(
  require.resolve('obsolete-web'),
  '../../dist/obsolete.js'
);

module.exports = ObsoleteWebpackPlugin;
