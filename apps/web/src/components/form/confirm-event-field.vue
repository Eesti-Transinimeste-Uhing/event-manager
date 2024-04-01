<script lang="ts" setup>
import SelectField, { SelectOption } from './base/select-field.vue'

const props = withDefaults(
  defineProps<{
    modelValue?: boolean | null
  }>(),
  {
    modelValue: null,
  }
)

const emit = defineEmits<{
  (event: 'update:model-value', value: boolean): void
}>()

const options: SelectOption[] = [
  {
    label: 'Yes',
    value: 'yes',
  },
  {
    label: 'No',
    value: 'no',
  },
]
</script>

<template>
  <select-field
    v-bind="$attrs"
    label="Are you coming to the event?"
    :options="options"
    :model-value="typeof props.modelValue === 'boolean' ? (props.modelValue ? 'yes' : 'no') : null"
    @update:model-value="(v) => emit('update:model-value', v === 'yes' ? true : false)"
  ></select-field>
</template>
