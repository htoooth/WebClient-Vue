import Markdown from "../../cesium/docs/api/sceneeffect/SceneSetting.md";
import Mapgis3dSeneSetting from "../../cesium/src/components/SceneEffect/SceneSetting";

export default {
    title: "三维/场景子组件/场景设置",
    component: Mapgis3dSeneSetting,
    argTypes: {
    },
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { "mapgis-3d-scene-setting": Mapgis3dSeneSetting },
    template: `
      <mapgis-web-scene
          style="height:95vh"
      >
      <mapgis-3d-m3d-layer
          :auto-reset="autoReset"
          :maximum-screen-space-error="maximumScreenSpaceError"
          :url="m3dUrl"
      >
      </mapgis-3d-m3d-layer>
      <mapgis-3d-scene-setting v-bind="$props" :initialStatebar="true"></mapgis-3d-scene-setting>
      </mapgis-web-scene>
    `,
    data() {
        return {
            // m3dUrl: "http://develop.smaryun.com:6163/igs/rest/g3d/ZondyModels",
            m3dUrl: `http://${window.webclient.ip}:${window.webclient.port}/igs/rest/g3d/ZondyModels`,
            autoReset: true,
            maximumScreenSpaceError: 8,
        }
    },
});

export const 场景设置 = Template.bind({});
场景设置.args = {
    panelStyle:{
        position:"absolute",
        top:"10px",
        left:"10px",
        width:"320px",
        background:"#fff"
    }
};
场景设置.parameters = {
    docs:{
        description: {
            component: Markdown
        }
    }
}
