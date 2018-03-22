<template>
  <div class="ReservoirDetailMonitorRainfall">
    <highcharts-column title="降水量过程图" xTitleText="（日期）" yTitleText="(mm)" ref="hcMonitor"></highcharts-column>
    <n-table :thData="thData" :tdData="tdData"></n-table>
  </div>
</template>

<script>
import NTable from '@/components/base/NTable'
import HighchartsColumn from '@/components/base/HighchartsColumn'
export default {
  name: 'ReservoirDetailMonitorRainfall',
  components: {
    NTable,
    HighchartsColumn
  },
  data() {
    return {
      thData: {
        title1: '日期',
        title2: '降雨量（m）'
      },
      tdData: [
        {
          date: '2017-12-25',
          value: '10.50'
        },
        {
          date: '2017-12-26',
          value: '2.00'
        }
      ]
    }
  }/*,
  mounted() {
    this.$refs.hcMonitor.chart.series[0].update({
      color: 'lime'
    });
  }*/
}
</script>

<style scoped lang="less">
  .ReservoirDetailMonitorRainfall {
    padding-bottom: 10px;
  }
</style>