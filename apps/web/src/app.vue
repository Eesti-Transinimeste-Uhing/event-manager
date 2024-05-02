<script setup lang="ts">
import { onMounted, watch } from 'vue'
import NotificationManager from './components/notification-manager.vue'
import { SupportedLanguages, useI18nStore } from './stores/i18n'
import { useI18n } from './hooks/use-i18n'

import 'vite/types/importMeta.d' // Not needed when not using TypeScript
import { QuasarLanguage, useQuasar } from 'quasar'

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

const importMap: Record<SupportedLanguages, () => Promise<QuasarLanguage>> = {
  'en-GB': async () => (await import('quasar/lang/en-GB')).default,
  'et-EE': async () => (await import('quasar/lang/et')).default,
  'ru-RU': async () => (await import('quasar/lang/ru')).default,
}

const updateQuasarLanguage = async (newLang: SupportedLanguages) => {
  q.lang.set(await importMap[newLang]())
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
