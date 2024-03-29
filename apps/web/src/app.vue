<script setup lang="ts">
import NotificationManager from './components/notification-manager.vue'

defineOptions({
  name: 'App',
})
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition name="page" mode="out-in">
      <component :is="Component" :key="route.meta.layout" />
    </transition>
  </router-view>

  <notification-manager />
</template>
