/**
 * Validate if a string is semantic version.
 *
 * @param {String} version
 */
function validateSemantic(version) {
  const rValidator = /^(\d+)(\.\d+)*$/;

  if (!rValidator.test(version)) {
    throw new Error(`The argument \`${version}\` isn't a semantic version.`);
  }
}
/**
 * Compare two semantic versions.
 *
 * @param {String} version
 * @param {String} version2
 * @returns {Number} Return `compareVersion.GT` if greater than, return `compareVersion.EQ`
 * if equal to, return `compareVersion.LT` if less than.
 */
function compareVersion(version, version2) {
  const rVersion = /\d+/g;
  const rVersion2 = /\d+/g;

  [version, version2].forEach(version => {
    validateSemantic(version);
  });
  while (true) {
    const matches = rVersion.exec(version);
    const matches2 = rVersion2.exec(version2);

    if (matches && !matches2) {
      return Number(matches[0]) === 0 ? compareVersion.EQ : compareVersion.GT;
    }
    if (!matches && matches2) {
      return Number(matches2[0]) === 0 ? compareVersion.EQ : compareVersion.LT;
    }
    if (matches && matches2) {
      if (Number(matches[0]) > Number(matches2[0])) {
        return compareVersion.GT;
      }
      if (Number(matches[0]) < Number(matches2[0])) {
        return compareVersion.LT;
      }
    }
    if (!matches && !matches2) {
      return compareVersion.EQ;
    }
  }
}

compareVersion.GT = 1;
compareVersion.EQ = 0;
compareVersion.LT = -1;

export default compareVersion;
