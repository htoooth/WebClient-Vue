// import Mapgis3dM3dLayer from "../../cesium/src/components/Layer/M3D/M3d.vue";
import Mapgis3dBimComponent from "../../cesium/src/components/Analysis/BIM.vue";

export default {
  title: "三维/分析/BIM构件树",
  component: Mapgis3dBimComponent,
  argTypes: {
    enableBim: true,
    enablePopup: true,
    outStyle: {
      position: "absolute",
      zIndex: 1000,
      padding: "0px",
      margin: "0px",
      height: "450px",
      width: "400px",
      top: "10px",
    },
    layers: [
      {
        title: "BIM-3栋",
        vueIndex: "test_bim_layer1",
      },
    ],
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Mapgis3dBimComponent },
  data() {
    return {
      m3d: {
        url: "http://192.168.88.204:8089/M3D/2.0/高级住所模型/高级住所模型.mcj",
        vueIndex: "test_bim_layer1"
      }
    };
  },
  methods: {
    handleMapload() {
      const vm = this;
    },
  },
  template: `<mapgis-web-scene @load="handleMapload" style="height:95vh">    
    <mapgis-3d-m3d-layer v-bind="m3d" />
    <mapgis-3d-bim-component v-bind="$props" />
    <mapgis-3d-statebar />
  </mapgis-web-scene>`,
});

export const BIM = Template.bind({});
BIM.args = {
  enableBim: true,
  enablePopup: true,
  outStyle: {
    position: "absolute",
    zIndex: 1000,
    padding: "0px",
    margin: "0px",
    height: "450px",
    width: "400px",
    top: "10px",
  },
  layers: [
    {
      title: "高级住所模型",
      vueIndex: "test_bim_layer1",
    },
  ],
};
