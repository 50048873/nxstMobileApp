<template>
  <div class="ReservoirDetailMonitorWatersupply">
    <highcharts-column title="供水量过程图" xTitleText="（月份）" yTitleText="（万m<sup>3</sup>）" ref="hcMonitor"></highcharts-column>
    <n-table :thData="thData" :tdData="tdData"></n-table>
  </div>
</template>

<script>
import NTable from '@/components/base/NTable'
import HighchartsColumn from '@/components/base/HighchartsColumn'

export default {
  name: 'ReservoirDetailMonitorWatersupply',
  components: {
    NTable,
    HighchartsColumn
  },
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
      ]
    }
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