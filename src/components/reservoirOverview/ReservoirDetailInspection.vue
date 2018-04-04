<template>
  <div>
    <ul class="ReservoirDetailInspection">
      <li class="line-bottom" v-for="item in ReservoirDetailInspection">
        <time class="title">{{item.CHECK_DATE | dateFormat('yyyy月mm月dd日')}}</time>
        <div class="content">
          <div class="status">
            <i :class="item.PATROL_STATE === '1' ? 'nxst-zc c-1b9be3' : 'nxst-yc c-red'"></i>
          </div>
          <p>
            <span>巡查时间：</span>
            <time>{{item.CHECK_DATE}}</time>
          </p>
          <p>
            <span>巡查结果：</span>
            <span>{{item.PATROL_INFO}}</span>
          </p>
        </div>
      </li>
    </ul>
    <no-data v-if="!this.ReservoirDetailInspection || !ReservoirDetailInspection.length"></no-data>
    <n-add top="430" left="18" @add="add"></n-add>
  </div>
</template>

<script>
import NAdd from '@/components/base/NAdd'
import api from '@/assets/js/api'
import {success, documentTitle_reservoirDetail} from '@/assets/js/config'
import * as session from '@/assets/js/session'
import {isArray, getSameDayOfPreMonth} from '@/assets/js/util'
import {dateFormat} from '@/assets/js/mixin'
export default {
  name: 'ReservoirDetailInspection',
  components: {
    NAdd
  },
  mixins: [dateFormat],
  data() {
    return {
      ReservoirDetailInspection: [],
      startDate: this.dateFormat(getSameDayOfPreMonth(), 'yyyy-mm-dd'),
      endDate: this.dateFormat(new Date(), 'yyyy-mm-dd')
    }
  },
  methods: {
    order(arr) {
      if (!isArray(arr)) return
      return arr.sort((a, b) => {
        return a.PATROL_STATE - b.PATROL_STATE
      })
    },
    getReservoirDetailInspection() {
      let params = {
        pid: this.$route.query.pid,
        startDate: this.startDate,
        endDate: this.endDate
      }
      api.getReservoirDetailInspection(params)
        .then((res) => {
          if (res.status === success) {
            this.ReservoirDetailInspection = this.order(res.data)
          } else {
            this.hint(res.msg)
          }
        }, (err) => {
          this.serverErrorTip(err, 'ReservoirDetailInspection.vue')
        })
    },
    add() {
      this.$router.push({path: '/reservoirDetail/inspection/add', query: {pid: this.$route.query.pid}})
    }
  },
  created() {
    this.getReservoirDetailInspection()
    this.setDocumentTitle(session.getItem(documentTitle_reservoirDetail))
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
    li {
      margin-bottom: 10px;
      .title {
        display: block;
        line-height: 32px;
        background-color: #d0eaf9;
        padding: 0 10px;
        font-weight: bold;
      }
      .content {
        position: relative;
        background-color: white;
        padding: 10px 70px 10px 10px;
        font-size: 12px;
        .status {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 10px;
          i {
            font-size: 44px;
          }
        }
        p {
          line-height: 2;
          padding-left: 5em;
          text-indent: -5em;
        }
      }
    }
  }
</style>