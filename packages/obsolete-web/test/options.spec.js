import { setUserAgent, unescape } from './suites/browser';
import Obsolete from '../src/obsolete';

describe('options', () => {
  const originalUserAgent = navigator.userAgent;
  let obsolete;

  beforeEach(() => {
    document.body.innerHTML = '<div>placeholder</div>';
    setUserAgent(originalUserAgent);
  });
  describe('template', () => {
    it('should insert custom template', () => {
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
    it('should insert custom multiple template', () => {
      setUserAgent(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3538.77 Safari/537.36'
      );
      obsolete = new Obsolete({
        template:
          '<style>body { color: red; }</style>' +
          '<div id="my">Sorry.</div>' +
          '<script>document.querySelector("#my").innerHTML = "So sorry."</script>',
      });
      expect(obsolete.test(['chrome 60'])).toBe(true);
      expect(document.body.innerHTML).toBe('<div>placeholder</div>');
      expect(obsolete.test(['chrome 61'])).toBe(false);
      expect(document.body.innerHTML).toBe(
        '<style>body { color: red; }</style>' +
          '<div id="my">So sorry.</div>' +
          '<script>document.querySelector("#my").innerHTML = "So sorry."</script>' +
          '<div>placeholder</div>'
      );
    });
    it('should react click event with id `obsoleteClose`', () => {
      setUserAgent(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3538.77 Safari/537.36'
      );
      obsolete = new Obsolete({
        template:
          '<div>Template<button id="obsoleteClose">Close</button></div>',
      });
      expect(obsolete.test(['chrome 60'])).toBe(true);
      expect(document.body.innerHTML).toBe('<div>placeholder</div>');
      expect(obsolete.test(['chrome 61'])).toBe(false);
      expect(document.body.innerHTML).toBe(
        '<div>Template<button id="obsoleteClose">Close</button></div>' +
          '<div>placeholder</div>'
      );
      document.querySelector('#obsoleteClose').click();
      expect(document.body.innerHTML).toBe('<div>placeholder</div>');
    });
  });
  describe('position', () => {
    it('should insert at the start of body', () => {
      setUserAgent(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3538.77 Safari/537.36'
      );
      obsolete = new Obsolete({
        position: 'afterbegin',
      });
      expect(obsolete.test(['chrome 60'])).toBe(true);
      expect(document.body.innerHTML).toBe('<div>placeholder</div>');
      expect(obsolete.test(['chrome 61'])).toBe(false);
      expect(document.body.innerHTML).toBe(
        unescape(Obsolete.defaultOptions.template) + '<div>placeholder</div>'
      );
    });
    it('should insert at the end of body', () => {
      setUserAgent(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3538.77 Safari/537.36'
      );
      obsolete = new Obsolete({
        position: 'beforeend',
      });
      expect(obsolete.test(['chrome 60'])).toBe(true);
      expect(document.body.innerHTML).toBe('<div>placeholder</div>');
      expect(obsolete.test(['chrome 61'])).toBe(false);
      expect(document.body.innerHTML).toBe(
        '<div>placeholder</div>' + unescape(Obsolete.defaultOptions.template)
      );
    });
    it('should not insert into body when position is unknown', () => {
      setUserAgent(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3538.77 Safari/537.36'
      );
      obsolete = new Obsolete({
        position: 'unknown',
      });
      expect(obsolete.test(['chrome 60'])).toBe(true);
      expect(document.body.innerHTML).toBe('<div>placeholder</div>');
      expect(obsolete.test(['chrome 61'])).toBe(false);
      expect(document.body.innerHTML).toBe('<div>placeholder</div>');
    });
  });
  describe('promptOnNonTargetBrowser', () => {
    it('should not prompt on non target browser', () => {
      setUserAgent(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3538.77 Safari/537.36'
      );
      obsolete = new Obsolete({
        promptOnNonTargetBrowser: false,
      });
      expect(obsolete.test(['ie 11'])).toBe(true);
      expect(document.body.innerHTML).toBe('<div>placeholder</div>');
    });
    it('should prompt on non target browser', () => {
      setUserAgent(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3538.77 Safari/537.36'
      );
      obsolete = new Obsolete({
        promptOnNonTargetBrowser: true,
      });
      expect(obsolete.test(['ie 11'])).toBe(false);
      expect(document.body.innerHTML).toBe(
        unescape(Obsolete.defaultOptions.template) + '<div>placeholder</div>'
      );
    });
  });
  describe('promptOnUnknownBrowser', () => {
    it('should not prompt on unkonwn browser', () => {
      setUserAgent(
        'Mozilla/5.0 (Windows NT 6.1; WOW64) SkypeUriPreview Preview/0.5'
      );
      obsolete = new Obsolete({
        promptOnUnknownBrowser: false,
      });
      setUserAgent(
        'Mozilla/5.0 (darwin) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/11.12.0'
      );
      expect(obsolete.test(['chrome 60'])).toBe(true);
      expect(document.body.innerHTML).toBe('<div>placeholder</div>');
    });
    it('should prompt on unkonwn browser', () => {
      setUserAgent(
        'Mozilla/5.0 (Windows NT 6.1; WOW64) SkypeUriPreview Preview/0.5'
      );
      obsolete = new Obsolete({
        promptOnUnknownBrowser: true,
      });
      expect(obsolete.test(['chrome 60'])).toBe(false);
      expect(document.body.innerHTML).toBe(
        unescape(Obsolete.defaultOptions.template) + '<div>placeholder</div>'
      );
    });
  });
});
