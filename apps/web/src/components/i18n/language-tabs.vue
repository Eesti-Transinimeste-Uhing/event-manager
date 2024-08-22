<script lang="ts" setup>
import { SupportedLanguages } from 'src/graphql/generated/graphql'

const flagMap: Record<SupportedLanguages, string> = {
  en_GB: '🇬🇧',
  et_EE: '🇪🇪',
  ru_RU: '🇷🇺',
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

<style lang="scss" scoped>
.tab-row {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>

<template>
  <q-tabs
    :model-value="props.modelValue"
    @update:model-value="(v: SupportedLanguages) => emit('update:model-value', v)"
    :dense="props.small"
  >
    <q-card flat class="row tab-row no-wrap">
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
