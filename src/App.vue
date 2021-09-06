<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
/** 
Vuex 的状态存储是响应式的，当 Vue 组件从 store 中读取状态的时候，
若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
但是有一个问题就是：vuex的存储的数据只是在页面的中，
相当于我们定义的全局变量，刷新之后，里边的数据就会恢复到初始化状态。
但是这个情况有时候并不是我们所希望的。比如，用户已经登录了，我把登录状态放到state中了，一刷新页面，还要重新登录？

解决办法:
监听页面是否刷新，如果页面刷新了，将state对象存入到sessionStorage/localStorage中。
页面打开之后，判断sessionStorage/localStorage中是否存在state对象，
如果存在，则说明页面是被刷新过的，将sessionStorage/localStorage中存的数据取出来给vuex中的state赋值。
如果不存在，说明是第一次打开，则取vuex中定义的state初始值。
*/

export default {
  name: 'App',

  mounted() {
    // 添加事件监听刷新事件
    window.addEventListener('unload', this.saveState)
    // 页面加载完成后，清空或者删除指定的session。
    window.addEventListener('load', () => {
      sessionStorage.clear()
    })
  },
  methods: {
    saveState() {
      sessionStorage.setItem('state', JSON.stringify(this.$store.state))
    }
  }
}
</script>
