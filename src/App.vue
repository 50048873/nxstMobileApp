<template>
  <div id="app">
    <iframe v-if="baseUrl === '/api'" src="http://sw.dse.cn:56015/cas-server/login?service=http://sw.dse.cn:56015/znb/index.html" frameborder="0"></iframe>
    <keep-alive>
      <transition :name="transitionName">
        <router-view class="router-view-app"></router-view>
      </transition>
    </keep-alive>
    <n-online></n-online>
  </div>
</template>

<script> 
import NOnline from '@/components/base/NOnline'
import {success} from '@/assets/js/config'
import {loading} from '@/assets/js/util'
import * as session from '@/assets/js/session'
import $ from 'jquery'
import api from '@/assets/js/api'
export default { 
  name: 'app', 
  components: {
    NOnline
  },
  data () { 
    return { 
      transitionName: 'slideToLeft' 
    } 
  }, 
  methods: {
    initAjaxLoading() {
      $.ajaxSetup({
        beforeSend: function (XMLHttpRequest) {
          loading.show()
          // XMLHttpRequest.setRequestHeader("_wx", true);
        },
        complete: function () {
          loading.remove()
        }
      })
    },
    getSessionUser() {
      api.getSessionUser()
        .then((res) => {
          console.log(res)
        }, (err) => {
          console.log(err)
        })
    },
    getListResourceNodeByUser() {
      api.getListResourceNodeByUser()
        .then((res) => {
          console.log(res)
        }, (err) => {
          console.log(err)
        })
    }
  },
  watch: {  
    '$route'(to, from)  {  
      let toPath = to.path,
          fromPath = from.path
      let routers = session.getItem('routers')
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
      session.setItem('routers', routersArr.join(','))  
    }  
  },
  created() {
    this.baseUrl = process.env.API_HOST
    this.initAjaxLoading()
    // this.getSessionUser()
    // this.getListResourceNodeByUser()
  }
}
</script>

<style scoped lang="less">
  iframe {
    display: none;
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 10;
    border: 1px solid;
    box-sizing: border-box;
  }
  .router-view-app {
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