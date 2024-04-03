<script lang="ts" setup>
import { useQuasar } from 'quasar'
import { computed } from 'vue'

import perlinDark from 'assets/background/perlin-dark.jpg'
import StickyToolbar from 'components/sticky-toolbar.vue'

const q = useQuasar()

const background = computed(() => {
  return `url(${perlinDark})`
})

const gradientColour1 = computed(() => {
  return `rgb(86, 172, 252, ${q.dark.isActive ? 0.5 : 1})`
})

const gradientColour2 = computed(() => {
  return `rgba(246, 144, 230, ${q.dark.isActive ? 0.2 : 0.5})`
})

const gradientColour3 = computed(() => {
  return `rgba(255, 236, 70, ${q.dark.isActive ? 0.1 : 0.2})`
})
</script>

<template>
  <q-layout view="lHh lpr lff" class="layout-root">
    <div v-if="q.dark.isActive" class="anti-band-hack" />

    <q-page-container class="fit">
      <router-view v-slot="{ Component, route }">
        <transition name="card" mode="out-in">
          <div class="fit absolute" :key="route.path">
            <component :is="Component" />
          </div>
        </transition>
      </router-view>

      <sticky-toolbar />
    </q-page-container>
  </q-layout>
</template>

<style lang="scss" scoped>
.anti-band-hack {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-image: v-bind(background);
  background-size: 4px;
  mix-blend-mode: screen;
}

.layout-root {
  height: 100vh;
  background-image: radial-gradient(
    circle at 85% 35%,
    v-bind(gradientColour1) 0%,
    v-bind(gradientColour1) 2%,
    v-bind(gradientColour2) 18%,
    v-bind(gradientColour3) 40%,
    transparent 70%
  );
  mix-blend-mode: difference;
  background-repeat: no-repeat;
}
</style>
