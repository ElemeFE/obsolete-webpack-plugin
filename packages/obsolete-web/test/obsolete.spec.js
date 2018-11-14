import { setUserAgent } from './shared/helper';
import Obsolete from '../src/obsolete';

describe('obsolete-web', () => {
  let obsolete;

  beforeEach(() => {
    obsolete = new Obsolete();
    document.body.innerHTML = '';
  });
  describe('test', () => {
    it('should pass empty', () => {
      setUserAgent('Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1');
      expect(() => {
        obsolete.test([]);
      }).toThrow();
    });
    it('should pass old IE', () => {
      setUserAgent('Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1');
      expect(obsolete.test(['ie 5.5'])).toBe(true);
      expect(obsolete.test(['ie 6'])).toBe(true);
      expect(obsolete.test(['ie 7'])).toBe(false);
    });
    it('should pass IE', () => {
      setUserAgent(
        'Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:10.0) like Gecko'
      );
      expect(obsolete.test(['ie 9'])).toBe(true);
      expect(obsolete.test(['ie 10'])).toBe(true);
      expect(obsolete.test(['ie 11'])).toBe(false);
    });
  });
});
