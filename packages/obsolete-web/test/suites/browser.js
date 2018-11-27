function getBasicBrowsers(excludes = []) {
  const basicBrowsers = [
    'ie 5.5',
    'edge 12',
    'chrome 4',
    'safari 3.1',
    'firefox 2',
    'opera 9',
    'android 2.1',
    'ios_saf 3.2',
    'and_chr 30',
    'and_ff 30',
  ];

  return basicBrowsers.filter(
    basicBrowser => !excludes.every(exclude => basicBrowser.includes(exclude))
  );
}
function setUserAgent(useragent) {
  Object.defineProperty(navigator, 'userAgent', {
    value: useragent,
    configurable: true,
  });
}
function unescape(html) {
  return html.replace('&times;', '×');
}

export { getBasicBrowsers, setUserAgent, unescape };
