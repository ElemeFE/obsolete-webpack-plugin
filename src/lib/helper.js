/**
 * Filter object item by key or value.
 *
 * @param {Object<string, any>} object
 * @param {function(any, string, Object<string, any>)} callback
 * @param {any} thisArg
 * @returns {Object<string, any>}
 */
function filterObject(object, callback, thisArg) {
  const ret = {};

  Object.entries(object).forEach(([key, value]) => {
    if (callback.call(thisArg, value, key, object)) {
      ret[key] = value;
    }
  });
  return ret;
}
/**
 * Remove empty value ('', null, undefined) in object.
 *
 * @param {Object<string, any>} object
 * @returns {Object<string, any>}
 */
function removeEmptyValues(object) {
  return filterObject(object, value => !['', null, undefined].includes(value));
}

module.exports = { filterObject, removeEmptyValues };
