<script lang="ts" setup>
import { useI18n } from 'src/hooks/use-i18n'
import SelectField, { SelectOption } from './base/select-field.vue'

const props = defineProps<{
  modelValue?: string
}>()

const emit = defineEmits<{
  (event: 'update:model-value', value: string | null): void
}>()

const { t } = useI18n()

const options: SelectOption[] = [
  {
    label: t('male'),
    value: 'male',
  },
  {
    label: t('female'),
    value: 'female',
  },
  {
    label: t('non-binary'),
    value: 'nb',
  },
]
</script>

<template>
  <select-field
    v-bind="$attrs"
    :label="$t('gender')"
    :options="options"
    :model-value="props.modelValue || ''"
    has-other
    @update:model-value="(v) => emit('update:model-value', v)"
  ></select-field>
</template>
