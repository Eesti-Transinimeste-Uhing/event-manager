<template>
  <router-view v-slot="{ Component }">
    <transition name="card" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
defineOptions({
  name: 'App',
})
</script>
