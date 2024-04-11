<script lang="ts" setup>
import { TouchPanValue } from 'quasar'
import { computed, onMounted, ref, watch } from 'vue'

const props = defineProps<{
  size: [number, number]
  modelValue: [number, number][]
}>()

const emit = defineEmits<{
  (event: 'update:model-value', value: [number, number][]): void
}>()

const targets = ref<HTMLElement[]>([])
const dragging = ref<EventTarget | null>(null)
const offsets = ref<[number, number][]>([])
const parentSize = ref({ width: 0, height: 0 })
const itemSizes = ref<[number, number][]>([])

const handleItemResize = (index: number, size: { width: number; height: number }) => {
  const newItemSizes = [...itemSizes.value]

  newItemSizes[index] = [size.width, size.height]

  itemSizes.value = newItemSizes
}

const normaliseToParent = (input: [number, number]): [number, number] => {
  return [
    (input[0] / parentSize.value.width) * props.size[0],
    (input[1] / parentSize.value.height) * props.size[1],
  ]
}

const denormaliseFromParent = (input: [number, number]): [number, number] => {
  return [
    (input[0] / props.size[0]) * parentSize.value.width,
    (input[1] / props.size[1]) * parentSize.value.height,
  ]
}

onMounted(() => {
  offsets.value = props.modelValue.map((offset) => denormaliseFromParent(offset))
})

const handlePan: TouchPanValue = ({ evt, isFirst, isFinal, delta }) => {
  if (!evt || !delta) return

  if (isFirst) dragging.value = evt.target
  if (isFinal) dragging.value = null

  const newOffsets: [number, number][] = [...offsets.value]

  for (const [index, target] of targets.value.entries()) {
    if (dragging.value === target) {
      newOffsets[index] = [
        Math.min(
          parentSize.value.width - itemSizes.value[index][0],
          Math.max(0, offsets.value[index][0] + (delta.x || 0))
        ),
        Math.min(
          parentSize.value.height - itemSizes.value[index][1],
          Math.max(0, offsets.value[index][1] + (delta.y || 0))
        ),
      ]
    }
  }

  offsets.value = newOffsets
}

watch(dragging, (newDragging) => {
  if (!newDragging)
    emit(
      'update:model-value',
      offsets.value.map((offset) => normaliseToParent(offset))
    )
})

const handleParentResize = (size: { width: number; height: number }) => {
  parentSize.value = size
}

const aspectRatio = computed(() => {
  return props.size[0] / props.size[1]
})
</script>

<style lang="scss" scoped>
.drag-root {
  aspect-ratio: v-bind(aspectRatio);
  overflow: hidden;
}

.drag-item {
  > :deep(*) {
    pointer-events: none;
  }
}
</style>

<template>
  <div v-touch-pan.prevent.mouse="handlePan" class="drag-root relative-position">
    <q-resize-observer @resize="handleParentResize" />

    <transition-group name="card">
      <div
        v-for="(item, index) in offsets"
        :key="index"
        :style="{ top: `${item[1]}px`, left: `${item[0]}px` }"
        class="absolute drag-item"
        ref="targets"
      >
        <q-resize-observer @resize="(s) => handleItemResize(index, s)" />

        <slot :name="`item-${index}`" :position="props.modelValue[index]" :dragging="dragging" />
      </div>
    </transition-group>
  </div>
</template>
