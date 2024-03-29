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
    highlightRatio?: AspectRatio
  }>(),
  {
    aspectRatio: 1,
  }
)

const shownHintedRatios = computed(() => {
  if (props.highlightRatio) {
    return [props.highlightRatio]
  }

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
  rgba(20, 20, 20, 1) 100px,
  rgba(40, 40, 40, 1) 100px,
  rgba(40, 40, 40, 1) 200px,
  rgba(20, 20, 20, 1) 200px,
  rgba(20, 20, 20, 1) 300px,
  rgba(40, 40, 40, 1) 300px,
  rgba(40, 40, 40, 1) 400px,
  rgba(20, 20, 20, 1) 400px,
  rgba(20, 20, 20, 1) 500px,
  rgba(40, 40, 40, 1) 500px,
  rgba(40, 40, 40, 1) 600px,
  rgba(20, 20, 20, 1) 600px,
  rgba(20, 20, 20, 1) 700px,
  rgba(40, 40, 40, 1) 700px,
  rgba(40, 40, 40, 1) 800px,
  rgba(20, 20, 20, 1) 800px,
  rgba(20, 20, 20, 1) 900px,
  rgba(40, 40, 40, 1) 900px,
  rgba(40, 40, 40, 1) 1000px
);

@keyframes bg-move {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 567px 0;
  }
}

.bg-stripe {
  background: $stripes;
  background-size: 567px;

  animation-name: bg-move;
  animation-duration: 10s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-play-state: running;
}

.hole {
  background-color: grey;
}

.hard-light {
  mix-blend-mode: hard-light;
}

.marker-root {
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
      <div
        class="fit marker-root"
        :class="{
          show: props.showGuides,
          'show bg-stripe hard-light': shownHintedRatios.length === 1,
        }"
      >
        <div
          v-for="ratio in shownHintedRatios"
          :key="ratio"
          :style="{ aspectRatio: ratio }"
          :class="{ alternate: ratio >= props.aspectRatio, hole: shownHintedRatios.length === 1 }"
          class="border-marker"
        ></div>
      </div>
    </div>
  </div>
</template>
