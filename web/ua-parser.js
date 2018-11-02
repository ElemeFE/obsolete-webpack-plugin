import Browser from './browser';

class UAParser {
  constructor() {
    this.rBrowsers = {
      /**
       * Chrome for PC and Mobile.
       *
       * @example Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36
       */
      chrome: [/Chrome\/((\d+)[.\w]*)/i],
      /**
       * Safari for PC.
       *
       * @example Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.1 Safari/605.1.15
       */
      safari: [/Version\/((\d+\.\d+)[.\w]*) Safari/i],
      /**
       * Firefox for PC and Mobile.
       *
       * @example Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:63.0) Gecko/20100101 Firefox/63.0
       */
      firefox: [/Firefox\/((\d+)[.\w]*)/i],
      /**
       * Opera for PC.
       *
       * @example Opera/9.80 (Macintosh; Intel Mac OS X 10.6.8; U; en) Presto/2.9.168 Version/11.52
       *          Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36 OPR/56.0.3051.52
       */
      opera: {
        includes: [
          /Presto\/[.\w]+ Version\/((\d+)[.\w]*)/i,
          /OPR\/((\d+)[.\w]*)/i,
        ],
        excludes: [/Mobile|Mobi|Tablet/i],
      },
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
