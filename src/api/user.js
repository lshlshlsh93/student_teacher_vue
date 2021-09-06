import request from '@/utils/request'

// 用户登录
export function login(data) {
  return request({
    url: '/admin/core/user/loginWithToken',
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
