<template>
  <transition name="fade">
    <div class="dialog-loading" v-show="isVisible">
      <div class="dialogWrap">
        <div class="dialog">
          <div class="progress">
            <i class="fa fa-spinner fa-pulse"></i>
          </div>
          <div class="textTip">请您耐心等待，在玩命加载中...</div>
        </div>
        <div class="close" @click="hide">
          <i class="nxst-close"></i>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'DialogLoading',
  data() {
    return {
      isVisible: false
    }
  },
  methods: {
    show() {
      this.isVisible = true
    },
    hide() {
      this.isVisible = false
    }
  },
}
</script>

<style scoped lang='less'>
  @import '../assets/less/variable.less';
  .dialog-loading {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    text-align: center;
    transition: opacity 0.4s;
    .dialogWrap {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .dialog {
        width: 244px;
        padding: 20px 0;
        background-color: white;
        border-radius: 4px;
        .progress {
          margin-bottom: 20px;
          .fa-spinner {
            font-size: 80px;
            color: @color-theme;
          }
        }
        .textTip {
          font-size: 12px;
        }
      }
      .close {
        margin-top: 15px;
        .nxst-close {
          font-size: 30px;
          color: white;
        }
      }
    }
    &.fade-enter, &.fade-leave-to {
      opacity: 0;
    }
  }
</style>