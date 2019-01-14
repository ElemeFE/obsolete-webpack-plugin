/**
 * Queue a function to be called during a browser's idle periods.
 *
 * @param {function(IdleDeadline} callback
 * @param {Object} options
 */
function requestIdleCallback(callback, options = {}) {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(callback, options);
    return;
  }

  const start = new Date().getTime();

  setTimeout(() => {
    const elapsedTime = Date.now() - start;

    callback({
      didTimeout: false,
      timeRemaining() {
        return Math.max(0, 50 - elapsedTime);
      },
    });
  }, 1);
}

export { requestIdleCallback };
