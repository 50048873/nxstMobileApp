<template>
  <div class="reservoir-overview">
    <n-tab :data="tab"></n-tab>
    <transition name="fade">
      <router-view class="router-view-fade"></router-view>
    </transition>
  </div>
</template>

<script>
import NTab from '@/components/base/NTab'
export default {
  name: 'ReservoirOverview',
  components: {
    NTab
  },
  data() {
    return {
      tab: [
        {
          title: '地图',
          path: '/reservoirOverview/map',
          icon: ''
        },
        {
          title: '列表',
          path: '/reservoirOverview/list',
          icon: ''
        }
      ]
    }
  },
  created() {
    this.setDocumentTitle('水库概览')
  }
}
</script>

<style scoped lang="less">
  .reservoir-overview {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>