<template>
  <div class="ReservoirDetailMonitorWaterlevel">
    <highcharts-line title="水位过程线" xTitleText="（日期）" yTitleText="(m)" :data="tdData" ref="hcMonitor" v-if="tdData.length"></highcharts-line>
    <n-table :thData="thData" :tdData="tdData"></n-table>
    <n-add top="430" left="18" iconClass="nxst-filter" @add="add"></n-add>
    <n-dialog ref="filterDialog" @confirm="filter"></n-dialog>
  </div>
</template>

<script>
import NTable from '@/components/base/NTable'
import HighchartsLine from '@/components/base/HighchartsLine'
import NAdd from '@/components/base/NAdd'
import NDialog from '@/components/base/NDialog'
import $ from 'jquery'
import api from '@/assets/js/api'
import {success} from '@/assets/js/config'
import {isArray, getSameDayOfPreMonth} from '@/assets/js/util'
import {dateFormat} from '@/assets/js/mixin'
export default {
  name: 'ReservoirDetailMonitorWaterlevel',
  components: {
    NTable,
    HighchartsLine,
    NAdd,
    NDialog
  },
  mixins: [dateFormat],
  data() {
    return {
      thData: {
        title1: '日期',
        title2: '水位（m）'
      },
      tdData: [],
      date: '',
      startTime: this.dateFormat(getSameDayOfPreMonth(), 'yyyy-mm-dd'),
      endTime: this.dateFormat(new Date(), 'yyyy-mm-dd')
    }
  },
  methods: {
    add() {
      this.$refs.filterDialog.show()
    },
    filter(date) {
      console.log(date)
    },
    convert(arr) {
      let res = []
      if (isArray(arr)) {
        arr.forEach((item) => {
          let obj = {}
          for (let key in item) {
            obj['date'] = item['tm']
            obj['value'] = item['z']
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
      api.getReservoirDetailMonitor_waterlevel(params)
        .then((res) => {
          if (res.status === success) {
            //console.log(JSON.stringify(res.data, null, 2))
            this.tdData = this.convert(res.data)
          } else {
            this.hint(res.msg)
          }
        }, (err) => {
          this.serverErrorTip(err, 'ReservoirDetailMonitorWaterlevel.vue')
        })
    }
  },
  created() {
    this.getReservoirDetailMonitor_waterlevel()
  }
}
</script>

<style scoped lang="less">
  .ReservoirDetailMonitorWaterlevel {
    padding-bottom: 10px; 
  }
</style>