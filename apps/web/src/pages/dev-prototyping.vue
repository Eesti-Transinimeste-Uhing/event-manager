<script lang="ts" setup>
import { ref } from 'vue'

import ImageOffsetter from 'components/image-offsetter.vue'
import { AspectRatio } from 'src/lib/aspect-ratios'

const top = ref(0)

const handleMove = (pos: [number, number]) => {
  top.value = pos[1]
}
</script>

<style lang="scss" scoped>
.offsetter-section {
  height: 500px;
  width: 100%;
}
</style>

<template>
  <q-card flat bordered>
    <q-card-section>
      <code>{{ top }}</code>
    </q-card-section>

    <q-separator />

    <q-card-section class="flex offsetter-section">
      <image-offsetter
        src="http://localhost:3000/v1/static/template-banner/5dbe876f-a9b2-498e-a28f-cc192c141b1d"
        @update:model-value="(v) => handleMove(v)"
        :model-value="[0, top]"
        :aspect-ratio="AspectRatio.widescreen"
        show-guides
      />
    </q-card-section>
  </q-card>
</template>
