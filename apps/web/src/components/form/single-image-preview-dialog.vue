<script lang="ts" setup>
import { ref } from 'vue'
import ImageOffsetter from 'components/image-offsetter.vue'
import OverlayMember from 'components/overlay-member.vue'

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
  max-width: 1200px !important;
}

.image-wrapper {
  max-width: 100%;
  max-height: 100%;

  display: flex;
  align-items: center;
}

.outline-dashed {
  outline: 2px $dark dashed;
  border-radius: $border-radius;
}

.overlay {
  &-wrapper {
    width: 100%;
    aspect-ratio: 16 / 9;

    display: flex;
    align-items: center;
  }
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
      <div class="image-wrapper">
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
        >
          <template #default="{ parentSize }">
            <overlay-member
              :parent-size="parentSize"
              :left="0.19"
              :top="0.47"
              :width="0.25"
              :height="0.2"
            >
              <template #default="{ height }">
                <div
                  class="fit text-dark font-spacemono"
                  :style="{ fontSize: `${height / 1.8}px` }"
                >
                  <span>00.00</span>
                </div>
              </template>
            </overlay-member>

            <overlay-member
              :parent-size="parentSize"
              :left="0.2"
              :top="0.61"
              :width="0.25"
              :height="0.2"
            >
              <template #default="{ height }">
                <div
                  class="fit text-dark font-spacemono text-accent"
                  :style="{ fontSize: `${height / 1.9}px` }"
                >
                  <span>00:00</span>
                </div>
              </template>
            </overlay-member>
          </template>
        </image-offsetter>
      </div>

      <q-card-actions align="between">
        <q-item>
          <q-chip
            outline
            text-color="primary non-select25able"
            icon="lab la-discord"
            @mouseover="handleHintHover(AspectRatio.discordEvent)"
            @mouseleave="handleHintUnhover"
          >
            {{ $t('discord') }}
          </q-chip>

          <q-chip
            outline
            text-color="primary non-selectable"
            icon="lab la-facebook"
            @mouseover="handleHintHover(AspectRatio.facebookEvent)"
            @mouseleave="handleHintUnhover"
          >
            {{ $t('facebook-event') }}
          </q-chip>

          <q-chip
            outline
            text-color="primary non-selectable"
            icon="lab la-facebook"
            @mouseover="handleHintHover(AspectRatio.facebookCover)"
            @mouseleave="handleHintUnhover"
          >
            {{ $t('facebook-cover') }}
          </q-chip>

          <q-chip
            outline
            text-color="primary non-selectable"
            icon="las la-globe"
            @mouseover="handleHintHover(AspectRatio.widescreen)"
            @mouseleave="handleHintUnhover"
          >
            {{ $t('web-registration-form') }}
          </q-chip>
        </q-item>
      </q-card-actions>

      <q-separator />

      <q-card-section>
        <div class="row">
          <div class="text-subtitle1 column q-mr-md">
            <q-icon color="primary" size="md" name="las la-info" />
          </div>

          <div class="col text-subtitle2">
            {{ $t('image-ratio-explainer') }}
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-item>
          <q-btn
            icon="las la-times"
            :label="$t('reset')"
            flat
            color="red"
            class="q-ma-sm"
            @click="handleReset"
          />

          <q-btn
            icon="las la-check"
            :label="$t('close')"
            color="primary"
            class="q-ma-sm"
            @click="emit('close')"
          />
        </q-item>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
