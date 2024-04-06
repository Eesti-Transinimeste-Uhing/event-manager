<script lang="ts" setup>
import { useFilePreview } from 'src/hooks/use-file-preview'
import { AspectRatio } from 'src/lib/aspect-ratios'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

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

const canvas = ref<HTMLCanvasElement | null>(null)

const dragTarget = ref<HTMLElement>()
const dragging = ref(false)

const dragStart = ref<[number, number]>([0, 0])
const dragCoords = ref<[number, number]>([0, 0])

const dragOffset = computed<[number, number]>(() => {
  if (!dragging.value) {
    return props.modelValue
  }

  const x = props.modelValue[0] + dragCoords.value[0] - dragStart.value[0]
  const y = props.modelValue[1] + dragCoords.value[1] - dragStart.value[1]

  return [
    Math.max(Math.min(x, 0), dimensions.value[0] * -1),
    Math.max(Math.min(y, 0), dimensions.value[1] * -1),
  ]
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

const reactiveSrc = computed(() => props.src)
const { image, dimensions } = useFilePreview(reactiveSrc)

const ctx = computed(() => {
  return canvas.value?.getContext('2d')
})

const canvasSize = computed(() => {
  return [1920, 1080]
})

const scaleFactor = computed(() => {
  if (!image.value) return 1

  return Math.max(canvasSize.value[0] / image.value.width, canvasSize.value[1] / image.value.height)
})

const scaledSize = computed(() => {
  if (!image.value) {
    return [canvasSize.value[0], canvasSize.value[1]]
  }

  return [image.value.width * scaleFactor.value, image.value.height * scaleFactor.value]
})

const sliderYPct = computed(() => {
  return dragOffset.value[1] / dimensions.value[1]
})

const sliderXPct = computed(() => {
  return dragOffset.value[0] / dimensions.value[0]
})

const rafRequest = ref<number | null>(null)

const drawCroppedImage = () => {
  if (!canvas.value || !ctx.value || !image.value) {
    return
  }

  const offsetX = dragOffset.value[0] * scaleFactor.value - canvasSize.value[0] * sliderXPct.value
  const offsetY = dragOffset.value[1] * scaleFactor.value - canvasSize.value[1] * sliderYPct.value

  canvas.value.width = canvasSize.value[0]
  canvas.value.height = canvasSize.value[1]

  ctx.value.drawImage(image.value, offsetX, offsetY, scaledSize.value[0], scaledSize.value[1])

  rafRequest.value = null
}

onBeforeUnmount(() => {
  if (!rafRequest.value) return

  cancelAnimationFrame(rafRequest.value)
})

const scheduleDraw = () => {
  if (rafRequest.value) return

  rafRequest.value = requestAnimationFrame(drawCroppedImage)
}

watch(image, scheduleDraw)
watch(dragOffset, scheduleDraw)
</script>

<style lang="scss" scoped>
.drag-root {
  position: relative;
  max-height: 100%;
  max-width: 100%;
  user-select: none;
  aspect-ratio: v-bind(aspectRatio);
}

.drag-target {
  &:not(.disabled) {
    cursor: move;
  }

  &.no-cursor {
    cursor: none;
  }
}

canvas {
  width: 100%;
  height: 100%;
}

$gradient-dark: #141414;
$gradient-light: $dark;

$stripes: linear-gradient(
  45deg,
  $gradient-dark 25%,
  $gradient-light 25%,
  $gradient-light 50%,
  $gradient-dark 50%,
  $gradient-dark 75%,
  $gradient-light 75%,
  $gradient-light 100%
);

@keyframes bg-move {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 300px 0;
  }
}

.bg-stripe {
  background: $stripes;
  background-size: 300px 300px;
  background-repeat: repeat;

  animation-name: bg-move;
  animation-duration: 2s;
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
  <div class="drag-root">
    <canvas ref="canvas" class="image-display"></canvas>

    <div class="drag-target" :class="{ 'no-cursor': dragging }" ref="dragTarget">
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
