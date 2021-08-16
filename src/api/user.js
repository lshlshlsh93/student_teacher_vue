import request from '@/utils/request'

// // 用户登录
// export function login1(data) {
//   return request({
//     baseURL: '/dev-api', // 原来的mocksever地址
//     url: '/vue-admin-template/user/login',
//     method: 'post',
//     data
//   })
// }

// 用户登录
export function login(data) {
  return request({
    url: '/admin/core/user/login',
    method: 'post',
    data
  })
}

// 获取用户信息
export function getInfo(token) {
  return request({
    url: '/admin/core/user/info',
    method: 'get',
    params: { token }
  })
}

// 用户退出
export function logout() {
  return request({
    url: '/admin/core/user/logout',
    method: 'post'
  })
}

// // 获取用户信息
// export function getInfo1(token) {
//   return request({
//     baseURL: '/dev-api',
//     url: '/vue-admin-template/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

// // 用户退出
// export function logout() {
//   return request({
//     baseURL: '/dev-api',
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }
