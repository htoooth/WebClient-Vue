import { getCesiumBaseObject } from "../Utils/util";

export default {
  inject: ["viewer", "Cesium", "vueCesium"],
  props: {
    vueKey: {
      type: String,
      default: "default"
    },
    vueIndex: {
      type: [Number, String],
      default() {
        return Number((Math.random() * 100000000).toFixed(0));
      }
    },
    terrainGraphics: {
      type: Object,
      default() {
        return {
          //是否指定各点高度
          perPositionHeight: true,
          //颜色
          material: new Cesium.Color(33 / 255, 150 / 255, 243 / 255, 0),
          //轮廓线是否显示
          outline: false,
          //轮廓线颜色
          outlineColor: Cesium.Color.RED
        };
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    $_getCesium() {
      let { Cesium } = this;
      if (!Cesium) {
        Cesium = window.Cesium;
      }
      return Cesium;
    },
    $_draw(drawFunction, viewer, analyseFunction, analysisName) {
      window.drawElement = new window.Cesium.DrawElement(viewer);
      let vm = this;
      window.drawElement[drawFunction]({
        callback: function(result) {
          // console.log("positions", positions);
          let positions = result.positions;
          vm[analyseFunction](viewer, positions, analysisName);
        }
      });
    },
    $_initAnalysis(drawFunction, analyseFunction, analysisName) {
      let vm = this;
      window.vueCesium.getViewerByInterval(function(viewer) {
        vm.$_draw(drawFunction, viewer, analyseFunction, analysisName);
      }, this.vueKey);
    },
    /*
     * 根据veuKey取得webGlobe对象
     * @param deleteFunc Function 删除前一次绘制的函数
     * @param NewManagerName String 如果指定了NewManagerName，则使用NewManagerName
     * **/
    $_getManager(NewManagerName, deleteFunc) {
      let source,
        MName = this.waitManagerName;
      if (NewManagerName) {
        MName = NewManagerName;
      }
      //如果是GlobesManager，则直接通过vueKey来寻找
      if (MName === "GlobesManager") {
        const { viewer } = this;
        if (this.vueKey === "default") {
          // 使用注入的webGlobe
          // codemirror使用的时候不能支持多屏，也无法获取.vueCesium.GlobesManager对象
          source = viewer;
        } else {
          let GlobesManager = window.vueCesium.GlobesManager;
          if (GlobesManager[this.vueKey]) {
            source = GlobesManager[this.vueKey][0].source;
          }
        }
      } else {
        //如果是其他的Manager，则通过vueKey和vueIndex来寻找
        source = window.vueCesium[MName].findSource(this.vueKey, this.vueIndex);
      }
      if (deleteFunc) {
        deleteFunc(source);
      }
      return source;
    },
    /*
     * 删除Manager
     * @param managerName String 要被删除的manager
     * @param callback Function 回调函数
     * **/
    $_deleteManager(managerName, callback) {
      const { vueKey, vueIndex } = this;
      let manager = window.vueCesium[managerName].findSource(vueKey, vueIndex);
      if (manager) {
        if (callback) {
          callback(manager);
        }
        window.vueCesium.MeasureToolManager.deleteSource(vueKey, vueIndex);
      }
    },
    $_getM3DByInterval(callback, vueKey, vueIndex) {
      vueKey = vueKey || this.vueKey;
      vueIndex = vueIndex || this.vueIndex;
      if (!(vueIndex instanceof Array)) {
        vueIndex = [vueIndex];
      }
      let vueCesium = getCesiumBaseObject(this, "vueCesium");
      let m3d = undefined;
      let m3dArr = [];
      let interval = setInterval(function() {
        let allLoaded = true;
        for (let i = 0; i < vueIndex.length; i++) {
          m3d = vueCesium.M3DIgsManager.findSource(vueKey, vueIndex[i]);
          if (!m3d || !m3d.hasOwnProperty("source") || !m3d.source) {
            allLoaded = false;
          }
        }
        if (allLoaded) {
          for (let i = 0; i < vueIndex.length; i++) {
            m3d = vueCesium.M3DIgsManager.findSource(vueKey, vueIndex[i]);
            m3dArr.push(m3d);
          }
          callback(m3dArr);
          clearInterval(interval);
          this.interval = undefined;
        }
      }, 50);
      this.interval = interval;
    },
    /**
     *
     * @param {*} callback 成功查询到对应的回调
     * @param {*} vueKey 查询的三维球的实例对象
     * @param {String|Number|Array<String|Number>} vueIndex 查询的图层下标
     */
    $_getG3DByInterval(callback, vueKey, vueIndex) {
      vueKey = vueKey || this.vueKey;
      vueIndex = vueIndex || this.vueIndex;
      let vueCesium = getCesiumBaseObject(this, "vueCesium");
      let g3d = undefined;
      let g3dArr = [];
      if (!(vueIndex instanceof Array)) {
        vueIndex = [vueIndex];
      }

      let interval = setInterval(function() {
        let allLoaded = true;
        for (let i = 0; i < vueIndex.length; i++) {
          g3d = vueCesium.G3DManager.findSource(vueKey, vueIndex[i]);
          if (!g3d || !g3d.hasOwnProperty("options") || !g3d.options) {
            allLoaded = false;
          }
        }
        if (allLoaded) {
          for (let i = 0; i < vueIndex.length; i++) {
            g3d = vueCesium.G3DManager.findSource(vueKey, vueIndex[i]);
            g3dArr.push(g3d);
          }
          callback(g3dArr);
          clearInterval(interval);
        }
      }, 50);
      this.interval = interval;
    },
    /**
     * 获取M3D数组
     * @param {*} callback 成功查询到对应的回调
     * @param {*} vueKey 查询的三维球的实例对象
     * @param {String|Number|Array<String|Number>} vueIndex 查询的图层下标
     * @param {String} types 被查询的数据类型 ['m3d','g3d','tile3d']
     */
    $_getM3DSetArray(callback, vueKey, vueIndex, types) {
      vueKey = vueKey || this.vueKey;
      vueIndex = vueIndex || this.vueIndex;
      if (!(vueIndex instanceof Array)) {
        vueIndex = [vueIndex];
      }
      let vueCesium = getCesiumBaseObject(this, "vueCesium");
      let m3d = undefined;
      let g3d = undefined;
      let m3dArr = [];
      let interval = setInterval(function() {
        // 遍历M3D

        for (let i = 0; i < vueIndex.length; i++) {
          m3d = vueCesium.M3DIgsManager.findSource(vueKey, vueIndex[i]);
          if (m3d) {
            for (let j = 0; j < m3d.source.length; j++) {
              m3dArr = m3dArr.concat(m3d.source[j]);
            }
          }
        }
        // 遍历G3D

        for (let i = 0; i < vueIndex.length; i++) {
          g3d = vueCesium.G3DManager.findSource(vueKey, vueIndex[i]);
          if (g3d) {
            const { m3ds } = g3d.options;
            m3dArr = m3dArr.concat(m3ds);
          }
        }
        callback(m3dArr);
        clearInterval(interval);
        this.interval = undefined;
      }, 50);
      this.interval = interval;
    },
    $_degreeFromCartesian(p) {
      let point = {};
      let cartographic = Cesium.Cartographic.fromCartesian(p);
      point.longitude = Cesium.Math.toDegrees(cartographic.longitude);
      point.latitude = Cesium.Math.toDegrees(cartographic.latitude);
      point.height = cartographic.height; //模型高度
      return point;
    },
    $_getM3DBox(m3d) {
      const northeastCornerCartesian =
        m3d._root.boundingVolume.northeastCornerCartesian;
      const southwestCornerCartesian =
        m3d._root.boundingVolume.southwestCornerCartesian;
      //这里：东南角和西北角在外包盒子的同一平面上
      let p1 = this.$_degreeFromCartesian(southwestCornerCartesian);
      let p2 = this.$_degreeFromCartesian(northeastCornerCartesian);
      let p3 = {},
        p4 = {};
      p3.longitude = p1.longitude;
      p3.latitude = p2.latitude;
      p3.height = p1.height;
      p4.longitude = p2.longitude;
      p4.latitude = p1.latitude;
      p4.height = p2.height;
      //p3,p4的笛卡尔坐标
      let p3Caetesian = Cesium.Cartesian3.fromDegrees(
        p3.longitude,
        p3.latitude,
        p3.height
      );
      let p4Caetesian = Cesium.Cartesian3.fromDegrees(
        p4.longitude,
        p4.latitude,
        p4.height
      );
      //求出平面的长和宽，再求出distance
      let length = Cesium.Cartesian3.distance(
        p4Caetesian,
        southwestCornerCartesian
      );
      let width = Cesium.Cartesian3.distance(
        p3Caetesian,
        southwestCornerCartesian
      );
      let height =
        m3d._root.boundingVolume.maximumHeight -
        m3d._root.boundingVolume.minimumHeight;
      return {
        length: length,
        width: width,
        height: height
      };
    }
  }
};
