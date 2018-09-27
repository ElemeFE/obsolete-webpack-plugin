import Doctor from './doctor';
import Alert from './alert';

class Obsolete {
  /**
   * @param {Object} options Configuration.
   */
  constructor(options) {
    this.options = options;
    this.doctor = new Doctor();
    this.alert = null;
  }
  /**
   * Test browser compatibility.
   *
   * @param {Array<String>} browsers Must be the output of `browserslist`.
   */
  test(browsers) {
    const passed = this.doctor.detect(navigator.userAgent, browsers);

    if (!passed) {
      this.alert = new Alert();
      this.alert.prompt();
      return false;
    }
    return true;
  }
}

export default Obsolete;
