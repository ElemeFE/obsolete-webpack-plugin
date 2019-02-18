const glob = require('glob');
const { getLibraryContent, replaceInterp } = require('./helpers/library');
const { buildModule } = require('./helpers/bundler');
const { cleanBuild } = require('./helpers/tasks');
const { readFileSyncWrapper, readdirSyncWrapper } = require('./helpers/fs');

describe('plugin', () => {
  beforeAll(() => cleanBuild());
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
  it(`bundle should work as expected`, async () => {
    const context = await buildModule('bundle');

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
  it(`bundle-chunk should work as expected`, async () => {
    const context = await buildModule('bundle-chunk');

    expect(readdirSyncWrapper(context, 'dist')).toEqual(
      readdirSyncWrapper(context, 'expected')
    );

    const actual = readFileSyncWrapper(context, 'dist', 'obsolete.chunk.js');
    const expected = readFileSyncWrapper(
      context,
      'expected',
      'obsolete.chunk.js'
    );

    expect(actual.indexOf(getLibraryContent())).toBe(0);
    expect(actual.replace(getLibraryContent(), '')).toBe(
      replaceInterp(expected)
    );
  });
  it(`prod should work as expected`, async () => {
    const context = await buildModule('prod');
    const actual = readFileSyncWrapper(context, 'dist', 'obsolete.js');

    expect(actual.indexOf('!function(e,r)')).toBe(0);
  });
  it(`html should work as expected`, async () => {
    const context = await buildModule('html');

    expect(readdirSyncWrapper(context, 'dist')).toEqual(
      readdirSyncWrapper(context, 'expected')
    );

    const actual = readFileSyncWrapper(context, 'dist', 'obsolete.js');
    const expected = readFileSyncWrapper(context, 'expected', 'obsolete.js');
    const actualHTML = readFileSyncWrapper(context, 'dist', 'index.html');
    const expectedHTML = readFileSyncWrapper(context, 'expected', 'index.html');

    expect(actual.indexOf(getLibraryContent())).toBe(0);
    expect(actual.replace(getLibraryContent(), '')).toBe(
      replaceInterp(expected)
    );
    expect(actualHTML).toBe(expectedHTML);
  });
  it(`html-async should work as expected`, async () => {
    const context = await buildModule('html-async');

    expect(readdirSyncWrapper(context, 'dist')).toEqual(
      readdirSyncWrapper(context, 'expected')
    );

    const actual = readFileSyncWrapper(context, 'dist', 'obsolete.js');
    const expected = readFileSyncWrapper(context, 'expected', 'obsolete.js');
    const actualHTML = readFileSyncWrapper(context, 'dist', 'index.html');
    const expectedHTML = readFileSyncWrapper(context, 'expected', 'index.html');

    expect(actual.indexOf(getLibraryContent())).toBe(0);
    expect(actual.replace(getLibraryContent(), '')).toBe(
      replaceInterp(expected)
    );
    expect(actualHTML).toBe(expectedHTML);
  });
});
