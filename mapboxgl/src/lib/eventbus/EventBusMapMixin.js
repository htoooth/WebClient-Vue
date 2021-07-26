import EventBus from "./EventBusMap";

export default {
  name: "mapgis-event-bus-map-mixin",
  props: {},
  data() {
    return {
      // 原始云盘的uploader模块
      count: 0,
      eventBusMvtStyle: undefined
    };
  },
  created() {
    this.initUploadData();
    // this.registerPropListener();
  },
  mounted() {
    // 有种最暴力的方式 ，所有的响应事件都更新全部的data，让vue自身的diff算法来比较，
    // 强烈建议不要这么做，尤其是后台线程传输的时候导致的IO性能问题
    // 如果是国际化 或者 主题切换 或者 变更颜色这类很少频繁触发的可以如下实现
    /* EventBus.$on("change-xx-event", payload => {
      const $props = this.getSelfProps();
      $props.forEach(prop => {
        const dataName = this.getDataNameOfProp(prop);
        this[dataName] = payload[prop];
      });

      this.$emit("themeStyleChanged");
    }); */
    const vm = this;
    EventBus.$on("map-change-style", payload => {
      this.$_handleMapChangeStyle(payload);
    });
    EventBus.$on("map-add-layer", payload => {
      this.$_handleMapAddLayer(payload);
    });
    EventBus.$on("map-remove-layer", payload => {
      this.$_handleMapRemoveLayer(payload);
    });
    EventBus.$on("map-set-layer-paint", payload => {});
    EventBus.$on("map-set-layer-layout", payload => {});
    EventBus.$on("map-set-layer-filter", payload => {});
    EventBus.$on("map-set-layer-minzoom", payload => {});
    EventBus.$on("map-set-layer-maxzoom", payload => {});

    EventBus.$on("map-add-theme-layer", payload => {
      this.$_handleMapAddThemeLayer(payload);
    });
    EventBus.$on("map-edit-theme-layer", payload => {
      this.$_handleMapEditThemeLayer(payload);
    });
    EventBus.$on("map-remove-theme-layer", payload => {
      this.$_handleMapRemoveThemeLayer(payload);
    });
  },
  methods: {
    initUploadData() {
      /* const upload = EventBus.$options.upload || defaultUpload;

      Object.keys(upload).forEach(key => {
        this[key] = upload[key];
      }); */
    },

    registerPropListener() {
      const upload = EventBus.$options.upload || defaultUpload;
      const vm = this;
      const $props = this.getSelfProps();
      $props.forEach(prop => {
        this.$watch(prop, function(next) {
          const dataName = this.getDataNameOfProp(prop);
          vm[dataName] = next;
        });
      });
    },

    getSelfProps() {
      return Object.keys(this.$props);
    },

    getDataNameOfProp(prop) {
      switch (prop) {
        default:
          return `${prop}Data`;
      }
    },

    $_handleMapChangeStyle(paylaod) {},
    $_handleMapAddLayer(paylaod) {},
    $_handleMapRemoveLayer(paylaod) {},

    /**
     * @description 激活专题图
     * @param {payload} 专题图载荷
     */
    $_handleMapAddThemeLayer(payload) {},
    /**
     * @description 取消激活专题图
     * @param {payload} 专题图载荷
     */
    $_handleMapEditThemeLayer(payload) {},
    /**
     * @description 取消激活专题图
     * @param {payload} 专题图载荷
     */
    $_handleMapRemoveThemeLayer(payload) {}
  }
};
