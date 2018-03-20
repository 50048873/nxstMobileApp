<template>
  <div class="ReservoirDetailMonitorWaterlevel">
    <highcharts-line title="水位过程线" xTitleText="（日期）" yTitleText="(m)" ref="hcMonitor"></highcharts-line>
    <n-table :thData="thData" :tdData="tdData"></n-table>
    <n-add top="430" left="18" iconClass="fa fa-filter" @add="add"></n-add>
    <n-dialog ref="filterDialog" @confirm="filter"></n-dialog>
  </div>
</template>

<script>
import NTable from '@/components/base/NTable'
import HighchartsLine from '@/components/base/HighchartsLine'
import NAdd from '@/components/base/NAdd'
import NDialog from '@/components/base/NDialog'
import $ from 'jquery'
export default {
  name: 'ReservoirDetailMonitorWaterlevel',
  components: {
    NTable,
    HighchartsLine,
    NAdd,
    NDialog
  },
  data() {
    return {
      thData: {
        title1: '日期',
        title2: '水位（m）'
      },
      tdData: [
        {
          date: '2017-12-25',
          value: '101.00'
        },
        {
          date: '2017-12-26',
          value: '102.00'
        }
      ],
      date: ''
    }
  },
  methods: {
    add() {
      this.$refs.filterDialog.show()
    },
    filter(date) {
      console.log(date)
    }
  }
}
</script>

<style scoped lang="less">
  .ReservoirDetailMonitorWaterlevel {
    padding-bottom: 10px; 
  }
</style>