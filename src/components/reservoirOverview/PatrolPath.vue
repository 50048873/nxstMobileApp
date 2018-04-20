<template>
  <div class="PatrolPath">
    <h1>巡查轨迹测试页面</h1>
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
    init1() {
      // const options = {
      //   url: 'https://js.arcgis.com/4.6/'
      // };
      const options = {
        url: 'http://localhost:8088/arcgis_js_api/library/4.6/dojo/dojo.js',
        css: 'http://localhost:8088/arcgis_js_api/library/4.6/esri/css/main.css'
      };
      esriLoader.loadModules(['esri/views/MapView', 'esri/WebMap'], options)
        .then(([MapView, WebMap]) => {
          // then we load a web map from an id
          var webmap = new WebMap({
            portalItem: { // autocasts as new PortalItem()
              id: 'f2e9b762544945f390ca4ac3671cfa72'
            }
          });
          // and we show that map in a container w/ id #viewDiv
          var view = new MapView({
            map: webmap,
            container: 'viewDiv'
          });
        })
        .catch(err => {
          // handle any errors
          console.error(err);
        });
    },
    init2() { 
      esriLoader.loadModules([
        "esri/Map",
        "esri/views/MapView",
        "esri/widgets/BasemapToggle",
        "esri/tasks/Locator",
        "dojo/domReady!"
      ]).then(([Map, MapView, BasemapToggle, Locator]) => {
        // Create the Map
          var map = new Map({
            basemap: "hybrid"
          });

          // Create the MapView and reference the Map in the instance
          var view = new MapView({
            container: "viewDiv",
            map: map,
            center: [114.372402,30.588834],
            zoom: 17
          });

          // 1 - Create the widget
          var toggle = new BasemapToggle({
            // 2 - Set properties
            view: view, // view that provides access to the map's 'topo' basemap
            nextBasemap: "topo" // allows for toggling to the 'hybrid' basemap
          });

          // Add widget to the top right corner of the view
          view.ui.add(toggle, "top-right");


          // Set up a locator task using the world geocoding service
          var locatorTask = new Locator({
            url: "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"
          });

          /*******************************************************************
           * This click event sets generic content on the popup not tied to
           * a layer, graphic, or popupTemplate. The location of the point is
           * used as input to a reverse geocode method and the resulting
           * address is printed to the popup content.
           *******************************************************************/
          view.on("click", function(event) {
            event.stopPropagation(); // overwrite default click-for-popup behavior

            // Get the coordinates of the click on the view
            var lat = Math.round(event.mapPoint.latitude * 1000000) / 1000000;
            var lon = Math.round(event.mapPoint.longitude * 1000000) / 1000000;

            view.popup.open({
              // Set the popup's title to the coordinates of the location
              title: "Reverse geocode: [" + lon + ", " + lat + "]",
              location: event.mapPoint // Set the location of the popup to the clicked location
            });

            // Display the popup
            // Execute a reverse geocode using the clicked location
            locatorTask.locationToAddress(event.mapPoint).then(function(
              response) {
              // If an address is successfully found, show it in the popup's content
              view.popup.content = response.address;
            }).otherwise(function(err) {
              // If the promise fails and no result is found, show a generic message
              view.popup.content =
                "No address was found for this location";
            });
          });
        }).catch(err => {
          // handle any errors
          console.error(err);
        });
    }
  },
  mounted() {    
    this.init1()
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
  }
</style>
<style>
/*@import url('http://localhost:8088/arcgis_js_api/library/4.6/esri/css/main.css');*/
.mapTitle:hover,
.mapTitle.focus {
  color: #9f9f9f;
}

#viewDiv {
  height: 60%;
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
