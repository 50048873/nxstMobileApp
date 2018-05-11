<template>
  <div class="ReservoirDetailMonitorVideo">
    <iframe style="width:100%;height:100%;" :src="this.getStaticPath('/static/video/video.html')" frameborder="0"></iframe>
  </div>
</template>

<script>
import {getStaticPath} from '@/assets/js/mixin'
export default {
  name: 'ReservoirDetailMonitorVideo',
  mixins: [getStaticPath]
}
</script>

<style scoped lang="less">
  .ReservoirDetailMonitorVideo {
    video {
      width: 100%;
    }
  }
</style>