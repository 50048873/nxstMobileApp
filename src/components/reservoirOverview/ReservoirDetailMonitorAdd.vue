<template>
  <div>
  <iframe style="display:none" name="prevent" ></iframe>
  <form target="prevent" class="ReservoirDetailMonitorAdd" ref="monitorAdd">
    <ul class="others">
      <li class="line-bottom">
        <label class="label" for="z">水位</label>
        <div class="inputBox">
          <input type="text" v-validate="'realNumber'" oninput="setCustomValidity('')" oninvalid="setCustomValidity('数据格式不正确！')"  :pattern="pattern"  id="z" name="z" placeholder="请输入水位值(m)" v-model="form.z">
        </div>
      </li>
      <li class="line-bottom">
        <h6 class="h6">时间</h6>
        <div class="inputBox">
          <label class="dateLabel" for="zTime">{{form.zTime}}</label>
          <input class="date"  type="date" id="zTime" name="zTime" v-model="form.zTime">
          <span class="arrow-r"></span>
        </div>
      </li>
      <li class="line-bottom line-top divide">
        <label class="label" for="drp">雨量</label>
        <div class="inputBox">
          <input type="text" v-validate="'realNumber'" oninput="setCustomValidity('')" oninvalid="setCustomValidity('数据格式不正确！')" :pattern="pattern" id="drp" name="drp" placeholder="请输入雨量值(mm)" v-model="form.drp">
        </div>
      </li>
      <li class="line-bottom">
        <h6 class="h6">时间</h6>
        <div class="inputBox">
          <label class="dateLabel" for="drpTime">{{form.drpTime}}</label>
          <input class="date" type="date" id="drpTime" name="drpTime" v-model="form.drpTime">
          <span class="arrow-r"></span>
        </div>
      </li>
      <li class="line-bottom line-top divide">
        <label class="label" for="gsl">供水量</label>
        <div class="inputBox">
          <input type="text" v-validate="'realNumber'" oninput="setCustomValidity('')" oninvalid="setCustomValidity('数据格式不正确！')" :pattern="pattern" id="gsl" name="gsl" placeholder="请输入供水量值(m³)" v-model="form.gsl">
        </div>
      </li>
      <li class="line-bottom">
        <h6 class="h6">时间</h6>
        <div class="inputBox">
          <label class="dateLabel" for="gslTime">{{form.gslTime}}</label>
          <input class="date" type="date" id="gslTime" name="gslTime" v-model="form.gslTime">
          <span class="arrow-r"></span>
        </div>
      </li>
      <li class="line-bottom line-top divide">
        <label class="label" for="origdata">渗流量</label>
        <div class="inputBox">
          <input type="text" v-validate="'realNumber'" oninput="setCustomValidity('')" oninvalid="setCustomValidity('数据格式不正确！')" :pattern="pattern" id="origdata" name="origdata" placeholder="565(L/s )" v-model="form.origdata">
        </div>
      </li>
      <li class="line-bottom">
        <h6 class="h6">时间</h6>
        <div class="inputBox">
          <label class="dateLabel" for="slTime">{{form.slTime}}</label>
          <input class="date" type="date" id="slTime" name="slTime" v-model="form.slTime">
          <span class="arrow-r"></span>
        </div>
      </li>
    </ul>
    <h6 class="title">水质34参数</h6>
    <ul class="quality">
      <li class="line-bottom">
        <h6 class="h6">测量日期</h6>
        <div class="inputBox">
          <label class="dateLabel" for="meterDate">{{form.quality.meterDate}}</label>
          <input class="date" type="date" id="meterDate" name="meterDate" v-model="form.quality.meterDate">
          <span class="arrow-r"></span>
        </div>
      </li>
      <li class="line-bottom line-top">
        <label class="label" for="wt">温度</label>
        <div class="inputBox">
          <input type="text" v-validate="'realNumber'" oninput="setCustomValidity('')" oninvalid="setCustomValidity('数据格式不正确！')" :pattern="pattern" id="wt" name="wt" placeholder="℃" v-model="form.quality.wt">
        </div>
      </li>
      <li class="line-bottom">
        <label class="label" for="dox">溶解氧</label>
        <div class="inputBox">
          <input type="text" v-validate="'realNumber'" oninput="setCustomValidity('')" oninvalid="setCustomValidity('数据格式不正确！')" :pattern="pattern" id="dox" name="dox" placeholder="≥5mg/L" v-model="form.quality.dox">
        </div>
      </li>
      <li class="line-bottom">
        <label class="label" for="ph">pH值</label>
        <div class="inputBox">
          <input type="text" v-validate="'realNumber'" oninput="setCustomValidity('')" oninvalid="setCustomValidity('数据格式不正确！')" :pattern="pattern" id="ph" name="ph" placeholder="6.0－9.0" v-model="form.quality.ph">
        </div>
      </li>
      <li class="line-bottom">
        <label class="label" for="tp">总磷(以P计)</label>
        <div class="inputBox">
          <input type="text" v-validate="'realNumber'" oninput="setCustomValidity('')" oninvalid="setCustomValidity('数据格式不正确！')" :pattern="pattern" id="tp" name="tp" placeholder="≤0.2mg/L" v-model="form.quality.tp">
        </div>
      </li>
      <li class="line-bottom">
        <label class="label" for="codmn">高锰酸盐指数</label>
        <div class="inputBox">
          <input type="text" v-validate="'realNumber'" oninput="setCustomValidity('')" oninvalid="setCustomValidity('数据格式不正确！')" :pattern="pattern" id="codmn" name="codmn" placeholder="≤6mg/L" v-model="form.quality.codmn">
        </div>
      </li>
      <li class="line-bottom">
        <label class="label" for="condcr">化学需氧量（COD）</label>
        <div class="inputBox">
          <input type="text" v-validate="'realNumber'" oninput="setCustomValidity('')" oninvalid="setCustomValidity('数据格式不正确！')" :pattern="pattern" id="condcr" name="condcr" placeholder="≤20mg/L" v-model="form.quality.condcr">
        </div>
      </li>
      <li class="line-bottom">
        <label class="label" for="bod5">五日生化需氧量（BOD<sub>5</sub>）</label>
        <div class="inputBox">
          <input type="text" v-validate="'realNumber'" oninput="setCustomValidity('')" oninvalid="setCustomValidity('数据格式不正确！')" :pattern="pattern" id="bod5" name="bod5" placeholder="≤4mg/L" v-model="form.quality.bod5">
        </div>
      </li>
      <li class="line-bottom">
        <label class="label" for="nh3N">氨氮（NH<sub>3</sub>—N）</label>
        <div class="inputBox">
          <input type="text" v-validate="'realNumber'" oninput="setCustomValidity('')" oninvalid="setCustomValidity('数据格式不正确！')" :pattern="pattern" id="nh3N" name="nh3N" placeholder="≤1.0mg/L" v-model="form.quality.nh3N">
        </div>
      </li>
      <li class="line-bottom">
        <label class="label" for="tn">总氮（以N计）</label>
        <div class="inputBox">
          <input type="text" v-validate="'realNumber'" oninput="setCustomValidity('')" oninvalid="setCustomValidity('数据格式不正确！')" :pattern="pattern" id="tn" name="tn" placeholder="≤1.0mg/L" v-model="form.quality.tn">
        </div>
      </li>
      <li class="line-bottom">
        <label class="label" for="cu">铜</label>
        <div class="inputBox">
          <input type="text" v-validate="'realNumber'" oninput="setCustomValidity('')" oninvalid="setCustomValidity('数据格式不正确！')" :pattern="pattern" id="cu" name="cu" placeholder="≤1.0mg/L" v-model="form.quality.cu">
        </div>
      </li>
      <li class="line-bottom">
        <label class="label" for="zn">锌</label>
        <div class="inputBox">
          <input type="text" v-validate="'realNumber'" oninput="setCustomValidity('')" oninvalid="setCustomValidity('数据格式不正确！')" :pattern="pattern" id="zn" name="zn" placeholder="≤1.0mg/L" v-model="form.quality.zn">
        </div>
      </li>
      <li class="line-bottom">
        <label class="label" for="f">氟化物</label>
        <div class="inputBox">
          <input type="text" v-validate="'realNumber'" oninput="setCustomValidity('')" oninvalid="setCustomValidity('数据格式不正确！')" :pattern="pattern" id="f" name="f" placeholder="≤1.0mg/L" v-model="form.quality.f">
        </div>
      </li>
      <li class="line-bottom">
        <label class="label" for="se">硒</label>
        <div class="inputBox">
          <input type="text" v-validate="'realNumber'" oninput="setCustomValidity('')" oninvalid="setCustomValidity('数据格式不正确！')" :pattern="pattern" id="se" name="se" placeholder="≤0.01mg/L" v-model="form.quality.se">
        </div>
      </li>
      <li class="line-bottom">
        <label class="label" for="ars">砷</label>
        <div class="inputBox">
          <input type="text" v-validate="'realNumber'" oninput="setCustomValidity('')" oninvalid="setCustomValidity('数据格式不正确！')" :pattern="pattern" id="ars" name="ars" placeholder="≤0.05mg/L" v-model="form.quality.ars">
        </div>
      </li>
      <li class="line-bottom">
        <label class="label" for="hg">汞</label>
        <div class="inputBox">
          <input type="text" v-validate="'realNumber'" oninput="setCustomValidity('')" oninvalid="setCustomValidity('数据格式不正确！')" :pattern="pattern" id="hg" name="hg" placeholder="≤0.0001mg/L" v-model="form.quality.hg">
        </div>
      </li>
      <li class="line-bottom">
        <label class="label" for="cd">镉</label>
        <div class="inputBox">
          <input type="text" v-validate="'realNumber'" oninput="setCustomValidity('')" oninvalid="setCustomValidity('数据格式不正确！')" :pattern="pattern" id="cd" name="cd" placeholder="≤0.005mg/L" v-model="form.quality.cd">
        </div>
      </li>
      <li class="line-bottom">
        <label class="label" for="cr6">铬（六价）</label>
        <div class="inputBox">
          <input type="text" v-validate="'realNumber'" oninput="setCustomValidity('')" oninvalid="setCustomValidity('数据格式不正确！')" :pattern="pattern" id="cr6" name="cr6" placeholder="≤0.05mg/L" v-model="form.quality.cr6">
        </div>
      </li>
      <li class="line-bottom">
        <label class="label" for="pb">铅</label>
        <div class="inputBox">
          <input type="text" v-validate="'realNumber'" oninput="setCustomValidity('')" oninvalid="setCustomValidity('数据格式不正确！')" :pattern="pattern" id="pb" name="pb" placeholder="≤0.05mg/L" v-model="form.quality.pb">
        </div>
      </li>
      <li class="line-bottom">
        <label class="label" for="cn">氰化物</label>
        <div class="inputBox">
          <input type="text" v-validate="'realNumber'" oninput="setCustomValidity('')" oninvalid="setCustomValidity('数据格式不正确！')" :pattern="pattern" id="cn" name="cn" placeholder="≤0.2mg/L" v-model="form.quality.cn">
        </div>
      </li>
      <li class="line-bottom">
        <label class="label" for="vlph">挥发酚</label>
        <div class="inputBox">
          <input type="text" v-validate="'realNumber'" oninput="setCustomValidity('')" oninvalid="setCustomValidity('数据格式不正确！')" :pattern="pattern" id="vlph" name="vlph" placeholder="≤0.005mg/L" v-model="form.quality.vlph">
        </div>
      </li>
      <li class="line-bottom">
        <label class="label" for="oil">石油类</label>
        <div class="inputBox">
          <input type="text" v-validate="'realNumber'" oninput="setCustomValidity('')" oninvalid="setCustomValidity('数据格式不正确！')" :pattern="pattern" id="oil" name="oil" placeholder="≤0.05mg/L" v-model="form.quality.oil">
        </div>
      </li>
      <li class="line-bottom">
        <label class="label" for="las">阴离子表面活性剂</label>
        <div class="inputBox">
          <input type="text" v-validate="'realNumber'" oninput="setCustomValidity('')" oninvalid="setCustomValidity('数据格式不正确！')" :pattern="pattern" id="las" name="las" placeholder="≤0.2mg/L" v-model="form.quality.las">
        </div>
      </li>
      <li class="line-bottom">
        <label class="label" for="s2">硫化物</label>
        <div class="inputBox">
          <input type="text" v-validate="'realNumber'" oninput="setCustomValidity('')" oninvalid="setCustomValidity('数据格式不正确！')" :pattern="pattern" id="s2" name="s2" placeholder="≤0.2mg/L" v-model="form.quality.s2">
        </div>
      </li>
      <li class="line-bottom">
        <label class="label" for="fcg">粪大肠菌群</label>
        <div class="inputBox">
          <input type="text" v-validate="'realNumber'" oninput="setCustomValidity('')" oninvalid="setCustomValidity('数据格式不正确！')" :pattern="pattern" id="fcg" name="fcg" placeholder="≤10000个/L" v-model="form.quality.fcg">
        </div>
      </li>
      <li class="line-bottom">
        <label class="label" for="so4">硫酸盐（以SO<sub>4</sub><sup>2-</sup>计）</label>
        <div class="inputBox">
          <input type="text" v-validate="'realNumber'" oninput="setCustomValidity('')" oninvalid="setCustomValidity('数据格式不正确！')" :pattern="pattern" id="so4" name="so4" placeholder="≤250mg/L" v-model="form.quality.so4">
        </div>
      </li>
      <li class="line-bottom">
        <label class="label" for="cl">氯化物（以Cl<sup>-</sup>计）</label>
        <div class="inputBox">
          <input type="text" v-validate="'realNumber'" oninput="setCustomValidity('')" oninvalid="setCustomValidity('数据格式不正确！')" :pattern="pattern" id="cl" name="cl" placeholder="≤250mg/L" v-model="form.quality.cl">
        </div>
      </li>
      <li class="line-bottom">
        <label class="label" for="no3">硝酸盐氮（以N计）</label>
        <div class="inputBox">
          <input type="text" v-validate="'realNumber'" oninput="setCustomValidity('')" oninvalid="setCustomValidity('数据格式不正确！')" :pattern="pattern" id="no3" name="no3" placeholder="2.2mg/L" v-model="form.quality.no3">
        </div>
      </li>
      <li class="line-bottom">
        <label class="label" for="fe">铁</label>
        <div class="inputBox">
          <input type="text" v-validate="'realNumber'" oninput="setCustomValidity('')" oninvalid="setCustomValidity('数据格式不正确！')" :pattern="pattern" id="fe" name="fe" placeholder="≤0.3mg/L" v-model="form.quality.fe">
        </div>
      </li>
      <li class="line-bottom">
        <label class="label" for="mn">锰</label>
        <div class="inputBox">
          <input type="text" v-validate="'realNumber'" oninput="setCustomValidity('')" oninvalid="setCustomValidity('数据格式不正确！')" :pattern="pattern" id="mn" name="mn" placeholder="≤0.1mg/L" v-model="form.quality.mn">
        </div>
      </li>
      <li class="line-bottom">
        <label class="label" for="bjq">百菌清</label>
        <div class="inputBox">
          <input type="text" v-validate="'realNumber'" oninput="setCustomValidity('')" oninvalid="setCustomValidity('数据格式不正确！')" :pattern="pattern" id="bjq" name="bjq" placeholder="≤0.01mg/L" v-model="form.quality.bjq">
        </div>
      </li>
      <li class="line-bottom">
        <label class="label" for="sljw">三氯甲烷</label>
        <div class="inputBox">
          <input type="text" v-validate="'realNumber'" oninput="setCustomValidity('')" oninvalid="setCustomValidity('数据格式不正确！')" :pattern="pattern" id="sljw" name="sljw" placeholder="≤0.06mg/L" v-model="form.quality.sljw">
        </div>
      </li>
      <li class="line-bottom">
        <label class="label" for="silht">四氯化碳</label>
        <div class="inputBox">
          <input type="text" v-validate="'realNumber'" oninput="setCustomValidity('')" oninvalid="setCustomValidity('数据格式不正确！')" :pattern="pattern" id="silht" name="silht" placeholder="≤0.002mg/L" v-model="form.quality.silht">
        </div>
      </li>
      <li class="line-bottom">
        <label class="label" for="ddt">滴滴涕</label>
        <div class="inputBox">
          <input type="text" v-validate="'realNumber'" oninput="setCustomValidity('')" oninvalid="setCustomValidity('数据格式不正确！')" :pattern="pattern" id="ddt" name="ddt" placeholder="≤0.001mg/L" v-model="form.quality.ddt">
        </div>
      </li>
      <li class="line-bottom">
        <label class="label" for="sxjw">三溴甲烷</label>
        <div class="inputBox">
          <input type="text"  v-validate="'realNumber'" oninput="setCustomValidity('')" oninvalid="setCustomValidity('数据格式不正确！')" :pattern="pattern" id="sxjw" name="sxjw" placeholder="≤0.1mg/L" v-model="form.quality.sxjw">
        </div>
      </li>
    </ul>
    <div class="submitWrap">
      <input type="submit" v-bind:class="[isSubmitting?'btn btn-off':'btn btn-on']" :disabled="isSubmitting" :name='[isSubmitting?"提交中...":"提交"]' @click="submit">
    </div>
  </form>
  </div>
</template>

<script>
import {dateFormat} from '@/assets/js/mixin'
import {getUuid} from '@/assets/js/util'
import $ from 'jquery'
import api from '@/assets/js/api'
import {success} from '@/assets/js/config'
export default {
  name: 'ReservoirDetailMonitorAdd',
  mixins: [dateFormat],
  data() {
    return {
      isSubmitting:false,
      title:"数据格式不正确",
      pattern:"^([0-9])+(\.[0-9]+)?$",
      form: {
        pid: getUuid(32, 16),
        z: "",
        zTime: this.dateFormat(new Date(), 'yyyy-mm-dd'),
        drp: "",
        drpTime: this.dateFormat(new Date(), 'yyyy-mm-dd'),
        gsl: "",
        gslTime: this.dateFormat(new Date(), 'yyyy-mm-dd'),
        origdata: "",
        slTime: this.dateFormat(new Date(), 'yyyy-mm-dd'),
        quality: {
          wt: "",
          ph: "",
          dox: "",
          tp: "",
          tn: "",
          nh3N: "",
          condcr: "",
          bod5: "",
          cu: "",
          zn: "",
          f: "",
          se: "",
          ars: "",
          hg: "",
          cd: "",
          cr6: "",
          pb: "",
          cn: "",
          vlph: "",
          oil: "",
          las: "",
          s2: "",
          fcg: "",
          so4: "",
          cl: "",
          no3: "",
          fe: "",
          mn: "",
          bjq: "",
          sljw: "",
          silht: "",
          ddt: "",
          sxjw: "",
          meterDate: this.dateFormat(new Date(), 'yyyy-mm-dd'),
          codmn: ""
        }
      }
    }
  },
  methods: {
    intoView() {
      let monitorAdd = this.$refs.monitorAdd
      $(monitorAdd).on('click', 'li', function(e) {
        this.scrollIntoView()
      })
    },
    getReservoirDetailMonitorAdd() {
       this.$validator.validateAll().then((result) => {
        if (!result) {
          this.isSubmitting = false;
          return
        }else{
          return api.getReservoirDetailMonitorAdd(this.form)
        .then((res) => {
          if (res.status === success) {
            this.isSubmitting = false;
            this.$router.back()
          } else {
            this.hint(res.msg)
            this.isSubmitting = false;
          }
        }, (err) => {
          this.serverErrorTip(err, 'ReservoirDetailMonitorAdd.vue');
           this.isSubmitting = false;
        })
        }
      });
      
    },
    submit() {
      this.isSubmitting = true;
      this.getReservoirDetailMonitorAdd()
    }
  },
  created() {
    this.setDocumentTitle('人工填报')
  },
  mounted() {
    this.intoView()
  }
}
</script>

<style scoped lang="less">
  @import '../../assets/less/variable.less';
  .ReservoirDetailMonitorAdd {
    //position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9;
    background-color: @color-background;
    ul {
      li {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        background-color: white;
        .label {
          padding-right: 1em;
        }
        .inputBox {
         flex: 1;
         text-align: right;
         .dateLabel {
          display: inline-block;
          width: 90%;
         }
         .date {
          display: inline-block;
          width: 0;
          height: 0;
          overflow: hidden;
         }
         input {
          width: 100%;
          text-align: right;
         }
         .arrow-r {
          padding-left: 10px;
         }
        }
        &.divide {
          margin-top: 5px;
        }
      }
    }
    // .others {
    //   .inputBox {
    //     overflow-x: hidden;
    //     input[type="date"] {
    //       position: relative;
    //       right: -25px;
    //     }
    //     .arrow-r {
    //       &:after {
    //         right: 4px;
    //       }
    //     }
    //   }
    // }
    .quality {
      input {
        width: 100%;
      }
    }
    .title {
      line-height: 32px;
      text-indent: 10px;
    }
    .submitWrap {
      margin-right: 10px;
      margin-left: 10px;
    }
  }
</style>