<template>
  <div class="ReservoirDetailMonitorWaterquality">
    <div class="titleWrap">
      <h6>九参数水质检测</h6>
      <label for="szjcDate" class="dateWrap">
        <input class="weui-input" id="szjcDate" type="date" value="" v-model="meterDate">
        <i class="nxst-calendar"></i>
      </label>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>项目</th>
          <th>参考值</th>
          <th>测值</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>温度</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>溶解氧</td>
          <td>≥5mg/L</td>
          <td></td>
        </tr>
        <tr>
          <td>pH值</td>
          <td>6.0－9.0</td>
          <td></td>
        </tr>
        <tr>
          <td>总磷(以P计)</td>
          <td>≤0.2mg/L</td>
          <td></td>
        </tr>
        <tr>
          <td>高锰酸盐指数</td>
          <td>≤6mg/L</td>
          <td></td>
        </tr>
        <tr>
          <td>化学需氧量（COD）</td>
          <td>≤20mg/L</td>
          <td></td>
        </tr>
        <tr>
          <td>五日生化需氧量（BOD<sub>5</sub>）</td>
          <td>≤4mg/L</td>
          <td></td>
        </tr>
        <tr>
          <td>氨氮（NH<sub>3</sub>—N）</td>
          <td>≤1.0mg/L</td>
          <td></td>
        </tr>
        <tr>
          <td>总氮（以N计）</td>
          <td>≤1.0mg/L</td>
          <td></td>
        </tr>
        <tr>
          <td>铜</td>
          <td>≤1.0mg/L</td>
          <td></td>
        </tr>
        <tr>
          <td>锌</td>
          <td>≤1.0mg/L</td>
          <td></td>
        </tr>
        <tr>
          <td>氟化物</td>
          <td>≤1.0mg/L</td>
          <td></td>
        </tr>
        <tr>
          <td>硒</td>
          <td>≤0.01mg/L</td>
          <td></td>
        </tr>
        <tr>
          <td>砷</td>
          <td>≤0.05mg/L</td>
          <td></td>
        </tr>
        <tr>
          <td>汞</td>
          <td>≤0.0001mg/L</td>
          <td></td>
        </tr>
        <tr>
          <td>镉</td>
          <td>≤0.005mg/L</td>
          <td></td>
        </tr>
        <tr>
          <td>铬（六价）</td>
          <td>≤0.05mg/L</td>
          <td></td>
        </tr>
        <tr>
          <td>铅</td>
          <td>≤0.05mg/L</td>
          <td></td>
        </tr>
        <tr>
          <td>氰化物</td>
          <td>≤0.2mg/L</td>
          <td></td>
        </tr>
        <tr>
          <td>挥发酚</td>
          <td>≤0.005mg/L</td>
          <td></td>
        </tr>
        <tr>
          <td>石油类</td>
          <td>≤0.05mg/L</td>
          <td></td>
        </tr>
        <tr>
          <td>阴离子表面活性剂</td>
          <td>≤0.2mg/L</td>
          <td></td>
        </tr>
        <tr>
          <td>硫化物</td>
          <td>≤0.2mg/L</td>
          <td></td>
        </tr>
        <tr>
          <td>粪大肠菌群</td>
          <td>≤10000个/L</td>
          <td></td>
        </tr>
        <tr>
          <td>硫酸盐（以SO<sub>4</sub><sup>2-</sup>计）</td>
          <td>≤250mg/L</td>
          <td></td>
        </tr>
        <tr>
          <td>氯化物（以Cl<sup>-</sup>计）</td>
          <td>≤250mg/L</td>
          <td></td>
        </tr>
        <tr>
          <td>硝酸盐氮（以N计）</td>
          <td>2.2mg/L</td>
          <td></td>
        </tr>
        <tr>
          <td>铁</td>
          <td>≤0.3mg/L</td>
          <td></td>
        </tr>
        <tr>
          <td>锰</td>
          <td>≤0.1mg/L</td>
          <td></td>
        </tr>
        <tr>
          <td>百菌清</td>
          <td>≤0.01mg/L</td>
          <td></td>
        </tr>
        <tr>
          <td>三氯甲烷</td>
          <td>≤0.06mg/L</td>
          <td></td>
        </tr>
        <tr>
          <td>四氯化碳</td>
          <td>≤0.002mg/L</td>
          <td></td>
        </tr>
        <tr>
          <td>滴滴涕</td>
          <td>≤0.001mg/L</td>
          <td></td>
        </tr>
        <tr>
          <td>三溴甲烷</td>
          <td>≤0.1mg/L</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from '@/assets/js/api'
import {success} from '@/assets/js/config'
import {isArray, getSameDayOfPreMonth} from '@/assets/js/util'
import {dateFormat} from '@/assets/js/mixin'
export default {
  name: 'ReservoirDetailMonitorWaterquality',
  mixins: [dateFormat],
  data() {
    return {
      data: {},

      meterDate: this.dateFormat(getSameDayOfPreMonth(), 'yyyy-mm-dd'),
    }
  },
  methods: {
    getReservoirDetailMonitor_waterquality() {
      let params = {
        pid: this.$route.query.pid,
        meterDate: this.meterDate
      }
      api.getReservoirDetailMonitor_waterquality(params)
        .then((res) => {
          if (res.status === success) {
            console.log(JSON.stringify(res.data, null, 2))
            this.data = res.data
          } else {
            this.hint(res.msg)
          }
        }, (err) => {
          this.serverErrorTip(err, 'ReservoirDetailMonitorWaterquality.vue')
        })
    }
  },
  created() {
    this.getReservoirDetailMonitor_waterquality()
  }
}
</script>

<style scoped lang="less">
  @import '../../assets/less/variable.less';
  .ReservoirDetailMonitorWaterquality {
    padding: 10px;
    .titleWrap {
      display: flex;
      justify-content: space-between;
      padding-bottom: 10px;
      h6 {
        flex: 1;
      }
      .dateWrap {
        position: relative;
        display: block;
        flex: 0 0 1;
        color: #0b65c3;
        .weui-input {
          width: auto;
        }
        .nxst-calendar {
          position: absolute;
          top: 3px;
          right: 0;
        }
      }
    }
    
    .table {
      width: 100%;
      text-align: center;
      background-color: white;
      font-size: 12px;
      thead {
        tr {
          th {
            background-color: #99d6f5;
          }
        }
      }
      tr {
        th, td {
          border: 1px solid #d7d7d7;
          line-height: 32px;
        }
        th:first-child, td:first-child {
          position: relative;
          width: 14em;
          background-color: #1ca1e6;
          color: white;
          &:after {
            content: '';
            position: absolute;
            right: -1px;
            width: 3px;
            height: 100%;
            background-color: white;
          }
        }
        td:last-child {
          color: red;
        }
      }
    }
  }
</style>