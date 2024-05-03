<script lang="ts" setup>
import { SupportedLanguages } from 'src/stores/i18n'

const flagMap: Record<SupportedLanguages, string> = {
  'et-EE': '🇪🇪',
  'en-GB': '🇬🇧',
  'ru-RU': '🇷🇺',
}

const props = withDefaults(
  defineProps<{
    modelValue: SupportedLanguages
    small?: boolean
  }>(),
  {
    small: false,
  }
)

const emit = defineEmits<{
  (event: 'update:model-value', value: SupportedLanguages): void
}>()
</script>

<template>
  <q-tabs
    :model-value="props.modelValue"
    @update:model-value="(v: SupportedLanguages) => emit('update:model-value', v)"
    :dense="props.small"
  >
    <q-card flat class="row">
      <q-tab
        v-for="[lang, flag] of Object.entries(flagMap)"
        :key="lang"
        :name="lang"
        :class="props.small ? 'text-subtitle1 q-px-sm' : 'text-h6'"
      >
        {{ flag }}
      </q-tab>
    </q-card>
  </q-tabs>
</template>
