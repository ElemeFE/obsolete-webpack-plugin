const crypto = require('crypto');

/**
 * Convert content to hash string.
 *
 * @param {String} content
 * @param {String} algorithm
 */
function createHash(content, algorithm = 'md4') {
  return crypto
    .createHash(algorithm)
    .update(content)
    .digest('hex');
}

module.exports = {
  createHash,
};
