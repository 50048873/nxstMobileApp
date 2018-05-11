<template>
  <div v-show="tdData&&tdData.length">
    <h6>数据列表</h6>
    <table class="table">
      <thead>
        <tr>
          <th>{{thData.title1}}</th>
          <th v-html="thData.title2"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data">
          <td><span class="date" :class="{datetime: getDatetime}">{{item.date}}</span></td>
          <td :class="getRedClass(item.value)">{{item.value}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {isArray, standardDate} from '@/assets/js/util'
import {mapGetters} from 'vuex'
// let thData = {
//   title1: '月份',
//   title2: '供水量（万m<sup>3</sup>）'
// }
// let tdData = [
//   {
//     date: '1',
//     value: '340.00'
//   },
//   {
//     date: '2',
//     value: '340.00'
//   }
// ]
export default {
  name: 'NTable',
  props: {
    title: {
      type: String,
      default: '数据列表'
    },
    thData: {
      type: Object
    },
    tdData: {
      type: Array
    }
  },
  computed: {
    ...mapGetters(['warnConfig']),
    data() {
      return standardDate(this.tdData)
    },
    getDatetime() {
      let data = this.tdData,
          len = data?data.length:0,
          isDatetime = false
      for (let i = 0; i < len; i++) {
        let item = data[i]
        if (item.date.length > 10) {
          isDatetime = true
          break
        }
      }
      return isDatetime
    }
  },
  methods: {
    
    getRedClass(val) {
      /*
        * 1:小于value1
        * 2:大于value1
        * 3:小于value1或大于value2
      */
      if (this.warnConfig && this.warnConfig.confValue1) {
        let warnClass = 'c-red',
            value1 = this.warnConfig.confValue1,
            value2 = this.warnConfig.confValue2,
            confType = this.warnConfig.confType * 1
        switch (confType) {
          case 1:
            if (val < value1) {
              return warnClass
            }
          case 2:
            if (val > value1) {
              return warnClass
            }
          case 3:
            if (val < value1 || val > value2) {
              return warnClass
            }
        }
      }
      return ''
    }
  }
}
</script>

<style scoped lang="less">
  h6 {
    padding-left: 10px;
  }
  .table {
    width: 100%;
    text-align: center;
    background-color: white;
    th {
      background-color: #1b9ce4;
      width: 50%;
      color: white;
      line-height: 34px;
      border: 1px solid #d7d7d7;
      &:nth-child(2n + 1) {
        border-left: none;
      }
      &:nth-child(2n) {
        border-right: none;
      }
    }
    td {
      width: 50%;
      border: 1px solid #d7d7d7;
      line-height: 34px;
      &:nth-child(2n + 1) {
        border-left: none;
      }
      &:nth-child(2n) {
        border-right: none;
      }
    }
    .date {
      display: inline-block;
      width: 6em;
      text-align: right;
    }
    .datetime {
      display: inline-block;
      width: 8em;
      text-align: right;
    }
  }
</style>