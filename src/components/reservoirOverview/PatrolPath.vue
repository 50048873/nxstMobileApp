<template>
  <div class="PatrolPath">
    <!-- <iframe style="width:100%;height:50%;" :src="this.getStaticPath('/static/ArcGisTest2.html')" frameborder="0"></iframe> -->
    <div id="mapView" class="mapContainer">
    </div>
    <div class="buttonarea">
        <div class="addbtn">
            <i  @click="add" class="nxst-add"></i>
        </div>
        <div class="startbtn"   @click="handleMapTrail">
            <div :class="isstart===1?'cssload-ball cssload-ball-play':'cssload-ball  cssload-ball-stop'">     
            </div>
            <div class="btncontent">
                    <span class="status">{{isstart===1?"检查中":isstart===2?"已结束":"开始"}}</span>
                    <span class="time">{{minutes>0?(`${minutes}:${second}`):second}}</span>
            </div>
        </div>
        <div class="inspector">
                <h3 class="reservoirname">
                    丹江口水库巡查
                </h3>
                <div class="personname">
                    <span>巡查人：张子含</span>
                    <span>时间：3-12</span>
                </div>
        </div>
    </div>
  </div>
</template>

<script>
//import * as esriLoader from 'esri-loader';
import {getStaticPath,getBottomPosition} from '@/assets/js/mixin'
import {markArr} from '@/assets/js/test'
import {success} from '@/assets/js/config'
import  {getPid} from '@/assets/js/util'
import api from '@/assets/js/api'
import AMap from 'AMap';   
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
        patrolList:null
    }
  },
  mixins: [getStaticPath,getBottomPosition],
  beforeMount(){
      api.getReservoirDetailInspectionAdd_patrolPoint({pid:getPid()}).then((res)=>{
          if(res.status==success){
              console.log(res)
          }
      },(err)=>{
          this.hint(err.msg)
      })
  },
  mounted(){
       this.loadmap();
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
            const geolocation = new AMap.Geolocation({
               zoomToAccuracy: false,
               maximumAge:10000,
               panToLocation:false,
               buttonOffset: new AMap.Pixel(10, 100)
            });
            map.addControl(geolocation);
            that.geolocation = geolocation;
            //that.handleGps(geolocation)
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
        markArr.forEach((mark,index) => {    //创建地图标记点
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
                position: mark
              }).on("click",function (e) {
                  alert(e.target.getPosition())
              })
            )
        });
        if(PathSimplifier){
            const emptyLineStyle = {   //设置轨迹样式
                lineWidth: 2,
                fillStyle: null,
                strokeStyle: null,
                borderStyle: null
            };
            const pathSimplifierIns = new PathSimplifier({   //创建轨迹实例
                zIndex: 10000,
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
                      radius:3,
                      fillStyle:"blue",
                      strokeStyle:"yellow",
                      lineWidth:0 
                    }
                }
            });
            window.pathSimplifierIns = pathSimplifierIns;    //挂载全局轨迹实例
            pathSimplifierIns.setData([{         //设置轨迹数据源
                name: 'test',
                path: [
                    [114.346337,30.573751],
                    [114.339234,30.572347],
                    [114.335265,30.571165],
                    [114.329471,30.570537],
                    [114.326016,30.569096],
                    [114.320856,30.566352],
                    [114.319901,30.56492],
                    [114.319407,30.564569],
                    [114.319472,30.563507],
                    [114.319697,30.561594],
                    [114.319493,30.560643],
                    [114.319633,30.55885],
                    [114.321832,30.557677],
                    [114.323431,30.557455],
                    [114.325126,30.558019],
                    [114.326488,30.557714],
                    [114.326488,30.557714],
                    [114.327583,30.558259],
                    [114.32916,30.55813],
                    [114.329085,30.558167],
                    [114.330233,30.559146],
                    [114.330351,30.559128],
                    [114.333956,30.560984],
                    [114.334986,30.560273],
                    [114.338355,30.561862],
                    [114.341165,30.561899],
                    [114.348032,30.56541],
                    [114.351175,30.569271],
                    [114.35124,30.57025],
                    [114.350666,30.570449],
                    [114.350934,30.570957],
                    [114.350929,30.572458]
                ]
            }]);
            function onload() {
                pathSimplifierIns.renderLater();
            }
            function onerror(e) {
                console.log('出错了！');
            }
            const navg = pathSimplifierIns.createPathNavigator(0, {   //创建导航器实例
                loop: true,
                speed: 1,
                pathNavigatorStyle: {
                    width: 20,
                    height: 20,
                    content: PathSimplifier.Render.Canvas.getImageContent(require('@/assets/img/person.png'), onload, onerror),
                    strokeStyle: 'red',
                    fillStyle: 'blue',
                    pathLinePassedStyle: {
                        lineWidth: 4,
                        strokeStyle: 'lightgreen',
                        dirArrowStyle: {
                            stepSpace: 8,
                            strokeStyle: 'pink'
                        }
                    }
                }
            });
            window.navg = navg;
        }
    },
    // handleGps(geolocation=this.geolocation){ 
    // },
    handleTrail(){   //持续记录轨迹
        const that = this;
        this.timer =  setInterval(_.throttle(function(){
            that.geolocation.getCurrentPosition(function(status,result){
                if(status==="complete"){
                    //定位成功，接口记录定位信息
                    console.log(result)
                }
            });
        },10000, { 'leading': true }),10000);
    },
    handleMapTrail(){
        if(this.isstart===0){
            this.handleTimeAdd("start")
            this.handleTrail()
            navg.start()
            this.isstart = 1;
        }else if(this.isstart===1){
            this.handleTimeAdd("stop")
            navg.stop()
            clearInterval(this.timer)
            this.isstart = 2;
            // navg.destroy()
        }else{
            this.handleTimeAdd("stop")
            clearInterval(this.timer)
            return 
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
                border-radius: 1.44rem;
                border: 1px solid #fa9256;
                left: 0px;
                transform-origin: 50% 50%;
                -o-transform-origin: 50% 50%;
                -ms-transform-origin: 50% 50%;
                -webkit-transform-origin: 50% 50%;
                -moz-transform-origin: 50% 50%;
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

