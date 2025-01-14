import Markdown from "../../cesium/docs/api/ui/locate.md";

export default {
    title: "三维/场景子组件/定位组件",
    argTypes: {
        mapSheetBoundaryStyle: {
            description: '图幅边界样式',
            table:{
                defaultValue:{ sammary:'{color: "#FFA500",\n' +
                        '          opacity: 0.5}'},
            },
            control:'object'
        }
    }
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: `
      <mapgis-web-scene
        style="height:100vh">
    <mapgis-3d-ogc-wmts-layer
        :baseUrl="url"
        :wmtsLayer="layer"
        :tileMatrixSet="tileMatrixSet"
        :format="format"
        :tilingScheme="tilingScheme"
        :token="token"
    ></mapgis-3d-ogc-wmts-layer>
    <mapgis-3d-igs-doc-layer :baseUrl="baseUrl"></mapgis-3d-igs-doc-layer>
    <mapgis-ui-card class="storybook-ui-card">
      <mapgis-3d-locate :mapSheetBoundaryStyle="boundaryStyle"></mapgis-3d-locate>
    </mapgis-ui-card>
    <mapgis-3d-statebar></mapgis-3d-statebar>
    </mapgis-web-scene>`
});

export const locate = Template.bind({});
locate.args = {
    url: "http://t0.tianditu.gov.cn/img_c/wmts",
    tileMatrixSet: "c",
    tilingScheme: "EPSG:4326",
    layer: "img",
    format: "tiles",
    token: {
        key: "tk",
        value: "9c157e9585486c02edf817d2ecbc7752",
    },
    baseUrl:"http://${window.webclient.ip}:${window.webclient.port}/igs/rest/mrms/docs/北京市",
    boundaryStyle:{
        color: "#1E90FF",
        opacity: 0.5,
        outlineColor:"rgba(0,191,255,0.5)"
    }
};

locate.parameters = {
    docs: {
        description: {
            component: Markdown,
        },
    },
};