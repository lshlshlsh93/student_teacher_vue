import Cookies from 'js-cookie'

const TokenKey = 'userTokens'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  var millisecond = new Date().getTime()
  // 过期时间十五分钟
  var expiresTime = new Date(millisecond + 60 * 1000 * 15)

  return Cookies.set(TokenKey, token, { expires: expiresTime })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
