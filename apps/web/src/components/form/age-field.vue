<script lang="ts" setup>
import { ValidationRule } from 'quasar'
import IntegerField from './base/integer-field.vue'

const props = defineProps<{
  modelValue: number
}>()

const emit = defineEmits<{
  (event: 'update:model-value', value: number): void
}>()

const handleInput = (v: number) => {
  emit('update:model-value', v)
}

const rules: ValidationRule[] = [(val) => (val > 0 && val < 100) || 'Must be between 0 and 100']
</script>

<template>
  <integer-field
    v-bind="$attrs"
    label="Age"
    :model-value="props.modelValue"
    @update:model-value="handleInput"
    :rules="rules"
  />
</template>
