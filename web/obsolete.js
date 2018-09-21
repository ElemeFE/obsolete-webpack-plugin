import Doctor from './doctor';
import Alert from './alert';

class Obsolete {
  constructor(opts) {
    this.opt = opts;
    this.doctor = new Doctor();
    this.alert = null;
  }
  test(browsers) {
    const passed = this.doctor.detect(navigator.userAgent, browsers);

    if (!passed) {
      this.alert = new Alert();
      this.alert.prompt();
    }
  }
}

export default Obsolete;
