<template>
    <ul class="ReservoirDetailInspection">
      <li class="detail line-bottom" :class="{'line-top': index !== 0}" v-for="(item, index) in reservoirDetailInfo">
        <h3 class="iconWrap" :style="{color: colors[index]}">
          <i>图标</i>
          <span>{{item.title}}</span>
        </h3>
        <div class="detail-content">
          <ul>
            <li v-for="item2 in item.des">
              <span class="name" :style="{'flex': `0 0 ${item.maxWordLen + 3}em`}">
                <i>图标</i>
                <em>{{item2.title}}</em>
              </span>
              <span class="content">{{item2.content}}</span>
            </li>
          </ul>
        </div>
      </li>
    </ul>
</template>

<script>
import api from '@/assets/js/api'
import {success} from '@/assets/js/config'
import {mapGetters, mapMutations} from 'vuex'
import {SET_DOCUMENTTITLE} from '@/store/mutation-types'
let colors = ['#0c6ac9', '#1ca6ab']
export default {
  name: 'ReservoirDetailInfo',
  data() {
    return {
      reservoirDetailInfo: [],
      colors: colors
    }
  },
  methods: {
    ...mapMutations([SET_DOCUMENTTITLE]),
    maxWordLen(arr) {
      arr.forEach((item) => {
        let des = item.des
        let arr = []
        des.forEach((item2) => {
          arr.push(item2.title.length)
        })
        item.maxWordLen = Math.max.apply(Math, arr)
      })
      return arr
    },
    getReservoirDetailInfo() {
      api.getReservoirDetailInfo({id: this.$route.query.id})
        .then((res) => {
          if (res.status === success) {
            this.reservoirDetailInfo = this.maxWordLen(res.data)
            const documentTitle = this.reservoirDetailInfo[0].des[0].content
            this.SET_DOCUMENTTITLE(documentTitle)
            this.setDocumentTitle(documentTitle)
          }
        }, (err) => {
          this.serverErrorTip(err, 'ReservoirDetailInfo.vue')
        })
    }
  },
  created() {
    this.getReservoirDetailInfo()
  }
}
</script>

<style scoped lang="less">
  @import '../../assets/less/variable.less';
  .ReservoirDetailInspection {
    position: absolute;
    top: 0;
    right: 0;
    bottom: @footer-height;
    left: 0;
    overflow-y: auto;
    .detail {
      margin-bottom: 12px;
      background-color: white;
      .iconWrap {
        font-size: 16px;
        line-height: 60px;
        padding: 0 10px;
        position: relative;
        &:after { 
          content: " ";
          position: absolute;
          right: 0;
          left: 0;
          bottom: 0;
          height: 1px;
          border-bottom: 1px solid;
          -webkit-transform-origin: 0 100%;
          transform-origin: 0 100%;
          -webkit-transform: scaleY(0.5);
          transform: scaleY(0.5);
        }
      }
      .detail-content {
        padding: 10px 30px;
        li {
          display: inline-flex;
          width: 100%;
          line-height: 2;
          .name {
            color: #818080;
            white-space: nowrap;
            overflow-x: hidden;
            text-overflow: ellipsis;
            margin-right: 2em;
            //flex: 0 0 9em;
            em {
              font-style: normal;
            }
          }
          .content {
            flex: 1;
            color: @color-text;
          }
        }
      }
    }
  }
</style>