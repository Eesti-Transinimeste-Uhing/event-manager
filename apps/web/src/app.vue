<script setup lang="ts">
import 'vite/types/importMeta.d' // Not needed when not using TypeScript

import { useAppDarkMode } from './hooks/app/dark-mode'
import { useAppI18n } from './hooks/app/i18n'

import NotificationManager from './components/notification-manager.vue'
import { onBeforeUnmount, onMounted, ref } from 'vue'

defineOptions({
  name: 'App',
})

useAppI18n()
useAppDarkMode()

const loadingOverlayRemoveTimer = ref<NodeJS.Timeout | null>(null)

const removeLoadingOverlay = () => {
  if (loadingOverlayRemoveTimer.value) {
    clearTimeout(loadingOverlayRemoveTimer.value)
  }

  const loadingOverlay = document.querySelector('body > .loading-overlay')

  if (loadingOverlay) {
    loadingOverlay.remove()
  }
}

onMounted(() => {
  if (typeof window === 'undefined') return

  document.body.classList.remove('app-loading')

  loadingOverlayRemoveTimer.value = setTimeout(() => {
    removeLoadingOverlay()
  }, 500)
})

onBeforeUnmount(() => {
  removeLoadingOverlay()
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
