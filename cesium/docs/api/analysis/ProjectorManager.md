> mapgis-3d-projector-manager

## 属性

### `vueKey`

- **类型:** `String`
- **可选**
- **非侦听属性**
- **默认值:** `default`
- **描述:** mapgis-web-scene 组件的 ID，当使用多个 mapgis-web-scene 组件时，需要指定该值，来唯一标识 mapgis-web-scene 组件，同时 mapgis-web-scene 插槽中的组件也需要传入相同的 vueKey，让组件知道应该作用于哪一个 mapgis-web-scene。

### `vueIndex`

- **类型:** `Number`
- **可选**
- **非侦听属性**
- **默认值:** `(Math.random() * 100000000).toFixed(0)`随机计算值
- **描述:** 当 mapgis-web-scene 插槽中使用了多个相同组件时，例如多个 mapgis-3d-igs-doc-layer 组件，用来区分组件的标识符。

### `modelUrl`

- **类型:** `String`
- **必选**
- **侦听属性**
- **描述:** 相机模型路径
- **默认值:**

### `modelOffset`

- **类型:** `Object`
- **可选**
- **侦听属性**
- **描述:** 相机模型朝向偏移量
- **默认值:** { headingOffset: -90, pitchOffset: 0, rollOffset: 0 }

### `modelScale`

- **类型:** `Number`
- **可选**
- **侦听属性**
- **描述:** 相机模型尺寸比例
- **默认值:** 1

### `maxProjected`

- **类型:** `Number`
- **可选**
- **侦听属性**
- **描述:** 最大投放数
- **默认值:** 10

### `hideVPInvisible`

- **类型:** `Boolean`
- **可选**
- **侦听属性**
- **描述:** 当摄像头不在当前视图范围内，隐藏投影；参数设置后，对新投放或者重新投放的对象有效，对于已经投放的对象无效
- **默认值:** false

### `projectorOverlayLayerList`

- **类型:** `Array`
- **可选**
- **侦听属性**
- **描述:** 视频投放图层数组
- **默认值:**

```
[
    {
      id: "123-345-567-789",
      name: "test",
      projectorList: [
        {
          id: "987-765-543-321",
          name: "testProjector1",
          description: "",
          isProjected: false,
          params: {
            projectorType: "video",
            imgUrl: "",
            videoSource: {
              protocol: "m3u8",
              videoUrl:
                "http://192.168.91.123:10008/record/video1/20211221/out.m3u8",
            },
            cameraPosition: {
              x: 114.401228136856,
              y: 30.467421377675457,
              z: 84.94989410478892,
            },
            orientation: {
              heading: 6.053866507322313,
              pitch: -73.6,
              roll: 354.1,
            },
            hFOV: 34.6,
            vFOV: 18.9,
            hintLineVisible: true,
          },
        },
        {
          id: "987-765-543-123",
          name: "testProjector2",
          description: "",
          isProjected: false,
          params: {
            projectorType: "video",
            imgUrl: "",
            videoSource: {
              protocol: "m3u8",
              videoUrl:
                "http://192.168.91.123:10008/record/video2/20211221/out.m3u8",
            },
            cameraPosition: {
              x: 114.40088870656619,
              y: 30.467421563975016,
              z: 84.91172691510191,
            },
            orientation: {
              heading: 359.89407747239846,
              pitch: -74.2,
              roll: 0,
            },
            hFOV: 33.1,
            vFOV: 19.2,
            hintLineVisible: true,
          },
        },
        {
          id: "987-765-543-124",
          name: "testProjector3",
          description: "",
          isProjected: false,
          params: {
            projectorType: "video",
            imgUrl: "",
            videoSource: {
              protocol: "m3u8",
              videoUrl:
                "http://192.168.91.123:10008/record/video3/20211221/out.m3u8",
            },
            cameraPosition: {
              x: 114.4006886798949,
              y: 30.467287432107295,
              z: 85.46751512564336,
            },
            orientation: {
              heading: 271.628505216584,
              pitch: -78.4,
              roll: 359.3,
            },
            hFOV: 32.5,
            vFOV: 19,
            hintLineVisible: true,
          },
        },
      ],
    },
    {
      id: "567-789-123-345",
      name: "layer2",
      projectorList: [
        {
          id: "765-987-543-321",
          name: "layer2Projector1",
          description: "",
          isProjected: false,
          params: {
            projectorType: "video",
            imgUrl: "",
            videoSource: {
              protocol: "m3u8",
              videoUrl:
                "http://192.168.91.123:10008/record/video1/20211221/out.m3u8",
            },
            cameraPosition: {
              x: 114.401228136856,
              y: 30.467421377675457,
              z: 84.94989410478892,
            },
            orientation: {
              heading: 6.053866507322313,
              pitch: -73.6,
              roll: 354.1,
            },
            hFOV: 34.6,
            vFOV: 18.9,
            hintLineVisible: true,
          },
        },
        {
          id: "765-987-543-123",
          name: "layer2Projector2",
          description: "",
          isProjected: false,
          params: {
            projectorType: "video",
            imgUrl: "",
            videoSource: {
              protocol: "m3u8",
              videoUrl:
                "http://192.168.91.123:10008/record/video2/20211221/out.m3u8",
            },
            cameraPosition: {
              x: 114.40088870656619,
              y: 30.467421563975016,
              z: 84.91172691510191,
            },
            orientation: {
              heading: 359.89407747239846,
              pitch: -74.2,
              roll: 0,
            },
            hFOV: 33.1,
            vFOV: 19.2,
            hintLineVisible: true,
          },
        },
      ],
    },
]
```

## 方法

### `putProjector`

- **Description:** 投放视频
- **Param:** `projector` 投放视频参数对象

### `cancelPutProjector`

- **Description:** 取消投放
- **Param:** `id` 要取消投放视频的 id

## 事件

### `@load`

- **Description:** 在 ProjectorManager 组件 加载完毕后发送该事件
- **Payload** ProjectorManager 组件对象

### `@unload`

- **Description:** 在 ProjectorManager 组件 销毁前发送该事件
- **Payload** ProjectorManager 组件对象

### `@update-config`

- **Description:** 在 增删改 projectorOverlayLayerList 时发送该事件
- **Payload** 更新后的 projectorOverlayLayerList

## 示例

```vue
<template>
  <mapgis-web-scene style="height: 95vh">
    <mapgis-3d-m3d-layer
      :autoReset="autoReset"
      :maximumScreenSpaceError="maximumScreenSpaceError"
      :url="m3dUrl"
    ></mapgis-3d-m3d-layer>
    <mapgis-ui-card class="storybook-ui-card">
      <mapgis-3d-projector-manager
        :projectorOverlayLayerList="projectorOverlayLayerList"
        :modelUrl="modelUrl"
        :modelOffset="modelOffset"
        :maxProjected="maxProjected"
        :hideVPInvisible="hideVPInvisible"
      >
      </mapgis-3d-projector-manager>
    </mapgis-ui-card>
  </mapgis-web-scene>
</template>

<script>
export default {
  data() {
    return {
      m3dUrl: `http://${window.webclient.ip}:${window.webclient.port}/igs/rest/g3d/ZondyModels`,
      autoReset: true,
      maximumScreenSpaceError: 8,
      modelUrl: "./CesiumModels/Cesium_Camera.glb",
      modelOffset: { headingOffset: -90, pitchOffset: 0, rollOffset: 0 },
      maxProjected: 10,
      hideVPInvisible: false,
      projectorOverlayLayerList: [
        {
          id: "123-345-567-789",
          name: "test",
          projectorList: [
            {
              id: "987-765-543-321",
              name: "testProjector1",
              description: "",
              isProjected: false,
              params: {
                projectorType: "video",
                imgUrl: "",
                videoSource: {
                  protocol: "m3u8",
                  videoUrl:
                    "http://192.168.91.123:10008/record/video1/20211221/out.m3u8",
                },
                cameraPosition: {
                  x: 114.401228136856,
                  y: 30.467421377675457,
                  z: 84.94989410478892,
                },
                orientation: {
                  heading: 6.053866507322313,
                  pitch: -73.6,
                  roll: 354.1,
                },
                hFOV: 34.6,
                vFOV: 18.9,
                hintLineVisible: true,
              },
            },
            {
              id: "987-765-543-123",
              name: "testProjector2",
              description: "",
              isProjected: false,
              params: {
                projectorType: "video",
                imgUrl: "",
                videoSource: {
                  protocol: "m3u8",
                  videoUrl:
                    "http://192.168.91.123:10008/record/video2/20211221/out.m3u8",
                },
                cameraPosition: {
                  x: 114.40088870656619,
                  y: 30.467421563975016,
                  z: 84.91172691510191,
                },
                orientation: {
                  heading: 359.89407747239846,
                  pitch: -74.2,
                  roll: 0,
                },
                hFOV: 33.1,
                vFOV: 19.2,
                hintLineVisible: true,
              },
            },
            {
              id: "987-765-543-124",
              name: "testProjector3",
              description: "",
              isProjected: false,
              params: {
                projectorType: "video",
                imgUrl: "",
                videoSource: {
                  protocol: "m3u8",
                  videoUrl:
                    "http://192.168.91.123:10008/record/video3/20211221/out.m3u8",
                },
                cameraPosition: {
                  x: 114.4006886798949,
                  y: 30.467287432107295,
                  z: 85.46751512564336,
                },
                orientation: {
                  heading: 271.628505216584,
                  pitch: -78.4,
                  roll: 359.3,
                },
                hFOV: 32.5,
                vFOV: 19,
                hintLineVisible: true,
              },
            },
          ],
        },
        {
          id: "567-789-123-345",
          name: "layer2",
          projectorList: [
            {
              id: "765-987-543-321",
              name: "layer2Projector1",
              description: "",
              isProjected: false,
              params: {
                projectorType: "video",
                imgUrl: "",
                videoSource: {
                  protocol: "m3u8",
                  videoUrl:
                    "http://192.168.91.123:10008/record/video1/20211221/out.m3u8",
                },
                cameraPosition: {
                  x: 114.401228136856,
                  y: 30.467421377675457,
                  z: 84.94989410478892,
                },
                orientation: {
                  heading: 6.053866507322313,
                  pitch: -73.6,
                  roll: 354.1,
                },
                hFOV: 34.6,
                vFOV: 18.9,
                hintLineVisible: true,
              },
            },
            {
              id: "765-987-543-123",
              name: "layer2Projector2",
              description: "",
              isProjected: false,
              params: {
                projectorType: "video",
                imgUrl: "",
                videoSource: {
                  protocol: "m3u8",
                  videoUrl:
                    "http://192.168.91.123:10008/record/video2/20211221/out.m3u8",
                },
                cameraPosition: {
                  x: 114.40088870656619,
                  y: 30.467421563975016,
                  z: 84.91172691510191,
                },
                orientation: {
                  heading: 359.89407747239846,
                  pitch: -74.2,
                  roll: 0,
                },
                hFOV: 33.1,
                vFOV: 19.2,
                hintLineVisible: true,
              },
            },
          ],
        },
      ],
    };
  },
};
</script>
```
