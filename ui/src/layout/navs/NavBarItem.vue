<template>
  <div
    :class="{
      'mapgis-ui-nav-bar-item': true,
      'mapgis-ui-nav-bar-item-start': position == 'start',
      'mapgis-ui-nav-bar-item-end': position == 'end'
    }"
    @click="handleEvent"
  >
    <mapgis-ui-iconfont :type="icon" />
    <slot name="icon" />
    <span class="mapgis-ui-nav-bar-item-span">
      {{ title.substr(0, 2) }}
    </span>
  </div>
</template>

<script>
export default {
  name: "mapgis-ui-nav-bar-item",
  props: {
    title: { type: String, default: "标题" },
    icon: { type: String, default: "" },
    // shape: { type: String, default: "" }, // round  circle
    value: { type: String, default: "action-event" },
    position: { type: String, default: "start" }
  },
  methods: {
    handleEvent() {
      const { value } = this;
      this.$parent.$emit("change-bar", value);
    }
  }
};
</script>
