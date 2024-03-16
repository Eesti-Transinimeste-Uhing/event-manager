<template>
  <q-dialog
    ref="dialogRef"
    @hide="handleHide"
    backdrop-filter="blur(4px)"
    transition-hide="jump-up"
    transition-show="jump-down"
  >
    <q-card class="dialog-card">
      <div
        class="image-wrapper"
        :class="{ loading }"
        :style="loading ? undefined : { width: `${size[0]}px`, height: `${size[1]}px` }"
      >
        <q-img
          class="image"
          fit="contain"
          :src="preview"
          :width="`${size[0]}px`"
          :height="`${size[1]}px`"
        />
      </div>

      <q-item>
        <q-item-section>
          <q-item-label> {{ props.label }} </q-item-label>
          <q-item-label caption> {{ props.caption }} </q-item-label>
        </q-item-section>
      </q-item>

      <tooltip-button
        icon="las la-times"
        tooltip="Dismiss"
        flat
        color="red"
        round
        class="q-ma-sm absolute-top-right"
        @click="emit('hide')"
      />
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import TooltipButton from 'components/tooltip-button.vue'
import { useDialogPluginComponent, useQuasar } from 'quasar'
import { useFilePreview } from 'src/hooks/use-file-preview'
import { computed } from 'vue'

const q = useQuasar()

const props = defineProps<{
  label: string
  caption: string
  previewFile: File | string
}>()

const reactivePreviewFile = computed(() => props.previewFile)

const { preview, ratio, dimensions, loading } = useFilePreview(reactivePreviewFile)

const size = computed(() => {
  let height = dimensions.value[1]
  let width = dimensions.value[0]

  height = Math.min(height, q.screen.height - 100)
  width = Math.min(width, q.screen.width - 100)

  if (width < height) {
    width = height * ratio.value
    height = width / ratio.value
  } else {
    width = height * ratio.value
    height = width / ratio.value
  }

  return [width, height]
})

const emit = defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits,
])

const { dialogRef, onDialogHide, onDialogCancel } = useDialogPluginComponent()
// dialogRef      - Vue ref to be applied to QDialog
// onDialogHide   - Function to be used as handler for @hide on QDialog
// onDialogOK     - Function to call to settle dialog with "ok" outcome
//                    example: onDialogOK() - no payload
//                    example: onDialogOK({ /*...*/ }) - with payload
// onDialogCancel - Function to call to settle dialog with "cancel" outcome

const handleHide = () => {
  onDialogCancel()
  onDialogHide()
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

  &.loading {
    width: 256px;
    height: 256px;
  }
}
</style>
