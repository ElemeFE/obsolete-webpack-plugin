import { forEach } from './mini-built-ins';

/**
 * Validate if a string is semantic version.
 *
 * @param {string} version
 */
function validateSemantic(version) {
  const rValidator = /^(\d+)(\.\d+)*$/;

  if (!rValidator.test(version)) {
    throw new Error(
      `Parameter \`version\` \`${version}\` isn't a semantic version.`
    );
  }
}
/**
 * Compare two semantic versions.
 *
 * @param {string} version
 * @param {string} comparedVersion
 * @returns {number} Return `compareVersion.GT` if greater than, return `compareVersion.EQ`
 * if equal to, return `compareVersion.LT` if less than.
 */
function compareVersion(version, comparedVersion) {
  const rVersion = /\d+/g;
  const rComparedVersion = /\d+/g;

  forEach([version, comparedVersion], version => {
    validateSemantic(version);
  });

  while (true) {
    const matches = rVersion.exec(version);
    const comparedMatches = rComparedVersion.exec(comparedVersion);

    if (matches && !comparedMatches) {
      return Number(matches[0]) === 0 ? compareVersion.EQ : compareVersion.GT;
    }
    if (!matches && comparedMatches) {
      return Number(comparedMatches[0]) === 0
        ? compareVersion.EQ
        : compareVersion.LT;
    }
    if (matches && comparedMatches) {
      if (Number(matches[0]) > Number(comparedMatches[0])) {
        return compareVersion.GT;
      }
      if (Number(matches[0]) < Number(comparedMatches[0])) {
        return compareVersion.LT;
      }
    }
    if (!matches && !comparedMatches) {
      return compareVersion.EQ;
    }
  }
}

compareVersion.GT = 1;
compareVersion.EQ = 0;
compareVersion.LT = -1;

export { compareVersion };
