import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueLazyloader from 'vue-lazyload'
import regexpConfig from "@/assets/js/regexp";
import VeeValidate, { Validator } from 'vee-validate';
Vue.use(VeeValidate, regexpConfig); //一般插件都要use一下
Vue.use(VueLazyloader, {
  loading: require('@/assets/img/imageLoading.gif'),
  error: require('@/assets/img/placeholder.png'),
  preLoad: 1.3,
  attempt: 1
})
Validator.extend('realNumber', {
  getMessage:()=> {
    return '输入数据有误！'
  },
  validate: value => {
    // 获取输入的value
   return /^([0-9])+(\.[0-9]+)?$/.test(value);
  }
});
// 注册全局组件
import NFooter from '@/components/base/NFooter'
Vue.component('n-footer', NFooter)
//import NLoading from '@/components/base/NLoading/NLoading'
//Vue.component('n-loading', NLoading)
//import NReload from '@/components/base/NReload'
//Vue.component('n-reload', NReload)
import NoData from '@/components/base/NoData'
Vue.component('no-data', NoData)
import NAdd from '@/components/base/NAdd'
Vue.component('n-add', NAdd)

// 注册自定义的方法
import {hint, serverErrorTip, setDocumentTitle} from '@/assets/js/util'
Vue.prototype.hint = hint
Vue.prototype.serverErrorTip = serverErrorTip
Vue.prototype.setDocumentTitle = setDocumentTitle
import {eventHub} from '@/assets/js/event'
Vue.prototype.eventHub = eventHub

// 加载公共样式
import '@/assets/less/base.less'
import '@/assets/weui/dist/style/weui.min.css'
import '@/assets/less/common.less'
import '@/assets/less/animate.less'
import '@/assets/font/nxst/style.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
