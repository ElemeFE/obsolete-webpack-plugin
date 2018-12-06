const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

function buildModule(module) {
  return new Promise((resolve, reject) => {
    const context = path.resolve(__dirname, `../fixtures/${module}`);
    const configPath = path.resolve(context, 'webpack.config.js');
    const config = webpackMerge(
      {
        mode: 'development',
        context,
        output: {
          path: path.resolve(context, 'dist'),
        },
      },
      require(configPath)
    );

    webpack(config, (err, stats) => {
      if (err) {
        reject(err);
        return;
      }
      if (stats.hasErrors()) {
        console.log( // eslint-disable-line
          stats.toString({
            colors: true,
          })
        );
        reject(new Error('Stats has errors.'));
        return;
      }
      resolve(context);
    });
  });
}

module.exports = { buildModule };
