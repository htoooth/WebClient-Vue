# 注意事项

建议使用 webclient-vue-cesium 前了解基本的 [Cesium - 向导](https://cesium.com/docs/) 以及 cesium 的开发方式[cesium - API](https://cesium.com/docs/cesiumjs-ref-doc/)

## 加载地形

如果开发者使用的地形是 cesium 提供的地形，需要设置[Cesium ion](https://cesium.com/docs/oauth/)。 Cesium ion 是一个提供瓦片图和 3D 地理空间数据的平台，Cesium ion 支持把数据添加到用户自己的 CesiumJS 应用中。更多细节请查看[Ion](https://cesium.com/ion)。

如果开发者使用`MapGIS-IGServer`提供的地形数据，则可以忽略上面的 Cesium ion。

## 通过 Props 来交互场景属性

使用者可以通过 props 来控制地图场景的一些参数如 viewerMode(显示模式)，animation(动画播放器)，timeline(时间线)，cameraView(初始化视角)等。

完整的 props 列表请查看[API docs](/api/#props)， 注意文字描述中的字段'侦听属性'。

## 场景加载完成事件

当地图场景加载完毕，`mapgis-web-scene`组件就会发送 `load` 事件。整个事件的载荷 payload 会包含 CesiumJS `Cesium` 对象、cesium 对象存储管理器 vueCesium、MapGIS `CesiumZondy`对象以及发送当前事件的`mapgis-web-scene`组件。

```js
handleLoad(payload) {
  // in component
  const {component, Cesium, CesiumZondy,vueCesium} = payload;
    this.Cesium = Cesium;
    this.vueCesium = vueCesium;
    this.CesiumZondy = CesiumZondy;
    let viewer = component.viewer; // 获取实例化的Cesium场景对象
  // component 当前场景组件
  // Cesium 标准Cesium对象
  // CesiumZondy 中地Cesium对象
  // vueCesium cesium对象存储管理器
}
```

所有的`mapgis-web-scene`的内部组件都会在地图场景完全加载完毕后才加载渲染。

::: warning vue 中 存储 地图场景 对象
请注意，除了基本类型和普通对象外，向 Vuex 或组件的“data”添加其他类型的对象通常都不是一个好主意。尤其是类似以下几种情况:

1.  向 vuex 的 store 中添加场景，以方便其他组件使用，`强烈不推荐`
    ```js
    this.$store.viewer = component.viewer;
    ```
2.  向组件的 data 属性添加地图 viewer，`强烈不推荐`
    ```js
      data(){
        return {
          viewer: undefined
        }
      },
      // 某处代码....
      this.viewer = component.viewer;
    ```
3.  向全局的对象中添加地图场景 viewer，以方便全局使用,实在没办法了可以这样使用
    ```js
    window.viewer = window.viewer || viewer;
    ```
    > 某种情况来说，采取第 3 种相对容易找到出 bug 的原因，第 1,2 种很容易导致不知名的 bug，如（更新延迟等）且短时间找不到原因 Orz...

Vue 为每个属性添加了 getter 和 setter 方法，所以如果你将 viewer 对象添加到 Vuex store 或组件 data 中，可能会导致奇怪的 bug。
如果希望存储映射对象，请将其存储为非响应性属性，如下面的示例所示。
:::

```vue
<template>
  <mapgis-web-scene @load="onMapLoaded" />
</template>

<script>
export default {
  // …component code…
  created() {
    this.map = null; //这里的this.map 不是指的 props/data里面的map 而是传统的js对象的属性参数
  },
  methods: {
    onMapLoaded(event) {
      const { component, Cesium, CesiumZondy, vueCesium } = event;
      // 组件内部使用，绝大部分场景都可以满足应用场景，
      // 少数场景请使用上面的方案三配合Promise的方式来全局调用
      this.viewer = component.viewer;
      // 或者只是存起来，加入全局vuex的状态存储中，以方便其他组件使用viewer对象，
      // 强烈禁止,因为很容易在其他地方误触this.$store.viewer的setter事件
      this.$store.viewer = component.viewer;
    },
  },
};
</script>
```

## 事件

全部的地图行为请看 [API](/api/#events) 页面.
