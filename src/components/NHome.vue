<template>
  <div>
    <transition name="fade">
      <router-view class="router-view-fade"></router-view>
    </transition>
    <n-footer :data="data"></n-footer>
  </div>
</template>
<script>

let data = [
  {
    title: '消息',
    icon: 'nxst-xx',
    href: '/home/message',
    new: true
  },
  {
    title: '智慧水务',
    icon: 'nxst-zhsw',
    href: '/home/systemMenu'
  },
  {
    title: '通讯录',
    icon: 'nxst-txl',
    href: '/home/addressBook'
  },
  {
    title: '我的',
    icon: 'nxst-me',
    href: '/home/me'
  }
]
export default {
  name: 'NHome',
  data() {
    return {
      data: data
    }
  },
  created() {
    this.setDocumentTitle('宁夏水投智慧水务平台')
  }
}
</script>

<style scoped lang='less'>
  @import '../assets/less/variable.less';
  
</style>
