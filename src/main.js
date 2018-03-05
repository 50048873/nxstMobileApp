import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
fastclick.attach(document.body)

import '@/assets/less/base.less'
import '@/assets/less/common.less'
import '@/assets/font/nxst/style.css'
import '@/assets/font/font-awesome-4.7.0/css/font-awesome.min.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
