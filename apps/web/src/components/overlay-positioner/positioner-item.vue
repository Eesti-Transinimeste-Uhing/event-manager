<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  top: number
  left: number
}>()

const emit = defineEmits<{
  (event: 'mousedown', mouseEvent: MouseEvent): void
  (event: 'mouseup', mouseEvent: MouseEvent): void
  (event: 'mousemove', mouseEvent: MouseEvent): void
}>()

const top = computed(() => {
  return `${props.top}px`
})

const left = computed(() => {
  return `${props.left}px`
})
</script>

<style lang="scss" scoped>
.positioner-item {
  top: v-bind(top);
  left: v-bind(left);

  outline: 2px $dark dashed;
}

.cursor-move {
  cursor: move !important;
}
</style>

<template>
  <div
    class="positioner-item absolute"
    @mousedown="(e) => emit('mousedown', e)"
    @mouseup="(e) => emit('mouseup', e)"
    @mouseleave="(e) => emit('mouseup', e)"
    @mousemove="(e) => emit('mousemove', e)"
  >
    <q-item clickable class="cursor-move">
      <q-item-section>
        <slot />
      </q-item-section>
    </q-item>
  </div>
</template>
