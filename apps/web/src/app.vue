<template>
  <router-view v-slot="{ Component, route }">
    <transition name="page" mode="out-in">
      <component :is="Component" :key="route.meta.layout" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
defineOptions({
  name: 'App',
})
</script>
