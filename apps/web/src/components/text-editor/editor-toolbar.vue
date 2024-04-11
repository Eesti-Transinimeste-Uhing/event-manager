<script lang="ts" setup>
import TooltipButton from 'components/tooltip-button.vue'
import ButtonSelect from '../button-select.vue'
import { TemplateVariableId } from './extensions/template-variable'
import { computed } from 'vue'

const props = defineProps<{
  canUndo: boolean
  canRedo: boolean

  bold: boolean
  italic: boolean
  underline: boolean
}>()

const emit = defineEmits<{
  (event: 'bold'): void
  (event: 'italic'): void
  (event: 'underline'): void

  (event: 'undo'): void
  (event: 'redo'): void

  (event: 'template-variable', id: keyof typeof TemplateVariableId): void
}>()

const templateVariableOptions = computed(() =>
  Object.entries(TemplateVariableId).map(([key, value]) => {
    return {
      label: value,
      value: key,
    }
  })
)
</script>

<template>
  <div class="flex justify-start items-center relative-position">
    <tooltip-button
      flat
      square
      icon="las la-undo"
      :tooltip="$t('undo')"
      @click="emit('undo')"
      :disabled="!props.canUndo"
    />
    <tooltip-button
      flat
      square
      icon="las la-redo"
      :tooltip="$t('redo')"
      @click="emit('redo')"
      :disabled="!props.canRedo"
    />

    <q-separator vertical />

    <tooltip-button
      flat
      square
      icon="las la-bold"
      :tooltip="$t('bold')"
      @click="emit('bold')"
      :color="bold ? 'primary' : 'white'"
    />
    <tooltip-button
      flat
      square
      icon="las la-italic"
      :tooltip="$t('italic')"
      @click="emit('italic')"
      :color="italic ? 'primary' : 'white'"
    />
    <tooltip-button
      flat
      square
      icon="las la-underline"
      :tooltip="$t('underline')"
      @click="emit('underline')"
      :color="underline ? 'primary' : 'white'"
    />

    <q-separator vertical />

    <button-select
      :model-value="null"
      :options="templateVariableOptions.map(({ label, value }) => ({ value, label: $t(label) }))"
      flat
      square
      icon="las la-code"
      :tooltip="$t('insert-variable')"
      position="center"
      @update:model-value="
        (v: string) => emit('template-variable', v as keyof typeof TemplateVariableId)
      "
    />
  </div>
</template>
