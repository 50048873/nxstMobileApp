<template>
  <nav class="n-footer line-top">
    <template  v-for="(item, index) in data">
    <router-link v-if="item.flag" :to="getPath(item.href)" :key="index">
        <div  class="iconWrap" :class="{back: item.icon === 'nxst-back'}">
          <span :class="{'redDot': item.new}" v-if="item.new"></span>
          <i :class="item.icon"></i>
        </div>
        <h3 v-if="item.title">{{item.title}}</h3>
    </router-link>
    </template>
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
    align-items: flex-end;
    padding-bottom: 4px;
    box-sizing: border-box;
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
        .nxst-jc, .nxst-xj {
          display: inline-block;
          transform: scale(1.05);
        }
        .nxst-zhsw {
          display: inline-block;
          transform: scale(1.25);
        }
        &.back {
          width: 34px;
          height: 34px;
          background-color: #1c9ce5;
          border-radius: 50%;
          border: 1px solid @color-nav-default;
          box-sizing: border-box;
          .nxst-back {
            position: relative;
            top: 4px;
            color: white;
            font-size: 22px;
          }
        }
      }
      h3 {
        line-height: 1;
        padding-top: 4px;
      }
    }
  }
</style>