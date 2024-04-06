<script lang="ts" setup>
import { ref } from 'vue'

import ImageOffsetter from 'src/components/image-offsetter.vue'
import { AspectRatio } from 'src/lib/aspect-ratios'

const model = ref<[number, number]>([0, 0])
</script>

<style lang="scss" scoped></style>

<template>
  <div class="column wrap">
    <div class="col">
      <image-offsetter
        src="https://images.unsplash.com/photo-1516035645781-9f126e774e9e?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        @update:model-value="(v) => (model = [model[0], v[1]])"
        :model-value="model"
        :aspect-ratio="AspectRatio.widescreen"
        show-guides
        :hinted-ratios="[
          AspectRatio.discordEvent,
          AspectRatio.facebookCover,
          AspectRatio.facebookEvent,
          AspectRatio.widescreen,
        ]"
      />
    </div>

    <code class="col">{{ model }}</code>
  </div>
</template>
