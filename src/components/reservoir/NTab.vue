<template>
  <div class="n-tab line-bottom">
    <router-link to="/reservoir/map">
      <i>图标</i>
      <span class="title">地图</span>
    </router-link>
    <router-link to="/reservoir/list">
      <i>图标</i>
      <span class="title">列表</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'NTab'
}
</script>

<style scoped lang="less">
  @import '../../assets/less/variable.less';
  .n-tab {
    display: flex;
    text-align: center;
    background-color: white;
    a {
      display: block;
      flex: 1;
      color: @color-text;
      height: 35px;
      line-height: 35px;
      &.ON {
        color: #0b65c3;
        border-bottom: 2px solid #0b65c3;
      }
      .title {
        font-weight: bold;
      }
    }
  }
</style>