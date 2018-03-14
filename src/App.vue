<template>
  <div id="app">
    <keep-alive>
      <transition :name="transitionName">
        <router-view class="routerView1"></router-view>
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
      transitionName: 'slideToLeft' 
    } 
  }, 
  watch: {  
    '$route'(to, from)  {  
      let toPath = to.path,
          fromPath = from.path
      let routers = sessionStorage.getItem('routers')
      let routersArr = routers && routers.split(',') || []
      if (routersArr.length === 0) {  
        routersArr.push(fromPath)  
        routersArr.push(toPath)
      } else {  
        let index = routersArr.indexOf(toPath)
        if (index !== -1) {  
          this.transitionName='slideToRight'  
          routersArr.splice(index + 1, 100)  
        } else {  
          this.transitionName='slideToLeft'  
          routersArr.push(toPath)  
        } 
      }  
      sessionStorage.setItem('routers', routersArr.join(','))  
    }  
  } 
}
</script>

<style scoped lang="less">
  .routerView1 {
    transition: all 0.2s ease-out;
    &.slideToLeft-enter {
        transform: translate3d(100%, 0, 0);
    } 
    &.slideToLeft-leave-to {
        transform: translate3d(-100%, 0, 0);
    } 
    &.slideToRight-enter {
        transform: translate3d(-100%, 0, 0);
    } 
    &.slideToRight-leave-to {
        transform: translate3d(100%, 0, 0);
    } 
  }
</style>