import { setUserAgent, unescape } from './suites/browser';
import Obsolete from '../src/obsolete';

describe('options', () => {
  const originalUserAgent = navigator.userAgent;
  let obsolete;

  beforeEach(() => {
    document.body.innerHTML = '<div>placeholder</div>';
    setUserAgent(originalUserAgent);
  });
  describe('default', () => {
    test('should insert template afterbegin of body', () => {
      setUserAgent(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3538.77 Safari/537.36'
      );
      obsolete = new Obsolete();
      expect(obsolete.test(['chrome 60'])).toBe(true);
      expect(document.body.innerHTML).toBe('<div>placeholder</div>');
      expect(obsolete.test(['chrome 61'])).toBe(false);
      expect(document.body.innerHTML).toBe(
        unescape(Obsolete.defaultOptions.template) + '<div>placeholder</div>'
      );
    });
  });
  describe('template', () => {
    test('should insert custom template', () => {
      setUserAgent(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3538.77 Safari/537.36'
      );
      obsolete = new Obsolete({
        template: '<div>Sorry.</div>',
      });
      expect(obsolete.test(['chrome 60'])).toBe(true);
      expect(document.body.innerHTML).toBe('<div>placeholder</div>');
      expect(obsolete.test(['chrome 61'])).toBe(false);
      expect(document.body.innerHTML).toBe(
        '<div>Sorry.</div>' + '<div>placeholder</div>'
      );
    });
    test('should insert custom multiple template', () => {
      setUserAgent(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3538.77 Safari/537.36'
      );
      obsolete = new Obsolete({
        template:
          '<div id="my">Sorry.</div>' +
          '<script>document.querySelector("#my").innerHTML = "So sorry."</script>',
      });
      expect(obsolete.test(['chrome 60'])).toBe(true);
      expect(document.body.innerHTML).toBe('<div>placeholder</div>');
      expect(obsolete.test(['chrome 61'])).toBe(false);
      expect(document.body.innerHTML).toBe(
        '<div id="my">Sorry.</div>' +
          '<script>document.querySelector("#my").innerHTML = "So sorry."</script>' +
          '<div>placeholder</div>'
      );
    });
  });
});
