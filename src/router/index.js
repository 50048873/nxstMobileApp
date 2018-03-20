import Vue from 'vue'
import Router from 'vue-router'
import NHome from '@/components/NHome'
import SystemMenu from '@/components/SystemMenu'
import NMessage from '@/components/NMessage'
import NMessageMessage from '@/components/NMessageMessage'
import NMessageNotice from '@/components/NMessageNotice'
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
import ReservoirDetailMonitorWaterlevel from '@/components/reservoirOverview/ReservoirDetailMonitorWaterlevel'
import ReservoirDetailMonitorRainfall from '@/components/reservoirOverview/ReservoirDetailMonitorRainfall'
import ReservoirDetailMonitorPhoto from '@/components/reservoirOverview/ReservoirDetailMonitorPhoto'
import ReservoirDetailMonitorVideo from '@/components/reservoirOverview/ReservoirDetailMonitorVideo'
import ReservoirDetailMonitorWaterquality from '@/components/reservoirOverview/ReservoirDetailMonitorWaterquality'
import ReservoirDetailMonitorWatersupply from '@/components/reservoirOverview/ReservoirDetailMonitorWatersupply'

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
          redirect: '/home/message/message',
          name: 'NMessage',
          component: NMessage,
          children: [
            {
              path: '/home/message/message',
              name: 'NMessageMessage',
              component: NMessageMessage
            },
            {
              path: '/home/message/notice',
              name: 'NMessageNotice',
              component: NMessageNotice
            }
          ]
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
          redirect: '/reservoirDetail/monitor/watersupply',
          name: 'ReservoirDetailMonitor',
          component: ReservoirDetailMonitor,
          children: [
            {
              path: '/reservoirDetail/monitor/waterLevel',
              name: 'ReservoirDetailMonitorWaterlevel',
              component: ReservoirDetailMonitorWaterlevel
            },
            {
              path: '/reservoirDetail/monitor/rainfall',
              name: 'ReservoirDetailMonitorRainfall',
              component: ReservoirDetailMonitorRainfall
            },
            {
              path: '/reservoirDetail/monitor/photo',
              name: 'ReservoirDetailMonitorPhoto',
              component: ReservoirDetailMonitorPhoto
            },
            {
              path: '/reservoirDetail/monitor/video',
              name: 'ReservoirDetailMonitorVideo',
              component: ReservoirDetailMonitorVideo
            },
            {
              path: '/reservoirDetail/monitor/waterquality',
              name: 'ReservoirDetailMonitorWaterquality',
              component: ReservoirDetailMonitorWaterquality
            },
            {
              path: '/reservoirDetail/monitor/watersupply',
              name: 'ReservoirDetailMonitorWatersupply',
              component: ReservoirDetailMonitorWatersupply
            }
          ]
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
