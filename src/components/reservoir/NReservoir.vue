<template>
  <div class="n-reservoir">
    <n-header title="水库概览" :isBack="isBack"></n-header>
    <n-tab></n-tab>
    <transition name="fade">
      <router-view class="router-view"></router-view>
    </transition>
  </div>
</template>

<script>
import NTab from '@/components/reservoir/NTab'
export default {
  name: 'NReservoir',
  components: {
    NTab
  },
  data() {
    return {
      isBack: true
    }
  },
  methods: {
    back() {
      this.$router.push('/home')
    }
  },
  created() {
    this.eventHub.$on('back', this.back)
  }
}
</script>

<style scoped lang="less">
  .n-reservoir {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>