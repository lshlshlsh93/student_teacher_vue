import Cookies from 'js-cookie'

const TokenKey = 'userTokens'
// 获取后端传来的token值
export function getToken() {
  return Cookies.get(TokenKey)
}

//设置token在cookie中
export function setToken(token) {
  var millisecond = new Date().getTime()
  // 过期时间十五分钟
  var expiresTime = new Date(millisecond + 60 * 1000 * 15)

  return Cookies.set(TokenKey, token, { expires: expiresTime })
}

// 从cookie中移除token
export function removeToken() {
  return Cookies.remove(TokenKey)
}
