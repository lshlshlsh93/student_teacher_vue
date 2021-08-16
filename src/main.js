import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
// 导入vuex
import store from './store'

import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

// // 定义一个全局的过滤器
// Vue.filter('dateFormat', originVal => {
//   const date = new Date(originVal)

//   // 年
//   const year = date.getFullYear()
//   // 如果月不足一月就使用0代替
//   const month = (date.getMonth() + 1 + '').padStart(2, '0')
//   // 如果日不足一天就使用0代替
//   const day = (date.getDay() + '').padStart(2, '0')
//   // 小时
//   const hour = (date.getHours() + '').padStart(2, '0')
//   // 分钟
//   const minutes = (date.getMinutes() + '').padStart(2, '0')
//   // 秒数
//   const seconds = (date.getSeconds() + '').padStart(2, '0')

//   return `${year}年${month}月${day}日 ${hour}:${minutes}:${seconds}`
// })

new Vue({
  el: '#app',
  router,
  // store 能全局使用
  store,
  render: h => h(App)
})
