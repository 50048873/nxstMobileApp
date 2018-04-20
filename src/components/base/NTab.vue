<template>
  <div class="n-tab line-bottom" :class="{slider: data.length > 6}">
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
    text-align: center;
    background-color: white;
    display: flex;
    a {
      position: relative;
      flex: 1;
      color: @color-nav-default;
      height: 35px;
      line-height: 35px;
      &.ON {
        color: #0b65c3;
        &:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: #0b65c3;
        }
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
    &.slider {
      display: block;
      white-space: nowrap;
      overflow-x: auto;
      a {
        display: inline-block;
        padding-right: 0.8em;
        padding-left: 0.8em;
        flex: none;
      }
    }
  }
</style>