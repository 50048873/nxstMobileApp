<template>
  <div>
    <transition name="fade">
      <router-view class="router-view-fade"></router-view>
    </transition>
    <n-footer :data="data"></n-footer>
  </div>
</template>
<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'
import api from '@/assets/js/api'
import {success} from '@/assets/js/config'
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
  computed: {
    ...mapGetters(['documentTitle'])
  },
  methods: {
    ...mapActions([
      'saveDocumentTitle'
    ]),
    initTitle() {
      const code = '30001'
      if (this.documentTitle) {
        this.setDocumentTitle(this.documentTitle)
        return
      }
      api.getDictValueByCode({code})
        .then((res) => {
          if (res.status === success) {
            this.saveDocumentTitle(res.data.VALUE)
            this.setDocumentTitle(this.documentTitle)
          } else {
            this.hint(res.msg)
          }
        }, (err) => {
          this.serverErrorTip(err, 'NHome.vue')
        })
    }
  },
  created() {
    this.initTitle()
  }
}
</script>

<style scoped lang='less'>
  @import '../assets/less/variable.less';
  
</style>
