<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    src: string
    modelValue: [number, number]
    disabled?: boolean
    animated?: boolean
    aspectRatio?: number
    showGuides?: boolean
  }>(),
  {
    aspectRatio: 1,
  }
)

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
    if (props.disabled) return

    dragStart.value = [event.offsetX, event.offsetY]
    dragging.value = true
  }

  dragTarget.value.onmouseup = () => {
    if (props.disabled) return

    emit('update:model-value', dragOffset.value)
    dragging.value = false
  }

  dragTarget.value.onmouseleave = () => {
    if (props.disabled) return

    emit('update:model-value', dragOffset.value)
    dragging.value = false
  }

  dragTarget.value.onmousemove = (event) => {
    if (props.disabled) return

    dragCoords.value = [event.offsetX, event.offsetY]
  }
})
</script>

<template>
  <div class="drag-root bg-stripe">
    <div class="fit image-display" :class="{ animated: props.animated }">
      <div class="fit marker-root bg-stripe" :class="{ show: props.showGuides }">
        <div class="border-marker fb-cover"></div>
        <div class="border-marker discord-event"></div>
        <div class="border-marker fb-event"></div>
      </div>
    </div>

    <div class="drag-target fit" :class="{ disabled: props.disabled }" ref="dragTarget"></div>
  </div>
</template>

<style lang="scss" scoped>
.drag-root {
  position: relative;
  height: 100%;
  aspect-ratio: v-bind(aspectRatio);
}

.drag-target {
  position: absolute;
  top: 0;
  left: 0;

  &:not(.disabled) {
    cursor: move;
  }
}

.image-display {
  background-image: v-bind(imageUrl);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 0 v-bind(top);

  &.animated {
    transition-property: background;
    transition-duration: 0.2s;
    transition-timing-function: $in-out-bezier;
  }
}

.bg-stripe {
  background: linear-gradient(
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
}

.marker-root {
  mix-blend-mode: hard-light;

  transition-property: opacity;
  transition-duration: 0.3s;
  transition-timing-function: linear;

  opacity: 0;

  &.show {
    opacity: 1;
  }
}

.border-marker {
  border: 2px $dark dashed;
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);

  transition-property: width, height;
  transition-duration: 0.2s;
  transition-timing-function: $in-out-bezier;

  background-color: gray;

  &.fb-event {
    aspect-ratio: calc(548 / 203);
  }

  &.fb-cover {
    aspect-ratio: calc(1920 / 1005);
  }

  &.discord-event {
    aspect-ratio: calc(440 / 180);
  }
}
</style>
