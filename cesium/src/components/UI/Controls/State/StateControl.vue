<script>
import VueOptions from "../../../Base/Vue/VueOptions";
import debounce from "lodash/debounce";

export default {
  name: "mapgis-3d-statebar",
  mixins: [],
  inject: ["Cesium", "viewer"],
  props: {
    ...VueOptions,
    outStyle: {
      type: Object,
    },
    info: {
      type: Object,
    },
    showHpr: {
      type: Boolean,
      default: false,
    },
    showSelectTileInfo: {
      type: Boolean,
      default: false,
    },
    showViewLevelInfo: {
      type: Boolean,
      default: false,
    },
    frame: {
      type: Number,
      default: 10,
    },
    /** 是否强制显示在地图底部，false时用户自定义样式 */
    bottomMap: {
      type: Boolean,
      default: false,
    },
  },

  computed: {},

  model: {
    props: "info",
    event: "change",
  },

  data() {
    return {
      initial: true,
      control: undefined,
      viewLevel: 0,
      longitude: 0,
      latitude: 0,
      cameraHeight: 0,
      height: 0,
      selectedTile: undefined,
    };
  },

  created() {
    this.bindEvent();
  },
  mounted() {
    this.mount();
  },
  destroyed() {
    this.unmount();
  },

  methods: {
    bindEvent() {
      this.$_frame = -1;
      this.levelEvent = debounce(
        () => {
          this.updateViewLevel();
        },
        100,
        { leading: true }
      );
    },
    mount() {
      this.showPosition();
    },
    unmount() {
      const { viewer, vueKey, vueIndex, bottomMap } = this;
      const { container } = viewer;
      let find = window.vueCesium.EventHandlerManager.findSource(
        vueKey,
        vueIndex
      );
      if (find) {
        find.source.destroy && find.source.destroy();
      }
      window.vueCesium.EventHandlerManager.deleteSource(vueKey, vueIndex);
      if (bottomMap) {
        let dom = false;
        const name = "mapgis-3d-statebar";
        /* container.children.forEach((element) => {
          if (element.className == name) {
            dom = element;
          }
        }); */
        for (let i = 0; i < container.children.length; i++) {
          let element = container.children[i];
          if (element.className == name) {
            dom = element;
          }
        }
        if (dom) {
          container.removeChild(dom);
        }
      }
    },
    showPosition() {
      const vm = this;
      let { Cesium, viewer, vueIndex, vueKey, frame } = this;

      if (vueKey && vueIndex) {
        let screenSpaceMouseEventHandler = new Cesium.ScreenSpaceEventHandler(
          viewer.scene.canvas
        );

        screenSpaceMouseEventHandler.setInputAction((movement) => {
          // vm.updateViewLevel();
          // vm.selectTile(movement.endPosition);
          // vm.selectedTile = vm.selectTile(movement.endPosition);
          if (++vm.$_frame % frame == 0) {
            vm.updateShowInfo(movement.endPosition);
          }
          if (vm.$_frame > 10000000) {
            vm.$_frame = 0;
          }
          lastScreenPos = movement.endPosition;
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        screenSpaceMouseEventHandler.setInputAction(() => {
          // vm.updateViewLevel();
          // vm.selectTile(lastScreenPos);
          // vm.selectedTile = vm.selectTile(lastScreenPos);
          if (++vm.$_frame % frame == 0) {
            vm.updateShowInfo(lastScreenPos);
          }
          if (vm.$_frame > 10000000) {
            vm.$_frame = 0;
          }
        }, Cesium.ScreenSpaceEventType.WHEEL);
        window.vueCesium.EventHandlerManager.addSource(
          vueKey,
          vueIndex,
          screenSpaceMouseEventHandler
        );
      }

      let lastScreenPos;

      viewer.scene.globe.tileLoadProgressEvent.addEventListener(() => {
        // vm.updateViewLevel();
        vm.levelEvent();
      });
      viewer.camera.changed.addEventListener(() => {
        // vm.updateViewLevel();
        vm.levelEvent();
      });
    },
    selectTile(e) {
      let { Cesium, viewer } = this;
      let selectedTileTmp;
      const ellipsoid = viewer.scene.globe.ellipsoid;

      let cartesian = viewer.scene.camera.pickEllipsoid(e, ellipsoid);
      if (Cesium.defined(cartesian)) {
        const cartographic = ellipsoid.cartesianToCartographic(cartesian);
        const tilesRendered =
          viewer.scene.globe._surface.tileProvider._tilesToRenderByTextureCount;
        for (
          let textureCount = 0;
          !selectedTileTmp && textureCount < tilesRendered.length;
          textureCount += 1
        ) {
          const tilesRenderedByTextureCount = tilesRendered[textureCount];
          if (Cesium.defined(tilesRenderedByTextureCount)) {
            for (
              let tileIndex = 0;
              !selectedTileTmp &&
              tileIndex < tilesRenderedByTextureCount.length;
              tileIndex += 1
            ) {
              const tile = tilesRenderedByTextureCount[tileIndex];
              if (Cesium.Rectangle.contains(tile.rectangle, cartographic)) {
                selectedTileTmp = tile;
              }
            }
          }
        }
      }
      return selectedTileTmp;
    },
    updateViewLevel() {
      let { Cesium, viewer } = this;
      const tilesToRender =
        viewer.scene.globe._surface.tileProvider._tilesToRenderByTextureCount;
      for (let i = 0; i < tilesToRender.length; i += 1) {
        if (tilesToRender[i]) {
          for (
            let tileIndex = 0;
            tileIndex < tilesToRender[i].length;
            tileIndex += 1
          ) {
            if (
              Cesium.Rectangle.contains(
                tilesToRender[i][tileIndex].rectangle,
                viewer.camera.positionCartographic
              )
            ) {
              this.viewLevel = tilesToRender[i][tileIndex]._level;
            }
          }
        }
      }
    },
    updateShowInfo(screenPos) {
      let {
        viewLevel,
        height,
        Cesium,
        viewer,
        showHpr,
        showSelectTileInfo,
        showViewLevelInfo,
      } = this;

      let vm = this;

      let cartesian = viewer.getCartesian3Position(screenPos, cartesian);
      const ellipsoid = viewer.scene.globe.ellipsoid;
      const { camera } = viewer;
      let longlatHeight = "";
      if (cartesian) {
        const cartographic = ellipsoid.cartesianToCartographic(cartesian);
        this.longitude = Cesium.Math.toDegrees(cartographic.longitude).toFixed(
          4
        );
        this.latitude = Cesium.Math.toDegrees(cartographic.latitude).toFixed(4);
        this.cameraHeight = Math.ceil(
          camera.positionCartographic.height
        ).toFixed(0);
        this.height = Math.max(
          viewer.scene.globe.getHeight(cartographic),
          cartographic.height
        ).toFixed(0);
        this.$emit("change", {
          longitude: this.longitude,
          latitude: this.latitude,
          cameraHeight: this.cameraHeight,
          height: this.height,
        });
      }
      /* let strHpr = "";
      if (showHpr) {
        strHpr = ` heading：${Cesium.Math.toDegrees(camera.heading).toFixed(
          1
        )} pitch：${Cesium.Math.toDegrees(camera.pitch).toFixed(
          1
        )} roll：${Cesium.Math.toDegrees(camera.roll).toFixed(1)}`;
      }
      let selectTileInfo = "";
      if (showSelectTileInfo && selectedTile) {
        selectTileInfo = `，瓦片X:${selectedTile.x}，瓦片Y:${selectedTile.y}，瓦片级别:${selectedTile.level}，`;
      }
      if (height === undefined || height < -7000) {
        height = 0;
      }
      let level = "";
      if (showViewLevelInfo) {
        level = `当前地图级别:${viewLevel}`;
      }
      const iHtml = longlatHeight + strHpr + selectTileInfo + level;
      document.getElementById(elementId).innerHTML = iHtml; */
    },
  },

  render(h) {
    const { longitude, latitude, height, cameraHeight } = this;
    const { viewer, bottomMap } = this;
    let span = `经度:${longitude}°，纬度:${latitude}°， 海拔高度: ${height},米，相机高度:${cameraHeight}米`;
    const { container, outStyle } = viewer;
    const name = "mapgis-3d-statebar";
    if (bottomMap) {
      let dom = false;
      if (container && container.children) {
        for (let i = 0; i < container.children.length; i++) {
          let element = container.children[i];
          if (element.className == name) {
            dom = element;
          }
        }
        /* container.children.forEach((element) => {
          if (element.className == name) {
            dom = element;
          }
        }); */
      }
      if (dom) {
        dom.children[0].innerText = span;
      } else {
        dom = window.document.createElement("div");
        dom.className = name;
        let spandom = window.document.createElement("span");
        spandom.innerText = span;
        dom.appendChild(spandom);
        // dom.style = outStyle;
        container.appendChild(dom);
      }
      return h("span");
    } else {
      return h(
        "div",
        {
          class: "mapgis-3d-statebar",
        },
        [
          h(
            "span",
            {
              innerText: span,
            },
            [span]
          ),
        ]
      );
    }
  },
};
</script>
