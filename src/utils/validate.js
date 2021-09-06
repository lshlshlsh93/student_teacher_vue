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
  // 合法用户名集合
  const valid_map = ['admin', 'teacher', 'student']
  return valid_map.indexOf(str.trim()) >= 0
}
