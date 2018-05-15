<template>
  <div class="highcharts-container line-top line-bottom"></div>
</template>

<script>
import Highcharts from 'highcharts/highstock';
import {getDataByKey} from '@/assets/js/mixin'
import {isArray, standardDate} from '@/assets/js/util'

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
    },
    maxScroll: {
      type: [String, Number],
      default: 10
    }
  },
  mixins: [getDataByKey],
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.draw()
  },
  methods: {
    draw() {
      let categories = this.getDataByKey(standardDate(this.data), 'date'),
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
              scrollbar: {
                enabled: categories.length <= this.maxScroll ? false : true
              },
              max: categories.length <= this.maxScroll ? categories.length - 1 : this.maxScroll - 1,
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
                color: '#1b9ce4'
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
      this.chart = new Highcharts.Chart(this.$el, options)
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