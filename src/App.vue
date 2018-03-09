<template>
  <div id="app">
    <keep-alive>
      <transition :name="transitionName">
        <router-view class="app-view"></router-view>
      </transition>
    </keep-alive>
  </div>
</template>

<script> 
import {getItem} from '@/assets/js/store'
import {loginInfo, success} from '@/assets/js/config'
import {getMax, isArray} from '@/assets/js/util'
export default { 
  name: 'app', 
  data () { 
    return { 
      transitionName: 'slideLeft' 
    } 
  }, 
  watch: {
　　'$route'(to, from) {
      //console.log(to, from)
      switch (to.path) {
        case '/reservoir/list':
          this.transitionName = 'slideLeft'
          break;
        case '/home/systemMenu':
          this.transitionName = 'slideRight'
          break;
      }
　　}
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
