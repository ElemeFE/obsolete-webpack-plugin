const { readdirSync, readFileSync } = require('fs');
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

describe('plugin', () => {
  const fixtures = path.resolve(__dirname, 'fixtures');

  readdirSync(fixtures).forEach(directoryName => {
    it(`${directoryName} should work`, () => {
      return new Promise(resolve => {
        const context = path.resolve(__dirname, fixtures, directoryName);
        const configPath = path.resolve(context, 'webpack.config.js');
        const config = webpackMerge(
          {
            context,
            output: {
              path: path.resolve(context, 'dist'),
            },
          },
          require(configPath)
        );

        webpack(config, (err, stats) => {
          if (err) {
            console.error(err); // eslint-disable-line
            return;
          }
          if (stats.hasErrors()) {
            console.log( // eslint-disable-line
              stats.toString({
                colors: true,
              })
            );
            return;
          }
          expect(
            readFileSync(path.resolve(context, 'dist', 'obsolete.js'), 'utf-8')
          ).not.toBe('');
          resolve();
        });
      });
    });
  });
});
