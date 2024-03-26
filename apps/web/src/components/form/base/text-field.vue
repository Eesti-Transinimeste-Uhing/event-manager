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
    borderless
    :model-value="props.modelValue"
    @update:model-value="(v) => emit('update:model-value', String(v))"
    clear-icon="las la-times"
    no-error-icon
    hide-bottom-space
  ></q-input>
</template>
