export default {
    title: "三维/交互-卷帘"
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: `
    <mapgis-web-scene>
        <mapgis-3d-raster-layer url="http://t0.tianditu.com/DataServer?T=vec_w&L={z}&Y={y}&X={x}&tk=9c157e9585486c02edf817d2ecbc7752" /> 
        <mapgis-3d-raster-layer url="http://t1.tianditu.com/DataServer?T=cia_w&L={z}&Y={y}&X={x}&tk=9c157e9585486c02edf817d2ecbc7752" />
        <mapgis-3d-compare></mapgis-3d-compare>
    </mapgis-web-scene>
    `
});

export const Compare = Template.bind({});
Compare.args = {
    orientation: "vertical",
}