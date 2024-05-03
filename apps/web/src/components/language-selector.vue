<script lang="ts" setup>
import { useI18n } from 'src/hooks/use-i18n'

import LanguageTabs from './language-tabs.vue'

const { changeLanguage, currentLanguage, loading } = useI18n()
</script>

<template>
  <language-tabs :model-value="currentLanguage" @update:model-value="changeLanguage" />

  <q-slide-transition>
    <q-linear-progress v-if="loading" indeterminate color="secondary" />
  </q-slide-transition>
</template>
