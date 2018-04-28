import Vue from 'vue'
import Router from 'vue-router'
import {path} from '@/assets/js/config'
import {handleUserInfo} from '@/assets/js/auth.js'
import NHome from '@/components/NHome'
import SystemMenu from '@/components/SystemMenu'
import NMessage from '@/components/NMessage'
import NMessageMessage from '@/components/NMessageMessage'
import NMessageNotice from '@/components/NMessageNotice'
import AddressBook from '@/components/AddressBook'
import AddressBookBranchList from "@/components/AddressBookBranchList";
import AddressBookMemberList from "@/components/AddressBookMemberList";
import NMe from '@/components/NMe'
import ReservoirOverview from '@/components/reservoirOverview/ReservoirOverview'
import ReservoirOverviewMap from '@/components/reservoirOverview/ReservoirOverviewMap/Map'
import ReservoirOverviewList from '@/components/reservoirOverview/ReservoirOverviewList'
import ReservoirDetail from '@/components/reservoirOverview/ReservoirDetail'
import ReservoirDetailInfo from '@/components/reservoirOverview/ReservoirDetailInfo'
import ReservoirDetailInspection from '@/components/reservoirOverview/ReservoirDetailInspection'
import ReservoirDetailInspectionAdd from '@/components/reservoirOverview/ReservoirDetailInspectionAdd'
import ReservoirDetailInspectionRecord from '@/components/reservoirOverview/ReservoirDetailInspectionRecord'
import ReservoirDetailInspectionTrail from '@/components/reservoirOverview/ReservoirDetailInspectionTrail'
import ReservoirDetailMember from '@/components/reservoirOverview/ReservoirDetailMember'
import ReservoirDetailMonitor from '@/components/reservoirOverview/ReservoirDetailMonitor'
import ReservoirDetailMonitorWaterlevel from '@/components/reservoirOverview/ReservoirDetailMonitorWaterlevel/Waterlevel'
import ReservoirDetailMonitorRainfall from '@/components/reservoirOverview/ReservoirDetailMonitorRainfall/Rainfall'
import ReservoirDetailMonitorPhoto from '@/components/reservoirOverview/ReservoirDetailMonitorPhoto/photo'
import ReservoirDetailMonitorVideo from '@/components/reservoirOverview/ReservoirDetailMonitorVideo'
import ReservoirDetailMonitorWaterquality from '@/components/reservoirOverview/ReservoirDetailMonitorWaterquality/Waterquality'
import ReservoirDetailMonitorWatersupply from '@/components/reservoirOverview/ReservoirDetailMonitorWatersupply/Watersupply'
import ReservoirDetailMonitorAdd from '@/components/reservoirOverview/ReservoirDetailMonitorAdd'
import PatrolPath from '@/components/reservoirOverview/PatrolPath'


Vue.use(Router)

let router = new Router({
  base: path,
  mode: "history",
  linkActiveClass: "ON",
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      redirect: "/home/systemMenu",
      name: "NHome",
      component: NHome,
      children: [
        {
          path: "/home/message",
          redirect: "/home/message/message",
          name: "NMessage",
          component: NMessage,
          children: [
            {
              path: "/home/message/message",
              name: "NMessageMessage",
              component: NMessageMessage
            },
            {
              path: "/home/message/notice",
              name: "NMessageNotice",
              component: NMessageNotice
            }
          ]
        },
        {
          path: "/home/systemMenu",
          name: "SystemMenu",
          component: SystemMenu
        },
        {
          path: "/home/addressBook",
          name: "AddressBook",
          component: AddressBook
        },
        {
          path: "/home/addressBookBranchList",
          name: "AddressBookBranchList",
          component: AddressBookBranchList
        },
        {
          path: "/home/addressBookMemberList",
          name: "AddressBookMemberList",
          component: AddressBookMemberList
        },
        {
          path: "/home/me",
          name: "NMe",
          component: NMe
        }
      ]
    },
    {
      path: "/reservoirOverview",
      redirect: "/reservoirOverview/map",
      name: "ReservoirOverview",
      component: ReservoirOverview,
      children: [
        {
          path: "/reservoirOverview/map",
          name: "ReservoirOverviewMap",
          component: ReservoirOverviewMap,
          beforeEnter: (to, from, next) => {
            handleUserInfo().then(
              data => {
                if (data) {
                  next();
                } else {
                  next(false);
                }
              },
              err => {
                next(false);
              }
            );
          }
        },
        {
          path: "/reservoirOverview/list",
          name: "ReservoirOverviewList",
          component: ReservoirOverviewList
        }
      ]
    },
    {
      path: "/reservoirDetail",
      redirect: "/reservoirDetail/info",
      name: "ReservoirDetail",
      component: ReservoirDetail,
      children: [
        {
          path: "/reservoirDetail/info",
          name: "ReservoirDetailInfo",
          component: ReservoirDetailInfo
        },
        {
          path: "/reservoirDetail/monitor",
          redirect: "/reservoirDetail/monitor/waterlevel",
          name: "ReservoirDetailMonitor",
          component: ReservoirDetailMonitor,
          children: [
            {
              path: "/reservoirDetail/monitor/waterlevel",
              name: "ReservoirDetailMonitorWaterlevel",
              component: ReservoirDetailMonitorWaterlevel
            },
            {
              path: "/reservoirDetail/monitor/rainfall",
              name: "ReservoirDetailMonitorRainfall",
              component: ReservoirDetailMonitorRainfall
            },
            {
              path: "/reservoirDetail/monitor/photo",
              name: "ReservoirDetailMonitorPhoto",
              component: ReservoirDetailMonitorPhoto
            },
            {
              path: "/reservoirDetail/monitor/video",
              name: "ReservoirDetailMonitorVideo",
              component: ReservoirDetailMonitorVideo
            },
            {
              path: "/reservoirDetail/monitor/waterquality",
              name: "ReservoirDetailMonitorWaterquality",
              component: ReservoirDetailMonitorWaterquality
            },
            {
              path: "/reservoirDetail/monitor/watersupply",
              name: "ReservoirDetailMonitorWatersupply",
              component: ReservoirDetailMonitorWatersupply
            },
            {
              path: "/reservoirDetail/monitor/add",
              name: "ReservoirDetailMonitorAdd",
              component: ReservoirDetailMonitorAdd
            }
          ]
        },
        {
          path: "/reservoirDetail/inspection",
          name: "ReservoirDetailInspection",
          component: ReservoirDetailInspection,
          children: [
            {
              path: "/reservoirDetail/inspection/record",
              name: "ReservoirDetailInspectionRecord",
              component: ReservoirDetailInspectionRecord
            },
            {
              path: "/reservoirDetail/inspection/patrolPath",
              name: "ReservoirDetailInspectionPatrolPath",
              component: PatrolPath
            }
          ]
        },
        {
          path: "/reservoirDetail/inspection/add",
          name: "ReservoirDetailInspectionAdd",
          component: ReservoirDetailInspectionAdd
        },
        {
          path: "/reservoirDetail/inspection/trail",
          name: "ReservoirDetailInspectionTrail",
          component: ReservoirDetailInspectionTrail
        },
        {
          path: "/reservoirDetail/member",
          name: "ReservoirDetailMember",
          component: ReservoirDetailMember
        }
      ]
    }
  ]
});

export default router
