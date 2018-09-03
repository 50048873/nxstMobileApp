<template>
  <div class="ReservoirDetailMonitorRainfall">
    <highcharts-column title="降雨量" xTitleText="（日期）" yTitleText="(mm)" :data="tdData" ref="hcMonitorRainfall" v-if="tdData&&tdData.length"></highcharts-column>
    <no-data v-else></no-data>
    <n-table :thData="thData" :tdData="tdData"></n-table>
    <!-- <n-add right="20" :bottom="getBottomPosition(84)" iconClass="nxst-rgtb" @click="monitorAdd"></n-add> -->
    <n-add right="20" :bottom="getBottomPosition(20)" iconClass="nxst-filter" @click="showDialog"></n-add>
    <filter-dialog ref="filterDialog2" @confirm="filter"></filter-dialog>
  </div>
</template>

<script>
import HighchartsColumn from '@/components/base/HighchartsColumn'
import NTable from '@/components/base/NTable'
import FilterDialog from '@/components/reservoirOverview/ReservoirDetailMonitorRainfall/FilterDialog'
import api from '@/assets/js/api'
import {success} from '@/assets/js/config'
import {isArray, getSameDayOfPreMonth, get7DayOfcurrentDay, getPid, getLastDayOfMonth} from '@/assets/js/util'
import {dateFormat, getBottomPosition, monitorAdd} from '@/assets/js/mixin'
export default {
  name: 'ReservoirDetailMonitorRainfall',
  components: {
    NTable,
    HighchartsColumn,
    FilterDialog
  },
  mixins: [dateFormat, getBottomPosition, monitorAdd],
  data() {
    return {
      thData: {
        title1: '日期',
        title2: '降雨量（mm）'
      },
      tdData: [],

      type: '1',
      startTime: this.dateFormat(get7DayOfcurrentDay(), 'YYYY-MM-DD'),
      endTime: this.dateFormat(Date.now(), 'YYYY-MM-DD')
    }
  },
  methods: {
    showDialog() {
      this.$refs.filterDialog2.show()
    },
    filter(date) {
      this.type = date.type
      if (this.type === '2') {
        this.startTime = this.dateFormat(date.startTime, "YYYY-MM-DD")
        this.endTime = this.dateFormat(getLastDayOfMonth(date.endTime), "YYYY-MM-DD")
      } else if (this.type === '0' || this.type === '3') {
        this.startTime = this.dateFormat(date.startTime, "YYYY-MM-DD hh:mm:ss")
        this.endTime = this.dateFormat(date.endTime, "YYYY-MM-DD hh:mm:ss")
      } else if (this.type === '1') {
        this.startTime = date.startTime
        this.endTime = date.endTime
      }
      this.getReservoirDetailMonitor_rainfall()
        .then((res) => {
          if (!res.length) return
          this.$nextTick(() => {
            this.$refs.hcMonitorRainfall.draw()
          })
        })
    },
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
        pid:getPid(),
        type: this.type,
        startTime: this.startTime,
        endTime: this.endTime
      }
      return api.getReservoirDetailMonitor_rainfall(params)
        .then((res) => {
          if (res.status === success) {
            //console.log(JSON.stringify(res.data, null, 2))
            this.tdData = this.convert(res.data)
            return this.tdData
          } else {
            this.hint(res.msg)
          }
        }, (err) => {
          this.serverErrorTip(err, 'ReservoirDetailMonitorRainfall.vue')
        })
    }
  },
  beforeMount() {
    this.getReservoirDetailMonitor_rainfall()
  }
}
</script>

<style scoped lang="less">
  .ReservoirDetailMonitorRainfall {
    padding-bottom: 10px;
  }
</style>
