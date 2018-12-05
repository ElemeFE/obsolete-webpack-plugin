/**
 * Code indentation.
 *
 * @param {string} str
 * @param {number} size
 */
function indent(str, size) {
  return ' '.repeat(size) + str.replace(/\n/g, `$&${' '.repeat(size)}`);
}
/**
 * Stringify json to custom format.
 *
 * @param {Object<string, any>} json
 * @param {number} indent
 */
function stringify(json, indent = 2) {
  return JSON.stringify(json, null, indent)
    .replace(/"/g, `'`)
    .replace(/'(\w+)':/g, '$1:')
    .replace(/\s*}/g, ',$&')
    .replace(/\s*]/g, ',$&');
}

module.exports = {
  indent,
  stringify,
};
