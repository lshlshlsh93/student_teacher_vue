// controlClickState.js 文件

export default {
  install(Vue) {
    // 禁止短时间内重复点击
    Vue.directive('preventClick', {
      inserted(button, bind) {
        button.addEventListener('click', () => {
          if (!button.disabled) {
            button.disabled = true
            setTimeout(() => {
              but.disabled = false
            }, 2000)
          }
        })
      }
    })
  }
}
