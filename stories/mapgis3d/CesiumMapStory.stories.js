import Markdown from "../../cesium/docs/api/MapStory/MapStory.md";

export default {
    title: "三维/图层/地图故事",
    argTypes:{
    }
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    data() {
        return {
        }
    },
    template: `
      <mapgis-web-scene style="height:95vh">
        <mapgis-3d-map-story v-bind="$props"/>
      </mapgis-web-scene>
    `
});

export const 地图故事 = Template.bind({});
地图故事.args = {
    dataSource: [],
    models: {
        "tree": [{
            "img": "/gltf/tree/img/tree.png",
            "model": "/gltf/tree/tree.glb"
        },{
            "img": "/gltf/tree/img/tree11.png",
            "model": "/gltf/tree/tree11.glb"
        },{
            "img": "/gltf/tree/img/tree12.png",
            "model": "/gltf/tree/tree12.glb"
        },{
            "img": "/gltf/tree/img/tree13.png",
            "model": "/gltf/tree/tree13.glb"
        },{
            "img": "/gltf/tree/img/tree14.png",
            "model": "/gltf/tree/tree14.glb"
        }],
        "traffic": [{
            "img": "/gltf/traffic/img/car.png",
            "model": "/gltf/traffic/car.glb"
        }],
        "ground": [{
            "img": "/gltf/ground/img/grass.png",
            "model": "/gltf/ground/grass.glb"
        },{
            "img": "/gltf/ground/img/bench.glb",
            "model": "/gltf/ground/bench.glb"
        },{
            "img": "/gltf/ground/img/fountain.glb",
            "model": "/gltf/ground/fountain.glb"
        },{
            "img": "/gltf/ground/img/fountain2.glb",
            "model": "/gltf/ground/fountain2.glb"
        },{
            "img": "/gltf/ground/img/fountain3.glb",
            "model": "/gltf/ground/fountain3.glb"
        },{
            "img": "/gltf/ground/img/road.glb",
            "model": "/gltf/ground/road.glb"
        },{
            "img": "/gltf/ground/img/trash.glb",
            "model": "/gltf/ground/trash.glb"
        }],
        "lamp": [{
            "img": "/gltf/lamp/img/lamp.png",
            "model": "/gltf/lamp/lamp.glb"
        }],
        "billboard": [{
            "img": "/gltf/billboard/img/stop.glb",
            "model": "/gltf/billboard/stop.glb"
        },{
            "img": "/gltf/billboard/img/trafficLight.glb",
            "model": "/gltf/billboard/trafficLight.glb"
        },{
            "img": "/gltf/billboard/img/trafficLight2.glb",
            "model": "/gltf/billboard/trafficLight2.glb"
        }],
        "house": [{
            "img": "/gltf/house/img/house12.glb",
            "model": "/gltf/house/house12.glb"
        },{
            "img": "/gltf/house/img/house13.glb",
            "model": "/gltf/house/house13.glb"
        },{
            "img": "/gltf/house/img/house14.glb",
            "model": "/gltf/house/house14.glb"
        },{
            "img": "/gltf/house/img/house15.glb",
            "model": "/gltf/house/house15.glb"
        },{
            "img": "/gltf/house/img/house16.glb",
            "model": "/gltf/house/house16.glb"
        },{
            "img": "/gltf/house/img/house17.glb",
            "model": "/gltf/house/house17.glb"
        },{
            "img": "/gltf/house/img/house18.glb",
            "model": "/gltf/house/house18.glb"
        }]
    }
};

地图故事.parameters = {
    docs: {
        description: {
            component: Markdown,
        },
    },
};