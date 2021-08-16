/**
 *
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  // 合法集合
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}
