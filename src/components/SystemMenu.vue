<template>
  <div class="system-menu">
    <ul>
      <li class="item">
        <div class="iconWrap">
          <span class="redDot"></span>
          <img src="../assets/img/home-menu-1.png" alt="">
        </div>
        <h3>OA系统</h3>
      </li>
      <li class="divide"></li>
      <li class="item">
        <div class="iconWrap">
          <img src="../assets/img/home-menu-1.png" alt="">
        </div>
        <h3>水库管理</h3>
      </li>
      <li class="divide"></li>
      <li class="item">
        <div class="iconWrap">
          <img src="../assets/img/home-menu-1.png" alt="">
        </div>
        <h3>水资源管理</h3>
      </li>
    </ul>
    <ul class="divide"></ul>
    <ul>
      <li class="item">
        <div class="iconWrap">
          <img src="../assets/img/home-menu-1.png" alt="">
        </div>
        <h3>客服营收</h3>
      </li>
      <li class="divide"></li>
      <li class="item">
        <div class="iconWrap">
          <img src="../assets/img/home-menu-1.png" alt="">
        </div>
        <h3>工程管理</h3>
      </li>
      <li class="divide"></li>
      <li class="item">
        <div class="iconWrap">
          <img src="../assets/img/home-menu-1.png" alt="">
        </div>
        <h3>水情预报</h3>
      </li>
    </ul>
    <ul class="divide"></ul>
    <ul>
      <li class="item">
        <div class="iconWrap">
          <img src="../assets/img/home-menu-1.png" alt="">
        </div>
        <h3>水质管理</h3>
      </li>
      <li class="divide"></li>
      <li class="item">
        <div class="iconWrap">
          <img src="../assets/img/home-menu-1.png" alt="">
        </div>
        <h3>科技创新</h3>
      </li>
      <li class="divide"></li>
      <li class="item">
        <div class="iconWrap">
          <img src="../assets/img/home-menu-1.png" alt="">
        </div>
        <h3>综合管理</h3>
      </li>
    </ul>
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
    padding: 18px;
    ul {
      display: flex;
      text-align: center;
      .item {
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