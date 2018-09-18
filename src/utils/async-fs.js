const { readFile } = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(readFile);

module.exports = {
  readFileAsync
};