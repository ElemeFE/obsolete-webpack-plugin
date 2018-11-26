const hasOwnProperty = Object.prototype.hasOwnProperty;
const toString = Object.prototype.toString;

/**
 * Execute a provided function once for each array element.
 *
 * @param {any[]} arr
 * @param {function(any, number, any[])} callback
 * @param {any} [thisArg]
 */
function forEach(arr, callback, thisArg) {
  if (toString.call(arr) !== '[object Array]') {
    throw new TypeError('Parameter `arr` is not an array.');
  }
  if (toString.call(callback) !== '[object Function]') {
    throw new TypeError('Parameter `callback` is not an array.');
  }
  for (let i in arr) {
    callback.call(thisArg, arr[i], i, arr);
  }
}
/**
 * Creates a new array with the results of calling a provided function on every
 * element in the calling array.
 *
 * @param {any[]} arr
 * @param {function(any, number, any[])} callback
 * @param {any} [thisArg]
 */
function map(arr, callback, thisArg) {
  if (toString.call(arr) !== '[object Array]') {
    throw new TypeError('Parameter `arr` is not an array.');
  }
  if (toString.call(callback) !== '[object Function]') {
    throw new TypeError('Parameter `callback` is not an array.');
  }

  const result = new Array(arr.length);

  for (let i in arr) {
    const item = callback.call(thisArg, arr[i], i, arr);
    result[i] = item;
  }
  return result;
}
/**
 * Create a new array with all elements that pass the test implemented by the provided function.
 *
 * @param {any[]} arr
 * @param {function(any, number, any[])} callback
 * @param {any} [thisArg]
 */
function filter(arr, callback, thisArg) {
  if (toString.call(arr) !== '[object Array]') {
    throw new TypeError('Parameter `arr` is not an array.');
  }
  if (toString.call(callback) !== '[object Function]') {
    throw new TypeError('Parameter `callback` is not an array.');
  }

  const result = [];

  for (let i in arr) {
    if (callback.call(thisArg, arr[i], i, arr)) {
      result.push(arr[i]);
    }
  }
  return result;
}
/**
 * Test whether at least one element in the array passes the test implemented
 * by the provided function.
 *
 * @param {any[]} arr
 * @param {function(any, number, any[])} callback
 * @param {any} [thisArg]
 */
function some(arr, callback, thisArg) {
  if (toString.call(arr) !== '[object Array]') {
    throw new TypeError('Parameter `arr` is not an array.');
  }
  if (toString.call(callback) !== '[object Function]') {
    throw new TypeError('Parameter `callback` is not an array.');
  }

  for (let i in arr) {
    if (callback.call(thisArg, arr[i], i, arr)) {
      return true;
    }
  }
  return false;
}
/**
 * Determine whether an array includes a certain item.
 *
 * @param {any[]} arr
 * @param {any} item
 * @param {number} [fromIndex]
 */
function includes(arr, item, fromIndex = 0) {
  if (toString.call(arr) !== '[object Array]') {
    throw new TypeError('Parameter `arr` is not an array.');
  }
  for (let i = fromIndex; i < arr.length; i++) {
    if (arr[i] === item) {
      return true;
    }
  }
  return false;
}
/**
 * Get an array of a given object's own enumerable keys.
 *
 * @param {Object<string, any>} obj
 */
function keys(obj) {
  if (!includes(['[object Object]', '[object Function]'], toString.call(obj))) {
    throw new TypeError('Parameter `obj` is not a object.');
  }

  const result = [];

  for (let key in obj) {
    if (hasOwnProperty.call(obj, key)) {
      result.push(key);
    }
  }
  return result;
}
/**
 * Get an array of a given object's own enumerable values.
 *
 * @param {Object<string, any>} obj
 */
function values(obj) {
  if (!includes(['[object Object]', '[object Function]'], toString.call(obj))) {
    throw new TypeError('Parameter `obj` is not a object.');
  }

  const result = [];

  for (let key in obj) {
    if (hasOwnProperty.call(obj, key)) {
      result.push(obj[key]);
    }
  }
  return result;
}
/**
 * Get an array of a given object's own enumerable [key, value] pairs.
 *
 * @param {Object<string, any>} obj
 */
function entries(obj) {
  if (!includes(['[object Object]', '[object Function]'], toString.call(obj))) {
    throw new TypeError('Parameter `obj` is not a object.');
  }

  const ownKeys = keys(obj);
  const pairs = new Array(ownKeys.length);

  for (let i in ownKeys) {
    pairs[i] = [ownKeys[i], obj[ownKeys[i]]];
  }
  return pairs;
}

export { forEach, map, filter, some, includes, keys, values, entries };
