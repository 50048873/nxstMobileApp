<template>
  <div class="ReservoirDetailMonitorWatersupply">
    <highcharts-column title="供水量过程图" xTitleText="（月份）" yTitleText="（万m<sup>3</sup>）" ref="hcMonitor"></highcharts-column>
    <n-table :thData="thData" :tdData="tdData"></n-table>
  </div>
</template>

<script>
import NTable from '@/components/base/NTable'
import HighchartsColumn from '@/components/base/HighchartsColumn'
import api from '@/assets/js/api'
import {success, documentTitle_reservoirDetail} from '@/assets/js/config'
import {isArray, getFirstDayOfMonth} from '@/assets/js/util'
import {dateFormat} from '@/assets/js/mixin'

export default {
  name: 'ReservoirDetailMonitorWatersupply',
  components: {
    NTable,
    HighchartsColumn
  },
  mixins: [dateFormat],
  data() {
    return {
      thData: {
        title1: '月份',
        title2: '供水量（万m<sup>3</sup>）'
      },
      tdData: [
        {
          date: '1',
          value: '340.00'
        },
        {
          date: '2',
          value: '340.20'
        }
      ],

      type: '1',
      startTime: this.dateFormat(getFirstDayOfMonth(), 'yyyy-mm-dd'),
      endTime: this.dateFormat(new Date(), 'yyyy-mm-dd')
    }
  },
  methods: {
    convert(arr) {
      let res = []
      if (isArray(arr)) {
        arr.forEach((item) => {
          for (let key in item) {
            let obj = {}
            if (key === 'recordTime') {
              obj[date] = item[key]
            }
            if (key === 'gsl') {
              obj[value] = item[key]
            }
            res.push(obj)
          }
        })
        return res
      }
      return arr
    },
    getReservoirDetailMonitor_watersupply() {
      let params = {
        pid: this.$route.query.pid,
        type: this.type,
        startTime: this.startTime,
        endTime: this.endTime
      }
      api.getReservoirDetailMonitor_watersupply(params)
        .then((res) => {
          if (res.status === success) {
            this.tdData = this.convert(res.data)
            console.log(JSON.stringify(res.data, null, 2))
          } else {
            this.hint(res.msg)
          }
        }, (err) => {
          this.serverErrorTip(err, 'ReservoirDetailMonitorWatersupply.vue')
        })
    }
  },
  created() {
    this.getReservoirDetailMonitor_watersupply()
  }/*,
  mounted() {
    this.$refs.hcMonitor.chart.series[0].update({
      color: 'red'
    });
  }*/
}
</script>

<style scoped lang="less">
  .ReservoirDetailMonitorWatersupply {
    padding-bottom: 10px;
    .hc-waterlevel {
      margin: 10px 0;
    }
  }
</style>