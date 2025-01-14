<template>
  <div>
    <project-panel ref="projectPanel"
                   @deleteProject="$_deleteProject"
                   @getCamera="$_getCamera"
                   @addFeature="$_addFeature"
                   @projectPreview="$_projectPreview"
                   :dataSource="dataSourceCopy"
                   :upProjectSet="projectSet"
                   :height="height"
                   :width="width"
                   :enablePreview="enablePreview"
                   :enableClose="enableClose"
    />
    <map-collection :key="index" v-for="(opt,index) in optArr" :options="opt"/>
    <map-collection :key="opt.vueIndex" v-for="(opt) in projectMaps" :options="opt"/>
    <template v-for="(popup) in popups">
      <mapgis-3d-popup
          :key="popup.vueIndex"
          :position='{"longitude":popup.lng,"latitude":popup.lat,"height":popup.alt}'
          :forceRender="true"
          v-model="popup.show"
          :vueIndex="popup.vueIndex"
      >
        <div class="mapgis-3d-map-story-small-popup-container">
          <slot name="content" :popup="popup">
            <div class="mapgis-3d-map-story-small-popup-title">
              {{ popup.title }}
              <mapgis-ui-base64-icon @click="$_toLarge(popup.feature)" class="mapgis-3d-map-story-small-popup-tolarge"
                                     width="20px" type="toLarge"/>
            </div>
            <mapgis-ui-carousel class="mapgis-3d-map-story-small-popup-carousel" autoplay>
              <div class="mapgis-3d-map-story-small-popup-img-div" :key="index + 10000"
                   v-for="(image, index) in popup.images">
                <img class="mapgis-3d-map-story-small-popup-img" :src="image" alt="">
              </div>
            </mapgis-ui-carousel>
          </slot>
        </div>
      </mapgis-3d-popup>
    </template>
  </div>
</template>

<script>
import projectPanel from "./projectPanel"
import mapCollection from "./mapCollection";
import mapStoryService from "./mapStoryService"
import Base64IconsKeyValue from "./Base64IconsKeyValue"

window.showPanels = {
  currentPage: "",
  showProjectEdit: false
}
export default {
  name: "mapgis-3d-map-story-layer",
  mixins: [mapStoryService],
  components: {
    "project-panel": projectPanel,
    "map-collection": mapCollection,
  },
  data() {
    return {
      drawer: undefined,
      currentFeatureType: undefined,
      currentPoints: undefined,
      dataSourceCopy: []
    }
  },
  props: {
    dataSource: {
      type: Array
    },
    height: {
      type: Number
    },
    width: {
      type: Number
    },
    enablePreview: {
      type: Boolean,
      default: true
    },
    enableClose: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    dataSource: {
      handler: function () {
        this.dataSourceCopy = this.dataSource;
      },
      deep: true
    }
  },
  created() {
    this.dataSourceCopy = this.dataSource;
  },
  mounted() {
    this.$_initManager();
  },
  methods: {
    $_toLarge(feature) {
      this.$emit("projectPreview", [feature], false);
    },
    $_drawerLoaded(drawer) {
      this.drawer = drawer;
    },
    $_projectPreview(features, enableFullScreen) {
      this.$emit("projectPreview", features, enableFullScreen);
    },
    $_deleteProject() {
      this.popups = [];
    }
  }
}
</script>

<style scoped>
.mapgis-3d-map-story-small-popup-title {
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  margin-bottom: 10px;
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 40px;
  font-size: 14px;
  position: relative;
}

.mapgis-3d-map-story-small-popup-tolarge {
  position: absolute !important;
  top: 9px;
  right: 28px;
}

.mapgis-3d-map-story-small-popup-container {
  width: 260px;
  height: 200px;
}

.mapgis-3d-map-story-small-popup-carousel {
  width: 240px;
  height: 144px;
  margin: 0 10px;
}

.mapgis-3d-map-story-small-popup-img-div {
  width: 240px;
  height: 144px;
}

.mapgis-3d-map-story-small-popup-img {
  width: 240px;
  height: 144px;
}
</style>