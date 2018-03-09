<template>
  <div id="app">
    <keep-alive>
      <transition :name="transitionName">
        <router-view class="app-view"></router-view>
      </transition>
    </keep-alive>
    <n-login ref="nLogin"></n-login>
  </div>
</template>

<script> 
import NLogin from '@/components/NLogin'
import {getItem} from '@/assets/js/store'
import {loginInfo, success} from '@/assets/js/config'
import {getMax, isArray} from '@/assets/js/util'
export default { 
  name: 'app', 
  components: {
    NLogin
  },
  data () { 
    return { 
      transitionName: 'slideLeft' 
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
    }
  },
  watch: {
　　'$route'(to, from) {
      console.log(to, from)
      switch (to.path) {
        case '/reservoir/list':
          this.transitionName = 'slideLeft'
          break;
        case '/home/systemMenu':
          this.transitionName = 'slideRight'
          break;
      }
　　}
  },
  created() {
    this.initLoginStatus()
    /*this.eventHub.$on('loginSuccess', () => {
      console.log('登录成功')
    })*/
  }
}
</script>

<style scoped lang="less">
  .app-view {
    transition: all 0.4s ease-out;
    &.slideLeft-enter {
        transform: translate3d(100%, 0, 0);
    } 
    &.slideLeft-leave-to {
        transform: translate3d(-100%, 0, 0);
    } 
    &.slideRight-enter {
        transform: translate3d(-100%, 0, 0);
    } 
    &.slideRight-leave-to {
        transform: translate3d(100%, 0, 0);
    } 
  }
</style>
