<template>
  <div>
    <!-- slot for toolbar -->
    <slot name="toolbar"/>
    <!-- slot for toolbar-item -->
    <slot v-if="drawer"/>
    <div class="mapgis-draw-control" v-show="enableControl">
      <mapgis-ui-space>
        <mapgis-ui-tooltip
            v-for="(item, i) in draws"
            :key="i"
            placement="bottom"
        >
          <template slot="title">
            <span>{{ item.tip }}</span>
          </template>
          <mapgis-ui-button
              shape="circle"
              :type="item.type"
              @click="item.click"
              :class="item.className"
          >
            <mapgis-ui-iconfont
                :type="item.icon"
                :class="item.className"
                theme="filled"
            />
          </mapgis-ui-button>
        </mapgis-ui-tooltip>
      </mapgis-ui-space>
    </div>
    <mapgis-marker v-if="showMarkerCopy" :coordinates="markerCoordinate">
      <div slot="marker" class="label">
        <div class="radiusValue">{{ radius }}米</div>
      </div>
    </mapgis-marker>
  </div>
</template>

<script>
import * as turf from "@turf/turf";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import DrawRectangle from "mapbox-gl-draw-rectangle-mode";
import * as MapboxDrawCom from "@mapbox/mapbox-gl-draw";
import RadiusMode from "@mapgis/mapbox-gl-draw-radius";
import {
  CircleMode,
  DragCircleMode,
  DirectMode,
  SimpleSelectMode,
} from "@mapgis/mapbox-gl-draw-circle";
import StaticMode from "@mapbox/mapbox-gl-draw-static-mode";

const modes = MapboxDrawCom.default.modes;
const MapboxDraw = MapboxDrawCom.default;
modes.draw_rectangle = DrawRectangle;
modes.draw_circle = RadiusMode;
modes.draw_radius = CircleMode;
modes.drag_radius = DragCircleMode;
modes.direct_select = DirectMode;
modes.simple_select = SimpleSelectMode;
modes.static = StaticMode;

import drawMixin from "./drawMixin";
import controlMixin from "../withControlEvents";
import DefaultDrawStyle from "./DefaultDrawStyle";

const drawEvents = {
  // es6
  drawCreate: "draw.create",
  drawDelete: "draw.delete",
  drawCombine: "draw.combine",
  drawUncombine: "draw.uncombine",
  drawUpdate: "draw.update",
  drawSelectionChange: "draw.selectionchange",
  drawModeChange: "draw.modechange",
  drawRender: "draw.render",
  drawActionable: "draw.actionable",
  // brower
  drawcreate: "draw.create",
  drawdelete: "draw.delete",
  drawcombine: "draw.combine",
  drawuncombine: "draw.uncombine",
  drawupdate: "draw.update",
  drawselectionchange: "draw.selectionchange",
  drawmodechange: "draw.modechange",
  drawrender: "draw.render",
  drawactionable: "draw.actionable",
};

export default {
  name: "mapgis-draw",
  mixins: [drawMixin, controlMixin],
  components: {
    /* MapgisUiIconfont */
  },
  //@see https://cn.vuejs.org/v2/guide/components-edge-cases.html#%E4%BE%9D%E8%B5%96%E6%B3%A8%E5%85%A5
  // inject: ["mapbox", "map"],

  provide() {
    const self = this;
    return {
      get drawer() {
        // 提供marker给子组件popup或者插槽槽
        return self.drawer;
      },
    };
  },

  props: {
    editable: {
      type: Boolean,
      default: true,
    },
    // expandControl: {
    //   type: Boolean,
    //   default: false
    // },
    enableControl: {
      type: Boolean,
      default: false,
    },
    // mapbox drawer options
    keybindings: {
      type: Boolean,
      default: true,
    },
    touchEnabled: {
      type: Boolean,
      default: true,
    },
    boxSelect: {
      type: Boolean,
      default: true,
    },
    clickBuffer: {
      type: Number,
      default: 2,
    },
    touchBuffer: {
      type: Number,
      default: 25,
    },
    controls: {
      type: Object,
      default: () => {
        return {
          point: false,
          line_string: false,
          polygon: false,
          trash: false,
          combine_features: false,
          uncombine_features: false,
        };
      },
    },
    displayControlsDefault: {
      type: Boolean,
      default: true,
    },
    styles: {
      type: Array,
      default: () => DefaultDrawStyle,
    },
    modes: {
      type: Object,
      default: () => modes,
    },
    defaultMode: {
      type: String,
      default: "simple_select",
    },
    userProperties: {
      type: Boolean,
      default: false,
    },
    showSize: {
      type: Boolean,
      default: false,
    }
  },

  data() {
    return {
      initial: true,
      drawer: undefined,
      oldStyles: DefaultDrawStyle,
      draws: [
        // {
        //   icon: "mapgis-huizhi1",
        //   type: "primary",
        //   tip: "展开",
        //   click: this.changeFold,
        //   className: "mapgis-draw-expand"
        // },
        {
          icon: "mapgis-huizhidian2",
          type: "primary",
          tip: "画点",
          click: this.togglePoint,
        },
        {
          icon: "mapgis-huizhixian1",
          type: "primary",
          tip: "画线",
          click: this.togglePolyline,
        },
        {
          icon: "mapgis-huizhijuxing",
          type: "primary",
          tip: "画矩形",
          click: this.toggleRect,
        },
        {
          icon: "mapgis-draw-polygon",
          type: "primary",
          tip: "画多边形",
          click: this.togglePolygon,
        },
        {
          icon: "mapgis-huizhiyuan1",
          type: "primary",
          tip: "画圆",
          click: this.toggleCircle,
        },
        {
          icon: "mapgis-icon_huizhiyuanxing",
          type: "primary",
          tip: "画半径",
          click: this.toggleRadius,
        },
        {
          icon: "mapgis-shanchu_dianji",
          type: "primary",
          tip: "删除选中图元",
          click: this.toggleDelete,
        },
        /*{
          icon: "mapgis-shanchudangqianziceng",
          type: "primary",
          tip: "删除全部",
          click: this.toggleDeleteAll
        },
         {
          icon: "mapgis-juxing1",
          type: "default",
          tip: "矩形查询",
          click: this.toggleQueryByRect
        },
        {
          icon: "mapgis-pinghangsibianxing1",
          type: "default",
          tip: "多边形查询",
          click: this.toggleQueryByPolygon
        } */
      ],
      markerCoordinate: [],
      centerCoordinate: [],
      radius: 0,
      pushRadius: "mapgis-lashen",
      showMarkerCopy: false,
      oldFeature: [{
        geometry: {
          coordinates: [],
        },
        id: "",
        properties: {},
        type: "Feature"
      }],
      showSizeStyle: this.styles
    };
  },

  watch: {
    coordinates(lngLat) {
      if (this.initial) return;
      this.drawer.setLngLat(lngLat);
    },
    draggable(next) {
      if (this.initial) return;
      this.drawer.setDraggable(next);
    },
    styles: {
      handler: function (news) {
        this.oldStyles = this.combineStyle(news);
        this.showSizeStyle = news;
      },
    },
  },

  mounted() {
    this.$_initDraw();
    if (this.enableControl) {
      let position = this.position;
      let pos = position.split("-");
      document.querySelector(".mapgis-draw-control").style =
          pos[0] + ": 10px;" + pos[1] + ": 10px;";
      // if (this.expandControl) {
      //   this.changeFold();
      // } else {
      //   let pos = position.split("-");
      //   document.querySelector(".mapgis-draw-control").style =
      //     pos[0] + ": 10px;" + pos[1] + ": 10px;";
      // }
    }
  },

  beforeDestroy() {
    this.remove();
  },

  methods: {
    enableDrawer() {
      if (this.map.getLayer("extent")) {
        this.map.removeLayer("extent");
        this.map.removeSource("extent");
      }
      if (this.map.getLayer("centerPoint")) {
        this.map.removeLayer("centerPoint");
        this.map.removeSource("centerPoint");
      }
      if (this.showMarkerCopy) {
        this.showMarkerCopy = false;
        this.markerCoordinate = [];
      }
      this.drawRadius = false;
      this.$_compareStyle();
      this.$_initDraw();
      this.$_unbindEditEvents();
      this.$_unbindMeasureEvents();
      this.$_addDrawControl(this.drawer);
      this.$_emitEvent("added", {drawer: this.drawer});
      this.$_unbindDrawEvents();
      this.$_bindSelfEvents(Object.keys(drawEvents));
    },

    $_initDraw() {
      const draweroptions = {
        ...this.$props,
        styles: this.oldStyles,
      };
      this.drawer = new MapboxDraw(draweroptions);

      this.initial = false;
      return this.drawer;
    },

    $_bindSelfEvents(events) {
      if (events.length === 0) return;
      // asControl 本身是拥有 $_bindSelfEvents 方法的，但是这里的draw组件并不是遵循的mapbox-gl.js的事件机制，
      // 因此我们需要覆盖该方法, 按照对应的业务方式实现
      const vm = this;
      let listeners;
      // if (this.editable) {
      //   listeners = ["drawUpdate"].concat(Object.keys(this.$listeners));
      // } else {
      listeners = ["drawUpdate", "drawCreate", "drawRender", "drawActionable"].concat(
          Object.keys(this.$listeners)
      );
      // }

      // 使用vue的this.$listeners方式来订阅用户指定的事件
      // Object.keys(this.$listeners).forEach(eventName => {
      listeners.forEach((eventName) => {
        if (events.includes(eventName)) {
          this.$_bindDrawEvents(
              drawEvents[eventName],
              vm.$_emitDrawEvent.bind(vm, eventName)
          );
        }
      });
    },

    // 按照@mapgis/webclient-vue-mapboxgl的规范 发送事件 ，其实就是用{type：eventName}包装事件名
    $_emitDrawEvent(eventName, eventData, payload) {
      // console.log("_emitDrawEvent", eventName, eventData, payload);
      const vm = this;
      let mode = this.drawer.getMode();
      if (vm.drawRadius && eventName === "drawActionable") {
        if (!eventData.actions.trash) {
          let style = vm.oldStyles.filter(s =>
              s.id === "gl-draw-point-inactive")
          if (vm.map.getLayer("centerPoint")) {
            vm.map.setPaintProperty("centerPoint", "circle-radius", style[0].paint['circle-radius']);
            vm.map.setPaintProperty("centerPoint", "circle-color", style[0].paint['circle-color']);
          }
          style = vm.oldStyles.filter(s =>
              s.id === "gl-draw-line-inactive")
          if (vm.map.getLayer("extent")) {
            vm.map.setPaintProperty("extent", "line-color", style[0].paint['line-color']);
            vm.map.setPaintProperty("extent", "line-width", style[0].paint['line-width']);
          }
        }
      }
      if (vm.drawRadius && eventName === "drawRender") {
        let result = this.drawer.getSelected();
        if (result.features.length > 0) {
          vm.addMarkerAndLine(result);
          this.oldFeature = turf.clone(result.features[0]);
        }
      }
      if (eventName === "drawUpdate" && mode === "direct_select") {
        if (
            eventData.action == "change_coordinates" &&
            eventData.features &&
            eventData.features.length >= 0
        ) {
          if (!turf.booleanEqual(eventData.features[0], vm.oldFeature)) {
            vm.addMarkerAndLine(eventData);
            let feature = eventData.features[0];
            let center = feature.properties.center;
            let area = Math.round(turf.area(feature)) / 1000000;
            let radiusinkm = feature.properties.radiusInKm;
            this.$emit("update-radius", {area, radiusinkm, center});
          }
        }
      } else if (eventName == "drawCreate" && !this.editable) {
        window.setTimeout(() => {
          vm.drawer && vm.drawer.changeMode("simple_select");
        }, 100);
      }
      // if (eventName == "drawCreate" && mode == "direct_select" ) {
      //   this.drawer && this.drawer.changeMode("simple_select");
      // }
      return this.$_emitSelfEvent({type: eventName}, eventData);
    },

    $_compareStyle() {
      let combines = this.combineStyle();
      this.changeMapStyle(combines);
      this.oldStyles = combines;
    },

    combineStyle(news) {
      let olds = this.oldStyles || DefaultDrawStyle;
      news = news || this.styles;
      let combines = olds.filter((l) => {
        return !news.find((f) => f.id === l.id);
      });
      combines = combines.concat(news);
      return combines;
    },

    changeMapStyle(layers) {
      let {map} = this;
      layers.forEach((layer) => {
        if (map.getLayer(layer)) {
          if (layer.filter) {
            map.setFilter(layer.id, layer.filter);
          }
          if (layer.paint) {
            Object.keys(layer.paint).forEach((key) => {
              map.setPaintProperty(layer.id, key, layer.paint[key]);
            });
          }
          if (layer.layout) {
            Object.keys(layer.layout).forEach((key) => {
              map.setLayoutProperty(layer.id, key, layer.layout[key]);
            });
          }
        }
      });
    },

    remove() {
      this.$_unbindDrawEvents();
      this.$_removeDrawControl();

      this.$_emitEvent("removed");
    },

    // changeFold(e) {
    //   let space = document.querySelector(".mapgis-draw-control > .mapgis-ui-space");
    //   let width = getComputedStyle(space).width;
    //   if (width == "40px") {
    //     space.style =
    //       "width: 320px!important;overflow: hidden;transition: width .5s;";
    //   } else {
    //     space.style =
    //       "width: 40px!important;overflow: hidden;transition: width .5s;";
    //   }
    // },

    toggleStatic() {
      // this.enableDrawer();
      this.drawer && this.drawer.changeMode("static");
    },
    toggleSimple() {
      // this.enableDrawer();
      this.drawer && this.drawer.changeMode("simple_select");
    },
    togglePoint() {
      this.enableDrawer();
      this.drawer && this.drawer.changeMode("draw_point");
    },
    togglePolyline() {
      this.enableDrawer();
      this.drawer && this.drawer.changeMode("draw_line_string");
    },
    togglePolygon() {
      this.enableDrawer();
      this.drawer && this.drawer.changeMode("draw_polygon");
    },
    toggleRect() {
      this.enableDrawer();
      this.drawer && this.drawer.changeMode("draw_rectangle");
    },
    toggleCircle() {
      this.enableDrawer();
      this.drawer && this.drawer.changeMode("draw_circle");
    },
    toggleRadius() {
      this.enableDrawer();
      this.drawRadius = true;
      this.drawer && this.drawer.changeMode("draw_radius");
    },
    toggleDelete() {
      this.enableDrawer();
      this.drawer && this.drawer.deleteAll();
      this.drawRadius = false;
      if (this.showMarkerCopy) {
        this.showMarkerCopy = false;
        this.markerCoordinate = [];
      }
    },
    toggleDeleteAll() {
      this.enableDrawer();
      this.drawer && this.drawer.deleteAll();
    },
    toggleQueryByRect() {
    },
    toggleQueryByPolygon() {
    },
    addMarkerAndLine(eventData) {
      const vm = this;
      let feature = eventData.features[0];
      let center = feature.properties.center;
      let onePoint = turf.point(feature.geometry.coordinates[0][0]);

      // vm.markerCoordinate = [onePoint[0], onePoint[1]];
      let lineString = turf.lineString(
          [
            [onePoint.geometry.coordinates[0], onePoint.geometry.coordinates[1]],
            [center[0], center[1]],
          ],
          {name: "line1"}
      );
      let point = turf.point([center[0], center[1]]);
      // let radiusinkm = Math.round(Math.sqrt(area / Math.PI));
      let radiusinkm = feature.properties.radiusInKm;
      vm.centerCoordinate = [center[0], center[1]];
      let midPoint = turf.midpoint(onePoint, point);
      vm.markerCoordinate = [midPoint.geometry.coordinates[0], midPoint.geometry.coordinates[1]]
      vm.radius = parseInt(radiusinkm * 1000);
      if (vm.showSize) {
        vm.showMarkerCopy = true;
        let pointStyle = vm.oldStyles.filter(s =>
            s.id === "gl-draw-point-active")
        let lineStyle = vm.oldStyles.filter(s =>
            s.id === "gl-draw-line-active")
        // 先判断是否存在id为extent的线图层，有则删除，无则添加线图层
        if (vm.map.getLayer("centerPoint")) {
          vm.map.getSource('centerPoint').setData(point);
          if (vm.map.getLayer("centerPoint")) {
            vm.map.setPaintProperty("centerPoint", "circle-radius", pointStyle[0].paint['circle-radius']);
            vm.map.setPaintProperty("centerPoint", "circle-color", pointStyle[0].paint['circle-color']);
          }
        } else {
          vm.map.addSource("centerPoint", {
            type: "geojson",
            data: point,
          });
          vm.map.addLayer({
            id: "centerPoint",
            type: "circle",
            source: "centerPoint",
            paint: pointStyle[0].paint
          });
        }
        if (vm.map.getLayer("extent")) {
          vm.map.getSource('extent').setData(lineString);
          if (vm.map.getLayer("extent")) {
            vm.map.setPaintProperty("extent", "line-color", lineStyle[0].paint['line-color']);
            vm.map.setPaintProperty("extent", "line-width", lineStyle[0].paint['line-width']);
          }
        } else {
          vm.map.addSource("extent", {
            type: "geojson",
            data: lineString,
          });
          vm.map.addLayer({
            id: "extent",
            type: "line",
            source: "extent",
            // layout:style[0].layout,
            paint: lineStyle[0].paint
          });
        }
      }
    },
  },
};
</script>

<style>
.mapgis-draw-control > .mapgis-ui-space {
  width: 280px !important;
  overflow: hidden;
  /*transition: width 0.5s;*/
}
.mapgis-draw-control {
  width: fit-content;
  position: absolute;
  /*top: 10px;*/
  /*left: 10px;*/
  z-index: 3000;
}
.radiusValue{
  margin-bottom: calc(6vh);
  padding: 5px;
  border-radius: 5px;
  background-color: cornsilk;
}

</style>
