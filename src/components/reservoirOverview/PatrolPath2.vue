<template>
  <div class="PatrolPath">
    <!-- <iframe style="width:100%;height:50%;" :src="this.getStaticPath('/static/ArcGisTest2.html')" frameborder="0"></iframe> -->
    <div id="mapView" class="mapContainer">
    </div>
    <poupe :status="status&&overinfo?true:false">
      <div class="poupecontent">
        <div class="poupehead">
          <img :src="require('../../assets/img/lock.png')" alt="">
          <div>
            <div>巡检完成!</div>
            <div>用时
                <span style="color:#ffa99e">{{overinfo.usetime?overinfo.usetime.minutes:""}}</span>分
                <span style="color:#ffa99e">{{overinfo.usetime?overinfo.usetime.second:""}}</span>秒钟
            </div>
          </div>
        </div>
       <div class="poupecenter">
         <p><span style="color:#9c9c9c">开始时间：</span><br/>{{overinfo.starttime}}</p>
         <p><span style="color:#9c9c9c">结束时间：</span><br/>{{overinfo.endtime}}</p>
       </div>
       <div class="poupebottom" @click="handleClose">关闭</div>
      </div>
    </poupe>
    <div class="buttonarea">
        <div v-if="isAdd&&isstart==1" class="addbtn">
            <i  @click="add" class="nxst-add"></i>
        </div>
        <div v-if="isAdd&&!gpsshow&&gpssuccess" class="startbtn"   @touchstart="handleMapTrail">
             <div class="loadingContainer" ref="loadingContainer">
                 <div ref="loading" class="cssload-ball"> 
             </div>
                
            </div>
            <div  class="btncontent">
                    <span class="status">{{isstart===1?"结束巡检":"开始巡检"}}</span>
                    <span class="time">{{minutes>0?(`${minutes}:${second}`):second}}</span>
            </div>
        </div>
        <div class="inspector">
                <h3 class="reservoirname">
                    {{pname}}巡检
                </h3>
                <div class="personname">
                    <span>巡检人：{{username}}</span>
                    <span>时间：{{currentdate}}</span>
                </div>
        </div>
    </div>
    <loading :show="gpsshow"  :text="gpstext"></loading>
  </div>
</template>

<script>
//import * as esriLoader from 'esri-loader';
import { Loading } from 'vux'
import {getStaticPath,getBottomPosition,dateFormat} from '@/assets/js/mixin'
import {markArr,checkArr} from '@/assets/js/test'
import Poupe from '@/components/base/Poupe'
import {success} from '@/assets/js/config'
import  {getPid,getPname,getUsername,handleAuth} from '@/assets/js/util'
import api from '@/assets/js/api'
// import AMap from 'AMap';   
import _ from 'lodash';
export default {
  data() {
    return {
        timer:null,
        geolocation:null,
        isstart:0,
        second:0,
        minutes:0,
        timer2:null,
        patrolList:null,
        locationArr:[],
        starttime:null,
        currentdate:"",
        pname:"",
        username:"",
        isAdd:"",
        status:false,
        gpstext:"正在定位中...",
        gpsshow:true,
        gpssuccess:false,
        overinfo:{
            usetime:null,
            starttime:"",
            endtime:""
        }
    }
  },
  components: {
    Poupe,
    Loading
  },
  mixins: [getStaticPath,getBottomPosition,dateFormat],
  created(){
      const that = this;
       this.pname = getPname();
       this.username = getUsername();
       this.currentdate = this.dateFormat(new Date(), 'MM-DD');
       this.isAdd = handleAuth("addcheckrecord");
       api.getReservoirDetailInspectionAdd_patrolPoint({pid:getPid()}).then((res)=>{
           if(res.status==1){
               that.patrolList = res.data
           }
       },(err)=>{
           that.hint(err.msg)
       }).then(()=>{
            that.loadmap();
       })
  },
  methods: {
    loadmap(){
        const that = this;
        const map = new AMap.Map('mapView', {
          zoom:6,
          mapStyle:'amap://styles/whitesmoke'
        });
        const polyline = new AMap.Polyline({
            path:locationArr,
            strokeColor:"#3366ff",
            strokeOpacity:1,
            strokeWeight:5,
            strokeStyle:"solid",
            strokeDasharray:[10,5]
        });
        AMap.plugin(['AMap.ToolBar','AMap.Scale','AMap.Geolocation'],function(){
            map.addControl(new AMap.ToolBar({
                offset:new AMap.Pixel(10, 200)
            }));
            map.addControl(new AMap.Scale({
                visible:false
            }));
            const geolocation = new AMap.Geolocation({
               enableHighAccuracy: true,
               zoomToAccuracy: false,
               maximumAge:0,
               GeoLocationFirst:true,
               timeout:10000,
               panToLocation:false,
               convert:true,
               buttonOffset: new AMap.Pixel(10, 100)
            });
            that.geolocation = geolocation;
            map.addControl(geolocation);
            that.handleGps("init");
        });
        AMapUI.loadUI(['overlay/SimpleMarker','misc/PathSimplifier'], function(SimpleMarker,PathSimplifier) {
          if (!PathSimplifier.supportCanvas) {
                that.hint('当前环境不支持 Canvas！');
                that.initPage(SimpleMarker,null,map);
          }else{
                that.initPage(SimpleMarker,PathSimplifier,map);
          }
        });
    },
    initPage(SimpleMarker,PathSimplifier=null,map) {
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
              }).on("click",function (e) {
                  alert(`巡检点${index+1}`)
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
            window.pathSimplifierIns = pathSimplifierIns;    //挂载全局轨迹实例
            window.navg = null;
            window.PathSimplifier = PathSimplifier;
        }
    },
    //定位控制
    handleGps(type="init"){ 
        const that = this;
        if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(function (success) {
                    type=="init"?that.gpsshow = false:null;
                    (type=="init"||type=="over")?that.locationArr[0]=[success.coords.longitude,success.coords.latitude]:that.locationArr.push([success.coords.longitude,success.coords.latitude]);
                    if(type=="watchgps"){
                        that.handlePostGpsData(success.coords.longitude,success.coords.latitude)
                    }
                    pathSimplifierIns.setData([{         //设置轨迹数据源
                        name: 'test',
                        path: that.locationArr
                    }]); 
                    type=="init"?that.gpssuccess = true:null; 
                },function (error) {
                    that.geolocation.getCurrentPosition(function(status,result){
                        type=="init"?that.gpsshow = false:null;
                        if(status==="complete"){
                            (type=="init"||type=="over")?that.locationArr[0]=[result.position.lng,result.position.lat]:that.locationArr.push([result.position.lng,result.position.lat])
                            if(type=="watchgps"){
                                that.handlePostGpsData(result.position.lng,result.position.lat)
                            }
                            pathSimplifierIns.setData([{         //设置轨迹数据源
                                name: 'test',
                                path: that.locationArr
                            }]); 
                            type=="init"?that.gpssuccess = true:null;  
                        }else{
                            type=="init"?that.gpssuccess = false:null;
                            that.hint(JSON.stringify(result))
                        }
                    }) 
                },{
                    enableHeightAcuracy:true,
                    timeout:10000,
                    maximumAge:7500
                })
        }else{
                that.geolocation.getCurrentPosition(function(status,result){
                        type=="init"?that.gpsshow = false:null;
                        if(status==="complete"){
                            (type=="init"||type=="over")?that.locationArr[0]=[result.position.lng,result.position.lat]:that.locationArr.push([result.position.lng,result.position.lat]);
                            if(type=="watchgps"){
                                that.handlePostGpsData(result.position.lng,result.position.lat)
                            }
                            pathSimplifierIns.setData([{         //设置轨迹数据源
                                name: 'test',
                                path: that.locationArr
                            }]); 
                            type=="init"?that.gpssuccess = true:null;  
                        }else{
                            type=="init"?that.gpssuccess = false:null;
                            that.hint(JSON.stringify(result))
                        }
                }) 
        }
    },
    //提交定位数据
    handlePostGpsData(lng,lat){
        const that = this;
        api.addPatrolTrail({pid:getPid(),mid:" ",lgtd:lng,lttd:lat,inspectTime:that.dateFormat(new Date(), 'YYYY-MM-DD hh:mm:ss')}).then((res)=>{
               
            },(err)=>{
                that.hint(err.msg)
            }
        )
    },
    handleClose(){
      const that = this;
      this.status = false;
      this.second = 0;
      this.minutes = 0;
      pathSimplifierIns.clearPathNavigators();
      this.handleGps("over")
    },
    handleTrail(){   //持续记录轨迹
        const that = this;
        this.timer =  setInterval(_.throttle(function(){
            that.handleGps("watchgps")
        },8000, { 'leading': true }),8000);
    },
    handleMapTrail(){
        const that = this;
        function onload() {
            pathSimplifierIns.renderLater({delay:15000});
        }
        function onerror(e) {
            console.log('出错了！');
        }
        if(this.isstart===0){
            that.locationArr.length=0;
            this.handleTimeAdd("start");
            this.handleGps("init")
            this.handleTrail();
            this.starttime = this.dateFormat(new Date(), 'MM-DD hh:mm:ss')
            navg = pathSimplifierIns.createPathNavigator(0, {   //创建导航器实例
                loop: false,
                speed: 4,
                animInterval:100,
				dirToPosInMillsecs:100,
                pathNavigatorStyle: {
                    width:0,
                    height:0,
                    strokeStyle: "rgba(255,255,255,0)",
                    fillStyle: "rgba(255,255,255,0)",
                },
                pathLinePassedStyle: {
                        lineWidth: 0,
                        borderWidth:0,
                        strokeStyle: "rgba(255,255,255,0)",
                        dirArrowStyle:"rgba(255,255,255,0)"
                }

            });
            navg.start()
            this.isstart = 1;
            this.handleAnimation(1)
        }else if(this.isstart===1){
            this.handleTimeAdd("stop")
            navg.stop()
            clearInterval(this.timer)
            this.status = true;
            this.overinfo = {usetime:{minutes:this.minutes,second:this.second},starttime:this.starttime,endtime:this.dateFormat(new Date(), 'MM-DD hh:mm:ss')};
            this.isstart = 0;
            this.handleAnimation(0);
            navg.destroy()
        }
    },
    handleAnimation(satus){
      let loading = this.$refs.loading;
      let loadingContainer = this.$refs.loadingContainer
      if(!this.isstart){
          loadingContainer.style.transform = getComputedStyle(loadingContainer).transform === 'none'
        ? getComputedStyle(loading).transform
        : getComputedStyle(loading).transform.concat(' ', getComputedStyle(loadingContainer).transform);
          loading.classList.remove('animation');
      }else{
          loading.classList.add('animation')
      }
    },
    handleTimeAdd(type){
        const that = this;
        if(type=="start"){
            clearInterval(this.timer2);
            let second = this.second;
            let minutes = this.minutes;
            this.timer2 =setInterval(function () {
                if(that.second>=59){
                    that.minutes++;
                    that.second = 0;
                }else{
                    that.second++
                }
            },1000)
        }else{
            clearInterval(this.timer2)
        }
    },
    add(){
        this.$router.push({path: '/reservoirDetail/inspection/add'})
    }
  }
}
</script>
<style lang="less" scoped>
  @import '../../assets/less/variable.less';
  .PatrolPath {
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
    .poupecontent{
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
          background-color: #fff;
          border-radius:6px;
          overflow: hidden;
          .poupehead{
            img{
              width:20%;
              height:20%;
            }
            display: flex;
            color:#fff;
            align-items:center;
            justify-content:space-evenly;
            padding:5px;
            background-color:#1aa6fe;
            .nxst-clock{
              color:#fff;
              font-size:28px;
              background-color:#1aa6f3;
            }
          }
          .poupecenter{
            text-align:center;
            padding:12px;
          }
          .poupebottom{
            display: flex;
            justify-content:center;
            align-items:center;
            padding:5px;
            color:#8bba72;
          }
    }
    .buttonarea{
      position: absolute;
      bottom:0;
      width: 100%;
      height:@footer-height;
      background-color: #edeff4;
      z-index: 999;
      text-align: right;
      .addbtn{
          position: absolute;
          background-color: rgba(38, 194, 209, 0.8);
          color: #fff;
          width: 1.48rem;
          height: 1.48rem;
          border-radius: 0.74rem;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 0.64rem;
          bottom:0px;
          left: 0.4rem;
      }
      .startbtn{
          position: absolute;
          bottom:0px;
          width: 1.48rem;
          height:1.48rem;
          left:2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          -webkit-tap-highlight-color: transparent;
          .loadingContainer{
              width: 100%;
              height:100%;
          }
          .btncontent{
                position: absolute;
                top:0.074rem;
                left: 0.074rem;
                background-color: #fa9256;
                color: #fff;
                width: 1.32rem;
                height: 1.32rem;
                border-radius: 0.66rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                .time{
                    font-size: 14px;
                    font-weight: bold;
                };
                .status{
                    font-size: 12px;
                } 
            }
            .cssload-ball{
                position:absolute;
                height: 1.44rem;
                width: 1.44rem;
                border-radius: 0.72rem;
                border: 1px solid #fa9256;
                left: 0px;
                transform-origin: 50% 50%;
                -o-transform-origin: 50% 50%;
                -ms-transform-origin: 50% 50%;
                -webkit-transform-origin: 50% 50%;
                -moz-transform-origin: 50% 50%;
            }
            .animation{
                animation: cssload-ball 3.45s linear infinite ;
                -o-animation: cssload-ball 3.45s linear infinite ;
                -ms-animation: cssload-ball 3.45s linear infinite ;
                -webkit-animation: cssload-ball 3.45s linear infinite ;
                -moz-animation: cssload-ball 3.45s linear infinite ;
            }
            .cssload-ball-stop{
                animation-play-state: paused;
            }
            .cssload-ball-play{
                animation-play-state: running;
            }
            .cssload-ball:after{
                content: "";
                position: absolute;
                top: 0px;
                left: 0.38rem;
                width: 6px;
                height: 6px;
                border-radius: 10px;
                background-color: rgb(252,1,40);
            }
            @keyframes cssload-ball{
                    0%{transform:rotate(0deg);}
                    100%{transform:rotate(360deg);}
            }
            @-o-keyframes cssload-ball{
                    0%{-o-transform:rotate(0deg);}
                    100%{-o-transform:rotate(360deg);}
            }
            @-ms-keyframes cssload-ball{
                    0%{-ms-transform:rotate(0deg);}
                    100%{-ms-transform:rotate(360deg);}
            }
            @-webkit-keyframes cssload-ball{
                    0%{-webkit-transform:rotate(0deg);}
                    100%{-webkit-transform:rotate(360deg);}
            }
            @-moz-keyframes cssload-ball{
                    0%{-moz-transform:rotate(0deg);}
                    100%{-moz-transform:rotate(360deg);}
            }
      }
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

