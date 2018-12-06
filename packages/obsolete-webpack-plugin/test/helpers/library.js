const { readFileSync } = require('fs');
const browserslist = require('browserslist');
const Plugin = require('../../src');
const { stringify } = require('../../src/lib/formatter');

function getLibraryContent() {
  return readFileSync(Plugin.libraryPath, 'utf-8');
}
function getDefaultBrowsers() {
  return browserslist();
}
function replaceInterp(str) {
  return str.replace(
    /__defaultBrowsers/g,
    stringify(getDefaultBrowsers(), 4).replace(']', `${' '.repeat(2)}$&`)
  );
}

module.exports = { getLibraryContent, getDefaultBrowsers, replaceInterp };
