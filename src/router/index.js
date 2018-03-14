import Vue from 'vue'
import Router from 'vue-router'
import NHome from '@/components/NHome'
import SystemMenu from '@/components/SystemMenu'
import NMessage from '@/components/NMessage'
import AddressBook from '@/components/AddressBook'
import NMe from '@/components/NMe'
import ReservoirOverview from '@/components/reservoirOverview/ReservoirOverview'
import ReservoirOverviewMap from '@/components/reservoirOverview/ReservoirOverviewMap'
import ReservoirOverviewList from '@/components/reservoirOverview/ReservoirOverviewList'
import ReservoirDetail from '@/components/reservoirOverview/ReservoirDetail'
import ReservoirDetailInfo from '@/components/reservoirOverview/ReservoirDetailInfo'
import ReservoirDetailInspection from '@/components/reservoirOverview/ReservoirDetailInspection'
import ReservoirDetailInspectionAdd from '@/components/reservoirOverview/ReservoirDetailInspectionAdd'
import ReservoirDetailMember from '@/components/reservoirOverview/ReservoirDetailMember'
import ReservoirDetailMonitor from '@/components/reservoirOverview/ReservoirDetailMonitor'

Vue.use(Router)

let router = new Router({
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
    },
    {
      path: '/reservoirOverview',
      redirect: '/reservoirOverview/list',
      name: 'ReservoirOverview',
      component: ReservoirOverview,
      children: [
        {
          path: '/reservoirOverview/map',
          name: 'ReservoirOverviewMap',
          component: ReservoirOverviewMap
        },
        {
          path: '/reservoirOverview/list',
          name: 'ReservoirOverviewList',
          component: ReservoirOverviewList
        }
      ]
    },
    {
      path: '/reservoirDetail',
      redirect: '/reservoirDetail/info',
      name: 'ReservoirDetail',
      component: ReservoirDetail,
      children: [
        {
          path: '/reservoirDetail/monitor',
          name: 'ReservoirDetailMonitor',
          component: ReservoirDetailMonitor
        },
        {
          path: '/reservoirDetail/inspection',
          name: 'ReservoirDetailInspection',
          component: ReservoirDetailInspection
        },
        {
          path: '/reservoirDetail/inspection/add',
          name: 'ReservoirDetailInspectionAdd',
          component: ReservoirDetailInspectionAdd
        },
        {
          path: '/reservoirDetail/member',
          name: 'ReservoirDetailMember',
          component: ReservoirDetailMember
        },
        {
          path: '/reservoirDetail/info',
          name: 'ReservoirDetailInfo',
          component: ReservoirDetailInfo
        }
      ]
    }
  ]
})

export default router
