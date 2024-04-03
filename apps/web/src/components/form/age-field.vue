<script lang="ts" setup>
import { ValidationRule } from 'quasar'
import IntegerField from './base/integer-field.vue'

const props = defineProps<{
  modelValue?: number | null
}>()

const emit = defineEmits<{
  (event: 'update:model-value', value: number | null): void
}>()

const handleInput = (v: number | null) => {
  emit('update:model-value', v)
}

const rules: ValidationRule[] = [
  (val) => (typeof val === 'number' ? (val > 0 && val < 100) || 'Must be between 0 and 100' : true),
]
</script>

<template>
  <integer-field
    v-bind="$attrs"
    label="Age"
    :model-value="props.modelValue ?? null"
    @update:model-value="handleInput"
    :rules="rules"
  />
</template>
