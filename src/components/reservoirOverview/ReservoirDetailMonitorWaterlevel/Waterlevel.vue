<template>
  <div class="ReservoirDetailMonitorWaterlevel">
    <highcharts-line title="水位过程线" xTitleText="（日期）" yTitleText="(m)" :data="tdData" ref="hcMonitorWaterlevel" v-if="tdData&&tdData.length"></highcharts-line>
    <no-data v-else></no-data>
    <n-table :thData="thData" :tdData="tdData"></n-table>
    <!-- <n-add right="20" :bottom="getBottomPosition(84)" iconClass="nxst-rgtb" @click="monitorAdd"></n-add> -->
    <n-add right="20" :bottom="getBottomPosition(20)" iconClass="nxst-filter" @click="showDialog"></n-add>
    <filter-dialog ref="filterDialog1" @confirm="filter"></filter-dialog>
  </div>
</template>

<script>
import NTable from '@/components/base/NTable'
import HighchartsLine from '@/components/base/HighchartsLine'
import FilterDialog from '@/components/reservoirOverview/ReservoirDetailMonitorWaterlevel/FilterDialog'
import $ from 'jquery'
import api from '@/assets/js/api'
import {success} from '@/assets/js/config'
import {isArray, getSameDayOfPreMonth} from '@/assets/js/util'
import {dateFormat, getBottomPosition, monitorAdd} from '@/assets/js/mixin'
//import * as session from '@/assets/js/session'
//import {documentTitle_reservoirDetail} from '@/assets/js/config'
export default {
  name: 'ReservoirDetailMonitorWaterlevel',
  components: {
    NTable,
    HighchartsLine,
    FilterDialog
  },
  mixins: [dateFormat, getBottomPosition, monitorAdd],
  data() {
    return {
      thData: {
        title1: '日期',
        title2: '水位（m）'
      },
      tdData: [],
      startTime: this.dateFormat(getSameDayOfPreMonth(), 'YYYY-MM-DD'),
      endTime: this.dateFormat(new Date(), 'YYYY-MM-DD')
    }
  },
  methods: {
    showDialog() {
      this.$refs.filterDialog1.show()
    },
    filter(date) {
      this.startTime = date.startTime,
      this.endTime = date.endTime
      this.getReservoirDetailMonitor_waterlevel()
        .then((res) => {
          if (!res.length) return
          this.$nextTick(() => {
            this.$refs.hcMonitorWaterlevel.draw()
          })
        })
    },
    convert(arr) {
      let res = []
      if (isArray(arr)) {
        arr.forEach((item) => {
          let obj = {}
          for (let key in item) {
            obj['date'] = item['curDate']
            obj['value'] = item['avgz']
          }
          res.push(obj)
        })
        return res
      }
      return arr
    },
    getReservoirDetailMonitor_waterlevel() {
      let params = {
        pid: this.$route.query.pid,
        startTime: this.startTime,
        endTime: this.endTime
      }
      return api.getReservoirDetailMonitor_waterlevel(params)
        .then((res) => {
          if (res.status === success) {
            //console.log(JSON.stringify(res.data, null, 2))
            this.tdData = this.convert(res.data)
            return this.tdData
          } else {
            this.hint(res.msg)
          }
        }, (err) => {
          this.serverErrorTip(err, 'ReservoirDetailMonitorWaterlevel.vue')
        })
    }
  },
  beforeMount() {
    this.getReservoirDetailMonitor_waterlevel()
  }
}
</script>

<style scoped lang="less">
  .ReservoirDetailMonitorWaterlevel {
    padding-bottom: 10px; 
  }
</style>