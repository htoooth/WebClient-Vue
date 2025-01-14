import mapboxgl from "@mapgis/mapbox-gl";
import bbox from "@turf/bbox";

import layerEvents from "../../lib/layerEvents";
import mixin from "./layerMixin";
import clonedeep from "lodash.clonedeep";
const Inspect = require("@mapgis/mapbox-gl-inspect");
const MapboxInspect = Inspect.default;

import Popup from "./geojson/Popup";

const HighLightPrefix = "_高亮边界线";

export default {
  name: "mapgis-geojson-layer",
  mixins: [mixin],
  components: { Popup },
  inject: ["map", "mapbox"],
  data() {
    return {
      currentClickInfo: [],
      currentHoverInfo: [],
      hoveredStateId: -1,
      clickMode: "click",
      hoverMode: "hover",
      popup: undefined,
      popupContainer: undefined,
      tipContainer: undefined,
      bbox: undefined,
    };
  },
  props: {
    data: {
      type: [String, Object],
    },
    enablePopup: {
      type: Boolean,
      default: false,
    },
    popupOptions: {
      type: Object,
      default: () => {
        return { type: "default", title: "name" };
      },
    },
    enableTips: {
      type: Boolean,
      default: false,
    },
    tipsOptions: {
      type: Object,
      default: () => {
        return { type: "default", title: "name" };
      },
    },
    /**
     * 当前图层的显示样式
     */
    layerStyle: {
      type: Object,
      default: () => {
        return {};
      },
    },
    /**
     * 当前图层的高亮样式
     */
    highlightStyle: {
      type: Object,
      default: () => {
        return {};
      },
    },
    /**
     *  自定义Popup界面,JSX语法Function(features) { return <div>自定义元素 {features[0]}</div>}
     */
    customPopup: Function,
    /**
     *  自定义Tips界面,JSX语法Function(features) { return <div>自定义元素 {features[0]}</div>}
     */
    customTips: Function,
    /**
     *  控制图层可见性
     */
    visible: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    getSourceFeatures() {
      return (filter) => {
        if (this.map) {
          return this.map.querySourceFeatures(this.sourceId || this.layerId, {
            filter,
          });
        }
        return null;
      };
    },

    getRenderedFeatures() {
      return (geometry, filter) => {
        if (this.map) {
          return this.map.queryRenderedFeatures(geometry, {
            layers: [this.layerId],
            filter,
          });
        }
        return null;
      };
    },

    getClusterExpansionZoom() {
      return (clusterId) => {
        return new Promise((resolve, reject) => {
          if (this.mapSource) {
            this.mapSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
              if (err) {
                return reject(err);
              }
              return resolve(zoom);
            });
          } else {
            return reject(
              new Error(
                `Map source with id ${this.sourceId || this.layerId} not found.`
              )
            );
          }
        });
      };
    },

    getClusterChildren() {
      return (clusterId) => {
        return new Promise((resolve, reject) => {
          const source = this.mapSource;
          if (source) {
            source.getClusterChildren(clusterId, (err, features) => {
              if (err) {
                return reject(err);
              }
              return resolve(features);
            });
          } else {
            return reject(
              new Error(
                `Map source with id ${this.sourceId || this.layerId} not found.`
              )
            );
          }
        });
      };
    },

    getClusterLeaves() {
      return (...args) => {
        return new Promise((resolve, reject) => {
          if (this.mapSource) {
            this.mapSource.getClusterLeaves(...args, (err, features) => {
              if (err) {
                return reject(err);
              }
              return resolve(features);
            });
          } else {
            return reject(
              new Error(
                `Map source with id ${this.sourceId || this.layerId} not found.`
              )
            );
          }
        });
      };
    },
  },
  watch: {
    visible(val, oldval) {
      if (val == true) {
        this.map.setLayoutProperty(this.layerId, "visibility", "visible");
      } else {
        this.map.setLayoutProperty(this.layerId, "visibility", "none");
      }
    },
  },
  created() {
    if (this.data) {
      this.$watch(
        () => this.data,
        function (next) {
          if (this.initial) return;
          this.mapSource.setData(next);
        },
        { deep: true }
      );
    }
    this.$_deferredMount();
  },

  render(h) {
    let {
      customPopup,
      customTips,
      clickMode,
      hoverMode,
      currentClickInfo,
      currentHoverInfo,
      popupOptions,
      tipsOptions,
    } = this;

    const tipfeature =
      currentHoverInfo && currentHoverInfo.length > 0
        ? currentHoverInfo[0]
        : { properties: {} };

    const clickfeature =
      currentClickInfo && currentClickInfo.length > 0
        ? currentClickInfo[0]
        : { properties: {} };

    /* this.tipContainer = getPopupHtml(tipsOptions.type, tipfeature, {
      title: tipfeature.title,
      fields: Object.keys(tipfeature.properties),
      style: {
        containerStyle: { width: "360px" }
      }
    }); */

    if (customPopup || customTips) {
      return (
        <div class="mapgis-geojson-custom-wrapper">
          <div ref="click">
            {customPopup && customPopup(currentClickInfo)}
            {!customPopup && (
              <Popup
                mode={clickMode}
                popupOptions={popupOptions}
                currentLayerInfo={currentClickInfo}
              ></Popup>
            )}
          </div>
          <div ref="hover">
            {customTips && customTips(currentHoverInfo)}
            {!customTips && (
              <Popup
                mode={hoverMode}
                currentLayerInfo={currentHoverInfo}
              ></Popup>
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div class="mapgis-2d-geojson-default-popup">
          <mapgis-ui-popup-content
            ref="click"
            feature={clickfeature}
            popupOptions={popupOptions}
          ></mapgis-ui-popup-content>
          <mapgis-ui-popup-content
            ref="hover"
            feature={tipfeature}
            popupOptions={tipsOptions}
          ></mapgis-ui-popup-content>
        </div>
      );
    }
  },

  mounted() {
    document.querySelector(".mapgis-2d-geojson-default-popup").style.display =
      "none";
  },

  methods: {
    $_deferredMount() {
      let { map, mapbox } = this;
      this.map.on("dataloading", this.$_watchSourceLoading);
      let source;
      if (this.data) {
        source = {
          type: "geojson",
          data: this.data,
        };
        this.parseData(this.data);
      } else if (this.source) {
        source = {
          type: "geojson",
          ...this.source,
        };
      }
      if (this.enablePopup) {
        source.generateId = true;
      }
      try {
        this.map.addSource(this.sourceId || this.layerId, source);
      } catch (err) {
        if (this.replaceSource) {
          this.map.removeSource(this.sourceId || this.layerId);
          this.map.addSource(this.sourceId || this.layerId, source);
        }
      }
      this.$_addLayer();
      this.$_addhoverLayer();

      this.$_bindLayerEvents(layerEvents);
      this.map.off("dataloading", this.$_watchSourceLoading);
      this.initial = false;

      let clickpopup = new mapbox.Popup({
        closeButton: true,
        closeOnClick: false,
      });
      let hoverpopup = new mapbox.Popup({
        closeButton: true,
        closeOnClick: false,
      });

      this.clickpopup = clickpopup;
      this.hoverpopup = hoverpopup;

      //添加map click/mousemove事件
      if (this.enablePopup) {
        this.$_addPopupEvents2(clickpopup);
        this.$_bindHightLayerEvent();
      }
      if (this.enableTips) {
        this.$_addMousemoveEvents(hoverpopup);
      }
    },

    /**
     * @description 此处和混入的beforeDestroy配合使用
     */
    $_beforeDestroy() {
      const { layerId, map, clickpopup, hoverpopup } = this;
      if (map) {
        try {
          if (map.getLayer(layerId + HighLightPrefix)) {
            map.removeLayer(layerId + HighLightPrefix);
          }
          if (clickpopup) {
            clickpopup.remove();
          }
          if (hoverpopup) {
            hoverpopup.remove();
          }
          map.off("click", layerId, function (e) {});
        } catch (err) {}
      }
    },

    $_addLayer() {
      const { layerId, sourceId, layer, map, replace, layerStyle } = this;
      const { type } = layerStyle;
      let existed = map.getLayer(layerId);
      if (existed) {
        if (replace) {
          map.removeLayer(layerId);
        } else {
          this.$_emitEvent("layer-exists", { layerId: layerId });
          return existed;
        }
      }
      let style;
      if (Object.keys(layer).length == 0) {
        if (type == "point") {
          style = {
            type: "circle",
            ...layerStyle.toMapboxStyle(),
          };
        } else if (type == "line") {
          style = {
            type: "line",
            ...layerStyle.toMapboxStyle(),
          };
        } else if (type == "fill") {
          style = {
            type: "fill",
            ...layerStyle.toMapboxStyle(),
          };
        } else if (type == "extrude") {
          style = {
            type: "fill-extrusion",
            ...layerStyle.toMapboxStyle(),
          };
        } else if (type == "text") {
          style = {
            type: "symbol",
            ...layerStyle.toMapboxStyle(),
          };
        } else if (type == "marker") {
          style = {
            type: "symbol",
            ...layerStyle.toMapboxStyle(),
          };
        }
      } else {
        style = layer;
      }
      let addlayer = {
        id: this.layerId,
        source: this.sourceId || this.layerId,
        layout: { visibility: "visible" },
        ...style,
      };
      this.map.addLayer(addlayer, this.before);
      this.$_emitEvent("added", { layerId: this.layerId });
    },

    parseData(data) {
      const vm = this;
      if (typeof data === "string") {
        fetch(data)
          .then((res) => res.json())
          .then((geojson) => {
            vm.parseBBox(geojson);
          });
      } else {
        vm.parseBBox(data);
      }
    },

    parseBBox(geojson) {
      this.bbox = bbox(geojson);
      this.$emit("bbox", { bbox: this.bbox });
    },

    setFeatureState(featureId, state) {
      if (this.map) {
        const params = { id: featureId, source: this.source };
        return this.map.setFeatureState(params, state);
      }
    },

    getFeatureState(featureId) {
      if (this.map) {
        const params = { id: featureId, source: this.source };
        return this.map.getFeatureState(params);
      }
    },

    removeFeatureState(featureId, sourceLayer, key) {
      if (this.map) {
        const params = {
          id: featureId,
          source: this.source,
          sourceLayer,
        };
        return this.map.removeFeatureState(params, key);
      }
    },
    $_addMousemoveEvents(popup) {
      let vm = this;
      let { map } = this;
      map.on("mousemove", vm.layerId, function (e) {
        if (e.features.length > 0) {
          let fs = clonedeep(e.features);
          let newfeatrues;
          if (vm.tipsOptions) {
            // if(vm.customTips){
            newfeatrues = fs.map((f) => {
              let properties = f.properties;
              f.properties = {};
              //  赋值fields
              let fields = vm.tipsOptions.fields;
              if (!fields) {
                f.properties = properties;
              } else {
                fields.forEach((field) => {
                  f.properties[field] = properties[field];
                });
              }
              //  赋值title
              let titlefield = vm.tipsOptions.title;
              if (titlefield) {
                f.title = properties[titlefield];
              } else {
                // f.title = "";
              }
              return f;
            });
          } else {
            newfeatrues = fs;
          }
          vm.currentHoverInfo = [newfeatrues[0]];
          // }
          popup
            .setLngLat(e.lngLat)
            // .setHTML(vm.tipContainer)
            .setDOMContent(vm.$refs.hover.$el || vm.$refs.hover)
            .addTo(map);
        }
      });
      map.on("mouseleave", vm.layerId, function () {
        map.getCanvas().style.cursor = "";
        popup.remove();
      });
    },
    /** 通过inspect插件查询geojson属性 */
    $_addPopupEvents() {
      let { map } = this;
      let vm = this;
      if (!map || !map.getStyle()) {
        return;
      }
      if (
        this.$parent.popupInspect == null &&
        this.$parent.popupInspect === undefined
      ) {
        const inspect = new MapboxInspect({
          popup: new mapboxgl.Popup({
            closeOnClick: false,
            closeButton: true,
          }),
          // showInspectMap: true,
          showMapPopup: vm.enablePopup,
          showMapPopupOnHover: false,
          showInspectMapPopupOnHover: false,
          showInspectButton: false,
          blockHoverPopupOnClick: false,
          queryParameters: {
            layers: [this.layerId],
          },
          renderPopup: (features) => {
            let fs = clonedeep(features);
            let parentPopupLayers = this.$parent.popupLayers;
            let newfeatrues;
            // 针对属性进行过滤显示
            let layerIds = Object.keys(parentPopupLayers);
            newfeatrues = fs.map((f) => {
              if (parentPopupLayers.hasOwnProperty(f.layer.id)) {
                let properties = f.properties;
                f.properties = {};
                //  赋值fields
                let fields = parentPopupLayers[f.layer.id].fields;
                if (!fields) {
                  f.properties = properties;
                } else {
                  fields.forEach((field) => {
                    f.properties[field] = properties[field];
                  });
                }
                //  赋值title
                let titlefield = parentPopupLayers[f.layer.id].title;
                if (titlefield) {
                  f.title = properties[titlefield];
                } else {
                  // f.title = "";
                }
              }
              return f;
            });
            vm.currentClickInfo = newfeatrues;
            /* const popupfeature =
              vm.currentClickInfo && vm.currentClickInfo.length > 0
                ? vm.currentClickInfo[0]
                : { properties: {} };
            vm.popupContainer = getPopupHtml(
              vm.popupOptions.type,
              popupfeature,
              {
                title: popupfeature.title,
                fields: Object.keys(popupfeature.properties),
                style: {
                  containerStyle: { width: "360px" },
                },
              }
            ); */
            return vm.$refs.click.$el || vm.$refs.click;
            // return vm.popupContainer;
          },
        });
        map.addControl(inspect);
        this.$parent.popupInspect = inspect;
      } else {
        //排除重复layerID
        let inspect = this.$parent.popupInspect;
        let originQueryParameters = inspect.options.queryParameters;
        if (originQueryParameters.layers.indexOf(this.layerId) === -1) {
          inspect.options.queryParameters.layers.push(this.layerId);
        }
      }
      if (this.popupOptions) {
        this.$parent.popupLayers = this.$parent.popupLayers || {};
        if (this.$parent.popupLayers) {
          if (this.$parent.popupLayers.hasOwnProperty(vm.layerId)) {
            this.$parent.popupLayers[vm.layerId] = this.popupOptions;
          } else {
            this.$parent.popupLayers[vm.layerId] = this.popupOptions;
          }
        }
      }
    },
    /** 通过mapboxgl原生方法查询 */
    $_addPopupEvents2(popup) {
      let { map } = this;
      const { layerId } = this;
      let vm = this;

      map.on("click", layerId, function (e) {
        if (vm.clickpopup) {
          vm.clickpopup.remove();
          vm.clickpopup = undefined;
        }

        const bbox = [
          [e.point.x - 5, e.point.y - 5],
          [e.point.x + 5, e.point.y + 5],
        ];
        const feature = map.queryRenderedFeatures(bbox, {
          layers: [layerId],
        });

        if (!map || !map.getStyle()) {
          return;
        }

        if (feature.length > 0) {
          vm.currentClickInfo = [feature[0]];
          popup
            .setLngLat(e.lngLat)
            .setDOMContent(vm.$refs.click.$el || vm.$refs.click)
            .addTo(map);
        }
      });
    },
    changePane(key) {
      let vm = this;
      let checkedLayer;
      for (let i = 0; i < vm.currentClickInfo.length; i++) {
        if (key === i) {
          checkedLayer = vm.currentClickInfo[i];
        }
      }
      this.$emit("select-layer", checkedLayer);
    },
    $_bindHightLayerEvent() {
      const vm = this;
      let { map } = this;
      map.on("click", this.layerId, function (e) {
        if (e.features.length > 0) {
          if (vm.hoveredStateId !== null) {
            map.setFeatureState(
              { source: vm.sourceId || vm.layerId, id: vm.hoveredStateId },
              { hover: false }
            );
          }
          vm.hoveredStateId = e.features[0].id;
          map.setFeatureState(
            { source: vm.sourceId || vm.layerId, id: vm.hoveredStateId },
            { hover: true }
          );
        }
      });
    },
    $_addhoverLayer() {
      let highlight;
      let { map, layer, layerId, sourceId, highlightStyle } = this;
      sourceId = sourceId || layerId;
      const { type, point, line, polygon, extrude, text, marker } =
        highlightStyle;

      if (Object.keys(layer).length == 0) {
        if (!type) return;
        if (type == "point" || point) {
          if (!point) return;
          highlight = {
            id: layerId + HighLightPrefix,
            type: "circle",
            source: sourceId,
            ...point.toMapboxStyle({ highlight: true }),
          };
        } else if (type == "line" || line) {
          if (!line) return;
          highlight = {
            id: layerId + HighLightPrefix,
            type: "line",
            source: sourceId,
            ...line.toMapboxStyle({ highlight: true }),
          };
        } else if (type == "polygon" || polygon) {
          if (!polygon) return;
          highlight = {
            id: layerId + HighLightPrefix,
            type: "fill",
            source: sourceId,
            ...polygon.toMapboxStyle({ highlight: true }),
          };
        } else if (type == "extrude" || extrude) {
          if (!extrude) return;
          highlight = {
            id: layerId + HighLightPrefix,
            type: "fill-extrusion",
            source: sourceId,
            ...extrude.toMapboxStyle({ highlight: true }),
          };
        } else if (type == "text" || text) {
          if (!text) return;
          highlight = {
            id: layerId + HighLightPrefix,
            type: "symbol",
            source: sourceId,
            ...text.toMapboxStyle({ highlight: true }),
          };
        } else if (type == "marker" || marker) {
          if (!marker) return;
          highlight = {
            id: layerId + HighLightPrefix,
            type: "symbol",
            source: sourceId,
            ...marker.toMapboxStyle({ highlight: true }),
          };
        }
        if (!map.getLayer(highlight.id)) map.addLayer(highlight);
      } else {
        if (this.layer.type === "fill") {
          if (!line) return;
          highlight = {
            id: layerId + HighLightPrefix,
            type: "line",
            source: sourceId,
            ...line.toMapboxStyle({ highlight: true }),
          };
        } else if (this.layer.type === "fill-extrusion") {
          if (!extrude) return;
          highlight = {
            id: layerId + HighLightPrefix,
            type: "fill-extrusion",
            source: sourceId,
            ...extrude.toMapboxStyle({ highlight: true }),
          };
        } else if (this.layer.type === "line") {
          if (!line) return;
          highlight = {
            id: layerId + HighLightPrefix,
            type: "line",
            source: sourceId,
            ...line.toMapboxStyle({ highlight: true }),
          };
        } else if (this.layer.type === "circle") {
          if (!point) return;
          highlight = {
            id: layerId + HighLightPrefix,
            type: "circle",
            source: sourceId,
            ...point.toMapboxStyle({ highlight: true }),
          };
        } else if (this.layer.type === "text") {
          if (!text) return;
          highlight = {
            id: layerId + HighLightPrefix,
            type: "circle",
            source: sourceId,
            ...text.toMapboxStyle({ highlight: true }),
          };
        } else if (this.layer.type === "marker") {
          if (!marker) return;
          highlight = {
            id: layerId + HighLightPrefix,
            type: "circle",
            source: sourceId,
            ...marker.toMapboxStyle({ highlight: true }),
          };
        }
        if (highlight && !map.getLayer(highlight.id)) map.addLayer(highlight);
      }
    },
  },
};
