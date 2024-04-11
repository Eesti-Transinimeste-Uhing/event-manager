<script lang="ts" setup>
import { ValidationRule } from 'quasar'

import TextField from './base/text-field.vue'
import { useI18n } from 'src/hooks/use-i18n'

const props = defineProps<{
  modelValue?: string
}>()

const emit = defineEmits<{
  (event: 'update:model-value', value: string): void
}>()

const { t } = useI18n()

const rules: ValidationRule[] = [
  (val, rules) => (val ? rules.email(val) || t('please-enter-valid-email') : true),
]
</script>

<template>
  <text-field
    v-bind="$attrs"
    :label="$t('email-address')"
    :model-value="props.modelValue || ''"
    @update:model-value="(v) => emit('update:model-value', String(v))"
    :rules="rules"
  ></text-field>
</template>
