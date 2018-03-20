<template>
  <div class="highcharts-container line-top line-bottom"></div>
</template>

<script>
import Highcharts from 'highcharts/highstock';

export default {
  name: 'HighchartsColumn',
  props: {
    title: {
      type: String,
      required: true
    },
    yTitleText: {
      type: String,
      required: true
    },
    xTitleText: {
      type: String,
      required: true
    },
    options: {
      type: Object,
      default() {
        return {
          chart: {
              type: 'column'
          },
          title: {
              text: this.title,
              style: {fontSize: '14px'},
              y: 15
          },
          xAxis: {
              categories: ['01', '02', '03', '04', '05'],
              title: {
                  text: this.xTitleText,
                  align: 'high'
              }
          },
          yAxis: {
              min: 0,
              title: {
                  text: this.yTitleText,
                  useHTML: true,
                  align: 'high',
                  //rotation: 0,
                  //y: -10,
                  //offset: 0
              },
              labels: {
                  overflow: 'justify'
              }
          },
          legend: {
            enabled: false
          },
          tooltip: {
              valueSuffix: 'mm'
          },
          plotOptions: {
              bar: {
                  dataLabels: {
                      enabled: true
                  }
              }
          },
          credits: {
              enabled: false
          },
          series: [{
              name: '雨量',
              data: [107, 31, 35, 203, 12]
          }]
        }
      }
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      this.chart = new Highcharts.Chart(this.$el, this.options);
    }
  }
}
</script>

<style scoped lang="less">
  .highcharts-container {
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>