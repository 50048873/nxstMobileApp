<template>
  <div>
    <better-scroll class="n-list" v-if="reservoirList&&reservoirList.length">
      <ul>
        <li v-for="item in reservoirList" @click="showDetail(item.pid)">
          <div class="top line-top line-bottom">
            <div class="thumbnail" v-lazy:background-image="item.icon"></div>
            <div class="des">
              <h3 class="ellipsis">{{item.ennm}} {{item.gcgm}}</h3>
              <div class="des-content">
                <p class="ellipsis">
                  <span>总库容：</span>
                  <span>{{item.ttst}}m<sup>3</sup></span>
                </p>
                <p class="ellipsis">
                  <span>当前蓄水量：</span>
                  <span>{{item.w}}</span>
                </p>
                <p class="ellipsis">
                  <span>当前水位：</span>
                  <span :class="{'c-red': item.status == 2}">{{item.z}}m</span>
                </p>
                <div class="status">
                  <i :class="item.status == 2 ? 'nxst-yc c-red' : 'nxst-zc c-1b9be3'"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="date line-bottom">
            <span>最近一次巡检：</span>
            <time>{{item.lastcheckdate | dateFormat}}</time>
          </div>
        </li>
        <li></li>
      </ul>
    </better-scroll>
    <no-data v-else></no-data>
  </div>
</template>

<script>
import api from '@/assets/js/api'
import {success} from '@/assets/js/config'
import {setPid} from '@/assets/js/util'
import BetterScroll from '@/components/base/BetterScroll'
import {dateFormat, gcgmFilter, getWarnConfig} from '@/assets/js/mixin'
import {mapGetters, mapMutations} from 'vuex'
import {SET_WARNCONFIG} from '@/store/mutation-types'
export default {
  name: 'ReservoirOverviewList',
  components: {
    BetterScroll
  },
  mixins: [dateFormat, gcgmFilter, getWarnConfig],
  computed: {
    ...mapGetters(['reservoirList'])
  },
  methods: {
    ...mapMutations([SET_WARNCONFIG]),
    showDetail(pid) {
      this.getWarnConfig({pid});
      setPid(pid);
      this.$router.push({path: '/reservoirDetail', query: {pid}})
    },
    getGcgm(val) {
      if (val) {
        return `（${this.gcgmFilter(val)}）`
      }
      return ''
    }
  }
}
</script>

<style scoped lang="less">
  .n-list {
    position: absolute;
    top: 38px;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    ul {
      li {
        margin-top: 10px;
        background-color: white;
        &:last-child {
          height: 10px;
          background-color: transparent;
        }
        .top {
          display: flex;
          padding: 10px;
          .thumbnail {
            flex: 0 0 108px;
            height: 74px;
            background-color: #f0f0f0;
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
          }
          .des {
            flex: 1;
            overflow-x: hidden;
            margin-left: 10px;
            h3 {
              font-weight: bold;
              margin-top: -2px;
            }
            p {
              padding-right: 46px;
            }
            .des-content {
              position: relative;
              .status {
                position: absolute;
                top: 50%;
                right: 0;
                transform: translateY(-50%);
                i {
                  font-size: 44px;
                }
              }
            }
          }
        }
        .date {
          padding: 5px 10px;
        }
      }
    }
  }
</style>