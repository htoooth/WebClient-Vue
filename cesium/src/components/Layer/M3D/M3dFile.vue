<script>
import Tileset from "./3DTileset";
export default {
  name: "mapgis-3d-filem3d-layer",
  mixins: [Tileset],
  props: {
    layerRenderIndex: {
      type: Number,
      default: 0,
    },
    layerIndex: {
      type: Number,
      default: 0,
    },
    gdbpUrl: {
      type: String,
      default: "",
    },
    show: {
      type: Boolean,
      default: true,
    },
    igserver: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    createCesiumObject() {
      const { $props, url } = this;
      const options = { ...$props, igserver: false, url: url };
      const tileset = new Cesium.MapGISM3DSet(options);
      return tileset;
    },
    mount() {
      const { viewer, autoReset } = this;
      if (viewer.isDestroyed()) return;

      let tileset = this.createCesiumObject();

      tileset.readyPromise
        .then(function (primitives) {
          viewer.scene.primitives.add(primitives);
          var boundingSphere = primitives.boundingSphere;
          if (autoReset) {
            viewer.camera.viewBoundingSphere(
              boundingSphere,
              new Cesium.HeadingPitchRange(0.0, -0.5, boundingSphere.radius)
            );
          }
          viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
          var cartographic = Cesium.Cartographic.fromCartesian(
            primitives.boundingSphere.center
          );
          var surface = Cesium.Cartesian3.fromRadians(
            cartographic.longitude,
            cartographic.latitude,
            0.0
          );
          var offset = Cesium.Cartesian3.fromRadians(
            cartographic.longitude,
            cartographic.latitude,
            0.0
          );
          var translation = Cesium.Cartesian3.subtract(
            offset,
            surface,
            new Cesium.Cartesian3()
          );
          primitives.modelMatrix = Cesium.Matrix4.fromTranslation(translation);

          if (autoReset) new Cesium.Layers.zoomToM3dLayer(primitives);
        })
        .otherwise(function (error) {
          console.error("3dtileset", error);
        });
    },
    unmount() {
      const { viewer, tileset } = this;
      return !viewer.isDestroyed() && viewer.scene.primitives.remove(tileset);
    },
  },
};
</script>

