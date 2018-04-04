<template>
  <div class="n-tab line-bottom">
    <router-link :to="getPath(item.path)" v-for="(item, index) in data" :key="index">
      <span class="iconWrap" v-if="item.icon"><i :class="item.icon"></i></span>
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
    },
    pid: {
      type: String
    }
  },
  methods: {
    getPath(href) {
      if (this.pid) {
        return { path: href, query: { pid: this.pid }}
      } 
      return {path: href}
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
      color: @color-nav-default;
      height: 35px;
      line-height: 35px;
      &.ON {
        color: #0b65c3;
        border-bottom: 2px solid #0b65c3;
      }
      .iconWrap {
        position: relative;
        top: 1px;
      }
      .title {
        font-weight: bold;
        padding-left: 2px;
      }
    }
  }
</style>