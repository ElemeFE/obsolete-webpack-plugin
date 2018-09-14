import check from './check';
import show from './show';

const isCompatible = check(navigator.userAgent, process.env.BROWSERSLIST);

console.log(isCompatible)

if (!isCompatible) {
  show()
}