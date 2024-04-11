<script lang="ts" setup>
import { ValidationRule } from 'quasar'
import IntegerField from './base/integer-field.vue'
import { useI18n } from 'src/hooks/use-i18n'

const props = defineProps<{
  modelValue?: number | null
}>()

const emit = defineEmits<{
  (event: 'update:model-value', value: number | null): void
}>()

const handleInput = (v: number | null) => {
  emit('update:model-value', v)
}

const { t } = useI18n()

const rules: ValidationRule[] = [
  (val) =>
    typeof val === 'number'
      ? (val > 0 && val < 100) || t('must-be-between', { min: 0, max: 100 })
      : true,
]
</script>

<template>
  <integer-field
    v-bind="$attrs"
    :label="$t('age')"
    :model-value="props.modelValue ?? null"
    @update:model-value="handleInput"
    :rules="rules"
  />
</template>
