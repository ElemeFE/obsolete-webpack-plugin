import Browser from './browser';

class UAParser {
  constructor() {
    this.rBrowsers = {
      // Mozilla/5.0 (Linux; Android 4.4.2; SAMSUNG-SM-N900A Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Safari/537.36
      and_chr: /Chrome\/((\d+)\.\d+.\d+.\d+)/,
      // Mozilla/5.0 (Android; Mobile; rv:40.0) Gecko/40.0 Firefox/40.0
      and_ff: /Firefox\/((\d+)\.\d+)/,
      // Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36
      chrome: /Chrome\/((\d+)\.\d+.\d+.\d+)/,
      // Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Safari/605.1.15
      safari: /Version\/((\d+\.\d+)) Safari/,
      // Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:62.0) Gecko/20100101 Firefox/62.0
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
