<template>
  <div class="news-marquee line-bottom">
    <i class="nxst-trumpet"></i>
    <ul>
      <li v-for="item in dubbleData" class="ellipsis">{{item.text}}</li>
    </ul>
  </div>
</template>

<script>
import $ from 'jquery'
import {normalizeRequestAnimationFrame} from '@/assets/js/util'
normalizeRequestAnimationFrame()
export default {
  name: 'NHeader',
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    moveUnit: {
      type: [String, Number],
      default: 0.2
    }
  },
  computed: {
    dubbleData() {
      return this.data.concat(this.data)
    }
  },
  methods: {
    start() {
      let moveDistance = this.moveUnit
      let fn = () => {
        if (moveDistance >= $('.news-marquee li').height() * this.data.length) { 
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
    position: relative;
    height: 38px;
    line-height: 38px;
    overflow: hidden;
    background-color: white;
    padding: 0 18px;
    .nxst-trumpet {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      color: #ff8a00;
      font-size: 16px;
    }
    ul {
      margin-left: 24px;
    }
  }
</style>