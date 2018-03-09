<template>
  <div class="system-menu">
    <nav>
      <router-link class="item" to="/oa">
        <div class="iconWrap">
          <span class="redDot"></span>
          <img src="../assets/img/home-menu-1.png" alt="">
        </div>
        <h3>OA系统</h3>
      </router-link>
      <div class="divide"></div>
      <router-link class="item" to="/reservoir">
        <div class="iconWrap">
          <img src="../assets/img/home-menu-1.png" alt="">
        </div>
        <h3>水库管理</h3>
      </router-link>
      <div class="divide"></div>
      <router-link class="item" to="/waterResources">
        <div class="iconWrap">
          <img src="../assets/img/home-menu-1.png" alt="">
        </div>
        <h3>水资源管理</h3>
      </router-link>
    </nav>
    <div class="divide"></div>
    <nav>
      <router-link class="item" to="/customerService">
        <div class="iconWrap">
          <img src="../assets/img/home-menu-1.png" alt="">
        </div>
        <h3>客服营收</h3>
      </router-link>
      <div class="divide"></div>
      <router-link class="item" to="/engineering">
        <div class="iconWrap">
          <img src="../assets/img/home-menu-1.png" alt="">
        </div>
        <h3>工程管理</h3>
      </router-link>
      <div class="divide"></div>
      <router-link class="item" to="/waterRegimen">
        <div class="iconWrap">
          <img src="../assets/img/home-menu-1.png" alt="">
        </div>
        <h3>水情预报</h3>
      </router-link>
    </nav>
    <div class="divide"></div>
    <nav>
      <router-link class="item" to="/waterQuality">
        <div class="iconWrap">
          <img src="../assets/img/home-menu-1.png" alt="">
        </div>
        <h3>水质管理</h3>
      </router-link>
      <div class="divide"></div>
      <router-link class="item" to="/scienceTechnology">
        <div class="iconWrap">
          <img src="../assets/img/home-menu-1.png" alt="">
        </div>
        <h3>科技创新</h3>
      </router-link>
      <div class="divide"></div>
      <router-link class="item" to="/comprehensive">
        <div class="iconWrap">
          <img src="../assets/img/home-menu-1.png" alt="">
        </div>
        <h3>综合管理</h3>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'SystemMenu'
}
</script>

<style scoped lang="less">
  @import '../assets/less/variable.less';
  .system-menu {
    position: absolute;
    top: 108px;
    right: 0;
    bottom: 58px;
    left: 0;
    padding: 18px 18px 30px;
    overflow-y: auto; 
    nav {
      display: flex;
      text-align: center;
      .item {
        display: block;
        flex: 1;
        background-color: white;
        padding-top: 22px;
        padding-bottom: 14px;
        border-radius: @border-radius-s;
        box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.3);
        &:focus, &:hover {
          box-shadow: 0 0 4px 0 @color-theme;
        }
        .iconWrap {
          position: relative;
          width: 55px;
          height: 55px;
          margin: 0 auto;
          .redDot {
            position: absolute;
            top: -2px;
            right: -2px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #ff002a;
          }
        }
        h3 {
          line-height: 1;
          padding-top: 12px;
          color: @color-text;
        }
      }
      .divide {
        width: 12px;
        height: 0;
        background-color: transparent;
      }
    }
    .divide {
      height: 12px;
    }
  }
</style>