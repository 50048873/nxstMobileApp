<template>
  <div class="PatrolPath">
    <!-- <iframe style="width:100%;height:50%;" :src="this.getStaticPath('/static/ArcGisTest2.html')" frameborder="0"></iframe> -->
    <div id="viewDiv" class="balt-theme"></div>
  </div>
</template>

<script>
import * as esriLoader from 'esri-loader';
import {getStaticPath} from '@/assets/js/mixin'
export default {
  data() {
    return {
      
    }
  },
  mixins: [getStaticPath],
  methods: {
    init() { 

      esriLoader.loadModules([
        "esri/Map",
        "esri/views/MapView",
        "esri/widgets/BasemapToggle",
        "esri/widgets/Legend",
        "esri/layers/FeatureLayer",
        "esri/layers/TileLayer",
        "esri/tasks/Locator",
        "dojo/domReady!"
      ]).then(([Map,MapView, BasemapToggle,Legend,FeatureLayer,TileLayer, Locator]) => {
          var map = new Map({
            basemap: "hybrid"
          });
          var view = new MapView({
            container: "viewDiv",
            map: map,
            center: [114.372402,30.588834],
            zoom: 5,
            extent: { // autocasts as new Extent()
            xmin: -9177811,
            ymin: 4247000,
            xmax: -9176791,
            ymax: 4247784,
            spatialReference: 102100
          }
          });
          var locatorTask = new Locator({
            url: "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"
          });
           view.on("click", function(event) {
              event.stopPropagation();
              // Get the coordinates of the click on the view
              // around the decimals to 3 decimals
              var lat = Math.round(event.mapPoint.latitude * 1000) / 1000;
              var lon = Math.round(event.mapPoint.longitude * 1000) / 1000;

              view.popup.open({
                  // Set the popup's title to the coordinates of the clicked location
                  title: "Reverse geocode: [" + lon + ", " + lat + "]",
                  location: event.mapPoint // Set the location of the popup to the clicked location
              });
          });
           var featureLayer = new FeatureLayer({
          url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Landscape_Trees/FeatureServer/0"
        });

        map.add(featureLayer);
          var legend = new Legend({
            view: view
          });
          view.ui.add(legend, "top-right");
          var toggle = new BasemapToggle({
              map: map,
              basemap: "hybird",
              nextBasemap:"topo"
          }, "BasemapToggle");
          toggle.startup();
          var transportationLyr = new TileLayer({
            url: "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer",
            id: "streets",
            opacity: 0.7
          });

          var housingLyr = new TileLayer({
            url: "https://tiles.arcgis.com/tiles/nGt4QxSblgDfeJn9/arcgis/rest/services/New_York_Housing_Density/MapServer",
            id: "ny-housing"
          });
          view.ui.add(toggle, "top-right");
        }).catch(err => {
          console.error(err);
        });
    }
  },
  mounted() {    
    this.init()
  },
  created() {

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
    #BasemapToggle {
      position: absolute;
      top: 20px;
      right: 20px;
      z-index: 50;
    }
  }
</style>
<style>
/*@import url('http://localhost:8088/arcgis_js_api/library/4.6/esri/css/main.css');*/
.mapTitle:hover,
.mapTitle.focus {
  color: #9f9f9f;
}

#viewDiv {
  height: 100%;
  width: 100%;
  background-color: lime;
}

table th {
  color: #fff;
}

.esri-expand__container .esri-widget-button {
  width: 42px;
  height: 42px;
}

form input[type="text"]::-webkit-input-placeholder {
  color: #fff !important;
}

.balt-theme .esri-widget,
.balt-theme .esri-widget-button,
.balt-theme .esri-menu,
.balt-theme .esri-popup__main-container,
.balt-theme .esri-popup .esri-pointer-direction,
.balt-theme .esri-button {
  background-color: #42484f;
  color: #fff;
}

.balt-theme .esri-widget-button:focus,
.balt-theme .esri-widget-button:hover,
.balt-theme .esri-menu li:focus,
.balt-theme .esri-menu li:hover {
  background-color: #000;
  color: #fff;
}

.balt-theme .esri-button:focus,
.balt-theme .esri-button:hover {
  color: #fff;
}
</style>
