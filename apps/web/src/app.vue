<script setup lang="ts">
import { onMounted, watch } from 'vue'
import NotificationManager from './components/notification-manager.vue'
import { SupportedLanguages, useI18nStore } from './stores/i18n'
import { useI18n } from './hooks/use-i18n'

import 'vite/types/importMeta.d' // Not needed when not using TypeScript
import { useQuasar } from 'quasar'

if (import.meta.hot) {
  import.meta.hot.on('vite:beforeFullReload', () => {
    throw '(skipping full reload)'
  })
}

defineOptions({
  name: 'App',
})

const q = useQuasar()

const languagesStore = useI18nStore()
const { changeLanguage, currentLanguage } = useI18n()

const updateQuasarLanguage = async (newLang: SupportedLanguages) => {
  switch (newLang) {
    case 'en-GB':
      q.lang.set((await import('quasar/lang/en-GB')).default)
      break

    case 'et-EE':
      q.lang.set((await import('quasar/lang/et')).default)
      break

    case 'ru-RU':
      q.lang.set((await import('quasar/lang/ru')).default)
      break
  }
}

watch(currentLanguage, updateQuasarLanguage)

onMounted(() => {
  changeLanguage(languagesStore.currentLanguage)
  updateQuasarLanguage(languagesStore.currentLanguage)
})
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition name="card" mode="out-in">
      <component :is="Component" :key="route.meta.layout" />
    </transition>
  </router-view>

  <notification-manager />
</template>
