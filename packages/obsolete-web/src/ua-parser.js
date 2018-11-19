import Browser from './browser';

class UAParser {
  constructor() {
    this.rBrowserMap = {
      /**
       * IE for desktop.
       */
      ie: {
        includes: [
          /Trident\/[.\w]+.+?rv:((\d+)[.\w]*)/i,
          /MSIE ((\d+\.\d+)[.\w]*)/i,
        ],
        excludes: [/Mobile/i],
      },
      /**
       * Edge for desktop.
       */
      edge: {
        includes: [/Edge\/((\d+)[.\w]*)/i],
        excludes: [/Mobile/i],
      },
      /**
       * Chrome for desktop.
       */
      chrome: {
        includes: [/Chrome\/((\d+)[.\w]*)/i],
        excludes: [/Mobile/i],
      },
      /**
       * Safari for desktop.
       */
      safari: {
        includes: [/Version\/((\d+\.\d+)[.\w]*).+Safari/i],
        excludes: [/Mobile/i],
      },
      /**
       * Firefox for desktop.
       */
      firefox: {
        includes: [/Firefox\/((\d+\.\d+)[.\w]*)/i],
        excludes: [/Mobile/i],
      },
      /**
       * Opera for desktop.
       *
       */
      opera: {
        includes: [
          /OPR\/((\d+)[.\w]*)/i,
          /Presto\/[.\w]+.+Version\/((\d+\.\d)[.\w]*)/i,
          /Opera\/((\d+\.\d)[.\w]*)/i,
        ],
        excludes: [/Mobile|Mobi|Tablet/i],
      },
      /**
       * Android webview.
       */
      android: [/wv.+?Chrome\/((\d+)[.\w]*)/i],
      /**
       * iOS.
       */
      ios_saf: [/(iPad|iPhone).+OS ((\d+_\d+)\w*)/i],
      /**
       * Chrome for mobile.
       */
      and_chr: {
        includes: [/Chrome\/((\d+)[.\w]*).+Mobile/i],
        excludes: [/wv/i],
      },
      /**
       * Firefox for mobile.
       */
      and_ff: [/Mobile.+Firefox\/((\d+)[.\w]*)/i],
    };
  }
  /**
   * Convert userAgent to a group of matched `Browser` instances.
   *
   * @param {string} userAgent
   * @returns {Browser[]}
   */
  parse(userAgent) {
    const browsers = [];

    Object.entries(this.rBrowserMap).forEach(([name, rBrowsers]) => {
      let matches;

      if (
        rBrowsers.excludes &&
        rBrowsers.excludes.some(rBrowser => rBrowser.exec(userAgent))
      ) {
        return;
      }
      if (!Array.isArray(rBrowsers)) {
        rBrowsers = rBrowsers.includes;
      }
      for (const rBrowser of rBrowsers) {
        matches = rBrowser.exec(userAgent);
        if (matches) {
          browsers.push(
            new Browser(
              name,
              matches[1].replace(/_/g, '.'),
              matches[2].replace(/_/g, '.')
            )
          );
          break;
        }
      }
    });
    return browsers;
  }
}

export default UAParser;