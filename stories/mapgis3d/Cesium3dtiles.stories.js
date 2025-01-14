import Mapgis3dTileset from "../../cesium/src/components/Layer/M3D/3dTileset.vue";

export default {
  title: "三维/图层/3DTiles",
  component: Mapgis3dTileset,
  argTypes: {
    url: "http://192.168.88.204:8089/3DTileset/dayantaresult/tileset.json",
    opacity: 1.0,
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Mapgis3dTileset },
  data() {
    return {
      opacity: 0.25,
    };
  },
  methods: {
    handleMapload() {
      const vm = this;
      window.setTimeout(() => {
        vm.opacity = 1;
      }, 5000);
    },
  },
  template: `<mapgis-web-scene @load="handleMapload" style="height:95vh">
    <mapgis-3d-raster-layer url="http://t0.tianditu.com/DataServer?T=vec_w&L={z}&Y={y}&X={x}&tk=9c157e9585486c02edf817d2ecbc7752" />
    <mapgis-3d-tileset v-bind="$props" />
    <mapgis-3d-statebar />
  </mapgis-web-scene>`,
});

export const 标准3DTile = Template.bind({});
标准3DTile.args = {
  url: "http://192.168.88.204:8089/3DTileset/dayantaresult/tileset.json",
  opacity: 1.0,
};
