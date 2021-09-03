import * as UIComponents from "./ui_coms";
import MapgisUiIconFont from "../../ui/src/components/iconfont/Icon.vue";
import MapgisUi from "../../ui/src/index";
import vcolorpicker from "vcolorpicker";

const install = function (Vue, options) {
  for (let name in UIComponents) {
    const com = UIComponents[name];
    Vue.component(com.options ? com.options.name : com.name, com);

    const IconFont = MapgisUiIconFont.createFromIconfontCN({
      // scriptUrl: "http://localhost:8888/fonts/iconfont.js",
      scriptUrl: "//at.alicdn.com/t/font_2749943_998i6mq5ddb.js", 
    });
    Vue.component("mapgis-ui-iconfont", IconFont);
    Vue.use(MapgisUi);
    Vue.use(vcolorpicker);
  }
};

if (typeof window !== "undefined" && window["Vue"]) {
  install(window["Vue"], {});
}

export default {
  install
};
