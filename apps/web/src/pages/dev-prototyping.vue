<script lang="ts" setup>
import { ref } from 'vue'

import OverlayPositioner from 'src/components/overlay-positioner/overlay-positioner.vue'

const model = ref<[number, number][]>([[464.090541632983, 516.7241379310344]])
</script>

<style lang="scss" scoped>
.dev-card {
  height: 500px;
}
</style>

<template>
  <q-card flat bordered class="dev-card">
    <overlay-positioner v-model="model" :size="[1920, 1080]">
      <template #item-0>
        <q-card>
          <q-card-section>
            <span>My Item!</span>
          </q-card-section>
        </q-card>
      </template>
    </overlay-positioner>
  </q-card>
</template>
