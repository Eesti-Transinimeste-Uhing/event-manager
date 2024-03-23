<script lang="ts" setup>
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
</script>

<template>
  <integer-field
    v-bind="$attrs"
    label="Age"
    :model-value="props.modelValue"
    @update:model-value="handleInput"
  />
</template>
