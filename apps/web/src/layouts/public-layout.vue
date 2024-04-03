<script lang="ts" setup>
import { useQuasar } from 'quasar'
import { onBeforeMount, onUnmounted } from 'vue'

const q = useQuasar()

onBeforeMount(() => {
  q.dark.set(false)
})

onUnmounted(() => {
  q.dark.set(true)
})
</script>

<template>
  <q-layout view="lHh lpr lff" class="layout-root">
    <q-page-container class="fit">
      <div class="fit absolute">
        <div class="fit backdrop" />
      </div>

      <router-view v-slot="{ Component, route }">
        <transition name="card" mode="out-in">
          <div class="fit absolute" :key="route.path">
            <component :is="Component" />
          </div>
        </transition>
      </router-view>
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
