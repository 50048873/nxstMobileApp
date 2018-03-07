<template>
  <div class="n-home">
    <n-login ref="nLogin"></n-login>
    <div class="homeWrap">
      <n-header></n-header>
      <news-marquee :data="newsMarquee" v-if="newsMarquee.length"></news-marquee>
      <transition name="fade">
        <router-view class="homeView"></router-view>
      </transition>
    </div>
    <footer-home></footer-home>
  </div>
</template>

<script>
import {getItem} from '@/assets/js/store'
import {loginInfo, success} from '@/assets/js/config'
import {getMax, isArray} from '@/assets/js/util'
import NLogin from '@/components/NLogin'
import NHeader from '@/components/NHeader'
import NewsMarquee from '@/components/NewsMarquee'
import FooterHome from '@/components/FooterHome'
import api from '@/assets/js/api'
import {eventHub} from '@/assets/js/event.js'

export default {
  name: 'NHome',
  components: {
    NLogin,
    NHeader,
    NewsMarquee,
    FooterHome
  },
  data() {
    return {
      newsMarquee: []
    }
  },
  methods: {
    initLoginStatus() {
      new Promise((resolve, reject) => {
        let loginInfoArr = getItem(loginInfo)
        if (isArray(loginInfoArr) && loginInfoArr.length) {
          resolve(loginInfoArr)
        } else {
          reject('没有缓存登录信息')
        }
      }).then((res) => {
        let lastLoginUser = getMax(res)
        if (lastLoginUser) {
          this.$refs.nLogin.autoLogin(res.username, res.password)
        }
      }, (err) => {
        this.$refs.nLogin.show()
      })
    },
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
    this.initLoginStatus()
    eventHub.$on('loginSuccess', () => {
      this.getNewsMarquee()
    })
  }
}
</script>

<style scoped lang='less'>
  @import '../assets/less/variable.less';
  .n-home {
    .homeView {
      transition: opacity 0.4s;
      &.fade-enter, &.fade-leave-to {
        opacity: 0;
      }
    }
  }
</style>
