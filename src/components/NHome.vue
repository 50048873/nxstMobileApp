<template>
  <div class="n-home">
    <n-header></n-header>
    <news-marquee :data="newsMarquee" v-if="newsMarquee.length"></news-marquee>
    <transition name="fade">
      <router-view class="router-view"></router-view>
    </transition>
    <footer-home></footer-home>
  </div>
</template>

<script>
import NewsMarquee from '@/components/NewsMarquee'
import FooterHome from '@/components/FooterHome'
import api from '@/assets/js/api'
import {success} from '@/assets/js/config'

export default {
  name: 'NHome',
  components: {
    NewsMarquee,
    FooterHome
  },
  data() {
    return {
      newsMarquee: []
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
