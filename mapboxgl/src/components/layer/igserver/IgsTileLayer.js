import rasterLayer from "../RasterLayer";
import layerEvents from "../../../lib/layerEvents";
import igsOptions from "./igsOptions";

export default {
  name: "mapgis-igs-tile-layer",
  mixins: [rasterLayer],
  props: {
    ...igsOptions,
    zoomOffset: {
      type: Number
    },
    serverName: {
      type: String,
      require: true
    }
  },
  methods: {
    $_init() {
      let { url, domain, baseUrl, protocol, ip, port } = this;
      let { serverName, zoomOffset = 0 } = this;
      let fixBaseUrl;
      if (url) {
        this._url = this.url;
        if (this.url.indexOf("{z}") < 0) {
          this._url += "/{z}/{y}/{x}";
        }
        this._zoomOffset = zoomOffset;
        if (this.map.getCRS().epsgCode.includes("4326")) {
          if (this.zoomOffset != undefined) {
            this._zoomOffset = this.zoomOffset;
          } else {
            this._zoomOffset = -1;
          }
        }
        return;
      } else if (baseUrl) {
        if (baseUrl.indexOf("?") > -1) {
          fixBaseUrl = this.baseUrl.split("?")[0];
        } else {
          fixBaseUrl = this.baseUrl;
        }
      } else if (domain) {
        fixBaseUrl = `${domain}/igs/rest/mrms/tile/${serverName}`;
      } else {
        domain = `${protocol}://${ip}:${port}`;
        fixBaseUrl = `${domain}/igs/rest/mrms/tile/${serverName}`;
      }

      this._url = encodeURI(fixBaseUrl) + "/{z}/{y}/{x}";
      this._zoomOffset = this.zoomOffset;

      if (this.map.getCRS().epsgCode.includes("4326")) {
        if (this.zoomOffset != undefined) {
          this._zoomOffset = this.zoomOffset;
        } else {
          this._zoomOffset = -1;
        }
      }
    },
    $_deferredMount() {
      this.$_init();
      let source = {
        type: "raster",
        tiles: [this._url],
        tileSize: this.tileSize,
        mapgisOffset: this._zoomOffset,
        ...this.source
      };
      this.map.on("dataloading", this.$_watchSourceLoading);
      try {
        this.map.addSource(this.sourceId || this.layerId, source);
      } catch (err) {
        if (this.replaceSource) {
          this.map.removeSource(this.sourceId || this.layerId);
          this.map.addSource(this.sourceId || this.layerId, source);
        }
      }
      this.$_addLayer();
      this.$_bindLayerEvents(layerEvents);
      this.map.off("dataloading", this.$_watchSourceLoading);
      this.initial = false;
    }
  }
};
