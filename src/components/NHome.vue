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
import {clearUserAuthList} from '@/assets/js/auth'
import {success, defaultDocumentTitle} from '@/assets/js/config'
let data = [
  {
    title: '消息',
    icon: 'nxst-xx',
    href: '/home/message',
    new: true,
    flag:true
  },
  {
    title: '智慧水务',
    icon: 'nxst-zhsw',
    href: '/home/systemMenu',
    flag:true
  },
  {
    title: '通讯录',
    icon: 'nxst-txl',
    href: '/home/addressBook',
    flag:true
  },
  {
    title: '我的',
    icon: 'nxst-me',
    href: '/home/me',
    flag:true
  }
]
export default {
  name: 'NHome',
  data() {
    return {
      data: data
    }
  },
  beforeMount(){
    clearUserAuthList()
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
      } else {
        this.setDocumentTitle(defaultDocumentTitle)
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
