"use strict";

const {
  resolve
} = require('path');

const browserslist = require('browserslist');

const {
  createHash
} = require('./utils/hash');

const {
  readFileAsync
} = require('./utils/async-fs');

const webAssetPath = resolve(__dirname, '../web-dist/obsolete.js');

class ObsoleteWebpackPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.compilation.tap(this.constructor.name, compilation => this.compilation(compilation)); // compiler.hooks.emit.tapPromise(
    //   this.constructor.name,
    //   compilation => this.alterChunks(compilation)
    // );
  }

  compilation(compilation) {
    // compilation.hooks.htmlWebpackPluginAlterChunks.tap(
    //   this.constructor.name,
    //   (chunks) => this.alterChunks(compilation, chunks)
    // );
    compilation.hooks.additionalAssets.tapPromise(this.constructor.name, () => this.additionalAssets(compilation)); // compilation.hooks.htmlWebpackPluginAlterAssetTags.tap(
    //   this.constructor.name,
    //   (htmlPluginData) => this.alterAssetTags(compilation, htmlPluginData)
    // );
  }

  async additionalAssets(compilation) {
    const webAsset = await this.getWebAsset();
    const obsoleteChunk = compilation.addChunk(this.options.name); // obsoleteChunk.hash = createHash(webAsset.content);
    // obsoleteChunk.renderedHash = obsoleteChunk.hash.substr(0, 8);
    // obsoleteChunk.name = 'obsolete';
    // obsoleteChunk.id = 'obsolete';
    // obsoleteChunk.ids = ['obsolete'];

    obsoleteChunk.files.push(webAsset.filename);

    for (const entrypoint of compilation.entrypoints.values()) {
      entrypoint.pushChunk(obsoleteChunk);
      obsoleteChunk.addGroup(entrypoint);
    }

    compilation.assets[webAsset.filename] = {
      source() {
        return webAsset.fileContent;
      },

      size() {
        return this.source().length;
      },

      map(options) {
        return null;
      }

    }; // webAsset.content += this.getAppendedCode();
    // // webAsset.name = webAsset.name.replace('[contenthash:8]', createHash(webAsset.content));
    // webAsset.name = this.options.name;
  }

  alterAssetTags(compilation, htmlPluginData) {
    // htmlPluginData.body = [
    //   ...htmlPluginData.body,
    //   { 
    //     tagName: 'script',
    //     closeTag: true,
    //     attributes: { 
    //       type: 'text/javascript', 
    //       src: `${compilation.outputOptions.publicPath}browser-update.js`,
    //       async: true
    //     } 
    //   }
    // ];
    return htmlPluginData;
  }

  async emit(compilation) {
    const webAsset = await this.getWebAsset();
    webAsset.content += this.getAppendedCode();
    webAsset.name = webAsset.name.replace('[contenthash:8]', createHash(webAsset.content));
    compilation.assets[webAsset.name] = {
      source() {
        return webAsset.content;
      },

      size() {
        return webAsset.content.length;
      }

    };
  }

  async getWebAsset() {
    const fileContent = await readFileAsync(webAssetPath, 'utf-8');
    return {
      filename: this.options.filename.replace('[name]', this.options.name).replace('[hash]', createHash(fileContent)),
      fileContent
    };
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