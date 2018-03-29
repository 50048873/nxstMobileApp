<template>
  <div class="n-loading" v-if="isVisible">
    <img width="24" height="24" src="./loading.gif">
    <span class="desc">{{title}}</span>
  </div>
</template>
<script>
  export default {
    name: "NLoading",
    props: {
      title: {
        type: String,
        default: '加载中...'
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
      }
    }
  }
</script>
<style scoped lang="less">
  @import '../../../assets/less/variable.less';
  .n-loading {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 9;
    transform: translate(-50%, -50%);
    text-align: center;
    .desc {
      margin-left: 4px;
      line-height: 20px;
      font-size: 12px;
      color: @color-text;
    }
  }
</style>
