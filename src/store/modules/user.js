import { login, logout, getInfo } from '@/api/user' //用户登录，退出，获取用户信息
import { getToken, setToken, removeToken } from '@/utils/auth' // 获得token，设置token,移除token
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '', //用户名
  avatar: '', // 头像
  roles: [], // 角色
  introduction: '' // 角色描述
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  }
}

const actions = {
  // user login  返回token
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then(response => {
          const res = response.data
          // debugger
          commit('SET_TOKEN', res.token)
          setToken(res.token) // 设置token
          resolve()
        })
        .catch(error => {
          reject(error.message)
        })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // 请求获取权限
      getInfo(state.token)
        .then(response => {
          // mock.js不支持自定义状态码只能这样hack
          if (response.code !== 0) {
            reject('error')
          }
          const data = response.data

          if (!data) {
            return reject('Verification failed, please Login again.')
          }
          // 此处注意不要忘记定义
          // const { name, avatar, introduction, roles } = data

          if (data.roles && data.roles.length > 0) {
            commit('SET_ROLES', data.roles)
          } else {
            commit('SET_ROLES', ['无权限的用户']) // 角色
          }
          commit('SET_NAME', data.name) // 姓名
          commit('SET_AVATAR', data.avatar) // 头像
          commit('SET_INTRODUCTION', data.introduction) //描述

          resolve(data)
        })
        .catch(error => {
          reject(error.message)
        })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          commit('SET_TOKEN', '')
          removeToken() // must remove  token  first
          resetRouter()
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken() // must remove  token  first
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
