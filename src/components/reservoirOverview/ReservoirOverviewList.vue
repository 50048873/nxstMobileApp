<template>
  <div>
    <better-scroll class="n-list" v-if="reservoirList.length">
      <ul>
        <li v-for="item in reservoirList" @click="showDetail(item.id)">
          <div class="top line-top line-bottom">
            <div class="thumbnail" v-lazy:background-image="item.icon"></div>
            <div class="des">
              <h3 class="ellipsis">{{item.name}}</h3>
              <div class="des-content">
                <p class="ellipsis">
                  <span>库容：</span>
                  <em class="em">{{item.kr}}<sup>3</sup></em>
                </p>
                <p class="ellipsis">
                  <span>当前水位：</span>
                  <em class="em">{{item.dqsw}}m</em>
                </p>
                <p class="ellipsis">
                  <span>工程规模：</span>
                  <span>{{item.gcgm}}</span>
                </p>
                <div class="status">
                  <i :class="item.status ? 'nxst-zc' : 'nxst-yc'"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="date line-bottom">
            <span>最近一次巡查：</span>
            <time>{{item.date}}</time>
          </div>
        </li>
        <li></li>
      </ul>
    </better-scroll>
    <n-loading v-if="!reservoirList.length"></n-loading>
  </div>
</template>

<script>
import NLoading from '@/components/base/NLoading/NLoading'
import api from '@/assets/js/api'
import {success} from '@/assets/js/config'
import BetterScroll from '@/components/base/BetterScroll'
export default {
  name: 'ReservoirOverviewList',
  components: {
    BetterScroll,
    NLoading
  },
  data() {
    return {
      reservoirList: []
    }
  },
  methods: {
    getReservoirList() {
      api.getReservoirList()
        .then((res) => {
          if (res.status === success) {
            this.reservoirList = res.data
          }
        }, (err) => {
          this.serverErrorTip(err, 'ReservoirOverviewList.vue')
        })
    },
    showDetail(id) {
      this.$router.push({path: '/reservoirDetail', query: {id}})
    }
  },
  created() {
      this.getReservoirList()
  }
}
</script>

<style scoped lang="less">
  @import '../../assets/less/tool.less';
  .n-list {
    position: absolute;
    top: 108px;
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
              sup {
                vertical-align: -4px;
              }
            }
            .des-content {
              position: relative;
              em {
                color: #ff8a00;
                font-style: normal;
              }
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