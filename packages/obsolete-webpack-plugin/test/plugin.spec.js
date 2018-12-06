const glob = require('glob');
const { getLibraryContent, replaceInterp } = require('./helpers/library');
const { buildModule } = require('./helpers/bundler');
const { readFileSyncWrapper, readdirSyncWrapper } = require('./helpers/fs');

describe('plugin', () => {
  it(`default should work as expected`, async () => {
    const context = await buildModule('default');

    expect(readdirSyncWrapper(context, 'dist')).toEqual(
      readdirSyncWrapper(context, 'expected')
    );

    const actual = readFileSyncWrapper(context, 'dist', 'obsolete.js');
    const expected = readFileSyncWrapper(context, 'expected', 'obsolete.js');

    expect(actual.indexOf(getLibraryContent())).toBe(0);
    expect(actual.replace(getLibraryContent(), '')).toBe(
      replaceInterp(expected)
    );
  });
  it(`options should work as expected`, async () => {
    const context = await buildModule('options');

    expect(readdirSyncWrapper(context, 'dist')).toEqual(
      readdirSyncWrapper(context, 'expected')
    );

    const actual = readFileSyncWrapper(context, 'dist', 'outdated.js');
    const expected = readFileSyncWrapper(context, 'expected', 'outdated.js');

    expect(actual.indexOf(getLibraryContent())).toBe(0);
    expect(actual.replace(getLibraryContent(), '')).toBe(expected);
  });
  it(`hash should work as expected`, async () => {
    const context = await buildModule('hash');
    const files = glob.sync(`${context}/dist/obsolete.*.js`);
    const actual = readFileSyncWrapper(context, 'dist', files[0]);
    const expected = readFileSyncWrapper(
      context,
      'expected',
      'obsolete.[hash].js'
    );

    expect(actual.indexOf(getLibraryContent())).toBe(0);
    expect(actual.replace(getLibraryContent(), '')).toBe(
      replaceInterp(expected)
    );
  });
  it(`hash-chunk should work as expected`, async () => {
    const context = await buildModule('hash-chunk');
    const files = glob.sync(`${context}/dist/obsolete.*.js`);
    const actual = readFileSyncWrapper(context, 'dist', files[0]);
    const expected = readFileSyncWrapper(
      context,
      'expected',
      'obsolete.[chunkhash].js'
    );

    expect(actual.indexOf(getLibraryContent())).toBe(0);
    expect(actual.replace(getLibraryContent(), '')).toBe(
      replaceInterp(expected)
    );
  });
  it(`bundle-all should work as expected`, async () => {
    const context = await buildModule('bundle-all');

    expect(readdirSyncWrapper(context, 'dist')).toEqual(
      readdirSyncWrapper(context, 'expected')
    );

    const actual = readFileSyncWrapper(context, 'dist', 'obsolete.main.js');
    const expected = readFileSyncWrapper(
      context,
      'expected',
      'obsolete.main.js'
    );

    expect(actual.indexOf(getLibraryContent())).toBe(0);
    expect(actual.replace(getLibraryContent(), '')).toBe(
      replaceInterp(expected)
    );
  });
  it(`prod should work as expected`, async () => {
    const context = await buildModule('prod');
    const actual = readFileSyncWrapper(context, 'dist', 'obsolete.js');

    expect(actual.indexOf('!function(r,e)')).toBe(0);
  });
});
