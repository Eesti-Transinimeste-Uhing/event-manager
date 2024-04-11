<script lang="ts" setup>
import { ref } from 'vue'
import ImageOffsetter from 'components/image-offsetter.vue'

import { AspectRatio } from 'src/lib/aspect-ratios'

import OverlayPositioner from '../overlay-positioner/overlay-positioner.vue'

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

const tab = ref<'offsetter' | 'overlay'>('offsetter')

const overlayPositions = ref<[number, number][]>([
  [0, 0],
  [0, 0],
])
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

.bg-glass {
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(2px);
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
      <q-tabs v-model="tab" align="justify">
        <q-tab name="offsetter" :label="$t('offsetter')" />
        <q-tab name="overlay" :label="$t('overlay')" />
      </q-tabs>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="offsetter" class="q-pa-none">
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
        </q-tab-panel>

        <q-tab-panel name="overlay" class="q-pa-none">
          <div class="overlay-wrapper relative-position">
            <image-offsetter
              class="fit absolute-top-left"
              :src="preview"
              :model-value="[0, props.modelValue]"
              :aspect-ratio="AspectRatio.widescreen"
              readonly
            />

            <overlay-positioner
              class="fit absolute-top-left"
              :size="[1920, 1080]"
              v-model="overlayPositions"
            >
              <template #item-0="{ position, dragging }">
                <div class="outline-dashed bg-glass q-pa-md text-h1 text-dark font-inter">
                  <span>22.03</span>
                  <br />
                  <span>18:00</span>
                </div>

                <transition name="card" mode="out-in">
                  <div class="q-mt-sm outline-dashed bg-glass text-dark q-px-sm" v-if="!dragging">
                    x: {{ Math.floor(position[0]) }} y: {{ Math.floor(position[1]) }}
                  </div>
                </transition>
              </template>

              <template #item-1="{ position, dragging }">
                <div
                  class="outline-dashed bg-glass q-pa-md text-h2 text-dark text-center font-inter"
                >
                  <span>{{ $t('lorem-ipsum-1') }}</span>
                  <br />
                  <span>{{ $t('lorem-ipsum-2') }}</span>
                </div>

                <transition name="card" mode="out-in">
                  <div class="q-mt-sm outline-dashed bg-glass text-dark q-px-sm" v-if="!dragging">
                    x: {{ Math.floor(position[0]) }} y: {{ Math.floor(position[1]) }}
                  </div>
                </transition>
              </template>
            </overlay-positioner>
          </div>

          <q-separator />

          <q-card-section>
            <div class="row">
              <div class="text-subtitle1 column q-mr-md">
                <q-icon color="primary" size="md" name="las la-info" />
              </div>

              <div class="col text-subtitle2">
                {{ $t('image-overlays-explainer') }}
              </div>
            </div>
          </q-card-section>
        </q-tab-panel>
      </q-tab-panels>

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
