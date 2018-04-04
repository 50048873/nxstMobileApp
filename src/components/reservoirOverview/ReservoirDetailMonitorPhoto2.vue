<template>
  <div class="ReservoirDetailMonitorPhoto" v-if="reservoirDetailMonitorPhoto.length">
    <div class="viewArea" v-lazy:background-image="reservoirDetailMonitorPhoto[currentIndex] && reservoirDetailMonitorPhoto[currentIndex].image">
      <div class="text">
        <i class="fa fa-clock-o"></i>
        <time>{{reservoirDetailMonitorPhoto[currentIndex] && reservoirDetailMonitorPhoto[currentIndex].tm}}</time>
      </div>
    </div>
    <div class="thumbnail">
      <ul id="thumbnailList">
        <li v-for="(item, index) in reservoirDetailMonitorPhoto" :class="{ON: index === currentIndex}" @click="to(index)">
          <img height="60px" v-lazy="item.icon" alt="">
        </li>
      </ul>
    </div>
    <div class="operationBtns">
      <button class="prev" @click="near(-1)">
        <i class="nxst-prev"></i>
        <span>上一张</span>
      </button>
      <button class="play" @click="autoPlay">
        <i class="nxst-play"></i>
        <span>自动播放</span>
      </button>
      <button class="next" @click="near(1)">
        <i class="nxst-next"></i>
        <span>下一张</span>
      </button>
    </div>
  </div>
</template>

<script>
import api from '@/assets/js/api'
import {success, ON} from '@/assets/js/config'
import $ from 'jquery'

export default {
  name: 'ReservoirDetailMonitorPhoto',
  data() {
    return {
      reservoirDetailMonitorPhoto: [],
      currentIndex: 0
    }
  },
  methods: {
    getReservoirDetailMonitorPhoto() {
      api.getReservoirDetailMonitorPhoto()
        .then((res) => {
          if (res.status === success) {
            this.reservoirDetailMonitorPhoto = res.data
          }
        }, (err) => {
          this.serverErrorTip(err, 'ReservoirDetailMonitorPhoto.vue')
        })
    },
    near(num) {
      let len = this.reservoirDetailMonitorPhoto.length,
          i = 0
      if (num > 0) {
        i = this.currentIndex + 1
        if (i > len - 1) {
          i = len - 1
          
        }
      } else {
        i = this.currentIndex - 1
        if (i < 0) {
          i = 0
        }
      }
      this.currentIndex = i
      this.intoView(this.currentIndex)
    },
    to(index) {
      this.currentIndex = index
    },
    autoPlay() {
      let interval = 1000
      let fn = () => {
        if (this.currentIndex === this.reservoirDetailMonitorPhoto.length - 1) {
          clearTimeout(this.timer)
          return
        }
        this.near(1)
        this.timer = window.setTimeout(fn, interval);
      }
      window.setTimeout(fn, interval)
    },
    intoView(index) {
      let activeElement = $('#thumbnailList li').eq(index)[0]
      activeElement.scrollIntoViewIfNeeded()
    }
  },
  created() {
    this.getReservoirDetailMonitorPhoto()
  }
}
</script>

<style scoped lang="less">
  .ReservoirDetailMonitorPhoto {
    .viewArea {
      margin: 15px 10px;
      padding-bottom: 62%;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      background-color: #ebebeb;
      position: relative;
      .text {
        position: absolute;
        bottom: 0;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        text-align: center;
        line-height: 30px;
        font-size: 12px;
      }
    }
    .thumbnail {
      padding: 10px;
      background-color: white;
      overflow-x: auto;
      border-top: 1px solid #d9dbda;
      border-bottom: 1px solid #d9dbda;
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
    .operationBtns {
      display: flex;
      button {
        display: block;
        flex: 1;
        margin: 10px;
        text-align: center;
        background-color: white;
        border: 1px solid #d9dbda;
        border-radius: 4px;
        line-height: 36px;
        color: #0b65c3;
      }
      .play {
        background-color: #1a98e2;
        color: white;
      }
    }
  }
</style>