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

const aspectHint = ref<AspectRatio | undefined>()

const handleHintHover = (aspect: AspectRatio) => {
  aspectHint.value = aspect
}

const handleHintUnhover = () => {
  aspectHint.value = undefined
}
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
          :highlight-ratio="aspectHint"
          :hinted-ratios="[
            AspectRatio.discordEvent,
            AspectRatio.facebookCover,
            AspectRatio.facebookEvent,
            AspectRatio.widescreen,
          ]"
        />
      </div>

      <q-card-actions align="between">
        <q-item>
          <q-chip
            outline
            text-color="primary non-selectable"
            icon="lab la-discord"
            @mouseover="handleHintHover(AspectRatio.discordEvent)"
            @mouseleave="handleHintUnhover"
          >
            Discord
          </q-chip>

          <q-chip
            outline
            text-color="primary non-selectable"
            icon="lab la-facebook"
            @mouseover="handleHintHover(AspectRatio.facebookEvent)"
            @mouseleave="handleHintUnhover"
          >
            Facebook event
          </q-chip>

          <q-chip
            outline
            text-color="primary non-selectable"
            icon="lab la-facebook"
            @mouseover="handleHintHover(AspectRatio.facebookCover)"
            @mouseleave="handleHintUnhover"
          >
            Facebook cover
          </q-chip>

          <q-chip
            outline
            text-color="primary non-selectable"
            icon="las la-globe"
            @mouseover="handleHintHover(AspectRatio.widescreen)"
            @mouseleave="handleHintUnhover"
          >
            ETÜE
          </q-chip>
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

      <q-separator />

      <q-card-section>
        <div class="row">
          <div class="text-subtitle1 column justify-center q-mr-md">
            <q-icon color="primary" size="md" name="las la-info" />
          </div>

          <div class="col text-subtitle2">
            For the best results, select an image that at least is 1920x1080 pixels in size. If
            larger, make sure its aspect ratio is at least 16:9. If your image is larger, you can
            use this interface to adjust its position until you're happy with the results. Hover
            over the chips on the left to check how your banner will look on different platforms.
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
