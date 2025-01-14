<template>
  <div class="mapgis-ui-color-checkbox" :style="{ backgroundColor: color }" @click="toggle">
    <mapgis-ui-iconfont v-if="sChecked" type="mapgis-check" />
  </div>
</template>

<script>
export const Group = {
  name: 'mapgis-ui-color-checkbox-group',
  props: {
    defaultValues: {
      type: Array,
      required: false,
      default: () => []
    },
    multiple: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      values: [],
      options: []
    }
  },
  computed: {
    colors() {
      const colors = []
      this.options.forEach(item => {
        if (item.sChecked) {
          colors.push(item.color)
        }
      })
      return colors
    }
  },
  provide() {
    return {
      groupContext: this
    }
  },
  watch: {
    values(value) {
      this.$emit('change', value, this.colors)
    }
  },
  methods: {
    handleChange(option) {
      if (!option.checked) {
        if (this.values.indexOf(option.value) > -1) {
          this.values = this.values.filter(item => item != option.value)
        }
      } else {
        if (!this.multiple) {
          this.values = [option.value]
          this.options.forEach(item => {
            if (item.value != option.value) {
              item.sChecked = false
            }
          })
        } else {
          this.values.push(option.value)
        }
      }
    }
  },
  render(h) {
    const clear = h('div', { attrs: { style: 'clear: both' } })
    return h('div', {}, [this.$slots.default, clear])
  }
}

export default {
  name: 'mapgis-ui-color-checkbox',
  Group: Group,
  props: {
    color: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
      required: true
    },
    checked: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      sChecked: this.initChecked()
    }
  },
  computed: {},
  inject: ['groupContext'],
  watch: {
    sChecked: function() {
      const value = {
        value: this.value,
        color: this.color,
        checked: this.sChecked
      }
      this.$emit('change', value)
      const groupContext = this.groupContext
      if (groupContext) {
        groupContext.handleChange(value)
      }
    }
  },
  created() {
    const groupContext = this.groupContext
    if (groupContext) {
      groupContext.options.push(this)
    }
  },
  methods: {
    toggle() {
      if (this.groupContext.multiple || !this.sChecked) {
        this.sChecked = !this.sChecked
      }
    },
    initChecked() {
      const groupContext = this.groupContext
      if (!groupContext) {
        return this.checked
      } else if (groupContext.multiple) {
        return groupContext.defaultValues.indexOf(this.value) > -1
      } else {
        return groupContext.defaultValues[0] == this.value
      }
    }
  }
}
</script>
