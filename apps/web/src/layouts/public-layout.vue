<script lang="ts" setup>
import StickyToolbar from 'components/sticky-toolbar.vue'
</script>

<template>
  <q-layout view="lHh lpr lff" class="layout-root">
    <q-page-container class="fit">
      <q-page class="page-padding column fit q-pa-md">
        <router-view v-slot="{ Component, route }">
          <transition name="card" mode="out-in">
            <component :is="Component" :key="route.path" />
          </transition>
        </router-view>

        <sticky-toolbar />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style lang="scss" scoped>
.layout-root {
  height: 100vh;
  background-color: white;
  background-image: radial-gradient(
    circle at 85% 35%,
    rgba(86, 205, 252, 1) 0%,
    rgba(246, 144, 230, 0.5) 20%,
    rgba(255, 236, 70, 0.2) 40%,
    transparent 70%
  );
  mix-blend-mode: difference;
  background-repeat: no-repeat;
}
</style>
