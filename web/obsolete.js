import Detective from './detective';
import Alert from './alert';

class Obsolete {
  /**
   * @param {Object} [options] Configuration.
   * @param {string} [options.template] The prompt html template.
   * @param {boolean} [options.promptOnNonTargetBrowser] If the current browser name doesn't match one of the
   * target browsers, it's considered as unsupported. Thus, the prompt will be shown.
   */
  constructor(options) {
    const defaultOptions = {
      template:
        '<div style="position: fixed; left: 0; top: 0; background: #fff">' +
        'Your current browser is not supported, please upgrade it to the latest version.' +
        '</div>',
      promptOnNonTargetBrowser: false,
    };

    this.options = {
      ...defaultOptions,
      ...options,
    };
    this.doctor = new Detective();
    this.alert = null;
  }
  /**
   * Test browser compatibility.
   *
   * @param {string[]} browsers Must be the output of `browserslist`.
   * @returns {boolean}
   */
  test(browsers) {
    const passed = this.doctor.detect(
      navigator.userAgent,
      browsers,
      this.options.promptOnNonTargetBrowser
    );

    if (!passed) {
      if (!this.alert) {
        this.alert = new Alert();
      }
      this.alert.prompt(this.options.template);
      return false;
    }
    return true;
  }
}

export default Obsolete;
