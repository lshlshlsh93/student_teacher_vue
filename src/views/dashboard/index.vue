<template>
  <div class="dashboard-container">
    <div class="dashboard-text">用户名: {{ name }}</div>
    <div class="dashboard-text">当前角色: {{ getRoles }}</div>
  </div>
</template>

<script>
import store from '@/store/index'
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters(['name']),
    // 获取角色
    getRoles() {
      return store.state.user.roles[0]
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
