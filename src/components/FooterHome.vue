<template>
  <nav class="footer-home line-top">
    <router-link to="/home/message">
      <div class="iconWrap">
        <span class="redDot"></span>
        图标
      </div>
      <h3>消息</h3>
    </router-link>
    <router-link to="/home/systemMenu" >
      <div class="iconWrap">图标</div>
      <h3>智慧水务</h3>
    </router-link>
    <router-link to="/home/addressBook">
      <div class="iconWrap">图标</div>
      <h3>通讯录</h3>
    </router-link>
    <router-link to="/home/me">
      <div class="iconWrap">图标</div>
      <h3>我的</h3>
    </router-link>
  </nav>
</template>

<script>
export default {
  name: 'FooterHome'
}
</script>

<style scoped lang="less">
  @import '../assets/less/variable.less';
  .footer-home {
    position: fixed;
    bottom: 0;
    width: 100%; 
    height: 58px;
    background-color: white;
    display: flex;
    text-align: center;
    padding: 8px 0;
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