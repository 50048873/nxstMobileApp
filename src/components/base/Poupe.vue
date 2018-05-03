<template>
  <div v-if="status" class="poupe">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'poupe',
  props: {
    status: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="less">
  .poupe {
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    height:100%;
    z-index: 9999;
    background-color: rgba(0,0,0,0.5);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    -moz-overflow-scrolling: touch;
    -ms-overflow-scrolling: touch;
    -o-overflow-scrolling: touch;
    overflow-scrolling: touch;
  }
</style>