<template>
  <div class="n-tab line-bottom">
    <template v-for="(item, index) in data">
       <router-link v-if="item.flag" :to="getPath(item.path)"  :key="index">
         <span class="iconWrap" v-if="item.icon"><i :class="item.icon"></i></span>
         <span class="title">{{item.title}}</span>
       </router-link>
     </template>
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
    white-space: nowrap;
    overflow-x: auto;
    display: flex;
    a {
      position: relative;
      display: inline-block;
      color: @color-nav-default;
      height: 35px;
      flex: 1;
      line-height: 35px;
      padding-right: 0.8em;
      padding-left: 0.8em;
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
  }
</style>