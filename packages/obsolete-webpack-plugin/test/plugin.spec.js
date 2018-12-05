const { readdirSync, readFileSync } = require('fs');
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const Plugin = require('../src');
const { stringify } = require('../src/lib/formatter');
const browserslist = require('browserslist');

const libraryContent = readFileSync(Plugin.libraryPath, 'utf-8');
const defaultBrowsers = browserslist();

describe('plugin', () => {
  const fixtures = path.resolve(__dirname, 'fixtures');

  readdirSync(fixtures).forEach(directoryName => {
    it(`${directoryName} should work as expected`, () => {
      return new Promise((resolve, reject) => {
        const context = path.resolve(__dirname, fixtures, directoryName);
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
          expect(readdirSync(path.resolve(context, 'dist'))).toEqual(
            readdirSync(path.resolve(context, 'expected'))
          );

          const expected = readFileSync(
            path.resolve(context, 'expected', 'obsolete.js'),
            'utf-8'
          );
          const actual = readFileSync(
            path.resolve(context, 'dist', 'obsolete.js'),
            'utf-8'
          );

          expect(actual.indexOf(libraryContent)).toBe(0);
          expect(actual.replace(libraryContent, '')).toBe(
            expected.replace(
              /__defaultBrowsers/g,
              stringify(defaultBrowsers, 4).replace(']', `${' '.repeat(2)}$&`)
            )
          );
          resolve();
        });
      });
    });
  });
});
