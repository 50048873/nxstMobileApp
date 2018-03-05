import Vue from 'vue'
import Router from 'vue-router'
import NHome from '@/components/NHome'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'NHome',
      component: NHome
    }
  ]
})
