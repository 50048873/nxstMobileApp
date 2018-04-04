<template>
  <nav class="n-footer line-top">
    <router-link :to="getPath(item.href)" v-for="(item, index) in data" :key="index">
      <div class="iconWrap" :class="{back: !item.title}">
        <span :class="{'redDot': item.new}" v-if="item.new"></span>
        <i :class="item.icon"></i>
      </div>
      <h3 v-if="item.title">{{item.title}}</h3>
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
  nav.n-footer {
    position: absolute;
    bottom: 0;
    z-index: 7;
    width: 100%; 
    height: 62px;
    background-color: white;
    display: flex;
    text-align: center;
    align-items: center;
    a {
      display: block;
      flex: 1;
      color: @color-nav-default;
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
        [class*="nxst"] {
          font-size: 24px;
        }
        .nxst-zhsw {
          display: inline-block;
          transform: scale(1.25);
        }
        &.back {
          width: 48px;
          height: 48px;
          background-color: #1c9ce5;
          border-radius: 50%;
          border: 1px solid @color-nav-default;
          box-sizing: border-box;
          .nxst-back {
            position: relative;
            top: 10px;
            color: white;
          }
        }
      }
      h3 {
        line-height: 1;
        padding-top: 2px;
      }
    }
  }
</style>