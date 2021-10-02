import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

// 引入重写的message
import resetMessage from './utils/resetMessage'

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

import preventClick from './utils/controlClickState' //防止鼠标多次点击

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */

// 如果你的数据不是模拟的,则需要将/src/main.js中的以下代码注释掉
/**
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}
*/

Vue.use(preventClick)

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.prototype.$message = resetMessage // 只同时弹一个提示语

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  // store 能全局使用
  store,
  render: h => h(App)
})
