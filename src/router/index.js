import Vue from 'vue'
import Router from 'vue-router'
import NHome from '@/components/NHome'
import SystemMenu from '@/components/SystemMenu'
import NMessage from '@/components/NMessage'
import AddressBook from '@/components/AddressBook'
import NMe from '@/components/NMe'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'ON',
  routes: [
    {
      path: '/',
      redirect: '/home'
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
    }
  ]
})
