export default {
  title: "三维/图层/数据流/点",
  argTypes: {
    baseUrl: {
      description: "数据流地址",
      table:{
        defaultValue: { summary: 'null' },
      },
    },
    layerStyle: {
      description: "图标样式，样式如下：<br>" +
          "1、<span class='storybook-span'>type</span>(必填)：图标类型，分为点、标签以及模型三种<br>" +
          "2、<span class='storybook-span'>radius</span>(必填)：点半径<br>" +
          "3、<span class='storybook-span'>color</span>(选填)：颜色，默认#FFFFFF<br>" +
          "3、<span class='storybook-span'>opacity</span>(选填)：透明度，默认1<br>" +
          "3、<span class='storybook-span'>outlineColor</span>(选填)：外边线颜色，默认#000000<br>" +
          "3、<span class='storybook-span'>outlineWidth</span>(选填)：外边线宽度，默认1<br>" +
          "3、<span class='storybook-span'>outlineOpacity</span>(选填)：外边线透明度，默认1<br>" +
          "",
      table:{
        defaultValue: { summary: 'null' },
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `<mapgis-web-scene style="height:95vh">
    <mapgis-3d-raster-layer url="http://t0.tianditu.com/DataServer?T=vec_w&L={z}&Y={y}&X={x}&tk=9c157e9585486c02edf817d2ecbc7752" />
    <mapgis-3d-data-flow-layer
        v-bind="$props"
    />
  </mapgis-web-scene>`,
});

export const 点 = Template.bind({});
点.args = {
  baseUrl: "ws://192.168.199.65:9382/dataflow/cars_xian/subscribe",
  layerStyle: {
    type: "point",
    radius: 24,
    color: "#FFFF00",
    outlineColor: "#FF0000",
    outlineWidth: 6
  }
};
