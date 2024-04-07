<script lang="ts" setup>
import { TouchPanValue } from 'quasar'
import { AspectRatio } from 'src/lib/aspect-ratios'
import { ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: [number, number][]
    aspectRatio?: number
  }>(),
  {
    aspectRatio: AspectRatio.square,
  }
)

const emit = defineEmits<{
  (event: 'update:model-value', value: [number, number][]): void
}>()

const targets = ref<HTMLElement[]>([])

const dragging = ref<EventTarget | null>(null)

const offsets = ref<[number, number][]>(props.modelValue.map(() => [0, 0]))

const parentSize = ref({ width: 0, height: 0 })

const handlePan: TouchPanValue = ({ evt, isFirst, isFinal, delta }) => {
  if (!evt || !delta) return

  if (isFirst) dragging.value = evt.target
  if (isFinal) dragging.value = null

  const newOffsets: [number, number][] = [...offsets.value]

  for (const [index, target] of targets.value.entries()) {
    if (dragging.value === target)
      newOffsets[index] = [
        Math.min(parentSize.value.width, Math.max(0, offsets.value[index][0] + (delta.x || 0))),
        Math.min(parentSize.value.height, Math.max(0, offsets.value[index][1] + (delta.y || 0))),
      ]
  }

  offsets.value = newOffsets
}

watch(dragging, (newDragging) => {
  if (!newDragging) emit('update:model-value', offsets.value)
})

const handleResize = (size: { width: number; height: number }) => {
  parentSize.value = size
  console.log(size)
}
</script>

<style lang="scss" scoped>
.drag-root {
  max-height: 100%;
  max-width: 100%;
  user-select: none;
  aspect-ratio: v-bind(aspectRatio);
}

.overlay-positioner {
  margin: 2px;
}

.test {
  background: blue;
  height: 250px;
  width: 250px;
}
</style>

<template>
  <div v-touch-pan.prevent.mouse="handlePan" class="fit bg-red relative-position">
    <q-resize-observer @resize="handleResize" />

    <div
      v-for="(item, index) in props.modelValue"
      :key="index"
      :style="{ top: `${offsets[index][1]}px`, left: `${offsets[index][0]}px` }"
      class="test absolute"
      ref="targets"
    ></div>
  </div>

  {{ offsets }}
</template>
