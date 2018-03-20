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
          credits: {
            enabled: false
          },
          title: {
              text: this.title,
              style: {fontSize: '14px'},
              y: 15
          },
          xAxis: {
              categories: ['01', '02', '03', '04', '05', '06', '07', '08'],
              title: {
                  text: this.xTitleText,
                  align: 'high'
              }
          },
          yAxis: {
            lineWidth: 1,
            tickWidth: 1,
            title: {
                text: this.yTitleText,
                align: 'high'
            }
          },
          legend: {
              enabled: false
          },
          /*plotOptions: {
              series: {
                  label: {
                      connectorAllowed: false
                  },
                  pointStart: 0 //设置x轴起始数
              }
          },*/
          series: [{
              name: '水位',
              data: [43, 52, 57, 69, 97, 119, 133, 154],
              color: '#c13430'
          }],
          responsive: {
              rules: [{
                  condition: {
                      maxWidth: 500
                  },
                  chartOptions: {
                      legend: {
                          layout: 'horizontal',
                          align: 'center',
                          verticalAlign: 'bottom'
                      }
                  }
              }]
          }
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