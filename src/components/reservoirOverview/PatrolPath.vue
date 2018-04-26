<template>
  <div class="PatrolPath">
    <!-- <iframe style="width:100%;height:50%;" :src="this.getStaticPath('/static/ArcGisTest2.html')" frameborder="0"></iframe> -->
    <div id="mapView" class="mapContainer">
      <div class="buttonarea">
          <button>开始</button>
          <button>结束</button>
      </div>
    </div>
  </div>
</template>

<script>
//import * as esriLoader from 'esri-loader';
import {getStaticPath} from '@/assets/js/mixin'
import {markArr} from '@/assets/js/test'
import AMap from 'AMap';   
export default {
  data() {
    return {
      
    }
  },
  mixins: [getStaticPath],
  mounted(){
       this.loadmap();
  },
  methods: {
    loadmap(){
        const that = this;
        const map = new AMap.Map('mapView', {
          zoom: 9,
          mapStyle:'amap://styles/whitesmoke'
        });
        AMap.plugin(['AMap.ToolBar','AMap.Scale','AMap.Geolocation'],function(){
            map.addControl(new AMap.ToolBar());
            map.addControl(new AMap.Scale());
            const geolocation = new AMap.Geolocation({
               zoomToAccuracy: true,
               maximumAge:9000
            });
            map.addControl(geolocation);
            that.handleGps(geolocation)
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
                speed: 200,
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
            navg.start();//开始导航
            // navg.moveToPoint(2,0.5)   //定位导航位置
        }
    },
    handleGps(geolocation){
      geolocation.getCurrentPosition();
      AMap.event.addListener(geolocation, 'complete', function (result) {
          console.log(result)
      });
      AMap.event.addListener(geolocation, 'error', function (result) {
          console.log(result)
      });      
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
  }
  .mapContainer {
    position: relative;
    height: 100%;
    width: 100%;
    background-color:#fff;
    .buttonarea{
      position: absolute;
      display: flex;
      top:5px;
      width: 100%;
      align-items: center;
      justify-content: space-around;
      z-index: 1;
      button{
        background-color: #0085ff;
        color: #fff;
        padding: 5px 10px;
        border-radius: 3px;
        border: none;
        outline: none;
      }
    }
 }
</style>

