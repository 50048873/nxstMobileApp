<template>
  <div>
    <n-tab :data="tab" :pid="$route.query.pid"></n-tab>
    <transition name="fade">
      <keep-alive>
        <router-view class="scrollWrap router-view-fade"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import NTab from '@/components/base/NTab'
import {handleAuth,getPid} from '@/assets/js/util'
import {authArtificialPost} from '@/assets/js/auth'
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
          path: '/reservoirDetail/monitor/waterlevel',
          flag:handleAuth("waterlevel")

        },
        {
          title: '雨量',
          path: '/reservoirDetail/monitor/rainfall',
          flag:handleAuth("wateryield")
        },
        {
          title: '图像',
          path: '/reservoirDetail/monitor/photo',
          flag:handleAuth("photo")
        },
        {
          title: '视频',
          path: '/reservoirDetail/monitor/video',
          flag:handleAuth("vadio")
        },
        {
          title: '水质',
          path: '/reservoirDetail/monitor/waterquality',
          flag:handleAuth("qualitymonitor")
        },
        {
          title: '供水量',
          path: '/reservoirDetail/monitor/watersupply',
          flag:handleAuth("provideyield")
        },
        {
          title: '人工填报',
          path: '/reservoirDetail/monitor/add',
          flag:false
        }
      ]
    }
  },
  beforeMount(){
    authArtificialPost("402881d162d65a7c0162d679d5480044",2,getPid()).then(res=>{
      this.tab[this.tab.length-1].flag = res;
    })
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