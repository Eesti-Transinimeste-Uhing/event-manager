<script lang="ts" setup>
import TextField from './base/text-field.vue'

const props = defineProps<{
  modelValue?: string
}>()

const emit = defineEmits<{
  (event: 'update:model-value', value: string): void
}>()
</script>

<template>
  <text-field
    v-bind="$attrs"
    label="Name"
    :model-value="props.modelValue || ''"
    @update:model-value="(v) => emit('update:model-value', String(v))"
  ></text-field>
</template>
