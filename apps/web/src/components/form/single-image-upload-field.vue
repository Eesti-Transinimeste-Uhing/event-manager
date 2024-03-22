<script lang="ts" setup>
import TooltipButton from 'components/tooltip-button.vue'
import SingleImagePreviewDialog from './single-image-preview-dialog.vue'
import { useQuasar } from 'quasar'
import { useFilePreview } from 'src/hooks/use-file-preview'
import { computed } from 'vue'
import bytes from 'bytes'

const props = defineProps<{
  modelValue: File | null
}>()

const emit = defineEmits<{
  (event: 'update:model-value', value: File | null): void
}>()

const q = useQuasar()

const handlePreviewClick = () => {
  q.dialog({
    component: SingleImagePreviewDialog,
    componentProps: {
      label: props.modelValue?.name,
      caption: props.modelValue?.size ? bytes(props.modelValue?.size) : '0 bytes',
      previewFile: props.modelValue,
    },
  })
}

const reactivePreviewFile = computed(() => props.modelValue)

const { preview } = useFilePreview(reactivePreviewFile)
</script>

<template>
  <div class="q-pl-md flex justify-between">
    <q-file
      class="col"
      :model-value="props.modelValue"
      borderless
      label="Select image"
      accept="image/*"
      max-files="1"
      @update:model-value="(v) => emit('update:model-value', v)"
    >
      <template v-slot:prepend>
        <q-icon v-if="!props.modelValue" name="las la-file-image" />

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
