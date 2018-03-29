<template>
  <div
      v-show="isVisible"
      class="NReload"
      @touchstart="start" 
      @touchmove.prevent="move" 
      @touchend="end">
    <div class="content">
      <i class="fa fa-refresh"></i>
      <span>{{title}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NReload',
  props: {
    title: {
      type: String,
      default: '轻触屏幕重新加载'
    }
  },
  data() {
    return {
      isVisible: true
    }
  },
  methods: {
    show() {
      this.isVisible = true
    },
    hide() {
      this.isVisible = false
    },
    start(e) {
      this.touch.initiated = true
    },
    move(e) {
      if (!this.touch.initiated) {
        return
      }
    },
    end() {
      this.$emit('reload')
    }
  },
  created() {
    this.touch = {}
  }
}
</script>

<style scoped lang="less">
  @import '../../assets/less/variable.less';
  .NReload {
    position: absolute;
    top: @tab-height;
    bottom: 0;
    z-index: 1;
    width: 100%; 
    background-color: white;
    text-align: center;
    color: #dddddd;
    .content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>