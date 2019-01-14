async function queue(...promises) {
  for (const promise of promises) {
    await promise;
  }
}

export { queue };
