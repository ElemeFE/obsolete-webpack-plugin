import Browser from './browser';

/**
 * User Agent Examples
 *
 * Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36
 * Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Safari/605.1.15
 * Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:62.0) Gecko/20100101 Firefox/62.0
 */
class UAParser {
  constructor() {
    this.rBrowsers = {
      chrome: /Chrome\/((\d+)\.\d+.\d+.\d+)/,
      safari: /Version\/((\d+\.\d+)) Safari/,
      firefox: /Firefox\/((\d+)\.\d+)/,
    };
  }
  /**
   * Convert userAgent to the instance of `Browser`.
   *
   * @param {string} userAgent
   * @returns {Browser}
   */
  parse(userAgent) {
    for (const [name, rBrowser] of Object.entries(this.rBrowsers)) {
      const matches = rBrowser.exec(userAgent);

      if (matches) {
        return new Browser(name, matches[1], matches[2]);
      }
    }
  }
}

export default UAParser;
