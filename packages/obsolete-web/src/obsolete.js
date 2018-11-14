import Detective from './detective';
import Alert from './alert';

class Obsolete {
  /**
   * @param {Object} [options] Configuration.
   * @param {string} [options.template] The prompt html template.
   * @param {string} [options.position='afterbegin'] If set 'afterbegin', the template will be injected
   * into the start of body. If set 'beforeend', the template will be injected into the end of body.
   * @param {boolean} [options.promptOnNonTargetBrowser=false] If the current browser useragent
   * doesn't match one of the target browsers, it's considered as unsupported. Thus, the prompt
   * will be shown. E.g, your browserslist configuration is `ie > 8`, by default, the prompt won't
   * be shown on Chrome or Safari browser.
   * @param {boolean} [options.promptOnUnknownBrowser=true] If the current browser useragent is
   * unknown, the prompt will be shown.
   */
  constructor(options) {
    const defaultOptions = {
      template:
        '<div>Your browser is not supported.<button id="obsoleteClose">&times;</button></div>',
      position: 'afterbegin',
      promptOnNonTargetBrowser: false,
      promptOnUnknownBrowser: true,
    };

    this.options = {
      ...defaultOptions,
      ...options,
    };
    this.detective = new Detective();
    this.alert = null;
  }
  /**
   * Test browser compatibility.
   *
   * @param {string[]} browsers Browser names in Can I Use.
   * @returns {boolean}
   */
  test(browsers) {
    if (!browsers.length) {
      throw new Error('Parameter `browsers` is empty.');
    }

    const passed = this.detective.detect(
      navigator.userAgent,
      browsers,
      this.options.promptOnNonTargetBrowser,
      this.options.promptOnUnknownBrowser
    );

    if (!passed) {
      if (this.alert) {
        this.alert.handleClose();
      } else {
        this.alert = new Alert();
      }
      this.alert.prompt(this.options.template, this.options.position);
      return false;
    }
    return true;
  }
}

export default Obsolete;
