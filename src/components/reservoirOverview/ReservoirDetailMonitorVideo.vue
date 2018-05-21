<template>
  <div class="ReservoirDetailMonitorVideo">
    <iframe ref="videoIframe" style="width:100%;height:100%;" :src="this.getStaticPath('/static/video/video.html')" frameborder="0"></iframe>
  </div>
</template>

<script>
import {getStaticPath} from '@/assets/js/mixin'
import {loading} from '@/assets/js/util'
export default {
  name: 'ReservoirDetailMonitorVideo',
  mixins: [getStaticPath],
  methods: {
    loadTip() {
      let videoIframe = this.$refs.videoIframe
      loading.show()
      videoIframe.onload = () => {
        loading.remove()
      }
    }
  },
  mounted() {
    this.loadTip()
  }
}
</script>

<style scoped lang="less">
  .ReservoirDetailMonitorVideo {
    video {
      width: 100%;
    }
  }
</style>