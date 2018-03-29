<template>
  <nav class="n-footer line-top">
    <router-link :to="{ path: item.href, query: { pid: pid }}" v-for="(item, index) in data" :key="index">
      <div class="iconWrap">
        <span :class="{'redDot': item.new}"></span>
        <i :class="item.icon"></i>
        图标
      </div>
      <h3>{{item.title}}</h3>
    </router-link>
  </nav>
</template>

<script>
export default {
  name: 'NFooter',
  props: {
    data: {
      type: Array,
      required: true
    },
    pid: {
      type: String
    }
  }
}
</script>

<style scoped lang="less">
  @import '../../assets/less/variable.less';
  nav.n-footer {
    position: absolute;
    bottom: 0;
    z-index: 7;
    width: 100%; 
    height: 62px;
    background-color: white;
    display: flex;
    text-align: center;
    padding: 8px 0;
    box-sizing: border-box;
    a {
      display: block;
      flex: 1;
      color: @color-text;
      &.ON {
        color: #0e6fca;
      }
      .iconWrap {
        display: inline-block;
        position: relative;
        .redDot {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: #ff002a;
        }
      }
      h3 {
        line-height: 1;
        margin-top: 8px;
      }
    }
  }
</style>