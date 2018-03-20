<template>
  <div>
    <n-tab :data="tab"></n-tab>
    <transition name="fade">
      <router-view class="scroolWrap router-view-fade"></router-view>
    </transition>
  </div>
</template>

<script>
import NTab from '@/components/base/NTab'
import {mapGetters, mapMutations} from 'vuex'
export default {
  name: 'ReservoirDetailMonitor',
  components: {
    NTab
  },
  data() {
    return {
      tab: [
        {
          title: '水位',
          path: '/reservoirDetail/monitor/waterlevel'
        },
        {
          title: '雨量',
          path: '/reservoirDetail/monitor/rainfall'
        },
        {
          title: '图像',
          path: '/reservoirDetail/monitor/photo'
        },
        {
          title: '视频',
          path: '/reservoirDetail/monitor/video'
        },
        {
          title: '水质',
          path: '/reservoirDetail/monitor/waterquality'
        },
        {
          title: '供水量',
          path: '/reservoirDetail/monitor/watersupply'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['documentTitle'])
  },
  created() {
    this.setDocumentTitle(this.documentTitle)
  }
}
</script>

<style scoped lang="less">
  @import '../../assets/less/variable.less';
  .scroolWrap {
    position: absolute;
    top: @tab-height;
    right: 0;
    bottom: @footer-height;
    left: 0;
    overflow-y: auto;
  }
</style>