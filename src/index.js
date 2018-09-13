class BrowserUpdateWebpackPlugin {
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
    let fileContent = 'In this build:\n\n';

    fileContent = Object.keys(compilation.assets).join('\n');

    compilation.assets['browser-update.js'] = {
      source() {
        return fileContent;
      },
      size() {
        return fileContent.length;
      },
    };
  }
}

module.exports = BrowserUpdateWebpackPlugin;
