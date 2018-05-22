<template>
  <div class="ReservoirDetailMonitorWaterquality">
    <div class="titleWrap">
      <h6>34参数水质检测</h6>
      <label for="szjcDate" class="dateWrap">
        <input class="weui-input" id="szjcDate" type="date"  v-model="meterDate">
        <span>{{dateFormat(meterDate,"LL")}}</span>
        <i class="nxst-calendar"></i>
      </label>
    </div>
    <table class="table" v-if="szInfo.wt">
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
          <td>{{szInfo.wt}}</td>
        </tr>
        <tr>
          <td>溶解氧</td>
          <td>≥5mg/L</td>
          <td :class="{'c-red': szInfo.dox < 5}">{{szInfo.dox}}</td>
        </tr>
        <tr>
          <td>pH值</td>
          <td>6.0－9.0</td>
          <td :class="{'c-red': szInfo.ph < 6 || szInfo.ph > 9}">{{szInfo.ph}}</td>
        </tr>
        <tr>
          <td>总磷(以P计)</td>
          <td>≤0.2mg/L</td>
          <td :class="{'c-red': szInfo.tp > 0.2}">{{szInfo.tp}}</td>
        </tr>
        <tr>
          <td>高锰酸盐指数</td>
          <td>≤6mg/L</td>
          <td :class="{'c-red': szInfo.codmn > 6}">{{szInfo.codmn}}</td>
        </tr>
        <tr>
          <td>化学需氧量（COD）</td>
          <td>≤20mg/L</td>
          <td :class="{'c-red': szInfo.condcr > 20}">{{szInfo.condcr}}</td>
        </tr>
        <tr>
          <td>
            <p>五日生化需氧量</p>
            <p>（BOD<sub>5</sub>）</p>
          </td>
          <td>≤4mg/L</td>
          <td :class="{'c-red': szInfo.bod5 > 4}">{{szInfo.bod5}}</td>
        </tr>
        <tr>
          <td>氨氮（NH<sub>3</sub>—N）</td>
          <td>≤1.0mg/L</td>
          <td :class="{'c-red': szInfo.nh3N > 1}">{{szInfo.nh3N}}</td>
        </tr>
        <tr>
          <td>总氮（以N计）</td>
          <td>≤1.0mg/L</td>
          <td :class="{'c-red': szInfo.tn > 1}">{{szInfo.tn}}</td>
        </tr>
        <tr>
          <td>铜</td>
          <td>≤1.0mg/L</td>
          <td :class="{'c-red': szInfo.cu > 1}">{{szInfo.cu}}</td>
        </tr>
        <tr>
          <td>锌</td>
          <td>≤1.0mg/L</td>
          <td :class="{'c-red': szInfo.zn > 1}">{{szInfo.zn}}</td>
        </tr>
        <tr>
          <td>氟化物</td>
          <td>≤1.0mg/L</td>
          <td :class="{'c-red': szInfo.f > 1}">{{szInfo.f}}</td>
        </tr>
        <tr>
          <td>硒</td>
          <td>≤0.01mg/L</td>
          <td :class="{'c-red': szInfo.se > 0.01}">{{szInfo.se}}</td>
        </tr>
        <tr>
          <td>砷</td>
          <td>≤0.05mg/L</td>
          <td :class="{'c-red': szInfo.ars > 0.05}">{{szInfo.ars}}</td>
        </tr>
        <tr>
          <td>汞</td>
          <td>≤0.0001mg/L</td>
          <td :class="{'c-red': szInfo.hg > 0.0001}">{{szInfo.hg}}</td>
        </tr>
        <tr>
          <td>镉</td>
          <td>≤0.005mg/L</td>
          <td :class="{'c-red': szInfo.cd > 0.005}">{{szInfo.cd}}</td>
        </tr>
        <tr>
          <td>铬（六价）</td>
          <td>≤0.05mg/L</td>
          <td :class="{'c-red': szInfo.cr6 > 0.05}">{{szInfo.cr6}}</td>
        </tr>
        <tr>
          <td>铅</td>
          <td>≤0.05mg/L</td>
          <td :class="{'c-red': szInfo.pb > 0.05}">{{szInfo.pb}}</td>
        </tr>
        <tr>
          <td>氰化物</td>
          <td>≤0.2mg/L</td>
          <td :class="{'c-red': szInfo.cn > 0.2}">{{szInfo.cn}}</td>
        </tr>
        <tr>
          <td>挥发酚</td>
          <td>≤0.005mg/L</td>
          <td :class="{'c-red': szInfo.vlph > 0.005}">{{szInfo.vlph}}</td>
        </tr>
        <tr>
          <td>石油类</td>
          <td>≤0.05mg/L</td>
          <td :class="{'c-red': szInfo.oil > 0.05}">{{szInfo.oil}}</td>
        </tr>
        <tr>
          <td>阴离子表面活性剂</td>
          <td>≤0.2mg/L</td>
          <td :class="{'c-red': szInfo.las > 0.2}">{{szInfo.las}}</td>
        </tr>
        <tr>
          <td>硫化物</td>
          <td>≤0.2mg/L</td>
          <td :class="{'c-red': szInfo.s2 > 0.2}">{{szInfo.s2}}</td>
        </tr>
        <tr>
          <td>粪大肠菌群</td>
          <td>≤10000个/L</td>
          <td :class="{'c-red': szInfo.fcg > 10000}">{{szInfo.fcg}}</td>
        </tr>
        <tr>
          <td>硫酸盐（以SO<sub>4</sub><sup>2-</sup>计）</td>
          <td>≤250mg/L</td>
          <td :class="{'c-red': szInfo.so4 > 250}">{{szInfo.so4}}</td>
        </tr>
        <tr>
          <td>氯化物（以Cl<sup>-</sup>计）</td>
          <td>≤250mg/L</td>
          <td :class="{'c-red': szInfo.cl > 250}">{{szInfo.cl}}</td>
        </tr>
        <tr>
          <td>硝酸盐氮（以N计）</td>
          <td>2.2mg/L</td>
          <td :class="{'c-red': szInfo.no3 > 2.2}">{{szInfo.no3}}</td>
        </tr>
        <tr>
          <td>铁</td>
          <td>≤0.3mg/L</td>
          <td :class="{'c-red': szInfo.fe > 0.3}">{{szInfo.fe}}</td>
        </tr>
        <tr>
          <td>锰</td>
          <td>≤0.1mg/L</td>
          <td :class="{'c-red': szInfo.mn > 0.1}">{{szInfo.mn}}</td>
        </tr>
        <tr>
          <td>百菌清</td>
          <td>≤0.01mg/L</td>
          <td :class="{'c-red': szInfo.bjq > 0.01}">{{szInfo.bjq}}</td>
        </tr>
        <tr>
          <td>三氯甲烷</td>
          <td>≤0.06mg/L</td>
          <td :class="{'c-red': szInfo.sljw > 0.06}">{{szInfo.sljw}}</td>
        </tr>
        <tr>
          <td>四氯化碳</td>
          <td>≤0.002mg/L</td>
          <td :class="{'c-red': szInfo.silht > 0.002}">{{szInfo.silht}}</td>
        </tr>
        <tr>
          <td>滴滴涕</td>
          <td>≤0.001mg/L</td>
          <td :class="{'c-red': szInfo.ddt > 0.001}">{{szInfo.ddt}}</td>
        </tr>
        <tr>
          <td>三溴甲烷</td>
          <td>≤0.1mg/L</td>
          <td :class="{'c-red': szInfo.sxjw > 0.1}">{{szInfo.sxjw}}</td>
        </tr>
      </tbody>
    </table>
    <!-- <n-add right="20" :bottom="getBottomPosition(84)" iconClass="nxst-rgtb" @click="monitorAdd"></n-add> -->
    <n-add right="20" :bottom="getBottomPosition(20)" iconClass="nxst-filter" @click="showDialog"></n-add>
    <filter-dialog ref="filterDialog3" @confirm="filter"></filter-dialog>
  </div>
</template>

<script>
import FilterDialog from '@/components/reservoirOverview/ReservoirDetailMonitorWaterquality/FilterDialog'
import api from '@/assets/js/api'
import {success, defaultTextByNoData} from '@/assets/js/config'
import {isArray, getSameDayOfPreMonth} from '@/assets/js/util'
import {dateFormat, getBottomPosition, monitorAdd} from '@/assets/js/mixin'
const szInfo = {
        wt: defaultTextByNoData,
        dox: defaultTextByNoData,
        ph: defaultTextByNoData,
        tp: defaultTextByNoData,
        codmn: defaultTextByNoData,
        condcr: defaultTextByNoData,
        bod5: defaultTextByNoData,
        nh3N: defaultTextByNoData,
        tn: defaultTextByNoData,
        cu: defaultTextByNoData,
        zn: defaultTextByNoData,
        f: defaultTextByNoData,
        se: defaultTextByNoData,
        ars: defaultTextByNoData,
        hg: defaultTextByNoData,
        cd: defaultTextByNoData,
        cr6: defaultTextByNoData,
        pb: defaultTextByNoData,
        cn: defaultTextByNoData,
        vlph: defaultTextByNoData,
        oil: defaultTextByNoData,
        las: defaultTextByNoData,
        s2: defaultTextByNoData,
        fcg: defaultTextByNoData,
        so4: defaultTextByNoData,
        cl: defaultTextByNoData,
        no3: defaultTextByNoData,
        fe: defaultTextByNoData,
        mn: defaultTextByNoData,
        bjq: defaultTextByNoData,
        sljw: defaultTextByNoData,
        silht: defaultTextByNoData,
        ddt: defaultTextByNoData,
        sxjw: defaultTextByNoData
      }
export default {
  name: 'ReservoirDetailMonitorWaterquality',
  components: {
    FilterDialog
  },
  mixins: [dateFormat, getBottomPosition, monitorAdd],
  data() {
    return {
      szInfo: {},

      meterDate: this.dateFormat(new Date(), 'YYYY-MM-DD hh:mm:ss'),
    }
  },
  methods: {
    showDialog() {
      this.$refs.filterDialog3.show()
    },
    filter(date) {
      this.meterDate = date.meterDate
    },
    getReservoirDetailMonitor_waterquality() {
      let params = {
        pid: this.$route.query.pid,
        meterDate: this.meterDate
      }
      return api.getReservoirDetailMonitor_waterquality(params)
        .then((res) => {
          if (res.status === success) {
            //console.log(JSON.stringify(res.data.szInfo, null, 2))
            if (res.data && res.data.szInfo) {
              this.szInfo = res.data.szInfo
            } else {
              this.szInfo = szInfo
            }
          } else {
            this.hint(res.msg)
          }
        }, (err) => {
          this.serverErrorTip(err, 'ReservoirDetailMonitorWaterquality.vue')
        })
    }
  },
  created() {
    this.getReservoirDetailMonitor_waterquality();
  },
  watch: {
    meterDate(newVal, oldVal) {
      this.meterDate = this.dateFormat(newVal, 'YYYY-MM-DD hh:mm:ss')
      this.getReservoirDetailMonitor_waterquality()
    }
  }
}
</script>

<style scoped lang="less">
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
        span{
          padding-right: 20px;
        }
        .weui-input {
          width: auto;
          opacity: 0;
          position: absolute;
          right: 0;
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
          th:nth-child(2), th:nth-child(3) {
            width: 28%;
          }
        }
      }
      tr {
        td {
          p {
            line-height: 1.5;
          }
        }
        th, td {
          border: 1px solid #d7d7d7;
          padding: 6px 0;
        }
        th:first-child, td:first-child {
          position: relative;
          background-color: #1ca1e6;
          color: white;
          &:after {
            content: '';
            position: absolute;
            top: 0;
            right: -1px;
            width: 3px;
            height: 100%;
            background-color: white;
          }
        }
      }
    }
  }
</style>