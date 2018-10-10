import UAParser from './ua-parser';
import Browser from './browser';
import compareVersion from './utils/compareVersion';

class Doctor {
  /**
   * Detect if the userAgent satisfies requirement of target browsers.
   *
   * @param {string} userAgent
   * @param {string[]} targetBrowsers The output of `browserslist`.
   * @param {boolean} promptOnNonTargetBrowser
   * @returns {boolean}
   */
  detect(userAgent, targetBrowsers, promptOnNonTargetBrowser) {
    const currentBrowser = new UAParser().parse(userAgent);
    const normalizedTargetBrowsers = this.normalizeTargetBrowsers(
      targetBrowsers
    );
    const normalizedTargetBrowsersOfTheSameName = normalizedTargetBrowsers.filter(
      targetBrowser => currentBrowser.name === targetBrowser.name
    );

    if (!normalizedTargetBrowsersOfTheSameName.length) {
      return !promptOnNonTargetBrowser;
    }
    return normalizedTargetBrowsersOfTheSameName.some(
      targetBrowser =>
        compareVersion(
          currentBrowser.primaryVersion,
          targetBrowser.primaryVersion
        ) !== compareVersion.LT
    );
  }
  /**
   * Normalize target browsers to the instance of `Browser`.
   *
   * @param {string[]} targetBrowsers
   * @returns {Browser[]}
   */
  normalizeTargetBrowsers(targetBrowsers) {
    const rBrowser = /(\w+) (([\d\.]+)(?:-[\d\.]+)?|all)/;

    return targetBrowsers.map(browser => {
      const matches = rBrowser.exec(browser);

      return new Browser(matches[1], matches[2], matches[3] || '0');
    });
  }
}

export default Doctor;
