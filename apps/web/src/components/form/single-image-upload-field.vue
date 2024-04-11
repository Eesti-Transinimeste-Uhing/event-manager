<script lang="ts" setup>
import TooltipButton from 'components/tooltip-button.vue'
import { useFilePreview } from 'src/hooks/use-file-preview'
import { computed } from 'vue'

const props = defineProps<{
  modelValue: File | string | null
}>()

const emit = defineEmits<{
  (event: 'update:model-value', value: File | null): void
}>()

const reactivePreviewFile = computed(() => props.modelValue)
const { preview } = useFilePreview(reactivePreviewFile)
</script>

<template>
  <div class="q-pl-md flex justify-between">
    <q-file
      class="col"
      :model-value="typeof props.modelValue === 'string' ? null : props.modelValue"
      borderless
      :label="$t('select-image')"
      accept="image/*"
      max-files="1"
      @update:model-value="(v) => emit('update:model-value', v)"
    >
      <template v-slot:prepend>
        <q-icon v-if="!preview" name="las la-file-image" />

        <slot name="prepend" />
      </template>

      <template #append>
        <slot name="append" />
      </template>
    </q-file>

    <tooltip-button
      v-if="typeof props.modelValue !== 'string' && props.modelValue"
      flat
      circle
      color="red"
      icon="las la-trash"
      :tooltip="$t('clear')"
      @click="emit('update:model-value', null)"
    />
  </div>
</template>
