<template>
  <div class="n-tab line-bottom">
    <router-link :to="item.path" v-for="(item, index) in data" :key="index">
      <span v-if="item.icon"><i :class="item.icon">图标</i></span>
      <span class="title">{{item.title}}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'NTab',
  props: {
    data: {
      type: Array,
      required: true
    }
  }
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