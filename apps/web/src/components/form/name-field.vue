<script lang="ts" setup>
const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (event: 'update:model-value', value: string): void
}>()
</script>

<template>
  <q-input
    v-bind="$attrs"
    label="Name"
    :model-value="props.modelValue"
    @update:model-value="(v) => emit('update:model-value', String(v))"
  ></q-input>
</template>
