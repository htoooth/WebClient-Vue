export default {
  methods: {
    /**
     * @description 发送更新事件  this.$emit(`update:${prop}`, data);
     * @see https://cn.vuejs.org/v2/guide/components-custom-events.html#sync-修饰符
     * @param {*} prop 更新属性
     * @param {*} data 更新数据
     */
    $_updateSyncedPropsFabric(prop, data) {
      return () => {
        this.propsIsUpdating[prop] = true;
        let info = typeof data === "function" ? data() : data;
        return this.$emit(`update:${prop}`, info);
      };
    },

    /**
     * @description 绑定地图的各种事件，并在事件回调更新各种事件消息对应的事件属性。
     * 前提是 该属性this.$listeners[`update:${prop}`] 存在
     */
    $_bindPropsUpdateEvents() {
      const syncedProps = [
        {
          events: ["moveend"],
          prop: "center",
          getter: this.map.getCenter.bind(this.map)
        },
        {
          events: ["zoomend"],
          prop: "zoom",
          getter: this.map.getZoom.bind(this.map)
        },
        {
          events: ["rotate"],
          prop: "bearing",
          getter: this.map.getBearing.bind(this.map)
        },
        {
          events: ["pitch"],
          prop: "pitch",
          getter: this.map.getPitch.bind(this.map)
        }
        // TODO: make 'bounds' synced prop
        // { events: ['moveend', 'zoomend', 'rotate', 'pitch'], prop: 'bounds', getter: this.map.getBounds.bind(this.map) }
      ];
      syncedProps.forEach(({ events, prop, getter }) => {
        events.forEach(event => {
          if (this.$listeners[`update:${prop}`]) {
            this.map.on(event, this.$_updateSyncedPropsFabric(prop, getter));
          }
        });
      });
    },

    /**
     * @description 在mounted组件里面调用该方法里面的Promise，主要是绑定map以及绑定各种属性以及行为
     */
    $_loadMap() {
      // mapboxPromise = Promise.resolve(this.mapboxGl)
      const { company } = this;
      if (company.indexOf("mapgis") >= 0) {
        return this.mapboxPromise.then(mapboxgl => {
          this.mapbox = mapboxgl.default ? mapboxgl.default : mapboxgl;
          return new Promise(resolve => {
            const map = new mapboxgl.Map({
              ...this._props,
              preserveDrawingBuffer: true, //特别注意，打印的时候必须启动该配置项
              container: this.$refs.container,
              style: this.mapStyle
            });
            map.on("load", () => resolve(map));
          });
        });
      } else {
        return this.mapboxPromise.then(mapboxgl => {
          this.mapboxgl = mapboxgl.default ? mapboxgl.default : mapboxgl;
          return new Promise(resolve => {
            if (this.accessToken) this.mapboxgl.accessToken = this.accessToken;
            const map = new mapboxgl.Map({
              ...this._props,
              preserveDrawingBuffer: true,
              container: this.$refs.container,
              style: this.mapStyle
            });
            map.on("load", () => resolve(map));
          });
        });
      }
    },

    $_RTLTextPluginError(error) {
      this.$emit("rtl-plugin-error", { map: this.map, error: error });
    },

    /**
     * @description 本质上是把mapbox的map的事件通过vue的emit方式封装发送
     * @param {*} events
     */
    $_bindMapEvents(events) {
      Object.keys(this.$listeners).forEach(eventName => {
        if (events.includes(eventName)) {
          this.map.on(eventName, this.$_emitMapEvent);
        }
      });
    },

    $_unbindEvents(events) {
      events.forEach(eventName => {
        this.map.off(eventName, this.$_emitMapEvent);
      });
    }
  }
};
