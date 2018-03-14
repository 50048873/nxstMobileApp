<template>
  <div>
    <transition name="fade">
      <router-view class="routerView2"></router-view>
    </transition>
    <n-footer :data="data"></n-footer>
  </div>
</template>

<script>
let data = [
  {
    title: '监测',
    icon: 'nxst-',
    href: '/reservoirDetail/monitor'
  },
  {
    title: '巡检',
    icon: 'nxst-',
    href: '/reservoirDetail/inspection'
  },
  {
    title: '人员',
    icon: 'nxst-',
    href: '/reservoirDetail/member'
  },
  {
    title: '信息',
    icon: 'nxst-',
    href: '/reservoirDetail/info'
  }
]
export default {
  name: 'ReservoirOverviewDetail',
  data() {
    return {
      data: data
    }
  }
}
</script>