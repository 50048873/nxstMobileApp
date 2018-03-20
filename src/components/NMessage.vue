<template>
  <div class="NMessage">
    <n-tab :data="tab"></n-tab>
    <transition name="fade">
      <router-view class="router-view-fade"></router-view>
    </transition>
  </div>
</template>

<script>
import NTab from '@/components/base/NTab'
export default {
  name: 'NMessage',
  components: {
    NTab
  },
  data() {
    return {
      tab: [
        {
          title: '消息',
          path: '/home/message/message'
        },
        {
          title: '公告',
          path: '/home/message/notice'
        }
      ]
    }
  }
}
</script>