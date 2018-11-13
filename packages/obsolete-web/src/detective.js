import UAParser from './ua-parser';
import Browser from './browser';
import { compareVersion } from './utils/comparator';

class Detective {
  /**
   * Detect if the userAgent satisfies requirement of target browsers.
   *
   * @param {string} userAgent
   * @param {string[]} targetBrowsers
   * @param {boolean} promptOnNonTargetBrowser
   * @param {boolean} promptOnUnknownBrowser
   * @returns {boolean}
   */
  detect(userAgent, targetBrowsers, promptOnNonTargetBrowser) {
    const currentBrowsers = new UAParser().parse(userAgent);

    if (!currentBrowsers.length) {
      return !promptOnUnknownBrowser;
    }

    const normalizedTargetBrowsers = this.normalizeTargetBrowsers(
      targetBrowsers
    );
    const normalizedTargetBrowsersOfTheSameName = normalizedTargetBrowsers.filter(
      targetBrowser =>
        currentBrowsers
          .map(currentBrowser => currentBrowser.name)
          .includes(targetBrowser.name)
    );

    if (!normalizedTargetBrowsersOfTheSameName.length) {
      return !promptOnNonTargetBrowser;
    }
    return normalizedTargetBrowsersOfTheSameName.some(targetBrowser =>
      currentBrowsers.some(
        currentBrowser =>
          currentBrowser.name === targetBrowser.name &&
          compareVersion(
            currentBrowser.primaryVersion,
            targetBrowser.primaryVersion
          ) !== compareVersion.LT
      )
    );
  }
  /**
   * Normalize target browsers to a group of `Browser` instances.
   *
   * @param {string[]} targetBrowsers
   * @returns {Browser[]}
   */
  normalizeTargetBrowsers(targetBrowsers) {
    const rBrowser = /(\w+) (([\d\.]+)(?:-[\d\.]+)?|all)/;
    const rawTargetBrowsers = targetBrowsers.map(browser => {
      const matches = rBrowser.exec(browser);

      return new Browser(matches[1], matches[2], matches[3] || '0');
    });

    return this.getLowestVersionBrowsers(rawTargetBrowsers);
  }
  /**
   * Get the lowest versrin browsers from the list.
   *
   * @param {Browser[]} browsers
   * @returns {Browser[]}
   */
  getLowestVersionBrowsers(browsers) {
    const lowestVersionMap = {};

    for (const browser of browsers) {
      if (!lowestVersionMap[browser.name]) {
        lowestVersionMap[browser.name] = browser;
        continue;
      }
      if (
        compareVersion(
          browser.primaryVersion,
          lowestVersionMap[browser.name].primaryVersion
        ) === compareVersion.GT
      ) {
        lowestVersionMap[browser.name] = browser;
      }
    }
    return Object.values(lowestVersionMap);
  }
}

export default Detective;
