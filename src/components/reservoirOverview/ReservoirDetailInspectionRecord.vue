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
    <n-gbtn left="20" :bottom="getBottomPosition(20)" iconClass="nxst-path"  content="" @click="toPatrolPath"></n-gbtn>
    <!-- <n-add left="20" v-if="isAdd" :bottom="getBottomPosition(84)"   @click="add"></n-add> -->
    
  </div>
</template>

<script>
import api from '@/assets/js/api'
import {success, documentTitle_reservoirDetail} from '@/assets/js/config'
import {isArray, getSameDayOfPreMonth,getPid} from '@/assets/js/util'
import {dateFormat, getBottomPosition} from '@/assets/js/mixin'
import * as session from '@/assets/js/session'
export default {
  name: 'ReservoirDetailInspection',
  mixins: [dateFormat, getBottomPosition],
  data() {
    return {
      ReservoirDetailInspection: [],
      startDate: this.dateFormat(getSameDayOfPreMonth(), 'yyyy-mm-dd'),
      endDate: this.dateFormat(new Date(), 'yyyy-mm-dd'),
      isAdd:true,
    }
  },
  beforeMount(){
    this.getAddAuth()
  },
  methods: {
    getAddAuth(){
      api.getUserAuthInfo({id:"402881d162d65a7c0162d68715110061",flag:2,pid:getPid()}).then(res=>{
        if(res.status === success){
          if(!res.data) return
          this.isAdd = res.data.length>0?true:false
        }else{
          this.hint(res.mes)
        }
      },err=>{
         this.serverErrorTip(err, 'ReservoirDetailInspectionAdd.vue')
      })
    },
    order(arr) {
      if (!isArray(arr)) return
      return arr.sort((a, b) => {
        return a.PATROL_STATE - b.PATROL_STATE
      })
    },
    getReservoirDetailInspection() {
      let params = {
        pid:getPid(),
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
    toPatrolPath() {
      this.$router.push({path: '/reservoirDetail/inspection/patrolPath', query: {pid:getPid()}})
    }
  },
  created() {
    this.getReservoirDetailInspection()
  },
  activated(){
    this.getReservoirDetailInspection()
  },
  watch: {  
    '$route'(to, from)  {  
      let toPath = to.path
      if (toPath === "/reservoirDetail/inspection") {
        let documentTitle = session.getItem(documentTitle_reservoirDetail)
        documentTitle && this.setDocumentTitle(documentTitle)
      }
    }  
  }
}
</script>

<style scoped lang="less">
  @import '../../assets/less/variable.less';
  .ReservoirDetailInspection {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    padding: 10px;
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
