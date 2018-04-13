<template>
  <div class="ReservoirDetailMonitorVideo">
    <!-- <video id="myVideo" autoplay="true">
      <source :src="getStaticPath('/static/video/test.mpg')">
      <source :src="getStaticPath('/static/video/test.mp4')">
      Video player not available.
    </video> -->
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
    padding-bottom: 10px;
    video {
      width: 100%;
    }
  }
</style>