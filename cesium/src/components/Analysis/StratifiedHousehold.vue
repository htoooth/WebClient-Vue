<template>
  <div class="mapgis-3d-stratified-household-wrapper">
    <mapgis-ui-collapse-card
      class="mapgis-3d-stratified-household"
      ref="card"
      position="top-left"
      :defaultCollapse="false"
      :outStyle="outStyle"
      :title="title"
      @toggle-main="handleBackMain"
    >
      <mapgis-ui-iconfont type="mapgis-layer1" slot="icon-hiden" />
      <template slot="title">
        <div v-if="layers && layers.length > 0">
          <mapgis-ui-select
            class="mapgis-3d-stratified-household-layers"
            :disabled="disableLayerSelect"
            :autoWidth="true"
            size="small"
            @change="handleSelectChange"
            placeholder="请选择图层"
          >
            <mapgis-ui-select-option
              v-for="(l, i) in layers"
              :key="i"
              :value="l.vueIndex"
              >{{ l.title }}</mapgis-ui-select-option
            >
          </mapgis-ui-select>
        </div>
        <span v-else class="mapgis-3d-stratified-household-title">{{
          title
        }}</span>
      </template>
      <mapgis-ui-space
        slot="extra"
        class="mapgis-3d-stratified-household-icons"
      >
        <mapgis-ui-tooltip
          v-for="(m, i) in enableCollapse ? menus : collapsemenus"
          :key="i"
        >
          <template slot="title">{{ m.title }}</template>
          <mapgis-ui-iconfont
            :class="{ active: m.active }"
            :type="m.icon"
            @click="handleMenu(m.title)"
          />
        </mapgis-ui-tooltip>
      </mapgis-ui-space>
      <mapgis-ui-row class="mapgis-3d-g3d-document">
        <mapgis-ui-input-search
          style="margin-bottom: 8px"
          placeholder="搜索"
          @change="onChange"
        />
        <mapgis-ui-tree
          class="mapgis-3d-g3d-document-tree"
          checkable
          showIcon
          v-model="layerIds"
          :expanded-keys="expandedKeys"
          :auto-expand-parent="autoExpandParent"
          :tree-data="layerTree"
          :selectedKeys="selectedKeys"
          @expand="onExpand"
          @select="onSelect"
        >
          <template slot="custom" slot-scope="{}">
            <!-- <mapgis-ui-iconfont :type="icon" /> -->
          </template>
          <template
            slot="title"
            slot-scope="{ title, icon, version, gdbp, layerIndex, key }"
          >
            <span
              :class="{
                'mapgis-3d-stratified-household-span': true,
                'mapgis-3d-stratified-household-span-inline': true,
                select: selectLayerIndex == layerIndex
              }"
            >
              <span v-if="title && title.indexOf(searchValue) > -1">
                {{ title.substr(0, title.indexOf(searchValue)) }}
                <span style="color: #f50">{{ searchValue }}</span>
                {{
                  title.substr(title.indexOf(searchValue) + searchValue.length)
                }}
              </span>
              <span v-else>{{ title }}</span>
              <span
                v-if="version"
                class="mapgis-3d-stratified-household-version"
                >版本:{{ version }}</span
              >
              <mapgis-ui-tooltip v-for="(s, j) in submenus" :key="j">
                <template slot="title">{{ s.tooltip() }}</template>
                <mapgis-ui-iconfont
                  v-if="!isolation || selectLayerIndex == layerIndex"
                  :type="s.icon()"
                  :class="{
                    iconfont: true,
                    'iconfont-disabled': !enableStratifiedHouse
                  }"
                  @click="
                    s.click({
                      title,
                      icon,
                      version,
                      gdbp,
                      layerIndex,
                      key
                    })
                  "
                />
              </mapgis-ui-tooltip>
            </span>
          </template>
        </mapgis-ui-tree>
      </mapgis-ui-row>

      <StratifiedHouseholdMenus
        slot="panel"
        size="big"
        mode="m3d"
        :version="version"
        :g3dLayerIndex="g3dLayerIndex"
        :layerIndex="selectLayerIndex"
        :gdbp="gdbp"
        @enable-dynamic-query="handleDynamicQuery"
      >
      </StratifiedHouseholdMenus>
    </mapgis-ui-collapse-card>
    <mapgis-3d-feature-popup
      v-if="featureposition"
      :position="featureposition"
      :popupOptions="popupOptions"
      v-model="featurevisible"
    >
      <mapgis-3d-popup-iot
        :properties="featureproperties"
        :getProjectorStatus="getProjectorStatus"
        @project-screen="handleProjectScreen"
      >
      </mapgis-3d-popup-iot>
    </mapgis-3d-feature-popup>
    <!-- <mapgis-ui-slider-panel
      class="mapgis-3d-stratified-household-slider-tree"
      :values="layerTree"
      :customLabel="customLabel"
      @change="changeSimpleMenu"
      @changeSlider="changeSimpleSlider"
    >
    </mapgis-ui-slider-panel> -->
  </div>
</template>

<script>
import BaseLayer from "./BaseLayer";
import StratifiedHouseholdMenus from "./StratifiedHouseholdMenus.vue";
import { rgbToHex } from "../Utils/common/color-util";

export default {
  name: "mapgis-3d-stratified-household",
  inject: ["Cesium", "vueCesium", "viewer"],
  mixins: [BaseLayer],
  props: {
    getProjectorStatus: {
      type: Function,
      default: () => {}
    },
    outStyle: {
      type: Object,
      default: () => {
        return {
          position: "absolute",
          zIndex: 1000,
          padding: "0px",
          margin: "0px",
          height: "450px",
          width: "270px",
          top: "0px",
          left: "0px"
        };
      }
    },
    /**
     * @description 分层分户的图层列表, 每个内部{title, vueIndex},
     * @see vueIndex表示当前激活的图层序号
     */
    layers: { type: Array, default: () => [] },
    /**
     * @description 是否激活查询弹窗
     */
    enablePopup: { type: Boolean, default: true },
    popupOptions: {
      type: Object,
      default: () => {
        return { popupType: "card" };
      }
    },
    enableCollapse: { type: Boolean, default: true },
    enableStratifiedHouse: { type: Boolean, default: false },
    enableDynamicQuery: { type: Boolean, default: false },
    /**
     * 选中要素高亮颜色，支持rgb，rgba和十六进制格式
     */
    featureHighlightColorProp: {
      type: String,
      default: "rgba(255,255,0,0.5)"
    },
    /**
     * 选中图层高亮颜色，支持rgb，rgba和十六进制格式
     */
    layerHighlightColorProp: {
      type: String,
      default: "rgba(255,0,0,0.5)"
    }
  },
  components: {
    StratifiedHouseholdMenus
  },
  computed: {
    layerHighlightColor() {
      let color = `color('#FFFF00', 1)`;
      if (this.layerHighlightColorProp.includes("#")) {
        color = `color('${this.layerHighlightColorProp}',1)`;
      } else if (this.layerHighlightColorProp.includes("rgb")) {
        const hex = rgbToHex(this.layerHighlightColorProp);
        let a = 1;
        if (this.layerHighlightColorProp.includes("rgba")) {
          const strs = this.layerHighlightColorProp.split(",");
          a = strs[strs.length - 1].split(")")[0];
        }
        color = `color('${hex}',${a})`;
      }
      return color;
    }
  },
  data() {
    return {
      innerVueIndex: this.vueIndex,
      title: "分层分户",
      layerIds: [],
      menus: [
        {
          title: "查询",
          icon: "mapgis-highlight",
          active: this.enablePopup
        },
        {
          title: "模型爆炸",
          icon: "mapgis-fire1",
          active: false
        },
        {
          title: "隐藏面板",
          icon: "mapgis-hide",
          active: false
        }
      ],
      collapsemenus: [
        {
          title: "查询",
          icon: "mapgis-highlight",
          active: this.enablePopup
        },
        {
          title: "模型爆炸",
          icon: "mapgis-fire1",
          active: false
        }
      ],
      submenus: [
        {
          title: "进入图层菜单",
          tooltip: () =>
            this.enableStratifiedHouse
              ? "进入图层菜单"
              : "请按照分层分户要求制作数据",
          icon: () => "mapgis-layer",
          click: payload => {
            if (this.enableStratifiedHouse) {
              this.handleActiveItemKey(payload);
            }
          }
        },
        {
          title: "锁定/解锁图层",
          tooltip: () =>
            this.enableStratifiedHouse
              ? "锁定/解锁图层"
              : "请按照分层分户要求制作数据",
          icon: key => (this.layerKey == key ? "mapgis-lock" : "mapgis-unlock"),
          click: payload => {
            if (this.enableStratifiedHouse) {
              this.changeIsolation(payload);
            }
          }
        }
      ],
      layerTree: [],
      expandedKeys: [],
      searchValue: "",
      autoExpandParent: true,
      expandItemKey: undefined,
      activeItemKey: undefined,
      gdbp: undefined,
      g3dLayerIndex: undefined, // g3d图层再整个viewer中的顺序
      layerKey: undefined,
      selectLayerIndex: undefined, // 当前g3d图层中子图层m3d的图层顺序
      selectedKeys: [],
      version: undefined,
      isolation: false,
      featureposition: undefined, // {longitude: 0, latitude: 0, height: 0},
      featureproperties: undefined,
      featurevisible: undefined,
      featureclickenable: this.enablePopup,
      disableLayerSelect: false,
      prePickFeature: undefined, // 上次选中的要素
      prePickFeatureColor: undefined // 上次选中要素的颜色，便于恢复
    };
  },
  provide() {
    const self = this;
    return {
      get m3ds() {
        return self.m3ds;
      }
    };
  },
  created() {},
  mounted() {
    this.mount();
  },
  destroyed() {
    this.restoreHighlight();
    this.restoreOriginStyle();
    this.unmount();
  },
  watch: {
    enablePopup(next) {
      this.featureclickenable = next;
      if (next) {
        this.$_bindPickFeature();
      } else {
        this.$_unbindPickFeature();
      }
    },
    layerIds(next) {
      this.changeLayerVisible(this.layerIds);
    },
    innerVueIndex(next) {
      this.unmount();
      this.mount();
    }
  },
  methods: {
    createCesiumObject() {
      return this.g3dIsReady();
    },
    /**
     * 判断传入的m3d图层是否加载完毕
     */
    g3dIsReady() {
      const { vueCesium, vueKey, model, innerVueIndex } = this;
      return new Promise((resolve, reject) => {
        let layerIndex = 0;
        this.$_getG3DByInterval(
          function(g3ds) {
            if (g3ds && g3ds.length > 0) {
              if (
                !g3ds[layerIndex] ||
                !g3ds[layerIndex].hasOwnProperty("options") ||
                !g3ds[layerIndex].options
              ) {
                reject(null);
              } else {
                resolve(g3ds[layerIndex]);
              }
            } else {
              reject(null);
            }
          },
          vueKey,
          innerVueIndex
        );
      });
    },
    mount() {
      const vm = this;
      const { innerVueIndex, vueKey, vueCesium } = this;
      const { viewer, enablePopup } = this;

      let promise = this.createCesiumObject();
      promise.then(find => {
        if (find && find.options) {
          let { m3ds, g3dLayerIndex } = find.options;

          if (!(typeof g3dLayerIndex === "number") || g3dLayerIndex < 0) return;
          let g3dLayer = viewer.scene.layers.getLayer(g3dLayerIndex);
          this.g3dLayerIndex = g3dLayerIndex;
          let layerIndexs = g3dLayer.getM3DLayerIndexes();
          let all = [];
          vm.m3ds = m3ds;
          m3ds.forEach((m3d, i) => {
            // 形参的m3d并不是表示序号i对应的图层，下一行才是序号i对应的图层
            let gIndex = layerIndexs[i];
            let info = g3dLayer.getLayerInfo(gIndex);
            let { layerName, gdbpUrl, layerType } = info;
            all.push(`${gIndex}`);
            vm.layerTree.push({
              title: layerName,
              key: `${gIndex}`,
              version: g3dLayer.version,
              layerIndex: gIndex,
              layerType,
              gdbp: gdbpUrl,
              icon: "mapgis-layer",
              menu: "mapgis-down",
              scopedSlots: {
                icon: "custom",
                title: "title"
              }
            });
          });
          vm.layerIds = all;
          vm.$emit("loaded", { component: vm });
          vm.version = g3dLayer.version;
          let modelExplosion = new Cesium.ModelExplosion(viewer);
          let collection = new Cesium.PrimitiveCollection();
          vueCesium.StratifiedHousehouldManager.addSource(
            vueKey,
            innerVueIndex,
            g3dLayer,
            {
              m3ds: m3ds,
              modelExplosion: modelExplosion,
              collection: collection,
              primitiveCollection: viewer.scene.primitives.add(collection)
            }
          );
          vm.recordOriginStyle();
          if (enablePopup) {
            vm.$_bindPickFeature();
          }
        }
      });

      if (viewer.isDestroyed()) return;
    },
    unmount() {
      const { vueCesium, vueKey, innerVueIndex } = this;
      const { viewer } = this;
      let find = vueCesium.StratifiedHousehouldManager.findSource(
        vueKey,
        innerVueIndex
      );
      if (find && find.options) {
        /* let { m3ds } = find.options;
        if (!viewer.isDestroyed() && m3ds) {
          m3ds.forEach(l => l.destroy());
        } */
      }
      this.$emit("unload", { component: this });
      vueCesium.StratifiedHousehouldManager.deleteSource(vueKey, innerVueIndex);
      if (this.interval) {
        clearInterval(this.interval);
      }
    },
    // 搜索需要
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    handleSelectChange(vueIndex) {
      this.innerVueIndex = vueIndex;
      let finds = this.layers.filter(l => l.vueIndex == vueIndex);
      if (finds && finds.length > 0) {
        this.$emit("change-layer", finds[0]);
      }
    },
    getParentKey(key, tree) {
      let parentKey;
      for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
          if (node.children.some(item => item.key === key)) {
            parentKey = node.key;
          } else if (this.getParentKey(key, node.children)) {
            parentKey = this.getParentKey(key, node.children);
          }
        }
      }
      return parentKey;
    },
    onChange(e) {
      let { layerTree } = this;
      const dataList = [];
      const generateList = data => {
        for (let i = 0; i < data.length; i++) {
          const node = data[i];
          const { key } = node;
          dataList.push({ key, title: key });
          if (node.children) {
            generateList(node.children);
          }
        }
      };
      generateList(layerTree);

      const value = e.target.value;
      const expandedKeys = dataList
        .map(item => {
          if (item.title.indexOf(value) > -1) {
            return this.getParentKey(item.key, layerTree);
          }
          return null;
        })
        .filter((item, i, self) => item && self.indexOf(item) === i);
      Object.assign(this, {
        expandedKeys,
        searchValue: value,
        autoExpandParent: true
      });
    },
    onSelect(e, payload) {
      this.selectedKeys = e;
      const { selectedNodes } = payload;
      if (selectedNodes && selectedNodes.length > 0) {
        let { data } = selectedNodes[0];
        let { props } = data;
        let { layerIndex } = props;
        this.highlightM3d(layerIndex);
      }
    },
    changeLayerVisible(layers) {
      layers = layers || this.layerIds;
      const { vueKey, innerVueIndex, vueCesium } = this;
      let find = vueCesium.G3DManager.findSource(vueKey, innerVueIndex);
      if (find && find.options) {
        let m3ds = find.options.m3ds;
        if (!m3ds) return;
        m3ds.forEach((m3d, i) => {
          if (layers) {
            if (layers.indexOf(`${i}`) >= 0) {
              m3d.show = true;
            } else {
              m3d.show = false;
            }
          } else {
            m3d.show = true;
          }
        });
      }
    },
    handleExpandItemKey(key) {
      if (key == this.expandItemKey) {
        this.expandItemKey = undefined;
      } else {
        this.expandItemKey = key;
      }
    },
    handleActiveItemKey(layer) {
      const { title, version, gdbp, layerIndex, key } = layer;
      this.title = title;
      this.gdbp = gdbp;
      this.version = version;
      this.selectLayerIndex = layerIndex;
      this.layerKey = key;
      this.$refs.card && this.$refs.card.togglePanel();
      this.disableLayerSelect = true;
    },
    handleProjectScreen(payload) {
      this.$emit("project-screen", payload);
    },
    recordOriginStyle() {
      const { g3dLayerIndex, viewer } = this;
      const { vueKey, innerVueIndex, vueCesium } = this;

      if (!(typeof g3dLayerIndex === "number") || g3dLayerIndex < 0) return;
      let g3dLayer = viewer.scene.layers.getLayer(g3dLayerIndex);
      let layerIndexs = g3dLayer.getM3DLayerIndexes();
      let originStyles = [];
      layerIndexs.forEach(index => {
        let m3dlayer = g3dLayer.getLayer(index);
        originStyles.push(m3dlayer.style);
      });
      vueCesium.StratifiedHousehouldManager.changeOptions(
        vueKey,
        innerVueIndex,
        "originStyles",
        originStyles
      );
    },
    restoreOriginStyle() {
      const { vueKey, innerVueIndex, vueCesium, g3dLayerIndex } = this;
      let find = vueCesium.StratifiedHousehouldManager.findSource(
        vueKey,
        innerVueIndex
      );

      if (!(typeof g3dLayerIndex === "number") || g3dLayerIndex < 0) return;
      let g3dLayer = viewer.scene.layers.getLayer(g3dLayerIndex);
      if (find && find.options.originStyles) {
        find.options.originStyles.forEach((s, i) => {
          let m3dlayer = g3dLayer.getLayer(`${i}`);
          m3dlayer.style = s;
        });
      }
    },
    restoreHighlight() {
      const { g3dLayerIndex, viewer } = this;

      if (!(typeof g3dLayerIndex === "number") || g3dLayerIndex < 0) return;
      let g3dLayer = viewer.scene.layers.getLayer(g3dLayerIndex);
      let m3ds = g3dLayer.getM3DLayerIndexes();
      m3ds.forEach(index => {
        let m3d = g3dLayer.getLayer(index);
        if (m3d) {
          m3d.reset(); //该函数目前底层MapGISM3DSet.reset无效 后期记得修改
          m3d.pickedOid = undefined;
        }
      });
    },
    restoreOrigindVisible() {
      const { vueKey, innerVueIndex, vueCesium, g3dLayerIndex } = this;
      let find = vueCesium.StratifiedHousehouldManager.findSource(
        vueKey,
        innerVueIndex
      );

      if (!(typeof g3dLayerIndex === "number") || g3dLayerIndex < 0) return;
      let g3dLayer = viewer.scene.layers.getLayer(g3dLayerIndex);
      if (find && find.options.originStyles) {
        find.options.originStyles.forEach((s, i) => {
          let m3dlayer = g3dLayer.getLayer(`${i}`);
          m3dlayer.show = true;
        });
      }
    },
    changeIsolation(layer) {
      const { key } = layer;
      const vm = this;
      if (this.layerKey != key) {
        this.layerKey = key;
        this.isolation = true;
        window.setTimeout(() => vm.enableIsolation(layer), 10);
      } else {
        this.layerKey = undefined;
        this.isolation = false;
        window.setTimeout(() => vm.disableIsolation(), 10);
      }
    },
    enableIsolation(layer) {
      const { g3dLayerIndex, viewer } = this;
      const { layerIndex } = layer;

      if (!(typeof g3dLayerIndex === "number") || g3dLayerIndex < 0) return;
      let g3dLayer = viewer.scene.layers.getLayer(g3dLayerIndex);
      let layerIndexs = g3dLayer.getM3DLayerIndexes();
      this.featurevisible = false;
      this.selectedKeys = [`${layerIndex}`];
      layerIndexs.forEach(index => {
        let m3dlayer = g3dLayer.getLayer(index);
        if (index != layerIndex) {
          m3dlayer.show = false;
        } else {
          m3dlayer.show = true;
          viewer.camera.flyToBoundingSphere(m3dlayer.boundingSphere);
        }
      });
      let children = this.layerTree.map(c => {
        if (c.layerIndex == layerIndex) {
          c.disabled = false;
        } else {
          c.disabled = true;
        }
        return c;
      });
      this.layerTree.splice(0, 1, children[0]);
    },
    disableIsolation() {
      let children = this.layerTree.map(c => {
        c.disabled = false;
        return c;
      });
      this.layerTree.splice(0, 1, children[0]);
      this.restoreOrigindVisible();
      // this.restoreOriginStyle();
    },
    enableExplror() {
      const { Cesium, g3dLayerIndex, viewer } = this;
      const { vueKey, innerVueIndex, vueCesium } = this;
      const vector = new Cesium.Cartesian3(0, 0, 1); //向Z轴正方向爆炸
      const expDistance = 5;
      const speed = 0.5;
      let find = vueCesium.StratifiedHousehouldManager.findSource(
        vueKey,
        innerVueIndex
      );

      if (!(typeof g3dLayerIndex === "number") || g3dLayerIndex < 0) return;
      let g3dLayer = viewer.scene.layers.getLayer(g3dLayerIndex);
      let m3ds = [];
      if (find && find.options) {
        const { modelExplosion } = find.options;
        let layerIndexs = g3dLayer.getM3DLayerIndexes();
        layerIndexs.forEach(index => {
          let m3dlayer = g3dLayer.getLayer(index);
          m3ds.push(m3dlayer);
        });
        modelExplosion.multiLayerAxisExplosionWithAnimate(m3ds, {
          direction: vector,
          expDistance: expDistance,
          speed: speed
        });
      }
    },
    disableExplror() {
      const { vueKey, innerVueIndex, vueCesium, g3dLayerIndex, viewer } = this;
      let find = vueCesium.StratifiedHousehouldManager.findSource(
        vueKey,
        innerVueIndex
      );
      let m3ds = [];

      if (!(typeof g3dLayerIndex === "number") || g3dLayerIndex < 0) return;
      let g3dLayer = viewer.scene.layers.getLayer(g3dLayerIndex);
      let layerIndexs = g3dLayer.getM3DLayerIndexes();
      layerIndexs.forEach(index => {
        let m3dlayer = g3dLayer.getLayer(index);
        m3ds.push(m3dlayer);
      });
      if (find && find.options) {
        const { modelExplosion } = find.options;
        modelExplosion.removeModelExplosion(m3ds);
      }
    },
    handleMenu(menu) {
      if (menu == "隐藏面板") {
        this.$refs.card && this.$refs.card.hide();
      } else if (menu == "查询") {
        if (this.menus[0].active) {
          this.menus[0].active = false;
          this.$_unbindPickFeature();
        } else {
          this.menus[0].active = true;
          this.$_bindPickFeature();
        }
      } else if (menu == "模型爆炸") {
        if (this.menus[1].active) {
          this.menus[1].active = false;
          this.disableExplror();
        } else {
          this.menus[1].active = true;
          this.enableExplror();
        }
      }
    },
    $_pickEvent(movement) {
      const { enableStratifiedHouse, enableDynamicQuery } = this;
      if (enableDynamicQuery) {
        this.queryDynamic(movement);
      } else {
        this.queryStatic(movement);
      }
    },
    $_bindPickFeature() {
      const { vueKey, innerVueIndex } = this;
      let clickhandler = this.$_bindClickHanlder();
      vueCesium.StratifiedHousehouldManager.changeOptions(
        vueKey,
        innerVueIndex,
        "clickhandler",
        clickhandler
      );
    },
    $_unbindPickFeature() {
      const { vueKey, innerVueIndex } = this;
      const vm = this;
      this.featurevisible = false;
      this.restoreHighlight();
      this.restoreM3d();
      if (vm.prePickFeature && vm.prePickFeatureColor) {
        vm.prePickFeature.color = vm.prePickFeatureColor;
      }
      let find = vueCesium.StratifiedHousehouldManager.findSource(
        vueKey,
        innerVueIndex
      );
      if (find && find.options.clickhandler) {
        find.options.clickhandler.destroy();
        vueCesium.StratifiedHousehouldManager.changeOptions(
          vueKey,
          innerVueIndex,
          "clickhandler",
          undefined
        );
      }
    },
    $_bindClickHanlder() {
      const vm = this;
      const { Cesium, viewer } = this;
      let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      handler.setInputAction(function(movement) {
        vm.$_pickEvent(movement);
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      return handler;
    },
    restoreM3d() {
      this.restoreOriginStyle();
    },
    highlightM3d(layerIndex) {
      const { vueKey, innerVueIndex, vueCesium, layerHighlightColor } = this;
      this.selectLayerIndex = layerIndex;
      let g3dLayer = viewer.scene.layers.getLayer(this.g3dLayerIndex);
      let m3dlayer = g3dLayer.getLayer(layerIndex);
      this.restoreM3d();
      vueCesium.StratifiedHousehouldManager.changeOptions(
        vueKey,
        innerVueIndex,
        "pickerTileset",
        m3dlayer
      );
      vueCesium.StratifiedHousehouldManager.changeOptions(
        vueKey,
        innerVueIndex,
        "pickerTilesetStyle",
        m3dlayer.style
      );
      /**
       * @修改说明 使用组件传入的高亮颜色
       * @修改人 龚跃健
       * @修改时间 2022/1/13
       */
      m3dlayer.style = new Cesium.Cesium3DTileStyle({
        color: layerHighlightColor
      });
    },
    handleDynamicQuery() {
      this.featurevisible = false;
      this.featureclickenable = false;
    },
    handleBackMain() {
      this.featureclickenable = this.enablePopup;
      this.disableLayerSelect = false;
    },
    queryDynamic(movement) {
      const vm = this;
      const { Cesium, viewer, g3dLayerIndex } = this;
      const { vueKey, innerVueIndex, vueCesium } = this;
      let find = vueCesium.StratifiedHousehouldManager.findSource(
        vueKey,
        innerVueIndex
      );
      if (find && find.options) {
        let { primitiveCollection } = find.options;
        let cartesian = viewer.getCartesian3Position(movement.position);
        if (Cesium.defined(cartesian)) {
          let cartographic = Cesium.Cartographic.fromCartesian(cartesian);
          let lng = Cesium.Math.toDegrees(cartographic.longitude);
          let lat = Cesium.Math.toDegrees(cartographic.latitude);
          let height = cartographic.height;
          let mapPosition = { x: lng, y: lat, z: height };

          if (!(typeof g3dLayerIndex === "number") || g3dLayerIndex < 0) return;
          let g3dLayer = viewer.scene.layers.getLayer(g3dLayerIndex);
          let layerIndexs = g3dLayer.getM3DLayerIndexes();
          let layerIndex =
            layerIndexs && layerIndexs.length > 0
              ? typeof layerIndexs[0] == "string"
                ? parseInt(layerIndexs[0])
                : layerIndexs[0]
              : 0;

          g3dLayer.Monomerization(
            function callback(result) {
              if (result && result.length > 0) {
                let feature = result[0];
                let find = vueCesium.StratifiedHousehouldManager.findSource(
                  vueKey,
                  innerVueIndex
                );
                if (find) {
                  let last = find.options.feature;
                  primitiveCollection.remove(last);
                }
                vm.featurevisible = true;
                vm.featureposition = {
                  longitude: lng,
                  latitude: lat,
                  height: height
                };
                vm.featureproperties = feature.property;
                primitiveCollection.add(feature);
                vueCesium.StratifiedHousehouldManager.changeOptions(
                  vueKey,
                  innerVueIndex,
                  "feature",
                  feature
                );
              } else {
                vm.featurevisible = false;
              }
            },
            {
              position: new Cesium.Cartesian3(
                mapPosition.x,
                mapPosition.y,
                mapPosition.z
              ),
              tolerance: 0.0001,
              layerIndex: layerIndex
            }
          );
        }
      }
    },
    queryStatic(movement) {
      const vm = this;
      const { Cesium, viewer, version, g3dLayerIndex } = this;
      const { featureHighlightColorProp } = this;
      const scene = viewer.scene;

      let tempRay = new Cesium.Ray();
      let tempPos = new Cesium.Cartesian3();
      if (!movement) return;
      if (scene.mode !== Cesium.SceneMode.MORPHING) {
        let position = movement.position || movement.endPosition;
        let cartesian = viewer.getCartesian3Position(position);
        let ray = scene.camera.getPickRay(position, tempRay);
        let cartesian2 = scene.globe.pick(ray, scene, tempPos);

        let pickedFeature = viewer.scene.pick(movement.position);

        if (!pickedFeature) {
          vm.clickvisible = false;
          return;
        }

        let longitudeString2, latitudeString2, heightString2;

        if (Cesium.defined(cartesian2)) {
          let cartographic2 = Cesium.Cartographic.fromCartesian(cartesian);
          longitudeString2 = Cesium.Math.toDegrees(cartographic2.longitude);
          latitudeString2 = Cesium.Math.toDegrees(cartographic2.latitude);
          heightString2 = cartographic2.height;
        }

        if (cartesian || cartesian2) {
          if (vm.featureclickenable) {
            vm.featurevisible = true;
          }

          vm.featureposition = {
            longitude: longitudeString2,
            latitude: latitudeString2,
            height: heightString2
          };

          if (!(typeof g3dLayerIndex === "number") || g3dLayerIndex < 0) return;
          let g3dLayer = viewer.scene.layers.getLayer(g3dLayerIndex);
          let index = pickedFeature._content._tileset._layerIndex;
          vm.selectLayerIndex = index;
          vm.selectedKeys = [`${index}`];
          if (version == "1.0" || version == "0.0") {
            let layerInfo = g3dLayer.getLayerInfo(index);
            const { layerName, gdbpUrl } = layerInfo;
            vm.featureproperties = { layerName, gdbpUrl };
            vm.highlightM3d(index);
          } else if (version == "2.0") {

            if (!(typeof g3dLayerIndex === "number") || g3dLayerIndex < 0) return;
            let g3dLayer = viewer.scene.layers.getLayer(g3dLayerIndex);

            let oid = viewer.scene.pickOid(movement.position);
            let feature = viewer.scene.pick(movement.position);
            let tileset = g3dLayer.getLayer(index);
            vm.restoreHighlight();

            tileset.pickedOid = oid;
            tileset.pickedColor = Cesium.Color.fromCssColorString(
              featureHighlightColorProp
            );

            if (tileset._useRawSaveAtt && Cesium.defined(feature)) {
              let result = feature.content.getAttributeByOID(oid) || {};
              vm.featureproperties = result;
            } else {
              tileset.queryAttributes(oid).then(function(result) {
                result = result || {};
                vm.featureproperties = result;
              });
            }
          }
        } else {
          vm.clickvisible = false;
        }
      }
    },
    changeSimpleMenu(key) {
      this.layerIds = [`${key}`];
    },
    changeSimpleSlider(keys) {
      let keyStr = keys.map(k => `${k}`);
      this.layerIds = keyStr;
    },
    customLabel(label) {
      let show = label;
      let reg = new RegExp(/-(\S*)?楼?F?/g);
      let res = reg.exec(label);
      if (res && res.length > 0) {
        show = res[res.length - 1];
      }
      return show;
    }
  }
};
</script>
