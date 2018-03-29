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
  }/*,
  created() {
    console.log(this.$route.query.pid)
  }*/
}
</script>