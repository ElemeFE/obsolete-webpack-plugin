import { setUserAgent, getBasicBrowsers } from './suites/browser';
import Obsolete from '../src/obsolete';

describe('user-agent', () => {
  const originalUserAgent = navigator.userAgent;
  let obsolete;

  beforeEach(() => {
    document.body.innerHTML = '';
    setUserAgent(originalUserAgent);
    obsolete = new Obsolete();
  });
  describe('test self user agent', () => {
    test('should pass old IE', () => {
      setUserAgent('Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1');
      expect(obsolete.test(['ie 5.5'])).toBe(true);
      expect(obsolete.test(['ie 6'])).toBe(true);
      expect(obsolete.test(['ie 7'])).toBe(false);
      getBasicBrowsers(['ie']).forEach(item => {
        expect(obsolete.test([item])).toBe(true);
      });
    });
    test('should pass IE', () => {
      setUserAgent(
        'Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:10.0) like Gecko'
      );
      expect(obsolete.test(['ie 9'])).toBe(true);
      expect(obsolete.test(['ie 10'])).toBe(true);
      expect(obsolete.test(['ie 11'])).toBe(false);
      getBasicBrowsers(['ie']).forEach(item => {
        expect(obsolete.test([item])).toBe(true);
      });
    });
    test('should pass Edge', () => {
      setUserAgent(
        'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.9200'
      );
      expect(obsolete.test(['edge 15'])).toBe(true);
      expect(obsolete.test(['edge 16'])).toBe(true);
      expect(obsolete.test(['edge 17'])).toBe(false);
      getBasicBrowsers(['edge']).forEach(item => {
        expect(obsolete.test([item])).toBe(true);
      });
    });
    test('should pass Chrome', () => {
      setUserAgent(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3538.77 Safari/537.36'
      );
      expect(obsolete.test(['chrome 59'])).toBe(true);
      expect(obsolete.test(['chrome 60'])).toBe(true);
      expect(obsolete.test(['chrome 61'])).toBe(false);
      getBasicBrowsers(['chrome']).forEach(item => {
        expect(obsolete.test([item])).toBe(true);
      });
    });
    test('should pass Safari', () => {
      setUserAgent(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.1.0 Safari/605.1.15'
      );
      expect(obsolete.test(['safari 11'])).toBe(true);
      expect(obsolete.test(['safari 11.1'])).toBe(true);
      expect(obsolete.test(['safari 12'])).toBe(false);
      expect(obsolete.test(['safari TP'])).toBe(false);
      getBasicBrowsers(['safari']).forEach(item => {
        expect(obsolete.test([item])).toBe(true);
      });
    });
    test('should pass Firefox', () => {
      setUserAgent(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:63.0) Gecko/20100101 Firefox/60.0'
      );
      expect(obsolete.test(['firefox 59'])).toBe(true);
      expect(obsolete.test(['firefox 60'])).toBe(true);
      expect(obsolete.test(['firefox 61'])).toBe(false);
      getBasicBrowsers(['firefox']).forEach(item => {
        expect(obsolete.test([item])).toBe(true);
      });
    });
    test('should pass old Opera', () => {
      setUserAgent('Opera/9.63 (Windows NT 6.0; U; en) Presto/2.1.1');
      expect(obsolete.test(['opera 9'])).toBe(true);
      expect(obsolete.test(['opera 9.5-9.6'])).toBe(true);
      expect(obsolete.test(['opera 10.0-10.1'])).toBe(false);
      getBasicBrowsers(['epera']).forEach(item => {
        expect(obsolete.test([item])).toBe(true);
      });
      setUserAgent(
        'Opera/9.80 (Macintosh; Intel Mac OS X 10.6.8; U; en) Presto/2.9.168 Version/11.52'
      );
      expect(obsolete.test(['opera 11.1'])).toBe(true);
      expect(obsolete.test(['opera 11.5'])).toBe(true);
      expect(obsolete.test(['opera 11.6'])).toBe(false);
      getBasicBrowsers(['opera']).forEach(item => {
        expect(obsolete.test([item])).toBe(true);
      });
    });
    test('should pass Opera', () => {
      setUserAgent(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36 OPR/56.0.3051.52'
      );
      expect(obsolete.test(['opera 55'])).toBe(true);
      expect(obsolete.test(['opera 56'])).toBe(true);
      expect(obsolete.test(['opera 57'])).toBe(false);
      getBasicBrowsers(['opera']).forEach(item => {
        expect(obsolete.test([item])).toBe(true);
      });
    });
    test('should pass Android', () => {
      setUserAgent(
        'Mozilla/5.0 (Linux; Android 5.1.1; Nexus 5 Build/LMY48B; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/43.0.2357.65 Mobile Safari/537.36'
      );
      expect(obsolete.test(['android 42'])).toBe(true);
      expect(obsolete.test(['android 43'])).toBe(true);
      expect(obsolete.test(['android 44'])).toBe(false);
      getBasicBrowsers(['android']).forEach(item => {
        expect(obsolete.test([item])).toBe(true);
      });
    });
    test('should pass iOS', () => {
      setUserAgent(
        'Mozilla/5.0 (iPad; CPU OS 11_0_3 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A432 Safari/604.1'
      );
      expect(obsolete.test(['ios_saf 10.3'])).toBe(true);
      expect(obsolete.test(['ios_saf 11.0-11.2'])).toBe(true);
      expect(obsolete.test(['ios_saf 11.3-11.4'])).toBe(false);
      getBasicBrowsers(['ios_saf']).forEach(item => {
        expect(obsolete.test([item])).toBe(true);
      });
      setUserAgent(
        'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4'
      );
      expect(obsolete.test(['ios_saf 7.0-7.1'])).toBe(true);
      expect(obsolete.test(['ios_saf 8'])).toBe(true);
      expect(obsolete.test(['ios_saf 8.1-8.4'])).toBe(false);
      getBasicBrowsers(['ios_saf']).forEach(item => {
        expect(obsolete.test([item])).toBe(true);
      });
    });
    test('should pass ChromeAndroid', () => {
      setUserAgent(
        'Mozilla/5.0 (Linux; Android 6.0.1; SM-G532G Build/MMB29T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.83 Mobile Safari/537.36'
      );
      expect(obsolete.test(['and_chr 62'])).toBe(true);
      expect(obsolete.test(['and_chr 63'])).toBe(true);
      expect(obsolete.test(['and_chr 64'])).toBe(false);
      getBasicBrowsers(['and_chr']).forEach(item => {
        expect(obsolete.test([item])).toBe(true);
      });
    });
    test('should pass FirefoxAndroid', () => {
      setUserAgent(
        'Mozilla/5.0 (Android; Mobile; rv:38.0) Gecko/38.0 Firefox/38.0'
      );
      expect(obsolete.test(['and_ff 37'])).toBe(true);
      expect(obsolete.test(['and_ff 38'])).toBe(true);
      expect(obsolete.test(['and_ff 39'])).toBe(false);
      getBasicBrowsers(['and_ff']).forEach(item => {
        expect(obsolete.test([item])).toBe(true);
      });
    });
  });
  describe('test engine based user agent', () => {
    test('should pass QQ', () => {
      setUserAgent(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36 QQBrowser/4.4.116.400'
      );
      expect(obsolete.test(['chrome 64'])).toBe(true);
      expect(obsolete.test(['chrome 65'])).toBe(true);
      expect(obsolete.test(['chrome 66'])).toBe(false);
      getBasicBrowsers(['chrome']).forEach(item => {
        expect(obsolete.test([item])).toBe(true);
      });
    });
    test('should pass 360', () => {
      setUserAgent(
        'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36'
      );
      expect(obsolete.test(['chrome 62'])).toBe(true);
      expect(obsolete.test(['chrome 63'])).toBe(true);
      expect(obsolete.test(['chrome 64'])).toBe(false);
      getBasicBrowsers(['chrome']).forEach(item => {
        expect(obsolete.test([item])).toBe(true);
      });
    });
    test('should pass Maxthon', () => {
      setUserAgent(
        'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Maxthon/4.4 Chrome/45.0.2454.85 Safari/537.36'
      );
      expect(obsolete.test(['chrome 44'])).toBe(true);
      expect(obsolete.test(['chrome 45'])).toBe(true);
      expect(obsolete.test(['chrome 46'])).toBe(false);
      getBasicBrowsers(['chrome']).forEach(item => {
        expect(obsolete.test([item])).toBe(true);
      });
    });
    test('should pass Yandex', () => {
      setUserAgent(
        'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.124 YaBrowser/15.7.2357.2877 Safari/537.36'
      );
      expect(obsolete.test(['chrome 42'])).toBe(true);
      expect(obsolete.test(['chrome 43'])).toBe(true);
      expect(obsolete.test(['chrome 44'])).toBe(false);
      getBasicBrowsers(['chrome']).forEach(item => {
        expect(obsolete.test([item])).toBe(true);
      });
    });
    test('should pass SeaMonkey', () => {
      setUserAgent(
        'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:38.0) Gecko/20100101 Firefox/38.0 SeaMonkey/2.35'
      );
      expect(obsolete.test(['firefox 37'])).toBe(true);
      expect(obsolete.test(['firefox 38'])).toBe(true);
      expect(obsolete.test(['firefox 39'])).toBe(false);
      getBasicBrowsers(['firefox']).forEach(item => {
        expect(obsolete.test([item])).toBe(true);
      });
    });
    test('should pass Facebook', () => {
      setUserAgent(
        'Mozilla/5.0 (Linux; Android 8.1.0; OE106 Build/OPM1.171019.026; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/62.0.3202.84 Mobile Safari/537.36'
      );
      expect(obsolete.test(['android 61'])).toBe(true);
      expect(obsolete.test(['android 62'])).toBe(true);
      expect(obsolete.test(['android 63'])).toBe(false);
      getBasicBrowsers(['android']).forEach(item => {
        expect(obsolete.test([item])).toBe(true);
      });
    });
    test('should pass WeChat', () => {
      setUserAgent(
        'Mozilla/5.0 (Linux; Android 8.1; OE106 Build/OPM1.171019.026; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/044306 Mobile Safari/537.36'
      );
      expect(obsolete.test(['android 56'])).toBe(true);
      expect(obsolete.test(['android 57'])).toBe(true);
      expect(obsolete.test(['android 58'])).toBe(false);
      getBasicBrowsers(['android']).forEach(item => {
        expect(obsolete.test([item])).toBe(true);
      });
    });
    test('should pass UCAndroid', () => {
      setUserAgent(
        'Mozilla/5.0 (Linux; U; Android 8.1.0; zh-CN; OE106 Build/OPM1.171019.026) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.108 UCBrowser/12.1.8.998 Mobile Safari/537.36'
      );
      expect(obsolete.test(['and_chr 56'])).toBe(true);
      expect(obsolete.test(['and_chr 57'])).toBe(true);
      expect(obsolete.test(['and_chr 58'])).toBe(false);
      getBasicBrowsers(['and_chr']).forEach(item => {
        expect(obsolete.test([item])).toBe(true);
      });
    });
    test('should pass QQAndroid', () => {
      setUserAgent(
        'Mozilla/5.0 (Linux; U; Android 8.1.0; en-us; OE106 Build/OPM1.171019.026) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/8.9 Mobile Safari/537.36'
      );
      expect(obsolete.test(['and_chr 56'])).toBe(true);
      expect(obsolete.test(['and_chr 57'])).toBe(true);
      expect(obsolete.test(['and_chr 58'])).toBe(false);
      getBasicBrowsers(['and_chr']).forEach(item => {
        expect(obsolete.test([item])).toBe(true);
      });
    });
  });
  describe('test multiple target browsers', () => {
    test('should pass IE', () => {
      setUserAgent(
        'Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:10.0) like Gecko'
      );
      expect(obsolete.test(['ie 9', 'chrome 30'])).toBe(true);
      expect(obsolete.test(['ie 10', 'chrome 30'])).toBe(true);
      expect(obsolete.test(['ie 11', 'chrome 30'])).toBe(false);
    });
    test('should pass Chrome', () => {
      setUserAgent(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3538.77 Safari/537.36'
      );
      expect(obsolete.test(['ie 9', 'chrome 59'])).toBe(true);
      expect(obsolete.test(['ie 9', 'chrome 60'])).toBe(true);
      expect(obsolete.test(['ie 9', 'chrome 61'])).toBe(false);
    });
  });
  describe('test duplicate name target browsers', () => {
    test('should pass IE', () => {
      setUserAgent(
        'Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:10.0) like Gecko'
      );
      expect(obsolete.test(['ie 9', 'ie 10', 'ie 11'])).toBe(true);
      expect(obsolete.test(['ie 10', 'ie 11'])).toBe(true);
      expect(obsolete.test(['ie 11'])).toBe(false);
    });
    test('should pass Chrome', () => {
      setUserAgent(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3538.77 Safari/537.36'
      );
      expect(obsolete.test(['chrome 59', 'chrome 60', 'chrome 61'])).toBe(true);
      expect(obsolete.test(['chrome 60', 'chrome 61', 'chrome 62'])).toBe(true);
      expect(obsolete.test(['chrome 61', 'chrome 62', 'chrome 63'])).toBe(
        false
      );
    });
  });
  describe('test unknown user agent', () => {
    test('should not pass jsdom', () => {
      setUserAgent(
        'Mozilla/5.0 (darwin) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/11.12.0'
      );
      getBasicBrowsers().forEach(item => {
        expect(obsolete.test([item])).toBe(false);
      });
    });
    test('should not pass google bot', () => {
      setUserAgent(
        'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
      );
      getBasicBrowsers().forEach(item => {
        expect(obsolete.test([item])).toBe(false);
      });
    });
  });
  describe('test exception conditions', () => {
    test('should throw empty', () => {
      expect(() => {
        obsolete.test([]);
      }).toThrow();
    });
  });
  describe('test options', () => {
    test('should throw empty', () => {
      expect(() => {
        obsolete.test([]);
      }).toThrow();
    });
  });
});
