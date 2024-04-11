<script lang="ts" setup>
import { useI18n } from 'src/hooks/use-i18n'
import { SupportedLanguages } from 'src/stores/i18n'

const { changeLanguage, currentLanguage } = useI18n()
</script>

<template>
  <q-tabs
    :model-value="currentLanguage"
    @update:model-value="(v: SupportedLanguages) => changeLanguage(v)"
    class="text-h6 text-secondary"
  >
    <q-tab name="et-EE">🇪🇪</q-tab>
    <q-tab name="en-GB">🇬🇧</q-tab>
  </q-tabs>
</template>
