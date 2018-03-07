<template>
  <transition name="fade">
    <div class="dialog-tip" v-if="isVisible">
      <div class="text" v-html="text"></div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'DialogTip',
  props: {
    duration: {
      type: [String, Number],
      default: 2000
    }
  },
  data() {
    return {
      isVisible: false,
      text: ''
    }
  },
  methods: {
    show(text) {
      this.text = text
      this.isVisible = true
    },
    remove() {
      setTimeout(() => {
        this.isVisible = false
      }, this.duration)
    }
  },
  watch: {
    isVisible(newVal, oldVal) {
      if (newVal) {
        this.remove()
      }
    }
  }
}
</script>

<style scoped lang='less'>
  @import '../assets/less/variable.less';
  .dialog-tip {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.7);
    padding: 10px;
    border-radius: @border-radius-s;
    transition: opacity 0.4s;
    max-width: 60%;
    .text {
      color: white;
    }
    &.fade-enter, &.fade-leave-to {
      opacity: 0;
    }
  }
</style>
