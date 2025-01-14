import MapgisDraw from "../../mapboxgl/src/components/UI/controls/draw/BaseDraw.vue";
import Markdown from "../../mapboxgl/docs/api/UI/Draw/draw.md"


export default {
  title: "二维/地图子组件/绘制",
  component: MapgisDraw,
  argTypes: {
    enableControl: {
      name: 'enableControl',
      description: '控制绘制组件自带按钮控件的开关',
    }
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MapgisDraw },
  data() {
    return {
      mapOptions: {
        crs: "EPSG:4326", //经纬度一定要设置crs参数
        maxBounds: [
          [-180, -90],
          [180, 90],
        ],
        zoom: 5,
        center: [107.19, 26.85],
      },
    };
  },
  template: `
    <mapgis-web-map v-bind="{...mapOptions}" style="height:95vh">
        <mapgis-rastertile-layer layerId="tdt" url="http://t0.tianditu.com/DataServer?T=vec_c&L={z}&Y={y}&X={x}&tk=9c157e9585486c02edf817d2ecbc7752" />
        <mapgis-rastertile-layer layerId="tdt1" url="http://t0.tianditu.com/DataServer?T=cva_c&L={z}&Y={y}&X={x}&tk=9c157e9585486c02edf817d2ecbc7752" />
<!--        <mapgis-arcgis-tile-layer       layerId="arcgis_tile_layerId"-->
<!--                                        baseUrl="http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer"-->
<!--                                        :tileSize="256"-->
<!--                                        :zoomOffset="0"-->
<!--                                        :forceOffset="false"/>-->
        <mapgis-draw  v-bind="$props" />
    </mapgis-web-map>
    `,
});

export const 绘制 = Template.bind({});
绘制.args = {
  enableControl: true,
  showSize: true,
  styles: [
    {
      id: "gl-draw-polygon-stroke-active",
      type: "line",
      filter: ["all", ["==", "active", "true"], ["==", "$type", "Polygon"]],
      layout: {
        "line-cap": "round",
        "line-join": "round"
      },
      paint: {
        "line-color": "#FF0000",
        "line-dasharray": [0.2, 2],
        "line-width": 2
      }
    },
    {
      'id': 'gl-draw-line-active',
      'type': 'line',
      'filter': ['all',
        ['==', '$type', 'LineString'],
        ['==', 'active', 'true']
      ],
      'layout': {
        'line-cap': 'round',
        'line-join': 'round'
      },
      'paint': {
        'line-color': '#FF0000',
        'line-dasharray': [0.2, 2],
        'line-width': 2
      }
    }
  ]
};
绘制.parameters = {
  docs: {
    description: {
      component: Markdown,
    },
  },
};
