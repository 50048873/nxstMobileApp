<template>
  <div class="ReservoirDetailMonitorPhoto" ref="ReservoirDetailMonitorPhoto">
    <div v-show="reservoirDetailMonitorPhoto&&reservoirDetailMonitorPhoto.length">
      <div class="viewArea">
        <div class="bigPicWrap" @touchstart="start" @touchmove="move" @touchend.prevent="end" ref="bigPicWrap">
          <ul id="bigPicUl">
            <li v-for="item in reservoirDetailMonitorPhoto" v-lazy:background-image="filePathUrl + convertPath(item.filePath, '\\', '/')"></li>
          </ul>
        </div>
        <div class="text">
          <i class="nxst-clock"></i>
          <time>{{reservoirDetailMonitorPhoto[currentIndex] && reservoirDetailMonitorPhoto[currentIndex].fileTime | dateFormat}}</time>
        </div>
      </div>
      <div class="thumbnail" ref="thumbnail">
        <ul id="thumbnailList">
          <li v-for="(item, index) in reservoirDetailMonitorPhoto" :class="{ON: index === currentIndex}" @click="goTo(index)">
            <img height="60px" v-lazy="filePathUrl + convertPath(item.fileCompress, '\\', '/')" alt="">
          </li>
        </ul>
      </div>
      <transition name="fade">
        <div class="maskLayer" v-if="maskLayerIsVisible">
          <div class="content">
            <img :src="getStaticPath('/static/img/gesture.png')" alt="">
            <button @click="hideMaskLayer">确定</button>
          </div>
        </div>
      </transition>
    </div>
    <n-add right="20" :bottom="getBottomPosition(20)" iconClass="nxst-filter" @click="showDialog"></n-add>
    <filter-dialog ref="filterDialog5" @confirm="filter"></filter-dialog>
    <no-data v-show="reservoirDetailMonitorPhoto&&!reservoirDetailMonitorPhoto.length"></no-data>
  </div>
</template>

<script>
import FilterDialog from '@/components/reservoirOverview/ReservoirDetailMonitorPhoto/FilterDialog'
import api from '@/assets/js/api'
import {success, ON} from '@/assets/js/config'
import $ from 'jquery'
import {getSurportCss, getSameDayOfPreMonth, throttle} from '@/assets/js/util'
import * as local from '@/assets/js/store'
import {dateFormat, getStaticPath, getBottomPosition, monitorAdd, convertPath} from '@/assets/js/mixin'
import {mapGetters, mapMutations, mapActions} from 'vuex'

export default {
  name: 'ReservoirDetailMonitorPhoto',
  components: {
    FilterDialog
  },
  data() {
    return {
      reservoirDetailMonitorPhoto: [],
      currentIndex: 0,
      maskLayerIsVisible: false,

      page: 1,
      pageSize: 5,
      fileBiz: '', // 水库pid
      fileFirst: '',
      startTime: this.dateFormat(getSameDayOfPreMonth(), 'yyyy-mm-dd'),
      endTime: this.dateFormat(new Date(), 'yyyy-mm-dd')
    }
  },
  computed: {
    ...mapGetters(['filePathUrl'])
  },
  mixins: [dateFormat, getStaticPath, getBottomPosition, monitorAdd, convertPath],
  methods: {
    showDialog() {
      this.$refs.filterDialog5.show()
    },
    filter(date) {
      this.fileFirst = date.fileFirst,
      this.startTime = this.dateFormat(date.startTime, "yyyy-mm-dd HH:MM:ss")
      this.endTime = this.dateFormat(date.endTime, "yyyy-mm-dd HH:MM:ss")
      this.page = 1
      this.getReservoirDetailMonitorPhoto()
    },
    click() {
      console.log('单击')
    },
    start(e) {
      this.startPageX = e.touches[0].pageX;
    },
    move(e) {
      this.offsetX = e.touches[0].pageX - this.startPageX;

      if (this.currentIndex === 0 && this.offsetX > 0 || this.currentIndex === (this.$lis.length - 1) && this.offsetX < 0) { 
        this.offsetX /= 5;
      }

      let moveDistance = `translate3d(${-this.currentIndex * this.moveW + this.offsetX}px, 0, 0)`

      this.$ul.css(this.transform, moveDistance);
    },
    end(e) {
      //翻页边界值
      var minMoveVal = 10;

      //如果抬起值与按下值相同，说明是单击
      if (e.changedTouches[0].pageX == this.startPageX) { 
        this.click()
        return;
      }

      if (this.offsetX < 0 && Math.abs(this.offsetX) > minMoveVal) {
        this.currentIndex++; 
      } else if (this.offsetX < this.moveW && this.offsetX > minMoveVal) { 
        this.currentIndex--;
      }

      if (this.currentIndex < 0) {
        this.currentIndex = 0
      } else if (this.currentIndex === this.$lis.length) {
        this.currentIndex = this.$lis.length - 1
      }

      this.near();

      this.loadMore()
    },
    near() {
      let moveDistance = `translate3d(${-this.currentIndex * this.moveW}px, 0, 0)`
      this.$ul.css(this.transform, moveDistance);
      this.intoView(this.currentIndex)
    },
    goTo(index) { 
      this.currentIndex = index
      let moveDistance = `translate3d(${-this.currentIndex * this.moveW}px, 0, 0)`
      this.$ul.css(this.transform, moveDistance);
    },
    intoView(index) {
      let activeElement = $('#thumbnailList li').eq(index)[0]
      activeElement.scrollIntoViewIfNeeded()
    },
    loadMore() {
      if (this.currentIndex + 1 === this.pageSize * this.page) {
        this.page++
        this.getReservoirDetailMonitorPhoto(true)
      }
    },
    getReservoirDetailMonitorPhoto(isAppended) {
      let params = {
        page: this.page,
        pageSize: this.pageSize,
        fileBiz: this.$route.query.pid,
        fileFirst: this.fileFirst,
        startTime: this.startTime,
        endTime: this.endTime
      }
      //console.log(params)
      api.getReservoirDetailMonitorPhoto(params)
        .then((res) => {
          if (res.status === success) {
            //console.log(JSON.stringify(res.data, null, 2))
            if (isAppended) {
              if (res.data && res.data.rows && res.data.rows.length) {
                this.reservoirDetailMonitorPhoto = this.reservoirDetailMonitorPhoto.concat(res.data.rows)
              } 
            } else {
              this.reservoirDetailMonitorPhoto = res.data.rows
            }
            
            this.$nextTick(() => {
              this.initParam()
            })
          } else {
            this.hint(res.msg)
          }
        }, (err) => {
          this.serverErrorTip(err, 'ReservoirDetailMonitorPhoto.vue')
        })
    },
    initParam() {
      this.$ul = $('#bigPicUl')
      this.$lis = this.$ul.find('li')
      this.moveW = this.$ul.width()
      this.transform = getSurportCss('transform')
    },
    hideMaskLayer() {
      this.maskLayerIsVisible = false
      local.setItem('gestureTipIsShow', true)
    },
    initMaskLayerIsVisible() {
      new Promise((resolve, reject) => {
        let isShow = local.getItem('gestureTipIsShow')
        if (isShow) {
          resolve(true)
        } else {
          reject(false)
        }
      }).then((res) => {
        if (res) {
          this.maskLayerIsVisible = false
        }
      }, (err) => {
        if (!err) {
          this.maskLayerIsVisible = true
        }
      })
    },
    addScrollEvent() {
      let $thumbnail = $(this.$refs.thumbnail),
          paddingLeft = parseInt($(this.$refs.ReservoirDetailMonitorPhoto).css('paddingLeft')),
          outLeft = window.innerWidth - paddingLeft
      let load = function() {
        let $lis = $thumbnail.find('li'),
            $lastLi = $lis.last(),
            index = $lis.index($lastLi),
            left = $lastLi.offset().left
        if (outLeft > left && (index + 1 === this.pageSize * this.page)) {
          this.page++
          this.getReservoirDetailMonitorPhoto(true)
        }
      }
      $thumbnail.scroll(() => {
        throttle(load, this)
      })
    }
  },
  created() {
    this.getReservoirDetailMonitorPhoto()
    this.initMaskLayerIsVisible()
  },
  mounted() {
    this.addScrollEvent()
  }
}
</script>

<style scoped lang="less">
  .ReservoirDetailMonitorPhoto {
    padding: 60px 10px 10px;
    .viewArea {
      .bigPicWrap {
        background-color: #ebebeb;
        overflow: hidden;
        ul {
          white-space: nowrap;
          font-size: 0;
          transition: transform 0.2s ease-out;
          li {
            display: inline-block;
            width: 100%;
            padding-bottom: 62%;
            font-size: 12px;
            position: relative;
            overflow: hidden;
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
          }
        }
      }
      .text {
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        line-height: 30px;
        font-size: 12px;
        text-indent: 10px;
        time {
          margin-left: 2px;
        }
      }
    }
    .thumbnail {
      overflow-x: auto;
      margin-top: 55px;
      ul {
        white-space: nowrap;
        li {
          display: inline-block;
          margin-right: 10px;

          &.ON {
            border: 1px solid #fc7b25;
          }
        }
      }
    }
    .maskLayer {
      position: fixed;
      z-index: 9;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.65);
      transition: opacity 0.4s;
      &.fade-enter, &.fade-leave-to {
        opacity: 0;
      }
      .content {
        position: absolute;
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        svg {
          display: inline-block;
          width: 50%;
        }
        button {
          display: inline-block;
          padding: 6px 35px;
          text-align: center;
          background-color: transparent;
          border: 1px solid white;
          border-radius: 4px;
          transition: all 0.4s;
          color: white;
          margin-top: 70px;
        }
      }
    }
  }
</style>