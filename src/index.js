const { readFileSync } = require('fs');
const { resolve } = require('path');
const browserslist = require('browserslist');
const template = require('lodash.template');

class ObsoleteWebpackPlugin {
  apply(compiler) {
    if (compiler.hooks) {
      compiler.hooks.emit.tapPromise(
        this.constructor.name,
        async compilation => await this.handleEmit(compilation)
      );
      return;
    }
    compiler.plugin('emit', async (compilation, callback) => {
      await this.handleEmit(compilation);
      callback();
    });
  }
  async handleEmit(compilation) {
    const browsers = browserslist();
    const fileContent = readFileSync(resolve(__dirname, 'browser/obsolete.js'), 'utf-8');
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
