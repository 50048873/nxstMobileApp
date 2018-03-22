<template>
  <transition name="fade">
    <div v-if="isVisible" class="toast">
      <div class="weui-mask_transparent"></div>
      <div class="weui-toast">
        <i class="weui-icon-success" v-if="online"></i>
        <i class="weui-icon-warn" v-else></i>
        <p class="weui-toast__content">{{text}}</p>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'NOnline',
  props: {
    interval: {
      type: Number,
      default: 2000
    }
  },
  data() {
    return {
      isVisible: false,
      online: true
    }
  },
  computed: {
    text() {
      return this.online ? '网络已连接' : '网络连接不可用，请连接网络'
    }
  },
  methods: {
    showToast() {
      this.isVisible = true
      if (timer) {
        clearTimeout(timer)
      }
      let timer = setTimeout(() => {
        this.isVisible = false
      }, this.interval)
    },
    handleOnLineOrOffline() {
        let handleOnline = () => {
          this.online = true
          this.showToast()
        }

        let handleOffline = () => {
          this.online = false
          this.showToast()
        }

        if (!window.navigator.onLine){
          handleOffline()
        }

        window.addEventListener("online", handleOnline, false);
        window.addEventListener("offline", handleOffline, false);
    }
  },
  mounted() {
    this.handleOnLineOrOffline()
  }
}
</script>

<style scoped lang="less">
  .toast {
    transition: opacity 0.4s;
    &.fade-enter, &.fade-leave-to {
      opacity: 0;
    }
    .weui-toast {
      width: 10em;
      margin-left: -5em;
      min-height: auto;
      padding: 15px;
      box-sizing: border-box;
      .weui-icon-success, .weui-icon-warn {
        font-size: 32px;
      }
      .weui-toast__content {
         margin: 0;
         padding-top: 5px;
      }
    }
  }
</style>