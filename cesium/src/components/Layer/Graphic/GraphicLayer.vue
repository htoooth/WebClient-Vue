<template>
  <div>
    <div
      class="mapgis-3d-graphic-layers-select-container"
      v-show="!showSetting"
    >
      <mapgis-ui-select
        class="mapgis-3d-graphic-layers-select"
        @change="$_selectLayer"
        :value="currenSelectLayer"
      >
        <mapgis-ui-select-option
          :key="index"
          v-for="(layer, index) in layerSelect"
          :value="layer.key"
        >
          {{ layer.value }}
        </mapgis-ui-select-option>
      </mapgis-ui-select>
      <input style="display: none" type="file" :id="inputId" accept=".json" />
      <!--      <mapgis-ui-button type="primary" class="mapgis-3d-graphic-layers-export" @click="$_export">导出</mapgis-ui-button>-->
      <!--      <mapgis-ui-button class="mapgis-3d-graphic-layers-import" @click="$_import">导入</mapgis-ui-button>-->
      <!--      <mapgis-ui-more-tool-button @click="$_clickTool" :dataSource="moreTools"-->
      <!--                                  :style="{top: enableOneMap ? '22px' : '10px', right: enableOneMap ? '9px' : '-2px'}"-->
      <!--                                  class="mapgis-ui-graphic-layers-more-tool"/>-->
      <div class="mapgis-ui-graphic-layers-toll-bar">
        <mapgis-ui-svg-icon
          :key="index"
          v-for="(tool, index) in moreTools"
          :iconStyle="toolStyle"
          :containerStyle="toolContainerStyle"
          :title="tool.title"
          :type="tool.icon"
          @click="$_clickTool(tool.icon)"
        />
      </div>
    </div>
    <mapgis-ui-input-row-left
      style="margin: 0"
      v-show="showEditTitle"
      title="修改标题"
      :enableButton="true"
      paddingLeft="16px"
      class="mapgis-ui-graphic-layers-edit-title"
      @finish="$_finishEditTitle"
      v-model="currenSelectLayer"
    />
    <mapgis-3d-graphic-single-layer
      v-show="!showSetting"
      :vueIndex="vueIndex"
      :models="models"
      :autoFlyToGraphic="autoFlyToGraphic"
      :groupGraphicIDs="groupGraphicIDs"
      ref="graphicLayer"
      v-model="currentLayer"
      @saveCamera="$_saveCamera"
      @change="$_addFeature"
      @delete="$_deleteFeature"
    />
    <div v-show="showSetting">
      <mapgis-ui-row>
        <mapgis-ui-svg-icon
          @click="$_back"
          class="mapgis-ui-graphic-layers-setting-back"
          :iconStyle="editStyle"
          type="back"
        />
        <span style="margin-left: 33px">配置参数</span>
      </mapgis-ui-row>
      <mapgis-ui-switch-row-left
        title="进入图层后自动跳转视角"
        v-model="autoFlyTo"
      />
      <mapgis-ui-switch-row-left
        title="选择标绘对象后自动跳转视角"
        v-model="autoFlyToGraphic"
      />
    </div>
  </div>
</template>

<script>
import { saveAs } from "file-saver";
import { getCamera } from "../../Utils/util";
import clonedeep from "lodash.clonedeep";
import GraphicLayerService from "./GraphicLayerService";

export default {
  name: "mapgis-3d-graphic-layer",
  mixins: [GraphicLayerService],
  inject: ["Cesium", "viewer"],
  props: {
    dataSource: {
      type: Array,
      default() {
        return [];
      }
    },
    models: {
      type: Object,
      default() {
        return {};
      }
    },
    enableRelativePath: {
      type: Boolean,
      default: true
    },
    //一张图模式
    enableOneMap: {
      type: Boolean,
      default: false
    },
    baseUrl: {
      type: String,
      default: ""
    }
  },
  watch: {
    dataSource: {
      handler: function() {
        if (this.updatable) {
          this.$_init();
        }
      },
      deep: true
    },
    dataSourceCopy: {
      handler: function() {
        // this.$emit("change", this.dataSourceCopy);
      },
      deep: true
    }
  },
  data() {
    return {
      //graphicLayer图层列表
      layerSelect: [],
      //当前下拉框中选中的图层
      currenSelectLayer: undefined,
      //当前选中的图层的index
      currenSelectIndex: 0,
      //当前选中的图层
      currentLayer: undefined,
      //数据源备份
      dataSourceCopy: [],
      //导入文件按钮id
      inputId: "mapgisPlottingImport" + parseInt(String(Math.random() * 10000)),
      moreTools: [
        {
          event: "add",
          icon: "add",
          title: "新增图层"
        },
        {
          event: "editTitle",
          icon: "editTitle",
          title: "编辑标题"
        },
        // {
        //   event: "saveCamera",
        //   icon: "camera2",
        //   title: "保存视角"
        // }, {
        //   event: "flyTo",
        //   icon: "flyToView",
        //   title: "视角跳转"
        // },
        {
          event: "delete",
          icon: "delete",
          title: "删除图层"
        },
        // {
        //   event: "setting",
        //   icon: "setting",
        //   title: "配置参数"
        // },
        {
          event: "import",
          icon: "import",
          title: "导入"
        },
        {
          event: "export",
          icon: "export",
          title: "导出"
        },
        {
          event: "save",
          icon: "save",
          title: "保存"
        }
      ],
      vueIndex: undefined,
      showEditTitle: false,
      //是否显示配置信息
      showSetting: false,
      autoFlyTo: true,
      autoFlyToGraphic: true,
      editStyle: {
        color: "#7A8DA0",
        width: "20px",
        height: "20px"
      },
      updatable: true,
      toolStyle: {
        color: "rgb(80, 93, 113)",
        width: "16px",
        height: "16px"
      },
      toolContainerStyle: {
        width: "30px",
        height: "32px",
        lineHeight: "36px"
      },
      addLayer: true,
      groupGraphicIDs: []
    };
  },
  mounted() {
    this.$_init(true);
  },
  methods: {
    $_deleteFeature(id) {
      let { dataSource } = this.dataSourceCopy[this.currenSelectIndex];
      let { features } = dataSource;
      for (let i = 0; i < features.length; i++) {
        if (features[i].id === id) {
          features.splice(i, 1);
        }
      }
    },
    $_addFeature(e) {
      this.dataSourceCopy[this.currenSelectIndex].dataSource.features = e;
    },
    $_saveCamera() {
      if (this.currenSelectLayer) {
        this.dataSourceCopy[this.currenSelectIndex].camera = getCamera(viewer);
      }
    },
    $_hasSameTitle(title) {
      let hasSameTitle = false;
      for (let i = 0; i < this.dataSourceCopy.length; i++) {
        if (this.dataSourceCopy[i].name === title) {
          hasSameTitle = true;
          break;
        }
      }
      return hasSameTitle;
    },
    $_finishEditTitle() {
      if (this.$_hasSameTitle(this.currenSelectLayer)) {
        this.$message.warning("该图层名称已存在！");
      } else {
        this.showEditTitle = false;
        this.dataSourceCopy[
          this.currenSelectIndex
        ].name = this.currenSelectLayer;
      }
    },
    $_cloneArray(array) {
      let newArray = [];
      for (let i = 0; i < array.length; i++) {
        newArray.push(JSON.parse(JSON.stringify(array[i])));
      }
      return newArray;
    },
    $_clickTool(e, noMessage) {
      switch (e) {
        //新增标绘图层
        case "add":
          //新建空图层数据
          let title = "新建图层_" + (this.dataSourceCopy.length + 1);
          if (this.$_hasSameTitle(title)) {
            title = title + parseInt(String(Math.random() * 100000000000));
          }
          let data = {
            name: title,
            uuid: parseInt(String(Math.random() * 10000000)),
            autoFlyTo: true,
            autoFlyToGraphic: true,
            dataSource: {
              type: "FeatureCollection",
              features: []
            }
          };
          if (this.dataSourceCopy.length > 0) {
            this.currenSelectIndex++;
          }
          if (!noMessage && this.dataSourceCopy.length > 0) {
            // 新建第一个图层，也不需要提示
            this.$message.success(title + "添加成功！");
          }
          this.dataSourceCopy.push(data);

          //如果上一个图层有数据，则隐藏
          if (this.currentLayer.length > 0) {
            this.$refs.graphicLayer.$_hideAllGraphics();
          }
          //清空图层数据
          this.currentLayer = [];
          this.currenSelectLayer = data.name;
          this.$_layerSelect();
          this.vueIndex = Number(data.uuid);
          //创建一个新的标绘图层
          this.$nextTick(function() {
            this.$refs.graphicLayer.drawMode = "";
            this.$refs.graphicLayer.noTitleKey = "list";
            this.$refs.graphicLayer.currentEditType = "mouse";
            this.$refs.graphicLayer.currentIconType = "mouse";
            this.$refs.graphicLayer.$_resetEditPanel();
            this.$refs.graphicLayer.$_resetIconsPanel();
            this.$refs.graphicLayer.$_stopEdit();
            this.$refs.graphicLayer.$_stopDrawing();
            this.$refs.graphicLayer.isStartDrawing = false;
            this.$refs.graphicLayer.$_clearList();
            this.$refs.graphicLayer.$_init([], data.uuid);
            this.$refs.graphicLayer.$_switchGraphicLayer(data.uuid);
          });
          break;
        case "delete":
          if (this.dataSourceCopy.length === 0) {
            return;
          }
          this.$refs.graphicLayer.$_stopEdit();
          this.$refs.graphicLayer.$_stopDrawing();
          this.$refs.graphicLayer.$_removeAllGraphic();
          this.$refs.graphicLayer.$_destroy();
          this.$refs.graphicLayer.$_resetEditPanel();
          this.$refs.graphicLayer.$_resetIconsPanel();
          this.$message.success(
            this.dataSourceCopy[this.currenSelectIndex].name + "删除成功！"
          );
          this.dataSourceCopy.splice(this.currenSelectIndex, 1);
          this.layerSelect.splice(this.currenSelectIndex, 1);
          this.currenSelectIndex--;
          if (this.currenSelectIndex < 0) {
            this.currenSelectIndex = 0;
          }
          if (this.dataSourceCopy.length === 0) {
            this.currenSelectLayer = "请添加图层";
            this.currentLayer = [];
            this.addLayer = false;
          } else {
            let index = this.currenSelectIndex < 0 ? 0 : this.currenSelectIndex;
            this.currenSelectLayer = this.dataSourceCopy[index].name;
            this.currentLayer = this.$_cloneArray(
              this.dataSourceCopy[index].dataSource.features
            );
            this.$_selectLayer(this.dataSourceCopy[index].uuid);
          }
          break;
        case "editTitle":
          this.showEditTitle = true;
          break;
        case "saveCamera":
          if (this.currenSelectLayer) {
            this.dataSourceCopy[this.currenSelectIndex].camera = getCamera(
              viewer
            );
          }
          break;
        case "flyTo":
          if (this.currenSelectLayer) {
            let layer = this.dataSourceCopy[this.currenSelectIndex];
            const { camera } = layer;
            if (camera) {
              const { positionCartographic, heading, pitch, roll } = camera;
              const { longitude, latitude, height } = positionCartographic;
              this.viewer.camera.flyTo({
                duration: 1,
                destination: new Cesium.Cartesian3.fromRadians(
                  longitude,
                  latitude,
                  height
                ),
                orientation: {
                  heading: heading,
                  pitch: pitch,
                  roll: roll
                }
              });
            }
          }
          break;
        case "setting":
          this.showSetting = !this.showSetting;
          break;
        case "save":
          let saveObj = [];
          for (let i = 0; i < this.dataSourceCopy.length; i++) {
            let json = this.dataSourceCopy[i];
            let dataSource = this.$refs.graphicLayer.$_toJSON(
              json.uuid,
              "default"
            );
            let groups = this.$refs.graphicLayer.$_getGroups();
            saveObj.push({
              name: json.name,
              uuid: json.uuid,
              autoFlyTo: json.autoFlyTo,
              autoFlyToGraphic: json.autoFlyToGraphic,
              camera: clonedeep(json.camera),
              dataSource: dataSource,
              groups: groups
            });
          }
          this.$message.success("保存成功！");
          this.$emit("save", saveObj);
          break;
        case "import":
          this.$_import();
          break;
        case "export":
          this.$_export();
          break;
      }
    },
    $_back() {
      this.showSetting = !this.showSetting;
    },
    $_import() {
      let inputFile = document.getElementById(this.inputId),
        vm = this;
      inputFile.click();
      inputFile.onchange = function() {
        let File = inputFile.files[0];
        // 使用 FileReader 来读取文件
        let reader = new FileReader();
        // 读取纯文本文件,且编码格式为 utf-8
        reader.readAsText(File, "UTF-8");
        // 读取文件
        reader.onload = function(e) {
          let fileContent = e.target.result;
          vm.$_updateData(JSON.parse(fileContent));
          inputFile.value = "";
        };
      };
    },
    $_getRelativeUrl(url) {
      let rUrl = "";
      let ip = url.split("//")[1];
      let strArr = ip.split("/");
      for (let i = 1; i < strArr.length; i++) {
        rUrl += strArr[i] + "/";
      }
      rUrl = rUrl.substr(0, rUrl.length - 1);
      return rUrl;
    },
    $_export() {
      let json;
      for (let i = 0; i < this.dataSourceCopy.length; i++) {
        if (this.currenSelectLayer === this.dataSourceCopy[i].name) {
          json = this.dataSourceCopy[i];
          break;
        }
      }
      this.$refs.graphicLayer.$_stopEdit();
      let dataSource = this.$refs.graphicLayer.$_toJSON();
      let groups = this.$refs.graphicLayer.$_getGroups();
      if (this.enableRelativePath) {
        let features = dataSource.features;
        for (let i = 0; i < features.length; i++) {
          let { style } = features[i];
          if (style && style.hasOwnProperty("url")) {
            features[i].style.url = this.$_getRelativeUrl(
              features[i].style.url
            );
          }
        }
      }
      let exportJSON = {
        name: json.name,
        uuid: json.uuid,
        autoFlyTo: this.autoFlyTo,
        autoFlyToGraphic: this.autoFlyToGraphic,
        camera: clonedeep(json.camera),
        dataSource: dataSource,
        groups: groups
      };
      const blob = new Blob([JSON.stringify(exportJSON)], {
        type: "application/json;charset=utf-8"
      });
      let title = json.name || "无标题";
      saveAs(blob, title + ".json");
    },
    //更新数据
    $_updateData(data) {
      this.currenSelectLayer = data.name;
      for (let i = 0; i < this.dataSourceCopy.length; i++) {
        //uuid相同，更新数据
        if (this.dataSourceCopy[i].uuid === data.uuid) {
          //先不做处理，工程量比较大
          this.$message.warning("请勿导入相同图层！");
          break;
        } else {
          //uuid不相同，新增数据
          this.updatable = false;
          if (this.dataSourceCopy.length > 0) {
            this.currenSelectIndex++;
          }
          this.$refs.graphicLayer.$_resetEditPanel();
          this.dataSourceCopy.push(data);
          this.$_layerSelect();
          let groupGraphicIDs = [];
          let features = [];
          for (let j = 0; j < data.groups.length; j++) {
            groupGraphicIDs = groupGraphicIDs.concat(data.groups[i].dataSource);
            features.push(data.groups[i]);
          }
          for (let j = 0; j < data.dataSource.features.length; j++) {
            if (groupGraphicIDs.indexOf(data.dataSource.features[j].id) < 0) {
              features.push(data.dataSource.features[j]);
            }
          }
          if (this.enableRelativePath) {
            for (let j = 0; j < data.dataSource.features.length; j++) {
              if (data.dataSource.features[j].type === "model") {
                data.dataSource.features[j].style.url =
                  this.baseUrl + "/" + data.dataSource.features[j].style.url;
              }
            }
          }
          this.groupGraphicIDs = groupGraphicIDs;
          this.$refs.graphicLayer.addSource = false;
          this.$refs.graphicLayer.drawMode = "point";
          this.currentLayer = this.$_cloneArray(features);
          this.autoFlyTo = data.autoFlyTo;
          this.autoFlyToGraphic = data.autoFlyToGraphic;
          this.vueIndex = Number(data.uuid);
          this.$refs.graphicLayer.$_hideAllGraphics();
          this.$nextTick(function() {
            this.$refs.graphicLayer.noTitleKey = "list";
            this.$refs.graphicLayer.currentEditType = "mouse";
            this.$refs.graphicLayer.currentIconType = "mouse";
            this.$refs.graphicLayer.$_resetIconsPanel();
            this.$refs.graphicLayer.$_stopEdit();
            this.$refs.graphicLayer.$_stopDrawing();
            this.$refs.graphicLayer.currentEditType = "mouse";
            this.$refs.graphicLayer.isStartDrawing = false;
            this.$refs.graphicLayer.$_switchGraphicLayer(this.vueIndex);
            this.$refs.graphicLayer.$_showAllGraphics();
            this.updatable = true;
          });
          break;
        }
      }
      if (this.dataSourceCopy.length === 0) {
        this.dataSourceCopy.push(data);
        this.vueIndex = Number(data.uuid);
        this.autoFlyTo = data.autoFlyTo;
        this.autoFlyToGraphic = data.autoFlyToGraphic;
        this.$nextTick(function() {
          this.$refs.graphicLayer.drawMode = "";
          this.$refs.graphicLayer.noTitleKey = "list";
          this.$refs.graphicLayer.currentEditType = "mouse";
          this.$refs.graphicLayer.currentIconType = "mouse";
          this.$refs.graphicLayer.$_resetEditPanel();
          this.$refs.graphicLayer.$_resetIconsPanel();
          this.$refs.graphicLayer.$_stopEdit();
          this.$refs.graphicLayer.$_stopDrawing();
          this.$refs.graphicLayer.currentEditType = "mouse";
          this.$refs.graphicLayer.isStartDrawing = false;
          this.$refs.graphicLayer.$_init();
          this.$refs.graphicLayer.$_switchGraphicLayer(this.vueIndex);
          this.$refs.graphicLayer.$_fromJson(data.dataSource);
        });
      }
      if (this.autoFlyTo && data.hasOwnProperty("camera")) {
        const { heading, pitch, roll, positionCartographic } = data.camera;
        const { longitude, latitude, height } = positionCartographic;
        this.viewer.camera.flyTo({
          duration: 2,
          destination: Cesium.Cartesian3.fromRadians(
            longitude,
            latitude,
            height
          ),
          orientation: {
            heading: heading,
            pitch: pitch,
            roll: roll
          }
        });
      }
    },
    //选择图层
    $_selectLayer(e) {
      //设置当前选中的图层
      for (let i = 0; i < this.dataSourceCopy.length; i++) {
        if (this.dataSourceCopy[i].uuid === e) {
          this.autoFlyTo = this.dataSourceCopy[i].autoFlyTo;
          this.autoFlyToGraphic = this.dataSourceCopy[i].autoFlyToGraphic;
          this.currenSelectLayer = this.dataSourceCopy[i].name;
          this.$refs.graphicLayer.$_hideAllGraphics();
          this.vueIndex = Number(this.dataSourceCopy[i].uuid);
          this.currenSelectIndex = i;
          this.$nextTick(function() {
            this.$refs.graphicLayer.drawMode = "";
            this.$refs.graphicLayer.noTitleKey = "list";
            this.$refs.graphicLayer.currentEditType = "mouse";
            this.$refs.graphicLayer.currentIconType = "mouse";
            this.$refs.graphicLayer.$_resetEditPanel();
            this.$refs.graphicLayer.$_resetIconsPanel();
            this.$refs.graphicLayer.$_stopEdit();
            this.$refs.graphicLayer.$_stopDrawing();
            this.$refs.graphicLayer.$_switchGraphicLayer(this.vueIndex);
            this.$refs.graphicLayer.$_showAllGraphics();
            this.$refs.graphicLayer.dataSourceCopy = this.$_cloneArray(
              this.dataSourceCopy[i].dataSource.features
            );
          });
          const { camera } = this.dataSourceCopy[i];
          if (this.autoFlyTo && camera) {
            const { heading, pitch, roll, positionCartographic } = camera;
            const { longitude, latitude, height } = positionCartographic;
            this.viewer.camera.flyTo({
              duration: 2,
              destination: Cesium.Cartesian3.fromRadians(
                longitude,
                latitude,
                height
              ),
              orientation: {
                heading: heading,
                pitch: pitch,
                roll: roll
              }
            });
          }
          break;
        }
      }
    },
    //设置下拉框
    $_layerSelect() {
      this.layerSelect = [];
      for (let i = 0; i < this.dataSourceCopy.length; i++) {
        this.layerSelect.push({
          key: this.dataSourceCopy[i].uuid,
          value: this.dataSourceCopy[i].name
        });
      }
    },
    //初始化数据
    $_init(noMessage) {
      //复制数据源
      this.dataSourceCopy = JSON.parse(JSON.stringify(this.dataSource));
      //设置当前图层
      if (this.dataSourceCopy.length > 0) {
        this.currentLayer = this.$_cloneArray(
          this.dataSourceCopy[0].dataSource.features
        );
        this.vueIndex = this.dataSourceCopy[0].uuid;
        //初始化graphicLayer图层列表
        this.$_layerSelect();
      } else {
        this.currenSelectLayer = "请添加图层";
        this.currentLayer = [];
        if (this.addLayer) {
          this.$_clickTool("add", noMessage);
        }
      }
    },
    $_hideAllGraphic() {
      this.$refs.graphicLayer.$_stopEdit();
      this.$refs.graphicLayer.$_stopDrawing();
      for (let i = 0; i < this.dataSourceCopy.length; i++) {
        let features = this.dataSourceCopy[i].dataSource.features;
        for (let j = 0; j < features.length; j++) {
          let graphic = this.$_getGraphicByID(
            features[j].id,
            this.dataSourceCopy[i].uuid
          );
          graphic.show = false;
        }
      }
    },
    $_showCurrentGraphic() {
      this.$refs.graphicLayer.$_startEdit();
      for (let i = 0; i < this.dataSourceCopy.length; i++) {
        if (this.currenSelectLayer === this.dataSourceCopy[i].name) {
          let features = this.dataSourceCopy[i].dataSource.features;
          for (let j = 0; j < features.length; j++) {
            let graphic = this.$_getGraphicByID(
              features[j].id,
              this.dataSourceCopy[i].uuid
            );
            graphic.show = true;
          }
          break;
        }
      }
    }
  }
};
</script>

<style scoped>
.mapgis-3d-graphic-layers-select-container {
  width: 332px;
  height: 46px;
  padding: 7px 15px;
  transition: height 0.8s;
  -moz-transition: height 0.8s; /* Firefox 4 */
  -webkit-transition: height 0.8s; /* Safari and Chrome */
  -o-transition: height 0.8s; /* Opera */
  overflow: hidden;
}

.mapgis-3d-graphic-layers-select-container:hover {
  height: 68px;
}

.mapgis-3d-graphic-layers-select {
  width: 100%;
  float: left;
}

.mapgis-ui-graphic-layers-edit-title {
  height: 40px !important;
  width: 332px;
}

.mapgis-ui-graphic-layers-toll-bar {
  float: left;
}

.mapgis-3d-graphic-layers-export {
  float: right;
}

.mapgis-3d-graphic-layers-import {
  float: right;
  margin-right: 6px;
}

.mapgis-ui-graphic-layers-more-tool {
  position: absolute !important;
  right: 9px;
  top: 22px;
}

.mapgis-ui-input-row-left-input {
  width: calc(100% - 148px);
}

.mapgis-ui-graphic-layers-setting-back {
  position: absolute;
  top: -11px;
  left: 6px;
}
</style>
