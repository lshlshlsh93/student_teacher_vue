import store from '@/store'

/**
 *  检查是否拥有权限
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export default function checkPermission(value) {
  if (value && value instanceof Array && value.length > 0) {
    const roles = store.getters && store.getters.roles
    const permissionRoles = value

    const hasPermission = roles.some(role => {
      return permissionRoles.includes(role)
    })
    return hasPermission
  } else {
    // 没有权限
    console.error(`need roles! Like v-permission="['admin','editor']"`)
    return false
  }
}
