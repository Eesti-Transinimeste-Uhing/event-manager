<script lang="ts" setup>
import { AspectRatio } from 'src/lib/aspect-ratios'
import { computed, onMounted, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    src: string
    modelValue: [number, number]
    aspectRatio?: number
    showGuides?: boolean
    hintedRatios: AspectRatio[]
  }>(),
  {
    aspectRatio: 1,
  }
)

const shownHintedRatios = computed(() => {
  const value = [...props.hintedRatios]

  value.sort((a, b) => {
    return b - a
  })

  return value
})

const emit = defineEmits<{
  (event: 'update:model-value', value: [number, number]): void
}>()

const imageUrl = computed(() => {
  return `url(${props.src})`
})

const dragTarget = ref<HTMLElement>()
const dragging = ref(false)

const dragStart = ref<[number, number]>([0, 0])
const dragCoords = ref<[number, number]>([0, 0])

const dragOffset = computed<[number, number]>(() => {
  if (!dragging.value) {
    return props.modelValue
  }

  return [
    props.modelValue[0] + dragCoords.value[0] - dragStart.value[0],
    props.modelValue[1] + dragCoords.value[1] - dragStart.value[1],
  ]
})

const top = computed(() => {
  const value = dragOffset.value[1]

  return `${value}px`
})

onMounted(() => {
  if (!dragTarget.value) {
    return
  }

  dragTarget.value.onmousedown = (event) => {
    dragStart.value = [event.offsetX, event.offsetY]
    dragging.value = true
  }

  dragTarget.value.onmouseup = () => {
    emit('update:model-value', dragOffset.value)
    dragging.value = false
  }

  dragTarget.value.onmouseleave = () => {
    emit('update:model-value', dragOffset.value)
    dragging.value = false
  }

  dragTarget.value.onmousemove = (event) => {
    dragCoords.value = [event.offsetX, event.offsetY]
  }
})
</script>

<style lang="scss" scoped>
.drag-root {
  position: relative;
  max-height: 100%;
  max-width: 100%;
  overflow: hidden;
  user-select: none;
  aspect-ratio: v-bind(aspectRatio);
}

.drag-target {
  &:not(.disabled) {
    cursor: move;
  }
}

.image-display {
  height: 100%;

  background-image: v-bind(imageUrl);
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: center v-bind(top);
}

$stripes: linear-gradient(
  135deg,
  rgba(20, 20, 20, 1) 10%,
  rgba(40, 40, 40, 1) 10%,
  rgba(40, 40, 40, 1) 20%,
  rgba(20, 20, 20, 1) 20%,
  rgba(20, 20, 20, 1) 30%,
  rgba(40, 40, 40, 1) 30%,
  rgba(40, 40, 40, 1) 40%,
  rgba(20, 20, 20, 1) 40%,
  rgba(20, 20, 20, 1) 50%,
  rgba(40, 40, 40, 1) 50%,
  rgba(40, 40, 40, 1) 60%,
  rgba(20, 20, 20, 1) 60%,
  rgba(20, 20, 20, 1) 70%,
  rgba(40, 40, 40, 1) 70%,
  rgba(40, 40, 40, 1) 80%,
  rgba(20, 20, 20, 1) 80%,
  rgba(20, 20, 20, 1) 90%,
  rgba(40, 40, 40, 1) 90%,
  rgba(40, 40, 40, 1) 100%,
  rgba(20, 20, 20, 1) 100%
);

.bg-stripe {
  background: $stripes;
}

.marker-root {
  transition-property: opacity;
  transition-duration: 0.3s;
  transition-timing-function: linear;

  opacity: 0;

  &.show {
    opacity: 1;
  }
}

.border-marker {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);

  &:not(.alternate) {
    border-left: 2px black dashed;
    border-right: 2px black dashed;
    height: 100%;
  }

  &.alternate {
    border-top: 2px black dashed;
    border-bottom: 2px black dashed;
    width: 100%;
  }
}
</style>

<template>
  <div class="drag-root bg-stripe">
    <div class="image-display drag-target" ref="dragTarget">
      <div class="fit marker-root" :class="{ show: props.showGuides }">
        <div
          v-for="ratio in shownHintedRatios"
          :key="ratio"
          :style="{ aspectRatio: ratio }"
          :class="{ alternate: ratio > props.aspectRatio }"
          class="border-marker"
        ></div>
      </div>
    </div>
  </div>
</template>
