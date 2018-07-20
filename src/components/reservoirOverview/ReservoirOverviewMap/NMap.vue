<template>
  <div class="NMap">
    <div class="mapWrap">
      <div class="mapTransform" ref="mapTransform" :style="getScale" @touchstart="start" @touchmove.prevent="move" @touchend="end">
        <div class="tips">
          <img id="map" :src="getStaticPath('/static/img/map.svg')" :width="imgWidth" :height="imgHeight" alt="">
          <div class="tip" v-for="item in reservoirList" :style="getWarnPosition(item)" @click="showDetail(item.pid,item.ennm)">
            <div class="iconWrap"><i class="nxst-warn" :class="getWarnClass(item.status)"></i></div>
            <div class="des">
              <h6>{{item.ennm}}</h6>
              <p>
                <span>水位：</span>
                <span :class="getRedClass(item.status)">{{item.z}}m</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="legend">
      <span class="item">
        <span class="c-00baff"><i class="nxst-warn"></i></span>
        <span>正常</span>
      </span>
      <span class="item">
        <span class="c-red"><i class="nxst-warn"></i></span>
        <span>报警</span>
      </span>
    </div>
    <div class="scale">
      <span class="minus" @click="handleMinus"><i class="nxst-minus"></i></span>
      <span class="plus" @click="handlePlus"><i class="nxst-add"></i></span>
    </div>

  </div>
</template>

<script>
import $ from 'jquery'
import {mapGetters, mapMutations} from 'vuex'
import {setPid,setPname} from '@/assets/js/util'
import {SET_WARNCONFIG} from '@/store/mutation-types'
import {getStaticPath, getWarnConfig} from '@/assets/js/mixin'
import api from '@/assets/js/api'
import {success} from '@/assets/js/config'
const normal = 1, abnormal = 2
export default {
  name: 'NMap',
  props: {
    step: {
      type: Number,
      default: 2
    },
    maxScale: {
      type: Number,
      default: 6
    }
  },
  mixins: [getStaticPath, getWarnConfig],
  data() {
    return {
      scale: 1,
      imgWidth: window.innerWidth - 20,
      imgHeight: ((window.innerWidth - 20) * 2049 / 1363).toFixed(2)
    }
  },
  computed: {
    ...mapGetters(['reservoirList']),
    getScale() {
      let translateStyle = ''
      if (this.translateStyle) {
        translateStyle = this.translateStyle
      } else {
        translateStyle = 'translate(0, 0)'
      }
      return {
        'transform': `scale(${this.scale}) ${translateStyle}`,
        '-webkit-transfrom': `scale(${this.scale}) ${translateStyle}`
      }
    }
  },
  methods: {
    ...mapMutations([SET_WARNCONFIG]),
    getRedClass(status) {
      return status == abnormal ? 'c-red' : ''
    },
    getWarnClass(status) {
      return status == abnormal ? 'warn' : ''
    },
    start(e) {
      //this.touch.initiated = true
      this.touch.startY = e.touches[0].pageY
      this.touch.startX = e.touches[0].pageX

      let style = this.$refs.mapTransform.style.transform
      let arr = style.match(/(\-|\+)?\d+(\.\d+)?px/g)
      if (arr && arr.length) {
        this.oldX = parseFloat(arr[0])
        this.oldY = parseFloat(arr[1])
      }
    },
    move(e) {
      // if (!this.touch.initiated) {
      //   return
      // }

      // if (this.scale === 1) return

      let deltaY = e.touches[0].pageY - this.touch.startY,
          deltaX = e.touches[0].pageX - this.touch.startX

        this.$refs.mapTransform.style.transition = 'none'
        this.$refs.mapTransform.style.transform = `scale(${this.scale}) translate(${deltaX + this.oldX}px, ${deltaY + this.oldY}px)`

        this.translateStyle = `translate(${deltaX + this.oldX}px, ${deltaY + this.oldY}px)`

    },
    end() {
      //this.touch.initiated = false

      this.$refs.mapTransform.style.transition = 'all 0.4s'
    },
    holdTip() {
      $('.tip').css({
        'transform-origin': '0 0',
        'transform': `scale(${1 / this.scale})`
      })
    },
    handleMinus() {
      this.scale -= this.step
      if (this.scale < 1) {
        this.scale = 1
      }
      this.holdTip()
    },
    handlePlus() {
      this.scale += this.step
      if (this.scale > this.maxScale) {
        this.scale = this.maxScale
      }
      this.holdTip()
    },
    showDetail(pid,name) {
      this.getWarnConfig({pid})
      setPid(pid);
      setPname(name);
      this.$router.push({path: '/reservoirDetail', query: {pid}})
    },
    getWarnPosition(item) {
      let nx = {
        jd: [104.2869, 107.6536],
        wd: [35.2494, 39.8758]
      }

      //图片内目标Y坐标=取绝对值（目标纬度-图片上边对应纬度）/取绝对值（图片下边纬度-图片上边对应纬度）*（图片的高度）
      //图片内目标X坐标=取绝对值（目标经度-图片左边对应经度）/取绝对值（图片右边经度-图片左边对应经度）*（图片的宽度）
      let top = Math.abs(item.lttd - nx.wd[1]) / Math.abs(nx.wd[0] - nx.wd[1]) * this.imgHeight - 20 + 'px',
          left = Math.abs(item.lgtd - nx.jd[0]) / Math.abs(nx.jd[1] - nx.jd[0]) * this.imgWidth - 20 + 'px'

      return item.status == normal ? {top, left} : {top, left, zIndex: 1}
    }
  },
  created() {
    this.touch = {}
  }
}
</script>

<style scoped lang="less">
  @import '../../../assets/less/variable.less';
  .NMap {
    .mapWrap {
      position: absolute;
      top: @tab-height;
      bottom: 0;
      width: 100%;
      overflow: hidden;
      padding-top: 10px;
      .mapTransform {
        transition: all 0.4s;
      }
      .warn {
        animation-name: fadeIn;
        animation-duration: 0.4s;
        animation-fill-mode: both;
        animation-iteration-count: infinite;
        color: red!important;
      }
    }
    .legend {
      position: absolute;
      bottom: 10px;
      left: 10px;
      background-color: white;
      border-radius: 4px;
      border: 1px solid #d4d4d4;
      filter: drop-shadow(-1px 1px 2px rgba(0, 0, 0, 0.3));
      .item {
        display: inline-block;
        font-size: 12px;
        padding: 4px 10px;
        > span {
          vertical-align: middle;
        }
      }
    }
    .scale {
      position: absolute;
      right: 10px;
      bottom: 10px;
      display: inline-flex;
      filter: drop-shadow(-1px 1px 2px rgba(0, 0, 0, 0.3));
      .minus, .plus {
        display: inline-block;
        background-color: white;
        width: 40px;
        line-height: 28px;
        text-align: center;
        border: 1px solid #d4d4d4;
        &:active {
          background-color: #bdf1ff;
        }
      }
      .minus {
        border-right: none;
        border-radius: 4px 0 0 4px;
      }
      .plus {
        border-left: none;
        border-radius: 0 4px 4px 0;
      }
    }
    .tips {
      position: relative;
      margin: 10px;
      .tip {
        position: absolute;
        transition: transform 0.2s;
        .iconWrap {
          position: absolute;
          width: 16px;
          height: 16px;
          background-color: white;
          border-radius: 50%;
          box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
          .nxst-warn {
            font-size: 14px;
            position: absolute;
            top: 1px;
            left: 1px;
            color: #31ade4;
          }
        }
        .des {
          margin-left: 20px;
          background-color: white;
          padding: 5px 8px;
          border-radius: 4px;
          text-align: center;
          box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
          h6 {
            font-weight: bold;
            font-size: 12px;
          }
          p {
            font-size: 10px;
            white-space: nowrap;
          }
        }
      }
    }
  }
</style>
