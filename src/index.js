const { readFile } = require('fs');
const { promisify } = require('util');
const { resolve } = require('path');
const browserslist = require('browserslist');
const readFileAsync = promisify(readFile);

class ObsoleteWebpackPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap(
      this.constructor.name,
      compilation => this.compilation(compilation)
    );
    compiler.hooks.emit.tapPromise(
      this.constructor.name,
      compilation => this.emit(compilation)
    );
  }
  compilation(compilation) {
    // const newChunk = compilation.addChunk('newChunk');
    // newChunk.preventIntegration = true;
    // entrypoint.unshiftChunk(newChunk);
    // newChunk.addGroup(entrypoint);
    // entrypoint.setRuntimeChunk(newChunk);

    compilation.hooks.htmlWebpackPluginAlterChunks.tap(
      this.constructor.name,
      (chunks) => this.alterChunks(compilation, chunks)
    );

    // compilation.hooks.htmlWebpackPluginAlterAssetTags.tap(
    //   this.constructor.name,
    //   (htmlPluginData) => this.alterAssetTags(compilation, htmlPluginData)
    // );
  }
  alterChunks(compilation, chunks) {
    for (const entrypoint of compilation.entrypoints.values()) {
      const newChunk = compilation.addChunk('newChunk');

      newChunk.addGroup(entrypoint);
      entrypoint.unshiftChunk(newChunk);
      newChunk.files.push(`${compilation.outputOptions.publicPath}browser-update.js`);
      debugger;
    }

    return chunks;
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
    const libraryPath = resolve(__dirname, 'browser/obsolete.js');
    const fileContent = await readFileAsync(libraryPath, 'utf-8');
    const browsers = browserslist();
    const concatedFileContent = this.concatFileContent(fileContent, browsers);

    compilation.assets['browser-update.js'] = {
      source() {
        return concatedFileContent;
      },
      size() {
        return concatedFileContent.length;
      },
    };
  }
  concatFileContent(fileContent, browsers) {
    return fileContent + `
      (function () {
        new Obsolete({
          browsers: ${JSON.stringify(browsers)}
        });
      }());
    `;
  }
}

module.exports = ObsoleteWebpackPlugin;
