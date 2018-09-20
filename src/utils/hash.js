const crypto = require('crypto');

function createHash(content, algorithm = 'md4') {
  return crypto
    .createHash(algorithm)
    .update(content)
    .digest('hex');
}

module.exports = {
  createHash,
};
