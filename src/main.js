import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
fastclick.attach(document.body)

// 注册自定义的方法
import {errorTip, serverErrorTip} from '@/assets/js/util'
Vue.prototype.errorTip = errorTip
Vue.prototype.serverErrorTip = serverErrorTip

// 加载公共样式
import '@/assets/less/base.less'
import '@/assets/less/common.less'
import '@/assets/less/animate.less'
import '@/assets/font/nxst/style.css'
import '@/assets/font/font-awesome-4.7.0/css/font-awesome.min.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
