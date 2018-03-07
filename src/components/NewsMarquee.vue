<template>
  <div class="news-marquee line-bottom">
    <ul>
      <li v-for="item in data">{{item.text}}</li>
    </ul>
  </div>
</template>

<script>
import $ from 'jquery'
import {normalizeRequestAnimationFrame} from '@/assets/js/util'
normalizeRequestAnimationFrame()
let data = [
  {
    text: '鲁家窑水库当前水位501.2m，超过预警0.1m'
  },
  {
    text: '鲁家窑水库当前水位501.2m，超过预警0.2m'
  },
  {
    text: '鲁家窑水库当前水位501.2m，超过预警0.3m'
  },
  {
    text: '鲁家窑水库当前水位501.2m，超过预警0.4m'
  }
]
export default {
  name: 'NHeader',
  props: {
    data: {
      type: Array,
      default() {
        return data.concat(data)
      },
      required: false
    }
  },
  data() {
    return {
      moveUnit: 0.2
    }
  },
  methods: {
    start() {
      let moveDistance = this.moveUnit
      let fn = () => {
        if (moveDistance >= $('.news-marquee li').height() * (this.data.length/2)) { 
          moveDistance = 0;
        }
        $('.news-marquee ul').css('-webkit-transform', 'translateY(-' + moveDistance + 'px)');
        $('.news-marquee ul').css('transform', 'translateY(-' + moveDistance + 'px)');
        moveDistance += this.moveUnit;

        window.requestAnimationFrame(() => {
          fn()
        })
      }
      if (this.data.length > 2) {
        fn()
      }
    }
  },
  created() {
    this.start()
  }
}
</script>

<style scoped lang="less">
  .news-marquee {
    height: 38px;
    line-height: 38px;
    overflow: hidden;
    background-color: white;
  }
</style>