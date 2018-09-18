import detect from './detect';
import show from './show';

class Obsolete {
  constructor(opts) {
    this.opt = opts;
    if (opts.browsers) {
      this.detect(opts.browsers);
    }
  }
  detect(browsers) {
    const isSupported = detect(navigator.userAgent, browsers);

    if (!isSupported) {
      show()
    }
  }
}

export default Obsolete;
