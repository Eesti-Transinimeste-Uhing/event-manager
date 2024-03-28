<script lang="ts" setup>
import TooltipButton from 'components/tooltip-button.vue'
import SingleImagePreviewDialog from './single-image-preview-dialog.vue'
import { useQuasar } from 'quasar'
import { useFilePreview } from 'src/hooks/use-file-preview'
import { computed } from 'vue'
import bytes from 'bytes'

const props = defineProps<{
  modelValue: File | string | null
}>()

const emit = defineEmits<{
  (event: 'update:model-value', value: File | null): void
}>()

const q = useQuasar()

const reactivePreviewFile = computed(() => props.modelValue)
const { preview, name, size, dimensions, ratio } = useFilePreview(reactivePreviewFile)

const handlePreviewClick = () => {
  q.dialog({
    component: SingleImagePreviewDialog,
    componentProps: {
      label: name.value,
      caption: size.value ? bytes(size.value) : '0 bytes',
      preview: preview.value,
      width: dimensions.value[0],
      height: dimensions.value[1],
      ratio: ratio.value,
    },
  })
}
</script>

<template>
  <div class="q-pl-md flex justify-between">
    <q-file
      class="col"
      :model-value="typeof props.modelValue === 'string' ? null : props.modelValue"
      borderless
      label="Select image"
      accept="image/*"
      max-files="1"
      @update:model-value="(v) => emit('update:model-value', v)"
    >
      <template v-slot:prepend>
        <q-icon v-if="!preview" name="las la-file-image" />

        <tooltip-button v-else flat tooltip="Enlarge" round>
          <q-avatar>
            <q-img
              :ratio="1"
              height="40px"
              width="40px"
              fit="contain"
              :src="preview"
              @click="handlePreviewClick"
            />
          </q-avatar>
        </tooltip-button>
      </template>
    </q-file>

    <tooltip-button
      flat
      circle
      color="red"
      icon="las la-trash"
      tooltip="Clear"
      @click="emit('update:model-value', null)"
    />
  </div>
</template>
