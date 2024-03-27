<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  running: boolean
  side: 'right' | 'left' | 'top' | 'bottom'
}>()

const animationIcon = computed(() => {
  switch (props.side) {
    case 'bottom':
      return 'las la-angle-up'

    case 'left':
      return 'las la-angle-right'

    case 'right':
      return 'las la-angle-left'

    case 'top':
      return 'las la-angle-down'
  }

  return 'las la-question'
})
</script>

<template>
  <div class="drag-hint fit" :class="{ open: props.running }">
    <div class="wrapper fit row justify-center items-center">
      <div class="arrow-animation fit" :class="{ running: props.running, [props.side]: true }">
        <q-icon class="icon" :name="animationIcon" size="lg" />
        <q-icon class="icon" :name="animationIcon" size="lg" />
      </div>

      <div class="content fit">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$outline-radius: 3px;
$animation-duration: 2s;

@keyframes hint-left {
  0% {
    opacity: 0;
    transform: translateX(10px);
  }

  50% {
    opacity: 1;
    transform: translateX(0);
  }

  100% {
    opacity: 0;
    transform: translateX(-10px);
  }
}

@keyframes hint-right {
  0% {
    opacity: 0;
    transform: translateX(-10px);
  }

  50% {
    opacity: 1;
    transform: translateX(0);
  }

  100% {
    opacity: 0;
    transform: translateX(10px);
  }
}

@keyframes hint-up {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }

  50% {
    opacity: 1;
    transform: translateY(0);
  }

  100% {
    opacity: 0;
    transform: translateY(-10px);
  }
}

@keyframes hint-down {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }

  50% {
    opacity: 1;
    transform: translateY(0);
  }

  100% {
    opacity: 0;
    transform: translateY(10px);
  }
}

.drag-hint {
  position: relative;

  &::before {
    transition: border 0.3s linear;

    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    border: $outline-radius transparent dashed;
    border-radius: $border-radius;
    pointer-events: none;
  }

  > .wrapper {
    padding: $outline-radius;
    position: relative;

    > .content {
      transition-property: margin;
      transition-duration: 0.3s;
      transition-timing-function: $in-out-bezier;
    }
  }

  &.open {
    &::before {
      border: $outline-radius $marker-on-dark dashed;
    }

    > .wrapper {
      > .content {
        margin-right: 38px;
      }
    }
  }
}

.arrow-animation {
  position: absolute;
  top: 0;
  left: 0;
  color: $marker-on-dark;

  transition: opacity 0.3s linear;
  opacity: 0;

  &.running {
    opacity: 1;
    margin-right: -2rem;

    > .icon {
      animation-play-state: running;
    }
  }

  &.right {
    > .icon {
      top: calc(50% - 19px);
      right: 0;
      animation-name: hint-left;
    }
  }

  &.left {
    > .icon {
      top: calc(50% - 19px);
      left: 0;
      animation-name: hint-right;
    }
  }

  &.top {
    > .icon {
      top: 0;
      left: calc(50% - 19px);
      animation-name: hint-down;
    }
  }

  &.bottom {
    > .icon {
      bottom: 0;
      left: calc(50% - 19px);
      animation-name: hint-up;
    }
  }

  > .icon {
    position: absolute;

    animation-timing-function: $showcase-bezier;
    animation-duration: $animation-duration;
    animation-iteration-count: infinite;
    animation-play-state: paused;

    &:nth-of-type(1) {
      animation-delay: 0s;
    }

    &:nth-of-type(2) {
      animation-delay: calc($animation-duration / 2);
    }
  }
}
</style>
