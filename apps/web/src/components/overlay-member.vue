<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  parentSize: [number, number]
  top: number
  left: number
  width: number
  height: number
}>()

const topNormal = computed(() => {
  return props.parentSize[1] * props.top
})

const topPx = computed(() => {
  return `${topNormal.value}px`
})

const leftNormal = computed(() => {
  return props.parentSize[0] * props.left
})

const leftPx = computed(() => {
  return `${leftNormal.value}px`
})

const heightNormal = computed(() => {
  return props.parentSize[1] * props.height
})

const heightPx = computed(() => {
  return `${heightNormal.value}px`
})

const widthNormal = computed(() => {
  return props.parentSize[0] * props.width
})

const widthPx = computed(() => {
  return `${widthNormal.value}px`
})
</script>

<style lang="scss" scoped>
.overlay-member {
  left: v-bind(leftPx);
  top: v-bind(topPx);
  height: v-bind(heightPx);
  width: v-bind(widthPx);
}
</style>

<template>
  <div class="absolute overlay-member">
    <slot :height="heightNormal" :width="widthNormal" :css-height="heightPx" :css-width="widthPx" />
  </div>
</template>
