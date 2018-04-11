<template>
  <div class="ReservoirDetailMonitorWatersupply">
    <highcharts-column title="供水量过程图" xTitleText="（月份）" yTitleText="（万m<sup>3</sup>）" :data="tdData" ref="hcMonitorWatersupply" v-if="tdData.length"></highcharts-column>
    <n-table :thData="thData" :tdData="tdData"></n-table>
    <n-add right="20" :bottom="getBottomPosition(84)" iconClass="nxst-rgtb" @click="monitorAdd"></n-add>
    <n-add right="20" :bottom="getBottomPosition(20)" iconClass="nxst-filter" @click="showDialog"></n-add>
    <filter-dialog ref="filterDialog4" @confirm="filter"></filter-dialog>
  </div>
</template>

<script>
import NTable from '@/components/base/NTable'
import HighchartsColumn from '@/components/base/HighchartsColumn'
import NAdd from '@/components/base/NAdd'
import FilterDialog from '@/components/reservoirOverview/ReservoirDetailMonitorWatersupply/FilterDialog'
import api from '@/assets/js/api'
import {success} from '@/assets/js/config'
import {isArray, getSameDayOfPreMonth} from '@/assets/js/util'
import {dateFormat, getBottomPosition, monitorAdd} from '@/assets/js/mixin'

export default {
  name: 'ReservoirDetailMonitorWatersupply',
  components: {
    NTable,
    HighchartsColumn,
    NAdd,
    FilterDialog
  },
  mixins: [dateFormat, getBottomPosition, monitorAdd],
  data() {
    return {
      thData: {
        title1: '月份',
        title2: '供水量（万m<sup>3</sup>）'
      },
      tdData: [],

      type: '2',
      startTime: this.dateFormat(getSameDayOfPreMonth(), 'yyyy-mm-dd'),
      endTime: this.dateFormat(new Date(), 'yyyy-mm-dd')
    }
  },
  methods: {
    showDialog() {
      this.$refs.filterDialog4.show()
    },
    filter(date) {
      this.type = date.type,
      this.startTime = date.startTime
      this.endTime = date.endTime
      this.getReservoirDetailMonitor_watersupply()
        .then((res) => {
          if (!res) return
          this.$nextTick(() => {
            this.$refs.hcMonitorWatersupply.draw()
          })
        })
    },
    convert(arr) {
      let res = []
      if (isArray(arr)) {
        arr.forEach((item) => {
          let obj = {}
          for (let key in item) {
            obj['date'] = item['recordTime']
            obj['value'] = item['gsl']
          }
          res.push(obj)
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
      return api.getReservoirDetailMonitor_watersupply(params)
        .then((res) => {
          if (res.status === success) {
            //console.log(JSON.stringify(res.data, null, 2))
            this.tdData = this.convert(res.data)
            return this.tdData
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