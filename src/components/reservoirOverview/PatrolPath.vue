<template>
  <div class="PatrolPath">
    <!-- <iframe style="width:100%;height:50%;" :src="this.getStaticPath('/static/ArcGisTest2.html')" frameborder="0"></iframe> -->
    <div id="mapView" class="mapContainer">
    </div>
    <poupe :status="status&&overinfo?true:false">   <!-- 巡检时间弹窗 -->
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
        <div v-if="isAdd&&isstart==1" class="addbtn">  <!-- 添加巡检记录按钮 -->
            <i  @click="add" class="nxst-add"></i>
        </div>
        <div v-if="isAdd&&!gpsshow&&gpssuccess" class="startbtn"   @touchstart="handleMapTrail">  <!-- 巡检定位按钮 -->
             <div class="loadingContainer" ref="loadingContainer">
                 <div ref="loading" class="cssload-ball"> 
             </div>
                
            </div>
            <div  class="btncontent">
                    <span class="status">{{isstart===1?"结束巡检":"开始巡检"}}</span>
                    <span class="time">{{minutes>0?(`${minutes}:${second}`):second}}</span>
            </div>
        </div>
        <div class="inspector">   <!-- 巡检信息展示 -->
                <h3 class="reservoirname">
                    {{pname}}巡检
                </h3>
                <div class="personname">
                    <span>巡检人：{{username}}</span>
                    <span>时间：{{currentdate}}</span>
                </div>
        </div>
    </div>
    <loading :show="gpsshow"  :text="gpstext"></loading>  <!-- loading -->
  </div>
</template>

<script>
//import * as esriLoader from 'esri-loader';
import { Loading } from 'vux'
import {getStaticPath,getBottomPosition,dateFormat} from '@/assets/js/mixin'
import {markArr,checkArr} from '@/assets/js/test'
import Poupe from '@/components/base/Poupe'
import {success} from '@/assets/js/config'
import RemoGeoLocation from '@/assets/js/remoge'
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
        lastLng:"",
        lastLat:"",
        pname:"",
        map:null,
        type:'init',
        username:"",
        isAdd:"",
        polyline:null,
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
       this.isAdd = handleAuth("addcheckrecord");//获取添加巡检纪录的权限
       api.getReservoirDetailInspectionAdd_patrolPoint({pid:getPid()}).then((res)=>{//获取巡检点数据
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
        this.map = new AMap.Map('mapView', {
          zoom:13,
          mapStyle:'amap://styles/whitesmoke'
        });
        AMap.plugin(['AMap.ToolBar','AMap.Scale','AMap.Geolocation'],function(){
            that.map.addControl(new AMap.ToolBar({
                offset:new AMap.Pixel(10, 200)
            }));
            that.map.addControl(new AMap.Scale({
                visible:false
            }));
            const geolocation = new AMap.Geolocation({   //初始化定高德位控件
               enableHighAccuracy: true,//设置高精度定位
               zoomToAccuracy: true,
               maximumAge:0,
               GeoLocationFirst:true,
               timeout:10000,
               panToLocation:false,
               convert:true,
               buttonOffset: new AMap.Pixel(10, 100)
            });
            that.geolocation = geolocation;//挂载高德定位对象到当前组件
            if(AMap.UA.ios&&document.location.protocol!=='https:'){//非https和ios系统调用补丁定位并覆写原生定位方法
                const remoGe = new RemoGeoLocation();
                navigator.geolocation.getCurrentPosition = function () {
                    return remoGe.getCurrentPosition.apply(remoGe,arguments)
                }
                navigator.geolocation.watchPosition = function () {
                    return remoGe.watchPosition.apply(remoGe,arguments)
                }
            }
            that.map.addControl(that.geolocation);
            AMap.event.addListener(that.geolocation,'complete',that.handGPScomplete);//监听定位成功事件
            AMap.event.addListener(that.geolocation,'error',that.handGPSfail)//监听定位失败事件
            that.handleGps("init");
        });
        AMapUI.loadUI(['overlay/SimpleMarker','overlay/SimpleInfoWindow'], function(SimpleMarker,SimpleInfoWindow) {  //加载模态框和标记组件
            that.initPage(SimpleMarker,that.map,SimpleInfoWindow);
        });
    },
    initPage(SimpleMarker,map,SimpleInfoWindow) {   //初始化模态框和标记
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
                position: [mark.LGTD,mark.LTTD],//设置标记点位置
                zIndex:11
              }).on("click",function(){  //巡检点模态框信息
                  new SimpleInfoWindow({
                    infoTitle:'巡检点',
                    infoBody: mark.PATROL_NAME,
                  }).open(map,[mark.LGTD,mark.LTTD]);
              })
            )
        }):null;
    },
    handleGps(type="init"){   //调用定位
        this.type = type;
        this.geolocation.getCurrentPosition();
    },
    //定位成功
    handGPScomplete(data){
        const that = this;
        this.type=="init"?this.gpsshow = false:null;   //设置loading的隐藏
        if(this.type=="init"){   //初次记录上一次定位数据
            this.lastLng = data.position.getLng();
            this.lastLat = data.position.getLat()
        }
        this.locationArr=[[this.lastLng,this.lastLat],[data.position.getLng(),data.position.getLat()]];//存储polyline数据
        this.polyline = new AMap.Polyline({//创建polyline实例
            path:that.locationArr,
            strokeColor:"#3366ff",
            strokeOpacity:1,
            strokeWeight:5,
            strokeStyle:"solid",
            strokeDasharray:[10,5]
        });
        this.polyline.setMap(that.map);//添加polyline到地图
        this.lastLng = data.position.getLng();  //更新前一次定位数据
        this.lastLat = data.position.getLat()
        if(this.type=="watchgps"){  //巡检中进行持续定位调用接口提交定位数据到后台
            this.handlePostGpsData(data.position.getLng(),data.position.getLat())
        }
        this.type=="init"?this.gpssuccess = true:null; 
    },
    //定位失败
    handGPSfail(err){
        this.type=="init"?this.gpsshow = false:null; //关闭定位弹窗
        this.hint("获取地理位置失败")
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
    //定位结束关闭弹窗并初始化计时数据
    handleClose(){
      const that = this;
      this.status = false;
      this.second = 0;
      this.minutes = 0;
      this.handleGps("over")
    },
    handleTrail(){   //持续定位
        const that = this;
        this.timer =  setInterval(_.throttle(function(){
            that.handleGps("watchgps")
        },8000, { 'leading': true }),8000);
    },
    handleMapTrail(){  //巡检的开始与结束控制
        const that = this;
        if(this.isstart===0){ //巡检开始
            that.locationArr.length=0;  //重置定位数据
            this.handleTimeAdd("start");  //开始计时
            this.handleGps("init") //开始初始定位
            this.handleTrail();   //持续定位
            this.starttime = this.dateFormat(new Date(), 'MM-DD hh:mm:ss')
            this.isstart = 1;//定义巡检中状态
            this.handleAnimation(1)  //开启巡检按钮动画
        }else if(this.isstart===1){  //巡检结束
            this.handleTimeAdd("stop") //结束计时
            clearInterval(this.timer)  //结束持续定位
            this.status = true; //显示计时弹窗
            this.overinfo = {usetime:{minutes:this.minutes,second:this.second},starttime:this.starttime,endtime:this.dateFormat(new Date(), 'MM-DD hh:mm:ss')};//计时时间信息
            this.isstart = 0;//定义巡检结束状态
            this.handleAnimation(0);  //关闭巡检按钮动画
        }
    },
    handleAnimation(satus){  //巡检按钮动画控制
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
    handleTimeAdd(type){   //巡检计时处理
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
    add(){   //添加巡检纪录路由跳转
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

