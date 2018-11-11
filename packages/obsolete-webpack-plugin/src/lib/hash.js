const crypto = require('crypto');

/**
 * Convert content to hash string.
 *
 * @param {string} content
 * @param {string} algorithm
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
