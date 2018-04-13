<template>
  <div>
    <ul class="ReservoirDetailInspection">
      <li class="line-bottom" v-for="item in ReservoirDetailInspection">
        <time class="title">{{item.CHECK_DATE | dateFormat('yyyy月mm月dd日')}}大坝巡检</time>
        <div class="content">
          <div class="status">
            <i :class="item.PATROL_STATE == 1 ? 'nxst-yc c-red' : 'nxst-zc c-1b9be3'"></i>
          </div>
          <p>
            <span>巡查时间：</span>
            <time>{{item.CHECK_DATE}}</time>
          </p>
          <p>
            <span>巡查结果：</span>
            <span>{{item.PATROL_INFO}}</span>
          </p>
        </div>
      </li>
    </ul>
    <no-data v-if="!this.ReservoirDetailInspection || !ReservoirDetailInspection.length"></no-data>
    <n-add bottom="82" left="18" @click="add"></n-add>
  </div>
</template>

<script>
import NAdd from '@/components/base/NAdd'
import api from '@/assets/js/api'
import {success} from '@/assets/js/config'
import {isArray, getSameDayOfPreMonth} from '@/assets/js/util'
import {dateFormat} from '@/assets/js/mixin'
export default {
  name: 'ReservoirDetailInspection',
  components: {
    NAdd
  },
  mixins: [dateFormat],
  data() {
    return {
      ReservoirDetailInspection: [],
      startDate: this.dateFormat(getSameDayOfPreMonth(), 'yyyy-mm-dd'),
      endDate: this.dateFormat(new Date(), 'yyyy-mm-dd')
    }
  },
  methods: {
    order(arr) {
      if (!isArray(arr)) return
      return arr.sort((a, b) => {
        return a.PATROL_STATE - b.PATROL_STATE
      })
    },
    getReservoirDetailInspection() {
      let params = {
        pid: this.$route.query.pid,
        startDate: this.startDate,
        endDate: this.endDate
      }
      api.getReservoirDetailInspection(params)
        .then((res) => {
          if (res.status === success) {
            this.ReservoirDetailInspection = res.data
            //console.log(JSON.stringify(this.ReservoirDetailInspection, null, 2))
          } else {
            this.hint(res.msg)
          }
        }, (err) => {
          this.serverErrorTip(err, 'ReservoirDetailInspection.vue')
        })
    },
    add() {
      //this.$destroy()
      this.$router.push({path: '/reservoirDetail/inspection/add', query: {pid: this.$route.query.pid}})
    }
  },
  beforeCreate(){
    //console.log('beforeCreate')
  },
  created() {
    //console.log('created')
    this.getReservoirDetailInspection()
  },
  beforeMount(){
    //console.log('beforeMount')
  },
  mounted(){
    //console.log('mounted')
  },
  beforeUpdate(){
    //console.log('beforeUpdate')
  },
  updated(){
    //console.log('updated')
  },
  activated(){
    //console.log(111,'activated')
    //this.$forceUpdate()
    this.getReservoirDetailInspection()
  },
  deactivated(){
    //console.log('deactivated')
  },
  beforeDestroy(){
    //console.log('beforeDestroy')
  },
  destroyed(){
    //console.log('destroyed')
  }

}
</script>

<style scoped lang="less">
  @import '../../assets/less/variable.less';
  .ReservoirDetailInspection {
    position: absolute;
    top: 0;
    right: 0;
    bottom: @footer-height;
    left: 0;
    overflow-y: auto;
    li {
      margin-bottom: 10px;
      .title {
        display: block;
        line-height: 32px;
        background-color: #d0eaf9;
        padding: 0 10px;
        font-weight: bold;
      }
      .content {
        position: relative;
        background-color: white;
        padding: 10px 70px 10px 10px;
        font-size: 12px;
        .status {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 10px;
          i {
            font-size: 44px;
          }
        }
        p {
          line-height: 2;
          padding-left: 5em;
          text-indent: -5em;
        }
      }
    }
  }
</style>