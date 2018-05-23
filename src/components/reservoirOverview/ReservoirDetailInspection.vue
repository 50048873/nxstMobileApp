<template>
  <div class="reservoirDetailInspection">
    <n-tab :data="tab"></n-tab>
    <transition name="fade">
      <keep-alive>
        <router-view class="scrollWrap router-view-fade"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import {success, documentTitle_reservoirDetail} from '@/assets/js/config'
import NTab from '@/components/base/NTab'
export default {
  name: 'ReservoirDetailInspection',
  components: {
    NTab
  },
  data() {
    return {
      tab: [
        {
          title: '巡检轨迹',
          path: '/reservoirDetail/inspection/patrolPath',
          flag:true
        },
        {
          title: '巡检问题',
          path: '/reservoirDetail/inspection/issue',
          flag:true
        },
        {
          title: '巡检记录',
          path: '/reservoirDetail/inspection/record',
          flag:true
        }
      ]
    }
  }
}
</script>

<style scoped lang="less">
  @import '../../assets/less/variable.less';
  .scrollWrap {
    position: absolute;
    top: @tab-height;
    right: 0;
    bottom: @footer-height;
    left: 0;
    overflow-y: auto;
  }
</style>