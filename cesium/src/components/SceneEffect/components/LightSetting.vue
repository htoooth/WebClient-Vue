<template>
    <div class="light-setting">
        <mapgis-ui-switch-panel
            size="small"
            label="太阳光照"
            :checked="sunlight"
            @changeChecked="enableSunlight"
        >
            <mapgis-ui-color-pick-panel
                label="光照颜色"
                :color="lightColor"
                :disableAlpha="false"
                @input="
                    (val) =>
                        (lightColor = `rgba(${val.rgba.r}, ${val.rgba.g}, ${val.rgba.b}, ${val.rgba.a})`)
                "
            />
        </mapgis-ui-switch-panel>

        <div class="dividerWrapper"><div class="divider" /></div>

        <mapgis-ui-input-number-panel
            size="small"
            label="模型亮度"
            v-model="lightIntensity"
            :range="[1,200]"
            @change="lightIntensityChange"
        />
    </div>
</template>

<script>
import ServiceLayer from "../../UI/Controls/ServiceLayer";
export default {
    name: "SceneEffect",
    mixins: [ServiceLayer],
    data() {
        return {
            sunlight: false,
            // 光照颜色
            lightColor: "rgba(255,255,255,255)",
            lightIntensity: 10
        };
    },
    mounted(){
        this.lightIntensityChange();
    },
    watch: {
        lightColor: {
            handler: function (newColor) {
                this.lightColorChange(newColor);
            },
            deep: true,
        },
    },
    methods: {
        //太阳
        enableSunlight(e) {
            const { viewer } = this;
            this.sunlight = e;
            this.$emit("updateSpin", true);
            let vm = this;


            setTimeout(function () {
                viewer.scene.globe.enableLighting = vm.sunlight;
                // var sunLight = new Cesium.SunLight({color:Cesium.Color.RED});
                // viewer.scene.light = sunLight
                vm.$emit("updateSpin", false);
            }, 400);
        },
        //光照颜色、带有法线数据的模型的颜色
        lightColorChange(e) {
            const { Cesium,viewer } = this;
            let color = Cesium.Color.fromCssColorString(e);
            viewer.scene.light.color = color;
        },
        //带有法线数据的模型的亮度
        lightIntensityChange() {
            const { viewer } = this;

            viewer.scene.light.intensity = this.lightIntensity;
        }
    },
};
</script>

<style scoped>
.dividerWrapper {
    height: 13px;
}
.divider {
    display: block;
    height: 1px;
    position: absolute;
    left: 16px;
    right: 16px;
    margin: 6px 0;
    background: #f0f0f0;
}
</style>