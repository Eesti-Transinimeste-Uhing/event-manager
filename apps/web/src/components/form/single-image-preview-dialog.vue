<script lang="ts" setup>
import { ref } from 'vue'
import ImageOffsetter from 'components/image-offsetter.vue'

import { AspectRatio } from 'src/lib/aspect-ratios'

const props = defineProps<{
  label: string
  caption: string | null
  preview: string
  width: number
  height: number
  ratio: number
  modelValue: number
  open: boolean
}>()

const originalModelValue = ref(props.modelValue)

const handleReset = () => {
  emit('update:model-value', originalModelValue.value)
}

const emit = defineEmits<{
  (event: 'close'): void
  (event: 'update:model-value', value: number): void
}>()
</script>

<style lang="scss" scoped>
.dialog-card {
  overflow: hidden;
  max-width: 100%;
}

.image-wrapper {
  transition-property: width, height;
  transition-duration: 0.3s;
  transition-timing-function: $in-out-bezier;

  max-width: 100%;
  max-height: 100%;

  display: flex;
  align-items: center;
}
</style>

<template>
  <q-dialog
    :model-value="props.open"
    @hide="emit('close')"
    backdrop-filter="blur(4px)"
    transition-hide="jump-up"
    transition-show="jump-down"
    full-width
  >
    <q-card class="dialog-card">
      <div class="image-wrapper fit">
        <image-offsetter
          class="fit"
          :src="preview"
          @update:model-value="(v) => emit('update:model-value', v[1])"
          :model-value="[0, props.modelValue]"
          :aspect-ratio="AspectRatio.widescreen"
          show-guides
          :hinted-ratios="[
            AspectRatio.discordEvent,
            AspectRatio.facebookCover,
            AspectRatio.facebookEvent,
          ]"
        />
      </div>

      <q-card-actions align="between">
        <q-item>
          <q-item-section>
            <q-item-label> {{ props.label }} </q-item-label>
            <q-item-label caption v-if="props.caption"> {{ props.caption }} </q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-btn
            icon="las la-times"
            label="Reset"
            flat
            color="red"
            class="q-ma-sm"
            @click="handleReset"
          />

          <q-btn
            icon="las la-check"
            label="Close"
            color="primary"
            class="q-ma-sm"
            @click="emit('close')"
          />
        </q-item>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
