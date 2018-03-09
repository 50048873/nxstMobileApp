import Vue from 'vue'
import Router from 'vue-router'
import NHome from '@/components/NHome'
import SystemMenu from '@/components/SystemMenu'
import NMessage from '@/components/NMessage'
import AddressBook from '@/components/AddressBook'
import NMe from '@/components/NMe'
import NReservoir from '@/components/reservoir/NReservoir'
import NMap from '@/components/reservoir/NMap'
import NList from '@/components/reservoir/NList'
import NLogin from '@/components/NLogin'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  linkActiveClass: 'ON',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'NLogin',
      component: NLogin
    },
    {
      path: '/home',
      redirect: '/home/systemMenu',
      name: 'NHome',
      component: NHome,
      children: [
        {
          path: '/home/message',
          name: 'NMessage',
          component: NMessage
        },
        {
          path: '/home/systemMenu',
          name: 'SystemMenu',
          component: SystemMenu
        },
        {
          path: '/home/addressBook',
          name: 'AddressBook',
          component: AddressBook
        },
        {
          path: '/home/me',
          name: 'NMe',
          component: NMe
        }
      ]
    },
    {
      path: '/reservoir',
      redirect: '/reservoir/list',
      name: 'NReservoir',
      component: NReservoir,
      children: [
        {
          path: '/reservoir/map',
          name: 'NMap',
          component: NMap
        },
        {
          path: '/reservoir/list',
          name: 'NList',
          component: NList
        }
      ]
    }
  ]
})

router.beforeResolve ((to, from, next) => {
  if (to.path !== '/login' && from.path === '/') {
    next({ path: '/' })
  }
  next()
})

export default router
