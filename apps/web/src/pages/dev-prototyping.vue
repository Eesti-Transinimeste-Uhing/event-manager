<script lang="ts" setup>
import { ref } from 'vue'

import OverlayPositioner from 'src/components/overlay-positioner/overlay-positioner.vue'

const model = ref<[number, number][]>([[0, 0]])
</script>

<style lang="scss" scoped>
.dev-card {
  height: 500px;
}
</style>

<template>
  <q-card flat bordered class="dev-card">
    <overlay-positioner v-model="model" :aspect-ratio="1">
      <template #item-0>
        <span>My Item!</span>
      </template>
    </overlay-positioner>

    {{ model }}
  </q-card>
</template>
