<script lang="ts" setup>
import { ref } from 'vue'

import ImageOffsetter from 'src/components/image-offsetter.vue'
import { AspectRatio } from 'src/lib/aspect-ratios'

import OverlayMember from 'src/components/overlay-member.vue'

const model = ref<number>(0)
</script>

<style lang="scss" scoped>
.dev-card {
  height: 500px;
}
</style>

<template>
  <image-offsetter
    class="fit"
    :src="'https://images.unsplash.com/photo-1712666803465-a91304a22127?q=80&w=1881&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'"
    :model-value="[0, model]"
    :aspect-ratio="AspectRatio.widescreen"
    show-guides
    :hinted-ratios="[
      AspectRatio.discordEvent,
      AspectRatio.facebookCover,
      AspectRatio.facebookEvent,
      AspectRatio.widescreen,
    ]"
  >
    <template #default="{ parentSize }">
      <overlay-member :parent-size="parentSize" :left="0.5" :top="0.5" :width="0.2" :height="0.2">
        <q-card class="fit">
          <q-card-section>HHHHHHHHh</q-card-section>
        </q-card>
      </overlay-member>
    </template>
  </image-offsetter>
</template>
