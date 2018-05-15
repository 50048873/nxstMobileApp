<template>
  <div class="highcharts-container line-top line-bottom"></div>
</template>

<script>
import Highcharts from 'highcharts/highstock';
import {isArray, standardDate} from '@/assets/js/util'
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
    this.draw();
  },
  methods: {
    draw() {
      let categories = this.getDataByKey(standardDate(this.data), 'date'),
          data = this.getDataByKey(this.data, 'value')
      let options = {
            chart: {
                type: 'column'
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
                min: 0,
                lineWidth: 1,
                tickWidth: 1,
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
                useHTML: true,
                valueSuffix: this.yTitleText
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
                name: this.title,
                data: data
            }]
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