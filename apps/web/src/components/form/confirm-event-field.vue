<script lang="ts" setup>
import SelectField from './base/select-field.vue'

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

const options = [
  {
    label: 'yes',
    value: 'yes',
  },
  {
    label: 'no',
    value: 'no',
  },
]
</script>

<template>
  <select-field
    v-bind="$attrs"
    :label="$t('are-you-coming-to-the-event')"
    :options="options.map(({ label, value }) => ({ value, label: $t(label) }))"
    :model-value="typeof props.modelValue === 'boolean' ? (props.modelValue ? 'yes' : 'no') : null"
    @update:model-value="(v) => emit('update:model-value', v === 'yes' ? true : false)"
  ></select-field>
</template>
