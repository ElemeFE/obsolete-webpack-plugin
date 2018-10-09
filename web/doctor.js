import UAParser from './ua-parser';
import Browser from './browser';
import compareVersion from './utils/compareVersion';

class Doctor {
  /**
   * Detect if the userAgent satisfies requirement of target browsers.
   *
   * @param {string} userAgent
   * @param {string[]} targetBrowsers The output of `browserslist`.
   * @returns {boolean}
   */
  detect(userAgent, targetBrowsers) {
    const currentBrowser = new UAParser().parse(userAgent);
    const normalizedTargetBrowsers = this.normalizeTargetBrowsers(
      targetBrowsers
    );
    const passed = normalizedTargetBrowsers.some(
      targetBrowser =>
        currentBrowser.name === targetBrowser.name &&
        compareVersion(currentBrowser.major, targetBrowser.major) !==
          compareVersion.LT
    );

    return passed;
  }
  /**
   * Normalize target browsers to the instance of `Browser`.
   *
   * @param {string[]} targetBrowsers The output of `browserslist`.
   * @returns {Browser[]}
   */
  normalizeTargetBrowsers(targetBrowsers) {
    const rBrowser = /(\w+) (([\d\.])+(?:-[\d\.]+)?|all)/;
    const normalizedTargetBrowsers = targetBrowsers.map(browser => {
      const matches = rBrowser.exec(browser);

      return new Browser(matches[1], matches[2], matches[3] || '0');
    });

    return normalizedTargetBrowsers;
  }
}

export default Doctor;
