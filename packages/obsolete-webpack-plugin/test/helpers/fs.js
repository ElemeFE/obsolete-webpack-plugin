const { readdirSync, readFileSync } = require('fs');
const path = require('path');

function readFileSyncWrapper(...args) {
  return readFileSync(path.resolve(...args), 'utf-8');
}
function readdirSyncWrapper(...args) {
  return readdirSync(path.resolve(...args));
}

module.exports = { readFileSyncWrapper, readdirSyncWrapper };
