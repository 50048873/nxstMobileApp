<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped lang="less">
  @import './assets/less/variable.less';
  #app {
    background-color: @color-background;
  }
</style>
