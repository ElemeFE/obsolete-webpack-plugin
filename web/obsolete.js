import Doctor from './doctor';
import Alert from './alert';

class Obsolete {
  /**
   * @param {Object} [options] Configuration.
   * @param {string} [options.template] The prompt template. If not set, then templatePath will be read.
   * @param {boolean} [options.promptOnUnknownBrowser] If userAgent is unknown, the prompt is shown.
   */
  constructor(options) {
    const defaultOptions = {
      template:
        'Your current browser is not supported, please upgrade it to the latest version.',
      promptOnUnknownBrowser: false,
    };

    this.options = {
      ...defaultOptions,
      ...options,
    };
    this.doctor = new Doctor();
    this.alert = null;
  }
  /**
   * Test browser compatibility.
   *
   * @param {string[]} browsers Must be the output of `browserslist`.
   * @returns {boolean}
   */
  test(browsers) {
    const passed = this.doctor.detect(navigator.userAgent, browsers);

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
