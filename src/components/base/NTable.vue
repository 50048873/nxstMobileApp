<template>
  <div>
    <h6>数据列表</h6>
    <table class="table">
      <thead>
        <tr>
          <th>{{thData.title1}}</th>
          <th v-html="thData.title2"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in standardTdData">
          <td><span class="date">{{item.date}}</span></td>
          <td>{{item.value}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {isArray} from '@/assets/js/util'
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
    standardTdData() {
      let tdData = this.tdData
      if (isArray(tdData) && tdData.length) {
        let res = []
        res.push(tdData[0])
        tdData.reduce((prev, cur, index) => {
          let obj = {}
          obj.value = cur.value
          if (prev.date.indexOf('-')) {
            let prevArr = prev.date.split('-'),
                curArr = cur.date.split('-'),
                prevY = prevArr[0],
                prevM = prevArr[1],
                curY = curArr[0],
                curM = curArr[1],
                curD = curArr[2]
            if (curY === prevY) {
              obj.date = `${curM}-${curD}`
            }
            if (curM === prevM) {
              obj.date = curD
            }
          } else {
            obj.date = cur.date
          }
          res.push(obj)
          return cur
        })
        return res
      }
      return tdData
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
  }
</style>