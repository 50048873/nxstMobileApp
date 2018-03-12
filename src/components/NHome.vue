<template>
  <div class="n-home">
    <n-header></n-header>
    <news-marquee :data="newsMarquee" v-if="newsMarquee.length"></news-marquee>
    <transition name="fade">
      <router-view class="router-view"></router-view>
    </transition>
    <n-footer :data="data"></n-footer>
  </div>
</template>

<script>
import NewsMarquee from '@/components/NewsMarquee'
import api from '@/assets/js/api'
import {success} from '@/assets/js/config'
let data = [
  {
    title: '消息',
    icon: 'nxst-',
    href: '/home/message',
    new: true
  },
  {
    title: '智慧水务',
    icon: 'nxst-',
    href: '/home/systemMenu'
  },
  {
    title: '通讯录',
    icon: 'nxst-',
    href: '/home/addressBook'
  },
  {
    title: '我的',
    icon: 'nxst-',
    href: '/home/me'
  }
]
export default {
  name: 'NHome',
  components: {
    NewsMarquee
  },
  data() {
    return {
      newsMarquee: [],
      data: data
    }
  },
  methods: {
    getNewsMarquee() {
      api.getNewsMarquee()
        .then((res) => {
          if (res.status === success) {
            this.newsMarquee = res.data
          }
        }, (err) => {
          this.serverErrorTip(err, 'NHome.vue')
        })
    },
  },
  created() {
    this.getNewsMarquee()
  }
}
</script>

<style scoped lang='less'>
  @import '../assets/less/variable.less';
  .n-home {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>
