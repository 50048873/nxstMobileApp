<template>
  <div class="PatrolPath">
    <!-- <iframe style="width:100%;height:50%;" :src="this.getStaticPath('/static/ArcGisTest2.html')" frameborder="0"></iframe> -->
    <div id="mapView" class="mapContainer">
    </div>
    <div class="buttonarea">
        <div v-if="isAdd" class="addbtn">
            <i  @click="add" class="nxst-add"></i>
        </div>
        <div v-if="isAdd" class="startbtn"   @click="handleMapTrail">
            <div :class="isstart===1?'cssload-ball cssload-ball-play':'cssload-ball  cssload-ball-stop'">     
            </div>
            <div class="btncontent">
                    <span class="status">{{isstart===1?"检查中":isstart===2?"已结束":"开始"}}</span>
                    <span class="time">{{minutes>0?(`${minutes}:${second}`):second}}</span>
            </div>
        </div>
        <div class="inspector">
                <h3 class="reservoirname">
                    {{pname}}巡查
                </h3>
                <div class="personname">
                    <span>巡查人：{{username}}</span>
                    <span>时间：{{currentdate}}</span>
                </div>
        </div>
    </div>
  </div>
</template>

<script>
//import * as esriLoader from 'esri-loader';
import {getStaticPath,getBottomPosition,dateFormat} from '@/assets/js/mixin'
import {markArr} from '@/assets/js/test'
import {success} from '@/assets/js/config'
import  {getPid,getPname,getUsername,handleAuth} from '@/assets/js/util'
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
        patrolList:null,
        locationArr:[],
        starttime:null,
        currentdate:"",
        pname:"",
        username:"",
        isAdd:""
    }
  },
  mixins: [getStaticPath,getBottomPosition,dateFormat],
  beforeMount(){
       this.pname = getPname();
       this.username = getUsername();
       this.currentdate = this.dateFormat(new Date(), 'mm-dd');
       this.isAdd = handleAuth("addcheckrecord");
      api.getReservoirDetailInspectionAdd_patrolPoint({pid:getPid()}).then((res)=>{
          if(res.status==1){
            this.patrolList = res.data
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
               convert:false,
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
        const that = this;
        markArr?markArr.forEach((mark,index) => {    //创建地图标记点
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
                position: [mark[0],mark[1]]
              }).on("click",function (e) {
                  alert(`巡检点${index+1}`)
              })
            )
        }):null;
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
            pathSimplifierIns.setData([{         //设置轨迹数据源
                name: 'test',
                path: [[markArr[0][0],markArr[0][1]]]
            }]);
            window.pathSimplifierIns = pathSimplifierIns;    //挂载全局轨迹实例
            window.navg = null;
            window.PathSimplifier = PathSimplifier;
        }
    },
    // handleGps(geolocation=this.geolocation){ 
    // },
    handleTrail(){   //持续记录轨迹
        const that = this;
        let i =0 ;
        this.timer =  setInterval(_.throttle(function(){
            that.geolocation.getCurrentPosition(function(status,result){
                if(status==="complete"){
                    //定位成功，接口记录定位信息
                    // api.addPatrolTrail({mid:" ",lgtd:result.position.lng,lttd:result.position.lat,inspectTime:that.dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss')}).then((res)=>{
                    //     if(res.status==1){
                    //         that.locationArr.push([res.data.lgtd,res.data.lttd]);
                    //         pathSimplifierIns.setData([{         //设置轨迹数据源
                    //             name: 'test',
                    //             path: that.locationArr
                    //         }]);
                    //     }
                    // },(err)=>{
                    //     that.hint(err.msg)
                    // })
                    //测试轨迹数据处理
                    that.locationArr.push([markArr[i][0],markArr[i][1]]);
                    pathSimplifierIns.setData([{         //设置轨迹数据源
                        name: 'test',
                        path: that.locationArr
                    }]);
                    i++;
                }
            });
        },10000, { 'leading': true }),10000);
    },
    handleMapTrail(){
        function onload() {
            pathSimplifierIns.renderLater();
        }
        function onerror(e) {
            console.log('出错了！');
        }
        
        if(this.isstart===0){
            this.handleTimeAdd("start")
            this.handleTrail();
            this.starttime = this.dateFormat(new Date(), 'mm-dd HH:MM:ss')
            navg = pathSimplifierIns.createPathNavigator(0, {   //创建导航器实例
                loop: true,
                speed: 500,
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
            navg.start()
            this.isstart = 1;
        }else if(this.isstart===1){
            this.handleTimeAdd("stop")
            this.$store.dispatch("patrolOver",{usetime:{minutes:this.minutes,second:this.second},starttime:this.starttime,endtime:this.dateFormat(new Date(), 'mm-dd HH:MM:ss')})
            navg.stop()
            clearInterval(this.timer)
            this.isstart = 2;
            // navg.destroy()
        }else{
            this.handleTimeAdd("stop")
            clearInterval(this.timer)
            navg.destroy()
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
                border-radius: 0.72rem;
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

