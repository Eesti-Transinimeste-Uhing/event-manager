<script setup lang="ts">
import 'vite/types/importMeta.d' // Not needed when not using TypeScript

import { useAppDarkMode } from './hooks/app/dark-mode'
import { useAppI18n } from './hooks/app/i18n'

import NotificationManager from './components/notification-manager.vue'

defineOptions({
  name: 'App',
})

useAppI18n()
useAppDarkMode()
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition name="card" mode="out-in">
      <component :is="Component" :key="route.meta.layout" />
    </transition>
  </router-view>

  <notification-manager />
</template>
