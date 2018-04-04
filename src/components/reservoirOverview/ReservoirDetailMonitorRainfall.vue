<template>
  <div class="ReservoirDetailMonitorRainfall">
    <highcharts-column title="降水量过程图" xTitleText="（日期）" yTitleText="(mm)" :data="tdData" ref="hcMonitor" v-if="tdData.length"></highcharts-column>
    <n-table :thData="thData" :tdData="tdData"></n-table>
  </div>
</template>

<script>
import NTable from '@/components/base/NTable'
import HighchartsColumn from '@/components/base/HighchartsColumn'
import api from '@/assets/js/api'
import {success} from '@/assets/js/config'
import {isArray, getSameDayOfPreMonth} from '@/assets/js/util'
import {dateFormat} from '@/assets/js/mixin'
export default {
  name: 'ReservoirDetailMonitorRainfall',
  components: {
    NTable,
    HighchartsColumn
  },
  mixins: [dateFormat],
  data() {
    return {
      thData: {
        title1: '日期',
        title2: '降雨量（m）'
      },
      tdData: [],

      type: '1',
      startTime: this.dateFormat(getSameDayOfPreMonth(), 'yyyy-mm-dd'),
      endTime: this.dateFormat(new Date(), 'yyyy-mm-dd')
    }
  },
  methods: {
    convert(arr) {
      let res = []
      if (isArray(arr)) {
        arr.forEach((item) => {
          let obj = {}
          for (let key in item) {
            obj['date'] = item['tm']
            obj['value'] = item['drp']
          }
          res.push(obj)
        })
        return res
      }
      return arr
    },
    getReservoirDetailMonitor_rainfall() {
      let params = {
        pid: this.$route.query.pid,
        type: this.type,
        startTime: this.startTime,
        endTime: this.endTime
      }
      api.getReservoirDetailMonitor_rainfall(params)
        .then((res) => {
          if (res.status === success) {
            console.log(JSON.stringify(res.data, null, 2))
            this.tdData = this.convert(res.data)
          } else {
            this.hint(res.msg)
          }
        }, (err) => {
          this.serverErrorTip(err, 'ReservoirDetailMonitorRainfall.vue')
        })
    }
  },
  created() {
    this.getReservoirDetailMonitor_rainfall()
  }
}
</script>

<style scoped lang="less">
  .ReservoirDetailMonitorRainfall {
    padding-bottom: 10px;
  }
</style>