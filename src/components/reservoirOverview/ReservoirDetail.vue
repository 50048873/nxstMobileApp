<template>
  <div class="reservoir-overview-detail">
    <n-header title="鸭子荡水库" :isBack="isBack"></n-header>
    <transition name="fade">
      <router-view class="router-view"></router-view>
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
      isBack: true,
      data: data
    }
  },
  created() {
    console.log(this.$route)
  }
}
</script>

<style scoped lang="less">
  @import '../../assets/less/tool.less';
  .n-detail {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>