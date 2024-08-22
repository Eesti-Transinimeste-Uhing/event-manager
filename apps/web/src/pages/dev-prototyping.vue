<script lang="ts" setup>
import { computed, ref } from 'vue'
import { TouchPanValue } from 'quasar'
import { roundByStep } from 'src/lib/round-by-step'

const pos = ref([0, 0])
const hovered = ref(false)
const isDragging = ref(false)
const inMenu = ref(false)

const moveCard: TouchPanValue = (details) => {
  if (details.isFinal) {
    isDragging.value = false
  } else if (!isDragging.value) {
    isDragging.value = true
  }

  if (!details.delta) return

  pos.value = [pos.value[0] + (details.delta.x || 0), pos.value[1] + (details.delta.y || 0)]
}

const translate = computed(() => {
  return `translate(${roundByStep(pos.value[0], 25)}px, ${roundByStep(pos.value[1], 25)}px)`
})

const colour = ref('#529212')

const colourPreviewStyle = computed(() => {
  return {
    backgroundColor: colour.value,
  }
})
</script>

<style lang="scss" scoped>
.dev-card {
  height: 100px;
  width: 100px;

  border: 4px dashed black;
  border-radius: 4px;
}

.move-root {
  transform: v-bind(translate);
  width: 200px;
}

.text-editor-toolbar {
  position: absolute;
  top: -50px;
  left: 0;
  right: 0;
  z-index: 2;
  width: 200px;
}
</style>

<template>
  <div
    class="move-root"
    v-touch-pan.prevent.mouse="moveCard"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <transition name="card">
      <q-banner
        v-if="hovered || isDragging || inMenu"
        class="text-editor-toolbar row"
        @touchstart.stop
        @mousedown.stop
      >
        <q-btn flat round dense>
          <q-avatar :style="colourPreviewStyle" size="sm" />

          <q-menu
            anchor="center middle"
            self="center middle"
            @before-show="inMenu = true"
            @hide="inMenu = false"
          >
            <q-color v-model="colour" no-header-tabs no-footer class="my-picker" />
          </q-menu>
        </q-btn>
      </q-banner>
    </transition>

    <div class="dev-card">
      {{ pos }}
      {{ hovered }}
      {{ isDragging }}
    </div>
  </div>
</template>
