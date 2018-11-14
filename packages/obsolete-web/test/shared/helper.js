function setUserAgent(useragent) {
  Object.defineProperty(navigator, 'userAgent', {
    value: useragent,
    configurable: true,
  });
}

export { setUserAgent };
