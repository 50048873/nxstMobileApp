<template>
  <div class="n-dialog-tip">
    <span class="text">{{text}}</span>
  </div>
</template>

<script>
export default {
  name: 'NDialogTip',
  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang='less'>
  @import '../assets/less/variable.less';
  .n-dialog-tip {
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px;
    .text {

    }
  }
</style>
