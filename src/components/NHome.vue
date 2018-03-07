<template>
  <div class="n-home">
    <n-login ref="nLogin"></n-login>
    <div class="homeWrap">
      <n-header></n-header>
      <news-marquee></news-marquee>
    </div>
  </div>
</template>

<script>
import {getItem} from '@/assets/js/store'
import {loginInfo, success} from '@/assets/js/config'
import {getMax, isArray} from '@/assets/js/util'
import NLogin from '@/components/NLogin'
import NHeader from '@/components/NHeader'
import NewsMarquee from '@/components/NewsMarquee'
import api from '@/assets/js/api'

export default {
  name: 'NHome',
  components: {
    NLogin,
    NHeader,
    NewsMarquee
  },
  data() {
    return {
      newsMarquee: [{
        "text": "暂无新通知"
      }]
    }
  },
  methods: {
    initLoginStatus() {
      new Promise((resolve, reject) => {
        let loginInfoArr = getItem(loginInfo)
        if (isArray(loginInfoArr) && loginInfoArr.length) {
          resolve(loginInfoArr)
        } else {
          reject(null)
        }
      }).then((res) => {
        let lastLoginUser = getMax(res)
        if (lastLoginUser) {
          this.$refs.nLogin.autoLogin(res.username, res.password)
          this.isVisible = true
        }
      }, (err) => {
        console.log(err.status)
      })
    },
    getNewsMarquee() {
      api.getNewsMarquee()
        .then((res) => {
          if (res.status === success) {
            this.newsMarquee = res.data
          }
        }, (err) => {
          this.$refs.dialogTip.show(err)
        })
    },
  },
  created() {
    this.initLoginStatus()
  }
}
</script>

<style scoped>
</style>
