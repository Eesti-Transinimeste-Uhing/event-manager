<script lang="ts" setup>
import { ValidationRule } from 'quasar'
import SliderField from './base/slider-field.vue'
import { useI18n } from 'src/hooks/use-i18n'

const props = withDefaults(
  defineProps<{
    modelValue?: number | null
  }>(),
  {
    modelValue: null,
  }
)

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
      ? (val > 0 && val < 50) || t('must-be-between', { min: 0, max: 50 })
      : true,
]
</script>

<template>
  <slider-field
    v-bind="$attrs"
    :label="$t('submission-limit')"
    :model-value="props.modelValue"
    @update:model-value="handleInput"
    :rules="rules"
    :min="0"
    :max="50"
  />
</template>
