<template>
  <div class="mapgis-3d-m3d-menus">
    <mapgis-ui-tab-panel :tabs="menus" @change="handleMenuClick">
    </mapgis-ui-tab-panel>
    <div class="mapgis-3d-m3d-menus-content">
      <m3d-menu-setting v-if="currentMenu == 'setting'" :version="version">
      </m3d-menu-setting>
      <!-- <m3d-menu-highlight
        v-if="currentMenu == 'highlight'"
        :version="version"
        :layerIndex="layerIndex"
      >
      </m3d-menu-highlight>
      <m3d-menu-oid
        v-if="currentMenu == 'oid'"
        :version="version"
        :layerIndex="layerIndex"
      >
      </m3d-menu-oid> -->
      <m3d-menu-props
        v-if="currentMenu == 'properties'"
        :version="version"
        :g3dLayerIndex="g3dLayerIndex"
        :layerIndex="layerIndex"
        :gdbp="gdbp"
        :ip="ip"
        :port="port"
      >
      </m3d-menu-props>
      <m3d-menu-explosion
        v-if="currentMenu == 'explosion'"
        :version="version"
        :g3dLayerIndex="g3dLayerIndex"
        :layerIndex="layerIndex"
      >
      </m3d-menu-explosion>
      <m3d-menu-bloom
        v-if="currentMenu == 'bloom'"
        :version="version"
        :g3dLayerIndex="g3dLayerIndex"
        :layerIndex="layerIndex"
      >
      </m3d-menu-bloom>
      <m3d-menu-dynamic-line
        v-if="currentMenu == 'dynamic'"
        :version="version"
        :g3dLayerIndex="g3dLayerIndex"
        :layerIndex="layerIndex"
      >
      </m3d-menu-dynamic-line>
      <m3d-menu-searchlight
        v-if="currentMenu == 'searchlight'"
        :version="version"
        :g3dLayerIndex="g3dLayerIndex"
        :layerIndex="layerIndex"
      >
      </m3d-menu-searchlight>
    </div>
  </div>
</template>

<script>
import M3dMenuSetting from "./M3dMenuSetting.vue";

/* import M3dMenuHighlight from "./M3dMenuHighlight.vue";
import M3dMenuOid from "./M3dMenuOid.vue"; */
import M3dMenuProps from "./M3dMenuProps.vue";
import M3dMenuExplosion from "./M3dMenuExplosion.vue";
import M3dMenuBloom from "./M3dMenuBloom.vue";
import M3dMenuDynamicLine from "./M3dMenuDynamicLine.vue";
import M3dMenuSearchlight from "./M3dMenuSearchlight.vue";

export default {
  name: "mapgis-3d-m3d-menus",
  components: {
    M3dMenuSetting,
    /* M3dMenuHighlight,
    M3dMenuOid, */
    M3dMenuProps,
    M3dMenuExplosion,
    M3dMenuBloom,
    M3dMenuDynamicLine,
    M3dMenuSearchlight
  },
  props: {
    mode: {
      type: String,
      default: "m3d" // m3d g3d
    },
    size: {
      type: String,
      default: "small"
    },
    version: {
      type: String
    },
    g3dLayerIndex: {
      type: Number
    },
    layerIndex: {
      type: Number
    },
    gdbp: {
      type: String
    },
    ip: {
      type: String
    },
    port: {
      type: String
    }
  },
  watch: {
    mode(next) {
      this.menus = this.parseMode(next);
    }
  },
  data() {
    return {
      currentMenu: undefined,
      currentLayerIndex: -1,
      menus: this.parseMode()
    };
  },
  methods: {
    parseMode(mode) {
      mode = mode || this.mode;
      return mode == "m3d"
        ? [
            /* {
              type: "highlight",
              title: "高亮",
              icon: "mapgis-target-lock"
            },
            {
              type: "oid",
              title: "OID查询",
              icon: "mapgis-bullseye"
            }, */
            {
              type: "properties",
              title: "动态单体化查询",
              icon: "mapgis-table"
            },
            {
              type: "explosion",
              title: "爆炸",
              icon: "mapgis-api"
            },
            {
              type: "bloom",
              title: "泛光",
              icon: "mapgis-highlight"
            },
            {
              type: "dynamic",
              title: "扫描",
              icon: "mapgis-wifi"
            },
            {
              type: "searchlight",
              title: "探照灯",
              icon: "mapgis-star"
            }
            /* {
              type: "radar",
              title: "雷达",
              icon: "mapgis-radarchart"
            },
            {
              type: "circle",
              title: "动态圆",
              icon: "mapgis-time-circle"
            } */
          ]
        : [
            {
              type: "setting",
              title: "全局场景特效",
              icon: "mapgis-setting"
            }
          ];
    },
    handleMenuClick(tab) {
      const { type } = tab;
      this.currentMenu = type;
      switch (type) {
        case "properties":
          this.$emit("enable-dynamic-query", tab);
          break;
        default:
          break;
      }
    }
  }
};
</script>
