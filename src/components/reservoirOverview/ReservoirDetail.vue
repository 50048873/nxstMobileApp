<template>
  <div>
    <transition name="fade">
      <keep-alive>
        <router-view class="router-view-fade"></router-view>
      </keep-alive>
    </transition>
    <n-footer :data="data" :pid="$route.query.pid"></n-footer>
  </div>
</template>

<script>
import * as session from '@/assets/js/session'
let data = [
  {
    title: '信息',
    icon: 'nxst-info',
    href: '/reservoirDetail/info'
  },
  {
    title: '监测',
    icon: 'nxst-jc',
    href: '/reservoirDetail/monitor'
  },
  {
    title: null,
    icon: 'nxst-back',
    href: '/reservoirOverview/map'
  },
  {
    title: '巡检',
    icon: 'nxst-xj',
    href: '/reservoirDetail/inspection'
  },
  {
    title: '人员',
    icon: 'nxst-member',
    href: '/reservoirDetail/member'
  }
]
export default {
  name: 'ReservoirOverviewDetail',
  data() {
    return {
      data: data
    }
  },
  methods: {
    initBack() {
      let routers = session.getItem('routers');
      if (routers && routers.indexOf(',')) {
        let originHrefArr = routers.split(','),
        originHref = originHrefArr[originHrefArr.length - 2]
        data[2].href = originHref
      } 
    }
  },
  created() {
    this.initBack()
  }
}
</script>