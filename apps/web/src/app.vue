<script setup lang="ts">
import { onMounted } from 'vue'
import NotificationManager from './components/notification-manager.vue'
import { useI18nStore } from './stores/i18n'
import { useI18n } from './hooks/use-i18n'

defineOptions({
  name: 'App',
})

const languagesStore = useI18nStore()
const { changeLanguage } = useI18n()

onMounted(() => {
  changeLanguage(languagesStore.currentLanguage)
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
