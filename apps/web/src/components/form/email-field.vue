<script lang="ts" setup>
import { ValidationRule } from 'quasar'

import TextField from './base/text-field.vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (event: 'update:model-value', value: string): void
}>()

const rules: ValidationRule[] = [
  (val, rules) => rules.email(val) || 'Please enter a valid email address',
]
</script>

<template>
  <text-field
    v-bind="$attrs"
    label="E-mail address"
    :model-value="props.modelValue"
    @update:model-value="(v) => emit('update:model-value', String(v))"
    :rules="rules"
  ></text-field>
</template>
