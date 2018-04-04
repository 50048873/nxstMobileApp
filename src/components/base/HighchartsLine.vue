<template>
  <div class="highcharts-container line-top line-bottom"></div>
</template>

<script>
import Highcharts from 'highcharts/highstock';
import {getDataByKey} from '@/assets/js/mixin'

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
    data: {
      type: Array,
      required: true
    }
  },
  mixins: [getDataByKey],
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
      let categories = this.getDataByKey(this.data, 'date'),
          data = this.getDataByKey(this.data, 'value')
      let options = {
            credits: {
              enabled: false
            },
            title: {
                text: this.title,
                style: {fontSize: '14px'},
                y: 15
            },
            xAxis: {
                categories: categories,
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
                data: data,
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
      this.chart = new Highcharts.Chart(this.$el, options);
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