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
.offsetter-wrapper {
  height: 500px;
}

.displays {
  height: 200px;
}
</style>

<template>
  <q-card flat bordered>
    <q-card-section>
      <code>{{ top }}</code>
    </q-card-section>

    <q-separator />

    <q-card-section class="offsetter-wrapper row q-col-gutter-md">
      <div class="col-6">
        <q-card bordered flat>
          <image-offsetter
            src="http://localhost:3000/v1/static/template-banner/5dbe876f-a9b2-498e-a28f-cc192c141b1d"
            @update:model-value="handleMove"
            :model-value="[0, top]"
            :aspect-ratio="AspectRatio.square"
            show-guides
          />
        </q-card>
      </div>

      <div class="col-6 column q-col-gutter-y-md">
        <div class="col-4">
          <q-card bordered flat>
            <image-offsetter
              src="http://localhost:3000/v1/static/template-banner/5dbe876f-a9b2-498e-a28f-cc192c141b1d"
              :model-value="[0, top]"
              :aspect-ratio="AspectRatio.discordEvent"
              disabled
              animated
            />
          </q-card>
        </div>

        <div class="col-4">
          <q-card bordered flat>
            <image-offsetter
              src="http://localhost:3000/v1/static/template-banner/5dbe876f-a9b2-498e-a28f-cc192c141b1d"
              :model-value="[0, top]"
              :aspect-ratio="AspectRatio.facebookCover"
              disabled
              animated
            />
          </q-card>
        </div>

        <div class="col-4">
          <q-card bordered flat>
            <image-offsetter
              class="col-3"
              src="http://localhost:3000/v1/static/template-banner/5dbe876f-a9b2-498e-a28f-cc192c141b1d"
              :model-value="[0, top]"
              :aspect-ratio="AspectRatio.facebookEvent"
              disabled
              animated
            />
          </q-card>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
