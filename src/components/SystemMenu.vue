<template>
  <div class="system-menu">
    <news-marquee :data="newsMarquee" v-if="newsMarquee.length"></news-marquee>
    <div class="menu">
      <nav>
        <router-link class="item" to="/oa">
          <div class="iconWrap iconWrap-1">
            <span class="redDot"></span>
            <i class="nxst-oa"></i>
          </div>
          <h3>OA系统</h3>
        </router-link>
        <div class="divide"></div>
        <router-link class="item" to="/reservoirOverview">
          <div class="iconWrap iconWrap-2">
            <i class="nxst-skgl"></i>
          </div>
          <h3>水库管理</h3>
        </router-link>
        <div class="divide"></div>
        <router-link class="item" to="/waterResources">
          <div class="iconWrap iconWrap-3">
            <i class="nxst-szygl"></i>
          </div>
          <h3>水资源管理</h3>
        </router-link>
      </nav>
      <div class="divide"></div>
      <nav>
        <router-link class="item" to="/customerService">
          <div class="iconWrap iconWrap-4">
            <i class="nxst-kfys"></i>
          </div>
          <h3>客服营收</h3>
        </router-link>
        <div class="divide"></div>
        <router-link class="item" to="/engineering">
          <div class="iconWrap iconWrap-5">
            <i class="nxst-gcgl"></i>
          </div>
          <h3>工程管理</h3>
        </router-link>
        <div class="divide"></div>
        <router-link class="item" to="/waterRegimen">
          <div class="iconWrap iconWrap-6">
            <i class="nxst-sqyb"></i>
          </div>
          <h3>水情预报</h3>
        </router-link>
      </nav>
      <div class="divide"></div>
      <nav>
        <router-link class="item" to="/waterQuality">
          <div class="iconWrap iconWrap-7">
            <i class="nxst-szgl"></i>
          </div>
          <h3>水质管理</h3>
        </router-link>
        <div class="divide"></div>
        <router-link class="item" to="/scienceTechnology">
          <div class="iconWrap iconWrap-8">
            <i class="nxst-kjcx"></i>
          </div>
          <h3>科技创新</h3>
        </router-link>
        <div class="divide"></div>
        <router-link class="item" to="/comprehensive">
          <div class="iconWrap iconWrap-9">
            <i class="nxst-zhgl"></i>
          </div>
          <h3>综合管理</h3>
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script>
import NewsMarquee from '@/components/NewsMarquee'
import api from '@/assets/js/api'
import {success} from '@/assets/js/config'
export default {
  name: 'SystemMenu',
  components: {
    NewsMarquee
  },
  data() {
    return {
      newsMarquee: []
    }
  },
  methods: {
    getNewsMarquee() {
      api.getNewsMarquee()
        .then((res) => {
          if (res.status === success) {
            this.newsMarquee = res.data
          }
        }, (err) => {
          this.serverErrorTip(err, 'NHome.vue')
        })
    },
  },
  created() {
    this.getNewsMarquee()
  }
}
</script>

<style scoped lang="less">
  @import '../assets/less/variable.less';
  .system-menu {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow-y: auto; 
    .menu {
      padding: 18px 18px 30px;
    }
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
          border-radius: 50%;
          .redDot {
            position: absolute;
            top: -2px;
            right: -2px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #ff002a;
          }
          [class*="nxst"] {
            color: white;
            font-size: 32px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          &.iconWrap-1 {
            background: linear-gradient(#25d1e3, #19c6d7);
          }
          &.iconWrap-2 {
            background: linear-gradient(#38bdf7, #0eb2f9);
          }
          &.iconWrap-3 {
            background: linear-gradient(#7199f7, #4f91fc);
          }
          &.iconWrap-4 {
            background: linear-gradient(#38bdf7, #0eb2f9);
          }
          &.iconWrap-5 {
            background: linear-gradient(#7199f7, #4f91fc);
          }
          &.iconWrap-6 {
            background: linear-gradient(#25d1e3, #19c6d7);
          }
          &.iconWrap-7 {
            background: linear-gradient(#25d1e3, #19c6d7);
          }
          &.iconWrap-8 {
            background: linear-gradient(#38bdf7, #0eb2f9);
          }
          &.iconWrap-9 {
            background: linear-gradient(#7199f7, #4f91fc);
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