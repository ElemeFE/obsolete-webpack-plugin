import Browser from './browser';

class UAParser {
  constructor() {
    this.rBrowsers = {
      /**
       * IE for desktop.
       *
       * @example Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko
       *          Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)
       */
      ie: {
        includes: [
          /Trident\/[.\w]+.+?rv:((\d+)[.\w]*)/i,
          /MSIE ((\d+)[.\w]*)/i,
        ],
        excludes: [/Mobile/i],
      },
      /**
       * Edge for desktop.
       *
       * @example Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.9200
       */
      edge: {
        includes: [/Edge\/((\d+)[.\w]*)/i],
        excludes: [/Mobile/i],
      },
      /**
       * Opera for desktop.
       *
       * @example Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36 OPR/56.0.3051.52
       *          Opera/9.80 (Macintosh; Intel Mac OS X 10.6.8; U; en) Presto/2.9.168 Version/11.52
       */
      opera: {
        includes: [
          /OPR\/((\d+)[.\w]*)/i,
          /Presto\/[.\w]+ Version\/((\d+)[.\w]*)/i,
        ],
        excludes: [/Mobile|Mobi|Tablet/i],
      },
      /**
       * Chrome for desktop and mobile.
       *
       * @example Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36
       */
      chrome: {
        includes: [/Chrome\/((\d+)[.\w]*)/i],
        excludes: [/wv/i],
      },
      /**
       * Safari for desktop.
       *
       * @example Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.1 Safari/605.1.15
       */
      safari: {
        includes: [/Version\/((\d+\.\d+)[.\w]*) Safari/i],
        excludes: [/Mobile/i],
      },
      /**
       * Firefox for desktop and mobile.
       *
       * @example Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:63.0) Gecko/20100101 Firefox/63.0
       */
      firefox: [/Firefox\/((\d+)[.\w]*)/i],
      /**
       * iOS.
       *
       * @example Mozilla/5.0 (iPad; CPU OS 9_3_5 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13G36 Safari/601.1
       *          Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1
       */
      ios_saf: [/(iPad|iPhone).+OS ((\d+_\d+)\w*)/i],
      /**
       * Android webview.
       *
       * @example Mozilla/5.0 (Linux; Android 5.1.1; Nexus 5 Build/LMY48B; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/43.0.2357.65 Mobile Safari/537.36
       */
      android: [/wv.+?Chrome\/((\d+)[.\w]*)/i],
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
