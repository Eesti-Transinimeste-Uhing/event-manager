<script lang="ts" setup>
import { useI18n } from 'src/hooks/use-i18n'
import { SupportedLanguages } from 'src/stores/i18n'

const flagMap: Record<SupportedLanguages, string> = {
  'et-EE': '🇪🇪',
  'en-GB': '🇬🇧',
  'ru-RU': '🇷🇺',
}

const { changeLanguage, currentLanguage, loading } = useI18n()
</script>

<template>
  <q-tabs
    :model-value="currentLanguage"
    @update:model-value="(v: SupportedLanguages) => changeLanguage(v)"
    class="text-h6 text-secondary"
  >
    <q-tab v-for="[lang, flag] of Object.entries(flagMap)" :key="lang" :name="lang">
      {{ flag }}
    </q-tab>
  </q-tabs>

  <q-slide-transition>
    <q-linear-progress v-if="loading" indeterminate color="secondary" />
  </q-slide-transition>
</template>
