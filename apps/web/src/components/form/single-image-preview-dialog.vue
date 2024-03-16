<template>
  <q-dialog ref="dialogRef" @hide="onDialogCancel" backdrop-filter="blur(4px)">
    <q-card class="dialog-card">
      <q-img
        class="image"
        fit="contain"
        :width="`${dimensions[0]}px`"
        :height="`${dimensions[1]}px`"
        :src="preview"
      />

      <q-item>
        <q-item-section>
          <q-item-label> {{ props.label }} </q-item-label>
          <q-item-label caption> {{ props.caption }} </q-item-label>
        </q-item-section>
      </q-item>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { useDialogPluginComponent } from 'quasar'
import { useFilePreview } from 'src/hooks/use-file-preview'
import { computed } from 'vue'

const props = defineProps<{
  label: string
  caption: string
  previewFile: File | string
}>()

const reactivePreviewFile = computed(() => props.previewFile)

const { preview, dimensions } = useFilePreview(reactivePreviewFile)

defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits,
])

const { dialogRef, onDialogCancel } = useDialogPluginComponent()
// dialogRef      - Vue ref to be applied to QDialog
// onDialogHide   - Function to be used as handler for @hide on QDialog
// onDialogOK     - Function to call to settle dialog with "ok" outcome
//                    example: onDialogOK() - no payload
//                    example: onDialogOK({ /*...*/ }) - with payload
// onDialogCancel - Function to call to settle dialog with "cancel" outcome
</script>

<style lang="scss" scoped>
.dialog-card {
  max-width: 100%;
}

.image {
  max-width: calc(80vw - 2rem);
  max-height: calc(80vw - 2rem);
}
</style>
