const del = require('del');
const path = require('path');

async function cleanBuild() {
  await del([path.resolve(__dirname, '../fixtures/*/dist')]);
}

module.exports = { cleanBuild };
