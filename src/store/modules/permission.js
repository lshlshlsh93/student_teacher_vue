import {
  asyncRoutes,
  constantRoutes,
  TeacherRoutes,
  StudentRoutes
} from '@/router'

/**
 * 判断当前用户是否有权限
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  // 判断路由表中是否有roles
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRoutes 是一个路由配置数组
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []
  // 遍历之前要检查routes是否存在，不然会报错：Cannot read property 'forEach' of undefined
  if (!routes) return
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

const getDefaultState = () => {
  return {
    routes: [],
    addRoutes: []
  }
}

const state = getDefaultState

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },

  RESET_STATE: state => {
    Object.assign(state, getDefaultState())
  }
}

const actions = {
  // 根据角色生成路由
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      // if (roles.includes('admin')) {
      // accessedRoutes = asyncRoutes || []
      // } else if (roles.includes('teacher')) {
      //   accessedRoutes = TeacherRoutes || []
      // } else if (roles.includes('student')) {
      //   accessedRoutes = StudentRoutes || []
      //  } else {
      accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      //  }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  },

  // 重置路由，用于退出登录操作
  resetState({ commit }) {
    return new Promise(resolve => {
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
