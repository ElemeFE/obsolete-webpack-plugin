const crypto = require('crypto');

function createHash(content, algorithm = 'md4') {
  return crypto
    .createHash(algorithm)
    .update(content)
    .digest('base64');
};

module.exports = {
  createHash
};
