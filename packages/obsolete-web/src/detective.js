import UAParser from './ua-parser';
import Browser from './browser';
import { compareVersion } from './lib/comparator';
import { filter, map, some, includes, values } from './lib/mini-built-ins';

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
  detect(
    userAgent,
    targetBrowsers,
    promptOnNonTargetBrowser,
    promptOnUnknownBrowser
  ) {
    const currentBrowsers = new UAParser().parse(userAgent);

    if (!currentBrowsers.length) {
      return !promptOnUnknownBrowser;
    }

    const normalizedTargetBrowsers = this.normalizeTargetBrowsers(
      targetBrowsers
    );
    const normalizedTargetBrowsersOfTheSameName = filter(
      normalizedTargetBrowsers,
      targetBrowser =>
        includes(
          map(currentBrowsers, currentBrowser => currentBrowser.name),
          targetBrowser.name
        )
    );

    if (!normalizedTargetBrowsersOfTheSameName.length) {
      return !promptOnNonTargetBrowser;
    }
    return some(normalizedTargetBrowsersOfTheSameName, targetBrowser =>
      some(
        currentBrowsers,
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
    const rBrowser = /(\w+) (([\d.]+)(?:-[\d.]+)?)/;
    const rawTargetBrowsers = map(targetBrowsers, browser => {
      const matches = rBrowser.exec(this.mapAlias(browser));

      return new Browser(matches[1], matches[2], matches[3]);
    });

    return this.getLowestVersionBrowsers(rawTargetBrowsers);
  }
  /**
   * Normalize target browsers to a group of `Browser` instances.
   *
   * @param {string} targetBrowser
   * @returns {string}
   */
  mapAlias(targetBrowser) {
    return (
      {
        'op_mini all': 'op_mini 0',
        'safari TP': 'safari 99',
      }[targetBrowser] || targetBrowser
    );
  }
  /**
   * Get the lowest versrin browsers from the list.
   *
   * @param {Browser[]} browsers
   * @returns {Browser[]}
   */
  getLowestVersionBrowsers(browsers) {
    const lowestVersionMap = {};

    browsers.forEach(browser => {
      if (!lowestVersionMap[browser.name]) {
        lowestVersionMap[browser.name] = browser;
        return;
      }
      if (
        compareVersion(
          browser.primaryVersion,
          lowestVersionMap[browser.name].primaryVersion
        ) === compareVersion.GT
      ) {
        lowestVersionMap[browser.name] = browser;
      }
    });
    return values(lowestVersionMap);
  }
}

export default Detective;
