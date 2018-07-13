<template>
  <div class="ReservoirDetailInspectionTrail">
    <!-- <iframe style="width:100%;height:50%;" :src="this.getStaticPath('/static/ArcGisTest2.html')" frameborder="0"></iframe> -->
    <div id="mapView" class="mapContainer">
    </div>
    <div class="buttonarea">
        <div class="inspector">
            <h3 class="reservoirname">
                {{pname}}巡检
            </h3>
            <div class="personname">
                <span>巡检人：{{uname}}</span>
                <span>时间：{{protalTime}}</span>
            </div>
        </div>
    </div>
    <loading :show="loadshow" :text="loadtext"></loading>
  </div>
</template>

<script>
//import * as esriLoader from 'esri-loader';
import { Loading } from 'vux'
import {getStaticPath,getBottomPosition,dateFormat} from '@/assets/js/mixin'
import {markArr,checkArr} from '@/assets/js/test'
import {success} from '@/assets/js/config'
import  {getPid,getPname} from '@/assets/js/util'
import _ from 'lodash';
import api from '@/assets/js/api'
import { rejects } from 'assert';
export default {
  name:"ReservoirDetailInspectionTrail",
  data() {
    return {
        patrolList:null,
        locationArr:[],
        starttime:null,
        uname:"",
        protalTime:"",
        uid:"",
        pname:getPname(),
        currentdate:"",
        loadshow:true,
        loadtext:"加载中...",
        status:false,
        gpssuccess:false,
    }
  },
  components: {
    Loading
  },
  mixins: [getStaticPath,getBottomPosition,dateFormat],
  activated(){
      const that = this;
      this.uname = decodeURI(this.$route.query.uname);
      this.uid = this.$route.query.uid;
      this.protalTime = this.$route.query.protalTime;
      this.getProtalPointData();
      this.getProtalRecordData(this.uid,this.protalTime)
  },
  methods: {
    loadmap(){
        const that = this;
        const map = new AMap.Map('mapView', {
          zoom:6,
          mapStyle:'amap://styles/whitesmoke'
        });
        AMap.plugin(['AMap.ToolBar','AMap.Scale','AMap.Geolocation'],function(){
            map.addControl(new AMap.ToolBar({
                offset:new AMap.Pixel(10, 200)
            }));
            map.addControl(new AMap.Scale({
                visible:false
            }));
        });
        AMapUI.loadUI(['overlay/SimpleMarker','misc/PathSimplifier','overlay/SimpleInfoWindow'], function(SimpleMarker,PathSimplifier,SimpleInfoWindow) {
          if (!PathSimplifier.supportCanvas) {
                that.hint('当前环境不支持 Canvas！');
                that.initPage(SimpleMarker,null,map,SimpleInfoWindow);
          }else{
                that.initPage(SimpleMarker,PathSimplifier,map,SimpleInfoWindow);
          }
        });
    },
    getProtalPointData(){
        api.getReservoirDetailInspectionAdd_patrolPoint({pid:getPid()}).then((res)=>{
            if(res.status==1){
                this.patrolList = res.data;
            }else{
                this.hint(res.msg)
            }
          },(err)=>{
            this.hint("ReservoirDetailInspectionTrail")
        })
    },
    getProtalRecordData(uid,protalTime){
        api.getUserTrailRecord({pid:getPid(),userid:uid,startTime:`${protalTime} 00:00:00` ,endTime:`${protalTime} 23:59:59`}).then((res)=>{
            this.loadshow = false;
            if(res.status==1&&res.data.length>0){
                 this.locationArr = _.flatMap(res.data,function(item){
                    return new Array([item.lgtd,item.lttd])
                });
            }else{
                 this.locationArr = [];    
                 this.hint(res.msg)
            }
          },(err)=>{
                 this.loadshow = false;
                 this.hint("ReservoirDetailInspectionTrail")
          }).then(()=>{
           this.loadmap() 
        })
    },
    initPage(SimpleMarker,PathSimplifier=null,map,SimpleInfoWindow) {
        const that = this;
        this.patrolList?this.patrolList.forEach((mark,index) => {    //创建地图标记点
            return(
              new SimpleMarker({
                iconLabel:{
                  innerHTML: `<span>${index+1}</span>`, 
                    style: {
                        color: '#fff',
                        width:'8px',
                        height:'8px',
                        lineHeight:'8px',
                        fontSize:"10px"
                    }
                } ,
                clickable:true,
                iconTheme: 'numv1',
                iconStyle:'red',
                map: map,
                position: [mark.LGTD,mark.LTTD],
                zIndex:11
              }).on("click",function(){
                  new SimpleInfoWindow({
                    infoTitle:'巡检点',
                    infoBody: mark.PATROL_NAME,
                  }).open(map,[mark.LGTD,mark.LTTD]);
              })
            )
        }):null;
        if(PathSimplifier){
            const emptyLineStyle = {   //设置轨迹样式
                lineWidth: 2,
                fillStyle: "",
                strokeStyle: "yellow",
                borderStyle: "gray"
            };
            const pathSimplifierIns = new PathSimplifier({   //创建轨迹实例
                zIndex:10,
                map: map,
                autoSetFitView:true,
                getPath: function(pathData, pathIndex) {
                    return pathData.path;
                },
                renderOptions: {
                    pathLineStyle: emptyLineStyle,
                    pathLineSelectedStyle: emptyLineStyle,
                    pathLineHoverStyle: emptyLineStyle,
                    startPointStyle: {   //起点样式
                      radius:3,
                      fillStyle:"blue",
                      strokeStyle:"yellow",
                      lineWidth:0 
                    },
                    endPointStyle: {   //结束点样式
                      radius:4,
                      fillStyle:"purple",
                      strokeStyle:"",
                      lineWidth:4 
                    }
                }
            });
            pathSimplifierIns.setData([{
                name: 'test',
                path: this.locationArr
            }]);
            if(this.locationArr.length>0){ 
                const  navg1 = pathSimplifierIns.createPathNavigator(0, {
                    loop: true,
                    speed: 100,
                    pathNavigatorStyle: {
                        width: 8,
                        height: 8,
                        //使用图片
                        content:"circle",
                        strokeStyle:"blue",
                        fillStyle:"blue",
                        //经过路径的样式
                        pathLinePassedStyle: {
                            lineWidth: 4,
                            strokeStyle: 'red',
                            dirArrowStyle: {
                                stepSpace: 15,
                                strokeStyle: 'white'
                            }
                        }
                    }
                });
                navg1.start();
            }     
        }
    }
  }
}
</script>
<style lang="less" scoped>
  @import '../../assets/less/variable.less';
  .ReservoirDetailInspectionTrail {
        position: absolute;
        top: 0;
        bottom: @footer-height;
        width: 100%;
        overflow-y: auto;
        .mapContainer {
        position: relative;
        height: 100%;
        width: 100%;
        background-color:#fff;
    }
    .buttonarea{
      position: absolute;
      bottom:0;
      width: 100%;
      height:@footer-height;
      background-color: #edeff4;
      z-index: 999;
      text-align: right;
      .inspector{
          height: 100%;
          display: flex;
          flex-direction: column;
          align-content: center;
          justify-content: center;
          padding-right: 10px;
          .personname{
              color:#777d77;
          }
      }
    }
  }
  .scrollWrap {
    position: absolute;
    top: @tab-height;
    right: 0;
    bottom: @footer-height;
    left: 0;
    overflow-y: auto;
  }
        
 
</style>

