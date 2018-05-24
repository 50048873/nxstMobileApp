<template>
  <div>
    <ul v-if="reservoirDetailInspectionRecord" class="ReservoirDetailInspectionRecord">
      <li class="line-bottom"  v-for="(item,index) in reservoirDetailInspectionRecord" :key="index">
        <time class="title">{{item.patrolDate+ " "+ item.checkDateShow}}</time>
        <div class="content" :style="item.patrolInfo.length>80?'height:120px;overflow:hidden':'height:auto'" :id="'content-'+index">
          <p>
            <span>巡检人员：</span>
            <time>{{item.personName}}</time>
            <router-link style="float:right"  :to="{path:'trail',query:{uid:item.personId,uname:encodeURI(item.personName),protalTime:item.patrolDate}}">
              查看巡检轨迹
            </router-link>
          </p>
          <p>
            <span>巡检状态：</span>
            <time>{{item.patrolState?'异常':'正常'}}</time>
          </p>
          <p>
            <span>巡检结果：</span>
            <span>{{item.patrolInfo}}</span>
          </p>
          <div v-if="item.patrolInfo.length>80" class="loaderMore" @touchstart="loaderMore(index,$event)">查看更多</div>
        </div>
      </li>
    </ul>
    <filter-dialog  ref="filterDialog5" @confirm="filter"></filter-dialog>
    <no-data v-if="!this.reservoirDetailInspectionRecord || !reservoirDetailInspectionRecord.length"></no-data>
    <n-gbtn left="20" :bottom="getBottomPosition(20)" iconClass="nxst-path"  content="" @click="toPatrolPath"></n-gbtn>
    <n-add right="20" :bottom="getBottomPosition(20)" iconClass="nxst-filter" @click="showDialogRecord"></n-add>
    
  </div>
</template>

<script>
import api from '@/assets/js/api'
import {success, documentTitle_reservoirDetail} from '@/assets/js/config'
import $ from 'jquery'
import {isArray, get7DayOfcurrentDay,getSameDayOfPreMonth,getPid} from '@/assets/js/util'
import {dateFormat, getBottomPosition,monitorAdd} from '@/assets/js/mixin'
import FilterDialog from '@/components/base/NFilterDialog'
import * as session from '@/assets/js/session'
export default {
  name: 'ReservoirDetailInspectionRecord',
  components:{
    FilterDialog
  },
  mixins: [dateFormat, getBottomPosition,monitorAdd],
  data() {
    return {
      ReservoirDetailInspection: [],
      startDate: this.dateFormat(get7DayOfcurrentDay(), 'YYYY-MM-DD'),
      endDate: this.dateFormat(new Date(), 'YYYY-MM-DD'),
      dateStart:this.dateFormat(getSameDayOfPreMonth(),'YYYY-MM-DD hh:mm:ss'),
      dateEnd:this.dateFormat(new Date(),'YYYY-MM-DD hh:mm:ss'),
      isAdd:true,
      isShow:false,
      reservoirDetailInspectionRecord:null
    }
  },
  beforeMount(){
    this.getAddAuth()
  },
  methods: {
    showDialogRecord() {
        this.$refs.filterDialog5.show()
    },
    filter(date) {
      this.dateStart = date.startTime,
      this.dateEnd = date.endTime
      this.getRecordByPeriod({
        pid:getPid(),
        startDate: date.startTime,
        endDate: date.endTime
      })
    },
    loaderMore(index,e){
      $("#content-"+index).css({
        "height":"auto",
        "overflow":"auto"
      })
      $(e.target).hide()
    },
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
    // getReservoirDetailInspection(param) {
    //   let params = param||{
    //     pid:getPid(),
    //     startDate: this.startDate,
    //     endDate: this.endDate
    //   }
    //   api.getReservoirDetailInspection(params)
    //     .then((res) => {
    //       if (res.status === success) {
    //         this.ReservoirDetailInspection = res.data
    //         //console.log(JSON.stringify(this.ReservoirDetailInspection, null, 2))
    //       } else {
    //         this.hint(res.msg)
    //       }
    //     }, (err) => {
    //       this.serverErrorTip(err, 'ReservoirDetailInspectionRecord.vue')
    //     })
    // },
    getRecordByPeriod(param){
      let params = param||{
        pid:getPid(),
        startDate: this.dateStart,
        endDate: this.dateEnd
      }
      api.getRecordByPeriod(params).then((res)=>{
          if(res.status===success){
            this.reservoirDetailInspectionRecord = res.data
          }else{
            this.hint(res.msg)
          }
      },(err)=>{
          this.serverErrorTip(err, 'ReservoirDetailInspectionRecord.vue')
      })
    },
    toPatrolPath() {
      this.$router.push({path: '/reservoirDetail/inspection/patrolPath', query: {pid:getPid()}})
    }
  },
  created() {
    //this.getReservoirDetailInspection()
    this.getRecordByPeriod()
  },
  activated(){
    //this.getReservoirDetailInspection()
    this.getRecordByPeriod()
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
  .ReservoirDetailInspectionRecord {
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
        padding: 10px;
        font-size: 12px;
        .loaderMore{
          background: linear-gradient(to bottom,rgba(255,255,255,0.8),rgba(255, 255, 255, 1));
          position: absolute;
          bottom:0;
          left: 0;
          width: 100%;
          box-sizing: border-box;
          padding: 16px 10px;
          text-align: center;
          color: #0085ff;
        }
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
