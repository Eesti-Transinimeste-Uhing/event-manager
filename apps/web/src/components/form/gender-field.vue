<script lang="ts" setup>
import SelectField, { Option } from './base/select-field.vue'

const props = defineProps<{
  modelValue?: string
}>()

const emit = defineEmits<{
  (event: 'update:model-value', value: string): void
}>()

const options: Option[] = [
  {
    label: 'Male',
    value: 'male',
  },
  {
    label: 'Female',
    value: 'female',
  },
  {
    label: 'Non-binary',
    value: 'nb',
  },
]
</script>

<template>
  <select-field
    v-bind="$attrs"
    label="Gender"
    :options="options"
    :model-value="props.modelValue || ''"
    has-other
    @update:model-value="(v) => emit('update:model-value', v)"
  ></select-field>
</template>
