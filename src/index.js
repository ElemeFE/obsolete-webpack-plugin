const { resolve } = require('path');
const browserslist = require('browserslist');
const { createHash } = require('./utils/hash');
const { readFileAsync } = require('./utils/async-fs');

const webAssetPath = resolve(__dirname, '../web-dist/obsolete.js');
const defaultOptions = {
  name: 'obsolete',
};

class ObsoleteWebpackPlugin {
  constructor(options) {
    this.options = {
      ...defaultOptions,
      ...options,
    };
  }
  apply(compiler) {
    compiler.hooks.compilation.tap(this.constructor.name, compilation => {
      compilation.hooks.additionalAssets.tapPromise(this.constructor.name, () =>
        this.additionalAssets(compilation)
      );
    });
  }
  async additionalAssets(compilation) {
    if (compilation.name) {
      return;
    }

    const webAsset = await this.getWebAsset(compilation);
    const obsoleteChunk = compilation.addChunk(this.options.name);

    this.connectEntrypointAndChunk(compilation, obsoleteChunk);
    obsoleteChunk.ids = [this.options.name];
    obsoleteChunk.files.push(webAsset.filename);
    compilation.assets[webAsset.filename] = {
      source() {
        return webAsset.fileContent;
      },
      size() {
        return this.source().length;
      },
      map() {
        return null;
      },
    };
  }
  connectEntrypointAndChunk(compilation, chunk) {
    for (const entrypoint of compilation.entrypoints.values()) {
      if (entrypoint.pushChunk(chunk)) {
        chunk.addGroup(entrypoint);
      }
    }
  }
  async getWebAsset(compilation) {
    const fileContent = await readFileAsync(webAssetPath, 'utf-8');

    return {
      filename: this.getPopulatedFilename(
        fileContent,
        compilation.outputOptions
      ),
      fileContent,
    };
  }
  getPopulatedFilename(fileContent, outputOptions) {
    return outputOptions.filename
      .replace(/\[name\]/gi, this.options.name)
      .replace(/\[(?:content|chunk|)hash(?::(\d+))?\]/gi, (...matches) => {
        const hash = createHash(fileContent);

        return matches[1] ? hash.substr(0, Number(matches[1])) : hash;
      });
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
